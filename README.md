# ⚖️ NyayaGPT — AI-Powered Legal Intelligence for Indian Law

NyayaGPT is an AI-powered legal workspace designed specifically for Indian lawyers, law firms, legal researchers, and law students. It acts as a junior legal associate, helping practitioners research, summarize judgments, generate legal drafts, and trace citations in a modern, single-page application (SPA).

---

## 🚀 Core Features

NyayaGPT focuses on **4 core products** integrated into a single unified workspace canvas:

1. **🔍 AI Legal Research Chat**
   - Natural language legal assistant.
   - Searches Indian legal provisions and cases.
   - Outputs direct answers, relevant Acts/Sections, and court rulings with inline citations.

2. **📄 Judgment Summarizer**
   - Extracts structured insights from court PDF/DOCX judgments.
   - Renders split-tab details for: Facts, Issues, Petitioner/Respondent Arguments, Court Reasoning (*Ratio Decidendi*), and Final Verdict.

3. **✍️ Legal Draft Generator**
   - Dynamic form questionnaire interface.
   - Generates professional, compliant drafts (NDAs, Legal Notices, Service Agreements, Rent Agreements, Employment Contracts, and Partnership Deeds).
   - Provides an inline clause editor with PDF/HTML export features.

4. **⚖️ Precedent & Citation Finder**
   - Ranks leading authorities based on legal issues, statutes, or cases.
   - Builds an interactive **Hierarchical Citation Flow Graph** showing connection links between cases.

5. **💼 Interactive Workspace Canvas**
   - A multi-column workflow board.
   - Pin saved assets from your library (research, summaries, drafts, citations) into the left inspector.
   - Compile notes and write petitions/opinions in the live Master Draft Editor on the right.

---

## 🎨 UI/UX Design System (Google Stitch)

The visual design is built around the **Nyaya AI Design System** imported from Google Stitch:
- **Colors**: A high-contrast light theme using a soft-gray canvas background (`#F7F9FB`), deep navy blue text/headers (`#0F172A`), clean white cards (`#FFFFFF`), and electric blue accents (`#2563EB`).
- **Typography**: Uses **Hanken Grotesk** for display headlines and **Inter** for readable body text.
- **Roundness**: Corner shapes adhere to a standard 8px (`0.5rem`) rounding scale.
- **Atmosphere**: Apple-grade minimalism combined with subtle glassmorphic elements and clean tonal nesting.

---

## 🛠️ Technical Stack (MVP)

- **Frontend**: Vanilla Javascript (ES Modules) powered by a fast, framework-less build system using **Vite**.
- **Routing**: Client-side hash-based SPA router ([router.js](file:///Users/diggajsharma/Desktop/nyayagpt/utils/router.js)).
- **Database & State**: Local storage wrapper ([storage.js](file:///Users/diggajsharma/Desktop/nyayagpt/utils/storage.js)) mimicking full relational schema logic.
- **AI Engine**: Client-side integration with the **Google Gemini API** (`gemini-2.0-flash`) via structured JSON instructions, including high-fidelity mockup fallbacks for demo usage.
- **Export Utilities**: Custom print and HTML-to-file generators ([pdf.js](file:///Users/diggajsharma/Desktop/nyayagpt/utils/pdf.js)).

---

## ⚙️ Local Development

### 1. Installation
Ensure Node.js (v18+) is installed. Clone the repository and install dependencies:
```bash
npm install
```

### 2. Run Dev Server
Launch the local Vite server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 3. Production Build
Compile and bundle the assets for deployment:
```bash
npm run build
```
Vite generates optimized production bundles inside the `dist/` directory.

### 4. Configure Gemini API Key
To connect live AI features, navigate to **Settings** in the application sidebar and input your Google Gemini API Key. If left empty, the application runs in **Demo Mode** with pre-configured mock data.
