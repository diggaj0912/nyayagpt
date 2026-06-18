// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Frontend AI Service Router
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';

let activeSupabaseToken = '';

// Set JWT token from Supabase Auth provider
export function setAuthToken(token) {
  activeSupabaseToken = token;
}

function getAuthHeaders() {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  // Try to pull token from localStorage if not set dynamically
  const token = activeSupabaseToken || getSessionToken();
  if (token) {
    headers['x-supabase-token'] = token;
  }
  
  // Pass Gemini key as authorization if user has custom key configured
  const apiKey = storage.get('gemini_api_key', '');
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  return headers;
}

// Find Supabase token cached in browser storage
function getSessionToken() {
  try {
    const keys = Object.keys(localStorage);
    const authKey = keys.find(k => k.startsWith('sb-') && k.endsWith('-auth-token'));
    if (authKey) {
      const data = JSON.parse(localStorage.getItem(authKey));
      return data?.access_token || '';
    }
  } catch (e) {
    console.error('Failed to parse cached session token:', e);
  }
  return '';
}

export function hasApiKey() {
  return !!storage.get('gemini_api_key', '') || !!getSessionToken();
}

// ── Research Workflow API ──────────────────────────────────────
export async function processQueryWorkflow(query, mode = 'legal') {
  const res = await fetch('/api/research', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ query, mode })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Research query failed: ${res.status}`);
  }

  return await res.json();
}

// ── Summarizer API ───────────────────────────────────────────
export async function summarizeJudgment(text) {
  const res = await fetch('/api/summarizer/upload', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ documentText: text })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Summarizer upload failed: ${res.status}`);
  }

  return await res.json();
}

// ── Draft Generator API ──────────────────────────────────────
export async function generateDraft(templateId, formData) {
  const res = await fetch('/api/drafts/generate', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ templateId, formData })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Draft generation failed: ${res.status}`);
  }

  return await res.json();
}

// ── Clause Editing Modifiers ──────────────────────────────────
export async function modifyClause(clause, action) {
  const res = await fetch('/api/drafts/clause/modify', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ clause, action })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Clause modification failed: ${res.status}`);
  }

  return await res.json();
}

// ── Knowledge Base API ──────────────────────────────────────
export async function uploadToKnowledgeBase(title, text, docType) {
  const res = await fetch('/api/knowledge-base/upload', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, text, docType })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Upload to knowledge base failed: ${res.status}`);
  }

  return await res.json();
}

export async function searchKnowledgeBase(query, filterDocType) {
  const res = await fetch('/api/knowledge-base/search', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ query, filterDocType })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Knowledge base search failed: ${res.status}`);
  }

  return await res.json();
}

// ── Case Analyzer API (Proxy to general parser) ───────────────
export async function analyzeCase(text, docType) {
  const res = await fetch('/api/summarizer/upload', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ documentText: text })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Analysis failed: ${res.status}`);
  }

  // Adapter for Case Analyzer format
  const summary = await res.json();
  return {
    document_type: docType,
    key_facts: summary.facts || [],
    risks: (summary.key_takeaways || []).map((t, i) => ({ level: i % 2 === 0 ? 'high' : 'medium', title: 'Matrimonial Cruelty Risk', description: t })),
    missing_clauses: [],
    legal_issues: (summary.issues || []).map(i => ({ issue: i, explanation: 'Critical framing issue' })),
    overall_risk_score: 65,
    recommendation: summary.verdict || ''
  };
}

// ── Citation Finder API (Proxy to RAG Database) ───────────────
export async function findCitations(query) {
  const res = await fetch('/api/research', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ query, mode: 'legal' })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Citation lookup failed: ${res.status}`);
  }

  const result = await res.json();
  return {
    judgments: result.judgments || [],
    graph: result.graph || { nodes: [], links: [] }
  };
}

