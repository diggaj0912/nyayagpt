// ═══════════════════════════════════════════════════════════════
// NyayaGPT — AI Service (Google Gemini API)
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const MODEL = 'gemini-2.0-flash';

function getApiKey() {
  return storage.get('gemini_api_key', '');
}

export function hasApiKey() {
  return !!getApiKey();
}

async function callGemini(prompt, systemInstruction = '') {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API_KEY_MISSING');
  }

  const url = `${GEMINI_BASE}/${MODEL}:generateContent?key=${apiKey}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
  };

  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 400 && err?.error?.message?.includes('API key')) {
      throw new Error('API_KEY_INVALID');
    }
    throw new Error(err?.error?.message || `Gemini API error: ${res.status}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini');

  try {
    return JSON.parse(text);
  } catch {
    // Try extracting JSON from markdown code blocks
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1].trim());
    }
    // Return as plain text wrapped in object
    return { raw: text };
  }
}

// ── Research API ────────────────────────────────────────────

const RESEARCH_SYSTEM = `You are NyayaGPT, an expert Indian legal research assistant. You have extensive knowledge of Indian law including all Acts, Sections, IPC, CrPC, CPC, Constitution of India, Supreme Court judgments, and High Court judgments.

When given a legal query, respond in this EXACT JSON format:
{
  "acts": [
    { "name": "Act Name", "section": "Section Number", "description": "Brief explanation of relevance" }
  ],
  "judgments": [
    { "name": "Case Name v. Other Party", "citation": "(Year) Volume SCC/AIR Page", "court": "Supreme Court / High Court Name", "year": "Year", "relevance": 85, "snippet": "Key excerpt or ratio decidendi" }
  ],
  "analysis": "Detailed legal analysis in 3-5 paragraphs with inline references to the acts and judgments listed above. Use proper legal language.",
  "confidence_score": 95,
  "timeline": [
    { "year": "Year", "event": "Precedent established or statutory change" }
  ],
  "related_cases": [
    { "name": "Case Name", "citation": "Citation", "court": "Court" }
  ],
  "follow_ups": [
    "Suggested question 1",
    "Suggested question 2"
  ]
}

Rules:
- Always provide 2-5 relevant Acts/Sections
- Always provide 2-4 relevant judgments with proper citations
- Relevance score is 0-100
- Analysis should be comprehensive, citing specific sections and cases
- Focus on Indian law only
- Include landmark/leading cases where applicable`;

const DEEP_RESEARCH_SYSTEM = `You are NyayaGPT, a senior legal researcher in India. Perform a deep multi-step legal analysis and return a comprehensive legal memorandum.

Respond in this EXACT JSON format:
{
  "issue_summary": "Summary of the legal issue(s)",
  "applicable_laws": [
    { "act": "Act Name", "section": "Section Code", "description": "Relevance" }
  ],
  "judgments": [
    { "name": "Case Name", "citation": "Citation", "court": "Court", "year": "Year", "strength": 90, "snippet": "Ratio/summary" }
  ],
  "arguments_for": ["Argument 1", "Argument 2"],
  "arguments_against": ["Argument 1", "Argument 2"],
  "potential_risks": ["Risk 1", "Risk 2"],
  "conclusion": "Final detailed research memo conclusion",
  "confidence_score": 95
}`;

const GENERAL_AI_SYSTEM = `You are a helpful AI assistant. Answer the user's question clearly. Return the answer in this JSON format:
{
  "answer": "Your detailed answer here"
}`;

export async function researchQuery(query, mode = 'legal') {
  if (mode === 'deep') {
    return callGemini(
      `Perform a deep multi-step legal research memo for: "${query}"`,
      DEEP_RESEARCH_SYSTEM
    );
  } else if (mode === 'general') {
    return callGemini(
      `Answer this question: "${query}"`,
      GENERAL_AI_SYSTEM
    );
  } else {
    return callGemini(
      `Legal research query: "${query}"\n\nProvide a comprehensive legal research response with relevant Indian Acts, Sections, judgments, and analysis.`,
      RESEARCH_SYSTEM
    );
  }
}

// ── Summarizer API ──────────────────────────────────────────

