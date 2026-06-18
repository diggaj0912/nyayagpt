(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();class pe{constructor(){this.routes={},this.currentRoute=null,this.beforeEach=null,window.addEventListener("hashchange",()=>this.resolve())}register(t,n){return this.routes[t]=n,this}navigate(t){window.location.hash=t}getCurrentPath(){return window.location.hash.slice(1)||"/"}async resolve(){const t=this.getCurrentPath(),n=this.routes[t]||this.routes["/404"];this.beforeEach&&!this.beforeEach(t,this.currentRoute)||(this.currentRoute=t,n&&await n(t))}start(){this.resolve()}}const m=new pe,C="nyayagpt_",l={get(e,t=null){try{const n=localStorage.getItem(C+e);return n?JSON.parse(n):t}catch{return t}},set(e,t){try{localStorage.setItem(C+e,JSON.stringify(t))}catch(n){console.warn("Storage full or unavailable:",n)}},remove(e){localStorage.removeItem(C+e)},clear(){Object.keys(localStorage).filter(e=>e.startsWith(C)).forEach(e=>localStorage.removeItem(e))},getUser(){return this.get("user",null)},setUser(e){this.set("user",e)},isLoggedIn(){return!!this.getUser()},logout(){this.remove("user")},getDocuments(){return this.get("documents",[])},saveDocument(e){const t=this.getDocuments();return e.id=e.id||crypto.randomUUID(),e.createdAt=e.createdAt||new Date().toISOString(),t.unshift(e),this.set("documents",t),e},getResearchHistory(){return this.get("research_history",[])},saveResearch(e){const t=this.getResearchHistory();return e.id=e.id||crypto.randomUUID(),e.createdAt=new Date().toISOString(),t.unshift(e),this.set("research_history",t.slice(0,50)),e},getActivity(){return this.get("activity",[])},logActivity(e,t,n){const a=this.getActivity();a.unshift({id:crypto.randomUUID(),type:e,title:t,icon:n,timestamp:new Date().toISOString()}),this.set("activity",a.slice(0,20))},getUsage(){return this.get("usage",{research:0,summaries:0,drafts:0,analyses:0})},incrementUsage(e){const t=this.getUsage();t[e]=(t[e]||0)+1,this.set("usage",t)}};function me(){return`
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
  `}function ge(){const e=document.getElementById("landing-nav");if(e){const t=()=>{e.classList.toggle("scrolled",window.scrollY>50)};window.addEventListener("scroll",t),t()}document.querySelectorAll('.landing-page a[href^="#features"], .landing-page a[href^="#pricing"], .landing-page a[href^="#about"]').forEach(t=>{t.addEventListener("click",n=>{const a=t.getAttribute("href").slice(1),i=document.getElementById(a);i&&(n.preventDefault(),i.scrollIntoView({behavior:"smooth",block:"start"}))})})}const W={success:"✓",error:"✕",info:"ℹ",warning:"⚠"},J={success:"Success",error:"Error",info:"Info",warning:"Warning"};let ye=0;function _(e,t="info",n=4e3){const a=document.getElementById("toast-container");if(!a)return;const i=`toast-${++ye}`,s=document.createElement("div");return s.className=`toast toast-${t}`,s.id=i,s.innerHTML=`
    <span class="toast-icon">${W[t]||W.info}</span>
    <div class="toast-content">
      <div class="toast-title">${J[t]||J.info}</div>
      <div class="toast-message">${e}</div>
    </div>
    <button class="toast-close" onclick="document.getElementById('${i}').classList.add('toast-exit'); setTimeout(() => document.getElementById('${i}')?.remove(), 300)">✕</button>
  `,a.appendChild(s),n>0&&setTimeout(()=>{s.parentNode&&(s.classList.add("toast-exit"),setTimeout(()=>s.remove(),300))},n),i}const p={success:(e,t)=>_(e,"success",t),error:(e,t)=>_(e,"error",t),info:(e,t)=>_(e,"info",t),warning:(e,t)=>_(e,"warning",t)};function ve(){return`
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
  `}function he(){return`
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
  `}function fe(){const e=document.getElementById("login-form");e&&e.addEventListener("submit",n=>{n.preventDefault();const a=document.getElementById("login-email").value.trim(),i=document.getElementById("login-password").value;if(!a||!i){p.error("Please fill in all fields");return}const s=l.getUser();if(s&&s.email===a){p.success("Welcome back!"),m.navigate("/dashboard");return}const r={id:crypto.randomUUID(),name:a.split("@")[0].replace(/[._]/g," ").replace(/\b\w/g,o=>o.toUpperCase()),email:a,role:"lawyer",plan:"free",createdAt:new Date().toISOString()};l.setUser(r),p.success("Welcome to NyayaGPT!"),m.navigate("/dashboard")});const t=document.getElementById("google-login-btn");t&&t.addEventListener("click",()=>{p.info("Google OAuth will be available in the next update")})}function be(){const e=document.getElementById("signup-form");e&&e.addEventListener("submit",n=>{n.preventDefault();const a=document.getElementById("signup-name").value.trim(),i=document.getElementById("signup-email").value.trim(),s=document.getElementById("signup-password").value,r=document.getElementById("signup-role").value;if(!a||!i||!s){p.error("Please fill in all fields");return}if(s.length<8){p.error("Password must be at least 8 characters");return}const o={id:crypto.randomUUID(),name:a,email:i,role:r,plan:"free",createdAt:new Date().toISOString()};l.setUser(o),l.logActivity("signup","Account created","🎉"),p.success("Account created! Welcome to NyayaGPT"),m.navigate("/dashboard")});const t=document.getElementById("google-signup-btn");t&&t.addEventListener("click",()=>{p.info("Google OAuth will be available in the next update")})}function xe(e,t){const n=new Blob([e],{type:"text/plain;charset=utf-8"}),a=URL.createObjectURL(n),i=document.createElement("a");i.href=a,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a)}function k(e,t,n){const a=`<!DOCTYPE html>
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
</html>`,i=new Blob([a],{type:"text/html;charset=utf-8"}),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=n.replace(".pdf",".html"),document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(s)}function we(e,t){const n=window.open("","_blank");n.document.write(`<!DOCTYPE html>
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
</html>`),n.document.close(),n.print()}function te(e){return new Date(e).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function U(e){const t=new Date,n=new Date(e),a=Math.floor((t-n)/1e3);return a<60?"just now":a<3600?`${Math.floor(a/60)}m ago`:a<86400?`${Math.floor(a/3600)}h ago`:a<604800?`${Math.floor(a/86400)}d ago`:te(e)}const Ae=Object.freeze(Object.defineProperty({__proto__:null,downloadAsHTML:k,downloadAsText:xe,formatDate:te,printContent:we,timeAgo:U},Symbol.toStringTag,{value:"Module"})),Ee=[{icon:"🔍",title:"AI Research",desc:"Search Indian legal knowledge",route:"/research",color:"card-icon-purple"},{icon:"📄",title:"Summarize",desc:"Upload & summarize judgments",route:"/summarizer",color:"card-icon-green"},{icon:"✍️",title:"Draft",desc:"Generate legal documents",route:"/drafts",color:"card-icon-gold"},{icon:"🔬",title:"Analyze",desc:"Analyze cases & contracts",route:"/analyzer",color:"card-icon-red"}];function Ie(){var d;const e=l.getUser(),t=l.getUsage(),n=l.getActivity(),a=l.getDocuments(),i=Se(),s=Ee.map(c=>`
    <div class="quick-action-card card-interactive" onclick="window.location.hash='${c.route}'">
      <div class="quick-action-icon ${c.color}">${c.icon}</div>
      <h4>${c.title}</h4>
      <p>${c.desc}</p>
    </div>
  `).join(""),r=n.length>0?n.slice(0,8).map(c=>`
      <div class="activity-item">
        <div class="activity-icon" style="background: var(--bg-surface-2);">${c.icon||"📋"}</div>
        <div class="activity-info">
          <h5>${c.title}</h5>
          <p>${U(c.timestamp)}</p>
        </div>
      </div>
    `).join(""):`<div class="empty-state" style="padding: 30px;">
        <div class="empty-state-icon">📋</div>
        <h4>No activity yet</h4>
        <p>Start using NyayaGPT to see your activity here.</p>
      </div>`,o={free:{research:5,summaries:3,drafts:3,analyses:2}},u=o[e==null?void 0:e.plan]||o.free;return`
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
            ${D("Research",t.research||0,u.research)}
            ${D("Summaries",t.summaries||0,u.summaries)}
            ${D("Drafts",t.drafts||0,u.drafts)}
            ${D("Analyses",t.analyses||0,u.analyses)}
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
                <div style="font-size: 2rem; font-weight: 700; color: var(--primary-light);">${a.length}</div>
                <div style="font-size: 0.8125rem; color: var(--text-secondary);">Saved documents</div>
              </div>
              <a href="#/library" class="btn btn-secondary btn-sm">View All →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function D(e,t,n){const a=Math.min(t/n*100,100),i=t>=n;return`
    <div class="usage-item">
      <div class="usage-item-header">
        <span class="usage-item-label">${e}</span>
        <span class="usage-item-value" style="${i?"color: var(--danger);":""}">${t}/${n}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${a}%; ${i?"background: var(--danger);":""}"></div>
      </div>
    </div>
  `}function Se(){const e=new Date().getHours();return e<12?"Good morning":e<17?"Good afternoon":"Good evening"}const $e="modulepreload",Pe=function(e){return"/"+e},K={},Te=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){let r=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),u=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=r(n.map(d=>{if(d=Pe(d),d in K)return;K[d]=!0;const c=d.endsWith(".css"),v=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${v}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":$e,c||(g.as="script"),g.crossOrigin="",g.href=d,u&&g.setAttribute("nonce",u),document.head.appendChild(g),c)return new Promise((A,L)=>{g.addEventListener("load",A),g.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(r){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r}return i.then(r=>{for(const o of r||[])o.status==="rejected"&&s(o.reason);return t().catch(s)})},ke="https://generativelanguage.googleapis.com/v1beta/models",Le="gemini-2.0-flash";function ae(){return l.get("gemini_api_key","")}function x(){return!!ae()}async function G(e,t=""){var u,d,c,v,g,A,L,H;const n=ae();if(!n)throw new Error("API_KEY_MISSING");const a=`${ke}/${Le}:generateContent?key=${n}`,i={contents:[{parts:[{text:e}]}],generationConfig:{temperature:.7,topP:.95,maxOutputTokens:8192,responseMimeType:"application/json"}};t&&(i.systemInstruction={parts:[{text:t}]});const s=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!s.ok){const b=await s.json().catch(()=>({}));throw s.status===400&&((d=(u=b==null?void 0:b.error)==null?void 0:u.message)!=null&&d.includes("API key"))?new Error("API_KEY_INVALID"):new Error(((c=b==null?void 0:b.error)==null?void 0:c.message)||`Gemini API error: ${s.status}`)}const r=await s.json(),o=(H=(L=(A=(g=(v=r==null?void 0:r.candidates)==null?void 0:v[0])==null?void 0:g.content)==null?void 0:A.parts)==null?void 0:L[0])==null?void 0:H.text;if(!o)throw new Error("Empty response from Gemini");try{return JSON.parse(o)}catch{const b=o.match(/```(?:json)?\s*([\s\S]*?)```/);return b?JSON.parse(b[1].trim()):{raw:o}}}const Ce=`You are NyayaGPT, an expert Indian legal research assistant. You have extensive knowledge of Indian law including all Acts, Sections, IPC, CrPC, CPC, Constitution of India, Supreme Court judgments, and High Court judgments.

When given a legal query, respond in this EXACT JSON format:
{
  "acts": [
    { "name": "Act Name", "section": "Section Number", "description": "Brief explanation of relevance" }
  ],
  "judgments": [
    { "name": "Case Name v. Other Party", "citation": "(Year) Volume SCC/AIR Page", "court": "Supreme Court / High Court Name", "year": "Year", "relevance": 85, "snippet": "Key excerpt or ratio decidendi" }
  ],
  "analysis": "Detailed legal analysis in 3-5 paragraphs with inline references to the acts and judgments listed above. Use proper legal language."
}

Rules:
- Always provide 2-5 relevant Acts/Sections
- Always provide 2-4 relevant judgments with proper citations
- Relevance score is 0-100
- Analysis should be comprehensive, citing specific sections and cases
- Focus on Indian law only
- Include landmark/leading cases where applicable`;async function _e(e){return G(`Legal research query: "${e}"

Provide a comprehensive legal research response with relevant Indian Acts, Sections, judgments, and analysis.`,Ce)}const De=`You are NyayaGPT, an expert Indian legal judgment summarizer. Given the text of a court judgment, provide a structured summary.

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
- Key takeaways should be practical and actionable`;async function Re(e){const t=e.slice(0,3e4);return G(`Summarize the following Indian court judgment:

---
${t}
---

Provide a structured summary.`,De)}const O={legal_notice:{name:"Legal Notice",systemPrompt:`You are NyayaGPT, an expert Indian legal draft generator. Generate a formal Legal Notice as per Indian law.

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
}`,fields:[{name:"landlord_name",label:"Landlord Name",type:"text",required:!0},{name:"tenant_name",label:"Tenant Name",type:"text",required:!0},{name:"property_address",label:"Property Address",type:"textarea",required:!0},{name:"rent_amount",label:"Monthly Rent (₹)",type:"text",required:!0},{name:"security_deposit",label:"Security Deposit (₹)",type:"text",required:!0},{name:"duration_months",label:"Lease Duration (months)",type:"number",required:!0},{name:"start_date",label:"Start Date",type:"date",required:!0},{name:"purpose",label:"Purpose (Residential/Commercial)",type:"text",required:!0}]}};function ne(){return Object.entries(O).map(([e,t])=>({id:e,name:t.name,fields:t.fields}))}function ie(e){var t;return((t=O[e])==null?void 0:t.fields)||[]}async function Ne(e,t){const n=O[e];if(!n)throw new Error("Invalid template");const a=Object.entries(t).map(([i,s])=>`${i.replace(/_/g," ")}: ${s}`).join(`
`);return G(`Generate a professional Indian legal document with these details:

${a}

Create a complete, ready-to-use document.`,n.systemPrompt)}const Me=`You are NyayaGPT, an expert Indian legal case analyzer. Given a legal document (petition, FIR, agreement, or legal notice), provide a comprehensive analysis.

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
- Be specific to Indian law`;async function Be(e,t){const n=e.slice(0,3e4);return G(`Analyze the following ${t} under Indian law:

---
${n}
---

Provide a comprehensive analysis.`,Me)}function Y(){return{acts:[{name:"Indian Penal Code, 1860",section:"Section 498A",description:"Husband or relative of husband of a woman subjecting her to cruelty — Punishment with imprisonment up to 3 years and fine."},{name:"Hindu Marriage Act, 1955",section:"Section 13",description:"Grounds for divorce including cruelty, desertion, conversion, unsoundness of mind, venereal disease, renunciation, and presumption of death."},{name:"Protection of Women from Domestic Violence Act, 2005",section:"Section 3",description:"Defines domestic violence including physical, sexual, verbal, emotional, and economic abuse."}],judgments:[{name:"Arnesh Kumar v. State of Bihar",citation:"(2014) 8 SCC 273",court:"Supreme Court of India",year:"2014",relevance:95,snippet:"The Supreme Court laid down guidelines to prevent automatic arrests in cases under Section 498A IPC, requiring the police to follow a checklist before making arrests."},{name:"Rajesh Sharma v. State of U.P.",citation:"(2017) 10 SCC 257",court:"Supreme Court of India",year:"2017",relevance:88,snippet:"Directed establishment of Family Welfare Committees in every district to look into complaints of matrimonial disputes and recommend settlement."},{name:"Shobha Rani v. Madhukar Reddi",citation:"(1988) 1 SCC 105",court:"Supreme Court of India",year:"1988",relevance:78,snippet:"Defined cruelty broadly to include both physical and mental cruelty, establishing that persistent demands for dowry constitute cruelty under Section 498A."}],analysis:`Based on the legal research, Section 498A of the Indian Penal Code is the primary provision dealing with cruelty by husband or his relatives against a married woman. This section was introduced by the Criminal Law (Second Amendment) Act, 1983, to combat the increasing menace of dowry deaths and domestic violence.

The Supreme Court in Arnesh Kumar v. State of Bihar (2014) 8 SCC 273 recognized the potential misuse of Section 498A and laid down important safeguards, including a mandatory checklist for police officers before arrest. This judgment was a landmark in balancing the protection of women with prevention of misuse.

In addition to criminal remedies under Section 498A IPC, the Protection of Women from Domestic Violence Act, 2005 provides civil remedies including protection orders, residence orders, monetary relief, and custody orders. Section 13 of the Hindu Marriage Act, 1955 allows divorce on grounds of cruelty, providing a matrimonial remedy alongside criminal provisions.`}}function Ge(){return{title:"Arnesh Kumar v. State of Bihar",court:"Supreme Court of India",date:"2 July 2014",facts:["The appellant was arrested under Section 498A IPC without proper investigation","The case highlighted the growing concern of mechanical arrests in matrimonial disputes","Police had arrested the accused without following proper procedure or assessing necessity of arrest"],issues:["Whether automatic arrest under Section 498A IPC is mandatory","What safeguards should be in place to prevent misuse of Section 498A","Whether the Magistrate should apply judicial mind before authorizing detention"],petitioner_arguments:["Section 498A is being widely misused as a tool for harassment","Automatic arrests violate fundamental rights under Article 21","Police should be required to investigate before making arrests"],respondent_arguments:["Section 498A is necessary to protect women from domestic violence","Arrests are needed to prevent accused from influencing witnesses","The provision serves an important social purpose"],court_reasoning:"The Supreme Court acknowledged that while Section 498A serves a vital purpose in protecting women from cruelty, its misuse cannot be ignored. The Court noted that in many cases, arrests were made mechanically without proper application of mind. The Court held that police officers must satisfy themselves about the necessity of arrest under Section 41 CrPC and prepare a checklist of reasons for arrest.",verdict:"The Supreme Court directed all State Governments to instruct police officers not to automatically arrest the accused in Section 498A cases. Police must follow the checklist under Section 41(1)(b)(ii) CrPC. Magistrates must not authorize detention casually and must satisfy themselves that the arrest is warranted.",key_takeaways:["Police cannot make automatic arrests in Section 498A cases","A checklist must be prepared justifying the arrest","Magistrates must apply judicial mind before authorizing detention","Non-compliance may lead to departmental action against police officers","This judgment balances protection of women with prevention of misuse"]}}function qe(){return{document_type:"Service Agreement",key_facts:["Agreement between two parties for software development services","Contract value of ₹15,00,000 with milestone-based payments","Project duration of 6 months from execution date","No specific mention of data protection or privacy terms","Intellectual property assignment clause is vaguely worded"],risks:[{level:"high",title:"Vague IP Assignment",description:"The intellectual property clause does not clearly specify ownership of derivative works and pre-existing IP. This could lead to disputes."},{level:"high",title:"No Data Protection Terms",description:"Given DPDP Act 2023 requirements, the absence of data protection clauses is a significant compliance risk."},{level:"medium",title:"Limited Liability Cap Missing",description:"No cap on liability has been specified, exposing both parties to unlimited claims."},{level:"medium",title:"Inadequate Termination Clause",description:"Termination clause does not address payments for partially completed work or transition assistance."},{level:"low",title:"No Force Majeure",description:"Agreement does not include force majeure provisions for unforeseen circumstances."}],missing_clauses:[{clause:"Force Majeure",importance:"Essential for protecting both parties from liability during unforeseen events like natural disasters or pandemics."},{clause:"Data Protection & Privacy",importance:"Required under the Digital Personal Data Protection Act, 2023 for any agreement involving personal data processing."},{clause:"Non-Solicitation",importance:"Prevents parties from poaching each other's employees during and after the engagement."},{clause:"Limitation of Liability",importance:"Caps maximum liability to contract value, preventing disproportionate claims."}],legal_issues:[{issue:"Stamp Duty Compliance",explanation:"The agreement may require stamp duty as per the applicable state Stamp Act. Non-stamped agreements may not be admissible as evidence."},{issue:"GST Implications",explanation:"The payment terms do not address GST obligations. Under GST law, the service provider must charge 18% GST on services."},{issue:"Dispute Resolution Mechanism",explanation:"While arbitration is mentioned, the clause does not specify the seat of arbitration, language, or applicable arbitration rules."}],overall_risk_score:68,recommendation:"The agreement requires significant revision before execution. The most critical issues are the vague IP assignment clause and the complete absence of data protection terms (mandatory under DPDP Act 2023). We recommend adding Force Majeure, limitation of liability, data protection, and non-solicitation clauses. The arbitration clause should specify seat, language, and governing rules. GST and stamp duty compliance should be addressed explicitly."}}const je=["Grounds for bail under CrPC","Section 498A IPC misuse safeguards","Rights of tenants under Rent Control Act","Startup incorporation under Companies Act","Fundamental rights under Article 21","Cheque bounce case procedure"];function Fe(){const e=l.getResearchHistory();return`
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>🔍 AI Legal Research</h2>
        <p>Ask any legal question in natural language. Get relevant Acts, judgments, and analysis.</p>
      </div>

      <div class="research-input-container">
        <div class="research-input-box" id="research-input-box">
          <textarea class="research-textarea" id="research-query" placeholder="Ask a legal question... e.g., 'What are the grounds for divorce under Hindu law?'" rows="3"></textarea>
          <div class="research-input-footer">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="text-xs text-muted">⚡ Powered by AI</span>
              ${x()?'<span class="badge badge-success">API Connected</span>':'<span class="badge badge-warning">Demo Mode</span>'}
            </div>
            <button class="btn btn-primary" id="research-btn">
              <span id="research-btn-text">Research</span>
            </button>
          </div>
        </div>
        <div class="suggested-queries" id="suggested-queries">
          ${je.map(t=>`<button class="chip" data-query="${t}">${t}</button>`).join("")}
        </div>
      </div>

      <div id="research-results"></div>

      ${e.length>0?`
        <div style="margin-top: 32px;">
          <h4 style="margin-bottom: 16px; color: var(--text-secondary);">Recent Research</h4>
          ${e.slice(0,5).map(t=>`
            <div class="card card-interactive" style="margin-bottom: 8px; padding: 16px;" data-history-query="${y(t.query)}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 500; font-size: 0.9375rem;">${y(t.query)}</div>
                  <div class="text-xs text-muted" style="margin-top: 4px;">${t.actsCount||0} acts · ${t.judgmentsCount||0} judgments</div>
                </div>
                <span class="text-xs text-muted">${new Date(t.createdAt).toLocaleDateString("en-IN")}</span>
              </div>
            </div>
          `).join("")}
        </div>
      `:""}
    </div>
  `}function ze(){const e=document.getElementById("research-btn"),t=document.getElementById("research-query"),n=document.getElementById("research-results");e&&e.addEventListener("click",()=>j(t,n,e)),t&&t.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),j(t,n,e))}),document.querySelectorAll("[data-query]").forEach(a=>{a.addEventListener("click",()=>{t.value=a.dataset.query,t.focus()})}),document.querySelectorAll("[data-history-query]").forEach(a=>{a.addEventListener("click",()=>{t.value=a.dataset.historyQuery,j(t,n,e)})})}async function j(e,t,n){var i,s,r,o;const a=e.value.trim();if(!a){p.warning("Please enter a legal question");return}n.disabled=!0,document.getElementById("research-btn-text").textContent="Researching...",t.innerHTML=Ue();try{let u;x()?u=await _e(a):(await new Promise(d=>setTimeout(d,2e3)),u=Y(),p.info("Showing demo results. Add your Gemini API key in Settings for live research.")),l.saveResearch({query:a,actsCount:((i=u.acts)==null?void 0:i.length)||0,judgmentsCount:((s=u.judgments)==null?void 0:s.length)||0}),l.incrementUsage("research"),l.logActivity("research",`Researched: ${a.slice(0,50)}...`,"🔍"),t.innerHTML=V(u),t.scrollIntoView({behavior:"smooth",block:"start"}),(r=document.getElementById("save-research-btn"))==null||r.addEventListener("click",()=>{l.saveDocument({type:"research",title:a,content:u}),p.success("Research saved to library")}),(o=document.getElementById("export-research-btn"))==null||o.addEventListener("click",()=>{const{downloadAsHTML:d}=Te(()=>Promise.resolve().then(()=>Ae),void 0).then(c=>{c.downloadAsHTML(He(a,u),`Legal Research: ${a}`,`research_${Date.now()}.html`)})})}catch(u){if(u.message==="API_KEY_MISSING"){p.warning("Please add your Gemini API key in Settings"),await new Promise(c=>setTimeout(c,1500));const d=Y();t.innerHTML=V(d),p.info("Showing demo results")}else u.message==="API_KEY_INVALID"?(p.error("Invalid API key. Please check your Gemini API key in Settings."),t.innerHTML=""):(p.error("Research failed: "+u.message),t.innerHTML="")}finally{n.disabled=!1,document.getElementById("research-btn-text").textContent="Research"}}function Ue(){return`
    <div class="result-section animate-fade-up" style="padding: 40px; text-align: center;">
      <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
      <p class="text-muted">Searching Indian legal knowledge base...</p>
      <div class="processing-steps" style="max-width: 300px; margin: 20px auto 0; text-align: left;">
        <div class="processing-step active">
          <div class="processing-step-icon">🔍</div>
          <span>Analyzing your query</span>
        </div>
        <div class="processing-step pending">
          <div class="processing-step-icon">📜</div>
          <span>Finding relevant Acts & Sections</span>
        </div>
        <div class="processing-step pending">
          <div class="processing-step-icon">⚖️</div>
          <span>Matching case judgments</span>
        </div>
        <div class="processing-step pending">
          <div class="processing-step-icon">🤖</div>
          <span>Generating legal analysis</span>
        </div>
      </div>
    </div>
  `}function V(e){var a,i;const t=(e.acts||[]).map(s=>`
    <div class="act-card">
      <h5>${y(s.name)}</h5>
      <div class="badge badge-primary" style="margin-bottom: 8px;">${y(s.section)}</div>
      <p>${y(s.description)}</p>
    </div>
  `).join(""),n=(e.judgments||[]).map(s=>{const r=s.relevance>=80?"high":s.relevance>=50?"medium":"low",o=Math.round(s.relevance/20),u=Array.from({length:5},(d,c)=>`<div class="relevance-segment ${c<o?`filled ${r}`:""}"></div>`).join("");return`
      <div class="judgment-card">
        <div class="case-name">${y(s.name)}</div>
        <div class="case-meta">
          <span>${y(s.citation)}</span>
          <span>${y(s.court)}</span>
          <span>${s.year}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span class="text-xs text-muted">Relevance:</span>
          <div class="relevance-bar">${u}</div>
          <span class="text-xs" style="color: var(--${r==="high"?"secondary":r==="medium"?"accent":"danger"});">${s.relevance}%</span>
        </div>
        <div class="case-snippet">${y(s.snippet)}</div>
      </div>
    `}).join("");return`
    <div class="research-results animate-fade-up">
      ${t?`
        <div class="result-section">
          <div class="result-section-header">
            <span class="icon">📜</span> Relevant Acts & Sections
            <span class="badge badge-primary" style="margin-left: auto;">${((a=e.acts)==null?void 0:a.length)||0}</span>
          </div>
          <div class="result-section-content">${t}</div>
        </div>
      `:""}

      ${n?`
        <div class="result-section">
          <div class="result-section-header">
            <span class="icon">⚖️</span> Key Judgments
            <span class="badge badge-success" style="margin-left: auto;">${((i=e.judgments)==null?void 0:i.length)||0}</span>
          </div>
          <div class="result-section-content">${n}</div>
        </div>
      `:""}

      ${e.analysis?`
        <div class="result-section">
          <div class="result-section-header">
            <span class="icon">🤖</span> AI Legal Analysis
          </div>
          <div class="ai-analysis">${Oe(e.analysis)}</div>
        </div>
      `:""}

      <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px;">
        <button class="btn btn-secondary btn-sm" id="export-research-btn">📥 Export</button>
        <button class="btn btn-primary btn-sm" id="save-research-btn">💾 Save to Library</button>
      </div>
    </div>
  `}function Oe(e){return e.replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>").replace(/Section\s+(\d+[A-Za-z]*)/g,'<span class="citation">Section $1</span>').replace(/Article\s+(\d+[A-Za-z]*)/g,'<span class="citation">Article $1</span>')}function He(e,t){var a,i;let n=`<h1>Legal Research: ${y(e)}</h1><div class="meta">Generated by NyayaGPT</div>`;return(a=t.acts)!=null&&a.length&&(n+='<div class="section"><div class="section-title">Relevant Acts & Sections</div>',t.acts.forEach(s=>{n+=`<p><strong>${y(s.name)} — ${y(s.section)}</strong><br>${y(s.description)}</p>`}),n+="</div>"),(i=t.judgments)!=null&&i.length&&(n+='<div class="section"><div class="section-title">Key Judgments</div>',t.judgments.forEach(s=>{n+=`<p><strong>${y(s.name)}</strong><br><em>${y(s.citation)} | ${y(s.court)}</em><br>${y(s.snippet)}</p>`}),n+="</div>"),t.analysis&&(n+=`<div class="section"><div class="section-title">AI Analysis</div><p>${y(t.analysis)}</p></div>`),n}function y(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const se=[{id:"facts",label:"Facts",icon:"📋"},{id:"issues",label:"Issues",icon:"❓"},{id:"petitioner_arguments",label:"Petitioner Args",icon:"👤"},{id:"respondent_arguments",label:"Respondent Args",icon:"👥"},{id:"court_reasoning",label:"Reasoning",icon:"🧠"},{id:"verdict",label:"Verdict",icon:"⚖️"},{id:"key_takeaways",label:"Takeaways",icon:"💡"}];let We=null;function Je(){return`
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
            ${x()?'<span class="badge badge-success">API Connected</span>':'<span class="badge badge-warning">Demo Mode</span>'}
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
  `}function Ke(){const e=document.getElementById("dropzone"),t=document.getElementById("file-input"),n=document.getElementById("judgment-text"),a=document.getElementById("summarize-btn");e==null||e.addEventListener("click",()=>t==null?void 0:t.click()),e==null||e.addEventListener("dragover",i=>{i.preventDefault(),e.classList.add("drag-over")}),e==null||e.addEventListener("dragleave",()=>e.classList.remove("drag-over")),e==null||e.addEventListener("drop",i=>{i.preventDefault(),e.classList.remove("drag-over");const s=i.dataTransfer.files[0];s&&X(s,n,e)}),t==null||t.addEventListener("change",i=>{const s=i.target.files[0];s&&X(s,n,e)}),a==null||a.addEventListener("click",()=>Ye(n))}function X(e,t,n){if(e.size>10*1024*1024){p.error("File too large. Maximum 10MB.");return}const a=e.name.split(".").pop().toLowerCase();if(a==="txt"){const i=new FileReader;i.onload=s=>{t.value=s.target.result,n.innerHTML=`
        <div class="file-dropzone-icon" style="background: rgba(0,184,148,0.1);">✓</div>
        <h4>${e.name}</h4>
        <p class="text-muted">${(e.size/1024).toFixed(1)} KB — Text extracted</p>
      `,p.success("File loaded successfully")},i.readAsText(e)}else if(a==="pdf"){const i=new FileReader;i.onload=()=>{t.value=`[PDF uploaded: ${e.name}]

Note: For best results with PDF files, please copy and paste the text content directly. Client-side PDF text extraction will be enhanced in the next update.`,n.innerHTML=`
        <div class="file-dropzone-icon" style="background: rgba(253,203,110,0.1);">📄</div>
        <h4>${e.name}</h4>
        <p class="text-muted">${(e.size/1024).toFixed(1)} KB — PDF uploaded</p>
        <p class="file-types">💡 Tip: Paste the text directly for best results</p>
      `,p.info("PDF uploaded. For best results, paste the text content directly.")},i.readAsArrayBuffer(e)}else p.warning("Please upload a PDF or TXT file")}async function Ye(e){const t=e.value.trim();if(!t||t.length<100){p.warning("Please provide judgment text (minimum 100 characters)");return}const n=document.getElementById("summarize-btn"),a=document.getElementById("processing-section"),i=document.getElementById("summary-result-section");n.disabled=!0,document.getElementById("summarize-btn-text").textContent="Processing...",a.style.display="block",i.style.display="none",a.innerHTML=Ve(),await Xe();try{let s;x()?s=await Re(t):(await new Promise(r=>setTimeout(r,1500)),s=Ge(),p.info("Showing demo summary. Add your Gemini API key in Settings for live summarization.")),We=s,l.incrementUsage("summaries"),l.logActivity("summary",`Summarized: ${s.title||"Judgment"}`,"📄"),a.style.display="none",i.style.display="block",i.innerHTML=Qe(s),i.scrollIntoView({behavior:"smooth"}),Ze(s),et(s,t)}catch(s){p.error("Summarization failed: "+s.message),a.style.display="none"}finally{n.disabled=!1,document.getElementById("summarize-btn-text").textContent="Summarize Judgment"}}function Ve(){return`
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
  `}async function Xe(){for(let e=1;e<=4;e++){await new Promise(a=>setTimeout(a,600));const t=document.getElementById(`step-${e}`);t&&(t.classList.remove("active"),t.classList.add("completed"),t.querySelector(".processing-step-icon").textContent="✓");const n=document.getElementById(`step-${e+1}`);n&&(n.classList.remove("pending"),n.classList.add("active"))}}function Qe(e){const t=se.map((n,a)=>`
    <button class="summary-tab ${a===0?"active":""}" data-tab="${n.id}">
      ${n.icon} ${n.label}
    </button>
  `).join("");return`
    <div class="summary-result animate-fade-up">
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border);">
        <div>
          <h4>${f(e.title||"Judgment Summary")}</h4>
          <p class="text-xs text-muted" style="margin-top: 4px;">${f(e.court||"")} ${e.date?"· "+f(e.date):""}</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" id="export-summary-btn">📥 Export</button>
          <button class="btn btn-primary btn-sm" id="save-summary-btn">💾 Save</button>
        </div>
      </div>
      <div class="summary-tabs">${t}</div>
      <div class="summary-content" id="summary-content">
        ${re("facts",e)}
      </div>
    </div>
  `}function re(e,t){const n=t[e];return n?Array.isArray(n)?`<ul>${n.map(a=>`<li>${f(a)}</li>`).join("")}</ul>`:`<p>${f(n)}</p>`:'<p class="text-muted">No data available for this section.</p>'}function Ze(e){document.querySelectorAll(".summary-tab").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".summary-tab").forEach(a=>a.classList.remove("active")),t.classList.add("active");const n=document.getElementById("summary-content");n&&(n.innerHTML=re(t.dataset.tab,e))})})}function et(e,t){var n,a;(n=document.getElementById("save-summary-btn"))==null||n.addEventListener("click",()=>{l.saveDocument({type:"summary",title:e.title||"Judgment Summary",content:e}),p.success("Summary saved to library")}),(a=document.getElementById("export-summary-btn"))==null||a.addEventListener("click",()=>{let i=`<h1>${f(e.title||"Judgment Summary")}</h1>`;i+=`<div class="meta">${f(e.court||"")} ${e.date?"· "+f(e.date):""}</div>`,se.forEach(s=>{const r=e[s.id];r&&(i+=`<div class="section"><div class="section-title">${s.label}</div>`,Array.isArray(r)?i+=`<ul>${r.map(o=>`<li>${f(o)}</li>`).join("")}</ul>`:i+=`<p>${f(r)}</p>`,i+="</div>")}),k(i,e.title||"Judgment Summary",`summary_${Date.now()}.html`),p.success("Summary exported")})}function f(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const oe={legal_notice:"📋",nda:"🤝",employment:"👔",service_agreement:"🔧",partnership:"🤝",rent_agreement:"🏠"};let w=null,le=null;function tt(){return`
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>✍️ Legal Draft Generator</h2>
        <p>Select a template, fill the form, and generate a professional legal document.</p>
      </div>

      <h4 style="margin-bottom: 16px;">Choose Template</h4>
      <div class="template-grid" id="template-grid">
        ${ne().map(n=>`
    <div class="template-card" data-template="${n.id}" id="template-${n.id}">
      <div class="template-card-icon">${oe[n.id]||"📄"}</div>
      <h5>${n.name}</h5>
      <p>${n.fields.length} fields</p>
    </div>
  `).join("")}
      </div>

      <div id="draft-form-section" style="display: none;"></div>
      <div id="draft-preview-section" style="display: none;"></div>
    </div>
  `}function at(){document.querySelectorAll(".template-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.template;nt(t)})})}function nt(e){var o,u,d;w=e,le=null,document.querySelectorAll(".template-card").forEach(c=>c.classList.remove("selected")),(o=document.getElementById(`template-${e}`))==null||o.classList.add("selected");const t=document.getElementById("draft-form-section"),n=document.getElementById("draft-preview-section");n.style.display="none";const a=ie(e),s=ne().find(c=>c.id===e),r=a.map(c=>{const v=c.type==="textarea";let g;return c.type==="textarea"?g=`<textarea class="form-textarea" id="field-${c.name}" placeholder="${c.hint||""}" ${c.required?"required":""} rows="3"></textarea>`:c.type==="date"?g=`<input type="date" class="form-input" id="field-${c.name}" ${c.required?"required":""} />`:c.type==="number"?g=`<input type="number" class="form-input" id="field-${c.name}" ${c.required?"required":""} min="1" />`:g=`<input type="text" class="form-input" id="field-${c.name}" placeholder="${c.hint||""}" ${c.required?"required":""} />`,`
      <div class="form-group ${v?"full-width":""}">
        <label class="form-label">${c.label} ${c.required?"*":""}</label>
        ${g}
        ${c.hint&&c.type!=="textarea"?`<span class="form-hint">${c.hint}</span>`:""}
      </div>
    `}).join("");t.style.display="block",t.innerHTML=`
    <div class="draft-form animate-fade-up">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <h3>${oe[e]||"📄"} ${(s==null?void 0:s.name)||"Draft"}</h3>
        ${x()?'<span class="badge badge-success">API Connected</span>':'<span class="badge badge-warning">Demo Mode</span>'}
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
  `,t.scrollIntoView({behavior:"smooth"}),(u=document.getElementById("draft-generate-form"))==null||u.addEventListener("submit",c=>{c.preventDefault(),it()}),(d=document.getElementById("clear-draft-btn"))==null||d.addEventListener("click",()=>{document.querySelectorAll("#draft-generate-form input, #draft-generate-form textarea").forEach(v=>{v.value=""})})}async function it(){const e=ie(w),t={};let n=!0;if(e.forEach(i=>{var o;const s=document.getElementById(`field-${i.name}`),r=((o=s==null?void 0:s.value)==null?void 0:o.trim())||"";i.required&&!r?(n=!1,s!=null&&s.style&&(s.style.borderColor="var(--danger)")):s&&(s.style.borderColor=""),t[i.name]=r}),!n){p.warning("Please fill in all required fields");return}const a=document.getElementById("generate-draft-btn");a.disabled=!0,document.getElementById("generate-btn-text").textContent="Generating...";try{let i;x()?i=await Ne(w,t):(await new Promise(s=>setTimeout(s,2e3)),i=rt(w,t),p.info("Showing demo draft. Add your Gemini API key in Settings for live generation.")),le=i,l.incrementUsage("drafts"),l.logActivity("draft",`Generated: ${i.title||w}`,"✍️"),st(i,t)}catch(i){p.error("Draft generation failed: "+i.message)}finally{a.disabled=!1,document.getElementById("generate-btn-text").textContent="Generate Draft"}}function st(e,t){var a,i,s;const n=document.getElementById("draft-preview-section");n.style.display="block",n.innerHTML=`
    <div class="draft-preview animate-fade-up">
      <div class="draft-preview-header">
        <h4>${Z(e.title||"Legal Draft")}</h4>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-ghost btn-sm" id="copy-draft-btn">📋 Copy</button>
          <button class="btn btn-secondary btn-sm" id="export-draft-btn">📥 Export</button>
          <button class="btn btn-primary btn-sm" id="save-draft-btn">💾 Save</button>
        </div>
      </div>
      <div class="draft-preview-content" id="draft-content">
        ${Q(e.content||e.raw||"")}
      </div>
    </div>
  `,n.scrollIntoView({behavior:"smooth"}),(a=document.getElementById("copy-draft-btn"))==null||a.addEventListener("click",()=>{navigator.clipboard.writeText(e.content||e.raw||""),p.success("Draft copied to clipboard")}),(i=document.getElementById("export-draft-btn"))==null||i.addEventListener("click",()=>{k(`<h1>${Z(e.title||"Legal Draft")}</h1>${Q(e.content||e.raw||"")}`,e.title||"Legal Draft",`draft_${w}_${Date.now()}.html`),p.success("Draft exported")}),(s=document.getElementById("save-draft-btn"))==null||s.addEventListener("click",()=>{l.saveDocument({type:"draft",title:e.title||`${w} Draft`,content:e,metadata:{template:w,formData:t}}),p.success("Draft saved to library")})}function Q(e){return e.replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>").replace(/^(\d+\.\s)/gm,"<strong>$1</strong>").replace(/^(WHEREAS|NOW THEREFORE|IN WITNESS WHEREOF)/gm,"<strong>$1</strong>")}function rt(e,t){const n=new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"});return{legal_notice:{title:"LEGAL NOTICE",content:`LEGAL NOTICE