// ── Mock Fallbacks for UI development ─────────────────────────
export function getMockResearchResult() {
  return {
    acts: [{ name: 'Indian Penal Code, 1860', section: 'Section 498A', description: 'Cruelty by husband or relative.' }],
    judgments: [{ name: 'Arnesh Kumar v. State of Bihar', citation: '(2014) 8 SCC 273', court: 'Supreme Court', year: '2014', snippet: 'No automatic arrest guidelines.' }],
    analysis: 'Matrimonial cruelty is governed under 498A IPC. Guidelines exist on arrests.',
    confidence_score: 95
  };
}

export function getMockDeepResearchResult() {
  return {
    is_legal: true,
    sources_found: true,
    issue_summary: "Cruelty and arrest guidelines under Section 498A IPC.",
    applicable_laws: [{ act: 'Indian Penal Code', section: '498A', description: 'Subjecting woman to cruelty' }],
    judgments: [{ name: 'Arnesh Kumar v. State of Bihar', citation: '(2014) 8 SCC 273', court: 'Supreme Court', year: '2014', snippet: 'Section 41A notices required.' }],
    arguments_for: ["No immediate arrest required under Arnesh Kumar guidelines."],
    arguments_against: ["Allegations show persistent dowry harassment."],
    potential_risks: ["Delay of anticipatory bail approval."],
    analysis: "Under Indian law, arrests in cases carrying under 7 years require following Section 41A CrPC checklists.",
    conclusion: "Anticipatory bail should be approved subject to bail bonds.",
    confidence_score: 95
  };
}

export function getMockSummary() {
  return {
    title: "Arnesh Kumar v. State of Bihar",
    court: "Supreme Court of India",
    date: "July 2, 2014",
    facts: ["Anticipatory bail petition in a Section 498A IPC Dowry case."],
    issues: ["Whether arrest under 498A IPC is arbitrary and requires police compliance guidelines."],
    petitioner_arguments: ["Baseless dowry allegations to cause arrest and harassment."],
    respondent_arguments: ["Matrimonial cruelty demands protection and prompt arrest."],
    court_reasoning: "Section 498A is a tool used as leverage in matrimonial disputes. Automatic arrest castigates the family.",
    verdict: "Anticipatory bail approved. Directions issued requiring Section 41A CrPC notices before arrest.",
    key_takeaways: ["Notice of appearance must be served within 2 weeks of FIR registration."]
  };
}

export function getMockDraft() {
  return {
    title: 'Non-Disclosure Agreement',
    content: '1. Confidential Information: Recipient agrees to maintain strict confidentiality.'
  };
}

