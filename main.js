// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Main Application Entry Point
// AI-Powered Legal Intelligence for Indian Law
// ═══════════════════════════════════════════════════════════════

import { router } from './utils/router.js';
import { storage } from './utils/storage.js';

// Pages
import { renderLanding, initLanding } from './pages/landing.js';
import { renderLogin, renderSignup, initLogin, initSignup } from './pages/auth.js';
import { renderDashboard, initDashboard } from './pages/dashboard.js';
import { renderResearch, initResearch } from './pages/research.js';
import { renderSummarizer, initSummarizer } from './pages/summarizer.js';
import { renderDrafts, initDrafts } from './pages/drafts.js';
import { renderAnalyzer, initAnalyzer } from './pages/analyzer.js';
import { renderLibrary, initLibrary } from './pages/library.js';
import { renderSettings, initSettings } from './pages/settings.js';

// Components
import { renderSidebar, initSidebar, updateSidebarActive } from './components/sidebar.js';
import { renderTopbar, initTopbar } from './components/topbar.js';

// ── Utility: Render page with app shell ─────────────────────

function renderAppPage(path, contentHTML) {
  const app = document.getElementById('app');
  const collapsed = storage.get('sidebar_collapsed', false);

  app.innerHTML = `
    ${renderSidebar()}
    <div class="main-content ${collapsed ? 'sidebar-collapsed' : ''}">
      ${renderTopbar(path)}
      ${contentHTML}
    </div>
  `;

  initSidebar();
  initTopbar();
  updateSidebarActive(path);
}

function renderPublicPage(contentHTML) {
  const app = document.getElementById('app');
  app.innerHTML = contentHTML;
}

// ── Auth guard ──────────────────────────────────────────────

function requireAuth(path) {
  if (!storage.isLoggedIn()) {
    router.navigate('/login');
    return false;
  }
  return true;
}

// ── Route Handlers ──────────────────────────────────────────

// Landing
router.register('/', () => {
  if (storage.isLoggedIn()) {
    router.navigate('/dashboard');
    return;
  }
  renderPublicPage(renderLanding());
  initLanding();
});

// Auth
router.register('/login', () => {
  if (storage.isLoggedIn()) {
    router.navigate('/dashboard');
    return;
  }
  renderPublicPage(renderLogin());
  initLogin();
});

router.register('/signup', () => {
  if (storage.isLoggedIn()) {
    router.navigate('/dashboard');
    return;
  }
  renderPublicPage(renderSignup());
  initSignup();
});

// Dashboard
router.register('/dashboard', (path) => {
  if (!requireAuth(path)) return;
  renderAppPage(path, renderDashboard());
  initDashboard();
});

// AI Research
router.register('/research', (path) => {
  if (!requireAuth(path)) return;
  renderAppPage(path, renderResearch());
  initResearch();
});

// Judgment Summarizer
router.register('/summarizer', (path) => {
  if (!requireAuth(path)) return;
  renderAppPage(path, renderSummarizer());
  initSummarizer();
});

// Draft Generator
router.register('/drafts', (path) => {
  if (!requireAuth(path)) return;
  renderAppPage(path, renderDrafts());
  initDrafts();
});

// Case Analyzer
router.register('/analyzer', (path) => {
  if (!requireAuth(path)) return;
  renderAppPage(path, renderAnalyzer());
  initAnalyzer();
});

// Document Library
router.register('/library', (path) => {
  if (!requireAuth(path)) return;
  renderAppPage(path, renderLibrary());
  initLibrary();
});

// Settings
router.register('/settings', (path) => {
  if (!requireAuth(path)) return;
  renderAppPage(path, renderSettings());
  initSettings();
});

// Logout
router.register('/logout', () => {
  storage.logout();
  router.navigate('/');
});

// 404
router.register('/404', () => {
  renderPublicPage(`
    <div class="auth-page">
      <div class="auth-card animate-scale-in" style="text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 16px;">🔍</div>
        <h2>Page Not Found</h2>
        <p class="auth-subtitle">The page you're looking for doesn't exist.</p>
        <a href="#/" class="btn btn-primary" style="margin-top: 20px;">Go Home</a>
      </div>
    </div>
  `);
});

// ── Keyboard Shortcuts ──────────────────────────────────────

document.addEventListener('keydown', (e) => {
  // ⌘K or Ctrl+K — Focus search / navigate
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    if (storage.isLoggedIn()) {
      const searchBar = document.getElementById('topbar-search');
      if (searchBar) searchBar.click();
    }
  }
});

// ── Global navigation helper ────────────────────────────────

window.navigateTo = (path) => {
  router.navigate(path);
};

// ── Start the App ───────────────────────────────────────────

console.log(
  '%c⚖️ NyayaGPT',
  'font-size: 24px; font-weight: bold; color: #6C5CE7;'
);
console.log(
  '%cAI-Powered Legal Intelligence for Indian Law',
  'font-size: 12px; color: #8888A8;'
);

router.start();
