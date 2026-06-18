// ═══════════════════════════════════════════════════════════════
// NyayaGPT — AI Service (Google Gemini API)
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { classifyQueryHeuristic, searchLegalDB } from './legal_db.js';

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
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1].trim());
    }
    return { raw: text };
  }
}

// ── Query Classifier & RAG Workflow ──────────────────────────

const CLASSIFICATION_SYSTEM = `Analyze the user's input. Identify if this query is asking for Indian legal advice, statutory codes, sections, court judgments, precedents, or other legal information.
Respond in this EXACT JSON format:
{
  "is_legal": true
}`;

const RESEARCH_SYSTEM = `You are NyayaGPT, an expert Indian legal research assistant. You search court records and acts to ground your answers.
If no relevant Indian statutes or judgments are found, set "sources_found" to false.

Respond in this EXACT JSON format:
{
  "sources_found": true,
  "acts": [
    { "name": "Act Name", "section": "Section Number", "description": "Brief explanation of relevance" }
  ],
  "judgments": [
    { "name": "Case Name v. Other Party", "citation": "(Year) Volume SCC/AIR Page", "court": "Supreme Court / High Court Name", "year": "Year", "relevance": 95, "snippet": "Key excerpt or ratio" }
  ],
  "reasoning_summary": "Brief summary of AI's search and analytical logic (1-2 sentences)",
  "analysis": "Detailed legal analysis in 3-5 paragraphs with inline references to the acts and judgments listed above.",
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
}`;

const DEEP_RESEARCH_SYSTEM = `You are NyayaGPT, a senior legal researcher in India. Perform a deep multi-step legal analysis and return a comprehensive legal memorandum.
If no relevant Indian statutes or judgments are found, set "sources_found" to false.

Respond in this EXACT JSON format:
{
  "sources_found": true,
  "issue_summary": "Summary of the legal issue(s)",
  "applicable_laws": [
    { "act": "Act Name", "section": "Section Code", "description": "Relevance" }
  ],
  "judgments": [
    { "name": "Case Name", "citation": "Citation", "court": "Court", "year": "Year", "strength": 90, "snippet": "Ratio/summary" }
  ],
  "reasoning_summary": "Brief summary of AI's search and analytical logic (1-2 sentences)",
  "arguments_for": ["Argument 1", "Argument 2"],
  "arguments_against": ["Argument 1", "Argument 2"],
  "potential_risks": ["Risk 1", "Risk 2"],
  "analysis": "Detailed legal analysis of the memorandum.",
  "conclusion": "Final detailed research memo conclusion",
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
}`;

const GENERAL_AI_SYSTEM = `You are a helpful AI assistant. Answer the user's question clearly. Return the answer in this JSON format:
{
  "answer": "Your detailed answer here"
}`;

export async function processQueryWorkflow(query, mode = 'legal') {
  const apiKey = getApiKey();
  
  try {
    const res = await fetch('/api/research', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey ? `Bearer ${apiKey}` : ''
      },
      body: JSON.stringify({ query, mode })
    });
    
    if (res.ok) {
      return await res.json();
    }
    const errData = await res.json().catch(() => ({}));
    console.warn('[AI Service] Backend API returned error, running client RAG fallback:', errData.error);
  } catch (err) {
    console.warn('[AI Service] Backend API unreachable, running client RAG fallback:', err.message);
  }

  // Client-side fallback if backend fails or is unreachable
  return executeClientRAGWorkflow(query, mode, apiKey);
}

