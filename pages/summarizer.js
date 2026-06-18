// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Judgment Summarizer Page
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { toast } from '../components/toast.js';
import { summarizeJudgment, hasApiKey, getMockSummary } from '../services/ai.js';
import { downloadAsHTML } from '../utils/pdf.js';

const SUMMARY_TABS = [
  { id: 'facts', label: 'Facts', icon: '📋' },
  { id: 'issues', label: 'Issues', icon: '❓' },
  { id: 'petitioner_arguments', label: 'Petitioner Args', icon: '👤' },
  { id: 'respondent_arguments', label: 'Respondent Args', icon: '👥' },
  { id: 'court_reasoning', label: 'Reasoning', icon: '🧠' },
  { id: 'verdict', label: 'Verdict', icon: '⚖️' },
  { id: 'key_takeaways', label: 'Takeaways', icon: '💡' },
];

let currentSummary = null;

export function renderSummarizer() {
  return `
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>📄 Judgment Summarizer</h2>
        <p>Upload a court judgment and get a structured AI-powered summary.</p>
      </div>

      <div class="summarizer-layout">
        <!-- Upload Zone -->
        <div id="upload-section">
          <div class="file-dropzone" id="dropzone">
            <div class="file-dropzone-icon">📤</div>
            <h4>Upload Judgment</h4>
            <p>Drop a file here or click to browse</p>
            <p class="file-types">Supports: PDF, TXT, DOC (Max 10MB)</p>
            <input type="file" id="file-input" accept=".pdf,.txt,.doc,.docx" style="display:none" />
          </div>

          <div class="auth-divider" style="margin: 20px 0;"><span>or paste text</span></div>

          <div class="form-group">
            <textarea class="form-textarea" id="judgment-text" placeholder="Paste the judgment text here..." style="min-height: 200px;"></textarea>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 16px;">
            ${!hasApiKey() ? '<span class="badge badge-warning">Demo Mode</span>' : '<span class="badge badge-success">API Connected</span>'}
            <button class="btn btn-primary" id="summarize-btn" style="margin-left: auto;">
              <span id="summarize-btn-text">Summarize Judgment</span>
            </button>
          </div>
        </div>

        <!-- Processing -->
        <div id="processing-section" style="display: none;"></div>

        <!-- Results -->
        <div id="summary-result-section" style="display: none;"></div>
      </div>
    </div>
  `;
}

export function initSummarizer() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const textArea = document.getElementById('judgment-text');
  const summarizeBtn = document.getElementById('summarize-btn');

  // Dropzone click
  dropzone?.addEventListener('click', () => fileInput?.click());

  // Drag and drop
  dropzone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('drag-over');
  });
  dropzone?.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
  dropzone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file, textArea, dropzone);
  });

  // File input change
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file, textArea, dropzone);
  });

  // Summarize button
  summarizeBtn?.addEventListener('click', () => doSummarize(textArea));
}

function handleFile(file, textArea, dropzone) {
  if (file.size > 10 * 1024 * 1024) {
    toast.error('File too large. Maximum 10MB.');
    return;
  }

  const ext = file.name.split('.').pop().toLowerCase();

  if (ext === 'txt') {
    const reader = new FileReader();
    reader.onload = (e) => {
      textArea.value = e.target.result;
      dropzone.innerHTML = `
        <div class="file-dropzone-icon" style="background: rgba(0,184,148,0.1);">✓</div>
        <h4>${file.name}</h4>
        <p class="text-muted">${(file.size / 1024).toFixed(1)} KB — Text extracted</p>
      `;
      toast.success('File loaded successfully');
    };
    reader.readAsText(file);
  } else if (ext === 'pdf') {
    // For PDF, we extract what we can client-side
    const reader = new FileReader();
    reader.onload = () => {
      textArea.value = `[PDF uploaded: ${file.name}]\n\nNote: For best results with PDF files, please copy and paste the text content directly. Client-side PDF text extraction will be enhanced in the next update.`;
      dropzone.innerHTML = `
        <div class="file-dropzone-icon" style="background: rgba(253,203,110,0.1);">📄</div>
        <h4>${file.name}</h4>
        <p class="text-muted">${(file.size / 1024).toFixed(1)} KB — PDF uploaded</p>
        <p class="file-types">💡 Tip: Paste the text directly for best results</p>
      `;
      toast.info('PDF uploaded. For best results, paste the text content directly.');
    };
    reader.readAsArrayBuffer(file);
  } else {
    toast.warning('Please upload a PDF or TXT file');
  }
}

