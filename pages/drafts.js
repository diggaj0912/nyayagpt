// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Legal Draft Generator Page
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { toast } from '../components/toast.js';
import { getDraftTemplates, getTemplateFields, generateDraft, hasApiKey } from '../services/ai.js';
import { downloadAsHTML } from '../utils/pdf.js';

const TEMPLATE_ICONS = {
  legal_notice: '📋',
  nda: '🤝',
  employment: '👔',
  service_agreement: '🔧',
  partnership: '🤝',
  rent_agreement: '🏠',
};

let selectedTemplate = null;
let generatedDraft = null;

export function renderDrafts() {
  const templates = getDraftTemplates();

  const templateCards = templates.map(t => `
    <div class="template-card" data-template="${t.id}" id="template-${t.id}">
      <div class="template-card-icon">${TEMPLATE_ICONS[t.id] || '📄'}</div>
      <h5>${t.name}</h5>
      <p>${t.fields.length} fields</p>
    </div>
  `).join('');

  return `
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>✍️ Legal Draft Generator</h2>
        <p>Select a template, fill the form, and generate a professional legal document.</p>
      </div>

      <h4 style="margin-bottom: 16px;">Choose Template</h4>
      <div class="template-grid" id="template-grid">
        ${templateCards}
      </div>

      <div id="draft-form-section" style="display: none;"></div>
      <div id="draft-preview-section" style="display: none;"></div>
    </div>
  `;
}

export function initDrafts() {
  // Template selection
  document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => {
      const templateId = card.dataset.template;
      selectTemplate(templateId);
    });
  });
}

function selectTemplate(templateId) {
  selectedTemplate = templateId;
  generatedDraft = null;

  // Update UI
  document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
  document.getElementById(`template-${templateId}`)?.classList.add('selected');

  // Show form
  const formSection = document.getElementById('draft-form-section');
  const previewSection = document.getElementById('draft-preview-section');
  previewSection.style.display = 'none';

  const fields = getTemplateFields(templateId);
  const templates = getDraftTemplates();
  const template = templates.find(t => t.id === templateId);

  const formFields = fields.map(field => {
    const isFullWidth = field.type === 'textarea';
    let input;
    if (field.type === 'textarea') {
      input = `<textarea class="form-textarea" id="field-${field.name}" placeholder="${field.hint || ''}" ${field.required ? 'required' : ''} rows="3"></textarea>`;
    } else if (field.type === 'date') {
      input = `<input type="date" class="form-input" id="field-${field.name}" ${field.required ? 'required' : ''} />`;
    } else if (field.type === 'number') {
      input = `<input type="number" class="form-input" id="field-${field.name}" ${field.required ? 'required' : ''} min="1" />`;
    } else {
      input = `<input type="text" class="form-input" id="field-${field.name}" placeholder="${field.hint || ''}" ${field.required ? 'required' : ''} />`;
    }

    return `
      <div class="form-group ${isFullWidth ? 'full-width' : ''}">
        <label class="form-label">${field.label} ${field.required ? '*' : ''}</label>
        ${input}
        ${field.hint && field.type !== 'textarea' ? `<span class="form-hint">${field.hint}</span>` : ''}
      </div>
    `;
  }).join('');

  formSection.style.display = 'block';
  formSection.innerHTML = `
    <div class="draft-form animate-fade-up">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <h3>${TEMPLATE_ICONS[templateId] || '📄'} ${template?.name || 'Draft'}</h3>
        ${!hasApiKey() ? '<span class="badge badge-warning">Demo Mode</span>' : '<span class="badge badge-success">API Connected</span>'}
      </div>
      <form id="draft-generate-form">
        <div class="form-grid">
          ${formFields}
        </div>
        <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
          <button type="button" class="btn btn-secondary" id="clear-draft-btn">Clear</button>
          <button type="submit" class="btn btn-primary" id="generate-draft-btn">
            <span id="generate-btn-text">Generate Draft</span>
          </button>
        </div>
      </form>
    </div>
  `;

  formSection.scrollIntoView({ behavior: 'smooth' });

  // Form event listeners
  document.getElementById('draft-generate-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    doGenerate();
  });

  document.getElementById('clear-draft-btn')?.addEventListener('click', () => {
    const inputs = document.querySelectorAll('#draft-generate-form input, #draft-generate-form textarea');
    inputs.forEach(input => { input.value = ''; });
  });
}

