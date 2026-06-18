// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Production SaaS Backend Server
// ═══════════════════════════════════════════════════════════════

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import { createClient } from '@supabase/supabase-js';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import PDFDocument from 'pdfkit';
import { generateSummaryPDF } from './generate_pdf.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Middlewares
app.use(cors());
app.use(express.json());

// Initialize Supabase admin client (Bypasses RLS where necessary, e.g., webhooks & admin panels)
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
let supabase = null;

if (supabaseUrl && supabaseServiceKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log('🟢 Supabase client initialized.');
  } catch (err) {
    console.error('❌ Failed to initialize Supabase client:', err.message);
  }
} else {
  console.log('⚠️ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing. Running server with local offline schemas and mock vector db.');
}

// Gemini Base Configuration
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const EMBEDDING_MODEL = 'text-embedding-004';
const CHAT_MODEL = 'gemini-2.5-pro';
const FAST_MODEL = 'gemini-2.5-flash';

// ── API Key Resolver ──────────────────────────────────────────
function getApiKey(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return process.env.GEMINI_API_KEY || '';
}

// ── Gemini API Call Helpers ────────────────────────────────────

async function callGemini(apiKey, model, systemPrompt, userMessage, jsonMode = true) {
  const url = `${GEMINI_BASE}/${model}:generateContent?key=${apiKey}`;
  
  const body = {
    contents: [{ parts: [{ text: userMessage }] }],
    generationConfig: {
      temperature: 0.2,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: jsonMode ? 'application/json' : 'text/plain',
    }
  };

  if (systemPrompt) {
    body.systemInstruction = { parts: [{ text: systemPrompt }] };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from AI engine');

  if (jsonMode) {
    try {
      return JSON.parse(text);
    } catch {
      const match = text.match(/```json\s*([\s\S]*?)\s*```/);
      if (match) return JSON.parse(match[1]);
      throw new Error('Failed to parse response as JSON');
    }
  }
  return text;
}

// Generate Embeddings via Gemini text-embedding-004
async function getGeminiEmbedding(apiKey, text) {
  const url = `${GEMINI_BASE}/${EMBEDDING_MODEL}:embedContent?key=${apiKey}`;
  
  const body = {
    model: `models/${EMBEDDING_MODEL}`,
    content: { parts: [{ text }] }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`Embedding generation failed: ${res.statusText}`);
  }

  const data = await res.json();
  return data?.embedding?.values || [];
}

// ── Auth Verification Middleware ────────────────────────────────
async function verifyUser(req, res, next) {
  if (!supabase) {
    req.user = { id: '00000000-0000-0000-0000-000000000000', email: 'demo@nyayagpt.in', raw_user_meta_data: { full_name: 'Demo Advocate' } };
    return next();
  }

  const token = req.headers['x-supabase-token'];
  if (!token) {
    return res.status(401).json({ error: 'Missing access token' });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return res.status(401).json({ error: 'Invalid authentication session' });
  }

  req.user = user;
  next();
}

// ── Phase 7: Subscription Enforcement Middleware ───────────────
async function checkUsageQuotas(req, res, next) {
  if (!supabase) {
    req.userSubscription = { id: 'mock-sub-id', plan_tier: 'student', status: 'active', usage_count_research: 0, usage_count_summaries: 0, usage_count_drafts: 0 };
    return next();
  }

  const userId = req.user.id;
  
  const { data: sub, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !sub) {
    return res.status(403).json({ error: 'No active billing subscription found' });
  }

  if (sub.status !== 'active') {
    return res.status(402).json({ error: 'Subscription past due or inactive' });
  }

  // Quota enforcement based on Tier
  const limits = {
    student: { research: 10, summaries: 5, drafts: 5 },
    pro: { research: 500, summaries: 100, drafts: 100 },
    firm: { research: 2000, summaries: 500, drafts: 500 },
    enterprise: { research: 99999, summaries: 99999, drafts: 99999 }
  };

  const currentLimits = limits[sub.plan_tier] || limits.student;

  const path = req.path;
  if (path.includes('/research') && sub.usage_count_research >= currentLimits.research) {
    return res.status(429).json({ error: 'Research query limit exceeded for current billing cycle' });
  }
  if (path.includes('/summarizer') && sub.usage_count_summaries >= currentLimits.summaries) {
    return res.status(429).json({ error: 'Summary limit exceeded for current billing cycle' });
  }
  if (path.includes('/drafts') && sub.usage_count_drafts >= currentLimits.drafts) {
    return res.status(429).json({ error: 'Contract draft generation limit exceeded' });
  }

  req.userSubscription = sub;
  next();
}

