// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Toast Notification System
// ═══════════════════════════════════════════════════════════════

const ICONS = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
};

const TITLES = {
  success: 'Success',
  error: 'Error',
  info: 'Info',
  warning: 'Warning',
};

let toastCounter = 0;

export function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const id = `toast-${++toastCounter}`;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.id = id;
  toast.innerHTML = `
    <span class="toast-icon">${ICONS[type] || ICONS.info}</span>
    <div class="toast-content">
      <div class="toast-title">${TITLES[type] || TITLES.info}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="document.getElementById('${id}').classList.add('toast-exit'); setTimeout(() => document.getElementById('${id}')?.remove(), 300)">✕</button>
  `;

  container.appendChild(toast);

  if (duration > 0) {
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  }

  return id;
}

export const toast = {
  success: (msg, dur) => showToast(msg, 'success', dur),
  error: (msg, dur) => showToast(msg, 'error', dur),
  info: (msg, dur) => showToast(msg, 'info', dur),
  warning: (msg, dur) => showToast(msg, 'warning', dur),
};
