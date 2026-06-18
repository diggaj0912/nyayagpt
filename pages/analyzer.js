// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Case Analyzer Page
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { toast } from '../components/toast.js';
import { analyzeCase, hasApiKey, getMockAnalysis } from '../services/ai.js';
import { downloadAsHTML } from '../utils/pdf.js';

const DOC_TYPES = [
  { id: 'petition', label: 'Petition', icon: '📑' },
  { id: 'fir', label: 'FIR', icon: '🚔' },
  { id: 'agreement', label: 'Agreement', icon: '📃' },
  { id: 'legal_notice', label: 'Legal Notice', icon: '📋' },
  { id: 'contract', label: 'Contract', icon: '📝' },
];

let selectedDocType = null;

export function renderAnalyzer() {
  const docTypeButtons = DOC_TYPES.map(dt => `
    <button class="chip" data-doctype="${dt.id}" id="doctype-${dt.id}">
      ${dt.icon} ${dt.label}
    </button>
  `).join('');

  return `
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>🔬 AI Case Analyzer</h2>
        <p>Upload a legal document for AI-powered risk analysis and insights.</p>
      </div>

      <div class="analyzer-upload">
        <h4 style="margin-bottom: 12px;">Document Type</h4>
        <div class="doc-type-selector">${docTypeButtons}</div>

        <div class="file-dropzone" id="analyzer-dropzone">
          <div class="file-dropzone-icon">📤</div>
          <h4>Upload Document</h4>
          <p>Drop a file here or click to browse</p>
          <p class="file-types">Supports: PDF, TXT (Max 10MB)</p>
          <input type="file" id="analyzer-file-input" accept=".pdf,.txt" style="display:none" />
        </div>

        <div class="auth-divider" style="margin: 20px 0;"><span>or paste text</span></div>

        <div class="form-group">
          <textarea class="form-textarea" id="analyzer-text" placeholder="Paste the document text here..." style="min-height: 180px;"></textarea>
        </div>

        <div style="display: flex; gap: 12px; align-items: center; margin-top: 16px;">
          ${!hasApiKey() ? '<span class="badge badge-warning">Demo Mode</span>' : '<span class="badge badge-success">API Connected</span>'}
          <button class="btn btn-primary" id="analyze-btn" style="margin-left: auto;">
            <span id="analyze-btn-text">Analyze Document</span>
          </button>
        </div>
      </div>

      <div id="analysis-loading" style="display: none;"></div>
      <div id="analysis-report" style="display: none;"></div>
    </div>
  `;
}

export function initAnalyzer() {
  // Doc type selection
  document.querySelectorAll('[data-doctype]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedDocType = btn.dataset.doctype;
      document.querySelectorAll('[data-doctype]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // File upload
  const dropzone = document.getElementById('analyzer-dropzone');
  const fileInput = document.getElementById('analyzer-file-input');
  const textArea = document.getElementById('analyzer-text');

  dropzone?.addEventListener('click', () => fileInput?.click());
  dropzone?.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('drag-over'); });
  dropzone?.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
  dropzone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleAnalyzerFile(file, textArea, dropzone);
  });
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleAnalyzerFile(file, textArea, dropzone);
  });

  // Analyze button
  document.getElementById('analyze-btn')?.addEventListener('click', () => doAnalyze(textArea));
}

