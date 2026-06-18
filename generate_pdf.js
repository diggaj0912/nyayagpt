import PDFDocument from 'pdfkit';
import fs from 'fs';

const doc = new PDFDocument({ margin: 50, size: 'A4' });
const outputPath = 'nyayagpt_product_audit.pdf';
doc.pipe(fs.createWriteStream(outputPath));

// Styling configuration
const colors = {
  primary: '#0F172A', // Deep Navy
  secondary: '#2563EB', // Electric Blue
  text: '#334155', // Slate Gray
  lightText: '#64748B',
  accent: '#E2E8F0', // Light Gray Border
  danger: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  bgLight: '#F8FAFC'
};

// Fonts
const fonts = {
  bold: 'Helvetica-Bold',
  regular: 'Helvetica',
  oblique: 'Helvetica-Oblique'
};

// ── Header Banner ──
doc.rect(0, 0, 612, 120).fill(colors.primary);
doc.fillColor('#FFFFFF')
   .font(fonts.bold)
   .fontSize(22)
   .text('NyayaGPT MVP Product Audit', 50, 35);
doc.fontSize(12)
   .font(fonts.regular)
   .fillColor('#94A3B8')
   .text('Expert PM, UX, Tech, and VC Investor Review', 50, 65);
doc.fontSize(10)
   .text(`Generated: June 19, 2026`, 50, 85);

// Move down
doc.y = 150;
doc.x = 50;

// Overall Score
doc.rect(50, 140, 512, 50).fill(colors.bgLight);
doc.strokeColor(colors.accent).lineWidth(1).rect(50, 140, 512, 50).stroke();

doc.fillColor(colors.primary)
   .font(fonts.bold)
   .fontSize(14)
   .text('OVERALL MVP SCORE:', 70, 158);

doc.fillColor(colors.secondary)
   .fontSize(18)
   .text('7.2 / 10', 230, 156);

// Reset y cursor
doc.y = 210;

// Strengths Section
writeSectionHeader('STRENGTHS');
const strengths = [
  'Stunning Bloomberg/Perplexity UI Layout: The 3-panel workspace grid (Sidebar Navigation + Interactive Center Canvas + Right-hand Citation Inspector) feels highly professional, space-efficient, and tailored to the lawyer\'s workflow.',
  'Resilient Hybrid RAG Architecture: The fallback pipeline dynamically routes queries to local RAG databases when offline or without an API key, parsing input terms into custom structures rather than returning generic demo placeholders.',
  'Domain-Specific Visualization: The SVG-based hierarchical citation network graphs and chronology timelines make the research outcomes feel analytical and structured, rather than a generic text box chat stream.',
  'Strong Market Timing: Built specifically for the Indian legal framework during the active transition from legacy IPC/CrPC to the new BNS (Bharatiya Nyaya Sanhita) codes.'
];
strengths.forEach(s => writeBulletPoint(s));

doc.moveDown(1.5);

// Critical Problems Section
writeSectionHeader('CRITICAL PROBLEMS');

writeProblem(
  '1. Mock Authentication & Google OAuth Placeholders',
  'Users cannot sign in securely via standard OAuth/Google logins. Mock stubs prevent real enterprise onboarding and compromise trustworthiness for sensitive legal records.',
  'High',
  'Replace the mock authentication in auth.js and storage.js with a real auth provider (e.g. Supabase or Firebase Auth) to enable secure email/password and Google login.'
);

writeProblem(
  '2. Billing & Subscription Gates are Static',
  'The dashboard shows a billing limits card (e.g. 6/5 queries processed) and settings lists different pricing packages, but clicking "Switch Plan" only changes a local string. There is no payment gateway to capture customer intent or revenue.',
  'High',
  'Integrate Razorpay checkout flows directly. Connect the "Switch Plan" buttons in settings.js to trigger a payment modal and update the user\'s plan tier in the database upon successful transaction webhook verification.'
);

writeProblem(
  '3. Global Command (⌘K) & Notification Bell are Static Stubs',
  'Key UI components (like the top search bar, Control+K shortcut trigger, and notification panel) are empty placeholders that click but do nothing. This breaks the high-end Apple/Linear user experience.',
  'Medium',
  'Bind the ⌘K event to open a modal that searches the user\'s local documents list and research history. Wire the notification bell to render the historical list stored in storage.getActivity().'
);

writeProblem(
  '4. Client-side PDF Text Extraction is Basic',
  'Uploading a PDF judgment drops a stub text in the text area instructing the user to paste it manually for best results. This creates high friction during onboarding.',
  'Medium',
  'Implement a backend route in server.js using a library like pdf-parse to extract text from uploads, returning the text directly to the frontend.'
);

doc.addPage();

// Header for Page 2
doc.rect(0, 0, 612, 50).fill(colors.primary);
doc.fillColor('#FFFFFF')
   .font(fonts.bold)
   .fontSize(12)
   .text('NyayaGPT MVP Product Audit', 50, 18);
doc.y = 80;

// Quick Wins
writeSectionHeader('QUICK WINS (CAN BE IMPLEMENTED IN 1 DAY)');
const quickWins = [
  'Fully Activate Notification Feed: Bind the notification bell click event in the topbar to toggle a dropdown displaying historical logs from storage.getActivity().',
  'Implement Global Search (⌘K): Create a search overlay modal that filters saved research reports and generated drafts in the document library.',
  'Verify API Keys at Point of Entry: Add a verification check in settings.js that makes a lightweight models query request (GET models) to the Gemini API when the user inputs their key, immediately alerting them if it\'s invalid.',
  'Draft Export Actions: Enable downloading the generated contracts directly as formatted Word Documents (.docx) or PDFs rather than just downloading them as HTML wrappers.'
];
quickWins.forEach(qw => writeBulletPoint(qw));