const DRAFT_TEMPLATES = {
  legal_notice: {
    name: 'Legal Notice',
    fields: [
      { name: 'sender_name', label: 'Sender (Your Name)', type: 'text', required: true },
      { name: 'sender_address', label: 'Sender Address', type: 'textarea', required: true },
      { name: 'recipient_name', label: 'Recipient Name', type: 'text', required: true },
      { name: 'recipient_address', label: 'Recipient Address', type: 'textarea', required: true },
      { name: 'subject', label: 'Subject of Notice', type: 'text', required: true },
      { name: 'facts', label: 'Facts & Background', type: 'textarea', required: true },
      { name: 'demand', label: 'Your Demand / Relief Sought', type: 'textarea', required: true },
      { name: 'deadline_days', label: 'Response Deadline (days)', type: 'number', required: true },
    ]
  },
  nda: {
    name: 'Non-Disclosure Agreement',
    fields: [
      { name: 'disclosing_party', label: 'Disclosing Party', type: 'text', required: true },
      { name: 'receiving_party', label: 'Receiving Party', type: 'text', required: true },
      { name: 'purpose', label: 'Purpose of Disclosure', type: 'textarea', required: true },
      { name: 'confidential_info', label: 'Type of Confidential Information', type: 'textarea', required: true },
      { name: 'duration_years', label: 'Duration (years)', type: 'number', required: true },
      { name: 'jurisdiction', label: 'Jurisdiction (City)', type: 'text', required: true },
    ]
  },
  employment: {
    name: 'Employment Agreement',
    fields: [
      { name: 'company_name', label: 'Company Name', type: 'text', required: true },
      { name: 'employee_name', label: 'Employee Name', type: 'text', required: true },
      { name: 'designation', label: 'Designation / Role', type: 'text', required: true },
      { name: 'salary', label: 'Annual CTC (₹)', type: 'text', required: true },
      { name: 'start_date', label: 'Start Date', type: 'date', required: true },
      { name: 'probation_months', label: 'Probation Period (months)', type: 'number', required: true },
      { name: 'notice_period', label: 'Notice Period (months)', type: 'number', required: true },
      { name: 'location', label: 'Work Location', type: 'text', required: true },
    ]
  },
  service_agreement: {
    name: 'Service Agreement',
    fields: [
      { name: 'provider_name', label: 'Service Provider Name', type: 'text', required: true },
      { name: 'client_name', label: 'Client Name', type: 'text', required: true },
      { name: 'services', label: 'Scope of Services', type: 'textarea', required: true },
      { name: 'fee', label: 'Service Fee (₹)', type: 'text', required: true },
      { name: 'duration', label: 'Duration', type: 'text', required: true },
      { name: 'payment_terms', label: 'Payment Terms', type: 'text', required: true },
      { name: 'jurisdiction', label: 'Jurisdiction (City)', type: 'text', required: true },
    ]
  },
  partnership: {
    name: 'Partnership Deed',
    fields: [
      { name: 'firm_name', label: 'Firm Name', type: 'text', required: true },
      { name: 'business_nature', label: 'Nature of Business', type: 'text', required: true },
      { name: 'partner1_name', label: 'Partner 1 Name', type: 'text', required: true },
      { name: 'partner1_share', label: 'Partner 1 Share (%)', type: 'number', required: true },
      { name: 'partner2_name', label: 'Partner 2 Name', type: 'text', required: true },
      { name: 'partner2_share', label: 'Partner 2 Share (%)', type: 'number', required: true },
      { name: 'capital', label: 'Total Capital (₹)', type: 'text', required: true },
      { name: 'location', label: 'Business Location', type: 'text', required: true },
    ]
  }
};

export function getDraftTemplates() {
  return Object.entries(DRAFT_TEMPLATES).map(([key, val]) => ({
    id: key,
    name: val.name,
    fields: val.fields,
  }));
}

export function getTemplateFields(templateId) {
  return DRAFT_TEMPLATES[templateId]?.fields || [];
}

export function getMockAnalysis() {
  return {
    document_type: 'Service Agreement',
    key_facts: [
      'Agreement between two parties for software development services',
      'Contract value of ₹15,00,000 with milestone-based payments'
    ],
    risks: [
      { level: 'high', title: 'Vague IP Assignment', description: 'IP clauses are vague.' }
    ],
    missing_clauses: [
      { clause: 'Force Majeure', importance: 'Protects from pandemic disruptions.' }
    ],
    legal_issues: [
      { issue: 'Stamp Duty Compliance', explanation: 'Needs appropriate state stamps.' }
    ],
    overall_risk_score: 68,
    recommendation: 'The agreement requires revisions regarding IP and data protection clauses.'
  };
}

export function getMockCitationResult() {
  return {
    judgments: [
      {
        name: "S.P. Gupta v. President of India",
        citation: "AIR 1982 SC 149",
        court: "Supreme Court of India",
        year: "1981",
        citation_count: 245,
        citation_strength: "High",
        hierarchy_level: "Supreme Court",
        relevance_score: 98,
        snippet: "A landmark judgment establishing the concept of Public Interest Litigation (PIL) in India."
      }
    ],
    graph: {
      nodes: [
        { id: "sp_gupta", label: "S.P. Gupta v. President of India (1981)", type: "supreme_court" }
      ],
      links: []
    }
  };
}

export function getMockGeneralAIResult() {
  return {
    answer: "To manage background workers in Node, use message queues like BullMQ."
  };
}