function handleAnalyzerFile(file, textArea, dropzone) {
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
        <div class="file-dropzone-icon" style="background:rgba(0,184,148,0.1);">✓</div>
        <h4>${file.name}</h4>
        <p class="text-muted">${(file.size / 1024).toFixed(1)} KB loaded</p>
      `;
      toast.success('File loaded');
    };
    reader.readAsText(file);
  } else {
    dropzone.innerHTML = `
      <div class="file-dropzone-icon" style="background:rgba(253,203,110,0.1);">📄</div>
      <h4>${file.name}</h4>
      <p class="text-muted">💡 Paste text directly for best results</p>
    `;
    toast.info('For best results, paste the document text directly');
  }
}

async function doAnalyze(textArea) {
  const text = textArea.value.trim();
  if (!text || text.length < 50) {
    toast.warning('Please provide document text (minimum 50 characters)');
    return;
  }
  if (!selectedDocType) {
    toast.warning('Please select a document type');
    return;
  }

  const btn = document.getElementById('analyze-btn');
  const loading = document.getElementById('analysis-loading');
  const report = document.getElementById('analysis-report');

  btn.disabled = true;
  document.getElementById('analyze-btn-text').textContent = 'Analyzing...';
  loading.style.display = 'block';
  report.style.display = 'none';

  loading.innerHTML = `
    <div class="card animate-fade-up" style="padding: 40px; text-align: center;">
      <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
        <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
      </div>
      <p class="text-muted">Analyzing document for risks and issues...</p>
    </div>
  `;

  try {
    let result;
    if (hasApiKey()) {
      result = await analyzeCase(text, selectedDocType);
    } else {
      await new Promise(r => setTimeout(r, 2500));
      result = getMockAnalysis();
      toast.info('Showing demo analysis. Add Gemini API key in Settings for live analysis.');
    }

    storage.incrementUsage('analyses');
    storage.logActivity('analysis', `Analyzed: ${selectedDocType}`, '🔬');

    loading.style.display = 'none';
    report.style.display = 'block';
    report.innerHTML = renderAnalysisReport(result);
    report.scrollIntoView({ behavior: 'smooth' });

    // Init action buttons
    initReportActions(result);

  } catch (err) {
    toast.error('Analysis failed: ' + err.message);
    loading.style.display = 'none';
  } finally {
    btn.disabled = false;
    document.getElementById('analyze-btn-text').textContent = 'Analyze Document';
  }
}

function renderAnalysisReport(result) {
  const riskColor = result.overall_risk_score >= 70 ? 'var(--danger)' : result.overall_risk_score >= 40 ? 'var(--warning)' : 'var(--secondary)';
  const riskLabel = result.overall_risk_score >= 70 ? 'High Risk' : result.overall_risk_score >= 40 ? 'Medium Risk' : 'Low Risk';
  const circumference = 2 * Math.PI * 60;
  const dashOffset = circumference - (result.overall_risk_score / 100) * circumference;

  const factsHTML = (result.key_facts || []).map(f =>
    `<div class="fact-item"><span>•</span><span>${escapeHtml(f)}</span></div>`
  ).join('');

  const risksHTML = (result.risks || []).map(r =>
    `<div class="risk-item">
      <div class="risk-dot ${r.level}"></div>
      <div class="risk-item-content">
        <h5>${escapeHtml(r.title)}</h5>
        <p>${escapeHtml(r.description)}</p>
      </div>
    </div>`
  ).join('');

  const missingHTML = (result.missing_clauses || []).map(c =>
    `<div class="clause-item"><span>⚠️</span><div><strong>${escapeHtml(c.clause)}</strong><br><span class="text-xs text-muted">${escapeHtml(c.importance)}</span></div></div>`
  ).join('');

  const issuesHTML = (result.legal_issues || []).map(i =>
    `<div class="issue-item"><span>ℹ️</span><div><strong>${escapeHtml(i.issue)}</strong><br><span class="text-xs text-muted">${escapeHtml(i.explanation)}</span></div></div>`
  ).join('');

  return `
    <div class="animate-fade-up">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <h3>Analysis Report</h3>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" id="export-analysis-btn">📥 Export</button>
          <button class="btn btn-primary btn-sm" id="save-analysis-btn">💾 Save</button>
        </div>
      </div>

      <!-- Risk Score -->
      <div class="analysis-card risk-score-card" style="margin-bottom: 20px;">
        <div class="risk-gauge">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle class="risk-gauge-track" cx="80" cy="80" r="60" />
            <circle class="risk-gauge-fill" cx="80" cy="80" r="60" stroke="${riskColor}"
              stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}"
              style="transition: stroke-dashoffset 1.5s ease;" />
          </svg>
          <div class="risk-gauge-center">
            <div class="risk-gauge-value" style="color: ${riskColor};">${result.overall_risk_score}</div>
            <div class="risk-gauge-label">${riskLabel}</div>
          </div>
        </div>
        <div style="text-align: left; max-width: 400px;">
          <h4 style="margin-bottom: 8px;">Overall Assessment</h4>
          <p class="text-muted text-sm" style="line-height: 1.7;">${escapeHtml(result.recommendation || '')}</p>
        </div>
      </div>

      <div class="analysis-report">
        <!-- Key Facts -->
        <div class="analysis-card">
          <h4>📋 Key Facts</h4>
          ${factsHTML || '<p class="text-muted">No key facts identified.</p>'}
        </div>

        <!-- Risks -->
        <div class="analysis-card">
          <h4>⚠️ Risk Assessment</h4>
          ${risksHTML || '<p class="text-muted">No risks identified.</p>'}
        </div>

        <!-- Missing Clauses -->
        <div class="analysis-card">
          <h4>📝 Missing Clauses</h4>
          ${missingHTML || '<p class="text-muted">No missing clauses identified.</p>'}
        </div>

        <!-- Legal Issues -->
        <div class="analysis-card">
          <h4>⚖️ Legal Issues</h4>
          ${issuesHTML || '<p class="text-muted">No legal issues identified.</p>'}
        </div>
      </div>
    </div>
  `;
}

function initReportActions(result) {
  document.getElementById('save-analysis-btn')?.addEventListener('click', () => {
    storage.saveDocument({
      type: 'analysis',
      title: `${result.document_type || 'Document'} Analysis`,
      content: result,
    });
    toast.success('Analysis saved to library');
  });

  document.getElementById('export-analysis-btn')?.addEventListener('click', () => {
    let html = `<h1>Case Analysis Report</h1>`;
    html += `<div class="meta">Document Type: ${escapeHtml(result.document_type || 'Unknown')} | Risk Score: ${result.overall_risk_score}/100</div>`;

    html += '<div class="section"><div class="section-title">Key Facts</div><ul>';
    (result.key_facts || []).forEach(f => { html += `<li>${escapeHtml(f)}</li>`; });
    html += '</ul></div>';

    html += '<div class="section"><div class="section-title">Risk Assessment</div>';
    (result.risks || []).forEach(r => {
      html += `<p><span class="risk-${r.level}">[${r.level.toUpperCase()}]</span> <strong>${escapeHtml(r.title)}</strong> — ${escapeHtml(r.description)}</p>`;
    });
    html += '</div>';

    html += '<div class="section"><div class="section-title">Missing Clauses</div><ul>';
    (result.missing_clauses || []).forEach(c => { html += `<li><strong>${escapeHtml(c.clause)}</strong>: ${escapeHtml(c.importance)}</li>`; });
    html += '</ul></div>';

    html += '<div class="section"><div class="section-title">Recommendation</div>';
    html += `<p>${escapeHtml(result.recommendation || '')}</p></div>`;

    downloadAsHTML(html, 'Case Analysis Report', `analysis_${Date.now()}.html`);
    toast.success('Analysis exported');
  });
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
