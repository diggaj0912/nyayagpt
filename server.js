// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Express Backend Server
// ═══════════════════════════════════════════════════════════════

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { classifyQueryHeuristic, searchLegalDB } from './services/legal_db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Middlewares
app.use(cors());
app.use(express.json());

// API Key Resolver Helper
function resolveApiKey(req) {
  // Check Authorization Header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const key = authHeader.substring(7).trim();
    if (key) return key;
  }
  
  // Check Request Body
  if (req.body && req.body.apiKey) {
    return req.body.apiKey;
  }
  
  // Check Environment Variable
  return process.env.GEMINI_API_KEY || '';
}

// Gemini API Call Helper
async function callGeminiAPI(apiKey, prompt, systemInstruction = '') {
  const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
  const MODEL = 'gemini-2.0-flash';
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

// ── SYSTEM PROMPTS ──────────────────────────────────────────

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

// ── API ROUTES ──────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'NyayaGPT Express Backend' });
});

// Main research router
app.post('/api/research', async (req, res) => {
  const { query, mode = 'legal' } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const apiKey = resolveApiKey(req);
  console.log(`[Backend API] Processing query: "${query}" in mode: "${mode}". Has Key: ${!!apiKey}`);

  try {
    // Step 1: Query Classification
    let isLegal = false;
    
    if (apiKey) {
      try {
        const classification = await callGeminiAPI(
          apiKey,
          `Analyze user query: "${query}"`,
          CLASSIFICATION_SYSTEM
        );
        isLegal = !!classification.is_legal;
      } catch (err) {
        console.warn('[Backend API] Gemini classification failed, falling back to heuristic:', err.message);
        isLegal = classifyQueryHeuristic(query).is_legal;
      }
    } else {
      isLegal = classifyQueryHeuristic(query).is_legal;
    }

    // Step 2: Routing
    if (isLegal) {
      // It is a legal query. Run RAG search
      const ragResults = searchLegalDB(query);
      
      if (apiKey) {
        // We have an API key, perform RAG augmented generation
        const contextStr = JSON.stringify(ragResults);
        
        if (ragResults.sources_found) {
          // Sources found. Generate grounded legal answer
          const systemInstruction = mode === 'deep' ? DEEP_RESEARCH_SYSTEM : RESEARCH_SYSTEM;
          const prompt = `User Query: "${query}"\n\nRetrieved Legal Context:\n${contextStr}\n\nBased on the retrieved acts and judgments, generate the legal answer/memorandum. Strictly align with the required JSON structure.`;
          
          const aiResponse = await callGeminiAPI(apiKey, prompt, systemInstruction);
          return res.json({
            is_legal: true,
            query,
            sources_found: true,
            ...aiResponse,
            graph: ragResults.graph // Attach citation graph built by search engine
          });
        } else {
          // No legal sources found in database. Inform user & fallback to general legal AI reasoning
          console.log('[Backend API] Legal query, but no sources found in RAG. Falling back to general reasoning.');
          const systemInstruction = mode === 'deep' ? DEEP_RESEARCH_SYSTEM : RESEARCH_SYSTEM;
          const prompt = `User Query: "${query}"\n\nNote: No specific matches were found in the local legal database. Perform general legal reasoning to analyze and answer the query. Set "sources_found" to false in your JSON.`;
          
          const aiResponse = await callGeminiAPI(apiKey, prompt, systemInstruction);
          return res.json({
            is_legal: true,
            query,
            sources_found: false,
            ...aiResponse
          });
        }
      } else {
        // No API key configured. Run dynamic local mock RAG generator
        console.log('[Backend API] Running in Demo mode (RAG Fallback)');
        const response = generateDynamicMockResponse(query, mode, ragResults);
        return res.json(response);
      }
    } else {
      // Non-legal query. Route to General LLM
      if (apiKey) {
        const response = await callGeminiAPI(
          apiKey,
          `Answer general query: "${query}"`,
          GENERAL_AI_SYSTEM
        );
        return res.json({
          is_legal: false,
          query,
          answer: response.answer
        });
      } else {
        // No API key general fallback
        const cleanQuery = query.trim();
        const fallbackText = `General Assistant (Demo Mode): You asked: "${cleanQuery}".\n\nThis query is classified as a general (non-legal) prompt. To get full generative answers, please connect your Gemini API Key in the Settings panel.`;
        return res.json({
          is_legal: false,
          query,
          answer: fallbackText
        });
      }
    }
  } catch (error) {
    console.error('[Backend API] Error processing query:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Dynamic Local Mock Generator (Never hardcoded)
function generateDynamicMockResponse(query, mode, ragResults) {
  const queryWords = query.split(/\s+/).filter(w => w.length > 3).slice(0, 5).join(' ');
  const displaySubject = queryWords ? `"${queryWords}"` : `your request`;
  
  if (!ragResults.sources_found) {
    // If no legal sources are found in the local DB
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

  // If sources are found
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

  // Legal mode default
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

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 NyayaGPT Express backend running on http://localhost:${PORT}`);
});
