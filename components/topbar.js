// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Top Bar
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';

const PAGE_TITLES = {
  '/dashboard': { breadcrumb: 'Home', title: 'Dashboard' },
  '/research': { breadcrumb: 'Tools', title: 'AI Research' },
  '/summarizer': { breadcrumb: 'Tools', title: 'Summarizer' },
  '/drafts': { breadcrumb: 'Tools', title: 'Draft Generator' },
  '/analyzer': { breadcrumb: 'Tools', title: 'Case Analyzer' },
  '/library': { breadcrumb: 'Library', title: 'My Documents' },
  '/settings': { breadcrumb: 'Account', title: 'Settings' },
};

export function renderTopbar(currentPath) {
  const user = storage.getUser();
  const pageInfo = PAGE_TITLES[currentPath] || { breadcrumb: 'Home', title: 'Dashboard' };
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

  return `
    <header class="topbar">
      <div class="topbar-left">
        <button class="topbar-icon-btn" id="mobile-menu-btn" style="display:none">☰</button>
        <div class="topbar-breadcrumb">
          <span>${pageInfo.breadcrumb}</span>
          <span>/</span>
          <span class="current">${pageInfo.title}</span>
        </div>
      </div>

      <div class="topbar-right">
        <div class="topbar-search" id="topbar-search" title="Search (⌘K)">
          <span>🔍</span>
          <span>Search across NyayaGPT...</span>
          <kbd>⌘K</kbd>
        </div>
        <button class="topbar-icon-btn" title="Notifications">
          🔔
          <span class="notification-dot"></span>
        </button>
        <div class="topbar-avatar" id="topbar-avatar" title="${user?.name || 'Profile'}">
          ${initials}
        </div>
      </div>
    </header>
  `;
}

export function initTopbar() {
  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    // Show on small screens
    if (window.innerWidth <= 1024) {
      mobileBtn.style.display = 'flex';
    }
    mobileBtn.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.toggle('mobile-open');
    });
  }

  // Avatar dropdown (simple toggle)
  const avatar = document.getElementById('topbar-avatar');
  if (avatar) {
    avatar.addEventListener('click', () => {
      window.location.hash = '/settings';
    });
  }

  // Handle responsive
  window.addEventListener('resize', () => {
    const btn = document.getElementById('mobile-menu-btn');
    if (btn) {
      btn.style.display = window.innerWidth <= 1024 ? 'flex' : 'none';
    }
  });
}
