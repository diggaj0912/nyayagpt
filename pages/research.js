// ═══════════════════════════════════════════════════════════════
// NyayaGPT — AI Research Page
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { toast } from '../components/toast.js';
import { researchQuery, hasApiKey, getMockResearchResult } from '../services/ai.js';

const SUGGESTED_QUERIES = [
  'Grounds for bail under CrPC',
  'Section 498A IPC misuse safeguards',
  'Rights of tenants under Rent Control Act',
  'Startup incorporation under Companies Act',
  'Fundamental rights under Article 21',
  'Cheque bounce case procedure',
];

export function renderResearch() {
  const history = storage.getResearchHistory();

  return `
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>🔍 AI Legal Research</h2>
        <p>Ask any legal question in natural language. Get relevant Acts, judgments, and analysis.</p>
      </div>

      <div class="research-input-container">
        <div class="research-input-box" id="research-input-box">
          <textarea class="research-textarea" id="research-query" placeholder="Ask a legal question... e.g., 'What are the grounds for divorce under Hindu law?'" rows="3"></textarea>
          <div class="research-input-footer">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="text-xs text-muted">⚡ Powered by AI</span>
              ${!hasApiKey() ? '<span class="badge badge-warning">Demo Mode</span>' : '<span class="badge badge-success">API Connected</span>'}
            </div>
            <button class="btn btn-primary" id="research-btn">
              <span id="research-btn-text">Research</span>
            </button>
          </div>
        </div>
        <div class="suggested-queries" id="suggested-queries">
          ${SUGGESTED_QUERIES.map(q => `<button class="chip" data-query="${q}">${q}</button>`).join('')}
        </div>
      </div>

      <div id="research-results"></div>

      ${history.length > 0 ? `
        <div style="margin-top: 32px;">
          <h4 style="margin-bottom: 16px; color: var(--text-secondary);">Recent Research</h4>
          ${history.slice(0, 5).map(h => `
            <div class="card card-interactive" style="margin-bottom: 8px; padding: 16px;" data-history-query="${escapeHtml(h.query)}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 500; font-size: 0.9375rem;">${escapeHtml(h.query)}</div>
                  <div class="text-xs text-muted" style="margin-top: 4px;">${h.actsCount || 0} acts · ${h.judgmentsCount || 0} judgments</div>
                </div>
                <span class="text-xs text-muted">${new Date(h.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

export function initResearch() {
  const btn = document.getElementById('research-btn');
  const textarea = document.getElementById('research-query');
  const resultsDiv = document.getElementById('research-results');

  // Submit on button click
  if (btn) {
    btn.addEventListener('click', () => doResearch(textarea, resultsDiv, btn));
  }

  // Submit on Enter (without Shift)
  if (textarea) {
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        doResearch(textarea, resultsDiv, btn);
      }
    });
  }

  // Suggested queries
  document.querySelectorAll('[data-query]').forEach(chip => {
    chip.addEventListener('click', () => {
      textarea.value = chip.dataset.query;
      textarea.focus();
    });
  });

  // History items
  document.querySelectorAll('[data-history-query]').forEach(card => {
    card.addEventListener('click', () => {
      textarea.value = card.dataset.historyQuery;
      doResearch(textarea, resultsDiv, btn);
    });
  });
}

async function doResearch(textarea, resultsDiv, btn) {
  const query = textarea.value.trim();
  if (!query) {
    toast.warning('Please enter a legal question');
    return;
  }

  // Show loading state
  btn.disabled = true;
  document.getElementById('research-btn-text').textContent = 'Researching...';
  resultsDiv.innerHTML = renderLoading();

  try {
    let result;
    if (hasApiKey()) {
      result = await researchQuery(query);
    } else {
      // Demo mode — simulate delay and use mock data
      await new Promise(r => setTimeout(r, 2000));
      result = getMockResearchResult();
      toast.info('Showing demo results. Add your Gemini API key in Settings for live research.');
    }

    // Save to history
    storage.saveResearch({
      query,
      actsCount: result.acts?.length || 0,
      judgmentsCount: result.judgments?.length || 0,
    });
    storage.incrementUsage('research');
    storage.logActivity('research', `Researched: ${query.slice(0, 50)}...`, '🔍');

    // Render results
    resultsDiv.innerHTML = renderResults(result);
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Attach save button handler
    document.getElementById('save-research-btn')?.addEventListener('click', () => {
      storage.saveDocument({
        type: 'research',
        title: query,
        content: result,
      });
      toast.success('Research saved to library');
    });

    // Attach export button handler
    document.getElementById('export-research-btn')?.addEventListener('click', () => {
      const { downloadAsHTML } = import('../utils/pdf.js').then(mod => {
        mod.downloadAsHTML(
          formatResultsAsHTML(query, result),
          `Legal Research: ${query}`,
          `research_${Date.now()}.html`
        );
      });
    });

  } catch (err) {
    if (err.message === 'API_KEY_MISSING') {
      toast.warning('Please add your Gemini API key in Settings');
      // Fall back to demo
      await new Promise(r => setTimeout(r, 1500));
      const result = getMockResearchResult();
      resultsDiv.innerHTML = renderResults(result);
      toast.info('Showing demo results');
    } else if (err.message === 'API_KEY_INVALID') {
      toast.error('Invalid API key. Please check your Gemini API key in Settings.');
      resultsDiv.innerHTML = '';
    } else {
      toast.error('Research failed: ' + err.message);
      resultsDiv.innerHTML = '';
    }
  } finally {
    btn.disabled = false;
    document.getElementById('research-btn-text').textContent = 'Research';
  }
}

function renderLoading() {
  return `
    <div class="result-section animate-fade-up" style="padding: 40px; text-align: center;">
      <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
      <p class="text-muted">Searching Indian legal knowledge base...</p>
      <div class="processing-steps" style="max-width: 300px; margin: 20px auto 0; text-align: left;">
        <div class="processing-step active">
          <div class="processing-step-icon">🔍</div>
          <span>Analyzing your query</span>
        </div>
        <div class="processing-step pending">
          <div class="processing-step-icon">📜</div>
          <span>Finding relevant Acts & Sections</span>
        </div>
        <div class="processing-step pending">
          <div class="processing-step-icon">⚖️</div>
          <span>Matching case judgments</span>
        </div>
        <div class="processing-step pending">
          <div class="processing-step-icon">🤖</div>
          <span>Generating legal analysis</span>
        </div>
      </div>
    </div>
  `;
}

function renderResults(result) {
  const acts = (result.acts || []).map(act => `
    <div class="act-card">
      <h5>${escapeHtml(act.name)}</h5>
      <div class="badge badge-primary" style="margin-bottom: 8px;">${escapeHtml(act.section)}</div>
      <p>${escapeHtml(act.description)}</p>
    </div>
  `).join('');

  const judgments = (result.judgments || []).map(j => {
    const relevanceLevel = j.relevance >= 80 ? 'high' : j.relevance >= 50 ? 'medium' : 'low';
    const filledSegments = Math.round(j.relevance / 20);
    const segments = Array.from({ length: 5 }, (_, i) =>
      `<div class="relevance-segment ${i < filledSegments ? `filled ${relevanceLevel}` : ''}"></div>`
    ).join('');

    return `
      <div class="judgment-card">
        <div class="case-name">${escapeHtml(j.name)}</div>
        <div class="case-meta">
          <span>${escapeHtml(j.citation)}</span>
          <span>${escapeHtml(j.court)}</span>
          <span>${j.year}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span class="text-xs text-muted">Relevance:</span>
          <div class="relevance-bar">${segments}</div>
          <span class="text-xs" style="color: var(--${relevanceLevel === 'high' ? 'secondary' : relevanceLevel === 'medium' ? 'accent' : 'danger'});">${j.relevance}%</span>
        </div>
        <div class="case-snippet">${escapeHtml(j.snippet)}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="research-results animate-fade-up">
      ${acts ? `
        <div class="result-section">
          <div class="result-section-header">
            <span class="icon">📜</span> Relevant Acts & Sections
            <span class="badge badge-primary" style="margin-left: auto;">${result.acts?.length || 0}</span>
          </div>
          <div class="result-section-content">${acts}</div>
        </div>
      ` : ''}

      ${judgments ? `
        <div class="result-section">
          <div class="result-section-header">
            <span class="icon">⚖️</span> Key Judgments
            <span class="badge badge-success" style="margin-left: auto;">${result.judgments?.length || 0}</span>
          </div>
          <div class="result-section-content">${judgments}</div>
        </div>
      ` : ''}

      ${result.analysis ? `
        <div class="result-section">
          <div class="result-section-header">
            <span class="icon">🤖</span> AI Legal Analysis
          </div>
          <div class="ai-analysis">${formatAnalysis(result.analysis)}</div>
        </div>
      ` : ''}

      <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px;">
        <button class="btn btn-secondary btn-sm" id="export-research-btn">📥 Export</button>
        <button class="btn btn-primary btn-sm" id="save-research-btn">💾 Save to Library</button>
      </div>
    </div>
  `;
}

function formatAnalysis(text) {
  return text
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/Section\s+(\d+[A-Za-z]*)/g, '<span class="citation">Section $1</span>')
    .replace(/Article\s+(\d+[A-Za-z]*)/g, '<span class="citation">Article $1</span>');
}

function formatResultsAsHTML(query, result) {
  let html = `<h1>Legal Research: ${escapeHtml(query)}</h1><div class="meta">Generated by NyayaGPT</div>`;
  if (result.acts?.length) {
    html += '<div class="section"><div class="section-title">Relevant Acts & Sections</div>';
    result.acts.forEach(a => {
      html += `<p><strong>${escapeHtml(a.name)} — ${escapeHtml(a.section)}</strong><br>${escapeHtml(a.description)}</p>`;
    });
    html += '</div>';
  }
  if (result.judgments?.length) {
    html += '<div class="section"><div class="section-title">Key Judgments</div>';
    result.judgments.forEach(j => {
      html += `<p><strong>${escapeHtml(j.name)}</strong><br><em>${escapeHtml(j.citation)} | ${escapeHtml(j.court)}</em><br>${escapeHtml(j.snippet)}</p>`;
    });
    html += '</div>';
  }
  if (result.analysis) {
    html += `<div class="section"><div class="section-title">AI Analysis</div><p>${escapeHtml(result.analysis)}</p></div>`;
  }
  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
