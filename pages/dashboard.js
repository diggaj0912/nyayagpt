// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Dashboard Page
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { timeAgo } from '../utils/pdf.js';

const QUICK_ACTIONS = [
  { icon: '🔍', title: 'AI Research', desc: 'Search Indian legal knowledge', route: '/research', color: 'card-icon-purple' },
  { icon: '📄', title: 'Summarize', desc: 'Upload & summarize judgments', route: '/summarizer', color: 'card-icon-green' },
  { icon: '✍️', title: 'Draft', desc: 'Generate legal documents', route: '/drafts', color: 'card-icon-gold' },
  { icon: '🔬', title: 'Analyze', desc: 'Analyze cases & contracts', route: '/analyzer', color: 'card-icon-red' },
];

export function renderDashboard() {
  const user = storage.getUser();
  const usage = storage.getUsage();
  const activity = storage.getActivity();
  const docs = storage.getDocuments();
  const greeting = getGreeting();

  const quickActionsHTML = QUICK_ACTIONS.map(a => `
    <div class="quick-action-card card-interactive" onclick="window.location.hash='${a.route}'">
      <div class="quick-action-icon ${a.color}">${a.icon}</div>
      <h4>${a.title}</h4>
      <p>${a.desc}</p>
    </div>
  `).join('');

  const activityHTML = activity.length > 0
    ? activity.slice(0, 8).map(item => `
      <div class="activity-item">
        <div class="activity-icon" style="background: var(--bg-surface-2);">${item.icon || '📋'}</div>
        <div class="activity-info">
          <h5>${item.title}</h5>
          <p>${timeAgo(item.timestamp)}</p>
        </div>
      </div>
    `).join('')
    : `<div class="empty-state" style="padding: 30px;">
        <div class="empty-state-icon">📋</div>
        <h4>No activity yet</h4>
        <p>Start using NyayaGPT to see your activity here.</p>
      </div>`;

  const LIMITS = { free: { research: 5, summaries: 3, drafts: 3, analyses: 2 } };
  const limits = LIMITS[user?.plan] || LIMITS.free;

  return `
    <div class="page-content animate-fade-up">
      <div class="dashboard-welcome">
        <h2>${greeting}, ${user?.name?.split(' ')[0] || 'there'} 👋</h2>
        <p>Your AI-powered legal intelligence dashboard</p>
      </div>

      <div class="quick-actions-grid">
        ${quickActionsHTML}
      </div>

      <div class="dashboard-grid">
        <div class="activity-feed card" style="padding: 24px;">
          <h4 style="margin-bottom: 16px;">Recent Activity</h4>
          ${activityHTML}
        </div>

        <div>
          <div class="usage-card">
            <h4>Usage This Month</h4>
            ${renderUsageMeter('Research', usage.research || 0, limits.research)}
            ${renderUsageMeter('Summaries', usage.summaries || 0, limits.summaries)}
            ${renderUsageMeter('Drafts', usage.drafts || 0, limits.drafts)}
            ${renderUsageMeter('Analyses', usage.analyses || 0, limits.analyses)}
            ${user?.plan === 'free' ? `
              <div style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, rgba(108,92,231,0.1), rgba(0,184,148,0.05)); border-radius: var(--radius-sm); border: 1px solid rgba(108,92,231,0.2);">
                <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 8px;">Want unlimited access?</p>
                <a href="#/settings" class="btn btn-primary btn-sm" style="width: 100%;">Upgrade to Pro — ₹999/mo</a>
              </div>
            ` : ''}
          </div>

          <div class="card" style="margin-top: 16px; padding: 24px;">
            <h4 style="margin-bottom: 16px;">Documents</h4>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--primary-light);">${docs.length}</div>
                <div style="font-size: 0.8125rem; color: var(--text-secondary);">Saved documents</div>
              </div>
              <a href="#/library" class="btn btn-secondary btn-sm">View All →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderUsageMeter(label, used, limit) {
  const pct = Math.min((used / limit) * 100, 100);
  const isOver = used >= limit;
  return `
    <div class="usage-item">
      <div class="usage-item-header">
        <span class="usage-item-label">${label}</span>
        <span class="usage-item-value" style="${isOver ? 'color: var(--danger);' : ''}">${used}/${limit}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${pct}%; ${isOver ? 'background: var(--danger);' : ''}"></div>
      </div>
    </div>
  `;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function initDashboard() {
  // Dashboard is mostly static, interactivity is via onclick handlers
}
