// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Workspace Canvas Page
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { toast } from '../components/toast.js';

export function renderWorkspace() {
  const documents = storage.getDocuments();

  return `
    <div class="page-content animate-fade-up" style="height: calc(100vh - 100px); display: flex; flex-direction: column; padding: 24px;">
      <div class="page-header" style="margin-bottom: 16px;">
        <h2>💼 Interactive Legal Workspace</h2>
        <p>Compile summaries, citation details, and custom drafts into a master project folder.</p>
      </div>

      <div class="workspace-layout" style="flex: 1; display: grid; grid-template-columns: 280px 1fr 1fr; gap: 20px; overflow: hidden; min-height: 0;">
        
        <!-- Column 1: Assets selector -->
        <div class="card" style="padding: 16px; display: flex; flex-direction: column; overflow: hidden;">
          <h4 style="margin-bottom: 12px; font-size: 0.9375rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Workspace Assets</h4>
          <div style="font-size: 0.8125rem; margin-bottom: 12px; color: var(--text-muted);">Select files from your Library to pin to this session:</div>
          <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;" id="workspace-asset-list">
            ${documents.length === 0 ? `
              <div style="padding: 24px 8px; text-align: center; color: var(--text-muted); font-size: 0.875rem;">
                No library files found.<br>Save some research or summaries first!
              </div>
            ` : documents.map(doc => `
              <div class="card card-interactive workspace-asset-item" data-asset-id="${doc.id}" style="padding: 10px; margin: 0; display: flex; align-items: center; gap: 8px; cursor: pointer; border: 1px solid rgba(255,255,255,0.03);">
                <span style="font-size: 1.125rem;">${doc.type === 'research' ? '🔍' : doc.type === 'summary' ? '📄' : doc.type === 'draft' ? '✍️' : '⚖️'}</span>
                <div style="flex: 1; overflow: hidden;">
                  <div style="font-weight: 500; font-size: 0.8125rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(doc.title)}</div>
                  <div style="font-size: 0.6875rem; color: var(--text-muted); text-transform: capitalize;">${doc.type}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Column 2: Selected Asset Details Pane -->
        <div class="card" style="padding: 16px; display: flex; flex-direction: column; overflow: hidden;">
          <h4 style="margin-bottom: 12px; font-size: 0.9375rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Asset Inspector</h4>
          <div id="inspector-placeholder" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--text-muted); padding: 20px;">
            <span style="font-size: 2rem; margin-bottom: 12px;">🔍</span>
            <div style="font-size: 0.875rem; font-weight: 500;">No File Selected</div>
            <div style="font-size: 0.75rem; max-width: 180px; margin-top: 4px;">Click any pinned library file on the left to inspect its contents.</div>
          </div>
          <div id="inspector-content" style="flex: 1; overflow-y: auto; display: none; padding-right: 4px;"></div>
        </div>

        <!-- Column 3: Scratchpad Document Draft -->
        <div class="card" style="padding: 16px; display: flex; flex-direction: column; overflow: hidden; border-left: 2px solid rgba(108,92,231,0.2);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="margin: 0; font-size: 0.9375rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Master Draft</h4>
            <button class="btn btn-primary btn-sm" id="workspace-export-btn">📥 Export Master</button>
          </div>
          <textarea id="master-scratchpad" placeholder="Start drafting your petition, legal advice, or brief here... Copy notes or ratios from the asset inspector on the left and paste them here." style="flex: 1; background: rgba(0,0,0,0.15); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; font-family: 'Inter', sans-serif; font-size: 0.875rem; line-height: 1.6; resize: none; outline: none;"></textarea>
        </div>

      </div>
    </div>
  `;
}

export function initWorkspace() {
  const scratchpad = document.getElementById('master-scratchpad');

  // Load saved scratchpad text from storage if exists
  if (scratchpad) {
    scratchpad.value = storage.get('workspace_scratchpad', '');
    scratchpad.addEventListener('input', () => {
      storage.set('workspace_scratchpad', scratchpad.value);
    });
  }

  // Click handler for library items
  document.querySelectorAll('.workspace-asset-item').forEach(item => {
    item.addEventListener('click', () => {
      const assetId = item.dataset.assetId;
      const docs = storage.getDocuments();
      const doc = docs.find(d => d.id === assetId);

      if (doc) {
        showAssetInInspector(doc);
        
        // Highlight active sidebar item
        document.querySelectorAll('.workspace-asset-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // Export draft button
  document.getElementById('workspace-export-btn')?.addEventListener('click', () => {
    const text = scratchpad ? scratchpad.value.trim() : '';
    if (!text) {
      toast.warning('Your scratchpad is empty');
      return;
    }

    import('../utils/pdf.js').then(mod => {
      mod.downloadAsHTML(
        `<h2>NyayaGPT Compile Master Draft</h2><hr><p style="white-space: pre-wrap;">${escapeHtml(text)}</p>`,
        'Workspace Master Draft',
        `workspace_master_${Date.now()}.html`
      );
      toast.success('Workspace Master exported successfully');
    });
  });
}

function showAssetInInspector(doc) {
  const placeholder = document.getElementById('inspector-placeholder');
  const contentDiv = document.getElementById('inspector-content');

  if (!placeholder || !contentDiv) return;

  placeholder.style.display = 'none';
  contentDiv.style.display = 'block';

  let innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; margin-bottom: 12px;">
      <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${escapeHtml(doc.title)}</h3>
      <button class="btn btn-secondary btn-sm" id="copy-inspector-text-btn" style="padding: 4px 8px; font-size: 0.75rem;">📋 Copy Content</button>
    </div>
  `;

  let textToCopy = '';

  if (doc.type === 'research') {
    textToCopy = doc.content.analysis || '';
    innerHTML += `
      <div style="font-size: 0.8125rem; line-height: 1.6;">
        <h5 style="color: var(--primary); margin-top: 12px; margin-bottom: 6px;">Relevant Sections:</h5>
        <ul>
          ${(doc.content.acts || []).map(a => `<li><strong>${escapeHtml(a.name)}</strong> - ${escapeHtml(a.section)}: ${escapeHtml(a.description)}</li>`).join('')}
        </ul>
        <h5 style="color: var(--success); margin-top: 16px; margin-bottom: 6px;">Precedents:</h5>
        <ul>
          ${(doc.content.judgments || []).map(j => `<li><strong>${escapeHtml(j.name)}</strong> (${j.year}) - ${escapeHtml(j.snippet)}</li>`).join('')}
        </ul>
        <h5 style="color: var(--text-secondary); margin-top: 16px; margin-bottom: 6px;">AI Analysis:</h5>
        <p style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 4px;">${escapeHtml(doc.content.analysis)}</p>
      </div>
    `;
  } else if (doc.type === 'summary') {
    textToCopy = `Facts: ${doc.content.facts?.join('\n') || ''}\nReasoning: ${doc.content.court_reasoning || ''}\nVerdict: ${doc.content.verdict || ''}`;
    innerHTML += `
      <div style="font-size: 0.8125rem; line-height: 1.6;">
        <div style="color: var(--text-muted); margin-bottom: 8px;">Court: ${escapeHtml(doc.content.court)} | Date: ${escapeHtml(doc.content.date)}</div>
        <h5 style="color: var(--primary); margin-bottom: 4px;">Facts:</h5>
        <p>${(doc.content.facts || []).map(f => `• ${escapeHtml(f)}`).join('<br>')}</p>
        <h5 style="color: var(--primary); margin-top: 12px; margin-bottom: 4px;">Issues:</h5>
        <p>${(doc.content.issues || []).map(i => `• ${escapeHtml(i)}`).join('<br>')}</p>
        <h5 style="color: var(--success); margin-top: 12px; margin-bottom: 4px;">Verdict:</h5>
        <p style="background: rgba(0,184,148,0.1); padding: 8px; border-radius: 4px;">${escapeHtml(doc.content.verdict)}</p>
      </div>
    `;
  } else if (doc.type === 'draft') {
    textToCopy = doc.content.content || '';
    innerHTML += `
      <div style="font-size: 0.8125rem; line-height: 1.6;">
        <h5 style="color: var(--primary); margin-bottom: 8px;">Generated Draft:</h5>
        <pre style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; white-space: pre-wrap; font-family: monospace; font-size: 0.75rem;">${escapeHtml(doc.content.content)}</pre>
      </div>
    `;
  } else if (doc.type === 'citation') {
    textToCopy = (doc.content.judgments || []).map(j => `${j.name} (${j.citation}) - ${j.snippet}`).join('\n');
    innerHTML += `
      <div style="font-size: 0.8125rem; line-height: 1.6;">
        <h5 style="color: var(--primary); margin-bottom: 8px;">Precedent Citations:</h5>
        ${(doc.content.judgments || []).map(j => `
          <div style="margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.02); padding-bottom: 8px;">
            <div style="font-weight: 600; color: var(--text-primary);">${escapeHtml(j.name)}</div>
            <div class="text-xs text-muted" style="margin: 2px 0;">${escapeHtml(j.citation)} | ${escapeHtml(j.court)}</div>
            <p style="font-size: 0.75rem; margin-top: 4px;">${escapeHtml(j.snippet)}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    textToCopy = JSON.stringify(doc.content);
    innerHTML += `<pre style="font-size: 0.75rem;">${escapeHtml(JSON.stringify(doc.content, null, 2))}</pre>`;
  }

  contentDiv.innerHTML = innerHTML;

  // Add Copy Content Handler
  document.getElementById('copy-inspector-text-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success('Asset content copied to clipboard');
    }).catch(() => {
      toast.error('Failed to copy');
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