const SUMMARIZER_SYSTEM = `You are NyayaGPT, an expert Indian legal judgment summarizer. Given the text of a court judgment, provide a structured summary.

Respond in this EXACT JSON format:
{
  "title": "Case title from the judgment",
  "court": "Court name",
  "date": "Date of judgment",
  "facts": ["Fact 1", "Fact 2", "..."],
  "issues": ["Issue 1", "Issue 2", "..."],
  "petitioner_arguments": ["Argument 1", "Argument 2", "..."],
  "respondent_arguments": ["Argument 1", "Argument 2", "..."],
  "court_reasoning": "Detailed reasoning of the court in 2-3 paragraphs",
  "verdict": "Final verdict/order of the court",
  "key_takeaways": ["Takeaway 1", "Takeaway 2", "..."]
}

Rules:
- Extract facts accurately from the judgment text
- Identify all legal issues framed by the court
- Summarize arguments of both sides fairly
- Capture the ratio decidendi in the reasoning
- Verdict should be concise but complete
- Key takeaways should be practical and actionable`;

export async function summarizeJudgment(text) {
  const truncated = text.slice(0, 30000); // Token limit safety
  return callGemini(
    `Summarize the following Indian court judgment:\n\n---\n${truncated}\n---\n\nProvide a structured summary.`,
    SUMMARIZER_SYSTEM
  );
}

// ── Draft Generator API ─────────────────────────────────────

