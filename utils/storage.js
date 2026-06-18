// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Local Storage Wrapper
// ═══════════════════════════════════════════════════════════════

const PREFIX = 'nyayagpt_';

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage full or unavailable:', e);
    }
  },

  remove(key) {
    localStorage.removeItem(PREFIX + key);
  },

  clear() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => localStorage.removeItem(k));
  },

  // User management
  getUser() {
    return this.get('user', null);
  },

  setUser(user) {
    this.set('user', user);
  },

  isLoggedIn() {
    return !!this.getUser();
  },

  logout() {
    this.remove('user');
  },

  // Document management
  getDocuments() {
    return this.get('documents', []);
  },

  saveDocument(doc) {
    const docs = this.getDocuments();
    doc.id = doc.id || crypto.randomUUID();
    doc.createdAt = doc.createdAt || new Date().toISOString();
    docs.unshift(doc);
    this.set('documents', docs);
    return doc;
  },

  // Research history
  getResearchHistory() {
    return this.get('research_history', []);
  },

  saveResearch(research) {
    const history = this.getResearchHistory();
    research.id = research.id || crypto.randomUUID();
    research.createdAt = new Date().toISOString();
    history.unshift(research);
    this.set('research_history', history.slice(0, 50));
    return research;
  },

  // Activity feed
  getActivity() {
    return this.get('activity', []);
  },

  logActivity(type, title, icon) {
    const activity = this.getActivity();
    activity.unshift({
      id: crypto.randomUUID(),
      type,
      title,
      icon,
      timestamp: new Date().toISOString(),
    });
    this.set('activity', activity.slice(0, 20));
  },

  // Usage tracking
  getUsage() {
    return this.get('usage', {
      research: 0,
      summaries: 0,
      drafts: 0,
      analyses: 0,
    });
  },

  incrementUsage(type) {
    const usage = this.getUsage();
    usage[type] = (usage[type] || 0) + 1;
    this.set('usage', usage);
  },
};
