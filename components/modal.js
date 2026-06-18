// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Modal System
// ═══════════════════════════════════════════════════════════════

export function showModal({ title, content, footer, maxWidth = '540px' }) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  container.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal" style="max-width: ${maxWidth}">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close" id="modal-close-btn">✕</button>
        </div>
        <div class="modal-body">${content}</div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
      </div>
    </div>
  `;

  // Show with animation
  requestAnimationFrame(() => {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.add('visible');
  });

  // Close handlers
  const closeBtn = document.getElementById('modal-close-btn');
  const overlay = document.getElementById('modal-overlay');

  const close = () => {
    overlay.classList.remove('visible');
    setTimeout(() => { container.innerHTML = ''; }, 200);
  };

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', handler);
    }
  });

  return close;
}

export function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('visible');
    setTimeout(() => {
      const container = document.getElementById('modal-container');
      if (container) container.innerHTML = '';
    }, 200);
  }
}

export function confirmModal(message, title = 'Confirm') {
  return new Promise((resolve) => {
    const close = showModal({
      title,
      content: `<p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.6;">${message}</p>`,
      footer: `
        <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="modal-confirm">Confirm</button>
      `,
    });

    setTimeout(() => {
      document.getElementById('modal-cancel')?.addEventListener('click', () => { close(); resolve(false); });
      document.getElementById('modal-confirm')?.addEventListener('click', () => { close(); resolve(true); });
    }, 50);
  });
}