async function doGenerate() {
  const fields = getTemplateFields(selectedTemplate);
  const formData = {};
  let isValid = true;

  fields.forEach(field => {
    const el = document.getElementById(`field-${field.name}`);
    const val = el?.value?.trim() || '';
    if (field.required && !val) {
      isValid = false;
      el?.style && (el.style.borderColor = 'var(--danger)');
    } else if (el) {
      el.style.borderColor = '';
    }
    formData[field.name] = val;
  });

  if (!isValid) {
    toast.warning('Please fill in all required fields');
    return;
  }

  const btn = document.getElementById('generate-draft-btn');
  btn.disabled = true;
  document.getElementById('generate-btn-text').textContent = 'Generating...';

  try {
    let result;
    if (hasApiKey()) {
      result = await generateDraft(selectedTemplate, formData);
    } else {
      // Demo mode
      await new Promise(r => setTimeout(r, 2000));
      result = getMockDraft(selectedTemplate, formData);
      toast.info('Showing demo draft. Add your Gemini API key in Settings for live generation.');
    }

    generatedDraft = result;
    storage.incrementUsage('drafts');
    storage.logActivity('draft', `Generated: ${result.title || selectedTemplate}`, '✍️');

    // Show preview
    renderPreview(result, formData);

  } catch (err) {
    toast.error('Draft generation failed: ' + err.message);
  } finally {
    btn.disabled = false;
    document.getElementById('generate-btn-text').textContent = 'Generate Draft';
  }
}

function renderPreview(result, formData) {
  const previewSection = document.getElementById('draft-preview-section');
  previewSection.style.display = 'block';

  previewSection.innerHTML = `
    <div class="draft-preview animate-fade-up">
      <div class="draft-preview-header">
        <h4>${escapeHtml(result.title || 'Legal Draft')}</h4>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-ghost btn-sm" id="copy-draft-btn">📋 Copy</button>
          <button class="btn btn-secondary btn-sm" id="export-draft-btn">📥 Export</button>
          <button class="btn btn-primary btn-sm" id="save-draft-btn">💾 Save</button>
        </div>
      </div>
      <div class="draft-preview-content" id="draft-content">
        ${formatDraftContent(result.content || result.raw || '')}
      </div>
    </div>
  `;

  previewSection.scrollIntoView({ behavior: 'smooth' });

  // Action buttons
  document.getElementById('copy-draft-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(result.content || result.raw || '');
    toast.success('Draft copied to clipboard');
  });

  document.getElementById('export-draft-btn')?.addEventListener('click', () => {
    downloadAsHTML(
      `<h1>${escapeHtml(result.title || 'Legal Draft')}</h1>${formatDraftContent(result.content || result.raw || '')}`,
      result.title || 'Legal Draft',
      `draft_${selectedTemplate}_${Date.now()}.html`
    );
    toast.success('Draft exported');
  });

  document.getElementById('save-draft-btn')?.addEventListener('click', () => {
    storage.saveDocument({
      type: 'draft',
      title: result.title || `${selectedTemplate} Draft`,
      content: result,
      metadata: { template: selectedTemplate, formData },
    });
    toast.success('Draft saved to library');
  });
}

function formatDraftContent(content) {
  return content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(\d+\.\s)/gm, '<strong>$1</strong>')
    .replace(/^(WHEREAS|NOW THEREFORE|IN WITNESS WHEREOF)/gm, '<strong>$1</strong>');
}