// ── System Instructions ──────────────────────────────────────

const CLASSIFICATION_SYSTEM = `Analyze the user's input. Identify if this query is asking for Indian legal advice, statutory codes, sections, court judgments, precedents, or other legal information.
Respond in this EXACT JSON format:
{
  "is_legal": true
}`;

const RAG_RESEARCH_SYSTEM = `You are NyayaGPT, an expert Indian legal research assistant.
Based on the provided acts and judgments, generate a comprehensive legal memorandum.
Set "sources_found" to true if specific statutory codes or judgments are found.
Respond in this EXACT JSON format:
{
  "sources_found": true,
  "issue_summary": "Summary of the legal issue",
  "acts": [
    { "name": "Act Name", "section": "Section number", "description": "Relevance" }
  ],
  "judgments": [
    { "name": "Case Name", "citation": "Citation", "court": "Court", "year": "Year", "relevance": 95, "snippet": "Excerpt" }
  ],
  "reasoning_summary": "AI reasoning analysis summary",
  "analysis": "Detailed legal memo analysis",
  "confidence_score": 90,
  "timeline": [
    { "year": "Year", "event": "Event description" }
  ],
  "follow_ups": [
    "Suggested question 1",
    "Suggested question 2"
  ]
}`;

// ── Phase 2 & 3: Legal Research & RAG ────────────────────────
app.post('/api/research', verifyUser, checkUsageQuotas, async (req, res) => {
  const { query, mode = 'legal' } = req.body;
  const apiKey = getApiKey(req);
  
  if (!apiKey) {
    return res.status(400).json({ error: 'Gemini API key is required' });
  }

  try {
    // 1. Classification
    const classification = await callGemini(
      apiKey,
      FAST_MODEL,
      CLASSIFICATION_SYSTEM,
      `Analyze user query: "${query}"`
    );

    if (!classification.is_legal) {
      // General direct response
      const answer = await callGemini(
        apiKey,
        FAST_MODEL,
        'You are a helpful assistant. Provide a structured response.',
        query,
        false // Plain text
      );
      
      await supabase.from('activity_logs').insert({ user_id: req.user.id, action_type: 'query', metadata: { is_legal: false } });
      return res.json({ is_legal: false, query, answer });
    }

    // 2. Legal Research Vector Search
    const queryVector = await getGeminiEmbedding(apiKey, query);
    
    // Call pgvector matching RPC
    const { data: chunks, error: rpcError } = await supabase.rpc('match_document_chunks', {
      query_embedding: queryVector,
      match_threshold: 0.25,
      match_count: 5
    });

    if (rpcError) throw rpcError;

    const contextStr = chunks && chunks.length > 0
      ? chunks.map(c => `[Doc Chunk]: ${c.content}`).join('\n')
      : "No matching documents found in user workspace knowledge base.";

    // 3. Generate Answer
    const response = await callGemini(
      apiKey,
      CHAT_MODEL,
      RAG_RESEARCH_SYSTEM,
      `Query: "${query}"\n\nRetrieved Knowledge Context:\n${contextStr}`
    );

    // Increment Usage limits
    await supabase.rpc('increment_usage', { sub_id: req.userSubscription.id, column_name: 'usage_count_research' });
    
    // Save to search log database history
    await supabase.from('research_history').insert({
      user_id: req.user.id,
      query,
      is_legal: true,
      sources: response.acts || [],
      answer: response.analysis || '',
      reasoning_summary: response.reasoning_summary,
      timeline: response.timeline || [],
      citation_graph: { nodes: (response.judgments || []).map(j => ({ id: j.name, label: j.name, type: 'supreme_court' })), links: [] }
    });

    await supabase.from('notifications').insert({
      user_id: req.user.id,
      title: 'Research completed',
      message: `Query resolved: "${query.slice(0, 30)}..."`,
      type: 'research_completed'
    });

    res.json({
      is_legal: true,
      query,
      sources_found: response.sources_found,
      ...response,
      graph: {
        nodes: (response.judgments || []).map((j, i) => ({ id: `${i}`, label: j.name, type: 'court' })),
        links: []
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Phase 4: Summarizer ──────────────────────────────────────
app.post('/api/summarizer/upload', verifyUser, checkUsageQuotas, async (req, res) => {
  const { documentText } = req.body;
  const apiKey = getApiKey(req);

  if (!documentText) {
    return res.status(400).json({ error: 'Text document is required' });
  }

  try {
    const SUMMARIZER_SYSTEM = `You are a legal summarizer. Analyze the court judgment and provide a structured JSON:
    {
      "title": "Case title",
      "court": "Court name",
      "date": "Date of judgment",
      "facts": ["Fact 1", "Fact 2"],
      "issues": ["Issue 1"],
      "petitioner_arguments": ["Arg 1"],
      "respondent_arguments": ["Arg 1"],
      "court_reasoning": "Reasoning summary",
      "verdict": "Verdict summary",
      "key_takeaways": ["Takeaway 1"]
    }`;

    const summary = await callGemini(
      apiKey,
      CHAT_MODEL,
      SUMMARIZER_SYSTEM,
      documentText.slice(0, 40000)
    );

    // Save summary document metadata in Supabase
    await supabase.from('documents').insert({
      title: summary.title || 'Judgment Summary',
      content: JSON.stringify(summary),
      doc_type: 'judgment',
      uploaded_by: req.user.id
    });

    await supabase.rpc('increment_usage', { sub_id: req.userSubscription.id, column_name: 'usage_count_summaries' });

    res.json(summary);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Download/export generated formats
app.post('/api/summarizer/export/docx', (req, res) => {
  const { summary } = req.body;
  
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({ text: summary.title || 'Judgment Summary', heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ text: `Court: ${summary.court || 'N/A'}` }),
        new Paragraph({ text: `Date: ${summary.date || 'N/A'}` }),
        new Paragraph({ text: 'Facts:', heading: HeadingLevel.HEADING_2 }),
        ...(summary.facts || []).map(f => new Paragraph({ text: `• ${f}` })),
        new Paragraph({ text: 'Issues:', heading: HeadingLevel.HEADING_2 }),
        ...(summary.issues || []).map(i => new Paragraph({ text: `• ${i}` })),
        new Paragraph({ text: 'Reasoning:', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: summary.court_reasoning || '' }),
        new Paragraph({ text: 'Verdict:', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: summary.verdict || '' })
      ]
    }]
  });

  Packer.toBuffer(doc).then(buffer => {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=summary.docx');
    res.send(buffer);
  });
});

// Export summary in PDF format
app.post('/api/summarizer/export/pdf', (req, res) => {
  const { summary } = req.body;
  if (!summary) {
    return res.status(400).json({ error: 'Summary data is required' });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=summary.pdf');

  try {
    generateSummaryPDF(summary, res);
  } catch (err) {
    console.error('PDF generation error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate PDF' });
    }
  }
});


// ── Phase 5: Contract Generator ──────────────────────────────
app.post('/api/drafts/generate', verifyUser, checkUsageQuotas, async (req, res) => {
  const { templateId, formData } = req.body;
  const apiKey = getApiKey(req);

  try {
    const CONTRACT_SYSTEM = `You are a legal draft generator. Create a professional contract based on details.
    Respond in JSON format:
    {
      "title": "Contract Title",
      "content": "Full text of contract with numbered sections.",
      "sections": ["Section 1 Title", "Section 2 Title"]
    }`;

    const prompt = `Template ID: ${templateId}\nInputs:\n${JSON.stringify(formData)}`;
    const draft = await callGemini(apiKey, CHAT_MODEL, CONTRACT_SYSTEM, prompt);

    await supabase.from('drafts').insert({
      user_id: req.user.id,
      title: draft.title || 'Legal Draft',
      template_id: templateId,
      content: draft.content,
      form_inputs: formData
    });

    await supabase.rpc('increment_usage', { sub_id: req.userSubscription.id, column_name: 'usage_count_drafts' });

    res.json(draft);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clause Editing Modifiers
app.post('/api/drafts/clause/modify', verifyUser, async (req, res) => {
  const { clause, action } = req.body; // action: 'stricter' | 'simpler' | 'rewrite' | 'risks'
  const apiKey = getApiKey(req);

  try {
    let instruction = '';
    if (action === 'stricter') instruction = 'Make this legal clause stricter and favor the drafting party more aggressively under Indian law.';
    else if (action === 'simpler') instruction = 'Rewrite this legal clause in plain, simple English that is easy to understand, while retaining complete legal enforceability.';
    else if (action === 'risks') instruction = 'Analyze this clause and output a JSON list of key legal risks and missing protections.';
    else instruction = 'Rewrite this clause professionally.';

    const systemPrompt = action === 'risks' 
      ? 'Output a JSON object: { "risks": ["Risk 1", "Risk 2"] }'
      : 'Output a JSON object: { "content": "Modified clause text" }';

    const response = await callGemini(apiKey, FAST_MODEL, systemPrompt, `${instruction}\n\nClause: "${clause}"`);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Phase 6: Knowledge Base Semantic Search ──────────────────
app.post('/api/knowledge-base/upload', verifyUser, async (req, res) => {
  const { title, text, docType = 'user_upload' } = req.body;
  const apiKey = getApiKey(req);

  try {
    // 1. Save document to profiles/org space
    const { data: profile } = await supabase.from('profiles').select('organization_id').eq('id', req.user.id).single();
    
    const { data: doc, error: docErr } = await supabase.from('documents').insert({
      title,
      content: text,
      doc_type: docType,
      uploaded_by: req.user.id,
      organization_id: profile?.organization_id
    }).select().single();

    if (docErr) throw docErr;

    // 2. Simple chunk uploader (1000 character boundaries)
    const chunks = [];
    const chunkSize = 1000;
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }

    // Embed chunks
    for (const chunk of chunks) {
      const embedding = await getGeminiEmbedding(apiKey, chunk);
      await supabase.from('document_chunks').insert({
        document_id: doc.id,
        content: chunk,
        embedding
      });
    }

    res.json({ status: 'success', documentId: doc.id, totalChunks: chunks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/knowledge-base/search', verifyUser, async (req, res) => {
  const { query, filterDocType } = req.body;
  const apiKey = getApiKey(req);

  try {
    const { data: profile } = await supabase.from('profiles').select('organization_id').eq('id', req.user.id).single();
    const queryVector = await getGeminiEmbedding(apiKey, query);

    const { data: chunks, error } = await supabase.rpc('match_document_chunks', {
      query_embedding: queryVector,
      match_threshold: 0.3,
      match_count: 5,
      filter_doc_type: filterDocType,
      filter_org_id: profile?.organization_id
    });

    if (error) throw error;
    res.json(chunks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Phase 7: Razorpay webhook listener ────────────────────────
app.post('/api/payments/webhook', async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'secret';
  
  // Verify signature
  const bodyString = JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(bodyString)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(400).json({ error: 'Signature verification failed' });
  }

  const event = req.body.event;
  const payload = req.body.payload;

  if (event === 'subscription.charged' || event === 'subscription.activated') {
    const subId = payload.subscription.entity.id;
    const notes = payload.subscription.entity.notes || {};
    const userId = notes.userId;
    const planTier = notes.planTier || 'pro'; // student, pro, firm, enterprise

    await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        plan_tier: planTier,
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        usage_count_research: 0,
        usage_count_summaries: 0,
        usage_count_drafts: 0
      })
      .eq('razorpay_subscription_id', subId);
  }

  res.json({ received: true });
});

// ── Phase 8: Global Search ────────────────────────────────────
app.get('/api/search/global', verifyUser, async (req, res) => {
  const query = req.query.q || '';
  
  try {
    const documentsSearch = supabase
      .from('documents')
      .select('id, title, doc_type')
      .textSearch('content', query)
      .limit(5);

    const historySearch = supabase
      .from('research_history')
      .select('id, query, answer')
      .textSearch('query', query)
      .limit(5);

    const [docs, history] = await Promise.all([documentsSearch, historySearch]);

    res.json({
      documents: docs.data || [],
      research: history.data || []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Phase 9: Notifications ────────────────────────────────────
app.get('/api/notifications', verifyUser, async (req, res) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ── Phase 10: Investor Analytics Panel ────────────────────────
app.get('/api/analytics/admin', verifyUser, async (req, res) => {
  // Check if admin
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', req.user.id).single();
  if (profile?.role !== 'researcher') { // Let researcher be admin role for demo
    return res.status(403).json({ error: 'Unauthorized access to admin console' });
  }

  try {
    // Analytics counters
    const usersCount = supabase.from('profiles').select('*', { count: 'exact', head: true });
    const docsCount = supabase.from('documents').select('*', { count: 'exact', head: true });
    const subsCount = supabase.from('subscriptions').select('plan_tier, status');

    const [users, docs, subs] = await Promise.all([usersCount, docsCount, subsCount]);

    // Calculate billing aggregates
    const activeSubs = (subs.data || []).filter(s => s.status === 'active');
    const plansCount = activeSubs.reduce((acc, curr) => {
      acc[curr.plan_tier] = (acc[curr.plan_tier] || 0) + 1;
      return acc;
    }, {});

    res.json({
      dau: Math.floor(Math.random() * 50) + 10, // Mocked telemetry analytics
      wau: Math.floor(Math.random() * 200) + 50,
      mau: users.count || 0,
      total_documents: docs.count || 0,
      active_subscriptions: activeSubs.length,
      plans_breakdown: plansCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 NyayaGPT Production SaaS Backend running on http://localhost:${PORT}`);
});
