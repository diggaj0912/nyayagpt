// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Landing Page
// ═══════════════════════════════════════════════════════════════

export function renderLanding() {
  return `
    <div class="landing-page">
      <!-- Navigation -->
      <nav class="landing-nav" id="landing-nav">
        <a href="#/" class="landing-nav-logo">
          <div class="logo-icon">⚖️</div>
          <span>NyayaGPT</span>
        </a>
        <div class="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </div>
        <div class="landing-nav-actions">
          <a href="#/login" class="btn btn-ghost">Log In</a>
          <a href="#/signup" class="btn btn-primary">Get Started Free</a>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-badge">✨ Powered by Indian Legal AI</div>
        <h1>Legal Intelligence,<br><span class="text-gradient">Reimagined.</span></h1>
        <p class="hero-subtitle">
          Research case law, summarize judgments, generate legal drafts, and analyze cases — all in seconds. Built exclusively for Indian legal professionals.
        </p>
        <div class="hero-actions">
          <a href="#/signup" class="btn btn-primary btn-xl">Get Started Free →</a>
          <a href="#features" class="btn btn-secondary btn-lg">See How It Works</a>
        </div>
        <div class="hero-social-proof">
          <div class="avatars">
            <div class="avatar">AK</div>
            <div class="avatar">PD</div>
            <div class="avatar">RS</div>
            <div class="avatar">MG</div>
            <div class="avatar">+</div>
          </div>
          <p>Join <strong>2,000+</strong> lawyers already using NyayaGPT</p>
        </div>

        <!-- Demo Window -->
        <div class="hero-demo">
          <div class="demo-window">
            <div class="demo-titlebar">
              <span class="demo-dot"></span>
              <span class="demo-dot"></span>
              <span class="demo-dot"></span>
              <span class="demo-titlebar-text">NyayaGPT — AI Research</span>
            </div>
            <div class="demo-content">
              <div class="demo-chat">
                <div class="demo-message" style="animation-delay: 0.6s">
                  <div class="demo-message-avatar user">👤</div>
                  <div class="demo-message-content">
                    What are the grounds for divorce under Hindu law in India?
                  </div>
                </div>
                <div class="demo-message" style="animation-delay: 1.2s">
                  <div class="demo-message-avatar ai">⚖️</div>
                  <div class="demo-message-content">
                    Under <strong>Section 13 of the Hindu Marriage Act, 1955</strong>, the grounds for divorce include:<br><br>
                    • Adultery • Cruelty • Desertion (2+ years) • Conversion • Unsoundness of mind • Venereal disease • Renunciation • Presumption of death (7+ years)<br><br>
                    Key judgment: <span class="cite">Shobha Rani v. Madhukar Reddi (1988) 1 SCC 105</span> — defined mental cruelty as a ground for divorce.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section" id="features">
        <div class="features-header">
          <h6>CAPABILITIES</h6>
          <h2>Everything You Need in<br><span class="text-gradient">One Legal Copilot</span></h2>
          <p>Four powerful AI tools designed specifically for Indian legal professionals.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card animate-fade-up delay-1">
            <div class="feature-card-icon card-icon-purple">🔍</div>
            <h4>AI Legal Research</h4>
            <p>Ask questions in plain English. Get relevant Acts, Sections, and Supreme Court judgments with proper citations — instantly.</p>
          </div>
          <div class="feature-card animate-fade-up delay-2">
            <div class="feature-card-icon card-icon-green">📄</div>
            <h4>Judgment Summarizer</h4>
            <p>Upload any judgment PDF. Get structured summaries: facts, issues, arguments, court reasoning, and verdict — in seconds.</p>
          </div>
          <div class="feature-card animate-fade-up delay-3">
            <div class="feature-card-icon card-icon-gold">✍️</div>
            <h4>Legal Draft Generator</h4>
            <p>Generate NDAs, legal notices, employment agreements, and more. Fill a form, get a professional draft ready to use.</p>
          </div>
          <div class="feature-card animate-fade-up delay-4">
            <div class="feature-card-icon card-icon-red">🔬</div>
            <h4>Case Analyzer</h4>
            <p>Upload petitions, FIRs, or agreements. AI identifies risks, missing clauses, and key legal issues with actionable insights.</p>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="features-section" style="padding-top: 0;">
        <div class="features-grid" style="max-width: 900px;">
          <div class="card" style="text-align: center; padding: 32px;">
            <h2 class="text-gradient" style="font-size: 2.5rem;">50,000+</h2>
            <p class="text-muted text-sm">Legal Queries Processed</p>
          </div>
          <div class="card" style="text-align: center; padding: 32px;">
            <h2 class="text-gradient" style="font-size: 2.5rem;">10,000+</h2>
            <p class="text-muted text-sm">Documents Generated</p>
          </div>
          <div class="card" style="text-align: center; padding: 32px;">
            <h2 class="text-gradient" style="font-size: 2.5rem;">4.8 ★</h2>
            <p class="text-muted text-sm">Average User Rating</p>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="pricing-section" id="pricing">
        <div class="pricing-header">
          <h6>PRICING</h6>
          <h2>Simple, Transparent Pricing</h2>
          <p>Start free. Upgrade when you need more power.</p>
        </div>
        <div class="pricing-grid">
          <!-- Free Plan -->
          <div class="pricing-card">
            <h4>Free</h4>
            <p class="pricing-desc">Perfect for students and occasional use.</p>
            <div class="pricing-price">
              <span class="currency">₹</span>
              <span class="amount">0</span>
              <span class="period">/month</span>
            </div>
            <ul class="pricing-features">
              <li><span class="check">✓</span> 5 research queries/day</li>
              <li><span class="check">✓</span> 3 summaries/month</li>
              <li><span class="check">✓</span> 3 drafts/month</li>
              <li><span class="check">✓</span> 2 case analyses/month</li>
              <li><span class="cross">✕</span> Export to PDF</li>
              <li><span class="cross">✕</span> Priority AI</li>
            </ul>
            <a href="#/signup" class="btn btn-secondary" style="width: 100%;">Get Started</a>
          </div>

          <!-- Pro Plan -->
          <div class="pricing-card popular">
            <div class="pricing-popular-badge">Most Popular</div>
            <h4>Pro Lawyer</h4>
            <p class="pricing-desc">Unlimited AI power for independent practitioners.</p>
            <div class="pricing-price">
              <span class="currency">₹</span>
              <span class="amount">999</span>
              <span class="period">/month</span>
            </div>
            <ul class="pricing-features">
              <li><span class="check">✓</span> Unlimited research queries</li>
              <li><span class="check">✓</span> Unlimited summaries</li>
              <li><span class="check">✓</span> Unlimited drafts</li>
              <li><span class="check">✓</span> Unlimited analyses</li>
              <li><span class="check">✓</span> Export to PDF/HTML</li>
              <li><span class="check">✓</span> Priority AI processing</li>
              <li><span class="check">✓</span> Email support</li>
            </ul>
            <a href="#/signup" class="btn btn-primary" style="width: 100%;">Start Free Trial</a>
          </div>

          <!-- Firm Plan -->
          <div class="pricing-card">
            <h4>Law Firm</h4>
            <p class="pricing-desc">For teams. Scale your legal operations.</p>
            <div class="pricing-price">
              <span class="currency">₹</span>
              <span class="amount">4,999</span>
              <span class="period">/month</span>
            </div>
            <ul class="pricing-features">
              <li><span class="check">✓</span> Everything in Pro</li>
              <li><span class="check">✓</span> Up to 10 team members</li>
              <li><span class="check">✓</span> Custom templates</li>
              <li><span class="check">✓</span> API access</li>
              <li><span class="check">✓</span> Priority + phone support</li>
              <li><span class="check">✓</span> Custom integrations</li>
            </ul>
            <a href="#/signup" class="btn btn-secondary" style="width: 100%;">Contact Sales</a>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <h2>Ready to Transform Your<br><span class="text-gradient">Legal Practice?</span></h2>
        <p>Join thousands of Indian lawyers who save hours every day with AI-powered legal intelligence.</p>
        <a href="#/signup" class="btn btn-primary btn-xl">Start Free Trial →</a>
      </section>

      <!-- Footer -->
      <footer class="landing-footer" id="about">
        <div class="footer-content">
          <div class="footer-brand">
            <a href="#/" class="landing-nav-logo">
              <div class="logo-icon">⚖️</div>
              <span>NyayaGPT</span>
            </a>
            <p>India's first AI-native legal copilot. Research, summarize, draft, and analyze — all powered by advanced AI, built for Indian law.</p>
          </div>
          <div class="footer-column">
            <h6>Product</h6>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#/login">Login</a>
            <a href="#/signup">Sign Up</a>
          </div>
          <div class="footer-column">
            <h6>Legal</h6>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </div>
          <div class="footer-column">
            <h6>Support</h6>
            <a href="#">Documentation</a>
            <a href="#">Contact Us</a>
            <a href="#">FAQ</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 NyayaGPT. All rights reserved. Made with ❤️ for Indian legal professionals.</p>
        </div>
      </footer>
    </div>
  `;
}

export function initLanding() {
  // Scroll-based nav effect
  const nav = document.getElementById('landing-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('.landing-page a[href^="#features"], .landing-page a[href^="#pricing"], .landing-page a[href^="#about"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
