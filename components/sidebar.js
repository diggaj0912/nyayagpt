// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Sidebar Navigation
// ═══════════════════════════════════════════════════════════════

import { router } from '../utils/router.js';
import { storage } from '../utils/storage.js';

const NAV_ITEMS = [
  { section: 'MAIN' },
  { path: '/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/research', icon: '🔍', label: 'AI Research' },
  { path: '/summarizer', icon: '📄', label: 'Summarizer' },
  { path: '/drafts', icon: '✍️', label: 'Draft Generator' },
  { path: '/citation-finder', icon: '⚖️', label: 'Citation Finder' },
  { path: '/workspace', icon: '💼', label: 'Workspace Canvas' },
  { path: '/analyzer', icon: '🔬', label: 'Case Analyzer' },
  { section: 'LIBRARY' },
  { path: '/library', icon: '📁', label: 'My Documents' },
  { section: 'ACCOUNT' },
  { path: '/settings', icon: '⚙️', label: 'Settings' },
];

export function renderSidebar() {
  const collapsed = storage.get('sidebar_collapsed', false);
  const currentPath = router.getCurrentPath();

  const navLinks = NAV_ITEMS.map(item => {
    if (item.section) {
      return `<div class="sidebar-section-title">${item.section}</div>`;
    }
    const isActive = currentPath === item.path;
    return `
      <a href="#${item.path}" class="sidebar-link ${isActive ? 'active' : ''}" data-route="${item.path}">
        <span class="sidebar-link-icon">${item.icon}</span>
        <span class="sidebar-label">${item.label}</span>
      </a>
    `;
  }).join('');

  return `
    <aside class="sidebar ${collapsed ? 'collapsed' : ''}" id="sidebar">
      <button class="sidebar-toggle" id="sidebar-toggle" title="Toggle sidebar">
        ${collapsed ? '▶' : '◀'}
      </button>

      <div class="sidebar-logo">
        <div class="sidebar-logo-icon">⚖️</div>
        <span class="sidebar-logo-text">NyayaGPT</span>
      </div>

      <nav class="sidebar-nav">
        ${navLinks}
      </nav>

      <div class="sidebar-upgrade">
        <div class="sidebar-upgrade-card">
          <h5>🚀 Upgrade to Pro</h5>
          <p>Unlock unlimited AI queries</p>
          <button class="btn btn-primary btn-sm" onclick="window.location.hash='/settings'" style="width:100%">Upgrade Now</button>
        </div>
      </div>
    </aside>
  `;
}

export function initSidebar() {
  const toggleBtn = document.getElementById('sidebar-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const mainContent = document.querySelector('.main-content');
      const isCollapsed = sidebar.classList.toggle('collapsed');
      storage.set('sidebar_collapsed', isCollapsed);
      if (mainContent) {
        mainContent.classList.toggle('sidebar-collapsed', isCollapsed);
      }
      toggleBtn.textContent = isCollapsed ? '▶' : '◀';
    });
  }
}

export function updateSidebarActive(path) {
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const route = link.getAttribute('data-route');
    link.classList.toggle('active', route === path);
  });
}
