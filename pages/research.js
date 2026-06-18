// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Redesigned Premium AI Research Workspace
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { toast } from '../components/toast.js';
import { processQueryWorkflow, hasApiKey } from '../services/ai.js';

const SUGGESTED_QUERIES = [
  'What are the ingredients of cheating under BNS?',
  'Latest Supreme Court judgments on privacy?',
  'Important precedents on arbitration?',
  'Remedies for breach of contract under Indian law',
];

let currentMode = 'legal'; // 'legal' | 'deep' | 'general'

export function renderResearch() {
  const history = storage.getResearchHistory();

  return `
    <div class="page-content animate-fade-up" style="height: calc(100vh - 100px); display: flex; flex-direction: column; padding: 20px 24px; overflow: hidden;">
      
      <!-- Layout Wrapper -->
      <div class="research-grid" style="flex: 1; display: grid; grid-template-columns: 260px 1fr 340px; gap: 20px; overflow: hidden; min-height: 0;">
        
        <!-- ================= PANEL 1: LEFT SIDEBAR ================= -->
        <div class="card panel-sidebar" style="padding: 16px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto;">
          <button class="btn btn-primary" id="new-research-btn" style="width: 100%;">
            ✨ New Research
          </button>
          
          <div>
            <h5 style="font-size: 0.8125rem; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 8px; font-family: var(--font-headline);">Search Mode</h5>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <button class="btn mode-selector-btn ${currentMode === 'legal' ? 'active' : 'btn-ghost'}" data-mode="legal" style="justify-content: flex-start; text-align: left; padding: 8px 12px; font-size: 0.8125rem; width: 100%;">
                🔍 Legal Research
              </button>
              <button class="btn mode-selector-btn ${currentMode === 'deep' ? 'active' : 'btn-ghost'}" data-mode="deep" style="justify-content: flex-start; text-align: left; padding: 8px 12px; font-size: 0.8125rem; width: 100%;">
                🧠 Deep Analysis
              </button>
              <button class="btn mode-selector-btn ${currentMode === 'general' ? 'active' : 'btn-ghost'}" data-mode="general" style="justify-content: flex-start; text-align: left; padding: 8px 12px; font-size: 0.8125rem; width: 100%;">
                🤖 General AI
              </button>
            </div>
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; min-height: 0;">
            <h5 style="font-size: 0.8125rem; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 8px; font-family: var(--font-headline);">Recent Queries</h5>
            <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;" id="recent-queries-list">
              ${history.length === 0 ? `
                <div style="font-size: 0.75rem; color: var(--text-tertiary); text-align: center; padding: 20px 0;">No queries recorded.</div>
              ` : history.slice(0, 10).map(h => `
                <div class="card card-interactive recent-query-item" data-query-text="${escapeHtml(h.query)}" style="padding: 10px; margin: 0; font-size: 0.75rem; border: 1px solid rgba(0,0,0,0.03);">
                  <div style="font-weight: 500; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; color: var(--text-primary);">${escapeHtml(h.query)}</div>
                  <div style="font-size: 0.625rem; color: var(--text-tertiary); margin-top: 2px;">${h.actsCount || 0} acts · ${h.judgmentsCount || 0} judgments</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- ================= PANEL 2: CENTER CANVAS ================= -->
        <div class="card panel-canvas" style="padding: 20px; display: flex; flex-direction: column; overflow: hidden;">
          
          <!-- Mode Label Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 12px; margin-bottom: 16px;">
            <div>
              <span id="canvas-mode-badge" class="badge badge-primary" style="text-transform: uppercase; font-weight: 600; font-size: 0.6875rem; font-family: var(--font-headline);">
                ${currentMode === 'legal' ? 'Legal Research Mode' : currentMode === 'deep' ? 'Deep Research Memo Mode' : 'General Assistant'}
              </span>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-tertiary);">
              ${!hasApiKey() ? '🔌 Demo Mode' : '🟢 API Connected'}
            </div>
          </div>

          <!-- Output stream -->
          <div style="flex: 1; overflow-y: auto; margin-bottom: 16px; padding-right: 4px;" id="canvas-stream">
            <div id="welcome-canvas" style="padding: 24px; text-align: center; margin-top: 40px; max-width: 460px; margin-left: auto; margin-right: auto;">
              <span style="font-size: 2.5rem;">⚖️</span>
              <h3 style="margin-top: 12px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Search Indian Jurisprudence</h3>
              <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.5;">
                Enter search questions above. Mode switches let you toggle between statutory summaries, deep structural legal memos, and general utility AI tools.
              </p>
            </div>
          </div>

          <!-- Bottom Query Panel -->
          <div class="research-input-container" style="background: rgba(0,0,0,0.01); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px;">
            <div style="display: flex; gap: 12px; align-items: flex-end;">
              <textarea class="form-textarea" id="research-query" placeholder="Ask about any Indian law, judgment, statute, precedent, or legal issue..." rows="2" style="flex: 1; min-height: 50px; background: transparent; border: none; padding: 0; font-size: 0.875rem; color: var(--text-primary); outline: none; box-shadow: none;"></textarea>
              <button class="btn btn-primary" id="research-submit-btn" style="padding: 8px 16px;">
                <span id="submit-btn-text">Execute</span>
              </button>
            </div>
            <div class="suggested-queries" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; border-top: 1px solid rgba(0,0,0,0.02); padding-top: 8px;">
              ${SUGGESTED_QUERIES.map(q => `<button class="chip text-xs" data-suggest-query="${q}" style="font-size: 0.6875rem; border: 1px solid rgba(0,0,0,0.04); cursor: pointer; padding: 4px 8px; border-radius: 4px; background: rgba(0,0,0,0.01);">${q}</button>`).join('')}
            </div>
          </div>

        </div>

        <!-- ================= PANEL 3: RIGHT SIDEBAR ================= -->
        <div class="card panel-inspector" style="padding: 16px; display: flex; flex-direction: column; overflow: hidden;">
          <h4 style="margin-bottom: 12px; font-size: 0.875rem; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.5px; font-family: var(--font-headline); border-bottom: 1px solid var(--border); padding-bottom: 8px;">Citations & Graph</h4>
          <div id="inspector-placeholder" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--text-muted); padding: 20px;">
            <span style="font-size: 1.5rem; margin-bottom: 12px;">🔍</span>
            <div style="font-size: 0.8125rem; font-weight: 500;">No Citation Analysis</div>
            <div style="font-size: 0.75rem; max-width: 180px; margin-top: 4px;">Search in Legal or Deep mode to display citing networks and precedent lists here.</div>
          </div>
          <div id="inspector-content" style="flex: 1; overflow-y: auto; display: none; padding-right: 4px;"></div>
        </div>

      </div>
    </div>
  `;
}

export function initResearch() {
  const submitBtn = document.getElementById('research-submit-btn');
  const textarea = document.getElementById('research-query');

  document.getElementById('new-research-btn')?.addEventListener('click', () => {
    document.getElementById('canvas-stream').innerHTML = `
      <div id="welcome-canvas" style="padding: 24px; text-align: center; margin-top: 40px; max-width: 460px; margin-left: auto; margin-right: auto;">
        <span style="font-size: 2.5rem;">⚖️</span>
        <h3 style="margin-top: 12px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Search Indian Jurisprudence</h3>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.5;">
          Enter search questions above. Mode switches let you toggle between statutory summaries, deep structural legal memos, and general utility AI tools.
        </p>
      </div>
    `;
    document.getElementById('inspector-placeholder').style.display = 'flex';
    document.getElementById('inspector-content').style.display = 'none';
    if (textarea) textarea.value = '';
  });

  document.querySelectorAll('.mode-selector-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-selector-btn').forEach(b => {
        b.classList.remove('active');
        b.classList.add('btn-ghost');
      });
      btn.classList.add('active');
      btn.classList.remove('btn-ghost');

      currentMode = btn.dataset.mode;
      const badge = document.getElementById('canvas-mode-badge');
      if (badge) {
        badge.textContent = currentMode === 'legal' ? 'Legal Research Mode' : currentMode === 'deep' ? 'Deep Research Memo Mode' : 'General Assistant';
      }
    });
  });

  document.querySelectorAll('[data-suggest-query]').forEach(chip => {
    chip.addEventListener('click', () => {
      if (textarea) {
        textarea.value = chip.dataset.suggestQuery;
        textarea.focus();
      }
    });
  });

  document.querySelectorAll('.recent-query-item').forEach(item => {
    item.addEventListener('click', () => {
      if (textarea) {
        textarea.value = item.dataset.queryText;
        executeResearch(textarea, submitBtn);
      }
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => executeResearch(textarea, submitBtn));
  }

  if (textarea) {
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        executeResearch(textarea, submitBtn);
      }
    });
  }
}

async function executeResearch(textarea, submitBtn) {
  const query = textarea.value.trim();
  if (!query) {
    toast.warning('Please input your research topic');
    return;
  }

  const stream = document.getElementById('canvas-stream');
  submitBtn.disabled = true;
  document.getElementById('submit-btn-text').textContent = 'Analyzing...';

  if (currentMode === 'deep') {
    stream.innerHTML = renderProgressiveSteps();
    await animateProgressiveSteps();
  } else {
    stream.innerHTML = `
      <div style="padding: 40px; text-align: center;">
        <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
        <p class="text-muted" style="font-size: 0.875rem;">Querying legal engine and generating output stream...</p>
      </div>
    `;
  }

  try {
    // ALWAYS call processQueryWorkflow with the user's actual query
    const result = await processQueryWorkflow(query, currentMode);

    storage.incrementUsage('research');
    storage.logActivity('research', `${currentMode === 'deep' ? 'Deep' : 'Legal'} research executed`, '🔍');

    // Save search item to history
    storage.saveResearch({
      query,
      actsCount: result.acts?.length || result.applicable_laws?.length || 0,
      judgmentsCount: result.judgments?.length || 0,
    });

    // Populate canvas center stream
    stream.innerHTML = renderCanvasResult(query, result);
    stream.scrollTop = 0;

    // Populate right side inspector citation panels
    populateInspector(result);

    // Save and export button listeners
    document.getElementById('save-workspace-btn')?.addEventListener('click', () => {
      storage.saveDocument({
        type: 'research',
        title: query,
        content: result,
      });
      toast.success('Research memo successfully saved to library');
    });

    document.getElementById('export-canvas-btn')?.addEventListener('click', () => {
      import('../utils/pdf.js').then(mod => {
        mod.downloadAsHTML(
          formatCanvasResultAsHTML(query, result),
          `Research: ${query}`,
          `research_${Date.now()}.html`
        );
      });
    });

  } catch (err) {
    toast.error('Legal index retrieval failed: ' + err.message);
    stream.innerHTML = `<div style="padding:20px; color:var(--danger)">An error occurred: ${err.message}</div>`;
  } finally {
    submitBtn.disabled = false;
    document.getElementById('submit-btn-text').textContent = 'Execute';
  }
}

function renderProgressiveSteps() {
  return `
    <div style="padding: 32px; max-width: 400px; margin: 40px auto 0;">
      <h4 style="margin-bottom: 20px; font-weight: 600; color: var(--text-primary); text-align: center; font-family: var(--font-headline);">Deep Research Agent Active</h4>
      <div class="processing-steps" style="display: flex; flex-direction: column; gap: 12px;">
        <div class="processing-step" id="step-statutes">
          <div class="processing-step-icon" style="background: rgba(0,0,0,0.05); color: var(--text-tertiary); display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 0.625rem; margin-right: 8px;">1</div>
          <span style="font-size: 0.8125rem;">Searching Statutes...</span>
        </div>
        <div class="processing-step" id="step-judgments">
          <div class="processing-step-icon" style="background: rgba(0,0,0,0.05); color: var(--text-tertiary); display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 0.625rem; margin-right: 8px;">2</div>
          <span style="font-size: 0.8125rem;">Searching Judgments...</span>
        </div>
        <div class="processing-step" id="step-citations">
          <div class="processing-step-icon" style="background: rgba(0,0,0,0.05); color: var(--text-tertiary); display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 0.625rem; margin-right: 8px;">3</div>
          <span style="font-size: 0.8125rem;">Finding Citations...</span>
        </div>
        <div class="processing-step" id="step-compare">
          <div class="processing-step-icon" style="background: rgba(0,0,0,0.05); color: var(--text-tertiary); display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 0.625rem; margin-right: 8px;">4</div>
          <span style="font-size: 0.8125rem;">Comparing Cases...</span>
        </div>
        <div class="processing-step" id="step-memo">
          <div class="processing-step-icon" style="background: rgba(0,0,0,0.05); color: var(--text-tertiary); display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 0.625rem; margin-right: 8px;">5</div>
          <span style="font-size: 0.8125rem;">Generating Memorandum...</span>
        </div>
      </div>
    </div>
  `;
}

async function animateProgressiveSteps() {
  const steps = ['step-statutes', 'step-judgments', 'step-citations', 'step-compare', 'step-memo'];
  for (const stepId of steps) {
    const el = document.getElementById(stepId);
    if (el) {
      el.classList.add('active');
      const icon = el.querySelector('.processing-step-icon');
      if (icon) {
        icon.innerHTML = '🔄';
        icon.style.background = 'transparent';
      }
      await new Promise(r => setTimeout(r, 400));
      if (icon) {
        icon.innerHTML = '✅';
        icon.style.color = 'var(--secondary)';
      }
      el.classList.remove('active');
      el.style.opacity = '0.7';
    }
  }
}

function renderCanvasResult(query, result) {
  if (!result.is_legal) {
    return `
      <div style="font-size: 0.875rem; line-height: 1.6; color: var(--text-primary);">
        <h5 style="font-weight: 600; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; margin-bottom: 6px;">User Query</h5>
        <p style="background: rgba(0,0,0,0.02); padding: 12px; border-radius: 6px; margin-bottom: 20px; border: 1px solid var(--border-light); font-style: italic;">"${escapeHtml(query)}"</p>
        
        <h5 style="font-weight: 600; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; margin-bottom: 6px;">AI Assistant Response</h5>
        <div style="white-space: pre-wrap; background: rgba(0,0,0,0.01); border: 1px solid var(--border); padding: 16px; border-radius: 8px; color: var(--text-primary);">${escapeHtml(result.answer)}</div>
      </div>
    `;
  }

  // Legal result layout
  let sourcesHtml = '';
  if (result.sources_found === false) {
    sourcesHtml = `
      <div class="card" style="padding: 12px; border-left: 4px solid var(--danger); margin-bottom: 20px; background: rgba(239,68,68,0.02); border-color: rgba(239,68,68,0.1);">
        <h6 style="color: var(--danger); margin: 0 0 4px; font-weight: 600;">No Legal Sources Found</h6>
        <p style="margin: 0; font-size: 0.75rem; color: var(--text-secondary);">The legal engine did not retrieve specific statutory codes or judgments for this query. Falling back to general legal AI reasoning.</p>
      </div>
    `;
  } else {
    const acts = result.acts || result.applicable_laws || [];
    const judgments = result.judgments || [];
    const actBadges = acts.map(a => `<span class="badge badge-primary" style="margin-right: 6px; margin-bottom: 6px;">${escapeHtml(a.name || a.act)} - ${escapeHtml(a.section)}</span>`).join('');
    const caseBadges = judgments.map(j => `<span class="badge badge-success" style="margin-right: 6px; margin-bottom: 6px;">⚖️ ${escapeHtml(j.name)} (${j.year})</span>`).join('');
    sourcesHtml = `
      <div style="margin-bottom: 20px;">
        <h5 style="font-weight: 600; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; margin-bottom: 8px;">Retrieved Sources</h5>
        <div style="display: flex; flex-wrap: wrap;">
          ${actBadges}
          ${caseBadges}
        </div>
      </div>
    `;
  }

  const reasoningHtml = result.reasoning_summary ? `
    <div style="margin-bottom: 20px; background: rgba(37,99,235,0.02); border: 1px solid rgba(37,99,235,0.1); padding: 12px; border-radius: 6px;">
      <h5 style="font-weight: 600; color: var(--accent); text-transform: uppercase; font-size: 0.6875rem; margin: 0 0 4px;">AI Search & Reasoning Summary</h5>
      <p style="margin: 0; font-size: 0.75rem; color: var(--text-secondary);">${escapeHtml(result.reasoning_summary)}</p>
    </div>
  ` : '';

  if (currentMode === 'deep') {
    return `
      <div style="font-size: 0.875rem; line-height: 1.6;">
        
        <!-- Header Info -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-weight: 700; color: var(--text-primary); font-family: var(--font-headline); margin: 0;">Legal Research Memorandum</h3>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="text-xs text-muted">Confidence Score:</span>
            <span style="font-weight: 700; color: var(--secondary);">${result.confidence_score}%</span>
          </div>
        </div>

        <h5 style="font-weight: 600; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; margin-bottom: 6px; margin-top: 16px;">User Query</h5>
        <p style="background: rgba(0,0,0,0.02); padding: 12px; border-radius: 6px; margin-bottom: 20px; border: 1px solid var(--border-light); font-style: italic;">"${escapeHtml(query)}"</p>

        ${reasoningHtml}
        ${sourcesHtml}

        <div class="card" style="padding: 16px; margin-bottom: 20px; border-left: 4px solid var(--accent);">
          <h5 style="margin-bottom: 6px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Issue Summary</h5>
          <p style="margin: 0; color: var(--text-secondary); font-size: 0.8125rem;">${escapeHtml(result.issue_summary)}</p>
        </div>

        <!-- Arguments pro and con -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div class="card" style="padding: 14px; background: rgba(16,185,129,0.02); border-color: rgba(16,185,129,0.1);">
            <h5 style="color: var(--secondary); margin-bottom: 8px; font-weight: 600; font-family: var(--font-headline);">Arguments FOR</h5>
            <ul style="padding-left: 16px; margin: 0; font-size: 0.75rem; display: flex; flex-direction: column; gap: 6px;">
              ${(result.arguments_for || []).map(arg => `<li>${escapeHtml(arg)}</li>`).join('')}
            </ul>
          </div>
          <div class="card" style="padding: 14px; background: rgba(239,68,68,0.02); border-color: rgba(239,68,68,0.1);">
            <h5 style="color: var(--danger); margin-bottom: 8px; font-weight: 600; font-family: var(--font-headline);">Arguments AGAINST</h5>
            <ul style="padding-left: 16px; margin: 0; font-size: 0.75rem; display: flex; flex-direction: column; gap: 6px;">
              ${(result.arguments_against || []).map(arg => `<li>${escapeHtml(arg)}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Potential Risks -->
        <div style="margin-bottom: 20px;">
          <h5 style="font-weight: 600; color: var(--text-primary); margin-bottom: 8px; font-family: var(--font-headline);">Litigation & Compliance Risks</h5>
          <ul style="padding-left: 20px; font-size: 0.8125rem; display: flex; flex-direction: column; gap: 4px;">
            ${(result.potential_risks || []).map(risk => `<li>${escapeHtml(risk)}</li>`).join('')}
          </ul>
        </div>

        <!-- Main analysis -->
        <div style="margin-bottom: 20px;">
          <h5 style="font-weight: 600; color: var(--text-primary); margin-bottom: 8px; font-family: var(--font-headline);">Detailed Analysis</h5>
          <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6;">${escapeHtml(result.analysis || '')}</p>
        </div>

        <!-- Research Conclusion -->
        <div style="margin-bottom: 20px; background: rgba(0,0,0,0.01); border: 1px solid var(--border); padding: 16px; border-radius: 8px;">
          <h5 style="margin-bottom: 6px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Concluding Opinion</h5>
          <p style="margin: 0; font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6;">${escapeHtml(result.conclusion)}</p>
        </div>

        <!-- Actions -->
        <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 12px;">
          <button class="btn btn-secondary btn-sm" id="export-canvas-btn">📥 Export Memo</button>
          <button class="btn btn-primary btn-sm" id="save-workspace-btn">💾 Save Project</button>
        </div>

      </div>
    `;
  }

  // Legal Mode Default Output
  const judgmentsTimeline = (result.timeline || []).map(t => `
    <div style="display: flex; gap: 16px; border-left: 2px solid var(--border); padding-left: 16px; margin-left: 8px; padding-bottom: 12px; position: relative;">
      <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent); position: absolute; left: -5px; top: 6px;"></div>
      <div style="font-weight: 700; font-size: 0.8125rem; color: var(--accent); min-width: 45px;">${escapeHtml(t.year)}</div>
      <div style="font-size: 0.75rem; color: var(--text-secondary);">${escapeHtml(t.event)}</div>
    </div>
  `).join('');

  return `
    <div style="font-size: 0.875rem; line-height: 1.6;">
      
      <!-- User Query -->
      <h5 style="font-weight: 600; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; margin-bottom: 6px;">User Query</h5>
      <p style="background: rgba(0,0,0,0.02); padding: 12px; border-radius: 6px; margin-bottom: 20px; border: 1px solid var(--border-light); font-style: italic;">"${escapeHtml(query)}"</p>

      ${reasoningHtml}
      ${sourcesHtml}

      <!-- Final Answer / Analysis -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 12px; margin-bottom: 16px; margin-top: 24px;">
        <h4 style="font-weight: 700; color: var(--text-primary); margin: 0; font-family: var(--font-headline);">Final AI Answer</h4>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--text-secondary);">
          <span>Confidence:</span>
          <span style="font-weight: 700; color: var(--secondary);">${result.confidence_score || 90}%</span>
        </div>
      </div>

      <div style="background: rgba(0,0,0,0.01); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 24px; color: var(--text-secondary);">
        ${result.analysis.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}
      </div>

      <!-- Precedent Timeline -->
      ${judgmentsTimeline ? `
        <div style="margin-bottom: 24px;">
          <h5 style="font-weight: 600; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; margin-bottom: 12px; font-family: var(--font-headline);">Precedent History & Timeline</h5>
          <div style="margin-top: 12px;">${judgmentsTimeline}</div>
        </div>
      ` : ''}

      <!-- Suggested questions -->
      ${(result.follow_ups || []).length > 0 ? `
        <div class="card" style="padding: 16px; background: rgba(0,0,0,0.01); margin-top: 16px;">
          <h5 style="margin-bottom: 8px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Suggested Queries</h5>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${result.follow_ups.map(fq => `
              <div class="recent-query-item" style="font-size: 0.75rem; padding: 6px 10px; cursor: pointer; color: var(--accent); background: transparent;" onclick="document.getElementById('research-query').value='${escapeHtml(fq).replace(/'/g, "\\'")}'; document.getElementById('research-query').focus();">
                👉 ${escapeHtml(fq)}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Actions -->
      <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 16px;">
        <button class="btn btn-secondary btn-sm" id="export-canvas-btn">📥 Export Summary</button>
        <button class="btn btn-primary btn-sm" id="save-workspace-btn">💾 Save Report</button>
      </div>

    </div>
  `;
}

function populateInspector(result) {
  const placeholder = document.getElementById('inspector-placeholder');
  const content = document.getElementById('inspector-content');

  if (!placeholder || !content) return;

  if (!result.is_legal || result.sources_found === false) {
    placeholder.style.display = 'flex';
    content.style.display = 'none';
    return;
  }

  placeholder.style.display = 'none';
  content.style.display = 'block';

  const judgments = result.judgments || [];
  const acts = result.acts || result.applicable_laws || [];

  const graphHtml = renderGraphFlow(judgments);

  content.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.8125rem;">
      
      <!-- Graph Network -->
      <div>
        <div style="font-weight: 600; margin-bottom: 8px; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; font-family: var(--font-headline);">Citation Connection Network</div>
        <div style="background: rgba(0,0,0,0.01); border: 1px solid var(--border); border-radius: 6px; padding: 12px; display: flex; flex-direction: column; align-items: center;">
          ${graphHtml}
        </div>
      </div>

      <!-- Acts list -->
      ${acts.length > 0 ? `
        <div>
          <div style="font-weight: 600; margin-bottom: 6px; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; font-family: var(--font-headline);">Statutes & Act Codes</div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${acts.map(a => `
              <div class="card" style="padding: 10px; margin: 0; border: 1px solid rgba(0,0,0,0.03);">
                <div style="font-weight: 600; color: var(--text-primary);">${escapeHtml(a.name || a.act)}</div>
                <div class="badge badge-primary" style="margin-top: 4px; font-size: 0.625rem;">${escapeHtml(a.section)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Cases cards -->
      ${judgments.length > 0 ? `
        <div>
          <div style="font-weight: 600; margin-bottom: 6px; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; font-family: var(--font-headline);">Top Authorities</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${judgments.map(j => {
              const strength = j.strength || j.relevance || 85;
              const strengthLabel = strength >= 90 ? 'High' : strength >= 70 ? 'Medium' : 'Low';
              const badgeClass = strength >= 90 ? 'badge-success' : 'badge-primary';

              return `
                <div class="card card-interactive citation-card-item" data-case-title="${escapeHtml(j.name)}" data-case-ratio="${escapeHtml(j.snippet)}" style="padding: 12px; margin: 0; border: 1px solid rgba(0,0,0,0.03);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                    <div style="font-weight: 600; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 180px;">${escapeHtml(j.name)}</div>
                    <span class="badge ${badgeClass}" style="font-size: 0.625rem;">${strengthLabel}</span>
                  </div>
                  <div style="font-size: 0.6875rem; color: var(--text-secondary); margin-bottom: 6px;">${escapeHtml(j.citation)} | ${escapeHtml(j.court)}</div>
                  <div style="font-size: 0.6875rem; line-height: 1.5; color: var(--text-tertiary); max-height: 48px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                    ${escapeHtml(j.snippet)}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

    </div>
  `;

  document.querySelectorAll('.citation-card-item').forEach(card => {
    card.addEventListener('click', () => {
      const ratio = card.dataset.caseRatio;
      toast.info(`Precedent ratio: ${ratio}`, 4000);
    });
  });
}

function renderGraphFlow(judgments) {
  if (!judgments || judgments.length === 0) return '<div class="text-xs text-muted">No graph connections</div>';

  const nodes = judgments.map((j, i) => `
    <div style="display: flex; align-items: center; gap: 8px; width: 100%; border: 1px solid var(--border); padding: 6px 10px; border-radius: 4px; background: var(--bg-surface);">
      <span style="font-size: 0.75rem;">🏛️</span>
      <div style="flex: 1; overflow: hidden; font-size: 0.6875rem; font-weight: 500; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
        ${escapeHtml(j.name)} (${j.year})
      </div>
    </div>
  `).join(`
    <div style="margin: 4px 0; display: flex; flex-direction: column; align-items: center;">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2V10M6 10L3 7M6 10L9 7" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  `);

  return `
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%; gap: 4px;">
      ${nodes}
    </div>
  `;
}

function formatCanvasResultAsHTML(query, result) {
  let html = `<h1>NyayaGPT Research Memorandum: ${escapeHtml(query)}</h1><div class="meta">Confidence Score: ${result.confidence_score || 90}%</div>`;
  
  if (result.issue_summary) {
    html += `<div class="section"><div class="section-title">Issue Summary</div><p>${escapeHtml(result.issue_summary)}</p></div>`;
  }
  
  if (result.applicable_laws?.length) {
    html += '<div class="section"><div class="section-title">Applicable Laws</div>';
    result.applicable_laws.forEach(l => {
      html += `<p><strong>${escapeHtml(l.act)} — ${escapeHtml(l.section)}</strong><br>${escapeHtml(l.description)}</p>`;
    });
    html += '</div>';
  }

  if (result.judgments?.length) {
    html += '<div class="section"><div class="section-title">Cited Authorities & Precedents</div>';
    result.judgments.forEach(j => {
      html += `<p><strong>${escapeHtml(j.name)}</strong> (${escapeHtml(j.citation)}) - ${escapeHtml(j.court)}, ${j.year}<br>${escapeHtml(j.snippet)}</p>`;
    });
    html += '</div>';
  }

  if (result.analysis) {
    html += `<div class="section"><div class="section-title">Analysis</div><p>${result.analysis.replace(/\n/g, '<br>')}</p></div>`;
  }

  if (result.conclusion) {
    html += `<div class="section"><div class="section-title">Concluding Opinion</div><p>${escapeHtml(result.conclusion)}</p></div>`;
  }

  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
