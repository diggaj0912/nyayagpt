// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Document Library Page
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { toast } from '../components/toast.js';
import { confirmModal } from '../components/modal.js';
import { downloadAsHTML, timeAgo } from '../utils/pdf.js';

const TYPE_CONFIG = {
  research: { icon: '🔍', label: 'Research', badgeClass: 'badge-primary' },
  summary: { icon: '📄', label: 'Summary', badgeClass: 'badge-success' },
  draft: { icon: '✍️', label: 'Draft', badgeClass: 'badge-warning' },
  analysis: { icon: '🔬', label: 'Analysis', badgeClass: 'badge-danger' },
};

let currentFilter = 'all';
let searchQuery = '';

export function renderLibrary() {
  return `
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>📁 My Documents</h2>
        <p>All your saved research, summaries, drafts, and analyses in one place.</p>
      </div>

      <div class="library-toolbar">
        <div class="library-filters">
          <button class="chip active" data-filter="all">All</button>
          <button class="chip" data-filter="research">🔍 Research</button>
          <button class="chip" data-filter="summary">📄 Summaries</button>
          <button class="chip" data-filter="draft">✍️ Drafts</button>
          <button class="chip" data-filter="analysis">🔬 Analyses</button>
        </div>
        <div class="library-search">
          <span>🔍</span>
          <input type="text" placeholder="Search documents..." id="library-search-input" />
        </div>
      </div>

      <div id="library-content"></div>
    </div>
  `;
}

export function initLibrary() {
  renderDocuments();

  // Filters
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDocuments();
    });
  });

  // Search
  document.getElementById('library-search-input')?.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderDocuments();
  });
}

function renderDocuments() {
  const container = document.getElementById('library-content');
  if (!container) return;

  let docs = storage.getDocuments();

  // Filter
  if (currentFilter !== 'all') {
    docs = docs.filter(d => d.type === currentFilter);
  }

  // Search
  if (searchQuery) {
    docs = docs.filter(d =>
      d.title?.toLowerCase().includes(searchQuery) ||
      d.type?.toLowerCase().includes(searchQuery)
    );
  }

  if (docs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📁</div>
        <h4>No documents found</h4>
        <p>${currentFilter !== 'all' ? 'No documents in this category.' : searchQuery ? 'Try a different search term.' : 'Start using NyayaGPT to build your document library.'}</p>
        <div style="display: flex; gap: 12px; justify-content: center; margin-top: 16px;">
          <a href="#/research" class="btn btn-primary btn-sm">🔍 Start Research</a>
          <a href="#/drafts" class="btn btn-secondary btn-sm">✍️ Create Draft</a>
        </div>
      </div>
    `;
    return;
  }

  const tableRows = docs.map(doc => {
    const config = TYPE_CONFIG[doc.type] || { icon: '📄', label: doc.type, badgeClass: 'badge-info' };
    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2rem;">${config.icon}</span>
            <div>
              <div style="font-weight: 500;">${escapeHtml(doc.title || 'Untitled')}</div>
              <div class="text-xs text-muted">${doc.id?.slice(0, 8)}</div>
            </div>
          </div>
        </td>
        <td><span class="badge ${config.badgeClass}">${config.label}</span></td>
        <td class="text-muted text-sm">${timeAgo(doc.createdAt)}</td>
        <td>
          <div style="display: flex; gap: 4px;">
            <button class="btn btn-ghost btn-sm btn-icon" title="Export" data-export="${doc.id}">📥</button>
            <button class="btn btn-ghost btn-sm btn-icon" title="Delete" data-delete="${doc.id}" style="color: var(--danger);">🗑</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Document</th>
            <th>Type</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
    <p class="text-xs text-muted" style="margin-top: 12px;">${docs.length} document${docs.length !== 1 ? 's' : ''}</p>
  `;

  // Attach handlers
  container.querySelectorAll('[data-export]').forEach(btn => {
    btn.addEventListener('click', () => {
      const doc = docs.find(d => d.id === btn.dataset.export);
      if (doc) exportDocument(doc);
    });
  });

  container.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const confirmed = await confirmModal('Are you sure you want to delete this document? This cannot be undone.');
      if (confirmed) {
        deleteDocument(btn.dataset.delete);
        renderDocuments();
        toast.success('Document deleted');
      }
    });
  });
}

function exportDocument(doc) {
  const config = TYPE_CONFIG[doc.type] || { label: 'Document' };
  let html = `<h1>${escapeHtml(doc.title || 'Document')}</h1>`;
  html += `<div class="meta">Type: ${config.label} | Created: ${new Date(doc.createdAt).toLocaleDateString('en-IN')}</div>`;

  const content = doc.content;
  if (typeof content === 'string') {
    html += `<p>${escapeHtml(content)}</p>`;
  } else if (content) {
    // Render structured content
    Object.entries(content).forEach(([key, value]) => {
      if (key === 'raw') return;
      html += `<div class="section"><div class="section-title">${key.replace(/_/g, ' ')}</div>`;
      if (Array.isArray(value)) {
        html += `<ul>${value.map(v => `<li>${escapeHtml(typeof v === 'object' ? JSON.stringify(v) : v)}</li>`).join('')}</ul>`;
      } else if (typeof value === 'object') {
        html += `<pre>${escapeHtml(JSON.stringify(value, null, 2))}</pre>`;
      } else {
        html += `<p>${escapeHtml(String(value))}</p>`;
      }
      html += '</div>';
    });
  }

  downloadAsHTML(html, doc.title || 'Document', `${doc.type}_${Date.now()}.html`);
  toast.success('Document exported');
}

function deleteDocument(docId) {
  const docs = storage.getDocuments().filter(d => d.id !== docId);
  storage.set('documents', docs);
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
