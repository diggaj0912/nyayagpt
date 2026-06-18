// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Hash-Based SPA Router
// ═══════════════════════════════════════════════════════════════

export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.beforeEach = null;
    window.addEventListener('hashchange', () => this.resolve());
  }

  register(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  navigate(path) {
    window.location.hash = path;
  }

  getCurrentPath() {
    return window.location.hash.slice(1) || '/';
  }

  async resolve() {
    const path = this.getCurrentPath();
    const handler = this.routes[path] || this.routes['/404'];

    if (this.beforeEach) {
      const canProceed = this.beforeEach(path, this.currentRoute);
      if (!canProceed) return;
    }

    this.currentRoute = path;

    if (handler) {
      await handler(path);
    }
  }

  start() {
    this.resolve();
  }
}

export const router = new Router();