async function executeClientRAGWorkflow(query, mode, apiKey) {
  // Step 1: Classifier
  let isLegal = false;
  if (apiKey) {
    try {
      const classification = await callGemini(
        `Analyze user query: "${query}"`,
        CLASSIFICATION_SYSTEM
      );
      isLegal = !!classification.is_legal;
    } catch {
      isLegal = classifyQueryHeuristic(query).is_legal;
    }
  } else {
    isLegal = classifyQueryHeuristic(query).is_legal;
  }

  // Step 2: Routing
  if (isLegal) {
    const ragResults = searchLegalDB(query);
    
    if (apiKey) {
      const contextStr = JSON.stringify(ragResults);
      if (ragResults.sources_found) {
        const systemInstruction = mode === 'deep' ? DEEP_RESEARCH_SYSTEM : RESEARCH_SYSTEM;
        const prompt = `User Query: "${query}"\n\nRetrieved Legal Context:\n${contextStr}\n\nBased on the retrieved acts and judgments, generate the legal answer/memorandum. Strictly align with the required JSON structure.`;
        const response = await callGemini(prompt, systemInstruction);
        return {
          is_legal: true,
          query,
          sources_found: true,
          ...response,
          graph: ragResults.graph
        };
      } else {
        const systemInstruction = mode === 'deep' ? DEEP_RESEARCH_SYSTEM : RESEARCH_SYSTEM;
        const prompt = `User Query: "${query}"\n\nNote: No specific matches were found in the local legal database. Perform general legal reasoning to analyze and answer the query. Set "sources_found" to false in your JSON.`;
        const response = await callGemini(prompt, systemInstruction);
        return {
          is_legal: true,
          query,
          sources_found: false,
          ...response
        };
      }
    } else {
      // Dynamic local mock fallback
      return clientSideMockResponse(query, mode, ragResults);
    }
  } else {
    if (apiKey) {
      const response = await callGemini(
        `Answer general query: "${query}"`,
        GENERAL_AI_SYSTEM
      );
      return {
        is_legal: false,
        query,
        answer: response.answer
      };
    } else {
      const fallbackText = `General Assistant (Demo Mode): You asked: "${query}".\n\nThis query is classified as a general (non-legal) prompt. To get full generative answers, please connect your Gemini API Key in the Settings panel.`;
      return {
        is_legal: false,
        query,
        answer: fallbackText
      };
    }
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
  const truncated = text.slice(0, 30000);
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

// ── Demo/Mock Data ──────────────────────────────────────────

function clientSideMockResponse(query, mode, ragResults) {
  const queryWords = query.split(/\s+/).filter(w => w.length > 3).slice(0, 5).join(' ');
  const displaySubject = queryWords ? `"${queryWords}"` : `your request`;
  
  if (!ragResults.sources_found) {
    return {
      is_legal: true,
      query,
      sources_found: false,
      reasoning_summary: `Scanned statutory databases for ${displaySubject}, but found no direct references.`,
      analysis: `We did not locate specific statutory sections or judgments directly matching: "${query}".\n\nGeneral legal reasoning indicates that this issue is likely governed by general principles of Indian civil/criminal law. In legal practice, a matter of this nature would require checking procedural details and state-specific amendments.\n\n[DEMO MODE] Connect your Gemini API key in Settings to search the live indexes.`,
      confidence_score: 45,
      timeline: [],
      related_cases: [],
      follow_ups: [
        'How does Indian contract law apply generally here?',
        'Specify another act or section to narrow down search.'
      ]
    };
  }

  const acts = ragResults.acts;
  const judgments = ragResults.judgments;
  const mainAct = acts[0] || { name: 'Indian Statutes', section: 'applicable rules' };
  const mainJudgment = judgments[0] || { name: 'landmark precedents', citation: '' };

  if (mode === 'deep') {
    return {
      is_legal: true,
      query,
      sources_found: true,
      issue_summary: `Legal issue regarding ${displaySubject} under the provisions of ${mainAct.name}.`,
      applicable_laws: acts.map(a => ({ act: a.name, section: a.section, description: a.description })),
      judgments: judgments.map(j => ({ name: j.name, citation: j.citation, court: j.court, year: j.year, strength: 90, snippet: j.snippet })),
      reasoning_summary: `Identified key statutes: ${acts.map(a => a.section).join(', ')}. Analyzed precedent in ${mainJudgment.name}.`,
      arguments_for: [
        `Compliance with the express wording of ${mainAct.section} protects the applicant's rights.`,
        `The ratio decidendi in ${mainJudgment.name} supports a favorable interpretation of this dispute.`
      ],
      arguments_against: [
        `Opposing counsel might argue lack of strict procedural adherence.`,
        `Factual distinctions could limit the direct binding value of ${mainJudgment.name}.`
      ],
      potential_risks: [
        `Risk of civil litigation delays under Section 73 Contract Act.`,
        `Evidence collection burden to establish intention/consent.`
      ],
      analysis: `A detailed analysis of ${displaySubject} under Indian jurisprudence reveals strong grounding under ${mainAct.name}, ${mainAct.section}.\n\nAccording to ${mainAct.section}: "${mainAct.description}". This provision establishes the legal framework governing the transaction.\n\nFurthermore, the Supreme Court of India in ${mainJudgment.name} (${mainJudgment.citation}) held that: "${mainJudgment.snippet}". This precedent binds subordinate courts and outlines the criteria that must be satisfied to establish liability or seek relief.\n\n[DEMO MODE] This memorandum has been dynamically generated from offline indexes. To generate professional, comprehensive summaries via LLM, please configure your Gemini API Key in settings.`,
      conclusion: `Based on the statutory rules of ${mainAct.section} and precedents like ${mainJudgment.name}, there is a viable case here, provided proper notices have been served.`,
      confidence_score: 85,
      timeline: ragResults.timeline,
      related_cases: judgments.slice(1).map(j => ({ name: j.name, citation: j.citation, court: j.court })),
      follow_ups: [
        `What are the specific filings required under ${mainAct.name}?`,
        `How does the ruling in ${mainJudgment.name} apply to corporate bodies?`
      ],
      graph: ragResults.graph
    };
  }

  return {
    is_legal: true,
    query,
    sources_found: true,
    acts: acts.map(a => ({ name: a.name, section: a.section, description: a.description })),
    judgments: judgments.map(j => ({ name: j.name, citation: j.citation, court: j.court, year: j.year, relevance: j.relevance, snippet: j.snippet })),
    reasoning_summary: `Found statutory grounding in ${mainAct.name} (${mainAct.section}) and judicial authorities including ${mainJudgment.name}.`,
    analysis: `In relation to your query on ${displaySubject}, the primary statutory provision is ${mainAct.section} of the ${mainAct.name}, which states that ${mainAct.description}.\n\nThis is reinforced by judicial precedents. Specifically, in ${mainJudgment.name} (${mainJudgment.citation}), the ${mainJudgment.court} established that ${mainJudgment.snippet}.\n\nIf you are drafting pleadings or advising a client, ensure that all the key ingredients of ${mainAct.section} are documented. For example, if there is a claim under Section 138 of the NI Act, verify the 30-day notice timeline.\n\n[DEMO MODE] Dynamically retrieved from local knowledge indexes. Configure your Gemini API Key in Settings to enable real-time web-connected legal analysis.`,
    confidence_score: 80,
    timeline: ragResults.timeline,
    related_cases: judgments.slice(1).map(j => ({ name: j.name, citation: j.citation, court: j.court })),
    follow_ups: [
      `What is the limitation period under ${mainAct.name}?`,
      `How to draft a legal notice citing ${mainJudgment.name}?`
    ],
    graph: ragResults.graph
  };
}

export function getMockResearchResult() {
  return {
    acts: [
      { name: 'Indian Penal Code, 1860', section: 'Section 498A', description: 'Husband or relative of husband of a woman subjecting her to cruelty.' },
      { name: 'Hindu Marriage Act, 1955', section: 'Section 13', description: 'Grounds for divorce.' }
    ],
    judgments: [
      { name: 'Arnesh Kumar v. State of Bihar', citation: '(2014) 8 SCC 273', court: 'Supreme Court of India', year: '2014', relevance: 95, snippet: 'Safeguards against automatic arrest.' }
    ],
    analysis: 'Cruelty by husband or relatives is governed by Section 498A of the IPC (and equivalent BNS sections). The Supreme Court has laid down checklists to prevent misuse of this section.',
    confidence_score: 92,
    timeline: [
      { year: '1983', event: 'Section 498A added to IPC.' },
      { year: '2014', event: 'Arnesh Kumar guidelines issued.' }
    ],
    related_cases: [
      { name: 'Preeti Gupta v. State of Jharkhand', citation: '(2010) 7 SCC 667', court: 'Supreme Court of India' }
    ],
    follow_ups: [
      'What are the guidelines for registering matrimonial FIRs?',
      'How to obtain anticipatory bail in 498A?'
    ]
  };
}

export function getMockDeepResearchResult() {
  return {
    is_legal: true,
    sources_found: true,
    issue_summary: "Cheque bounce operational checks under Section 138 NI Act.",
    applicable_laws: [
      { act: 'Negotiable Instruments Act, 1881', section: 'Section 138', description: 'Liability for check bounce.' }
    ],
    judgments: [
      { name: 'S.M.S. Pharmaceuticals Ltd. v. Neeta Bhalla', citation: '(2005) 8 SCC 89', court: 'Supreme Court of India', year: '2005', strength: 95, snippet: 'Director operational control requirement.' }
    ],
    arguments_for: ["Director not involved in operational check signatures."],
    arguments_against: ["Name present on letters."],
    potential_risks: ["Delay of summons quashing."],
    analysis: "Under Section 138 NI Act, criminal summons require clear operational control by the accused director.",
    conclusion: "Non-executive directors should seek High Court quashing under Section 482 of CrPC.",
    confidence_score: 95
  };
}

export function getMockGeneralAIResult() {
  return {
    answer: "To manage background workers in Node, use message queues like BullMQ."
  };
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

export function getMockSummary() {
  return {
    title: "Arnesh Kumar v. State of Bihar",
    court: "Supreme Court of India",
    date: "July 2, 2014",
    facts: [
      "The appellant (husband) filed a petition seeking anticipatory bail in a case registered under Section 498A IPC and Section 4 of the Dowry Prohibition Act.",
      "The wife alleged that the husband and his family harassed and demanded dowry of Rs. 8 lakhs, a Maruti car, and other items.",
      "The High Court of Patna rejected the anticipatory bail application of the husband, which led to this appeal in the Supreme Court."
    ],
    issues: [
      "Whether the power of arrest is exercised routinely and arbitrarily by police officers under Section 498A IPC.",
      "What guidelines and safeguards should be implemented to prevent arbitrary arrests in offences carrying less than 7 years imprisonment."
    ],
    petitioner_arguments: [
      "The allegations of cruelty and dowry harassment are completely baseless and fabricated.",
      "The arrest under Section 498A IPC is used as a tool of harassment and blackmail, leading to immediate custodial detention of family members without any preliminary inquiry."
    ],
    respondent_arguments: [
      "Matrimonial cruelty is a grave social evil, and immediate arrest is required to prevent destruction of evidence and protect the victim.",
      "The police acted in accordance with the law to investigate cognizable offences based on a written complaint by the wife."
    ],
    court_reasoning: "The Supreme Court noted that Section 498A was introduced to protect women but has been widely abused as a weapon by disgruntled wives. Arrest brings humiliation, castigates the person and his family forever. The Court held that the power to arrest is one thing, but the justification for the exercise of it is quite another. Section 41 of CrPC sets out restrictions and conditions on when a police officer may arrest without a warrant. The police must satisfy themselves that the arrest is necessary to prevent further offences, ensure proper investigation, or prevent tampering of evidence.",
    verdict: "The Supreme Court allowed the appeal, granted anticipatory bail to the appellant, and laid down mandatory guidelines to be followed by the police and magistrates in all arrests for offences carrying less than 7 years imprisonment, making non-compliance punishable by disciplinary and contempt action.",
    key_takeaways: [
      "Police officers cannot arrest an accused automatically under Section 498A IPC without satisfying the conditions under Section 41 CrPC.",
      "A notice of appearance under Section 41A CrPC must be served on the accused within 2 weeks of registering the FIR.",
      "Magistrates must verify the reasons for arrest and satisfy themselves before authorizing detention of the accused."
    ]
  };
}
