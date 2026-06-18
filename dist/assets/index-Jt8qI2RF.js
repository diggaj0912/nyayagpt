(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();class ve{constructor(){this.routes={},this.currentRoute=null,this.beforeEach=null,window.addEventListener("hashchange",()=>this.resolve())}register(t,a){return this.routes[t]=a,this}navigate(t){window.location.hash=t}getCurrentPath(){return window.location.hash.slice(1)||"/"}async resolve(){const t=this.getCurrentPath(),a=this.routes[t]||this.routes["/404"];this.beforeEach&&!this.beforeEach(t,this.currentRoute)||(this.currentRoute=t,a&&await a(t))}start(){this.resolve()}}const g=new ve,N="nyayagpt_",l={get(e,t=null){try{const a=localStorage.getItem(N+e);return a?JSON.parse(a):t}catch{return t}},set(e,t){try{localStorage.setItem(N+e,JSON.stringify(t))}catch(a){console.warn("Storage full or unavailable:",a)}},remove(e){localStorage.removeItem(N+e)},clear(){Object.keys(localStorage).filter(e=>e.startsWith(N)).forEach(e=>localStorage.removeItem(e))},getUser(){return this.get("user",null)},setUser(e){this.set("user",e)},isLoggedIn(){return!!this.getUser()},logout(){this.remove("user")},getDocuments(){return this.get("documents",[])},saveDocument(e){const t=this.getDocuments();return e.id=e.id||crypto.randomUUID(),e.createdAt=e.createdAt||new Date().toISOString(),t.unshift(e),this.set("documents",t),e},getResearchHistory(){return this.get("research_history",[])},saveResearch(e){const t=this.getResearchHistory();return e.id=e.id||crypto.randomUUID(),e.createdAt=new Date().toISOString(),t.unshift(e),this.set("research_history",t.slice(0,50)),e},getActivity(){return this.get("activity",[])},logActivity(e,t,a){const n=this.getActivity();n.unshift({id:crypto.randomUUID(),type:e,title:t,icon:a,timestamp:new Date().toISOString()}),this.set("activity",n.slice(0,20))},getUsage(){return this.get("usage",{research:0,summaries:0,drafts:0,analyses:0})},incrementUsage(e){const t=this.getUsage();t[e]=(t[e]||0)+1,this.set("usage",t)}};function fe(){return`
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
  `}function he(){const e=document.getElementById("landing-nav");if(e){const t=()=>{e.classList.toggle("scrolled",window.scrollY>50)};window.addEventListener("scroll",t),t()}document.querySelectorAll('.landing-page a[href^="#features"], .landing-page a[href^="#pricing"], .landing-page a[href^="#about"]').forEach(t=>{t.addEventListener("click",a=>{const n=t.getAttribute("href").slice(1),i=document.getElementById(n);i&&(a.preventDefault(),i.scrollIntoView({behavior:"smooth",block:"start"}))})})}const X={success:"✓",error:"✕",info:"ℹ",warning:"⚠"},Q={success:"Success",error:"Error",info:"Info",warning:"Warning"};let be=0;function M(e,t="info",a=4e3){const n=document.getElementById("toast-container");if(!n)return;const i=`toast-${++be}`,s=document.createElement("div");return s.className=`toast toast-${t}`,s.id=i,s.innerHTML=`
    <span class="toast-icon">${X[t]||X.info}</span>
    <div class="toast-content">
      <div class="toast-title">${Q[t]||Q.info}</div>
      <div class="toast-message">${e}</div>
    </div>
    <button class="toast-close" onclick="document.getElementById('${i}').classList.add('toast-exit'); setTimeout(() => document.getElementById('${i}')?.remove(), 300)">✕</button>
  `,n.appendChild(s),a>0&&setTimeout(()=>{s.parentNode&&(s.classList.add("toast-exit"),setTimeout(()=>s.remove(),300))},a),i}const p={success:(e,t)=>M(e,"success",t),error:(e,t)=>M(e,"error",t),info:(e,t)=>M(e,"info",t),warning:(e,t)=>M(e,"warning",t)};function xe(){return`
    <div class="auth-page">
      <div class="auth-card animate-scale-in">
        <a href="#/" class="auth-logo">
          <div class="logo-icon" style="width:32px;height:32px;background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.1rem;">⚖️</div>
          <span>NyayaGPT</span>
        </a>
        <h2>Welcome back</h2>
        <p class="auth-subtitle">Sign in to your legal AI copilot</p>

        <button class="auth-google-btn" id="google-login-btn">
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 2.58 9 3.58z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <div class="auth-divider"><span>or</span></div>

        <form class="auth-form" id="login-form">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="login-email" placeholder="you@lawfirm.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="login-password" placeholder="••••••••" required />
          </div>
          <button type="submit" class="btn btn-primary btn-lg" style="width:100%">Sign In</button>
        </form>

        <div class="auth-footer">
          Don't have an account? <a href="#/signup">Sign up free</a>
        </div>
      </div>
    </div>
  `}function we(){return`
    <div class="auth-page">
      <div class="auth-card animate-scale-in">
        <a href="#/" class="auth-logo">
          <div class="logo-icon" style="width:32px;height:32px;background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.1rem;">⚖️</div>
          <span>NyayaGPT</span>
        </a>
        <h2>Create your account</h2>
        <p class="auth-subtitle">Start your AI-powered legal journey</p>

        <button class="auth-google-btn" id="google-signup-btn">
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 2.58 9 3.58z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <div class="auth-divider"><span>or</span></div>

        <form class="auth-form" id="signup-form">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" id="signup-name" placeholder="Advocate Sharma" required />
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="signup-email" placeholder="you@lawfirm.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="signup-password" placeholder="Minimum 8 characters" required minlength="8" />
          </div>
          <div class="form-group">
            <label class="form-label">I am a...</label>
            <select class="form-select" id="signup-role">
              <option value="lawyer">Independent Lawyer</option>
              <option value="law_firm">Law Firm Associate</option>
              <option value="student">Law Student</option>
              <option value="researcher">Legal Researcher</option>
              <option value="founder">Startup Founder</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary btn-lg" style="width:100%">Create Account</button>
        </form>

        <div class="auth-footer">
          Already have an account? <a href="#/login">Sign in</a>
        </div>
      </div>
    </div>
  `}function Ae(){const e=document.getElementById("login-form");e&&e.addEventListener("submit",a=>{a.preventDefault();const n=document.getElementById("login-email").value.trim(),i=document.getElementById("login-password").value;if(!n||!i){p.error("Please fill in all fields");return}const s=l.getUser();if(s&&s.email===n){p.success("Welcome back!"),g.navigate("/dashboard");return}const r={id:crypto.randomUUID(),name:n.split("@")[0].replace(/[._]/g," ").replace(/\b\w/g,o=>o.toUpperCase()),email:n,role:"lawyer",plan:"free",createdAt:new Date().toISOString()};l.setUser(r),p.success("Welcome to NyayaGPT!"),g.navigate("/dashboard")});const t=document.getElementById("google-login-btn");t&&t.addEventListener("click",()=>{p.info("Google OAuth will be available in the next update")})}function Se(){const e=document.getElementById("signup-form");e&&e.addEventListener("submit",a=>{a.preventDefault();const n=document.getElementById("signup-name").value.trim(),i=document.getElementById("signup-email").value.trim(),s=document.getElementById("signup-password").value,r=document.getElementById("signup-role").value;if(!n||!i||!s){p.error("Please fill in all fields");return}if(s.length<8){p.error("Password must be at least 8 characters");return}const o={id:crypto.randomUUID(),name:n,email:i,role:r,plan:"free",createdAt:new Date().toISOString()};l.setUser(o),l.logActivity("signup","Account created","🎉"),p.success("Account created! Welcome to NyayaGPT"),g.navigate("/dashboard")});const t=document.getElementById("google-signup-btn");t&&t.addEventListener("click",()=>{p.info("Google OAuth will be available in the next update")})}function Ee(e,t){const a=new Blob([e],{type:"text/plain;charset=utf-8"}),n=URL.createObjectURL(a),i=document.createElement("a");i.href=n,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(n)}function D(e,t,a){const n=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${t}</title>
  <style>
    body {
      font-family: 'Georgia', serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.8;
      color: #333;
    }
    h1, h2, h3, h4 { font-family: 'Arial', sans-serif; margin-top: 24px; }
    h1 { text-align: center; border-bottom: 2px solid #333; padding-bottom: 12px; }
    .section { margin-bottom: 20px; }
    .section-title { font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; color: #666; margin-bottom: 8px; }
    .meta { text-align: center; color: #666; font-size: 14px; margin-bottom: 24px; }
    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #999; border-top: 1px solid #ddd; padding-top: 12px; }
    ul { padding-left: 20px; }
    li { margin-bottom: 6px; }
    .risk-high { color: #dc3545; font-weight: bold; }
    .risk-medium { color: #fd7e14; font-weight: bold; }
    .risk-low { color: #28a745; font-weight: bold; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  ${e}
  <div class="footer">Generated by NyayaGPT — AI Legal Intelligence for India | ${new Date().toLocaleDateString("en-IN")}</div>
</body>
</html>`,i=new Blob([n],{type:"text/html;charset=utf-8"}),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=a.replace(".pdf",".html"),document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(s)}function Ie(e,t){const a=window.open("","_blank");a.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>${t}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; line-height: 1.8; color: #333; }
    h1 { text-align: center; }
    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #999; }
  </style>
</head>
<body>${e}<div class="footer">Generated by NyayaGPT</div></body>
</html>`),a.document.close(),a.print()}function se(e){return new Date(e).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function W(e){const t=new Date,a=new Date(e),n=Math.floor((t-a)/1e3);return n<60?"just now":n<3600?`${Math.floor(n/60)}m ago`:n<86400?`${Math.floor(n/3600)}h ago`:n<604800?`${Math.floor(n/86400)}d ago`:se(e)}const Y=Object.freeze(Object.defineProperty({__proto__:null,downloadAsHTML:D,downloadAsText:Ee,formatDate:se,printContent:Ie,timeAgo:W},Symbol.toStringTag,{value:"Module"})),$e=[{icon:"🔍",title:"AI Research",desc:"Search Indian legal knowledge",route:"/research",color:"card-icon-purple"},{icon:"📄",title:"Summarize",desc:"Upload & summarize judgments",route:"/summarizer",color:"card-icon-green"},{icon:"✍️",title:"Draft",desc:"Generate legal documents",route:"/drafts",color:"card-icon-gold"},{icon:"🔬",title:"Analyze",desc:"Analyze cases & contracts",route:"/analyzer",color:"card-icon-red"}];function ke(){var d;const e=l.getUser(),t=l.getUsage(),a=l.getActivity(),n=l.getDocuments(),i=Ce(),s=$e.map(c=>`
    <div class="quick-action-card card-interactive" onclick="window.location.hash='${c.route}'">
      <div class="quick-action-icon ${c.color}">${c.icon}</div>
      <h4>${c.title}</h4>
      <p>${c.desc}</p>
    </div>
  `).join(""),r=a.length>0?a.slice(0,8).map(c=>`
      <div class="activity-item">
        <div class="activity-icon" style="background: var(--bg-surface-2);">${c.icon||"📋"}</div>
        <div class="activity-info">
          <h5>${c.title}</h5>
          <p>${W(c.timestamp)}</p>
        </div>
      </div>
    `).join(""):`<div class="empty-state" style="padding: 30px;">
        <div class="empty-state-icon">📋</div>
        <h4>No activity yet</h4>
        <p>Start using NyayaGPT to see your activity here.</p>
      </div>`,o={free:{research:5,summaries:3,drafts:3,analyses:2}},m=o[e==null?void 0:e.plan]||o.free;return`
    <div class="page-content animate-fade-up">
      <div class="dashboard-welcome">
        <h2>${i}, ${((d=e==null?void 0:e.name)==null?void 0:d.split(" ")[0])||"there"} 👋</h2>
        <p>Your AI-powered legal intelligence dashboard</p>
      </div>

      <div class="quick-actions-grid">
        ${s}
      </div>

      <div class="dashboard-grid">
        <div class="activity-feed card" style="padding: 24px;">
          <h4 style="margin-bottom: 16px;">Recent Activity</h4>
          ${r}
        </div>

        <div>
          <div class="usage-card">
            <h4>Usage This Month</h4>
            ${z("Research",t.research||0,m.research)}
            ${z("Summaries",t.summaries||0,m.summaries)}
            ${z("Drafts",t.drafts||0,m.drafts)}
            ${z("Analyses",t.analyses||0,m.analyses)}
            ${(e==null?void 0:e.plan)==="free"?`
              <div style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, rgba(108,92,231,0.1), rgba(0,184,148,0.05)); border-radius: var(--radius-sm); border: 1px solid rgba(108,92,231,0.2);">
                <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 8px;">Want unlimited access?</p>
                <a href="#/settings" class="btn btn-primary btn-sm" style="width: 100%;">Upgrade to Pro — ₹999/mo</a>
              </div>
            `:""}
          </div>

          <div class="card" style="margin-top: 16px; padding: 24px;">
            <h4 style="margin-bottom: 16px;">Documents</h4>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 2rem; font-weight: 700; color: var(--primary-light);">${n.length}</div>
                <div style="font-size: 0.8125rem; color: var(--text-secondary);">Saved documents</div>
              </div>
              <a href="#/library" class="btn btn-secondary btn-sm">View All →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function z(e,t,a){const n=Math.min(t/a*100,100),i=t>=a;return`
    <div class="usage-item">
      <div class="usage-item-header">
        <span class="usage-item-label">${e}</span>
        <span class="usage-item-value" style="${i?"color: var(--danger);":""}">${t}/${a}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${n}%; ${i?"background: var(--danger);":""}"></div>
      </div>
    </div>
  `}function Ce(){const e=new Date().getHours();return e<12?"Good morning":e<17?"Good afternoon":"Good evening"}const Le="modulepreload",Pe=function(e){return"/"+e},Z={},J=function(t,a,n){let i=Promise.resolve();if(a&&a.length>0){let r=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),m=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=r(a.map(d=>{if(d=Pe(d),d in Z)return;Z[d]=!0;const c=d.endsWith(".css"),f=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${f}`))return;const y=document.createElement("link");if(y.rel=c?"stylesheet":Le,c||(y.as="script"),y.crossOrigin="",y.href=d,m&&y.setAttribute("nonce",m),document.head.appendChild(y),c)return new Promise((k,R)=>{y.addEventListener("load",k),y.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(r){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r}return i.then(r=>{for(const o of r||[])o.status==="rejected"&&s(o.reason);return t().catch(s)})},Te="https://generativelanguage.googleapis.com/v1beta/models",_e="gemini-2.0-flash";function re(){return l.get("gemini_api_key","")}function w(){return!!re()}async function C(e,t=""){var m,d,c,f,y,k,R,V;const a=re();if(!a)throw new Error("API_KEY_MISSING");const n=`${Te}/${_e}:generateContent?key=${a}`,i={contents:[{parts:[{text:e}]}],generationConfig:{temperature:.7,topP:.95,maxOutputTokens:8192,responseMimeType:"application/json"}};t&&(i.systemInstruction={parts:[{text:t}]});const s=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!s.ok){const S=await s.json().catch(()=>({}));throw s.status===400&&((d=(m=S==null?void 0:S.error)==null?void 0:m.message)!=null&&d.includes("API key"))?new Error("API_KEY_INVALID"):new Error(((c=S==null?void 0:S.error)==null?void 0:c.message)||`Gemini API error: ${s.status}`)}const r=await s.json(),o=(V=(R=(k=(y=(f=r==null?void 0:r.candidates)==null?void 0:f[0])==null?void 0:y.content)==null?void 0:k.parts)==null?void 0:R[0])==null?void 0:V.text;if(!o)throw new Error("Empty response from Gemini");try{return JSON.parse(o)}catch{const S=o.match(/```(?:json)?\s*([\s\S]*?)```/);return S?JSON.parse(S[1].trim()):{raw:o}}}const De=`You are NyayaGPT, an expert Indian legal research assistant. You have extensive knowledge of Indian law including all Acts, Sections, IPC, CrPC, CPC, Constitution of India, Supreme Court judgments, and High Court judgments.

When given a legal query, respond in this EXACT JSON format:
{
  "acts": [
    { "name": "Act Name", "section": "Section Number", "description": "Brief explanation of relevance" }
  ],
  "judgments": [
    { "name": "Case Name v. Other Party", "citation": "(Year) Volume SCC/AIR Page", "court": "Supreme Court / High Court Name", "year": "Year", "relevance": 85, "snippet": "Key excerpt or ratio decidendi" }
  ],
  "analysis": "Detailed legal analysis in 3-5 paragraphs with inline references to the acts and judgments listed above. Use proper legal language.",
  "confidence_score": 95,
  "timeline": [
    { "year": "Year", "event": "Precedent established or statutory change" }
  ],
  "related_cases": [
    { "name": "Case Name", "citation": "Citation", "court": "Court" }
  ],
  "follow_ups": [
    "Suggested question 1",
    "Suggested question 2"
  ]
}

Rules:
- Always provide 2-5 relevant Acts/Sections
- Always provide 2-4 relevant judgments with proper citations
- Relevance score is 0-100
- Analysis should be comprehensive, citing specific sections and cases
- Focus on Indian law only
- Include landmark/leading cases where applicable`,Re=`You are NyayaGPT, a senior legal researcher in India. Perform a deep multi-step legal analysis and return a comprehensive legal memorandum.

Respond in this EXACT JSON format:
{
  "issue_summary": "Summary of the legal issue(s)",
  "applicable_laws": [
    { "act": "Act Name", "section": "Section Code", "description": "Relevance" }
  ],
  "judgments": [
    { "name": "Case Name", "citation": "Citation", "court": "Court", "year": "Year", "strength": 90, "snippet": "Ratio/summary" }
  ],
  "arguments_for": ["Argument 1", "Argument 2"],
  "arguments_against": ["Argument 1", "Argument 2"],
  "potential_risks": ["Risk 1", "Risk 2"],
  "conclusion": "Final detailed research memo conclusion",
  "confidence_score": 95
}`,Ne=`You are a helpful AI assistant. Answer the user's question clearly. Return the answer in this JSON format:
{
  "answer": "Your detailed answer here"
}`;async function Me(e,t="legal"){return t==="deep"?C(`Perform a deep multi-step legal research memo for: "${e}"`,Re):t==="general"?C(`Answer this question: "${e}"`,Ne):C(`Legal research query: "${e}"

Provide a comprehensive legal research response with relevant Indian Acts, Sections, judgments, and analysis.`,De)}const ze=`You are NyayaGPT, an expert Indian legal judgment summarizer. Given the text of a court judgment, provide a structured summary.

Respond in this EXACT JSON format:
{
  "title": "Case title from the judgment",
  "court": "Court name",
  "date": "Date of judgment",
  "facts": ["Fact 1", "Fact 2", "..."],
  "issues": ["Issue 1", "Issue 2", "..."],
  "petitioner_arguments": ["Argument 1", "Argument 2", "..."],
  "respondent_arguments": ["Argument 1", "Argument 2", "..."],
  "court_reasoning": "Detailed reasoning of the court in 2-3 paragraphs",
  "verdict": "Final verdict/order of the court",
  "key_takeaways": ["Takeaway 1", "Takeaway 2", "..."]
}

Rules:
- Extract facts accurately from the judgment text
- Identify all legal issues framed by the court
- Summarize arguments of both sides fairly
- Capture the ratio decidendi in the reasoning
- Verdict should be concise but complete
- Key takeaways should be practical and actionable`;async function Be(e){const t=e.slice(0,3e4);return C(`Summarize the following Indian court judgment:

---
${t}
---

Provide a structured summary.`,ze)}const K={legal_notice:{name:"Legal Notice",systemPrompt:`You are NyayaGPT, an expert Indian legal draft generator. Generate a formal Legal Notice as per Indian law.

Respond in this EXACT JSON format:
{
  "title": "LEGAL NOTICE",
  "content": "Full legal notice text with proper formatting, numbered paragraphs, legal language, and all standard clauses. Include date, sender/recipient details, subject, body with facts and demands, timeline for response, and consequences of non-compliance.",
  "sections": ["Introduction", "Facts", "Legal Basis", "Demand", "Consequences"]
}`,fields:[{name:"sender_name",label:"Sender (Your Name)",type:"text",required:!0},{name:"sender_address",label:"Sender Address",type:"textarea",required:!0},{name:"recipient_name",label:"Recipient Name",type:"text",required:!0},{name:"recipient_address",label:"Recipient Address",type:"textarea",required:!0},{name:"subject",label:"Subject of Notice",type:"text",required:!0},{name:"facts",label:"Facts & Background",type:"textarea",required:!0,hint:"Describe the situation in detail"},{name:"demand",label:"Your Demand / Relief Sought",type:"textarea",required:!0},{name:"deadline_days",label:"Response Deadline (days)",type:"number",required:!0}]},nda:{name:"Non-Disclosure Agreement",systemPrompt:`You are NyayaGPT, an expert Indian legal draft generator. Generate a comprehensive NDA as per Indian Contract Act, 1872.

Respond in this EXACT JSON format:
{
  "title": "NON-DISCLOSURE AGREEMENT",
  "content": "Full NDA text with all standard clauses including definitions, obligations, exceptions, term, remedies, governing law, jurisdiction, and signature blocks.",
  "sections": ["Definitions", "Obligations", "Exceptions", "Term", "Remedies", "General"]
}`,fields:[{name:"disclosing_party",label:"Disclosing Party",type:"text",required:!0},{name:"receiving_party",label:"Receiving Party",type:"text",required:!0},{name:"purpose",label:"Purpose of Disclosure",type:"textarea",required:!0},{name:"confidential_info",label:"Type of Confidential Information",type:"textarea",required:!0},{name:"duration_years",label:"Duration (years)",type:"number",required:!0},{name:"jurisdiction",label:"Jurisdiction (City)",type:"text",required:!0}]},employment:{name:"Employment Agreement",systemPrompt:`You are NyayaGPT, an expert Indian legal draft generator. Generate a comprehensive Employment Agreement compliant with Indian labour laws.

Respond in this EXACT JSON format:
{
  "title": "EMPLOYMENT AGREEMENT",
  "content": "Full employment agreement with all clauses including position, duties, compensation, benefits, probation, termination, confidentiality, non-compete, intellectual property, and governing law.",
  "sections": ["Appointment", "Compensation", "Duties", "Probation", "Termination", "Confidentiality", "IP Rights", "General"]
}`,fields:[{name:"company_name",label:"Company Name",type:"text",required:!0},{name:"employee_name",label:"Employee Name",type:"text",required:!0},{name:"designation",label:"Designation / Role",type:"text",required:!0},{name:"salary",label:"Annual CTC (₹)",type:"text",required:!0},{name:"start_date",label:"Start Date",type:"date",required:!0},{name:"probation_months",label:"Probation Period (months)",type:"number",required:!0},{name:"notice_period",label:"Notice Period (months)",type:"number",required:!0},{name:"location",label:"Work Location",type:"text",required:!0}]},service_agreement:{name:"Service Agreement",systemPrompt:`You are NyayaGPT, an expert Indian legal draft generator. Generate a comprehensive Service Agreement as per Indian Contract Act.

Respond in this EXACT JSON format:
{
  "title": "SERVICE AGREEMENT",
  "content": "Full service agreement with scope of work, payment terms, timelines, warranties, liability, termination, confidentiality, and dispute resolution clauses.",
  "sections": ["Scope", "Payment", "Timeline", "Warranties", "Liability", "Termination", "Dispute Resolution"]
}`,fields:[{name:"provider_name",label:"Service Provider Name",type:"text",required:!0},{name:"client_name",label:"Client Name",type:"text",required:!0},{name:"services",label:"Scope of Services",type:"textarea",required:!0},{name:"fee",label:"Service Fee (₹)",type:"text",required:!0},{name:"duration",label:"Duration",type:"text",required:!0},{name:"payment_terms",label:"Payment Terms",type:"text",required:!0,hint:"e.g., 50% upfront, 50% on completion"},{name:"jurisdiction",label:"Jurisdiction (City)",type:"text",required:!0}]},partnership:{name:"Partnership Agreement",systemPrompt:`You are NyayaGPT, an expert Indian legal draft generator. Generate a Partnership Deed compliant with Indian Partnership Act, 1932.

Respond in this EXACT JSON format:
{
  "title": "PARTNERSHIP DEED",
  "content": "Full partnership deed with all clauses including partners, capital contribution, profit sharing, management, banking, accounting, dissolution, and dispute resolution.",
  "sections": ["Partners", "Business", "Capital", "Profit Sharing", "Management", "Dissolution", "General"]
}`,fields:[{name:"firm_name",label:"Firm Name",type:"text",required:!0},{name:"business_nature",label:"Nature of Business",type:"text",required:!0},{name:"partner1_name",label:"Partner 1 Name",type:"text",required:!0},{name:"partner1_share",label:"Partner 1 Share (%)",type:"number",required:!0},{name:"partner2_name",label:"Partner 2 Name",type:"text",required:!0},{name:"partner2_share",label:"Partner 2 Share (%)",type:"number",required:!0},{name:"capital",label:"Total Capital (₹)",type:"text",required:!0},{name:"location",label:"Business Location",type:"text",required:!0}]},rent_agreement:{name:"Rent Agreement",systemPrompt:`You are NyayaGPT, an expert Indian legal draft generator. Generate a Rent/Lease Agreement compliant with applicable Rent Control Acts and Transfer of Property Act.

Respond in this EXACT JSON format:
{
  "title": "RENT AGREEMENT",
  "content": "Full rent agreement with all clauses including property details, rent, security deposit, duration, maintenance, subletting, termination, and registration details.",
  "sections": ["Property", "Rent & Deposit", "Duration", "Maintenance", "Terms", "Termination", "General"]
}`,fields:[{name:"landlord_name",label:"Landlord Name",type:"text",required:!0},{name:"tenant_name",label:"Tenant Name",type:"text",required:!0},{name:"property_address",label:"Property Address",type:"textarea",required:!0},{name:"rent_amount",label:"Monthly Rent (₹)",type:"text",required:!0},{name:"security_deposit",label:"Security Deposit (₹)",type:"text",required:!0},{name:"duration_months",label:"Lease Duration (months)",type:"number",required:!0},{name:"start_date",label:"Start Date",type:"date",required:!0},{name:"purpose",label:"Purpose (Residential/Commercial)",type:"text",required:!0}]}};function oe(){return Object.entries(K).map(([e,t])=>({id:e,name:t.name,fields:t.fields}))}function le(e){var t;return((t=K[e])==null?void 0:t.fields)||[]}async function je(e,t){const a=K[e];if(!a)throw new Error("Invalid template");const n=Object.entries(t).map(([i,s])=>`${i.replace(/_/g," ")}: ${s}`).join(`
`);return C(`Generate a professional Indian legal document with these details:

${n}

Create a complete, ready-to-use document.`,a.systemPrompt)}const qe=`You are NyayaGPT, an expert Indian legal case analyzer. Given a legal document (petition, FIR, agreement, or legal notice), provide a comprehensive analysis.

Respond in this EXACT JSON format:
{
  "document_type": "Identified document type",
  "key_facts": ["Fact 1", "Fact 2", "Fact 3"],
  "risks": [
    { "level": "high", "title": "Risk Title", "description": "Explanation" },
    { "level": "medium", "title": "Risk Title", "description": "Explanation" },
    { "level": "low", "title": "Risk Title", "description": "Explanation" }
  ],
  "missing_clauses": [
    { "clause": "Clause name", "importance": "Why it matters" }
  ],
  "legal_issues": [
    { "issue": "Issue title", "explanation": "Detailed explanation" }
  ],
  "overall_risk_score": 65,
  "recommendation": "Overall recommendation paragraph"
}

Rules:
- Identify 3-8 key facts
- Identify 2-5 risks at different levels
- Identify 2-4 missing clauses or provisions
- Identify 2-4 legal issues
- Risk score is 0-100 (0 = no risk, 100 = extreme risk)
- Be specific to Indian law`;async function Ge(e,t){const a=e.slice(0,3e4);return C(`Analyze the following ${t} under Indian law:

---
${a}
---

Provide a comprehensive analysis.`,qe)}const Fe=`You are NyayaGPT, an expert Indian legal citation researcher. Given a legal issue, statute, or precedent, return a structured list of relevant judgments, cited precedents, court hierarchies, and citation connections (graph).

Respond in this EXACT JSON format:
{
  "judgments": [
    { 
      "name": "Case Name", 
      "citation": "Citation", 
      "court": "Court Name", 
      "year": "Year", 
      "citation_count": 87, 
      "citation_strength": "High", 
      "hierarchy_level": "Supreme Court", 
      "relevance_score": 95, 
      "snippet": "Ratio decidendi/excerpt" 
    }
  ],
  "graph": {
    "nodes": [
      { "id": "1", "label": "Case Name 1", "type": "supreme_court" },
      { "id": "2", "label": "Case Name 2", "type": "high_court" }
    ],
    "links": [
      { "source": "1", "target": "2", "type": "cited_by" }
    ]
  }
}

Rules:
- Provide 3-6 highly relevant citations
- Cite exact court levels (e.g. Supreme Court of India, Delhi High Court)
- Citation strength should be "High", "Medium", or "Low" based on frequency of referral
- Graph links represent citation connections between the cases in the nodes list`;async function He(e){return C(`Find legal citations and build a connection graph for the following query/issue: "${e}"`,Fe)}function Oe(){return{issue_summary:"Criminal liability of a non-executive independent director in cheque bounce cases under Section 138 of the Negotiable Instruments Act, 1881.",applicable_laws:[{act:"Negotiable Instruments Act, 1881",section:"Section 138",description:"Dishonour of cheque for insufficiency, etc., of funds in the account."},{act:"Negotiable Instruments Act, 1881",section:"Section 141",description:"Offences by companies and liability of directors/officers in charge of daily affairs."},{act:"Companies Act, 2013",section:"Section 149(12)",description:"Limitation of liability of independent and non-executive directors."}],judgments:[{name:"S.M.S. Pharmaceuticals Ltd. v. Neeta Bhalla",citation:"(2005) 8 SCC 89",court:"Supreme Court of India",year:"2005",strength:98,snippet:"Established that a clear statement must be made in the complaint showing the director was in charge of and responsible for the company's daily conduct."},{name:"Pooja Ravinder Devidasani v. State of Maharashtra",citation:"AIR 2015 SC 675",court:"Supreme Court of India",year:"2014",strength:95,snippet:"Held that non-executive directors cannot be held liable under Section 138 merely by virtue of holding a designation, without specific overt acts showing operational control."},{name:"KK Ahuja v. V.K. Vora",citation:"(2009) 10 SCC 48",court:"Supreme Court of India",year:"2009",strength:89,snippet:"Clarified the roles of Managing Directors, Directors, and Officers, reiterating that only those participating in everyday commercial actions are criminally liable."}],arguments_for:["The director is designated as a non-executive/independent director and does not draw operational salary.","The Board resolution files prove the director has no signing authority on the bank accounts of the company.","No specific averment is present in the complaint detailing the active involvement of the director in issuing the check."],arguments_against:["The complainant argues that all directors are collectively liable for company debts under statutory guidelines.","The name of the director appears on the official company letterhead as an active advisor."],potential_risks:["Initial summon proceedings might still require the director to appear and file for quashing under Section 482 CrPC.","Vaguely worded complaint drafts might delay discharge if operational participation is deemed an issue of trial evidence."],conclusion:"Under Indian jurisprudence, specifically Section 141 of the NI Act and Section 149(12) of the Companies Act, a non-executive independent director cannot be held criminally liable for cheque bounce offences unless there is a clear, specific, and operational allegation showing they were in charge of the company's day-to-day affairs at the time of the offence. The landmark ruling in S.M.S. Pharmaceuticals and Pooja Ravinder Devidasani provides complete protection, allowing the director to seek quashing of summons from the High Court under Section 482 of the CrPC/BNS.",confidence_score:95}}function Ue(){return{answer:"To run a background task in a Node.js server, you can use built-in mechanisms like child processes or worker threads for CPU-heavy tasks. For robust, production-grade applications, it is highly recommended to use message queues like BullMQ (redis-backed), Agenda (mongodb-backed), or Celery (if working in a python stack). These allow you to schedule, monitor, and scale background processing nodes independently from your main HTTP router nodes."}}function We(){return{acts:[{name:"Indian Penal Code, 1860",section:"Section 498A",description:"Husband or relative of husband of a woman subjecting her to cruelty — Punishment with imprisonment up to 3 years and fine."},{name:"Hindu Marriage Act, 1955",section:"Section 13",description:"Grounds for divorce including cruelty, desertion, conversion, unsoundness of mind, venereal disease, renunciation, and presumption of death."},{name:"Protection of Women from Domestic Violence Act, 2005",section:"Section 3",description:"Defines domestic violence including physical, sexual, verbal, emotional, and economic abuse."}],judgments:[{name:"Arnesh Kumar v. State of Bihar",citation:"(2014) 8 SCC 273",court:"Supreme Court of India",year:"2014",relevance:95,snippet:"The Supreme Court laid down guidelines to prevent automatic arrests in cases under Section 498A IPC, requiring the police to follow a checklist before making arrests."},{name:"Rajesh Sharma v. State of U.P.",citation:"(2017) 10 SCC 257",court:"Supreme Court of India",year:"2017",relevance:88,snippet:"Directed establishment of Family Welfare Committees in every district to look into complaints of matrimonial disputes and recommend settlement."},{name:"Shobha Rani v. Madhukar Reddi",citation:"(1988) 1 SCC 105",court:"Supreme Court of India",year:"1988",relevance:78,snippet:"Defined cruelty broadly to include both physical and mental cruelty, establishing that persistent demands for dowry constitute cruelty under Section 498A."}],analysis:`Based on the legal research, Section 498A of the Indian Penal Code is the primary provision dealing with cruelty by husband or his relatives against a married woman. This section was introduced by the Criminal Law (Second Amendment) Act, 1983, to combat the increasing menace of dowry deaths and domestic violence.

The Supreme Court in Arnesh Kumar v. State of Bihar (2014) 8 SCC 273 recognized the potential misuse of Section 498A and laid down important safeguards, including a mandatory checklist for police officers before arrest. This judgment was a landmark in balancing the protection of women with prevention of misuse.

In addition to criminal remedies under Section 498A IPC, the Protection of Women from Domestic Violence Act, 2005 provides civil remedies including protection orders, residence orders, monetary relief, and custody orders. Section 13 of the Hindu Marriage Act, 1955 allows divorce on grounds of cruelty, providing a matrimonial remedy alongside criminal provisions.`,confidence_score:92,timeline:[{year:"1983",event:"Section 498A added to IPC by Criminal Law Amendment Act."},{year:"1988",event:"Supreme Court defines physical and mental cruelty in Shobha Rani case."},{year:"2005",event:"Protection of Women from Domestic Violence Act enacted."},{year:"2014",event:"Arnesh Kumar guidelines issued to prevent automatic arrests."}],related_cases:[{name:"Preeti Gupta v. State of Jharkhand",citation:"(2010) 7 SCC 667",court:"Supreme Court of India"},{name:"Sushil Kumar Sharma v. Union of India",citation:"(2005) 6 SCC 281",court:"Supreme Court of India"}],follow_ups:["What are the guidelines for registering FIR in matrimonial disputes?","How to apply for anticipatory bail in a Section 498A case?","Are there amendments proposed for BNS regarding domestic violence?"]}}function Ye(){return{title:"Arnesh Kumar v. State of Bihar",court:"Supreme Court of India",date:"2 July 2014",facts:["The appellant was arrested under Section 498A IPC without proper investigation","The case highlighted the growing concern of mechanical arrests in matrimonial disputes","Police had arrested the accused without following proper procedure or assessing necessity of arrest"],issues:["Whether automatic arrest under Section 498A IPC is mandatory","What safeguards should be in place to prevent misuse of Section 498A","Whether the Magistrate should apply judicial mind before authorizing detention"],petitioner_arguments:["Section 498A is being widely misused as a tool for harassment","Automatic arrests violate fundamental rights under Article 21","Police should be required to investigate before making arrests"],respondent_arguments:["Section 498A is necessary to protect women from domestic violence","Arrests are needed to prevent accused from influencing witnesses","The provision serves an important social purpose"],court_reasoning:"The Supreme Court acknowledged that while Section 498A serves a vital purpose in protecting women from cruelty, its misuse cannot be ignored. The Court noted that in many cases, arrests were made mechanically without proper application of mind. The Court held that police officers must satisfy themselves about the necessity of arrest under Section 41 CrPC and prepare a checklist of reasons for arrest.",verdict:"The Supreme Court directed all State Governments to instruct police officers not to automatically arrest the accused in Section 498A cases. Police must follow the checklist under Section 41(1)(b)(ii) CrPC. Magistrates must not authorize detention casually and must satisfy themselves that the arrest is warranted.",key_takeaways:["Police cannot make automatic arrests in Section 498A cases","A checklist must be prepared justifying the arrest","Magistrates must apply judicial mind before authorizing detention","Non-compliance may lead to departmental action against police officers","This judgment balances protection of women with prevention of misuse"]}}function Je(){return{document_type:"Service Agreement",key_facts:["Agreement between two parties for software development services","Contract value of ₹15,00,000 with milestone-based payments","Project duration of 6 months from execution date","No specific mention of data protection or privacy terms","Intellectual property assignment clause is vaguely worded"],risks:[{level:"high",title:"Vague IP Assignment",description:"The intellectual property clause does not clearly specify ownership of derivative works and pre-existing IP. This could lead to disputes."},{level:"high",title:"No Data Protection Terms",description:"Given DPDP Act 2023 requirements, the absence of data protection clauses is a significant compliance risk."},{level:"medium",title:"Limited Liability Cap Missing",description:"No cap on liability has been specified, exposing both parties to unlimited claims."},{level:"medium",title:"Inadequate Termination Clause",description:"Termination clause does not address payments for partially completed work or transition assistance."},{level:"low",title:"No Force Majeure",description:"Agreement does not include force majeure provisions for unforeseen circumstances."}],missing_clauses:[{clause:"Force Majeure",importance:"Essential for protecting both parties from liability during unforeseen events like natural disasters or pandemics."},{clause:"Data Protection & Privacy",importance:"Required under the Digital Personal Data Protection Act, 2023 for any agreement involving personal data processing."},{clause:"Non-Solicitation",importance:"Prevents parties from poaching each other's employees during and after the engagement."},{clause:"Limitation of Liability",importance:"Caps maximum liability to contract value, preventing disproportionate claims."}],legal_issues:[{issue:"Stamp Duty Compliance",explanation:"The agreement may require stamp duty as per the applicable state Stamp Act. Non-stamped agreements may not be admissible as evidence."},{issue:"GST Implications",explanation:"The payment terms do not address GST obligations. Under GST law, the service provider must charge 18% GST on services."},{issue:"Dispute Resolution Mechanism",explanation:"While arbitration is mentioned, the clause does not specify the seat of arbitration, language, or applicable arbitration rules."}],overall_risk_score:68,recommendation:"The agreement requires significant revision before execution. The most critical issues are the vague IP assignment clause and the complete absence of data protection terms (mandatory under DPDP Act 2023). We recommend adding Force Majeure, limitation of liability, data protection, and non-solicitation clauses. The arbitration clause should specify seat, language, and governing rules. GST and stamp duty compliance should be addressed explicitly."}}function Ke(){return{judgments:[{name:"S.P. Gupta v. President of India",citation:"AIR 1982 SC 149",court:"Supreme Court of India",year:"1981",citation_count:245,citation_strength:"High",hierarchy_level:"Supreme Court",relevance_score:98,snippet:"A landmark judgment establishing the concept of Public Interest Litigation (PIL) in India, holding that any member of the public can approach the court for public injury."},{name:"Bandhua Mukti Morcha v. Union of India",citation:"(1984) 3 SCC 161",court:"Supreme Court of India",year:"1984",citation_count:189,citation_strength:"High",hierarchy_level:"Supreme Court",relevance_score:92,snippet:"Reinforced PIL admissibility and held that the Court can appoint commissioners to locate bonded laborers and report back, bypassing rigid adversarial procedures."},{name:"Sheela Barse v. State of Maharashtra",citation:"(1983) 2 SCC 96",court:"Supreme Court of India",year:"1983",citation_count:78,citation_strength:"Medium",hierarchy_level:"Supreme Court",relevance_score:85,snippet:"Addressed rights of women prisoners, establishing that legal aid is a fundamental right under Article 21 and laying down guidelines for custodial treatment."}],graph:{nodes:[{id:"sp_gupta",label:"S.P. Gupta v. President of India (1981)",type:"supreme_court"},{id:"bandhua",label:"Bandhua Mukti Morcha v. UOI (1984)",type:"supreme_court"},{id:"sheela",label:"Sheela Barse v. State of Maha (1983)",type:"supreme_court"}],links:[{source:"bandhua",target:"sp_gupta",type:"cited_by"},{source:"sheela",target:"sp_gupta",type:"cited_by"}]}}}const Ve=["What are the ingredients of cheating under BNS?","Latest Supreme Court judgments on privacy?","Important precedents on arbitration?","Remedies for breach of contract under Indian law"];let b="legal",Xe=null;function Qe(){const e=l.getResearchHistory();return`
    <div class="page-content animate-fade-up" style="height: calc(100vh - 100px); display: flex; flex-direction: column; padding: 20px 24px; overflow: hidden;">
      
      <!-- Layout Wrapper -->
      <div class="research-grid" style="flex: 1; display: grid; grid-template-columns: 260px 1fr 340px; gap: 20px; overflow: hidden; min-height: 0;">
        
        <!-- ================= PANEL 1: LEFT SIDEBAR ================= -->
        <div class="card panel-sidebar" style="padding: 16px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto;">
          <button class="btn btn-primary" id="new-research-btn" style="width: 100%;">
            ✨ New Research
          </button>
          
          <div>
            <h5 style="font-size: 0.8125rem; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 8px; font-family: var(--font-headline);">Search Mode</h5>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <button class="btn mode-selector-btn ${b==="legal"?"active":"btn-ghost"}" data-mode="legal" style="justify-content: flex-start; text-align: left; padding: 8px 12px; font-size: 0.8125rem; width: 100%;">
                🔍 Legal Research
              </button>
              <button class="btn mode-selector-btn ${b==="deep"?"active":"btn-ghost"}" data-mode="deep" style="justify-content: flex-start; text-align: left; padding: 8px 12px; font-size: 0.8125rem; width: 100%;">
                🧠 Deep Analysis
              </button>
              <button class="btn mode-selector-btn ${b==="general"?"active":"btn-ghost"}" data-mode="general" style="justify-content: flex-start; text-align: left; padding: 8px 12px; font-size: 0.8125rem; width: 100%;">
                🤖 General AI
              </button>
            </div>
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; min-height: 0;">
            <h5 style="font-size: 0.8125rem; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 8px; font-family: var(--font-headline);">Recent Queries</h5>
            <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;" id="recent-queries-list">
              ${e.length===0?`
                <div style="font-size: 0.75rem; color: var(--text-tertiary); text-align: center; padding: 20px 0;">No queries recorded.</div>
              `:e.slice(0,10).map(t=>`
                <div class="card card-interactive recent-query-item" data-query-text="${u(t.query)}" style="padding: 10px; margin: 0; font-size: 0.75rem; border: 1px solid rgba(0,0,0,0.03);">
                  <div style="font-weight: 500; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; color: var(--text-primary);">${u(t.query)}</div>
                  <div style="font-size: 0.625rem; color: var(--text-tertiary); margin-top: 2px;">${t.actsCount||0} acts · ${t.judgmentsCount||0} judgments</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- ================= PANEL 2: CENTER CANVAS ================= -->
        <div class="card panel-canvas" style="padding: 20px; display: flex; flex-direction: column; overflow: hidden;">
          
          <!-- Mode Label Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 12px; margin-bottom: 16px;">
            <div>
              <span id="canvas-mode-badge" class="badge badge-primary" style="text-transform: uppercase; font-weight: 600; font-size: 0.6875rem; font-family: var(--font-headline);">
                ${b==="legal"?"Legal Research Mode":b==="deep"?"Deep Research Memo Mode":"General Assistant"}
              </span>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-tertiary);">
              ${w()?"🟢 API Connected":"🔌 Demo Mode"}
            </div>
          </div>

          <!-- Output stream -->
          <div style="flex: 1; overflow-y: auto; margin-bottom: 16px; padding-right: 4px;" id="canvas-stream">
            <div id="welcome-canvas" style="padding: 24px; text-align: center; margin-top: 40px; max-width: 460px; margin-left: auto; margin-right: auto;">
              <span style="font-size: 2.5rem;">⚖️</span>
              <h3 style="margin-top: 12px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Search Indian Jurisprudence</h3>
              <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.5;">
                Enter search questions above. Mode switches let you toggle between statutory summaries, deep structural legal memos, and general utility AI tools.
              </p>
            </div>
          </div>

          <!-- Bottom Query Panel -->
          <div class="research-input-container" style="background: rgba(0,0,0,0.01); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px;">
            <div style="display: flex; gap: 12px; align-items: flex-end;">
              <textarea class="form-textarea" id="research-query" placeholder="Ask about any Indian law, judgment, statute, precedent, or legal issue..." rows="2" style="flex: 1; min-height: 50px; background: transparent; border: none; padding: 0; font-size: 0.875rem; color: var(--text-primary); outline: none; box-shadow: none;"></textarea>
              <button class="btn btn-primary" id="research-submit-btn" style="padding: 8px 16px;">
                <span id="submit-btn-text">Execute</span>
              </button>
            </div>
            <div class="suggested-queries" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; border-top: 1px solid rgba(0,0,0,0.02); padding-top: 8px;">
              ${Ve.map(t=>`<button class="chip text-xs" data-suggest-query="${t}" style="font-size: 0.6875rem; border: 1px solid rgba(0,0,0,0.04); cursor: pointer; padding: 4px 8px; border-radius: 4px; background: rgba(0,0,0,0.01);">${t}</button>`).join("")}
            </div>
          </div>

        </div>

        <!-- ================= PANEL 3: RIGHT SIDEBAR ================= -->
        <div class="card panel-inspector" style="padding: 16px; display: flex; flex-direction: column; overflow: hidden;">
          <h4 style="margin-bottom: 12px; font-size: 0.875rem; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.5px; font-family: var(--font-headline); border-bottom: 1px solid var(--border); padding-bottom: 8px;">Citations & Graph</h4>
          <div id="inspector-placeholder" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--text-muted); padding: 20px;">
            <span style="font-size: 1.5rem; margin-bottom: 12px;">🔍</span>
            <div style="font-size: 0.8125rem; font-weight: 500;">No Citation Analysis</div>
            <div style="font-size: 0.75rem; max-width: 180px; margin-top: 4px;">Search in Legal or Deep mode to display citing networks and precedent lists here.</div>
          </div>
          <div id="inspector-content" style="flex: 1; overflow-y: auto; display: none; padding-right: 4px;"></div>
        </div>

      </div>
    </div>
  `}function Ze(){var a;const e=document.getElementById("research-submit-btn"),t=document.getElementById("research-query");(a=document.getElementById("new-research-btn"))==null||a.addEventListener("click",()=>{document.getElementById("canvas-stream").innerHTML=`
      <div id="welcome-canvas" style="padding: 24px; text-align: center; margin-top: 40px; max-width: 460px; margin-left: auto; margin-right: auto;">
        <span style="font-size: 2.5rem;">⚖️</span>
        <h3 style="margin-top: 12px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Search Indian Jurisprudence</h3>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.5;">
          Enter search questions above. Mode switches let you toggle between statutory summaries, deep structural legal memos, and general utility AI tools.
        </p>
      </div>
    `,document.getElementById("inspector-placeholder").style.display="flex",document.getElementById("inspector-content").style.display="none",t&&(t.value="")}),document.querySelectorAll(".mode-selector-btn").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll(".mode-selector-btn").forEach(s=>{s.classList.remove("active"),s.classList.add("btn-ghost")}),n.classList.add("active"),n.classList.remove("btn-ghost"),b=n.dataset.mode;const i=document.getElementById("canvas-mode-badge");i&&(i.textContent=b==="legal"?"Legal Research Mode":b==="deep"?"Deep Research Memo Mode":"General Assistant")})}),document.querySelectorAll("[data-suggest-query]").forEach(n=>{n.addEventListener("click",()=>{t&&(t.value=n.dataset.suggestQuery,t.focus())})}),document.querySelectorAll(".recent-query-item").forEach(n=>{n.addEventListener("click",()=>{t&&(t.value=n.dataset.queryText,H(t,e))})}),e&&e.addEventListener("click",()=>H(t,e)),t&&t.addEventListener("keydown",n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),H(t,e))})}async function H(e,t){var i,s,r,o,m;const a=e.value.trim();if(!a){p.warning("Please input your research topic");return}const n=document.getElementById("canvas-stream");t.disabled=!0,document.getElementById("submit-btn-text").textContent="Analyzing...",b==="deep"?(n.innerHTML=et(),await tt()):n.innerHTML=`
      <div style="padding: 40px; text-align: center;">
        <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
        <p class="text-muted" style="font-size: 0.875rem;">Querying legal engine and generating output stream...</p>
      </div>
    `;try{let d;w()?d=await Me(a,b):(await new Promise(c=>setTimeout(c,1500)),b==="deep"?d=Oe():b==="general"?d=Ue():d=We()),Xe=d,l.incrementUsage("research"),l.logActivity("research",`${b==="deep"?"Deep":"Legal"} research executed`,"🔍"),l.saveResearch({query:a,actsCount:((i=d.acts)==null?void 0:i.length)||((s=d.applicable_laws)==null?void 0:s.length)||0,judgmentsCount:((r=d.judgments)==null?void 0:r.length)||0}),n.innerHTML=nt(a,d),n.scrollTop=0,at(d),(o=document.getElementById("save-workspace-btn"))==null||o.addEventListener("click",()=>{l.saveDocument({type:"research",title:a,content:d}),p.success("Research memo successfully saved to library")}),(m=document.getElementById("export-canvas-btn"))==null||m.addEventListener("click",()=>{J(()=>Promise.resolve().then(()=>Y),void 0).then(c=>{c.downloadAsHTML(st(a,d),`Research: ${a}`,`research_${Date.now()}.html`)})})}catch(d){p.error("Legal index retrieval failed: "+d.message),n.innerHTML='<div style="padding:20px; color:var(--danger)">An error occurred during query execution.</div>'}finally{t.disabled=!1,document.getElementById("submit-btn-text").textContent="Execute"}}function et(){return`
    <div style="padding: 32px; max-width: 400px; margin: 40px auto 0;">
      <h4 style="margin-bottom: 20px; font-weight: 600; color: var(--text-primary); text-align: center; font-family: var(--font-headline);">Deep Research Agent Active</h4>
      <div class="processing-steps" style="display: flex; flex-direction: column; gap: 12px;">
        <div class="processing-step" id="step-statutes">
          <div class="processing-step-icon" style="background: rgba(0,0,0,0.05); color: var(--text-tertiary); display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 0.625rem; margin-right: 8px;">1</div>
          <span style="font-size: 0.8125rem;">Searching Statutes...</span>
        </div>
        <div class="processing-step" id="step-judgments">
          <div class="processing-step-icon" style="background: rgba(0,0,0,0.05); color: var(--text-tertiary); display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 0.625rem; margin-right: 8px;">2</div>
          <span style="font-size: 0.8125rem;">Searching Judgments...</span>
        </div>
        <div class="processing-step" id="step-citations">
          <div class="processing-step-icon" style="background: rgba(0,0,0,0.05); color: var(--text-tertiary); display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 0.625rem; margin-right: 8px;">3</div>
          <span style="font-size: 0.8125rem;">Finding Citations...</span>
        </div>
        <div class="processing-step" id="step-compare">
          <div class="processing-step-icon" style="background: rgba(0,0,0,0.05); color: var(--text-tertiary); display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 0.625rem; margin-right: 8px;">4</div>
          <span style="font-size: 0.8125rem;">Comparing Cases...</span>
        </div>
        <div class="processing-step" id="step-memo">
          <div class="processing-step-icon" style="background: rgba(0,0,0,0.05); color: var(--text-tertiary); display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-size: 0.625rem; margin-right: 8px;">5</div>
          <span style="font-size: 0.8125rem;">Generating Memorandum...</span>
        </div>
      </div>
    </div>
  `}async function tt(){const e=["step-statutes","step-judgments","step-citations","step-compare","step-memo"];for(const t of e){const a=document.getElementById(t);if(a){a.classList.add("active");const n=a.querySelector(".processing-step-icon");n&&(n.innerHTML="🔄",n.style.background="transparent"),await new Promise(i=>setTimeout(i,600)),n&&(n.innerHTML="✅",n.style.color="var(--secondary)"),a.classList.remove("active"),a.style.opacity="0.7"}}}function nt(e,t){if(b==="general")return`
      <div style="font-size: 0.875rem; line-height: 1.6; color: var(--text-primary);">
        <h4 style="font-weight: 600; margin-bottom: 12px; font-family: var(--font-headline);">Question</h4>
        <p style="background: rgba(0,0,0,0.02); padding: 12px; border-radius: 6px; margin-bottom: 20px; border: 1px solid var(--border-light);">${u(e)}</p>
        <h4 style="font-weight: 600; margin-bottom: 12px; font-family: var(--font-headline);">Answer</h4>
        <p style="white-space: pre-wrap;">${u(t.answer)}</p>
      </div>
    `;if(b==="deep")return`
      <div style="font-size: 0.875rem; line-height: 1.6;">
        
        <!-- Header Info -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-weight: 700; color: var(--text-primary); font-family: var(--font-headline); margin: 0;">Legal Research Memorandum</h3>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="text-xs text-muted">Confidence Score:</span>
            <span style="font-weight: 700; color: var(--secondary);">${t.confidence_score}%</span>
          </div>
        </div>

        <div class="card" style="padding: 16px; margin-bottom: 20px; border-left: 4px solid var(--accent);">
          <h5 style="margin-bottom: 6px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Issue Summary</h5>
          <p style="margin: 0; color: var(--text-secondary); font-size: 0.8125rem;">${u(t.issue_summary)}</p>
        </div>

        <!-- Applicable statutes -->
        <div style="margin-bottom: 20px;">
          <h5 style="font-weight: 600; color: var(--text-primary); margin-bottom: 8px; font-family: var(--font-headline);">Applicable Laws & Provisions</h5>
          <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
            ${(t.applicable_laws||[]).map(n=>`
              <div style="padding: 10px; background: rgba(0,0,0,0.01); border: 1px solid var(--border); border-radius: 6px;">
                <div style="font-weight: 600; color: var(--primary);">${u(n.act)}</div>
                <div class="badge badge-primary" style="margin: 4px 0;">${u(n.section)}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${u(n.description)}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Arguments pro and con -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div class="card" style="padding: 14px; background: rgba(16,185,129,0.02); border-color: rgba(16,185,129,0.1);">
            <h5 style="color: var(--secondary); margin-bottom: 8px; font-weight: 600; font-family: var(--font-headline);">Arguments FOR</h5>
            <ul style="padding-left: 16px; margin: 0; font-size: 0.75rem; display: flex; flex-direction: column; gap: 6px;">
              ${(t.arguments_for||[]).map(n=>`<li>${u(n)}</li>`).join("")}
            </ul>
          </div>
          <div class="card" style="padding: 14px; background: rgba(239,68,68,0.02); border-color: rgba(239,68,68,0.1);">
            <h5 style="color: var(--danger); margin-bottom: 8px; font-weight: 600; font-family: var(--font-headline);">Arguments AGAINST</h5>
            <ul style="padding-left: 16px; margin: 0; font-size: 0.75rem; display: flex; flex-direction: column; gap: 6px;">
              ${(t.arguments_against||[]).map(n=>`<li>${u(n)}</li>`).join("")}
            </ul>
          </div>
        </div>

        <!-- Potential Risks -->
        <div style="margin-bottom: 20px;">
          <h5 style="font-weight: 600; color: var(--text-primary); margin-bottom: 8px; font-family: var(--font-headline);">Litigation & Compliance Risks</h5>
          <ul style="padding-left: 20px; font-size: 0.8125rem; display: flex; flex-direction: column; gap: 4px;">
            ${(t.potential_risks||[]).map(n=>`<li>${u(n)}</li>`).join("")}
          </ul>
        </div>

        <!-- Research Conclusion -->
        <div style="margin-bottom: 20px; background: rgba(0,0,0,0.01); border: 1px solid var(--border); padding: 16px; border-radius: 8px;">
          <h5 style="margin-bottom: 6px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Concluding Opinion</h5>
          <p style="margin: 0; font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6;">${u(t.conclusion)}</p>
        </div>

        <!-- Actions -->
        <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 12px;">
          <button class="btn btn-secondary btn-sm" id="export-canvas-btn">📥 Export Memo</button>
          <button class="btn btn-primary btn-sm" id="save-workspace-btn">💾 Save Project</button>
        </div>

      </div>
    `;const a=(t.timeline||[]).map(n=>`
    <div style="display: flex; gap: 16px; border-left: 2px solid var(--border); padding-left: 16px; margin-left: 8px; padding-bottom: 12px; position: relative;">
      <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent); position: absolute; left: -5px; top: 6px;"></div>
      <div style="font-weight: 700; font-size: 0.8125rem; color: var(--accent); min-width: 45px;">${u(n.year)}</div>
      <div style="font-size: 0.75rem; color: var(--text-secondary);">${u(n.event)}</div>
    </div>
  `).join("");return`
    <div style="font-size: 0.875rem; line-height: 1.6;">
      
      <!-- Executive Summary / Analysis -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 12px; margin-bottom: 16px;">
        <h4 style="font-weight: 700; color: var(--text-primary); margin: 0; font-family: var(--font-headline);">Legal Analysis Summary</h4>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--text-secondary);">
          <span>Confidence:</span>
          <span style="font-weight: 700; color: var(--secondary);">${t.confidence_score||90}%</span>
        </div>
      </div>

      <div style="background: rgba(0,0,0,0.01); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 24px; color: var(--text-secondary);">
        ${t.analysis.replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>")}
      </div>

      <!-- Precedent Timeline -->
      ${a?`
        <div style="margin-bottom: 24px;">
          <h5 style="font-weight: 600; color: var(--text-primary); margin-bottom: 12px; font-family: var(--font-headline);">Judgment History & Timeline</h5>
          <div style="margin-top: 12px;">${a}</div>
        </div>
      `:""}

      <!-- Suggested questions -->
      ${(t.follow_ups||[]).length>0?`
        <div class="card" style="padding: 16px; background: rgba(0,0,0,0.01); margin-top: 16px;">
          <h5 style="margin-bottom: 8px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Suggested Queries</h5>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${t.follow_ups.map(n=>`
              <div class="recent-query-item" style="font-size: 0.75rem; padding: 6px 10px; cursor: pointer; color: var(--accent); background: transparent;" onclick="document.getElementById('research-query').value='${u(n).replace(/'/g,"\\'")}'; document.getElementById('research-query').focus();">
                👉 ${u(n)}
              </div>
            `).join("")}
          </div>
        </div>
      `:""}

      <!-- Actions -->
      <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 16px;">
        <button class="btn btn-secondary btn-sm" id="export-canvas-btn">📥 Export Summary</button>
        <button class="btn btn-primary btn-sm" id="save-workspace-btn">💾 Save Report</button>
      </div>

    </div>
  `}function at(e){const t=document.getElementById("inspector-placeholder"),a=document.getElementById("inspector-content");if(!t||!a)return;t.style.display="none",a.style.display="block";const n=e.judgments||[],i=e.acts||e.applicable_laws||[],s=it(n);a.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.8125rem;">
      
      <!-- Graph Network -->
      <div>
        <div style="font-weight: 600; margin-bottom: 8px; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; font-family: var(--font-headline);">Citation Connection Network</div>
        <div style="background: rgba(0,0,0,0.01); border: 1px solid var(--border); border-radius: 6px; padding: 12px; display: flex; flex-direction: column; align-items: center;">
          ${s}
        </div>
      </div>

      <!-- Acts list -->
      ${i.length>0?`
        <div>
          <div style="font-weight: 600; margin-bottom: 6px; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; font-family: var(--font-headline);">Statutes & Act Codes</div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${i.map(r=>`
              <div class="card" style="padding: 10px; margin: 0; border: 1px solid rgba(0,0,0,0.03);">
                <div style="font-weight: 600; color: var(--text-primary);">${u(r.name||r.act)}</div>
                <div class="badge badge-primary" style="margin-top: 4px; font-size: 0.625rem;">${u(r.section)}</div>
              </div>
            `).join("")}
          </div>
        </div>
      `:""}

      <!-- Cases cards -->
      ${n.length>0?`
        <div>
          <div style="font-weight: 600; margin-bottom: 6px; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; font-family: var(--font-headline);">Top Authorities</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${n.map(r=>{const o=r.strength||r.relevance||85,m=o>=90?"High":o>=70?"Medium":"Low",d=o>=90?"badge-success":"badge-primary";return`
                <div class="card card-interactive citation-card-item" data-case-title="${u(r.name)}" data-case-ratio="${u(r.snippet)}" style="padding: 12px; margin: 0; border: 1px solid rgba(0,0,0,0.03);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                    <div style="font-weight: 600; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 180px;">${u(r.name)}</div>
                    <span class="badge ${d}" style="font-size: 0.625rem;">${m}</span>
                  </div>
                  <div style="font-size: 0.6875rem; color: var(--text-secondary); margin-bottom: 6px;">${u(r.citation)} | ${u(r.court)}</div>
                  <div style="font-size: 0.6875rem; line-height: 1.5; color: var(--text-tertiary); max-height: 48px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                    ${u(r.snippet)}
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      `:""}

    </div>
  `,document.querySelectorAll(".citation-card-item").forEach(r=>{r.addEventListener("click",()=>{r.dataset.caseTitle;const o=r.dataset.caseRatio;p.info(`Precedent ratio: ${o}`,4e3)})})}function it(e){return!e||e.length===0?'<div class="text-xs text-muted">No graph connections</div>':`
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%; gap: 4px;">
      ${e.map((a,n)=>`
    <div style="display: flex; align-items: center; gap: 8px; width: 100%; border: 1px solid var(--border); padding: 6px 10px; border-radius: 4px; background: var(--bg-surface);">
      <span style="font-size: 0.75rem;">🏛️</span>
      <div style="flex: 1; overflow: hidden; font-size: 0.6875rem; font-weight: 500; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
        ${u(a.name)} (${a.year})
      </div>
    </div>
  `).join(`
    <div style="margin: 4px 0; display: flex; flex-direction: column; align-items: center;">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2V10M6 10L3 7M6 10L9 7" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  `)}
    </div>
  `}function st(e,t){var n,i;let a=`<h1>NyayaGPT Research Memorandum: ${u(e)}</h1><div class="meta">Confidence Score: ${t.confidence_score||90}%</div>`;return t.issue_summary&&(a+=`<div class="section"><div class="section-title">Issue Summary</div><p>${u(t.issue_summary)}</p></div>`),(n=t.applicable_laws)!=null&&n.length&&(a+='<div class="section"><div class="section-title">Applicable Laws</div>',t.applicable_laws.forEach(s=>{a+=`<p><strong>${u(s.act)} — ${u(s.section)}</strong><br>${u(s.description)}</p>`}),a+="</div>"),(i=t.judgments)!=null&&i.length&&(a+='<div class="section"><div class="section-title">Cited Authorities & Precedents</div>',t.judgments.forEach(s=>{a+=`<p><strong>${u(s.name)}</strong> (${u(s.citation)}) - ${u(s.court)}, ${s.year}<br>${u(s.snippet)}</p>`}),a+="</div>"),t.analysis&&(a+=`<div class="section"><div class="section-title">Analysis</div><p>${t.analysis.replace(/\n/g,"<br>")}</p></div>`),t.conclusion&&(a+=`<div class="section"><div class="section-title">Concluding Opinion</div><p>${u(t.conclusion)}</p></div>`),a}function u(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const de=[{id:"facts",label:"Facts",icon:"📋"},{id:"issues",label:"Issues",icon:"❓"},{id:"petitioner_arguments",label:"Petitioner Args",icon:"👤"},{id:"respondent_arguments",label:"Respondent Args",icon:"👥"},{id:"court_reasoning",label:"Reasoning",icon:"🧠"},{id:"verdict",label:"Verdict",icon:"⚖️"},{id:"key_takeaways",label:"Takeaways",icon:"💡"}];let rt=null;function ot(){return`
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>📄 Judgment Summarizer</h2>
        <p>Upload a court judgment and get a structured AI-powered summary.</p>
      </div>

      <div class="summarizer-layout">
        <!-- Upload Zone -->
        <div id="upload-section">
          <div class="file-dropzone" id="dropzone">
            <div class="file-dropzone-icon">📤</div>
            <h4>Upload Judgment</h4>
            <p>Drop a file here or click to browse</p>
            <p class="file-types">Supports: PDF, TXT, DOC (Max 10MB)</p>
            <input type="file" id="file-input" accept=".pdf,.txt,.doc,.docx" style="display:none" />
          </div>

          <div class="auth-divider" style="margin: 20px 0;"><span>or paste text</span></div>

          <div class="form-group">
            <textarea class="form-textarea" id="judgment-text" placeholder="Paste the judgment text here..." style="min-height: 200px;"></textarea>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 16px;">
            ${w()?'<span class="badge badge-success">API Connected</span>':'<span class="badge badge-warning">Demo Mode</span>'}
            <button class="btn btn-primary" id="summarize-btn" style="margin-left: auto;">
              <span id="summarize-btn-text">Summarize Judgment</span>
            </button>
          </div>
        </div>

        <!-- Processing -->
        <div id="processing-section" style="display: none;"></div>

        <!-- Results -->
        <div id="summary-result-section" style="display: none;"></div>
      </div>
    </div>
  `}function lt(){const e=document.getElementById("dropzone"),t=document.getElementById("file-input"),a=document.getElementById("judgment-text"),n=document.getElementById("summarize-btn");e==null||e.addEventListener("click",()=>t==null?void 0:t.click()),e==null||e.addEventListener("dragover",i=>{i.preventDefault(),e.classList.add("drag-over")}),e==null||e.addEventListener("dragleave",()=>e.classList.remove("drag-over")),e==null||e.addEventListener("drop",i=>{i.preventDefault(),e.classList.remove("drag-over");const s=i.dataTransfer.files[0];s&&ee(s,a,e)}),t==null||t.addEventListener("change",i=>{const s=i.target.files[0];s&&ee(s,a,e)}),n==null||n.addEventListener("click",()=>dt(a))}function ee(e,t,a){if(e.size>10*1024*1024){p.error("File too large. Maximum 10MB.");return}const n=e.name.split(".").pop().toLowerCase();if(n==="txt"){const i=new FileReader;i.onload=s=>{t.value=s.target.result,a.innerHTML=`
        <div class="file-dropzone-icon" style="background: rgba(0,184,148,0.1);">✓</div>
        <h4>${e.name}</h4>
        <p class="text-muted">${(e.size/1024).toFixed(1)} KB — Text extracted</p>
      `,p.success("File loaded successfully")},i.readAsText(e)}else if(n==="pdf"){const i=new FileReader;i.onload=()=>{t.value=`[PDF uploaded: ${e.name}]

Note: For best results with PDF files, please copy and paste the text content directly. Client-side PDF text extraction will be enhanced in the next update.`,a.innerHTML=`
        <div class="file-dropzone-icon" style="background: rgba(253,203,110,0.1);">📄</div>
        <h4>${e.name}</h4>
        <p class="text-muted">${(e.size/1024).toFixed(1)} KB — PDF uploaded</p>
        <p class="file-types">💡 Tip: Paste the text directly for best results</p>
      `,p.info("PDF uploaded. For best results, paste the text content directly.")},i.readAsArrayBuffer(e)}else p.warning("Please upload a PDF or TXT file")}async function dt(e){const t=e.value.trim();if(!t||t.length<100){p.warning("Please provide judgment text (minimum 100 characters)");return}const a=document.getElementById("summarize-btn"),n=document.getElementById("processing-section"),i=document.getElementById("summary-result-section");a.disabled=!0,document.getElementById("summarize-btn-text").textContent="Processing...",n.style.display="block",i.style.display="none",n.innerHTML=ct(),await pt();try{let s;w()?s=await Be(t):(await new Promise(r=>setTimeout(r,1500)),s=Ye(),p.info("Showing demo summary. Add your Gemini API key in Settings for live summarization.")),rt=s,l.incrementUsage("summaries"),l.logActivity("summary",`Summarized: ${s.title||"Judgment"}`,"📄"),n.style.display="none",i.style.display="block",i.innerHTML=mt(s),i.scrollIntoView({behavior:"smooth"}),ut(s),gt(s,t)}catch(s){p.error("Summarization failed: "+s.message),n.style.display="none"}finally{a.disabled=!1,document.getElementById("summarize-btn-text").textContent="Summarize Judgment"}}function ct(){return`
    <div class="card animate-fade-up" style="padding: 32px; text-align: center;">
      <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
      <h4 style="margin-bottom: 20px;">Analyzing Judgment</h4>
      <div class="processing-steps" style="max-width: 320px; margin: 0 auto; text-align: left;">
        <div class="processing-step active" id="step-1">
          <div class="processing-step-icon">📄</div>
          <span>Extracting text content</span>
        </div>
        <div class="processing-step pending" id="step-2">
          <div class="processing-step-icon">🔍</div>
          <span>Identifying key sections</span>
        </div>
        <div class="processing-step pending" id="step-3">
          <div class="processing-step-icon">🧠</div>
          <span>Analyzing arguments & reasoning</span>
        </div>
        <div class="processing-step pending" id="step-4">
          <div class="processing-step-icon">📋</div>
          <span>Generating structured summary</span>
        </div>
      </div>
    </div>
  `}async function pt(){for(let e=1;e<=4;e++){await new Promise(n=>setTimeout(n,600));const t=document.getElementById(`step-${e}`);t&&(t.classList.remove("active"),t.classList.add("completed"),t.querySelector(".processing-step-icon").textContent="✓");const a=document.getElementById(`step-${e+1}`);a&&(a.classList.remove("pending"),a.classList.add("active"))}}function mt(e){const t=de.map((a,n)=>`
    <button class="summary-tab ${n===0?"active":""}" data-tab="${a.id}">
      ${a.icon} ${a.label}
    </button>
  `).join("");return`
    <div class="summary-result animate-fade-up">
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border);">
        <div>
          <h4>${A(e.title||"Judgment Summary")}</h4>
          <p class="text-xs text-muted" style="margin-top: 4px;">${A(e.court||"")} ${e.date?"· "+A(e.date):""}</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" id="export-summary-btn">📥 Export</button>
          <button class="btn btn-primary btn-sm" id="save-summary-btn">💾 Save</button>
        </div>
      </div>
      <div class="summary-tabs">${t}</div>
      <div class="summary-content" id="summary-content">
        ${ce("facts",e)}
      </div>
    </div>
  `}function ce(e,t){const a=t[e];return a?Array.isArray(a)?`<ul>${a.map(n=>`<li>${A(n)}</li>`).join("")}</ul>`:`<p>${A(a)}</p>`:'<p class="text-muted">No data available for this section.</p>'}function ut(e){document.querySelectorAll(".summary-tab").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".summary-tab").forEach(n=>n.classList.remove("active")),t.classList.add("active");const a=document.getElementById("summary-content");a&&(a.innerHTML=ce(t.dataset.tab,e))})})}function gt(e,t){var a,n;(a=document.getElementById("save-summary-btn"))==null||a.addEventListener("click",()=>{l.saveDocument({type:"summary",title:e.title||"Judgment Summary",content:e}),p.success("Summary saved to library")}),(n=document.getElementById("export-summary-btn"))==null||n.addEventListener("click",()=>{let i=`<h1>${A(e.title||"Judgment Summary")}</h1>`;i+=`<div class="meta">${A(e.court||"")} ${e.date?"· "+A(e.date):""}</div>`,de.forEach(s=>{const r=e[s.id];r&&(i+=`<div class="section"><div class="section-title">${s.label}</div>`,Array.isArray(r)?i+=`<ul>${r.map(o=>`<li>${A(o)}</li>`).join("")}</ul>`:i+=`<p>${A(r)}</p>`,i+="</div>")}),D(i,e.title||"Judgment Summary",`summary_${Date.now()}.html`),p.success("Summary exported")})}function A(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const pe={legal_notice:"📋",nda:"🤝",employment:"👔",service_agreement:"🔧",partnership:"🤝",rent_agreement:"🏠"};let $=null,me=null;function yt(){return`
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>✍️ Legal Draft Generator</h2>
        <p>Select a template, fill the form, and generate a professional legal document.</p>
      </div>

      <h4 style="margin-bottom: 16px;">Choose Template</h4>
      <div class="template-grid" id="template-grid">
        ${oe().map(a=>`
    <div class="template-card" data-template="${a.id}" id="template-${a.id}">
      <div class="template-card-icon">${pe[a.id]||"📄"}</div>
      <h5>${a.name}</h5>
      <p>${a.fields.length} fields</p>
    </div>
  `).join("")}
      </div>

      <div id="draft-form-section" style="display: none;"></div>
      <div id="draft-preview-section" style="display: none;"></div>
    </div>
  `}function vt(){document.querySelectorAll(".template-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.template;ft(t)})})}function ft(e){var o,m,d;$=e,me=null,document.querySelectorAll(".template-card").forEach(c=>c.classList.remove("selected")),(o=document.getElementById(`template-${e}`))==null||o.classList.add("selected");const t=document.getElementById("draft-form-section"),a=document.getElementById("draft-preview-section");a.style.display="none";const n=le(e),s=oe().find(c=>c.id===e),r=n.map(c=>{const f=c.type==="textarea";let y;return c.type==="textarea"?y=`<textarea class="form-textarea" id="field-${c.name}" placeholder="${c.hint||""}" ${c.required?"required":""} rows="3"></textarea>`:c.type==="date"?y=`<input type="date" class="form-input" id="field-${c.name}" ${c.required?"required":""} />`:c.type==="number"?y=`<input type="number" class="form-input" id="field-${c.name}" ${c.required?"required":""} min="1" />`:y=`<input type="text" class="form-input" id="field-${c.name}" placeholder="${c.hint||""}" ${c.required?"required":""} />`,`
      <div class="form-group ${f?"full-width":""}">
        <label class="form-label">${c.label} ${c.required?"*":""}</label>
        ${y}
        ${c.hint&&c.type!=="textarea"?`<span class="form-hint">${c.hint}</span>`:""}
      </div>
    `}).join("");t.style.display="block",t.innerHTML=`
    <div class="draft-form animate-fade-up">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <h3>${pe[e]||"📄"} ${(s==null?void 0:s.name)||"Draft"}</h3>
        ${w()?'<span class="badge badge-success">API Connected</span>':'<span class="badge badge-warning">Demo Mode</span>'}
      </div>
      <form id="draft-generate-form">
        <div class="form-grid">
          ${r}
        </div>
        <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
          <button type="button" class="btn btn-secondary" id="clear-draft-btn">Clear</button>
          <button type="submit" class="btn btn-primary" id="generate-draft-btn">
            <span id="generate-btn-text">Generate Draft</span>
          </button>
        </div>
      </form>
    </div>
  `,t.scrollIntoView({behavior:"smooth"}),(m=document.getElementById("draft-generate-form"))==null||m.addEventListener("submit",c=>{c.preventDefault(),ht()}),(d=document.getElementById("clear-draft-btn"))==null||d.addEventListener("click",()=>{document.querySelectorAll("#draft-generate-form input, #draft-generate-form textarea").forEach(f=>{f.value=""})})}async function ht(){const e=le($),t={};let a=!0;if(e.forEach(i=>{var o;const s=document.getElementById(`field-${i.name}`),r=((o=s==null?void 0:s.value)==null?void 0:o.trim())||"";i.required&&!r?(a=!1,s!=null&&s.style&&(s.style.borderColor="var(--danger)")):s&&(s.style.borderColor=""),t[i.name]=r}),!a){p.warning("Please fill in all required fields");return}const n=document.getElementById("generate-draft-btn");n.disabled=!0,document.getElementById("generate-btn-text").textContent="Generating...";try{let i;w()?i=await je($,t):(await new Promise(s=>setTimeout(s,2e3)),i=xt($,t),p.info("Showing demo draft. Add your Gemini API key in Settings for live generation.")),me=i,l.incrementUsage("drafts"),l.logActivity("draft",`Generated: ${i.title||$}`,"✍️"),bt(i,t)}catch(i){p.error("Draft generation failed: "+i.message)}finally{n.disabled=!1,document.getElementById("generate-btn-text").textContent="Generate Draft"}}function bt(e,t){var n,i,s;const a=document.getElementById("draft-preview-section");a.style.display="block",a.innerHTML=`
    <div class="draft-preview animate-fade-up">
      <div class="draft-preview-header">
        <h4>${ne(e.title||"Legal Draft")}</h4>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-ghost btn-sm" id="copy-draft-btn">📋 Copy</button>
          <button class="btn btn-secondary btn-sm" id="export-draft-btn">📥 Export</button>
          <button class="btn btn-primary btn-sm" id="save-draft-btn">💾 Save</button>
        </div>
      </div>
      <div class="draft-preview-content" id="draft-content">
        ${te(e.content||e.raw||"")}
      </div>
    </div>
  `,a.scrollIntoView({behavior:"smooth"}),(n=document.getElementById("copy-draft-btn"))==null||n.addEventListener("click",()=>{navigator.clipboard.writeText(e.content||e.raw||""),p.success("Draft copied to clipboard")}),(i=document.getElementById("export-draft-btn"))==null||i.addEventListener("click",()=>{D(`<h1>${ne(e.title||"Legal Draft")}</h1>${te(e.content||e.raw||"")}`,e.title||"Legal Draft",`draft_${$}_${Date.now()}.html`),p.success("Draft exported")}),(s=document.getElementById("save-draft-btn"))==null||s.addEventListener("click",()=>{l.saveDocument({type:"draft",title:e.title||`${$} Draft`,content:e,metadata:{template:$,formData:t}}),p.success("Draft saved to library")})}function te(e){return e.replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>").replace(/^(\d+\.\s)/gm,"<strong>$1</strong>").replace(/^(WHEREAS|NOW THEREFORE|IN WITNESS WHEREOF)/gm,"<strong>$1</strong>")}function xt(e,t){const a=new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"});return{legal_notice:{title:"LEGAL NOTICE",content:`LEGAL NOTICE

Date: ${a}

To,
${t.recipient_name||"[Recipient]"}
${t.recipient_address||"[Address]"}

From,
${t.sender_name||"[Sender]"}
${t.sender_address||"[Address]"}

Subject: ${t.subject||"[Subject]"}

Dear Sir/Madam,

Under instructions from and on behalf of my client, ${t.sender_name||"[Client]"}, I hereby serve upon you the following Legal Notice:

1. FACTS AND BACKGROUND

${t.facts||"That my client states the following facts..."}

2. LEGAL BASIS

The above-mentioned acts/omissions on your part constitute a clear violation of the provisions of the Indian Contract Act, 1872, and other applicable laws. My client reserves the right to initiate appropriate civil and/or criminal proceedings.

3. DEMAND

${t.demand||"My client demands immediate compliance with the terms as stated herein."}

4. CONSEQUENCES OF NON-COMPLIANCE

Please note that if you fail to comply with the demands mentioned above within ${t.deadline_days||"15"} days from the receipt of this notice, my client shall be constrained to initiate appropriate legal proceedings before the competent court of law, at your risk, cost, and consequences.

5. RESERVATION OF RIGHTS

My client reserves the right to take additional legal action as may be necessary, including but not limited to filing of civil suit for recovery of damages and/or criminal complaint.

This notice is being sent without prejudice to any other rights and remedies available to my client under the law.

Yours faithfully,

[Advocate Name]
Advocate, High Court
On behalf of ${t.sender_name||"[Client]"}`},nda:{title:"NON-DISCLOSURE AGREEMENT",content:`NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${a}

BETWEEN:

1. ${t.disclosing_party||"[Disclosing Party]"} (hereinafter referred to as the "Disclosing Party")

AND

2. ${t.receiving_party||"[Receiving Party]"} (hereinafter referred to as the "Receiving Party")

Collectively referred to as the "Parties"

WHEREAS, the Parties wish to explore a business relationship concerning ${t.purpose||"[Purpose]"} and in connection therewith, may disclose to each other certain confidential and proprietary information.

NOW THEREFORE, in consideration of the mutual promises and covenants contained herein, the Parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION

Confidential Information shall mean all information disclosed by the Disclosing Party including but not limited to: ${t.confidential_info||"trade secrets, business plans, financial data, technical information, customer lists, and any other proprietary information"}.

2. OBLIGATIONS OF RECEIVING PARTY

The Receiving Party agrees to:
a) Hold all Confidential Information in strict confidence
b) Not disclose any Confidential Information to third parties without prior written consent
c) Use the Confidential Information solely for the purpose stated above
d) Take reasonable measures to protect the Confidential Information

3. EXCEPTIONS

This Agreement shall not apply to information that:
a) Is publicly available at the time of disclosure
b) Becomes publicly available through no fault of the Receiving Party
c) Is independently developed by the Receiving Party
d) Is required to be disclosed by law or court order