const DRAFT_TEMPLATES = {
  legal_notice: {
    name: 'Legal Notice',
    systemPrompt: `You are NyayaGPT, an expert Indian legal draft generator. Generate a formal Legal Notice as per Indian law.

Respond in this EXACT JSON format:
{
  "title": "LEGAL NOTICE",
  "content": "Full legal notice text with proper formatting, numbered paragraphs, legal language, and all standard clauses. Include date, sender/recipient details, subject, body with facts and demands, timeline for response, and consequences of non-compliance.",
  "sections": ["Introduction", "Facts", "Legal Basis", "Demand", "Consequences"]
}`,
    fields: [
      { name: 'sender_name', label: 'Sender (Your Name)', type: 'text', required: true },
      { name: 'sender_address', label: 'Sender Address', type: 'textarea', required: true },
      { name: 'recipient_name', label: 'Recipient Name', type: 'text', required: true },
      { name: 'recipient_address', label: 'Recipient Address', type: 'textarea', required: true },
      { name: 'subject', label: 'Subject of Notice', type: 'text', required: true },
      { name: 'facts', label: 'Facts & Background', type: 'textarea', required: true, hint: 'Describe the situation in detail' },
      { name: 'demand', label: 'Your Demand / Relief Sought', type: 'textarea', required: true },
      { name: 'deadline_days', label: 'Response Deadline (days)', type: 'number', required: true },
    ],
  },
  nda: {
    name: 'Non-Disclosure Agreement',
    systemPrompt: `You are NyayaGPT, an expert Indian legal draft generator. Generate a comprehensive NDA as per Indian Contract Act, 1872.

Respond in this EXACT JSON format:
{
  "title": "NON-DISCLOSURE AGREEMENT",
  "content": "Full NDA text with all standard clauses including definitions, obligations, exceptions, term, remedies, governing law, jurisdiction, and signature blocks.",
  "sections": ["Definitions", "Obligations", "Exceptions", "Term", "Remedies", "General"]
}`,
    fields: [
      { name: 'disclosing_party', label: 'Disclosing Party', type: 'text', required: true },
      { name: 'receiving_party', label: 'Receiving Party', type: 'text', required: true },
      { name: 'purpose', label: 'Purpose of Disclosure', type: 'textarea', required: true },
      { name: 'confidential_info', label: 'Type of Confidential Information', type: 'textarea', required: true },
      { name: 'duration_years', label: 'Duration (years)', type: 'number', required: true },
      { name: 'jurisdiction', label: 'Jurisdiction (City)', type: 'text', required: true },
    ],
  },
  employment: {
    name: 'Employment Agreement',
    systemPrompt: `You are NyayaGPT, an expert Indian legal draft generator. Generate a comprehensive Employment Agreement compliant with Indian labour laws.

Respond in this EXACT JSON format:
{
  "title": "EMPLOYMENT AGREEMENT",
  "content": "Full employment agreement with all clauses including position, duties, compensation, benefits, probation, termination, confidentiality, non-compete, intellectual property, and governing law.",
  "sections": ["Appointment", "Compensation", "Duties", "Probation", "Termination", "Confidentiality", "IP Rights", "General"]
}`,
    fields: [
      { name: 'company_name', label: 'Company Name', type: 'text', required: true },
      { name: 'employee_name', label: 'Employee Name', type: 'text', required: true },
      { name: 'designation', label: 'Designation / Role', type: 'text', required: true },
      { name: 'salary', label: 'Annual CTC (₹)', type: 'text', required: true },
      { name: 'start_date', label: 'Start Date', type: 'date', required: true },
      { name: 'probation_months', label: 'Probation Period (months)', type: 'number', required: true },
      { name: 'notice_period', label: 'Notice Period (months)', type: 'number', required: true },
      { name: 'location', label: 'Work Location', type: 'text', required: true },
    ],
  },
  service_agreement: {
    name: 'Service Agreement',
    systemPrompt: `You are NyayaGPT, an expert Indian legal draft generator. Generate a comprehensive Service Agreement as per Indian Contract Act.

Respond in this EXACT JSON format:
{
  "title": "SERVICE AGREEMENT",
  "content": "Full service agreement with scope of work, payment terms, timelines, warranties, liability, termination, confidentiality, and dispute resolution clauses.",
  "sections": ["Scope", "Payment", "Timeline", "Warranties", "Liability", "Termination", "Dispute Resolution"]
}`,
    fields: [
      { name: 'provider_name', label: 'Service Provider Name', type: 'text', required: true },
      { name: 'client_name', label: 'Client Name', type: 'text', required: true },
      { name: 'services', label: 'Scope of Services', type: 'textarea', required: true },
      { name: 'fee', label: 'Service Fee (₹)', type: 'text', required: true },
      { name: 'duration', label: 'Duration', type: 'text', required: true },
      { name: 'payment_terms', label: 'Payment Terms', type: 'text', required: true, hint: 'e.g., 50% upfront, 50% on completion' },
      { name: 'jurisdiction', label: 'Jurisdiction (City)', type: 'text', required: true },
    ],
  },
  partnership: {
    name: 'Partnership Agreement',
    systemPrompt: `You are NyayaGPT, an expert Indian legal draft generator. Generate a Partnership Deed compliant with Indian Partnership Act, 1932.

Respond in this EXACT JSON format:
{
  "title": "PARTNERSHIP DEED",
  "content": "Full partnership deed with all clauses including partners, capital contribution, profit sharing, management, banking, accounting, dissolution, and dispute resolution.",
  "sections": ["Partners", "Business", "Capital", "Profit Sharing", "Management", "Dissolution", "General"]
}`,
    fields: [
      { name: 'firm_name', label: 'Firm Name', type: 'text', required: true },
      { name: 'business_nature', label: 'Nature of Business', type: 'text', required: true },
      { name: 'partner1_name', label: 'Partner 1 Name', type: 'text', required: true },
      { name: 'partner1_share', label: 'Partner 1 Share (%)', type: 'number', required: true },
      { name: 'partner2_name', label: 'Partner 2 Name', type: 'text', required: true },
      { name: 'partner2_share', label: 'Partner 2 Share (%)', type: 'number', required: true },
      { name: 'capital', label: 'Total Capital (₹)', type: 'text', required: true },
      { name: 'location', label: 'Business Location', type: 'text', required: true },
    ],
  },
  rent_agreement: {
    name: 'Rent Agreement',
    systemPrompt: `You are NyayaGPT, an expert Indian legal draft generator. Generate a Rent/Lease Agreement compliant with applicable Rent Control Acts and Transfer of Property Act.

Respond in this EXACT JSON format:
{
  "title": "RENT AGREEMENT",
  "content": "Full rent agreement with all clauses including property details, rent, security deposit, duration, maintenance, subletting, termination, and registration details.",
  "sections": ["Property", "Rent & Deposit", "Duration", "Maintenance", "Terms", "Termination", "General"]
}`,
    fields: [
      { name: 'landlord_name', label: 'Landlord Name', type: 'text', required: true },
      { name: 'tenant_name', label: 'Tenant Name', type: 'text', required: true },
      { name: 'property_address', label: 'Property Address', type: 'textarea', required: true },
      { name: 'rent_amount', label: 'Monthly Rent (₹)', type: 'text', required: true },
      { name: 'security_deposit', label: 'Security Deposit (₹)', type: 'text', required: true },
      { name: 'duration_months', label: 'Lease Duration (months)', type: 'number', required: true },
      { name: 'start_date', label: 'Start Date', type: 'date', required: true },
      { name: 'purpose', label: 'Purpose (Residential/Commercial)', type: 'text', required: true },
    ],
  },
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

export async function generateDraft(templateId, formData) {
  const template = DRAFT_TEMPLATES[templateId];
  if (!template) throw new Error('Invalid template');

  const details = Object.entries(formData)
    .map(([key, val]) => `${key.replace(/_/g, ' ')}: ${val}`)
    .join('\n');

  return callGemini(
    `Generate a professional Indian legal document with these details:\n\n${details}\n\nCreate a complete, ready-to-use document.`,
    template.systemPrompt
  );
}

// ── Case Analyzer API ───────────────────────────────────────

const ANALYZER_SYSTEM = `You are NyayaGPT, an expert Indian legal case analyzer. Given a legal document (petition, FIR, agreement, or legal notice), provide a comprehensive analysis.

Respond in this EXACT JSON format:
{
  "document_type": "Identified document type",
  "key_facts": ["Fact 1", "Fact 2", "Fact 3"],
  "risks": [
    { "level": "high", "title": "Risk Title", "description": "Explanation" },
    { "level": "medium", "title": "Risk Title", "description": "Explanation" },
    { "level": "low", "title": "Risk Title", "description": "Explanation" }
  ],
  "missing_clauses": [
    { "clause": "Clause name", "importance": "Why it matters" }
  ],
  "legal_issues": [
    { "issue": "Issue title", "explanation": "Detailed explanation" }
  ],
  "overall_risk_score": 65,
  "recommendation": "Overall recommendation paragraph"
}

Rules:
- Identify 3-8 key facts
- Identify 2-5 risks at different levels
- Identify 2-4 missing clauses or provisions
- Identify 2-4 legal issues
- Risk score is 0-100 (0 = no risk, 100 = extreme risk)
- Be specific to Indian law`;

export async function analyzeCase(text, docType) {
  const truncated = text.slice(0, 30000);
  return callGemini(
    `Analyze the following ${docType} under Indian law:\n\n---\n${truncated}\n---\n\nProvide a comprehensive analysis.`,
    ANALYZER_SYSTEM
  );
}

// ── Citation Finder API ──────────────────────────────────────

const CITATION_SYSTEM = `You are NyayaGPT, an expert Indian legal citation researcher. Given a legal issue, statute, or precedent, return a structured list of relevant judgments, cited precedents, court hierarchies, and citation connections (graph).

Respond in this EXACT JSON format:
{
  "judgments": [
    { 
      "name": "Case Name", 
      "citation": "Citation", 
      "court": "Court Name", 
      "year": "Year", 
      "citation_count": 87, 
      "citation_strength": "High", 
      "hierarchy_level": "Supreme Court", 
      "relevance_score": 95, 
      "snippet": "Ratio decidendi/excerpt" 
    }
  ],
  "graph": {
    "nodes": [
      { "id": "1", "label": "Case Name 1", "type": "supreme_court" },
      { "id": "2", "label": "Case Name 2", "type": "high_court" }
    ],
    "links": [
      { "source": "1", "target": "2", "type": "cited_by" }
    ]
  }
}

Rules:
- Provide 3-6 highly relevant citations
- Cite exact court levels (e.g. Supreme Court of India, Delhi High Court)
- Citation strength should be "High", "Medium", or "Low" based on frequency of referral
- Graph links represent citation connections between the cases in the nodes list`;

export async function findCitations(query) {
  return callGemini(
    `Find legal citations and build a connection graph for the following query/issue: "${query}"`,
    CITATION_SYSTEM
  );
}

// ── Deep Research API ───────────────────────────────────────

export async function deepResearch(query) {
  return callGemini(
    `Perform an exhaustive legal research on: "${query}". Provide a comprehensive analysis including applicable acts, relevant landmark judgments, potential risks, and a concluding opinion.`,
    "You are NyayaGPT, an expert Indian legal researcher. Provide deep, thorough, and highly accurate analysis."
  );
}

// ── General AI API ──────────────────────────────────────────

export async function generalAssistant(query) {
  return callGemini(
    query,
    "You are NyayaGPT, a helpful assistant. Provide concise and accurate answers."
  );
}

// ── Demo/Mock Data ──────────────────────────────────────────

export function getMockDeepResearchResult() {
  return {
    issue_summary: "Criminal liability of a non-executive independent director in cheque bounce cases under Section 138 of the Negotiable Instruments Act, 1881.",
    applicable_laws: [
      { act: "Negotiable Instruments Act, 1881", section: "Section 138", description: "Dishonour of cheque for insufficiency, etc., of funds in the account." },
      { act: "Negotiable Instruments Act, 1881", section: "Section 141", description: "Offences by companies and liability of directors/officers in charge of daily affairs." },
      { act: "Companies Act, 2013", section: "Section 149(12)", description: "Limitation of liability of independent and non-executive directors." }
    ],
    judgments: [
      { name: "S.M.S. Pharmaceuticals Ltd. v. Neeta Bhalla", citation: "(2005) 8 SCC 89", court: "Supreme Court of India", year: "2005", strength: 98, snippet: "Established that a clear statement must be made in the complaint showing the director was in charge of and responsible for the company's daily conduct." },
      { name: "Pooja Ravinder Devidasani v. State of Maharashtra", citation: "AIR 2015 SC 675", court: "Supreme Court of India", year: "2014", strength: 95, snippet: "Held that non-executive directors cannot be held liable under Section 138 merely by virtue of holding a designation, without specific overt acts showing operational control." },
      { name: "KK Ahuja v. V.K. Vora", citation: "(2009) 10 SCC 48", court: "Supreme Court of India", year: "2009", strength: 89, snippet: "Clarified the roles of Managing Directors, Directors, and Officers, reiterating that only those participating in everyday commercial actions are criminally liable." }
    ],
    arguments_for: [
      "The director is designated as a non-executive/independent director and does not draw operational salary.",
      "The Board resolution files prove the director has no signing authority on the bank accounts of the company.",
      "No specific averment is present in the complaint detailing the active involvement of the director in issuing the check."
    ],
    arguments_against: [
      "The complainant argues that all directors are collectively liable for company debts under statutory guidelines.",
      "The name of the director appears on the official company letterhead as an active advisor."
    ],
    potential_risks: [
      "Initial summon proceedings might still require the director to appear and file for quashing under Section 482 CrPC.",
      "Vaguely worded complaint drafts might delay discharge if operational participation is deemed an issue of trial evidence."
    ],
    conclusion: "Under Indian jurisprudence, specifically Section 141 of the NI Act and Section 149(12) of the Companies Act, a non-executive independent director cannot be held criminally liable for cheque bounce offences unless there is a clear, specific, and operational allegation showing they were in charge of the company's day-to-day affairs at the time of the offence. The landmark ruling in S.M.S. Pharmaceuticals and Pooja Ravinder Devidasani provides complete protection, allowing the director to seek quashing of summons from the High Court under Section 482 of the CrPC/BNS.",
    confidence_score: 95
  };
}

export function getMockGeneralAIResult() {
  return {
    answer: "To run a background task in a Node.js server, you can use built-in mechanisms like child processes or worker threads for CPU-heavy tasks. For robust, production-grade applications, it is highly recommended to use message queues like BullMQ (redis-backed), Agenda (mongodb-backed), or Celery (if working in a python stack). These allow you to schedule, monitor, and scale background processing nodes independently from your main HTTP router nodes."
  };
}

export function getMockResearchResult() {
  return {
    acts: [
      { name: 'Indian Penal Code, 1860', section: 'Section 498A', description: 'Husband or relative of husband of a woman subjecting her to cruelty — Punishment with imprisonment up to 3 years and fine.' },
      { name: 'Hindu Marriage Act, 1955', section: 'Section 13', description: 'Grounds for divorce including cruelty, desertion, conversion, unsoundness of mind, venereal disease, renunciation, and presumption of death.' },
      { name: 'Protection of Women from Domestic Violence Act, 2005', section: 'Section 3', description: 'Defines domestic violence including physical, sexual, verbal, emotional, and economic abuse.' },
    ],
    judgments: [
      { name: 'Arnesh Kumar v. State of Bihar', citation: '(2014) 8 SCC 273', court: 'Supreme Court of India', year: '2014', relevance: 95, snippet: 'The Supreme Court laid down guidelines to prevent automatic arrests in cases under Section 498A IPC, requiring the police to follow a checklist before making arrests.' },
      { name: 'Rajesh Sharma v. State of U.P.', citation: '(2017) 10 SCC 257', court: 'Supreme Court of India', year: '2017', relevance: 88, snippet: 'Directed establishment of Family Welfare Committees in every district to look into complaints of matrimonial disputes and recommend settlement.' },
      { name: 'Shobha Rani v. Madhukar Reddi', citation: '(1988) 1 SCC 105', court: 'Supreme Court of India', year: '1988', relevance: 78, snippet: 'Defined cruelty broadly to include both physical and mental cruelty, establishing that persistent demands for dowry constitute cruelty under Section 498A.' },
    ],
    analysis: 'Based on the legal research, Section 498A of the Indian Penal Code is the primary provision dealing with cruelty by husband or his relatives against a married woman. This section was introduced by the Criminal Law (Second Amendment) Act, 1983, to combat the increasing menace of dowry deaths and domestic violence.\n\nThe Supreme Court in Arnesh Kumar v. State of Bihar (2014) 8 SCC 273 recognized the potential misuse of Section 498A and laid down important safeguards, including a mandatory checklist for police officers before arrest. This judgment was a landmark in balancing the protection of women with prevention of misuse.\n\nIn addition to criminal remedies under Section 498A IPC, the Protection of Women from Domestic Violence Act, 2005 provides civil remedies including protection orders, residence orders, monetary relief, and custody orders. Section 13 of the Hindu Marriage Act, 1955 allows divorce on grounds of cruelty, providing a matrimonial remedy alongside criminal provisions.',
    confidence_score: 92,
    timeline: [
      { year: '1983', event: 'Section 498A added to IPC by Criminal Law Amendment Act.' },
      { 'year': '1988', event: 'Supreme Court defines physical and mental cruelty in Shobha Rani case.' },
      { year: '2005', event: 'Protection of Women from Domestic Violence Act enacted.' },
      { year: '2014', event: 'Arnesh Kumar guidelines issued to prevent automatic arrests.' }
    ],
    related_cases: [
      { name: 'Preeti Gupta v. State of Jharkhand', citation: '(2010) 7 SCC 667', court: 'Supreme Court of India' },
      { name: 'Sushil Kumar Sharma v. Union of India', citation: '(2005) 6 SCC 281', court: 'Supreme Court of India' }
    ],
    follow_ups: [
      'What are the guidelines for registering FIR in matrimonial disputes?',
      'How to apply for anticipatory bail in a Section 498A case?',
      'Are there amendments proposed for BNS regarding domestic violence?'
    ]
  };
}

export function getMockSummary() {
  return {
    title: 'Arnesh Kumar v. State of Bihar',
    court: 'Supreme Court of India',
    date: '2 July 2014',
    facts: [
      'The appellant was arrested under Section 498A IPC without proper investigation',
      'The case highlighted the growing concern of mechanical arrests in matrimonial disputes',
      'Police had arrested the accused without following proper procedure or assessing necessity of arrest',
    ],
    issues: [
      'Whether automatic arrest under Section 498A IPC is mandatory',
      'What safeguards should be in place to prevent misuse of Section 498A',
      'Whether the Magistrate should apply judicial mind before authorizing detention',
    ],
    petitioner_arguments: [
      'Section 498A is being widely misused as a tool for harassment',
      'Automatic arrests violate fundamental rights under Article 21',
      'Police should be required to investigate before making arrests',
    ],
    respondent_arguments: [
      'Section 498A is necessary to protect women from domestic violence',
      'Arrests are needed to prevent accused from influencing witnesses',
      'The provision serves an important social purpose',
    ],
    court_reasoning: 'The Supreme Court acknowledged that while Section 498A serves a vital purpose in protecting women from cruelty, its misuse cannot be ignored. The Court noted that in many cases, arrests were made mechanically without proper application of mind. The Court held that police officers must satisfy themselves about the necessity of arrest under Section 41 CrPC and prepare a checklist of reasons for arrest.',
    verdict: 'The Supreme Court directed all State Governments to instruct police officers not to automatically arrest the accused in Section 498A cases. Police must follow the checklist under Section 41(1)(b)(ii) CrPC. Magistrates must not authorize detention casually and must satisfy themselves that the arrest is warranted.',
    key_takeaways: [
      'Police cannot make automatic arrests in Section 498A cases',
      'A checklist must be prepared justifying the arrest',
      'Magistrates must apply judicial mind before authorizing detention',
      'Non-compliance may lead to departmental action against police officers',
      'This judgment balances protection of women with prevention of misuse',
    ],
  };
}

export function getMockAnalysis() {
  return {
    document_type: 'Service Agreement',
    key_facts: [
      'Agreement between two parties for software development services',
      'Contract value of ₹15,00,000 with milestone-based payments',
      'Project duration of 6 months from execution date',
      'No specific mention of data protection or privacy terms',
      'Intellectual property assignment clause is vaguely worded',
    ],
    risks: [
      { level: 'high', title: 'Vague IP Assignment', description: 'The intellectual property clause does not clearly specify ownership of derivative works and pre-existing IP. This could lead to disputes.' },
      { level: 'high', title: 'No Data Protection Terms', description: 'Given DPDP Act 2023 requirements, the absence of data protection clauses is a significant compliance risk.' },
      { level: 'medium', title: 'Limited Liability Cap Missing', description: 'No cap on liability has been specified, exposing both parties to unlimited claims.' },
      { level: 'medium', title: 'Inadequate Termination Clause', description: 'Termination clause does not address payments for partially completed work or transition assistance.' },
      { level: 'low', title: 'No Force Majeure', description: 'Agreement does not include force majeure provisions for unforeseen circumstances.' },
    ],
    missing_clauses: [
      { clause: 'Force Majeure', importance: 'Essential for protecting both parties from liability during unforeseen events like natural disasters or pandemics.' },
      { clause: 'Data Protection & Privacy', importance: 'Required under the Digital Personal Data Protection Act, 2023 for any agreement involving personal data processing.' },
      { clause: 'Non-Solicitation', importance: 'Prevents parties from poaching each other\'s employees during and after the engagement.' },
      { clause: 'Limitation of Liability', importance: 'Caps maximum liability to contract value, preventing disproportionate claims.' },
    ],
    legal_issues: [
      { issue: 'Stamp Duty Compliance', explanation: 'The agreement may require stamp duty as per the applicable state Stamp Act. Non-stamped agreements may not be admissible as evidence.' },
      { issue: 'GST Implications', explanation: 'The payment terms do not address GST obligations. Under GST law, the service provider must charge 18% GST on services.' },
      { issue: 'Dispute Resolution Mechanism', explanation: 'While arbitration is mentioned, the clause does not specify the seat of arbitration, language, or applicable arbitration rules.' },
    ],
    overall_risk_score: 68,
    recommendation: 'The agreement requires significant revision before execution. The most critical issues are the vague IP assignment clause and the complete absence of data protection terms (mandatory under DPDP Act 2023). We recommend adding Force Majeure, limitation of liability, data protection, and non-solicitation clauses. The arbitration clause should specify seat, language, and governing rules. GST and stamp duty compliance should be addressed explicitly.',
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
        snippet: "A landmark judgment establishing the concept of Public Interest Litigation (PIL) in India, holding that any member of the public can approach the court for public injury."
      },
      {
        name: "Bandhua Mukti Morcha v. Union of India",
        citation: "(1984) 3 SCC 161",
        court: "Supreme Court of India",
        year: "1984",
        citation_count: 189,
        citation_strength: "High",
        hierarchy_level: "Supreme Court",
        relevance_score: 92,
        snippet: "Reinforced PIL admissibility and held that the Court can appoint commissioners to locate bonded laborers and report back, bypassing rigid adversarial procedures."
      },
      {
        name: "Sheela Barse v. State of Maharashtra",
        citation: "(1983) 2 SCC 96",
        court: "Supreme Court of India",
        year: "1983",
        citation_count: 78,
        citation_strength: "Medium",
        hierarchy_level: "Supreme Court",
        relevance_score: 85,
        snippet: "Addressed rights of women prisoners, establishing that legal aid is a fundamental right under Article 21 and laying down guidelines for custodial treatment."
      }
    ],
    graph: {
      nodes: [
        { id: "sp_gupta", label: "S.P. Gupta v. President of India (1981)", type: "supreme_court" },
        { id: "bandhua", label: "Bandhua Mukti Morcha v. UOI (1984)", type: "supreme_court" },
        { id: "sheela", label: "Sheela Barse v. State of Maha (1983)", type: "supreme_court" }
      ],
      links: [
        { source: "bandhua", target: "sp_gupta", type: "cited_by" },
        { source: "sheela", target: "sp_gupta", type: "cited_by" }
      ]
    }
  };
}
