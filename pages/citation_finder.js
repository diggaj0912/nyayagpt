// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Citation Finder Page
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { toast } from '../components/toast.js';
import { findCitations, hasApiKey, getMockCitationResult } from '../services/ai.js';

const SUGGESTED_ISSUES = [
  'Public Interest Litigation Admissibility',
  'Admissibility of electronic evidence in criminal trial',
  'Enforceability of non-compete clauses in employment contracts',
  'Scope of judicial review in arbitration awards',
  'Applicability of Section 300 Clause 4 IPC',
];

export function renderCitationFinder() {
  return `
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>⚖️ Precedent & Citation Finder</h2>
        <p>Input a legal issue, statute, or case name to identify leading precedents, citation counts, and visual citation graphs.</p>
      </div>

      <div class="research-input-container">
        <div class="research-input-box">
          <textarea class="research-textarea" id="citation-query" placeholder="Enter a legal issue, statute, or precedent case... e.g. 'Admissibility of tape-recorded conversation as evidence'" rows="3"></textarea>
          <div class="research-input-footer">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="text-xs text-muted">⚡ Citation Analyzer</span>
              ${!hasApiKey() ? '<span class="badge badge-warning">Demo Mode</span>' : '<span class="badge badge-success">API Connected</span>'}
            </div>
            <button class="btn btn-primary" id="find-citations-btn">
              <span id="find-btn-text">Find Precedents</span>
            </button>
          </div>
        </div>
        <div class="suggested-queries">
          ${SUGGESTED_ISSUES.map(q => `<button class="chip" data-issue="${q}">${q}</button>`).join('')}
        </div>
      </div>

      <div id="citation-results"></div>
    </div>
  `;
}

export function initCitationFinder() {
  const btn = document.getElementById('find-citations-btn');
  const textarea = document.getElementById('citation-query');
  const resultsDiv = document.getElementById('citation-results');

  if (btn) {
    btn.addEventListener('click', () => searchCitations(textarea, resultsDiv, btn));
  }

  if (textarea) {
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        searchCitations(textarea, resultsDiv, btn);
      }
    });
  }

  document.querySelectorAll('[data-issue]').forEach(chip => {
    chip.addEventListener('click', () => {
      textarea.value = chip.dataset.issue;
      textarea.focus();
    });
  });
}

async function searchCitations(textarea, resultsDiv, btn) {
  const query = textarea.value.trim();
  if (!query) {
    toast.warning('Please enter a legal issue or case');
    return;
  }

  btn.disabled = true;
  document.getElementById('find-btn-text').textContent = 'Analyzing...';
  resultsDiv.innerHTML = renderLoadingState();

  try {
    let result;
    if (hasApiKey()) {
      result = await findCitations(query);
    } else {
      await new Promise(r => setTimeout(r, 2000));
      result = getMockCitationResult();
      toast.info('Showing demo precedents. Input your Gemini API key in Settings for live lookup.');
    }

    storage.incrementUsage('analyses');
    storage.logActivity('citation', `Citation Find: ${query.slice(0, 50)}...`, '⚖️');

    resultsDiv.innerHTML = renderResults(query, result);
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Attach save button handler
    document.getElementById('save-citation-btn')?.addEventListener('click', () => {
      storage.saveDocument({
        type: 'citation',
        title: `Citations: ${query}`,
        content: result,
      });
      toast.success('Citation report saved to library');
    });

    // Attach export button handler
    document.getElementById('export-citation-btn')?.addEventListener('click', () => {
      import('../utils/pdf.js').then(mod => {
        mod.downloadAsHTML(
          formatCitationAsHTML(query, result),
          `Citation Report: ${query}`,
          `citations_${Date.now()}.html`
        );
      });
    });

  } catch (err) {
    toast.error('Search failed: ' + err.message);
    resultsDiv.innerHTML = '';
  } finally {
    btn.disabled = false;
    document.getElementById('find-btn-text').textContent = 'Find Precedents';
  }
}

