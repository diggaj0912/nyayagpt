// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Settings Page
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { toast } from '../components/toast.js';
import { confirmModal } from '../components/modal.js';
import { hasApiKey } from '../services/ai.js';

const SETTINGS_TABS = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'api', label: 'API Keys', icon: '🔑' },
  { id: 'plan', label: 'Subscription', icon: '💎' },
  { id: 'data', label: 'Data & Privacy', icon: '🔒' },
];

let activeTab = 'profile';

export function renderSettings() {
  const nav = SETTINGS_TABS.map(tab => `
    <button class="settings-nav-item ${tab.id === activeTab ? 'active' : ''}" data-settings-tab="${tab.id}">
      <span>${tab.icon}</span> ${tab.label}
    </button>
  `).join('');

  return `
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>⚙️ Settings</h2>
        <p>Manage your profile, API keys, and subscription.</p>
      </div>

      <div class="settings-layout">
        <nav class="settings-nav">${nav}</nav>
        <div class="settings-content" id="settings-content">
          ${renderSettingsTab(activeTab)}
        </div>
      </div>
    </div>
  `;
}

export function initSettings() {
  // Tab navigation
  document.querySelectorAll('[data-settings-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.settingsTab;
      document.querySelectorAll('[data-settings-tab]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const content = document.getElementById('settings-content');
      if (content) {
        content.innerHTML = renderSettingsTab(activeTab);
        initSettingsTab(activeTab);
      }
    });
  });

  // Init current tab
  initSettingsTab(activeTab);
}

function renderSettingsTab(tab) {
  switch (tab) {
    case 'profile': return renderProfileTab();
    case 'api': return renderApiTab();
    case 'plan': return renderPlanTab();
    case 'data': return renderDataTab();
    default: return '';
  }
}

function renderProfileTab() {
  const user = storage.getUser() || {};
  return `
    <div class="settings-section">
      <h4>Personal Information</h4>
      <p>Update your profile details.</p>
      <form id="profile-form" class="settings-form-grid">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" id="settings-name" value="${escapeAttr(user.name || '')}" />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="settings-email" value="${escapeAttr(user.email || '')}" />
        </div>
        <div class="form-group">
          <label class="form-label">Role</label>
          <select class="form-select" id="settings-role">
            <option value="lawyer" ${user.role === 'lawyer' ? 'selected' : ''}>Independent Lawyer</option>
            <option value="law_firm" ${user.role === 'law_firm' ? 'selected' : ''}>Law Firm Associate</option>
            <option value="student" ${user.role === 'student' ? 'selected' : ''}>Law Student</option>
            <option value="researcher" ${user.role === 'researcher' ? 'selected' : ''}>Legal Researcher</option>
            <option value="founder" ${user.role === 'founder' ? 'selected' : ''}>Startup Founder</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Bar Council No. (Optional)</label>
          <input type="text" class="form-input" id="settings-barcouncil" value="${escapeAttr(user.barCouncil || '')}" placeholder="e.g., D/1234/2020" />
        </div>
      </form>
      <div style="margin-top: 20px;">
        <button class="btn btn-primary" id="save-profile-btn">Save Changes</button>
      </div>
    </div>
  `;
}

function renderApiTab() {
  const apiKey = storage.get('gemini_api_key', '');
  const maskedKey = apiKey ? apiKey.slice(0, 8) + '•'.repeat(20) + apiKey.slice(-4) : '';

  return `
    <div class="settings-section">
      <h4>🔑 Gemini API Key</h4>
      <p>NyayaGPT uses Google Gemini AI for legal research, summarization, and draft generation. You can get a free API key from Google AI Studio.</p>

      <div style="margin-top: 20px;">
        <div class="form-group" style="max-width: 500px;">
          <label class="form-label">API Key</label>
          <div style="display: flex; gap: 8px;">
            <input type="password" class="form-input" id="api-key-input" value="${escapeAttr(apiKey)}" placeholder="Enter your Gemini API key..." style="flex: 1;" />
            <button class="btn btn-primary" id="save-api-key-btn">Save</button>
          </div>
          ${apiKey ? `<span class="form-hint" style="color: var(--secondary);">✓ API key configured: ${maskedKey}</span>` : '<span class="form-hint">No API key set — running in demo mode</span>'}
        </div>
      </div>

      <div style="margin-top: 24px; padding: 16px; background: var(--bg-surface-2); border-radius: var(--radius-sm); border: 1px solid var(--border);">
        <h5 style="margin-bottom: 8px;">How to get a Gemini API key:</h5>
        <ol style="padding-left: 20px; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.8;">
          <li>Visit <a href="https://aistudio.google.com/apikey" target="_blank" style="color: var(--primary-light);">Google AI Studio</a></li>
          <li>Sign in with your Google account</li>
          <li>Click "Create API Key"</li>
          <li>Copy the key and paste it above</li>
        </ol>
        <p class="text-xs text-muted" style="margin-top: 12px;">💡 The free tier includes 15 RPM and 1M tokens/minute — more than enough for the MVP.</p>
      </div>

      <div style="margin-top: 20px;">
        <h5 style="margin-bottom: 8px;">Connection Status</h5>
        <div style="display: flex; align-items: center; gap: 8px;">
          ${hasApiKey()
            ? '<div style="width: 10px; height: 10px; border-radius: 50%; background: var(--secondary); box-shadow: 0 0 8px rgba(0,184,148,0.5);"></div><span style="color: var(--secondary);">Connected</span>'
            : '<div style="width: 10px; height: 10px; border-radius: 50%; background: var(--warning);"></div><span style="color: var(--warning);">Demo Mode (no API key)</span>'
          }
        </div>
      </div>
    </div>
  `;
}