Date: ${n}

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

This Non-Disclosure Agreement ("Agreement") is entered into on ${n}

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
`)}`}}function Z(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const ot=[{id:"petition",label:"Petition",icon:"📑"},{id:"fir",label:"FIR",icon:"🚔"},{id:"agreement",label:"Agreement",icon:"📃"},{id:"legal_notice",label:"Legal Notice",icon:"📋"},{id:"contract",label:"Contract",icon:"📝"}];let R=null;function lt(){return`
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>🔬 AI Case Analyzer</h2>
        <p>Upload a legal document for AI-powered risk analysis and insights.</p>
      </div>

      <div class="analyzer-upload">
        <h4 style="margin-bottom: 12px;">Document Type</h4>
        <div class="doc-type-selector">${ot.map(t=>`
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
          ${x()?'<span class="badge badge-success">API Connected</span>':'<span class="badge badge-warning">Demo Mode</span>'}
          <button class="btn btn-primary" id="analyze-btn" style="margin-left: auto;">
            <span id="analyze-btn-text">Analyze Document</span>
          </button>
        </div>
      </div>

      <div id="analysis-loading" style="display: none;"></div>
      <div id="analysis-report" style="display: none;"></div>
    </div>
  `}function ct(){var a;document.querySelectorAll("[data-doctype]").forEach(i=>{i.addEventListener("click",()=>{R=i.dataset.doctype,document.querySelectorAll("[data-doctype]").forEach(s=>s.classList.remove("active")),i.classList.add("active")})});const e=document.getElementById("analyzer-dropzone"),t=document.getElementById("analyzer-file-input"),n=document.getElementById("analyzer-text");e==null||e.addEventListener("click",()=>t==null?void 0:t.click()),e==null||e.addEventListener("dragover",i=>{i.preventDefault(),e.classList.add("drag-over")}),e==null||e.addEventListener("dragleave",()=>e.classList.remove("drag-over")),e==null||e.addEventListener("drop",i=>{i.preventDefault(),e.classList.remove("drag-over");const s=i.dataTransfer.files[0];s&&ee(s,n,e)}),t==null||t.addEventListener("change",i=>{const s=i.target.files[0];s&&ee(s,n,e)}),(a=document.getElementById("analyze-btn"))==null||a.addEventListener("click",()=>dt(n))}function ee(e,t,n){if(e.size>10*1024*1024){p.error("File too large. Maximum 10MB.");return}if(e.name.split(".").pop().toLowerCase()==="txt"){const i=new FileReader;i.onload=s=>{t.value=s.target.result,n.innerHTML=`
        <div class="file-dropzone-icon" style="background:rgba(0,184,148,0.1);">✓</div>
        <h4>${e.name}</h4>
        <p class="text-muted">${(e.size/1024).toFixed(1)} KB loaded</p>
      `,p.success("File loaded")},i.readAsText(e)}else n.innerHTML=`
      <div class="file-dropzone-icon" style="background:rgba(253,203,110,0.1);">📄</div>
      <h4>${e.name}</h4>
      <p class="text-muted">💡 Paste text directly for best results</p>
    `,p.info("For best results, paste the document text directly")}async function dt(e){const t=e.value.trim();if(!t||t.length<50){p.warning("Please provide document text (minimum 50 characters)");return}if(!R){p.warning("Please select a document type");return}const n=document.getElementById("analyze-btn"),a=document.getElementById("analysis-loading"),i=document.getElementById("analysis-report");n.disabled=!0,document.getElementById("analyze-btn-text").textContent="Analyzing...",a.style.display="block",i.style.display="none",a.innerHTML=`
    <div class="card animate-fade-up" style="padding: 40px; text-align: center;">
      <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
        <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
      </div>
      <p class="text-muted">Analyzing document for risks and issues...</p>
    </div>
  `;try{let s;x()?s=await Be(t,R):(await new Promise(r=>setTimeout(r,2500)),s=qe(),p.info("Showing demo analysis. Add Gemini API key in Settings for live analysis.")),l.incrementUsage("analyses"),l.logActivity("analysis",`Analyzed: ${R}`,"🔬"),a.style.display="none",i.style.display="block",i.innerHTML=ut(s),i.scrollIntoView({behavior:"smooth"}),pt(s)}catch(s){p.error("Analysis failed: "+s.message),a.style.display="none"}finally{n.disabled=!1,document.getElementById("analyze-btn-text").textContent="Analyze Document"}}function ut(e){const t=e.overall_risk_score>=70?"var(--danger)":e.overall_risk_score>=40?"var(--warning)":"var(--secondary)",n=e.overall_risk_score>=70?"High Risk":e.overall_risk_score>=40?"Medium Risk":"Low Risk",a=2*Math.PI*60,i=a-e.overall_risk_score/100*a,s=(e.key_facts||[]).map(d=>`<div class="fact-item"><span>•</span><span>${h(d)}</span></div>`).join(""),r=(e.risks||[]).map(d=>`<div class="risk-item">
      <div class="risk-dot ${d.level}"></div>
      <div class="risk-item-content">
        <h5>${h(d.title)}</h5>
        <p>${h(d.description)}</p>
      </div>
    </div>`).join(""),o=(e.missing_clauses||[]).map(d=>`<div class="clause-item"><span>⚠️</span><div><strong>${h(d.clause)}</strong><br><span class="text-xs text-muted">${h(d.importance)}</span></div></div>`).join(""),u=(e.legal_issues||[]).map(d=>`<div class="issue-item"><span>ℹ️</span><div><strong>${h(d.issue)}</strong><br><span class="text-xs text-muted">${h(d.explanation)}</span></div></div>`).join("");return`
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
              stroke-dasharray="${a}" stroke-dashoffset="${i}"
              style="transition: stroke-dashoffset 1.5s ease;" />
          </svg>
          <div class="risk-gauge-center">
            <div class="risk-gauge-value" style="color: ${t};">${e.overall_risk_score}</div>
            <div class="risk-gauge-label">${n}</div>
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
          ${u||'<p class="text-muted">No legal issues identified.</p>'}
        </div>
      </div>
    </div>
  `}function pt(e){var t,n;(t=document.getElementById("save-analysis-btn"))==null||t.addEventListener("click",()=>{l.saveDocument({type:"analysis",title:`${e.document_type||"Document"} Analysis`,content:e}),p.success("Analysis saved to library")}),(n=document.getElementById("export-analysis-btn"))==null||n.addEventListener("click",()=>{let a="<h1>Case Analysis Report</h1>";a+=`<div class="meta">Document Type: ${h(e.document_type||"Unknown")} | Risk Score: ${e.overall_risk_score}/100</div>`,a+='<div class="section"><div class="section-title">Key Facts</div><ul>',(e.key_facts||[]).forEach(i=>{a+=`<li>${h(i)}</li>`}),a+="</ul></div>",a+='<div class="section"><div class="section-title">Risk Assessment</div>',(e.risks||[]).forEach(i=>{a+=`<p><span class="risk-${i.level}">[${i.level.toUpperCase()}]</span> <strong>${h(i.title)}</strong> — ${h(i.description)}</p>`}),a+="</div>",a+='<div class="section"><div class="section-title">Missing Clauses</div><ul>',(e.missing_clauses||[]).forEach(i=>{a+=`<li><strong>${h(i.clause)}</strong>: ${h(i.importance)}</li>`}),a+="</ul></div>",a+='<div class="section"><div class="section-title">Recommendation</div>',a+=`<p>${h(e.recommendation||"")}</p></div>`,k(a,"Case Analysis Report",`analysis_${Date.now()}.html`),p.success("Analysis exported")})}function h(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}function mt({title:e,content:t,footer:n,maxWidth:a="540px"}){const i=document.getElementById("modal-container");if(!i)return;i.innerHTML=`
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal" style="max-width: ${a}">
        <div class="modal-header">
          <h3>${e}</h3>
          <button class="modal-close" id="modal-close-btn">✕</button>
        </div>
        <div class="modal-body">${t}</div>
        ${`<div class="modal-footer">${n}</div>`}
      </div>
    </div>
  `,requestAnimationFrame(()=>{const u=document.getElementById("modal-overlay");u&&u.classList.add("visible")});const s=document.getElementById("modal-close-btn"),r=document.getElementById("modal-overlay"),o=()=>{r.classList.remove("visible"),setTimeout(()=>{i.innerHTML=""},200)};return s.addEventListener("click",o),r.addEventListener("click",u=>{u.target===r&&o()}),document.addEventListener("keydown",function u(d){d.key==="Escape"&&(o(),document.removeEventListener("keydown",u))}),o}function F(e,t="Confirm"){return new Promise(n=>{const a=mt({title:t,content:`<p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.6;">${e}</p>`,footer:`
        <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="modal-confirm">Confirm</button>
      `});setTimeout(()=>{var i,s;(i=document.getElementById("modal-cancel"))==null||i.addEventListener("click",()=>{a(),n(!1)}),(s=document.getElementById("modal-confirm"))==null||s.addEventListener("click",()=>{a(),n(!0)})},50)})}const ce={research:{icon:"🔍",label:"Research",badgeClass:"badge-primary"},summary:{icon:"📄",label:"Summary",badgeClass:"badge-success"},draft:{icon:"✍️",label:"Draft",badgeClass:"badge-warning"},analysis:{icon:"🔬",label:"Analysis",badgeClass:"badge-danger"}};let N="all",P="";function gt(){return`
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
  `}function yt(){var e;M(),document.querySelectorAll("[data-filter]").forEach(t=>{t.addEventListener("click",()=>{N=t.dataset.filter,document.querySelectorAll("[data-filter]").forEach(n=>n.classList.remove("active")),t.classList.add("active"),M()})}),(e=document.getElementById("library-search-input"))==null||e.addEventListener("input",t=>{P=t.target.value.trim().toLowerCase(),M()})}function M(){const e=document.getElementById("library-content");if(!e)return;let t=l.getDocuments();if(N!=="all"&&(t=t.filter(a=>a.type===N)),P&&(t=t.filter(a=>{var i,s;return((i=a.title)==null?void 0:i.toLowerCase().includes(P))||((s=a.type)==null?void 0:s.toLowerCase().includes(P))})),t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">📁</div>
        <h4>No documents found</h4>
        <p>${N!=="all"?"No documents in this category.":P?"Try a different search term.":"Start using NyayaGPT to build your document library."}</p>
        <div style="display: flex; gap: 12px; justify-content: center; margin-top: 16px;">
          <a href="#/research" class="btn btn-primary btn-sm">🔍 Start Research</a>
          <a href="#/drafts" class="btn btn-secondary btn-sm">✍️ Create Draft</a>
        </div>
      </div>
    `;return}const n=t.map(a=>{var s;const i=ce[a.type]||{icon:"📄",label:a.type,badgeClass:"badge-info"};return`
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2rem;">${i.icon}</span>
            <div>
              <div style="font-weight: 500;">${S(a.title||"Untitled")}</div>
              <div class="text-xs text-muted">${(s=a.id)==null?void 0:s.slice(0,8)}</div>
            </div>
          </div>
        </td>
        <td><span class="badge ${i.badgeClass}">${i.label}</span></td>
        <td class="text-muted text-sm">${U(a.createdAt)}</td>
        <td>
          <div style="display: flex; gap: 4px;">
            <button class="btn btn-ghost btn-sm btn-icon" title="Export" data-export="${a.id}">📥</button>
            <button class="btn btn-ghost btn-sm btn-icon" title="Delete" data-delete="${a.id}" style="color: var(--danger);">🗑</button>
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
        <tbody>${n}</tbody>
      </table>
    </div>
    <p class="text-xs text-muted" style="margin-top: 12px;">${t.length} document${t.length!==1?"s":""}</p>
  `,e.querySelectorAll("[data-export]").forEach(a=>{a.addEventListener("click",()=>{const i=t.find(s=>s.id===a.dataset.export);i&&vt(i)})}),e.querySelectorAll("[data-delete]").forEach(a=>{a.addEventListener("click",async()=>{await F("Are you sure you want to delete this document? This cannot be undone.")&&(ht(a.dataset.delete),M(),p.success("Document deleted"))})})}function vt(e){const t=ce[e.type]||{label:"Document"};let n=`<h1>${S(e.title||"Document")}</h1>`;n+=`<div class="meta">Type: ${t.label} | Created: ${new Date(e.createdAt).toLocaleDateString("en-IN")}</div>`;const a=e.content;typeof a=="string"?n+=`<p>${S(a)}</p>`:a&&Object.entries(a).forEach(([i,s])=>{i!=="raw"&&(n+=`<div class="section"><div class="section-title">${i.replace(/_/g," ")}</div>`,Array.isArray(s)?n+=`<ul>${s.map(r=>`<li>${S(typeof r=="object"?JSON.stringify(r):r)}</li>`).join("")}</ul>`:typeof s=="object"?n+=`<pre>${S(JSON.stringify(s,null,2))}</pre>`:n+=`<p>${S(String(s))}</p>`,n+="</div>")}),k(n,e.title||"Document",`${e.type}_${Date.now()}.html`),p.success("Document exported")}function ht(e){const t=l.getDocuments().filter(n=>n.id!==e);l.set("documents",t)}function S(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const ft=[{id:"profile",label:"Profile",icon:"👤"},{id:"api",label:"API Keys",icon:"🔑"},{id:"plan",label:"Subscription",icon:"💎"},{id:"data",label:"Data & Privacy",icon:"🔒"}];let $="profile";function bt(){return`
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>⚙️ Settings</h2>
        <p>Manage your profile, API keys, and subscription.</p>
      </div>

      <div class="settings-layout">
        <nav class="settings-nav">${ft.map(t=>`
    <button class="settings-nav-item ${t.id===$?"active":""}" data-settings-tab="${t.id}">
      <span>${t.icon}</span> ${t.label}
    </button>
  `).join("")}</nav>
        <div class="settings-content" id="settings-content">
          ${de($)}
        </div>
      </div>
    </div>
  `}function xt(){document.querySelectorAll("[data-settings-tab]").forEach(e=>{e.addEventListener("click",()=>{$=e.dataset.settingsTab,document.querySelectorAll("[data-settings-tab]").forEach(n=>n.classList.remove("active")),e.classList.add("active");const t=document.getElementById("settings-content");t&&(t.innerHTML=de($),T($))})}),T($)}function de(e){switch(e){case"profile":return wt();case"api":return z();case"plan":return ue();case"data":return At();default:return""}}function wt(){const e=l.getUser()||{};return`
    <div class="settings-section">
      <h4>Personal Information</h4>
      <p>Update your profile details.</p>
      <form id="profile-form" class="settings-form-grid">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" id="settings-name" value="${B(e.name||"")}" />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="settings-email" value="${B(e.email||"")}" />
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
          <input type="text" class="form-input" id="settings-barcouncil" value="${B(e.barCouncil||"")}" placeholder="e.g., D/1234/2020" />
        </div>
      </form>
      <div style="margin-top: 20px;">
        <button class="btn btn-primary" id="save-profile-btn">Save Changes</button>
      </div>
    </div>
  `}function z(){const e=l.get("gemini_api_key",""),t=e?e.slice(0,8)+"•".repeat(20)+e.slice(-4):"";return`
    <div class="settings-section">
      <h4>🔑 Gemini API Key</h4>
      <p>NyayaGPT uses Google Gemini AI for legal research, summarization, and draft generation. You can get a free API key from Google AI Studio.</p>

      <div style="margin-top: 20px;">
        <div class="form-group" style="max-width: 500px;">
          <label class="form-label">API Key</label>
          <div style="display: flex; gap: 8px;">
            <input type="password" class="form-input" id="api-key-input" value="${B(e)}" placeholder="Enter your Gemini API key..." style="flex: 1;" />
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
          ${x()?'<div style="width: 10px; height: 10px; border-radius: 50%; background: var(--secondary); box-shadow: 0 0 8px rgba(0,184,148,0.5);"></div><span style="color: var(--secondary);">Connected</span>':'<div style="width: 10px; height: 10px; border-radius: 50%; background: var(--warning);"></div><span style="color: var(--warning);">Demo Mode (no API key)</span>'}
        </div>
      </div>
    </div>
  `}function ue(){const t=(l.getUser()||{}).plan||"free";return`
    <div class="settings-section">
      <h4>Subscription Plan</h4>
      <p>Manage your NyayaGPT subscription.</p>

      ${[{id:"free",name:"Free",price:"₹0/mo",desc:"5 queries/day, 3 summaries/month",current:t==="free"},{id:"pro",name:"Pro Lawyer",price:"₹999/mo",desc:"Unlimited everything + PDF export",current:t==="pro"},{id:"firm",name:"Law Firm",price:"₹4,999/mo",desc:"10 team members + API access",current:t==="firm"}].map(a=>`
        <div class="plan-card" style="${a.current?"border-color: var(--primary);":""}">
          <div class="plan-info">
            <h5>${a.name} ${a.current?'<span class="badge badge-primary">Current</span>':""}</h5>
            <p>${a.desc}</p>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 700; font-size: 1.125rem;">${a.price}</span>
            ${a.current?"":`<button class="btn btn-outline btn-sm" data-switch-plan="${a.id}">Switch</button>`}
          </div>
        </div>
      `).join("")}

      <div style="margin-top: 24px; padding: 16px; background: rgba(108,92,231,0.05); border-radius: var(--radius-sm); border: 1px solid rgba(108,92,231,0.15);">
        <p class="text-sm text-muted">💡 Payments will be processed via Razorpay in the next update. For now, all features are accessible for testing.</p>
      </div>
    </div>
  `}function At(){const e=l.getDocuments(),t=l.getResearchHistory();return`
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
  `}function T(e){var t,n,a,i,s;switch(e){case"profile":(t=document.getElementById("save-profile-btn"))==null||t.addEventListener("click",()=>{var o,u,d,c,v,g,A;const r=l.getUser()||{};r.name=((u=(o=document.getElementById("settings-name"))==null?void 0:o.value)==null?void 0:u.trim())||r.name,r.email=((c=(d=document.getElementById("settings-email"))==null?void 0:d.value)==null?void 0:c.trim())||r.email,r.role=((v=document.getElementById("settings-role"))==null?void 0:v.value)||r.role,r.barCouncil=((A=(g=document.getElementById("settings-barcouncil"))==null?void 0:g.value)==null?void 0:A.trim())||"",l.setUser(r),p.success("Profile updated")});break;case"api":(n=document.getElementById("save-api-key-btn"))==null||n.addEventListener("click",()=>{var o,u;const r=(u=(o=document.getElementById("api-key-input"))==null?void 0:o.value)==null?void 0:u.trim();if(r){l.set("gemini_api_key",r),p.success("API key saved! AI features are now live.");const d=document.getElementById("settings-content");d&&(d.innerHTML=z(),T("api"))}else{l.remove("gemini_api_key"),p.info("API key removed. Running in demo mode.");const d=document.getElementById("settings-content");d&&(d.innerHTML=z(),T("api"))}});break;case"plan":document.querySelectorAll("[data-switch-plan]").forEach(r=>{r.addEventListener("click",()=>{const o=l.getUser()||{};o.plan=r.dataset.switchPlan,l.setUser(o),p.success(`Switched to ${o.plan} plan`);const u=document.getElementById("settings-content");u&&(u.innerHTML=ue(),T("plan"))})});break;case"data":(a=document.getElementById("export-all-data-btn"))==null||a.addEventListener("click",()=>{const r={user:l.getUser(),documents:l.getDocuments(),research:l.getResearchHistory(),activity:l.getActivity(),usage:l.getUsage(),exportedAt:new Date().toISOString()},o=new Blob([JSON.stringify(r,null,2)],{type:"application/json"}),u=URL.createObjectURL(o),d=document.createElement("a");d.href=u,d.download=`nyayagpt_backup_${Date.now()}.json`,d.click(),URL.revokeObjectURL(u),p.success("Data exported")}),(i=document.getElementById("clear-all-data-btn"))==null||i.addEventListener("click",async()=>{if(await F("This will delete ALL your documents, research history, and settings. This cannot be undone.")){const o=l.getUser(),u=l.get("gemini_api_key");l.clear(),o&&l.setUser(o),u&&l.set("gemini_api_key",u),p.success("All data cleared")}}),(s=document.getElementById("delete-account-btn"))==null||s.addEventListener("click",async()=>{await F("⚠️ This will permanently delete your account and ALL associated data. Are you absolutely sure?")&&(l.clear(),p.success("Account deleted"),window.location.hash="/")});break}}function B(e){return e.replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const Et=[{section:"MAIN"},{path:"/dashboard",icon:"📊",label:"Dashboard"},{path:"/research",icon:"🔍",label:"AI Research"},{path:"/summarizer",icon:"📄",label:"Summarizer"},{path:"/drafts",icon:"✍️",label:"Draft Generator"},{path:"/analyzer",icon:"🔬",label:"Case Analyzer"},{section:"LIBRARY"},{path:"/library",icon:"📁",label:"My Documents"},{section:"ACCOUNT"},{path:"/settings",icon:"⚙️",label:"Settings"}];function It(){const e=l.get("sidebar_collapsed",!1),t=m.getCurrentPath(),n=Et.map(a=>{if(a.section)return`<div class="sidebar-section-title">${a.section}</div>`;const i=t===a.path;return`
      <a href="#${a.path}" class="sidebar-link ${i?"active":""}" data-route="${a.path}">
        <span class="sidebar-link-icon">${a.icon}</span>
        <span class="sidebar-label">${a.label}</span>
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
        ${n}
      </nav>

      <div class="sidebar-upgrade">
        <div class="sidebar-upgrade-card">
          <h5>🚀 Upgrade to Pro</h5>
          <p>Unlock unlimited AI queries</p>
          <button class="btn btn-primary btn-sm" onclick="window.location.hash='/settings'" style="width:100%">Upgrade Now</button>
        </div>
      </div>
    </aside>
  `}function St(){const e=document.getElementById("sidebar-toggle");e&&e.addEventListener("click",()=>{const t=document.getElementById("sidebar"),n=document.querySelector(".main-content"),a=t.classList.toggle("collapsed");l.set("sidebar_collapsed",a),n&&n.classList.toggle("sidebar-collapsed",a),e.textContent=a?"▶":"◀"})}function $t(e){document.querySelectorAll(".sidebar-link").forEach(t=>{const n=t.getAttribute("data-route");t.classList.toggle("active",n===e)})}const Pt={"/dashboard":{breadcrumb:"Home",title:"Dashboard"},"/research":{breadcrumb:"Tools",title:"AI Research"},"/summarizer":{breadcrumb:"Tools",title:"Summarizer"},"/drafts":{breadcrumb:"Tools",title:"Draft Generator"},"/analyzer":{breadcrumb:"Tools",title:"Case Analyzer"},"/library":{breadcrumb:"Library",title:"My Documents"},"/settings":{breadcrumb:"Account",title:"Settings"}};function Tt(e){const t=l.getUser(),n=Pt[e]||{breadcrumb:"Home",title:"Dashboard"},a=t!=null&&t.name?t.name.split(" ").map(i=>i[0]).join("").toUpperCase().slice(0,2):"U";return`
    <header class="topbar">
      <div class="topbar-left">
        <button class="topbar-icon-btn" id="mobile-menu-btn" style="display:none">☰</button>
        <div class="topbar-breadcrumb">
          <span>${n.breadcrumb}</span>
          <span>/</span>
          <span class="current">${n.title}</span>
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
          ${a}
        </div>
      </div>
    </header>
  `}function kt(){const e=document.getElementById("mobile-menu-btn");e&&(window.innerWidth<=1024&&(e.style.display="flex"),e.addEventListener("click",()=>{const n=document.getElementById("sidebar");n&&n.classList.toggle("mobile-open")}));const t=document.getElementById("topbar-avatar");t&&t.addEventListener("click",()=>{window.location.hash="/settings"}),window.addEventListener("resize",()=>{const n=document.getElementById("mobile-menu-btn");n&&(n.style.display=window.innerWidth<=1024?"flex":"none")})}function E(e,t){const n=document.getElementById("app"),a=l.get("sidebar_collapsed",!1);n.innerHTML=`
    ${It()}
    <div class="main-content ${a?"sidebar-collapsed":""}">
      ${Tt(e)}
      ${t}
    </div>
  `,St(),kt(),$t(e)}function q(e){const t=document.getElementById("app");t.innerHTML=e}function I(e){return l.isLoggedIn()?!0:(m.navigate("/login"),!1)}m.register("/",()=>{if(l.isLoggedIn()){m.navigate("/dashboard");return}q(me()),ge()});m.register("/login",()=>{if(l.isLoggedIn()){m.navigate("/dashboard");return}q(ve()),fe()});m.register("/signup",()=>{if(l.isLoggedIn()){m.navigate("/dashboard");return}q(he()),be()});m.register("/dashboard",e=>{I()&&E(e,Ie())});m.register("/research",e=>{I()&&(E(e,Fe()),ze())});m.register("/summarizer",e=>{I()&&(E(e,Je()),Ke())});m.register("/drafts",e=>{I()&&(E(e,tt()),at())});m.register("/analyzer",e=>{I()&&(E(e,lt()),ct())});m.register("/library",e=>{I()&&(E(e,gt()),yt())});m.register("/settings",e=>{I()&&(E(e,bt()),xt())});m.register("/logout",()=>{l.logout(),m.navigate("/")});m.register("/404",()=>{q(`
    <div class="auth-page">
      <div class="auth-card animate-scale-in" style="text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 16px;">🔍</div>
        <h2>Page Not Found</h2>
        <p class="auth-subtitle">The page you're looking for doesn't exist.</p>
        <a href="#/" class="btn btn-primary" style="margin-top: 20px;">Go Home</a>
      </div>
    </div>
  `)});document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),l.isLoggedIn())){const t=document.getElementById("topbar-search");t&&t.click()}});window.navigateTo=e=>{m.navigate(e)};console.log("%c⚖️ NyayaGPT","font-size: 24px; font-weight: bold; color: #6C5CE7;");console.log("%cAI-Powered Legal Intelligence for Indian Law","font-size: 12px; color: #8888A8;");m.start();