async function doSummarize(textArea) {
  const text = textArea.value.trim();
  if (!text || text.length < 100) {
    toast.warning('Please provide judgment text (minimum 100 characters)');
    return;
  }

  const btn = document.getElementById('summarize-btn');
  const processing = document.getElementById('processing-section');
  const resultSection = document.getElementById('summary-result-section');

  btn.disabled = true;
  document.getElementById('summarize-btn-text').textContent = 'Processing...';
  processing.style.display = 'block';
  resultSection.style.display = 'none';

  // Show processing steps animation
  processing.innerHTML = renderProcessing();
  await animateProcessingSteps();

  try {
    let result;
    if (hasApiKey()) {
      result = await summarizeJudgment(text);
    } else {
      await new Promise(r => setTimeout(r, 1500));
      result = getMockSummary();
      toast.info('Showing demo summary. Add your Gemini API key in Settings for live summarization.');
    }

    currentSummary = result;

    // Save
    storage.incrementUsage('summaries');
    storage.logActivity('summary', `Summarized: ${result.title || 'Judgment'}`, '📄');

    // Render results
    processing.style.display = 'none';
    resultSection.style.display = 'block';
    resultSection.innerHTML = renderSummaryResults(result);
    resultSection.scrollIntoView({ behavior: 'smooth' });

    // Init tab switching
    initSummaryTabs(result);

    // Init action buttons
    initSummaryActions(result, text);

  } catch (err) {
    toast.error('Summarization failed: ' + err.message);
    processing.style.display = 'none';
  } finally {
    btn.disabled = false;
    document.getElementById('summarize-btn-text').textContent = 'Summarize Judgment';
  }
}

function renderProcessing() {
  return `
    <div class="card animate-fade-up" style="padding: 32px; text-align: center;">
      <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
      <h4 style="margin-bottom: 20px;">Analyzing Judgment</h4>
      <div class="processing-steps" style="max-width: 320px; margin: 0 auto; text-align: left;">
        <div class="processing-step active" id="step-1">
          <div class="processing-step-icon">📄</div>
          <span>Extracting text content</span>
        </div>
        <div class="processing-step pending" id="step-2">
          <div class="processing-step-icon">🔍</div>
          <span>Identifying key sections</span>
        </div>
        <div class="processing-step pending" id="step-3">
          <div class="processing-step-icon">🧠</div>
          <span>Analyzing arguments & reasoning</span>
        </div>
        <div class="processing-step pending" id="step-4">
          <div class="processing-step-icon">📋</div>
          <span>Generating structured summary</span>
        </div>
      </div>
    </div>
  `;
}

async function animateProcessingSteps() {
  for (let i = 1; i <= 4; i++) {
    await new Promise(r => setTimeout(r, 600));
    const step = document.getElementById(`step-${i}`);
    if (step) {
      step.classList.remove('active');
      step.classList.add('completed');
      step.querySelector('.processing-step-icon').textContent = '✓';
    }
    const next = document.getElementById(`step-${i + 1}`);
    if (next) {
      next.classList.remove('pending');
      next.classList.add('active');
    }
  }
}

function renderSummaryResults(result) {
  const tabs = SUMMARY_TABS.map((tab, i) => `
    <button class="summary-tab ${i === 0 ? 'active' : ''}" data-tab="${tab.id}">
      ${tab.icon} ${tab.label}
    </button>
  `).join('');

  return `
    <div class="summary-result animate-fade-up">
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border);">
        <div>
          <h4>${escapeHtml(result.title || 'Judgment Summary')}</h4>
          <p class="text-xs text-muted" style="margin-top: 4px;">${escapeHtml(result.court || '')} ${result.date ? '· ' + escapeHtml(result.date) : ''}</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" id="export-summary-btn">📥 Export</button>
          <button class="btn btn-primary btn-sm" id="save-summary-btn">💾 Save</button>
        </div>
      </div>
      <div class="summary-tabs">${tabs}</div>
      <div class="summary-content" id="summary-content">
        ${renderTabContent('facts', result)}
      </div>
    </div>
  `;
}

function renderTabContent(tabId, result) {
  const content = result[tabId];
  if (!content) return '<p class="text-muted">No data available for this section.</p>';

  if (Array.isArray(content)) {
    return `<ul>${content.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }
  return `<p>${escapeHtml(content)}</p>`;
}

function initSummaryTabs(result) {
  document.querySelectorAll('.summary-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.summary-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const contentDiv = document.getElementById('summary-content');
      if (contentDiv) {
        contentDiv.innerHTML = renderTabContent(tab.dataset.tab, result);
      }
    });
  });
}

function initSummaryActions(result, originalText) {
  document.getElementById('save-summary-btn')?.addEventListener('click', () => {
    storage.saveDocument({
      type: 'summary',
      title: result.title || 'Judgment Summary',
      content: result,
    });
    toast.success('Summary saved to library');
  });

  document.getElementById('export-summary-btn')?.addEventListener('click', () => {
    let html = `<h1>${escapeHtml(result.title || 'Judgment Summary')}</h1>`;
    html += `<div class="meta">${escapeHtml(result.court || '')} ${result.date ? '· ' + escapeHtml(result.date) : ''}</div>`;

    SUMMARY_TABS.forEach(tab => {
      const content = result[tab.id];
      if (content) {
        html += `<div class="section"><div class="section-title">${tab.label}</div>`;
        if (Array.isArray(content)) {
          html += `<ul>${content.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
        } else {
          html += `<p>${escapeHtml(content)}</p>`;
        }
        html += '</div>';
      }
    });

    downloadAsHTML(html, result.title || 'Judgment Summary', `summary_${Date.now()}.html`);
    toast.success('Summary exported');
  });
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