function renderPlanTab() {
  const user = storage.getUser() || {};
  const plan = user.plan || 'free';

  const plans = [
    { id: 'free', name: 'Free', price: '₹0/mo', desc: '5 queries/day, 3 summaries/month', current: plan === 'free' },
    { id: 'pro', name: 'Pro Lawyer', price: '₹999/mo', desc: 'Unlimited everything + PDF export', current: plan === 'pro' },
    { id: 'firm', name: 'Law Firm', price: '₹4,999/mo', desc: '10 team members + API access', current: plan === 'firm' },
  ];

  return `
    <div class="settings-section">
      <h4>Subscription Plan</h4>
      <p>Manage your NyayaGPT subscription.</p>

      ${plans.map(p => `
        <div class="plan-card" style="${p.current ? 'border-color: var(--primary);' : ''}">
          <div class="plan-info">
            <h5>${p.name} ${p.current ? '<span class="badge badge-primary">Current</span>' : ''}</h5>
            <p>${p.desc}</p>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 700; font-size: 1.125rem;">${p.price}</span>
            ${!p.current ? `<button class="btn btn-outline btn-sm" data-switch-plan="${p.id}">Switch</button>` : ''}
          </div>
        </div>
      `).join('')}

      <div style="margin-top: 24px; padding: 16px; background: rgba(108,92,231,0.05); border-radius: var(--radius-sm); border: 1px solid rgba(108,92,231,0.15);">
        <p class="text-sm text-muted">💡 Payments will be processed via Razorpay in the next update. For now, all features are accessible for testing.</p>
      </div>
    </div>
  `;
}

function renderDataTab() {
  const docs = storage.getDocuments();
  const research = storage.getResearchHistory();

  return `
    <div class="settings-section">
      <h4>Data & Privacy</h4>
      <p>Your data is stored locally in your browser. Nothing is sent to our servers.</p>

      <div style="margin-top: 20px;">
        <div class="plan-card">
          <div class="plan-info">
            <h5>Local Storage</h5>
            <p>${docs.length} documents · ${research.length} research queries</p>
          </div>
          <span class="badge badge-success">Browser Only</span>
        </div>
      </div>

      <div style="margin-top: 24px;">
        <h5 style="margin-bottom: 12px;">Danger Zone</h5>
        <div style="display: flex; gap: 12px;">
          <button class="btn btn-secondary btn-sm" id="export-all-data-btn">📥 Export All Data</button>
          <button class="btn btn-danger btn-sm" id="clear-all-data-btn">🗑 Clear All Data</button>
          <button class="btn btn-danger btn-sm" id="delete-account-btn">⚠ Delete Account</button>
        </div>
      </div>
    </div>
  `;
}

function initSettingsTab(tab) {
  switch (tab) {
    case 'profile':
      document.getElementById('save-profile-btn')?.addEventListener('click', () => {
        const user = storage.getUser() || {};
        user.name = document.getElementById('settings-name')?.value?.trim() || user.name;
        user.email = document.getElementById('settings-email')?.value?.trim() || user.email;
        user.role = document.getElementById('settings-role')?.value || user.role;
        user.barCouncil = document.getElementById('settings-barcouncil')?.value?.trim() || '';
        storage.setUser(user);
        toast.success('Profile updated');
      });
      break;

    case 'api':
      document.getElementById('save-api-key-btn')?.addEventListener('click', () => {
        const key = document.getElementById('api-key-input')?.value?.trim();
        if (key) {
          storage.set('gemini_api_key', key);
          toast.success('API key saved! AI features are now live.');
          // Re-render to update status
          const content = document.getElementById('settings-content');
          if (content) {
            content.innerHTML = renderApiTab();
            initSettingsTab('api');
          }
        } else {
          storage.remove('gemini_api_key');
          toast.info('API key removed. Running in demo mode.');
          const content = document.getElementById('settings-content');
          if (content) {
            content.innerHTML = renderApiTab();
            initSettingsTab('api');
          }
        }
      });
      break;

    case 'plan':
      document.querySelectorAll('[data-switch-plan]').forEach(btn => {
        btn.addEventListener('click', () => {
          const user = storage.getUser() || {};
          user.plan = btn.dataset.switchPlan;
          storage.setUser(user);
          toast.success(`Switched to ${user.plan} plan`);
          const content = document.getElementById('settings-content');
          if (content) {
            content.innerHTML = renderPlanTab();
            initSettingsTab('plan');
          }
        });
      });
      break;

    case 'data':
      document.getElementById('export-all-data-btn')?.addEventListener('click', () => {
        const data = {
          user: storage.getUser(),
          documents: storage.getDocuments(),
          research: storage.getResearchHistory(),
          activity: storage.getActivity(),
          usage: storage.getUsage(),
          exportedAt: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nyayagpt_backup_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Data exported');
      });

      document.getElementById('clear-all-data-btn')?.addEventListener('click', async () => {
        const confirmed = await confirmModal('This will delete ALL your documents, research history, and settings. This cannot be undone.');
        if (confirmed) {
          const user = storage.getUser();
          const apiKey = storage.get('gemini_api_key');
          storage.clear();
          // Preserve user and API key
          if (user) storage.setUser(user);
          if (apiKey) storage.set('gemini_api_key', apiKey);
          toast.success('All data cleared');
        }
      });

      document.getElementById('delete-account-btn')?.addEventListener('click', async () => {
        const confirmed = await confirmModal('⚠️ This will permanently delete your account and ALL associated data. Are you absolutely sure?');
        if (confirmed) {
          storage.clear();
          toast.success('Account deleted');
          window.location.hash = '/';
        }
      });
      break;
  }
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