function renderLoadingState() {
  return `
    <div class="result-section animate-fade-up" style="padding: 40px; text-align: center;">
      <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
      <p class="text-muted">Analyzing citation network and calculating authority scores...</p>
    </div>
  `;
}

function renderResults(query, result) {
  const judgments = (result.judgments || []).map(j => {
    const strengthClass = j.citation_strength === 'High' ? 'badge-success' : j.citation_strength === 'Medium' ? 'badge-primary' : 'badge-secondary';
    return `
      <div class="judgment-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
          <div class="case-name" style="margin: 0; font-size: 1.0625rem;">${escapeHtml(j.name)}</div>
          <span class="badge ${strengthClass}">${escapeHtml(j.citation_strength)} Authority</span>
        </div>
        <div class="case-meta" style="margin-bottom: 12px;">
          <span>📌 ${escapeHtml(j.citation)}</span>
          <span>🏛️ ${escapeHtml(j.court)}</span>
          <span>📅 ${j.year}</span>
          <span>🔥 Cited ${j.citation_count} times</span>
        </div>
        <div class="case-snippet" style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: 6px; border-left: 3px solid var(--primary);">
          ${escapeHtml(j.snippet)}
        </div>
      </div>
    `;
  }).join('');

  // Renders a visual CSS citation connection map
  const graphHtml = renderCitationGraph(result.graph);

  return `
    <div class="research-results animate-fade-up">
      <div class="result-section">
        <div class="result-section-header">
          <span class="icon">🕸️</span> Citation Network Graph
        </div>
        <div class="result-section-content" style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 24px; display: flex; flex-direction: column; align-items: center; border: 1px solid rgba(255,255,255,0.05);">
          ${graphHtml}
        </div>
      </div>

      <div class="result-section">
        <div class="result-section-header">
          <span class="icon">⚖️</span> Top Precedents & Authorities
        </div>
        <div class="result-section-content">${judgments}</div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px;">
        <button class="btn btn-secondary btn-sm" id="export-citation-btn">📥 Export Report</button>
        <button class="btn btn-primary btn-sm" id="save-citation-btn">💾 Save to Library</button>
      </div>
    </div>
  `;
}

function renderCitationGraph(graph) {
  if (!graph || !graph.nodes || !graph.nodes.length) return `<div class="text-muted">No connection data available</div>`;

  const nodeMap = graph.nodes.map(node => {
    let icon = '⚖️';
    if (node.type === 'supreme_court') icon = '🏛️ SC';
    else if (node.type === 'high_court') icon = '🏛️ HC';

    return `
      <div class="card" style="padding: 12px; border-radius: 8px; width: 100%; max-width: 320px; background: var(--bg-secondary); border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--primary); margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          <span>${icon}</span>
        </div>
        <div style="font-weight: 500; font-size: 0.875rem; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
          ${escapeHtml(node.label)}
        </div>
      </div>
    `;
  }).join(`
    <div style="margin: 12px 0; display: flex; flex-direction: column; align-items: center;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4V20M12 20L6 14M12 20L18 14" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="text-xs text-muted" style="margin-top: 4px;">cites precedent</div>
    </div>
  `);

  return `
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
      <div style="font-size: 0.8125rem; font-weight: 500; color: var(--text-secondary); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Hierarchy Citation Flow</div>
      <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        ${nodeMap}
      </div>
    </div>
  `;
}

function formatCitationAsHTML(query, result) {
  let html = `<h1>Citation Report: ${escapeHtml(query)}</h1><div class="meta">Generated by NyayaGPT</div>`;
  if (result.judgments?.length) {
    html += '<div class="section"><div class="section-title">Top Authority Precedents</div>';
    result.judgments.forEach(j => {
      html += `<p><strong>${escapeHtml(j.name)}</strong> — <em>${escapeHtml(j.citation)}</em> (${escapeHtml(j.court)}, ${j.year})<br><strong>Strength:</strong> ${escapeHtml(j.citation_strength)} | <strong>Cited count:</strong> ${j.citation_count}<br>${escapeHtml(j.snippet)}</p>`;
    });
    html += '</div>';
  }
  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