function getMockDraft(templateId, formData) {
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const mocks = {
    legal_notice: {
      title: 'LEGAL NOTICE',
      content: `LEGAL NOTICE\n\nDate: ${today}\n\nTo,\n${formData.recipient_name || '[Recipient]'}\n${formData.recipient_address || '[Address]'}\n\nFrom,\n${formData.sender_name || '[Sender]'}\n${formData.sender_address || '[Address]'}\n\nSubject: ${formData.subject || '[Subject]'}\n\nDear Sir/Madam,\n\nUnder instructions from and on behalf of my client, ${formData.sender_name || '[Client]'}, I hereby serve upon you the following Legal Notice:\n\n1. FACTS AND BACKGROUND\n\n${formData.facts || 'That my client states the following facts...'}\n\n2. LEGAL BASIS\n\nThe above-mentioned acts/omissions on your part constitute a clear violation of the provisions of the Indian Contract Act, 1872, and other applicable laws. My client reserves the right to initiate appropriate civil and/or criminal proceedings.\n\n3. DEMAND\n\n${formData.demand || 'My client demands immediate compliance with the terms as stated herein.'}\n\n4. CONSEQUENCES OF NON-COMPLIANCE\n\nPlease note that if you fail to comply with the demands mentioned above within ${formData.deadline_days || '15'} days from the receipt of this notice, my client shall be constrained to initiate appropriate legal proceedings before the competent court of law, at your risk, cost, and consequences.\n\n5. RESERVATION OF RIGHTS\n\nMy client reserves the right to take additional legal action as may be necessary, including but not limited to filing of civil suit for recovery of damages and/or criminal complaint.\n\nThis notice is being sent without prejudice to any other rights and remedies available to my client under the law.\n\nYours faithfully,\n\n[Advocate Name]\nAdvocate, High Court\nOn behalf of ${formData.sender_name || '[Client]'}`,
    },
    nda: {
      title: 'NON-DISCLOSURE AGREEMENT',
      content: `NON-DISCLOSURE AGREEMENT\n\nThis Non-Disclosure Agreement ("Agreement") is entered into on ${today}\n\nBETWEEN:\n\n1. ${formData.disclosing_party || '[Disclosing Party]'} (hereinafter referred to as the "Disclosing Party")\n\nAND\n\n2. ${formData.receiving_party || '[Receiving Party]'} (hereinafter referred to as the "Receiving Party")\n\nCollectively referred to as the "Parties"\n\nWHEREAS, the Parties wish to explore a business relationship concerning ${formData.purpose || '[Purpose]'} and in connection therewith, may disclose to each other certain confidential and proprietary information.\n\nNOW THEREFORE, in consideration of the mutual promises and covenants contained herein, the Parties agree as follows:\n\n1. DEFINITION OF CONFIDENTIAL INFORMATION\n\nConfidential Information shall mean all information disclosed by the Disclosing Party including but not limited to: ${formData.confidential_info || 'trade secrets, business plans, financial data, technical information, customer lists, and any other proprietary information'}.\n\n2. OBLIGATIONS OF RECEIVING PARTY\n\nThe Receiving Party agrees to:\na) Hold all Confidential Information in strict confidence\nb) Not disclose any Confidential Information to third parties without prior written consent\nc) Use the Confidential Information solely for the purpose stated above\nd) Take reasonable measures to protect the Confidential Information\n\n3. EXCEPTIONS\n\nThis Agreement shall not apply to information that:\na) Is publicly available at the time of disclosure\nb) Becomes publicly available through no fault of the Receiving Party\nc) Is independently developed by the Receiving Party\nd) Is required to be disclosed by law or court order\n\n4. TERM\n\nThis Agreement shall remain in effect for a period of ${formData.duration_years || '2'} years from the date of execution.\n\n5. GOVERNING LAW AND JURISDICTION\n\nThis Agreement shall be governed by the laws of India and subject to the exclusive jurisdiction of the courts at ${formData.jurisdiction || '[City]'}.\n\n6. REMEDIES\n\nThe Parties acknowledge that any breach of this Agreement may cause irreparable harm and the Disclosing Party shall be entitled to seek injunctive relief in addition to any other legal remedies.\n\nIN WITNESS WHEREOF, the Parties have executed this Agreement on the date first written above.\n\n________________________          ________________________\n${formData.disclosing_party || 'Disclosing Party'}          ${formData.receiving_party || 'Receiving Party'}`,
    },
  };

  return mocks[templateId] || {
    title: 'LEGAL DRAFT',
    content: `This is a demo draft for the ${templateId.replace(/_/g, ' ')} template.\n\nTo generate real drafts, please add your Gemini API key in Settings.\n\nDetails provided:\n${Object.entries(formData).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`).join('\n')}`,
  };
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