4. TERM

This Agreement shall remain in effect for a period of ${t.duration_years||"2"} years from the date of execution.

5. GOVERNING LAW AND JURISDICTION

This Agreement shall be governed by the laws of India and subject to the exclusive jurisdiction of the courts at ${t.jurisdiction||"[City]"}.

6. REMEDIES

The Parties acknowledge that any breach of this Agreement may cause irreparable harm and the Disclosing Party shall be entitled to seek injunctive relief in addition to any other legal remedies.

IN WITNESS WHEREOF, the Parties have executed this Agreement on the date first written above.

________________________          ________________________
${t.disclosing_party||"Disclosing Party"}          ${t.receiving_party||"Receiving Party"}`}}[e]||{title:"LEGAL DRAFT",content:`This is a demo draft for the ${e.replace(/_/g," ")} template.

To generate real drafts, please add your Gemini API key in Settings.

Details provided:
${Object.entries(t).map(([i,s])=>`${i.replace(/_/g," ")}: ${s}`).join(`
`)}`}}function ne(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const wt=[{id:"petition",label:"Petition",icon:"📑"},{id:"fir",label:"FIR",icon:"🚔"},{id:"agreement",label:"Agreement",icon:"📃"},{id:"legal_notice",label:"Legal Notice",icon:"📋"},{id:"contract",label:"Contract",icon:"📝"}];let B=null;function At(){return`
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>🔬 AI Case Analyzer</h2>
        <p>Upload a legal document for AI-powered risk analysis and insights.</p>
      </div>

      <div class="analyzer-upload">
        <h4 style="margin-bottom: 12px;">Document Type</h4>
        <div class="doc-type-selector">${wt.map(t=>`
    <button class="chip" data-doctype="${t.id}" id="doctype-${t.id}">
      ${t.icon} ${t.label}
    </button>
  `).join("")}</div>

        <div class="file-dropzone" id="analyzer-dropzone">
          <div class="file-dropzone-icon">📤</div>
          <h4>Upload Document</h4>
          <p>Drop a file here or click to browse</p>
          <p class="file-types">Supports: PDF, TXT (Max 10MB)</p>
          <input type="file" id="analyzer-file-input" accept=".pdf,.txt" style="display:none" />
        </div>

        <div class="auth-divider" style="margin: 20px 0;"><span>or paste text</span></div>

        <div class="form-group">
          <textarea class="form-textarea" id="analyzer-text" placeholder="Paste the document text here..." style="min-height: 180px;"></textarea>
        </div>

        <div style="display: flex; gap: 12px; align-items: center; margin-top: 16px;">
          ${w()?'<span class="badge badge-success">API Connected</span>':'<span class="badge badge-warning">Demo Mode</span>'}
          <button class="btn btn-primary" id="analyze-btn" style="margin-left: auto;">
            <span id="analyze-btn-text">Analyze Document</span>
          </button>
        </div>
      </div>

      <div id="analysis-loading" style="display: none;"></div>
      <div id="analysis-report" style="display: none;"></div>
    </div>
  `}function St(){var n;document.querySelectorAll("[data-doctype]").forEach(i=>{i.addEventListener("click",()=>{B=i.dataset.doctype,document.querySelectorAll("[data-doctype]").forEach(s=>s.classList.remove("active")),i.classList.add("active")})});const e=document.getElementById("analyzer-dropzone"),t=document.getElementById("analyzer-file-input"),a=document.getElementById("analyzer-text");e==null||e.addEventListener("click",()=>t==null?void 0:t.click()),e==null||e.addEventListener("dragover",i=>{i.preventDefault(),e.classList.add("drag-over")}),e==null||e.addEventListener("dragleave",()=>e.classList.remove("drag-over")),e==null||e.addEventListener("drop",i=>{i.preventDefault(),e.classList.remove("drag-over");const s=i.dataTransfer.files[0];s&&ae(s,a,e)}),t==null||t.addEventListener("change",i=>{const s=i.target.files[0];s&&ae(s,a,e)}),(n=document.getElementById("analyze-btn"))==null||n.addEventListener("click",()=>Et(a))}function ae(e,t,a){if(e.size>10*1024*1024){p.error("File too large. Maximum 10MB.");return}if(e.name.split(".").pop().toLowerCase()==="txt"){const i=new FileReader;i.onload=s=>{t.value=s.target.result,a.innerHTML=`
        <div class="file-dropzone-icon" style="background:rgba(0,184,148,0.1);">✓</div>
        <h4>${e.name}</h4>
        <p class="text-muted">${(e.size/1024).toFixed(1)} KB loaded</p>
      `,p.success("File loaded")},i.readAsText(e)}else a.innerHTML=`
      <div class="file-dropzone-icon" style="background:rgba(253,203,110,0.1);">📄</div>
      <h4>${e.name}</h4>
      <p class="text-muted">💡 Paste text directly for best results</p>
    `,p.info("For best results, paste the document text directly")}async function Et(e){const t=e.value.trim();if(!t||t.length<50){p.warning("Please provide document text (minimum 50 characters)");return}if(!B){p.warning("Please select a document type");return}const a=document.getElementById("analyze-btn"),n=document.getElementById("analysis-loading"),i=document.getElementById("analysis-report");a.disabled=!0,document.getElementById("analyze-btn-text").textContent="Analyzing...",n.style.display="block",i.style.display="none",n.innerHTML=`
    <div class="card animate-fade-up" style="padding: 40px; text-align: center;">
      <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
        <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
      </div>
      <p class="text-muted">Analyzing document for risks and issues...</p>
    </div>
  `;try{let s;w()?s=await Ge(t,B):(await new Promise(r=>setTimeout(r,2500)),s=Je(),p.info("Showing demo analysis. Add Gemini API key in Settings for live analysis.")),l.incrementUsage("analyses"),l.logActivity("analysis",`Analyzed: ${B}`,"🔬"),n.style.display="none",i.style.display="block",i.innerHTML=It(s),i.scrollIntoView({behavior:"smooth"}),$t(s)}catch(s){p.error("Analysis failed: "+s.message),n.style.display="none"}finally{a.disabled=!1,document.getElementById("analyze-btn-text").textContent="Analyze Document"}}function It(e){const t=e.overall_risk_score>=70?"var(--danger)":e.overall_risk_score>=40?"var(--warning)":"var(--secondary)",a=e.overall_risk_score>=70?"High Risk":e.overall_risk_score>=40?"Medium Risk":"Low Risk",n=2*Math.PI*60,i=n-e.overall_risk_score/100*n,s=(e.key_facts||[]).map(d=>`<div class="fact-item"><span>•</span><span>${h(d)}</span></div>`).join(""),r=(e.risks||[]).map(d=>`<div class="risk-item">
      <div class="risk-dot ${d.level}"></div>
      <div class="risk-item-content">
        <h5>${h(d.title)}</h5>
        <p>${h(d.description)}</p>
      </div>
    </div>`).join(""),o=(e.missing_clauses||[]).map(d=>`<div class="clause-item"><span>⚠️</span><div><strong>${h(d.clause)}</strong><br><span class="text-xs text-muted">${h(d.importance)}</span></div></div>`).join(""),m=(e.legal_issues||[]).map(d=>`<div class="issue-item"><span>ℹ️</span><div><strong>${h(d.issue)}</strong><br><span class="text-xs text-muted">${h(d.explanation)}</span></div></div>`).join("");return`
    <div class="animate-fade-up">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <h3>Analysis Report</h3>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" id="export-analysis-btn">📥 Export</button>
          <button class="btn btn-primary btn-sm" id="save-analysis-btn">💾 Save</button>
        </div>
      </div>

      <!-- Risk Score -->
      <div class="analysis-card risk-score-card" style="margin-bottom: 20px;">
        <div class="risk-gauge">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle class="risk-gauge-track" cx="80" cy="80" r="60" />
            <circle class="risk-gauge-fill" cx="80" cy="80" r="60" stroke="${t}"
              stroke-dasharray="${n}" stroke-dashoffset="${i}"
              style="transition: stroke-dashoffset 1.5s ease;" />
          </svg>
          <div class="risk-gauge-center">
            <div class="risk-gauge-value" style="color: ${t};">${e.overall_risk_score}</div>
            <div class="risk-gauge-label">${a}</div>
          </div>
        </div>
        <div style="text-align: left; max-width: 400px;">
          <h4 style="margin-bottom: 8px;">Overall Assessment</h4>
          <p class="text-muted text-sm" style="line-height: 1.7;">${h(e.recommendation||"")}</p>
        </div>
      </div>

      <div class="analysis-report">
        <!-- Key Facts -->
        <div class="analysis-card">
          <h4>📋 Key Facts</h4>
          ${s||'<p class="text-muted">No key facts identified.</p>'}
        </div>

        <!-- Risks -->
        <div class="analysis-card">
          <h4>⚠️ Risk Assessment</h4>
          ${r||'<p class="text-muted">No risks identified.</p>'}
        </div>

        <!-- Missing Clauses -->
        <div class="analysis-card">
          <h4>📝 Missing Clauses</h4>
          ${o||'<p class="text-muted">No missing clauses identified.</p>'}
        </div>

        <!-- Legal Issues -->
        <div class="analysis-card">
          <h4>⚖️ Legal Issues</h4>
          ${m||'<p class="text-muted">No legal issues identified.</p>'}
        </div>
      </div>
    </div>
  `}function $t(e){var t,a;(t=document.getElementById("save-analysis-btn"))==null||t.addEventListener("click",()=>{l.saveDocument({type:"analysis",title:`${e.document_type||"Document"} Analysis`,content:e}),p.success("Analysis saved to library")}),(a=document.getElementById("export-analysis-btn"))==null||a.addEventListener("click",()=>{let n="<h1>Case Analysis Report</h1>";n+=`<div class="meta">Document Type: ${h(e.document_type||"Unknown")} | Risk Score: ${e.overall_risk_score}/100</div>`,n+='<div class="section"><div class="section-title">Key Facts</div><ul>',(e.key_facts||[]).forEach(i=>{n+=`<li>${h(i)}</li>`}),n+="</ul></div>",n+='<div class="section"><div class="section-title">Risk Assessment</div>',(e.risks||[]).forEach(i=>{n+=`<p><span class="risk-${i.level}">[${i.level.toUpperCase()}]</span> <strong>${h(i.title)}</strong> — ${h(i.description)}</p>`}),n+="</div>",n+='<div class="section"><div class="section-title">Missing Clauses</div><ul>',(e.missing_clauses||[]).forEach(i=>{n+=`<li><strong>${h(i.clause)}</strong>: ${h(i.importance)}</li>`}),n+="</ul></div>",n+='<div class="section"><div class="section-title">Recommendation</div>',n+=`<p>${h(e.recommendation||"")}</p></div>`,D(n,"Case Analysis Report",`analysis_${Date.now()}.html`),p.success("Analysis exported")})}function h(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}function kt({title:e,content:t,footer:a,maxWidth:n="540px"}){const i=document.getElementById("modal-container");if(!i)return;i.innerHTML=`
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal" style="max-width: ${n}">
        <div class="modal-header">
          <h3>${e}</h3>
          <button class="modal-close" id="modal-close-btn">✕</button>
        </div>
        <div class="modal-body">${t}</div>
        ${`<div class="modal-footer">${a}</div>`}
      </div>
    </div>
  `,requestAnimationFrame(()=>{const m=document.getElementById("modal-overlay");m&&m.classList.add("visible")});const s=document.getElementById("modal-close-btn"),r=document.getElementById("modal-overlay"),o=()=>{r.classList.remove("visible"),setTimeout(()=>{i.innerHTML=""},200)};return s.addEventListener("click",o),r.addEventListener("click",m=>{m.target===r&&o()}),document.addEventListener("keydown",function m(d){d.key==="Escape"&&(o(),document.removeEventListener("keydown",m))}),o}function O(e,t="Confirm"){return new Promise(a=>{const n=kt({title:t,content:`<p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.6;">${e}</p>`,footer:`
        <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="modal-confirm">Confirm</button>
      `});setTimeout(()=>{var i,s;(i=document.getElementById("modal-cancel"))==null||i.addEventListener("click",()=>{n(),a(!1)}),(s=document.getElementById("modal-confirm"))==null||s.addEventListener("click",()=>{n(),a(!0)})},50)})}const ue={research:{icon:"🔍",label:"Research",badgeClass:"badge-primary"},summary:{icon:"📄",label:"Summary",badgeClass:"badge-success"},draft:{icon:"✍️",label:"Draft",badgeClass:"badge-warning"},analysis:{icon:"🔬",label:"Analysis",badgeClass:"badge-danger"}};let j="all",T="";function Ct(){return`
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
  `}function Lt(){var e;q(),document.querySelectorAll("[data-filter]").forEach(t=>{t.addEventListener("click",()=>{j=t.dataset.filter,document.querySelectorAll("[data-filter]").forEach(a=>a.classList.remove("active")),t.classList.add("active"),q()})}),(e=document.getElementById("library-search-input"))==null||e.addEventListener("input",t=>{T=t.target.value.trim().toLowerCase(),q()})}function q(){const e=document.getElementById("library-content");if(!e)return;let t=l.getDocuments();if(j!=="all"&&(t=t.filter(n=>n.type===j)),T&&(t=t.filter(n=>{var i,s;return((i=n.title)==null?void 0:i.toLowerCase().includes(T))||((s=n.type)==null?void 0:s.toLowerCase().includes(T))})),t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">📁</div>
        <h4>No documents found</h4>
        <p>${j!=="all"?"No documents in this category.":T?"Try a different search term.":"Start using NyayaGPT to build your document library."}</p>
        <div style="display: flex; gap: 12px; justify-content: center; margin-top: 16px;">
          <a href="#/research" class="btn btn-primary btn-sm">🔍 Start Research</a>
          <a href="#/drafts" class="btn btn-secondary btn-sm">✍️ Create Draft</a>
        </div>
      </div>
    `;return}const a=t.map(n=>{var s;const i=ue[n.type]||{icon:"📄",label:n.type,badgeClass:"badge-info"};return`
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2rem;">${i.icon}</span>
            <div>
              <div style="font-weight: 500;">${L(n.title||"Untitled")}</div>
              <div class="text-xs text-muted">${(s=n.id)==null?void 0:s.slice(0,8)}</div>
            </div>
          </div>
        </td>
        <td><span class="badge ${i.badgeClass}">${i.label}</span></td>
        <td class="text-muted text-sm">${W(n.createdAt)}</td>
        <td>
          <div style="display: flex; gap: 4px;">
            <button class="btn btn-ghost btn-sm btn-icon" title="Export" data-export="${n.id}">📥</button>
            <button class="btn btn-ghost btn-sm btn-icon" title="Delete" data-delete="${n.id}" style="color: var(--danger);">🗑</button>
          </div>
        </td>
      </tr>
    `}).join("");e.innerHTML=`
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
        <tbody>${a}</tbody>
      </table>
    </div>
    <p class="text-xs text-muted" style="margin-top: 12px;">${t.length} document${t.length!==1?"s":""}</p>
  `,e.querySelectorAll("[data-export]").forEach(n=>{n.addEventListener("click",()=>{const i=t.find(s=>s.id===n.dataset.export);i&&Pt(i)})}),e.querySelectorAll("[data-delete]").forEach(n=>{n.addEventListener("click",async()=>{await O("Are you sure you want to delete this document? This cannot be undone.")&&(Tt(n.dataset.delete),q(),p.success("Document deleted"))})})}function Pt(e){const t=ue[e.type]||{label:"Document"};let a=`<h1>${L(e.title||"Document")}</h1>`;a+=`<div class="meta">Type: ${t.label} | Created: ${new Date(e.createdAt).toLocaleDateString("en-IN")}</div>`;const n=e.content;typeof n=="string"?a+=`<p>${L(n)}</p>`:n&&Object.entries(n).forEach(([i,s])=>{i!=="raw"&&(a+=`<div class="section"><div class="section-title">${i.replace(/_/g," ")}</div>`,Array.isArray(s)?a+=`<ul>${s.map(r=>`<li>${L(typeof r=="object"?JSON.stringify(r):r)}</li>`).join("")}</ul>`:typeof s=="object"?a+=`<pre>${L(JSON.stringify(s,null,2))}</pre>`:a+=`<p>${L(String(s))}</p>`,a+="</div>")}),D(a,e.title||"Document",`${e.type}_${Date.now()}.html`),p.success("Document exported")}function Tt(e){const t=l.getDocuments().filter(a=>a.id!==e);l.set("documents",t)}function L(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const _t=[{id:"profile",label:"Profile",icon:"👤"},{id:"api",label:"API Keys",icon:"🔑"},{id:"plan",label:"Subscription",icon:"💎"},{id:"data",label:"Data & Privacy",icon:"🔒"}];let P="profile";function Dt(){return`
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>⚙️ Settings</h2>
        <p>Manage your profile, API keys, and subscription.</p>
      </div>

      <div class="settings-layout">
        <nav class="settings-nav">${_t.map(t=>`
    <button class="settings-nav-item ${t.id===P?"active":""}" data-settings-tab="${t.id}">
      <span>${t.icon}</span> ${t.label}
    </button>
  `).join("")}</nav>
        <div class="settings-content" id="settings-content">
          ${ge(P)}
        </div>
      </div>
    </div>
  `}function Rt(){document.querySelectorAll("[data-settings-tab]").forEach(e=>{e.addEventListener("click",()=>{P=e.dataset.settingsTab,document.querySelectorAll("[data-settings-tab]").forEach(a=>a.classList.remove("active")),e.classList.add("active");const t=document.getElementById("settings-content");t&&(t.innerHTML=ge(P),_(P))})}),_(P)}function ge(e){switch(e){case"profile":return Nt();case"api":return U();case"plan":return ye();case"data":return Mt();default:return""}}function Nt(){const e=l.getUser()||{};return`
    <div class="settings-section">
      <h4>Personal Information</h4>
      <p>Update your profile details.</p>
      <form id="profile-form" class="settings-form-grid">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" id="settings-name" value="${G(e.name||"")}" />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="settings-email" value="${G(e.email||"")}" />
        </div>
        <div class="form-group">
          <label class="form-label">Role</label>
          <select class="form-select" id="settings-role">
            <option value="lawyer" ${e.role==="lawyer"?"selected":""}>Independent Lawyer</option>
            <option value="law_firm" ${e.role==="law_firm"?"selected":""}>Law Firm Associate</option>
            <option value="student" ${e.role==="student"?"selected":""}>Law Student</option>
            <option value="researcher" ${e.role==="researcher"?"selected":""}>Legal Researcher</option>
            <option value="founder" ${e.role==="founder"?"selected":""}>Startup Founder</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Bar Council No. (Optional)</label>
          <input type="text" class="form-input" id="settings-barcouncil" value="${G(e.barCouncil||"")}" placeholder="e.g., D/1234/2020" />
        </div>
      </form>
      <div style="margin-top: 20px;">
        <button class="btn btn-primary" id="save-profile-btn">Save Changes</button>
      </div>
    </div>
  `}function U(){const e=l.get("gemini_api_key",""),t=e?e.slice(0,8)+"•".repeat(20)+e.slice(-4):"";return`
    <div class="settings-section">
      <h4>🔑 Gemini API Key</h4>
      <p>NyayaGPT uses Google Gemini AI for legal research, summarization, and draft generation. You can get a free API key from Google AI Studio.</p>

      <div style="margin-top: 20px;">
        <div class="form-group" style="max-width: 500px;">
          <label class="form-label">API Key</label>
          <div style="display: flex; gap: 8px;">
            <input type="password" class="form-input" id="api-key-input" value="${G(e)}" placeholder="Enter your Gemini API key..." style="flex: 1;" />
            <button class="btn btn-primary" id="save-api-key-btn">Save</button>
          </div>
          ${e?`<span class="form-hint" style="color: var(--secondary);">✓ API key configured: ${t}</span>`:'<span class="form-hint">No API key set — running in demo mode</span>'}
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
          ${w()?'<div style="width: 10px; height: 10px; border-radius: 50%; background: var(--secondary); box-shadow: 0 0 8px rgba(0,184,148,0.5);"></div><span style="color: var(--secondary);">Connected</span>':'<div style="width: 10px; height: 10px; border-radius: 50%; background: var(--warning);"></div><span style="color: var(--warning);">Demo Mode (no API key)</span>'}
        </div>
      </div>
    </div>
  `}function ye(){const t=(l.getUser()||{}).plan||"free";return`
    <div class="settings-section">
      <h4>Subscription Plan</h4>
      <p>Manage your NyayaGPT subscription.</p>

      ${[{id:"free",name:"Free",price:"₹0/mo",desc:"5 queries/day, 3 summaries/month",current:t==="free"},{id:"pro",name:"Pro Lawyer",price:"₹999/mo",desc:"Unlimited everything + PDF export",current:t==="pro"},{id:"firm",name:"Law Firm",price:"₹4,999/mo",desc:"10 team members + API access",current:t==="firm"}].map(n=>`
        <div class="plan-card" style="${n.current?"border-color: var(--primary);":""}">
          <div class="plan-info">
            <h5>${n.name} ${n.current?'<span class="badge badge-primary">Current</span>':""}</h5>
            <p>${n.desc}</p>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 700; font-size: 1.125rem;">${n.price}</span>
            ${n.current?"":`<button class="btn btn-outline btn-sm" data-switch-plan="${n.id}">Switch</button>`}
          </div>
        </div>
      `).join("")}

      <div style="margin-top: 24px; padding: 16px; background: rgba(108,92,231,0.05); border-radius: var(--radius-sm); border: 1px solid rgba(108,92,231,0.15);">
        <p class="text-sm text-muted">💡 Payments will be processed via Razorpay in the next update. For now, all features are accessible for testing.</p>
      </div>
    </div>
  `}function Mt(){const e=l.getDocuments(),t=l.getResearchHistory();return`
    <div class="settings-section">
      <h4>Data & Privacy</h4>
      <p>Your data is stored locally in your browser. Nothing is sent to our servers.</p>

      <div style="margin-top: 20px;">
        <div class="plan-card">
          <div class="plan-info">
            <h5>Local Storage</h5>
            <p>${e.length} documents · ${t.length} research queries</p>
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
  `}function _(e){var t,a,n,i,s;switch(e){case"profile":(t=document.getElementById("save-profile-btn"))==null||t.addEventListener("click",()=>{var o,m,d,c,f,y,k;const r=l.getUser()||{};r.name=((m=(o=document.getElementById("settings-name"))==null?void 0:o.value)==null?void 0:m.trim())||r.name,r.email=((c=(d=document.getElementById("settings-email"))==null?void 0:d.value)==null?void 0:c.trim())||r.email,r.role=((f=document.getElementById("settings-role"))==null?void 0:f.value)||r.role,r.barCouncil=((k=(y=document.getElementById("settings-barcouncil"))==null?void 0:y.value)==null?void 0:k.trim())||"",l.setUser(r),p.success("Profile updated")});break;case"api":(a=document.getElementById("save-api-key-btn"))==null||a.addEventListener("click",()=>{var o,m;const r=(m=(o=document.getElementById("api-key-input"))==null?void 0:o.value)==null?void 0:m.trim();if(r){l.set("gemini_api_key",r),p.success("API key saved! AI features are now live.");const d=document.getElementById("settings-content");d&&(d.innerHTML=U(),_("api"))}else{l.remove("gemini_api_key"),p.info("API key removed. Running in demo mode.");const d=document.getElementById("settings-content");d&&(d.innerHTML=U(),_("api"))}});break;case"plan":document.querySelectorAll("[data-switch-plan]").forEach(r=>{r.addEventListener("click",()=>{const o=l.getUser()||{};o.plan=r.dataset.switchPlan,l.setUser(o),p.success(`Switched to ${o.plan} plan`);const m=document.getElementById("settings-content");m&&(m.innerHTML=ye(),_("plan"))})});break;case"data":(n=document.getElementById("export-all-data-btn"))==null||n.addEventListener("click",()=>{const r={user:l.getUser(),documents:l.getDocuments(),research:l.getResearchHistory(),activity:l.getActivity(),usage:l.getUsage(),exportedAt:new Date().toISOString()},o=new Blob([JSON.stringify(r,null,2)],{type:"application/json"}),m=URL.createObjectURL(o),d=document.createElement("a");d.href=m,d.download=`nyayagpt_backup_${Date.now()}.json`,d.click(),URL.revokeObjectURL(m),p.success("Data exported")}),(i=document.getElementById("clear-all-data-btn"))==null||i.addEventListener("click",async()=>{if(await O("This will delete ALL your documents, research history, and settings. This cannot be undone.")){const o=l.getUser(),m=l.get("gemini_api_key");l.clear(),o&&l.setUser(o),m&&l.set("gemini_api_key",m),p.success("All data cleared")}}),(s=document.getElementById("delete-account-btn"))==null||s.addEventListener("click",async()=>{await O("⚠️ This will permanently delete your account and ALL associated data. Are you absolutely sure?")&&(l.clear(),p.success("Account deleted"),window.location.hash="/")});break}}function G(e){return e.replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const zt=["Public Interest Litigation Admissibility","Admissibility of electronic evidence in criminal trial","Enforceability of non-compete clauses in employment contracts","Scope of judicial review in arbitration awards","Applicability of Section 300 Clause 4 IPC"];function Bt(){return`
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>⚖️ Precedent & Citation Finder</h2>
        <p>Input a legal issue, statute, or case name to identify leading precedents, citation counts, and visual citation graphs.</p>
      </div>

      <div class="research-input-container">
        <div class="research-input-box">
          <textarea class="research-textarea" id="citation-query" placeholder="Enter a legal issue, statute, or precedent case... e.g. 'Admissibility of tape-recorded conversation as evidence'" rows="3"></textarea>
          <div class="research-input-footer">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="text-xs text-muted">⚡ Citation Analyzer</span>
              ${w()?'<span class="badge badge-success">API Connected</span>':'<span class="badge badge-warning">Demo Mode</span>'}
            </div>
            <button class="btn btn-primary" id="find-citations-btn">
              <span id="find-btn-text">Find Precedents</span>
            </button>
          </div>
        </div>
        <div class="suggested-queries">
          ${zt.map(e=>`<button class="chip" data-issue="${e}">${e}</button>`).join("")}
        </div>
      </div>

      <div id="citation-results"></div>
    </div>
  `}function jt(){const e=document.getElementById("find-citations-btn"),t=document.getElementById("citation-query"),a=document.getElementById("citation-results");e&&e.addEventListener("click",()=>ie(t,a,e)),t&&t.addEventListener("keydown",n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),ie(t,a,e))}),document.querySelectorAll("[data-issue]").forEach(n=>{n.addEventListener("click",()=>{t.value=n.dataset.issue,t.focus()})})}async function ie(e,t,a){var i,s;const n=e.value.trim();if(!n){p.warning("Please enter a legal issue or case");return}a.disabled=!0,document.getElementById("find-btn-text").textContent="Analyzing...",t.innerHTML=qt();try{let r;w()?r=await He(n):(await new Promise(o=>setTimeout(o,2e3)),r=Ke(),p.info("Showing demo precedents. Input your Gemini API key in Settings for live lookup.")),l.incrementUsage("analyses"),l.logActivity("citation",`Citation Find: ${n.slice(0,50)}...`,"⚖️"),t.innerHTML=Gt(n,r),t.scrollIntoView({behavior:"smooth",block:"start"}),(i=document.getElementById("save-citation-btn"))==null||i.addEventListener("click",()=>{l.saveDocument({type:"citation",title:`Citations: ${n}`,content:r}),p.success("Citation report saved to library")}),(s=document.getElementById("export-citation-btn"))==null||s.addEventListener("click",()=>{J(()=>Promise.resolve().then(()=>Y),void 0).then(o=>{o.downloadAsHTML(Ht(n,r),`Citation Report: ${n}`,`citations_${Date.now()}.html`)})})}catch(r){p.error("Search failed: "+r.message),t.innerHTML=""}finally{a.disabled=!1,document.getElementById("find-btn-text").textContent="Find Precedents"}}function qt(){return`
    <div class="result-section animate-fade-up" style="padding: 40px; text-align: center;">
      <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
      <p class="text-muted">Analyzing citation network and calculating authority scores...</p>
    </div>
  `}function Gt(e,t){const a=(t.judgments||[]).map(i=>{const s=i.citation_strength==="High"?"badge-success":i.citation_strength==="Medium"?"badge-primary":"badge-secondary";return`
      <div class="judgment-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
          <div class="case-name" style="margin: 0; font-size: 1.0625rem;">${x(i.name)}</div>
          <span class="badge ${s}">${x(i.citation_strength)} Authority</span>
        </div>
        <div class="case-meta" style="margin-bottom: 12px;">
          <span>📌 ${x(i.citation)}</span>
          <span>🏛️ ${x(i.court)}</span>
          <span>📅 ${i.year}</span>
          <span>🔥 Cited ${i.citation_count} times</span>
        </div>
        <div class="case-snippet" style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: 6px; border-left: 3px solid var(--primary);">
          ${x(i.snippet)}
        </div>
      </div>
    `}).join("");return`
    <div class="research-results animate-fade-up">
      <div class="result-section">
        <div class="result-section-header">
          <span class="icon">🕸️</span> Citation Network Graph
        </div>
        <div class="result-section-content" style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 24px; display: flex; flex-direction: column; align-items: center; border: 1px solid rgba(255,255,255,0.05);">
          ${Ft(t.graph)}
        </div>
      </div>

      <div class="result-section">
        <div class="result-section-header">
          <span class="icon">⚖️</span> Top Precedents & Authorities
        </div>
        <div class="result-section-content">${a}</div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px;">
        <button class="btn btn-secondary btn-sm" id="export-citation-btn">📥 Export Report</button>
        <button class="btn btn-primary btn-sm" id="save-citation-btn">💾 Save to Library</button>
      </div>
    </div>
  `}function Ft(e){return!e||!e.nodes||!e.nodes.length?'<div class="text-muted">No connection data available</div>':`
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
      <div style="font-size: 0.8125rem; font-weight: 500; color: var(--text-secondary); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Hierarchy Citation Flow</div>
      <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        ${e.nodes.map(a=>{let n="⚖️";return a.type==="supreme_court"?n="🏛️ SC":a.type==="high_court"&&(n="🏛️ HC"),`
      <div class="card" style="padding: 12px; border-radius: 8px; width: 100%; max-width: 320px; background: var(--bg-secondary); border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--primary); margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          <span>${n}</span>
        </div>
        <div style="font-weight: 500; font-size: 0.875rem; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
          ${x(a.label)}
        </div>
      </div>
    `}).join(`
    <div style="margin: 12px 0; display: flex; flex-direction: column; align-items: center;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4V20M12 20L6 14M12 20L18 14" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="text-xs text-muted" style="margin-top: 4px;">cites precedent</div>
    </div>
  `)}
      </div>
    </div>
  `}function Ht(e,t){var n;let a=`<h1>Citation Report: ${x(e)}</h1><div class="meta">Generated by NyayaGPT</div>`;return(n=t.judgments)!=null&&n.length&&(a+='<div class="section"><div class="section-title">Top Authority Precedents</div>',t.judgments.forEach(i=>{a+=`<p><strong>${x(i.name)}</strong> — <em>${x(i.citation)}</em> (${x(i.court)}, ${i.year})<br><strong>Strength:</strong> ${x(i.citation_strength)} | <strong>Cited count:</strong> ${i.citation_count}<br>${x(i.snippet)}</p>`}),a+="</div>"),a}function x(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Ot(){const e=l.getDocuments();return`
    <div class="page-content animate-fade-up" style="height: calc(100vh - 100px); display: flex; flex-direction: column; padding: 24px;">
      <div class="page-header" style="margin-bottom: 16px;">
        <h2>💼 Interactive Legal Workspace</h2>
        <p>Compile summaries, citation details, and custom drafts into a master project folder.</p>
      </div>

      <div class="workspace-layout" style="flex: 1; display: grid; grid-template-columns: 280px 1fr 1fr; gap: 20px; overflow: hidden; min-height: 0;">
        
        <!-- Column 1: Assets selector -->
        <div class="card" style="padding: 16px; display: flex; flex-direction: column; overflow: hidden;">
          <h4 style="margin-bottom: 12px; font-size: 0.9375rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Workspace Assets</h4>
          <div style="font-size: 0.8125rem; margin-bottom: 12px; color: var(--text-muted);">Select files from your Library to pin to this session:</div>
          <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;" id="workspace-asset-list">
            ${e.length===0?`
              <div style="padding: 24px 8px; text-align: center; color: var(--text-muted); font-size: 0.875rem;">
                No library files found.<br>Save some research or summaries first!
              </div>
            `:e.map(t=>`
              <div class="card card-interactive workspace-asset-item" data-asset-id="${t.id}" style="padding: 10px; margin: 0; display: flex; align-items: center; gap: 8px; cursor: pointer; border: 1px solid rgba(255,255,255,0.03);">
                <span style="font-size: 1.125rem;">${t.type==="research"?"🔍":t.type==="summary"?"📄":t.type==="draft"?"✍️":"⚖️"}</span>
                <div style="flex: 1; overflow: hidden;">
                  <div style="font-weight: 500; font-size: 0.8125rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${v(t.title)}</div>
                  <div style="font-size: 0.6875rem; color: var(--text-muted); text-transform: capitalize;">${t.type}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Column 2: Selected Asset Details Pane -->
        <div class="card" style="padding: 16px; display: flex; flex-direction: column; overflow: hidden;">
          <h4 style="margin-bottom: 12px; font-size: 0.9375rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Asset Inspector</h4>
          <div id="inspector-placeholder" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--text-muted); padding: 20px;">
            <span style="font-size: 2rem; margin-bottom: 12px;">🔍</span>
            <div style="font-size: 0.875rem; font-weight: 500;">No File Selected</div>
            <div style="font-size: 0.75rem; max-width: 180px; margin-top: 4px;">Click any pinned library file on the left to inspect its contents.</div>
          </div>
          <div id="inspector-content" style="flex: 1; overflow-y: auto; display: none; padding-right: 4px;"></div>
        </div>

        <!-- Column 3: Scratchpad Document Draft -->
        <div class="card" style="padding: 16px; display: flex; flex-direction: column; overflow: hidden; border-left: 2px solid rgba(108,92,231,0.2);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="margin: 0; font-size: 0.9375rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Master Draft</h4>
            <button class="btn btn-primary btn-sm" id="workspace-export-btn">📥 Export Master</button>
          </div>
          <textarea id="master-scratchpad" placeholder="Start drafting your petition, legal advice, or brief here... Copy notes or ratios from the asset inspector on the left and paste them here." style="flex: 1; background: rgba(0,0,0,0.15); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; font-family: 'Inter', sans-serif; font-size: 0.875rem; line-height: 1.6; resize: none; outline: none;"></textarea>
        </div>

      </div>
    </div>
  `}function Ut(){var t;const e=document.getElementById("master-scratchpad");e&&(e.value=l.get("workspace_scratchpad",""),e.addEventListener("input",()=>{l.set("workspace_scratchpad",e.value)})),document.querySelectorAll(".workspace-asset-item").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.assetId,s=l.getDocuments().find(r=>r.id===n);s&&(Wt(s),document.querySelectorAll(".workspace-asset-item").forEach(r=>r.classList.remove("active")),a.classList.add("active"))})}),(t=document.getElementById("workspace-export-btn"))==null||t.addEventListener("click",()=>{const a=e?e.value.trim():"";if(!a){p.warning("Your scratchpad is empty");return}J(()=>Promise.resolve().then(()=>Y),void 0).then(n=>{n.downloadAsHTML(`<h2>NyayaGPT Compile Master Draft</h2><hr><p style="white-space: pre-wrap;">${v(a)}</p>`,"Workspace Master Draft",`workspace_master_${Date.now()}.html`),p.success("Workspace Master exported successfully")})})}function Wt(e){var s,r;const t=document.getElementById("inspector-placeholder"),a=document.getElementById("inspector-content");if(!t||!a)return;t.style.display="none",a.style.display="block";let n=`
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; margin-bottom: 12px;">
      <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${v(e.title)}</h3>
      <button class="btn btn-secondary btn-sm" id="copy-inspector-text-btn" style="padding: 4px 8px; font-size: 0.75rem;">📋 Copy Content</button>
    </div>
  `,i="";e.type==="research"?(i=e.content.analysis||"",n+=`
      <div style="font-size: 0.8125rem; line-height: 1.6;">
        <h5 style="color: var(--primary); margin-top: 12px; margin-bottom: 6px;">Relevant Sections:</h5>
        <ul>
          ${(e.content.acts||[]).map(o=>`<li><strong>${v(o.name)}</strong> - ${v(o.section)}: ${v(o.description)}</li>`).join("")}
        </ul>
        <h5 style="color: var(--success); margin-top: 16px; margin-bottom: 6px;">Precedents:</h5>
        <ul>
          ${(e.content.judgments||[]).map(o=>`<li><strong>${v(o.name)}</strong> (${o.year}) - ${v(o.snippet)}</li>`).join("")}
        </ul>
        <h5 style="color: var(--text-secondary); margin-top: 16px; margin-bottom: 6px;">AI Analysis:</h5>
        <p style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 4px;">${v(e.content.analysis)}</p>
      </div>
    `):e.type==="summary"?(i=`Facts: ${((s=e.content.facts)==null?void 0:s.join(`
`))||""}
Reasoning: ${e.content.court_reasoning||""}
Verdict: ${e.content.verdict||""}`,n+=`
      <div style="font-size: 0.8125rem; line-height: 1.6;">
        <div style="color: var(--text-muted); margin-bottom: 8px;">Court: ${v(e.content.court)} | Date: ${v(e.content.date)}</div>
        <h5 style="color: var(--primary); margin-bottom: 4px;">Facts:</h5>
        <p>${(e.content.facts||[]).map(o=>`• ${v(o)}`).join("<br>")}</p>
        <h5 style="color: var(--primary); margin-top: 12px; margin-bottom: 4px;">Issues:</h5>
        <p>${(e.content.issues||[]).map(o=>`• ${v(o)}`).join("<br>")}</p>
        <h5 style="color: var(--success); margin-top: 12px; margin-bottom: 4px;">Verdict:</h5>
        <p style="background: rgba(0,184,148,0.1); padding: 8px; border-radius: 4px;">${v(e.content.verdict)}</p>
      </div>
    `):e.type==="draft"?(i=e.content.content||"",n+=`
      <div style="font-size: 0.8125rem; line-height: 1.6;">
        <h5 style="color: var(--primary); margin-bottom: 8px;">Generated Draft:</h5>
        <pre style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; white-space: pre-wrap; font-family: monospace; font-size: 0.75rem;">${v(e.content.content)}</pre>
      </div>
    `):e.type==="citation"?(i=(e.content.judgments||[]).map(o=>`${o.name} (${o.citation}) - ${o.snippet}`).join(`
`),n+=`
      <div style="font-size: 0.8125rem; line-height: 1.6;">
        <h5 style="color: var(--primary); margin-bottom: 8px;">Precedent Citations:</h5>
        ${(e.content.judgments||[]).map(o=>`
          <div style="margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.02); padding-bottom: 8px;">
            <div style="font-weight: 600; color: var(--text-primary);">${v(o.name)}</div>
            <div class="text-xs text-muted" style="margin: 2px 0;">${v(o.citation)} | ${v(o.court)}</div>
            <p style="font-size: 0.75rem; margin-top: 4px;">${v(o.snippet)}</p>
          </div>
        `).join("")}
      </div>
    `):(i=JSON.stringify(e.content),n+=`<pre style="font-size: 0.75rem;">${v(JSON.stringify(e.content,null,2))}</pre>`),a.innerHTML=n,(r=document.getElementById("copy-inspector-text-btn"))==null||r.addEventListener("click",()=>{navigator.clipboard.writeText(i).then(()=>{p.success("Asset content copied to clipboard")}).catch(()=>{p.error("Failed to copy")})})}function v(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const Yt=[{section:"MAIN"},{path:"/dashboard",icon:"📊",label:"Dashboard"},{path:"/research",icon:"🔍",label:"AI Research"},{path:"/summarizer",icon:"📄",label:"Summarizer"},{path:"/drafts",icon:"✍️",label:"Draft Generator"},{path:"/citation-finder",icon:"⚖️",label:"Citation Finder"},{path:"/workspace",icon:"💼",label:"Workspace Canvas"},{path:"/analyzer",icon:"🔬",label:"Case Analyzer"},{section:"LIBRARY"},{path:"/library",icon:"📁",label:"My Documents"},{section:"ACCOUNT"},{path:"/settings",icon:"⚙️",label:"Settings"}];function Jt(){const e=l.get("sidebar_collapsed",!1),t=g.getCurrentPath(),a=Yt.map(n=>{if(n.section)return`<div class="sidebar-section-title">${n.section}</div>`;const i=t===n.path;return`
      <a href="#${n.path}" class="sidebar-link ${i?"active":""}" data-route="${n.path}">
        <span class="sidebar-link-icon">${n.icon}</span>
        <span class="sidebar-label">${n.label}</span>
      </a>
    `}).join("");return`
    <aside class="sidebar ${e?"collapsed":""}" id="sidebar">
      <button class="sidebar-toggle" id="sidebar-toggle" title="Toggle sidebar">
        ${e?"▶":"◀"}
      </button>

      <div class="sidebar-logo">
        <div class="sidebar-logo-icon">⚖️</div>
        <span class="sidebar-logo-text">NyayaGPT</span>
      </div>

      <nav class="sidebar-nav">
        ${a}
      </nav>

      <div class="sidebar-upgrade">
        <div class="sidebar-upgrade-card">
          <h5>🚀 Upgrade to Pro</h5>
          <p>Unlock unlimited AI queries</p>
          <button class="btn btn-primary btn-sm" onclick="window.location.hash='/settings'" style="width:100%">Upgrade Now</button>
        </div>
      </div>
    </aside>
  `}function Kt(){const e=document.getElementById("sidebar-toggle");e&&e.addEventListener("click",()=>{const t=document.getElementById("sidebar"),a=document.querySelector(".main-content"),n=t.classList.toggle("collapsed");l.set("sidebar_collapsed",n),a&&a.classList.toggle("sidebar-collapsed",n),e.textContent=n?"▶":"◀"})}function Vt(e){document.querySelectorAll(".sidebar-link").forEach(t=>{const a=t.getAttribute("data-route");t.classList.toggle("active",a===e)})}const Xt={"/dashboard":{breadcrumb:"Home",title:"Dashboard"},"/research":{breadcrumb:"Tools",title:"AI Research"},"/summarizer":{breadcrumb:"Tools",title:"Summarizer"},"/drafts":{breadcrumb:"Tools",title:"Draft Generator"},"/analyzer":{breadcrumb:"Tools",title:"Case Analyzer"},"/library":{breadcrumb:"Library",title:"My Documents"},"/settings":{breadcrumb:"Account",title:"Settings"}};function Qt(e){const t=l.getUser(),a=Xt[e]||{breadcrumb:"Home",title:"Dashboard"},n=t!=null&&t.name?t.name.split(" ").map(i=>i[0]).join("").toUpperCase().slice(0,2):"U";return`
    <header class="topbar">
      <div class="topbar-left">
        <button class="topbar-icon-btn" id="mobile-menu-btn" style="display:none">☰</button>
        <div class="topbar-breadcrumb">
          <span>${a.breadcrumb}</span>
          <span>/</span>
          <span class="current">${a.title}</span>
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
        <div class="topbar-avatar" id="topbar-avatar" title="${(t==null?void 0:t.name)||"Profile"}">
          ${n}
        </div>
      </div>
    </header>
  `}function Zt(){const e=document.getElementById("mobile-menu-btn");e&&(window.innerWidth<=1024&&(e.style.display="flex"),e.addEventListener("click",()=>{const a=document.getElementById("sidebar");a&&a.classList.toggle("mobile-open")}));const t=document.getElementById("topbar-avatar");t&&t.addEventListener("click",()=>{window.location.hash="/settings"}),window.addEventListener("resize",()=>{const a=document.getElementById("mobile-menu-btn");a&&(a.style.display=window.innerWidth<=1024?"flex":"none")})}function E(e,t){const a=document.getElementById("app"),n=l.get("sidebar_collapsed",!1);a.innerHTML=`
    ${Jt()}
    <div class="main-content ${n?"sidebar-collapsed":""}">
      ${Qt(e)}
      ${t}
    </div>
  `,Kt(),Zt(),Vt(e)}function F(e){const t=document.getElementById("app");t.innerHTML=e}function I(e){return l.isLoggedIn()?!0:(g.navigate("/login"),!1)}g.register("/",()=>{if(l.isLoggedIn()){g.navigate("/dashboard");return}F(fe()),he()});g.register("/login",()=>{if(l.isLoggedIn()){g.navigate("/dashboard");return}F(xe()),Ae()});g.register("/signup",()=>{if(l.isLoggedIn()){g.navigate("/dashboard");return}F(we()),Se()});g.register("/dashboard",e=>{I()&&E(e,ke())});g.register("/research",e=>{I()&&(E(e,Qe()),Ze())});g.register("/summarizer",e=>{I()&&(E(e,ot()),lt())});g.register("/drafts",e=>{I()&&(E(e,yt()),vt())});g.register("/analyzer",e=>{I()&&(E(e,At()),St())});g.register("/citation-finder",e=>{I()&&(E(e,Bt()),jt())});g.register("/workspace",e=>{I()&&(E(e,Ot()),Ut())});g.register("/library",e=>{I()&&(E(e,Ct()),Lt())});g.register("/settings",e=>{I()&&(E(e,Dt()),Rt())});g.register("/logout",()=>{l.logout(),g.navigate("/")});g.register("/404",()=>{F(`
    <div class="auth-page">
      <div class="auth-card animate-scale-in" style="text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 16px;">🔍</div>
        <h2>Page Not Found</h2>
        <p class="auth-subtitle">The page you're looking for doesn't exist.</p>
        <a href="#/" class="btn btn-primary" style="margin-top: 20px;">Go Home</a>
      </div>
    </div>
  `)});document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),l.isLoggedIn())){const t=document.getElementById("topbar-search");t&&t.click()}});window.navigateTo=e=>{g.navigate(e)};console.log("%c⚖️ NyayaGPT","font-size: 24px; font-weight: bold; color: #6C5CE7;");console.log("%cAI-Powered Legal Intelligence for Indian Law","font-size: 12px; color: #8888A8;");g.start();