doc.moveDown(1.5);

// VC Perspective
writeSectionHeader('VENTURE CAPITAL / INVESTOR PERSPECTIVE');

doc.font(fonts.bold).fillColor(colors.primary).fontSize(11).text('What an investor would like:');
doc.font(fonts.regular).fillColor(colors.text).fontSize(10)
   .text('• Grounded Legal RAG: Unlike generic wrappers, NyayaGPT pre-retrieves actual statutory sections and precedents and feeds them to the LLM. This mitigates hallucination risk—a key concern in legal AI.\n' +
         '• High Customer Stickiness: The Workspace Canvas acts as a lightweight legal document management system. Once lawyers save their memos, citation networks, and drafts here, the platform becomes sticky.\n' +
         '• Niche Positioning: Targeting Indian advocates who are struggling to map new BNS provisions back to legacy IPC/CrPC sections represents an immediate, high-intent product-market fit.', { lineGap: 3 });

doc.moveDown(1);
doc.font(fonts.bold).fillColor(colors.primary).fontSize(11).text('What an investor would criticize:');
doc.font(fonts.regular).fillColor(colors.text).fontSize(10)
   .text('• Lack of Proprietary Data Moat: The RAG database is currently a curated static array. To scale to series A, the company needs a proprietary pipeline indexing daily judgments from all High Courts and the Supreme Court.\n' +
         '• API Cost Economics: If the platform hosts the API keys, the margin profile could degrade under long legal briefs. If it relies on users bringing their own keys, the onboarding conversion funnel will remain narrow.', { lineGap: 3 });

doc.moveDown(1.5);

// Competitor Comparison
writeSectionHeader('COMPETITOR COMPARISON');
doc.font(fonts.regular).fillColor(colors.text).fontSize(10)
   .text('• Harvey AI: Harvey builds custom foundation models and custom search index databases for large enterprise law firms. NyayaGPT is geared as a lighter SaaS product for independent Indian advocates, but currently lacks Harvey\'s deep custom-finetuning and enterprise integrations.\n' +
         '• Perplexity: Perplexity is generic search-focused. NyayaGPT beats it in domain specificity (formatting results as standard Indian legal research memos, generating arguments FOR/AGAINST, listing compliance risks, and structuring citation nodes).\n' +
         '• ChatGPT: ChatGPT is conversational and generic. NyayaGPT beats it with structured RAG output (timeline, citation connections graph, library canvas, form-guided drafting inputs) instead of requiring advanced manual prompting.', { lineGap: 4 });

doc.moveDown(1.5);

// Final Verdict
writeSectionHeader('FINAL VERDICT');
doc.font(fonts.bold).fillColor(colors.primary).fontSize(10).text('Would users pay for this product today?');
doc.font(fonts.regular).fillColor(colors.text).fontSize(10)
   .text('No, but they are one step away. Independent advocates would pay ₹999/month today if the mock gateways were replaced with a live subscription check, and the document drafts could be exported directly to Word files rather than HTML.', { lineGap: 3 });

doc.moveDown(0.8);
doc.font(fonts.bold).fillColor(colors.primary).fontSize(10).text('Would investors take a second meeting?');
doc.font(fonts.regular).fillColor(colors.text).fontSize(10)
   .text('Yes. The product execution is clean, and the timing on the Indian BNS transition is perfect. In the next meeting, VCs will want to see how the team plans to build a proprietary automated web scraper for the High Courts and secure enterprise integrations.', { lineGap: 3 });

doc.moveDown(0.8);
doc.font(fonts.bold).fillColor(colors.primary).fontSize(10).text('What should be built next?');
doc.font(fonts.regular).fillColor(colors.text).fontSize(10)
   .text('1. Live High Court Scraper: Establish a backend cron job that scrapes and updates Supreme and High Court judgments into a Vector Database.\n' +
         '2. Interactive Draft Redlining: Enable inline edits within the Workspace editor where advocates can highlight text and ask the AI to "rewrite", "make more aggressive", or "check for contradictions".', { lineGap: 3 });

// ── Helpers ──

function writeSectionHeader(title) {
  doc.fillColor(colors.primary)
     .font(fonts.bold)
     .fontSize(12)
     .text(title, { lineGap: 4 });
  
  // Underline
  const y = doc.y;
  doc.strokeColor(colors.secondary)
     .lineWidth(1.5)
     .moveTo(doc.x, y)
     .lineTo(doc.x + 100, y)
     .stroke();
  
  doc.moveDown(1);
}

function writeBulletPoint(text) {
  doc.fillColor(colors.text)
     .font(fonts.regular)
     .fontSize(10)
     .text(`• ${text}`, {
       indent: 10,
       lineGap: 4,
       paragraphGap: 4
     });
}

function writeProblem(title, why, severity, fix) {
  doc.font(fonts.bold).fillColor(colors.primary).fontSize(11).text(title);
  
  doc.font(fonts.regular).fillColor(colors.text).fontSize(9)
     .text(`Why it matters: ${why}`, { indent: 10 });
  
  const sevColor = severity === 'High' ? colors.danger : colors.warning;
  doc.font(fonts.bold).fillColor(sevColor).fontSize(9)
     .text(`Severity: ${severity}`, { indent: 10 });
  
  doc.font(fonts.regular).fillColor(colors.text).fontSize(9)
     .text(`Recommended Fix: ${fix}`, { indent: 10, lineGap: 2 });
  
  doc.moveDown(0.8);
}

// End the PDF creation
doc.end();
console.log('PDF Report successfully generated as: nyayagpt_product_audit.pdf');
