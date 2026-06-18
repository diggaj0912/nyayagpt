(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();class ge{constructor(){this.routes={},this.currentRoute=null,this.beforeEach=null,window.addEventListener("hashchange",()=>this.resolve())}register(t,n){return this.routes[t]=n,this}navigate(t){window.location.hash=t}getCurrentPath(){return window.location.hash.slice(1)||"/"}async resolve(){const t=this.getCurrentPath(),n=this.routes[t]||this.routes["/404"];this.beforeEach&&!this.beforeEach(t,this.currentRoute)||(this.currentRoute=t,n&&await n(t))}start(){this.resolve()}}const g=new ge,z="nyayagpt_",l={get(e,t=null){try{const n=localStorage.getItem(z+e);return n?JSON.parse(n):t}catch{return t}},set(e,t){try{localStorage.setItem(z+e,JSON.stringify(t))}catch(n){console.warn("Storage full or unavailable:",n)}},remove(e){localStorage.removeItem(z+e)},clear(){Object.keys(localStorage).filter(e=>e.startsWith(z)).forEach(e=>localStorage.removeItem(e))},getUser(){return this.get("user",null)},setUser(e){this.set("user",e)},isLoggedIn(){return!!this.getUser()},logout(){this.remove("user")},getDocuments(){return this.get("documents",[])},saveDocument(e){const t=this.getDocuments();return e.id=e.id||crypto.randomUUID(),e.createdAt=e.createdAt||new Date().toISOString(),t.unshift(e),this.set("documents",t),e},getResearchHistory(){return this.get("research_history",[])},saveResearch(e){const t=this.getResearchHistory();return e.id=e.id||crypto.randomUUID(),e.createdAt=new Date().toISOString(),t.unshift(e),this.set("research_history",t.slice(0,50)),e},getActivity(){return this.get("activity",[])},logActivity(e,t,n){const a=this.getActivity();a.unshift({id:crypto.randomUUID(),type:e,title:t,icon:n,timestamp:new Date().toISOString()}),this.set("activity",a.slice(0,20))},getUsage(){return this.get("usage",{research:0,summaries:0,drafts:0,analyses:0})},incrementUsage(e){const t=this.getUsage();t[e]=(t[e]||0)+1,this.set("usage",t)}};function ye(){return`
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
  `}function ve(){const e=document.getElementById("landing-nav");if(e){const t=()=>{e.classList.toggle("scrolled",window.scrollY>50)};window.addEventListener("scroll",t),t()}document.querySelectorAll('.landing-page a[href^="#features"], .landing-page a[href^="#pricing"], .landing-page a[href^="#about"]').forEach(t=>{t.addEventListener("click",n=>{const a=t.getAttribute("href").slice(1),i=document.getElementById(a);i&&(n.preventDefault(),i.scrollIntoView({behavior:"smooth",block:"start"}))})})}const J={success:"✓",error:"✕",info:"ℹ",warning:"⚠"},K={success:"Success",error:"Error",info:"Info",warning:"Warning"};let fe=0;function D(e,t="info",n=4e3){const a=document.getElementById("toast-container");if(!a)return;const i=`toast-${++fe}`,s=document.createElement("div");return s.className=`toast toast-${t}`,s.id=i,s.innerHTML=`
    <span class="toast-icon">${J[t]||J.info}</span>
    <div class="toast-content">
      <div class="toast-title">${K[t]||K.info}</div>
      <div class="toast-message">${e}</div>
    </div>
    <button class="toast-close" onclick="document.getElementById('${i}').classList.add('toast-exit'); setTimeout(() => document.getElementById('${i}')?.remove(), 300)">✕</button>
  `,a.appendChild(s),n>0&&setTimeout(()=>{s.parentNode&&(s.classList.add("toast-exit"),setTimeout(()=>s.remove(),300))},n),i}const c={success:(e,t)=>D(e,"success",t),error:(e,t)=>D(e,"error",t),info:(e,t)=>D(e,"info",t),warning:(e,t)=>D(e,"warning",t)};function he(){return`
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
  `}function be(){return`
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
  `}function xe(){const e=document.getElementById("login-form");e&&e.addEventListener("submit",n=>{n.preventDefault();const a=document.getElementById("login-email").value.trim(),i=document.getElementById("login-password").value;if(!a||!i){c.error("Please fill in all fields");return}const s=l.getUser();if(s&&s.email===a){c.success("Welcome back!"),g.navigate("/dashboard");return}const r={id:crypto.randomUUID(),name:a.split("@")[0].replace(/[._]/g," ").replace(/\b\w/g,o=>o.toUpperCase()),email:a,role:"lawyer",plan:"free",createdAt:new Date().toISOString()};l.setUser(r),c.success("Welcome to NyayaGPT!"),g.navigate("/dashboard")});const t=document.getElementById("google-login-btn");t&&t.addEventListener("click",()=>{c.info("Google OAuth will be available in the next update")})}function we(){const e=document.getElementById("signup-form");e&&e.addEventListener("submit",n=>{n.preventDefault();const a=document.getElementById("signup-name").value.trim(),i=document.getElementById("signup-email").value.trim(),s=document.getElementById("signup-password").value,r=document.getElementById("signup-role").value;if(!a||!i||!s){c.error("Please fill in all fields");return}if(s.length<8){c.error("Password must be at least 8 characters");return}const o={id:crypto.randomUUID(),name:a,email:i,role:r,plan:"free",createdAt:new Date().toISOString()};l.setUser(o),l.logActivity("signup","Account created","🎉"),c.success("Account created! Welcome to NyayaGPT"),g.navigate("/dashboard")});const t=document.getElementById("google-signup-btn");t&&t.addEventListener("click",()=>{c.info("Google OAuth will be available in the next update")})}function $e(e,t){const n=new Blob([e],{type:"text/plain;charset=utf-8"}),a=URL.createObjectURL(n),i=document.createElement("a");i.href=a,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a)}function P(e,t,n){const a=`<!DOCTYPE html>
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
</html>`,i=new Blob([a],{type:"text/html;charset=utf-8"}),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=n.replace(".pdf",".html"),document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(s)}function Ee(e,t){const n=window.open("","_blank");n.document.write(`<!DOCTYPE html>
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
</html>`),n.document.close(),n.print()}function te(e){return new Date(e).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function G(e){const t=new Date,n=new Date(e),a=Math.floor((t-n)/1e3);return a<60?"just now":a<3600?`${Math.floor(a/60)}m ago`:a<86400?`${Math.floor(a/3600)}h ago`:a<604800?`${Math.floor(a/86400)}d ago`:te(e)}const O=Object.freeze(Object.defineProperty({__proto__:null,downloadAsHTML:P,downloadAsText:$e,formatDate:te,printContent:Ee,timeAgo:G},Symbol.toStringTag,{value:"Module"})),Ae=[{icon:"🔍",title:"AI Research",desc:"Search Indian legal knowledge",route:"/research",color:"card-icon-purple"},{icon:"📄",title:"Summarize",desc:"Upload & summarize judgments",route:"/summarizer",color:"card-icon-green"},{icon:"✍️",title:"Draft",desc:"Generate legal documents",route:"/drafts",color:"card-icon-gold"},{icon:"🔬",title:"Analyze",desc:"Analyze cases & contracts",route:"/analyzer",color:"card-icon-red"}];function ke(){var d;const e=l.getUser(),t=l.getUsage(),n=l.getActivity(),a=l.getDocuments(),i=Ie(),s=Ae.map(p=>`
    <div class="quick-action-card card-interactive" onclick="window.location.hash='${p.route}'">
      <div class="quick-action-icon ${p.color}">${p.icon}</div>
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
    </div>
  `).join(""),r=n.length>0?n.slice(0,8).map(p=>`
      <div class="activity-item">
        <div class="activity-icon" style="background: var(--bg-surface-2);">${p.icon||"📋"}</div>
        <div class="activity-info">
          <h5>${p.title}</h5>
          <p>${G(p.timestamp)}</p>
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
            ${B("Research",t.research||0,m.research)}
            ${B("Summaries",t.summaries||0,m.summaries)}
            ${B("Drafts",t.drafts||0,m.drafts)}
            ${B("Analyses",t.analyses||0,m.analyses)}
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
  `}function B(e,t,n){const a=Math.min(t/n*100,100),i=t>=n;return`
    <div class="usage-item">
      <div class="usage-item-header">
        <span class="usage-item-label">${e}</span>
        <span class="usage-item-value" style="${i?"color: var(--danger);":""}">${t}/${n}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${a}%; ${i?"background: var(--danger);":""}"></div>
      </div>
    </div>
  `}function Ie(){const e=new Date().getHours();return e<12?"Good morning":e<17?"Good afternoon":"Good evening"}const Se="modulepreload",Le=function(e){return"/"+e},V={},W=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){let r=function(d){return Promise.all(d.map(p=>Promise.resolve(p).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),m=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=r(n.map(d=>{if(d=Le(d),d in V)return;V[d]=!0;const p=d.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const v=document.createElement("link");if(v.rel=p?"stylesheet":Se,p||(v.as="script"),v.crossOrigin="",v.href=d,m&&v.setAttribute("nonce",m),document.head.appendChild(v),p)return new Promise((C,ue)=>{v.addEventListener("load",C),v.addEventListener("error",()=>ue(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(r){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r}return i.then(r=>{for(const o of r||[])o.status==="rejected"&&s(o.reason);return t().catch(s)})};function T(){const e={"Content-Type":"application/json"},t=ne();t&&(e["x-supabase-token"]=t);const n=l.get("gemini_api_key","");return n&&(e.Authorization=`Bearer ${n}`),e}function ne(){try{const t=Object.keys(localStorage).find(n=>n.startsWith("sb-")&&n.endsWith("-auth-token"));if(t){const n=JSON.parse(localStorage.getItem(t));return(n==null?void 0:n.access_token)||""}}catch(e){console.error("Failed to parse cached session token:",e)}return""}function $(){return!!l.get("gemini_api_key","")||!!ne()}async function _e(e,t="legal"){const n=await fetch("/api/research",{method:"POST",headers:T(),body:JSON.stringify({query:e,mode:t})});if(!n.ok){const a=await n.json().catch(()=>({}));throw new Error(a.error||`Research query failed: ${n.status}`)}return await n.json()}async function Pe(e){const t=await fetch("/api/summarizer/upload",{method:"POST",headers:T(),body:JSON.stringify({documentText:e})});if(!t.ok){const n=await t.json().catch(()=>({}));throw new Error(n.error||`Summarizer upload failed: ${t.status}`)}return await t.json()}async function Te(e,t){const n=await fetch("/api/drafts/generate",{method:"POST",headers:T(),body:JSON.stringify({templateId:e,formData:t})});if(!n.ok){const a=await n.json().catch(()=>({}));throw new Error(a.error||`Draft generation failed: ${n.status}`)}return await n.json()}async function Ce(e,t){const n=await fetch("/api/summarizer/upload",{method:"POST",headers:T(),body:JSON.stringify({documentText:e})});if(!n.ok){const i=await n.json().catch(()=>({}));throw new Error(i.error||`Analysis failed: ${n.status}`)}const a=await n.json();return{document_type:t,key_facts:a.facts||[],risks:(a.key_takeaways||[]).map((i,s)=>({level:s%2===0?"high":"medium",title:"Matrimonial Cruelty Risk",description:i})),missing_clauses:[],legal_issues:(a.issues||[]).map(i=>({issue:i,explanation:"Critical framing issue"})),overall_risk_score:65,recommendation:a.verdict||""}}async function ze(e){const t=await fetch("/api/research",{method:"POST",headers:T(),body:JSON.stringify({query:e,mode:"legal"})});if(!t.ok){const a=await t.json().catch(()=>({}));throw new Error(a.error||`Citation lookup failed: ${t.status}`)}const n=await t.json();return{judgments:n.judgments||[],graph:n.graph||{nodes:[],links:[]}}}function De(){return{title:"Arnesh Kumar v. State of Bihar",court:"Supreme Court of India",date:"July 2, 2014",facts:["Anticipatory bail petition in a Section 498A IPC Dowry case."],issues:["Whether arrest under 498A IPC is arbitrary and requires police compliance guidelines."],petitioner_arguments:["Baseless dowry allegations to cause arrest and harassment."],respondent_arguments:["Matrimonial cruelty demands protection and prompt arrest."],court_reasoning:"Section 498A is a tool used as leverage in matrimonial disputes. Automatic arrest castigates the family.",verdict:"Anticipatory bail approved. Directions issued requiring Section 41A CrPC notices before arrest.",key_takeaways:["Notice of appearance must be served within 2 weeks of FIR registration."]}}const ae={legal_notice:{name:"Legal Notice",fields:[{name:"sender_name",label:"Sender (Your Name)",type:"text",required:!0},{name:"sender_address",label:"Sender Address",type:"textarea",required:!0},{name:"recipient_name",label:"Recipient Name",type:"text",required:!0},{name:"recipient_address",label:"Recipient Address",type:"textarea",required:!0},{name:"subject",label:"Subject of Notice",type:"text",required:!0},{name:"facts",label:"Facts & Background",type:"textarea",required:!0},{name:"demand",label:"Your Demand / Relief Sought",type:"textarea",required:!0},{name:"deadline_days",label:"Response Deadline (days)",type:"number",required:!0}]},nda:{name:"Non-Disclosure Agreement",fields:[{name:"disclosing_party",label:"Disclosing Party",type:"text",required:!0},{name:"receiving_party",label:"Receiving Party",type:"text",required:!0},{name:"purpose",label:"Purpose of Disclosure",type:"textarea",required:!0},{name:"confidential_info",label:"Type of Confidential Information",type:"textarea",required:!0},{name:"duration_years",label:"Duration (years)",type:"number",required:!0},{name:"jurisdiction",label:"Jurisdiction (City)",type:"text",required:!0}]},employment:{name:"Employment Agreement",fields:[{name:"company_name",label:"Company Name",type:"text",required:!0},{name:"employee_name",label:"Employee Name",type:"text",required:!0},{name:"designation",label:"Designation / Role",type:"text",required:!0},{name:"salary",label:"Annual CTC (₹)",type:"text",required:!0},{name:"start_date",label:"Start Date",type:"date",required:!0},{name:"probation_months",label:"Probation Period (months)",type:"number",required:!0},{name:"notice_period",label:"Notice Period (months)",type:"number",required:!0},{name:"location",label:"Work Location",type:"text",required:!0}]},service_agreement:{name:"Service Agreement",fields:[{name:"provider_name",label:"Service Provider Name",type:"text",required:!0},{name:"client_name",label:"Client Name",type:"text",required:!0},{name:"services",label:"Scope of Services",type:"textarea",required:!0},{name:"fee",label:"Service Fee (₹)",type:"text",required:!0},{name:"duration",label:"Duration",type:"text",required:!0},{name:"payment_terms",label:"Payment Terms",type:"text",required:!0},{name:"jurisdiction",label:"Jurisdiction (City)",type:"text",required:!0}]},partnership:{name:"Partnership Deed",fields:[{name:"firm_name",label:"Firm Name",type:"text",required:!0},{name:"business_nature",label:"Nature of Business",type:"text",required:!0},{name:"partner1_name",label:"Partner 1 Name",type:"text",required:!0},{name:"partner1_share",label:"Partner 1 Share (%)",type:"number",required:!0},{name:"partner2_name",label:"Partner 2 Name",type:"text",required:!0},{name:"partner2_share",label:"Partner 2 Share (%)",type:"number",required:!0},{name:"capital",label:"Total Capital (₹)",type:"text",required:!0},{name:"location",label:"Business Location",type:"text",required:!0}]}};function ie(){return Object.entries(ae).map(([e,t])=>({id:e,name:t.name,fields:t.fields}))}function se(e){var t;return((t=ae[e])==null?void 0:t.fields)||[]}function Be(){return{document_type:"Service Agreement",key_facts:["Agreement between two parties for software development services","Contract value of ₹15,00,000 with milestone-based payments"],risks:[{level:"high",title:"Vague IP Assignment",description:"IP clauses are vague."}],missing_clauses:[{clause:"Force Majeure",importance:"Protects from pandemic disruptions."}],legal_issues:[{issue:"Stamp Duty Compliance",explanation:"Needs appropriate state stamps."}],overall_risk_score:68,recommendation:"The agreement requires revisions regarding IP and data protection clauses."}}function Re(){return{judgments:[{name:"S.P. Gupta v. President of India",citation:"AIR 1982 SC 149",court:"Supreme Court of India",year:"1981",citation_count:245,citation_strength:"High",hierarchy_level:"Supreme Court",relevance_score:98,snippet:"A landmark judgment establishing the concept of Public Interest Litigation (PIL) in India."}],graph:{nodes:[{id:"sp_gupta",label:"S.P. Gupta v. President of India (1981)",type:"supreme_court"}],links:[]}}}const Me=["What are the ingredients of cheating under BNS?","Latest Supreme Court judgments on privacy?","Important precedents on arbitration?","Remedies for breach of contract under Indian law"];let x="legal";function Ne(){const e=l.getResearchHistory();return`
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
              <button class="btn mode-selector-btn ${x==="legal"?"active":"btn-ghost"}" data-mode="legal" style="justify-content: flex-start; text-align: left; padding: 8px 12px; font-size: 0.8125rem; width: 100%;">
                🔍 Legal Research
              </button>
              <button class="btn mode-selector-btn ${x==="deep"?"active":"btn-ghost"}" data-mode="deep" style="justify-content: flex-start; text-align: left; padding: 8px 12px; font-size: 0.8125rem; width: 100%;">
                🧠 Deep Analysis
              </button>
              <button class="btn mode-selector-btn ${x==="general"?"active":"btn-ghost"}" data-mode="general" style="justify-content: flex-start; text-align: left; padding: 8px 12px; font-size: 0.8125rem; width: 100%;">
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
                ${x==="legal"?"Legal Research Mode":x==="deep"?"Deep Research Memo Mode":"General Assistant"}
              </span>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-tertiary);">
              ${$()?"🟢 API Connected":"🔌 Demo Mode"}
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
              ${Me.map(t=>`<button class="chip text-xs" data-suggest-query="${t}" style="font-size: 0.6875rem; border: 1px solid rgba(0,0,0,0.04); cursor: pointer; padding: 4px 8px; border-radius: 4px; background: rgba(0,0,0,0.01);">${t}</button>`).join("")}
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
  `}function je(){var n;const e=document.getElementById("research-submit-btn"),t=document.getElementById("research-query");(n=document.getElementById("new-research-btn"))==null||n.addEventListener("click",()=>{document.getElementById("canvas-stream").innerHTML=`
      <div id="welcome-canvas" style="padding: 24px; text-align: center; margin-top: 40px; max-width: 460px; margin-left: auto; margin-right: auto;">
        <span style="font-size: 2.5rem;">⚖️</span>
        <h3 style="margin-top: 12px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Search Indian Jurisprudence</h3>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.5;">
          Enter search questions above. Mode switches let you toggle between statutory summaries, deep structural legal memos, and general utility AI tools.
        </p>
      </div>
    `,document.getElementById("inspector-placeholder").style.display="flex",document.getElementById("inspector-content").style.display="none",t&&(t.value="")}),document.querySelectorAll(".mode-selector-btn").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".mode-selector-btn").forEach(s=>{s.classList.remove("active"),s.classList.add("btn-ghost")}),a.classList.add("active"),a.classList.remove("btn-ghost"),x=a.dataset.mode;const i=document.getElementById("canvas-mode-badge");i&&(i.textContent=x==="legal"?"Legal Research Mode":x==="deep"?"Deep Research Memo Mode":"General Assistant")})}),document.querySelectorAll("[data-suggest-query]").forEach(a=>{a.addEventListener("click",()=>{t&&(t.value=a.dataset.suggestQuery,t.focus())})}),document.querySelectorAll(".recent-query-item").forEach(a=>{a.addEventListener("click",()=>{t&&(t.value=a.dataset.queryText,F(t,e))})}),e&&e.addEventListener("click",()=>F(t,e)),t&&t.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),F(t,e))})}async function F(e,t){var i,s,r,o,m;const n=e.value.trim();if(!n){c.warning("Please input your research topic");return}const a=document.getElementById("canvas-stream");t.disabled=!0,document.getElementById("submit-btn-text").textContent="Analyzing...",x==="deep"?(a.innerHTML=qe(),await Fe()):a.innerHTML=`
      <div style="padding: 40px; text-align: center;">
        <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
        <p class="text-muted" style="font-size: 0.875rem;">Querying legal engine and generating output stream...</p>
      </div>
    `;try{const d=await _e(n,x);l.incrementUsage("research"),l.logActivity("research",`${x==="deep"?"Deep":"Legal"} research executed`,"🔍"),l.saveResearch({query:n,actsCount:((i=d.acts)==null?void 0:i.length)||((s=d.applicable_laws)==null?void 0:s.length)||0,judgmentsCount:((r=d.judgments)==null?void 0:r.length)||0}),a.innerHTML=He(n,d),a.scrollTop=0,Ue(d),(o=document.getElementById("save-workspace-btn"))==null||o.addEventListener("click",()=>{l.saveDocument({type:"research",title:n,content:d}),c.success("Research memo successfully saved to library")}),(m=document.getElementById("export-canvas-btn"))==null||m.addEventListener("click",()=>{W(()=>Promise.resolve().then(()=>O),void 0).then(p=>{p.downloadAsHTML(Oe(n,d),`Research: ${n}`,`research_${Date.now()}.html`)})})}catch(d){c.error("Legal index retrieval failed: "+d.message),a.innerHTML=`<div style="padding:20px; color:var(--danger)">An error occurred: ${d.message}</div>`}finally{t.disabled=!1,document.getElementById("submit-btn-text").textContent="Execute"}}function qe(){return`
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
  `}async function Fe(){const e=["step-statutes","step-judgments","step-citations","step-compare","step-memo"];for(const t of e){const n=document.getElementById(t);if(n){n.classList.add("active");const a=n.querySelector(".processing-step-icon");a&&(a.innerHTML="🔄",a.style.background="transparent"),await new Promise(i=>setTimeout(i,400)),a&&(a.innerHTML="✅",a.style.color="var(--secondary)"),n.classList.remove("active"),n.style.opacity="0.7"}}}function He(e,t){if(!t.is_legal)return`
      <div style="font-size: 0.875rem; line-height: 1.6; color: var(--text-primary);">
        <h5 style="font-weight: 600; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; margin-bottom: 6px;">User Query</h5>
        <p style="background: rgba(0,0,0,0.02); padding: 12px; border-radius: 6px; margin-bottom: 20px; border: 1px solid var(--border-light); font-style: italic;">"${u(e)}"</p>
        
        <h5 style="font-weight: 600; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; margin-bottom: 6px;">AI Assistant Response</h5>
        <div style="white-space: pre-wrap; background: rgba(0,0,0,0.01); border: 1px solid var(--border); padding: 16px; border-radius: 8px; color: var(--text-primary);">${u(t.answer)}</div>
      </div>
    `;let n="";if(t.sources_found===!1)n=`
      <div class="card" style="padding: 12px; border-left: 4px solid var(--danger); margin-bottom: 20px; background: rgba(239,68,68,0.02); border-color: rgba(239,68,68,0.1);">
        <h6 style="color: var(--danger); margin: 0 0 4px; font-weight: 600;">No Legal Sources Found</h6>
        <p style="margin: 0; font-size: 0.75rem; color: var(--text-secondary);">The legal engine did not retrieve specific statutory codes or judgments for this query. Falling back to general legal AI reasoning.</p>
      </div>
    `;else{const s=t.acts||t.applicable_laws||[],r=t.judgments||[],o=s.map(d=>`<span class="badge badge-primary" style="margin-right: 6px; margin-bottom: 6px;">${u(d.name||d.act)} - ${u(d.section)}</span>`).join(""),m=r.map(d=>`<span class="badge badge-success" style="margin-right: 6px; margin-bottom: 6px;">⚖️ ${u(d.name)} (${d.year})</span>`).join("");n=`
      <div style="margin-bottom: 20px;">
        <h5 style="font-weight: 600; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; margin-bottom: 8px;">Retrieved Sources</h5>
        <div style="display: flex; flex-wrap: wrap;">
          ${o}
          ${m}
        </div>
      </div>
    `}const a=t.reasoning_summary?`
    <div style="margin-bottom: 20px; background: rgba(37,99,235,0.02); border: 1px solid rgba(37,99,235,0.1); padding: 12px; border-radius: 6px;">
      <h5 style="font-weight: 600; color: var(--accent); text-transform: uppercase; font-size: 0.6875rem; margin: 0 0 4px;">AI Search & Reasoning Summary</h5>
      <p style="margin: 0; font-size: 0.75rem; color: var(--text-secondary);">${u(t.reasoning_summary)}</p>
    </div>
  `:"";if(x==="deep")return`
      <div style="font-size: 0.875rem; line-height: 1.6;">
        
        <!-- Header Info -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-weight: 700; color: var(--text-primary); font-family: var(--font-headline); margin: 0;">Legal Research Memorandum</h3>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="text-xs text-muted">Confidence Score:</span>
            <span style="font-weight: 700; color: var(--secondary);">${t.confidence_score}%</span>
          </div>
        </div>

        <h5 style="font-weight: 600; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; margin-bottom: 6px; margin-top: 16px;">User Query</h5>
        <p style="background: rgba(0,0,0,0.02); padding: 12px; border-radius: 6px; margin-bottom: 20px; border: 1px solid var(--border-light); font-style: italic;">"${u(e)}"</p>

        ${a}
        ${n}

        <div class="card" style="padding: 16px; margin-bottom: 20px; border-left: 4px solid var(--accent);">
          <h5 style="margin-bottom: 6px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Issue Summary</h5>
          <p style="margin: 0; color: var(--text-secondary); font-size: 0.8125rem;">${u(t.issue_summary)}</p>
        </div>

        <!-- Arguments pro and con -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div class="card" style="padding: 14px; background: rgba(16,185,129,0.02); border-color: rgba(16,185,129,0.1);">
            <h5 style="color: var(--secondary); margin-bottom: 8px; font-weight: 600; font-family: var(--font-headline);">Arguments FOR</h5>
            <ul style="padding-left: 16px; margin: 0; font-size: 0.75rem; display: flex; flex-direction: column; gap: 6px;">
              ${(t.arguments_for||[]).map(s=>`<li>${u(s)}</li>`).join("")}
            </ul>
          </div>
          <div class="card" style="padding: 14px; background: rgba(239,68,68,0.02); border-color: rgba(239,68,68,0.1);">
            <h5 style="color: var(--danger); margin-bottom: 8px; font-weight: 600; font-family: var(--font-headline);">Arguments AGAINST</h5>
            <ul style="padding-left: 16px; margin: 0; font-size: 0.75rem; display: flex; flex-direction: column; gap: 6px;">
              ${(t.arguments_against||[]).map(s=>`<li>${u(s)}</li>`).join("")}
            </ul>
          </div>
        </div>

        <!-- Potential Risks -->
        <div style="margin-bottom: 20px;">
          <h5 style="font-weight: 600; color: var(--text-primary); margin-bottom: 8px; font-family: var(--font-headline);">Litigation & Compliance Risks</h5>
          <ul style="padding-left: 20px; font-size: 0.8125rem; display: flex; flex-direction: column; gap: 4px;">
            ${(t.potential_risks||[]).map(s=>`<li>${u(s)}</li>`).join("")}
          </ul>
        </div>

        <!-- Main analysis -->
        <div style="margin-bottom: 20px;">
          <h5 style="font-weight: 600; color: var(--text-primary); margin-bottom: 8px; font-family: var(--font-headline);">Detailed Analysis</h5>
          <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6;">${u(t.analysis||"")}</p>
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
    `;const i=(t.timeline||[]).map(s=>`
    <div style="display: flex; gap: 16px; border-left: 2px solid var(--border); padding-left: 16px; margin-left: 8px; padding-bottom: 12px; position: relative;">
      <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent); position: absolute; left: -5px; top: 6px;"></div>
      <div style="font-weight: 700; font-size: 0.8125rem; color: var(--accent); min-width: 45px;">${u(s.year)}</div>
      <div style="font-size: 0.75rem; color: var(--text-secondary);">${u(s.event)}</div>
    </div>
  `).join("");return`
    <div style="font-size: 0.875rem; line-height: 1.6;">
      
      <!-- User Query -->
      <h5 style="font-weight: 600; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; margin-bottom: 6px;">User Query</h5>
      <p style="background: rgba(0,0,0,0.02); padding: 12px; border-radius: 6px; margin-bottom: 20px; border: 1px solid var(--border-light); font-style: italic;">"${u(e)}"</p>

      ${a}
      ${n}

      <!-- Final Answer / Analysis -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 12px; margin-bottom: 16px; margin-top: 24px;">
        <h4 style="font-weight: 700; color: var(--text-primary); margin: 0; font-family: var(--font-headline);">Final AI Answer</h4>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--text-secondary);">
          <span>Confidence:</span>
          <span style="font-weight: 700; color: var(--secondary);">${t.confidence_score||90}%</span>
        </div>
      </div>

      <div style="background: rgba(0,0,0,0.01); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 24px; color: var(--text-secondary);">
        ${t.analysis.replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>")}
      </div>

      <!-- Precedent Timeline -->
      ${i?`
        <div style="margin-bottom: 24px;">
          <h5 style="font-weight: 600; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; margin-bottom: 12px; font-family: var(--font-headline);">Precedent History & Timeline</h5>
          <div style="margin-top: 12px;">${i}</div>
        </div>
      `:""}

      <!-- Suggested questions -->
      ${(t.follow_ups||[]).length>0?`
        <div class="card" style="padding: 16px; background: rgba(0,0,0,0.01); margin-top: 16px;">
          <h5 style="margin-bottom: 8px; font-weight: 600; color: var(--text-primary); font-family: var(--font-headline);">Suggested Queries</h5>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${t.follow_ups.map(s=>`
              <div class="recent-query-item" style="font-size: 0.75rem; padding: 6px 10px; cursor: pointer; color: var(--accent); background: transparent;" onclick="document.getElementById('research-query').value='${u(s).replace(/'/g,"\\'")}'; document.getElementById('research-query').focus();">
                👉 ${u(s)}
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
  `}function Ue(e){const t=document.getElementById("inspector-placeholder"),n=document.getElementById("inspector-content");if(!t||!n)return;if(!e.is_legal||e.sources_found===!1){t.style.display="flex",n.style.display="none";return}t.style.display="none",n.style.display="block";const a=e.judgments||[],i=e.acts||e.applicable_laws||[],s=Ge(a);n.innerHTML=`
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
      ${a.length>0?`
        <div>
          <div style="font-weight: 600; margin-bottom: 6px; color: var(--text-secondary); text-transform: uppercase; font-size: 0.6875rem; font-family: var(--font-headline);">Top Authorities</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${a.map(r=>{const o=r.strength||r.relevance||85,m=o>=90?"High":o>=70?"Medium":"Low",d=o>=90?"badge-success":"badge-primary";return`
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
  `,document.querySelectorAll(".citation-card-item").forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.caseRatio;c.info(`Precedent ratio: ${o}`,4e3)})})}function Ge(e){return!e||e.length===0?'<div class="text-xs text-muted">No graph connections</div>':`
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%; gap: 4px;">
      ${e.map((n,a)=>`
    <div style="display: flex; align-items: center; gap: 8px; width: 100%; border: 1px solid var(--border); padding: 6px 10px; border-radius: 4px; background: var(--bg-surface);">
      <span style="font-size: 0.75rem;">🏛️</span>
      <div style="flex: 1; overflow: hidden; font-size: 0.6875rem; font-weight: 500; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
        ${u(n.name)} (${n.year})
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
  `}function Oe(e,t){var a,i;let n=`<h1>NyayaGPT Research Memorandum: ${u(e)}</h1><div class="meta">Confidence Score: ${t.confidence_score||90}%</div>`;return t.issue_summary&&(n+=`<div class="section"><div class="section-title">Issue Summary</div><p>${u(t.issue_summary)}</p></div>`),(a=t.applicable_laws)!=null&&a.length&&(n+='<div class="section"><div class="section-title">Applicable Laws</div>',t.applicable_laws.forEach(s=>{n+=`<p><strong>${u(s.act)} — ${u(s.section)}</strong><br>${u(s.description)}</p>`}),n+="</div>"),(i=t.judgments)!=null&&i.length&&(n+='<div class="section"><div class="section-title">Cited Authorities & Precedents</div>',t.judgments.forEach(s=>{n+=`<p><strong>${u(s.name)}</strong> (${u(s.citation)}) - ${u(s.court)}, ${s.year}<br>${u(s.snippet)}</p>`}),n+="</div>"),t.analysis&&(n+=`<div class="section"><div class="section-title">Analysis</div><p>${t.analysis.replace(/\n/g,"<br>")}</p></div>`),t.conclusion&&(n+=`<div class="section"><div class="section-title">Concluding Opinion</div><p>${u(t.conclusion)}</p></div>`),n}function u(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const re=[{id:"facts",label:"Facts",icon:"📋"},{id:"issues",label:"Issues",icon:"❓"},{id:"petitioner_arguments",label:"Petitioner Args",icon:"👤"},{id:"respondent_arguments",label:"Respondent Args",icon:"👥"},{id:"court_reasoning",label:"Reasoning",icon:"🧠"},{id:"verdict",label:"Verdict",icon:"⚖️"},{id:"key_takeaways",label:"Takeaways",icon:"💡"}];let We=null;function Je(){return`
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
            ${$()?'<span class="badge badge-success">API Connected</span>':'<span class="badge badge-warning">Demo Mode</span>'}
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
  `}function Ke(){const e=document.getElementById("dropzone"),t=document.getElementById("file-input"),n=document.getElementById("judgment-text"),a=document.getElementById("summarize-btn");e==null||e.addEventListener("click",()=>t==null?void 0:t.click()),e==null||e.addEventListener("dragover",i=>{i.preventDefault(),e.classList.add("drag-over")}),e==null||e.addEventListener("dragleave",()=>e.classList.remove("drag-over")),e==null||e.addEventListener("drop",i=>{i.preventDefault(),e.classList.remove("drag-over");const s=i.dataTransfer.files[0];s&&Y(s,n,e)}),t==null||t.addEventListener("change",i=>{const s=i.target.files[0];s&&Y(s,n,e)}),a==null||a.addEventListener("click",()=>Ve(n))}function Y(e,t,n){if(e.size>10*1024*1024){c.error("File too large. Maximum 10MB.");return}const a=e.name.split(".").pop().toLowerCase();if(a==="txt"){const i=new FileReader;i.onload=s=>{t.value=s.target.result,n.innerHTML=`
        <div class="file-dropzone-icon" style="background: rgba(0,184,148,0.1);">✓</div>
        <h4>${e.name}</h4>
        <p class="text-muted">${(e.size/1024).toFixed(1)} KB — Text extracted</p>
      `,c.success("File loaded successfully")},i.readAsText(e)}else if(a==="pdf"){const i=new FileReader;i.onload=()=>{t.value=`[PDF uploaded: ${e.name}]

Note: For best results with PDF files, please copy and paste the text content directly. Client-side PDF text extraction will be enhanced in the next update.`,n.innerHTML=`
        <div class="file-dropzone-icon" style="background: rgba(253,203,110,0.1);">📄</div>
        <h4>${e.name}</h4>
        <p class="text-muted">${(e.size/1024).toFixed(1)} KB — PDF uploaded</p>
        <p class="file-types">💡 Tip: Paste the text directly for best results</p>
      `,c.info("PDF uploaded. For best results, paste the text content directly.")},i.readAsArrayBuffer(e)}else c.warning("Please upload a PDF or TXT file")}async function Ve(e){const t=e.value.trim();if(!t||t.length<100){c.warning("Please provide judgment text (minimum 100 characters)");return}const n=document.getElementById("summarize-btn"),a=document.getElementById("processing-section"),i=document.getElementById("summary-result-section");n.disabled=!0,document.getElementById("summarize-btn-text").textContent="Processing...",a.style.display="block",i.style.display="none",a.innerHTML=Ye(),await Qe();try{let s;$()?s=await Pe(t):(await new Promise(r=>setTimeout(r,1500)),s=De(),c.info("Showing demo summary. Add your Gemini API key in Settings for live summarization.")),We=s,l.incrementUsage("summaries"),l.logActivity("summary",`Summarized: ${s.title||"Judgment"}`,"📄"),a.style.display="none",i.style.display="block",i.innerHTML=Xe(s),i.scrollIntoView({behavior:"smooth"}),Ze(s),et(s,t)}catch(s){c.error("Summarization failed: "+s.message),a.style.display="none"}finally{n.disabled=!1,document.getElementById("summarize-btn-text").textContent="Summarize Judgment"}}function Ye(){return`
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
  `}async function Qe(){for(let e=1;e<=4;e++){await new Promise(a=>setTimeout(a,600));const t=document.getElementById(`step-${e}`);t&&(t.classList.remove("active"),t.classList.add("completed"),t.querySelector(".processing-step-icon").textContent="✓");const n=document.getElementById(`step-${e+1}`);n&&(n.classList.remove("pending"),n.classList.add("active"))}}function Xe(e){const t=re.map((n,a)=>`
    <button class="summary-tab ${a===0?"active":""}" data-tab="${n.id}">
      ${n.icon} ${n.label}
    </button>
  `).join("");return`
    <div class="summary-result animate-fade-up">
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border);">
        <div>
          <h4>${w(e.title||"Judgment Summary")}</h4>
          <p class="text-xs text-muted" style="margin-top: 4px;">${w(e.court||"")} ${e.date?"· "+w(e.date):""}</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" id="export-summary-btn">📥 Export</button>
          <button class="btn btn-primary btn-sm" id="save-summary-btn">💾 Save</button>
        </div>
      </div>
      <div class="summary-tabs">${t}</div>
      <div class="summary-content" id="summary-content">
        ${oe("facts",e)}
      </div>
    </div>
  `}function oe(e,t){const n=t[e];return n?Array.isArray(n)?`<ul>${n.map(a=>`<li>${w(a)}</li>`).join("")}</ul>`:`<p>${w(n)}</p>`:'<p class="text-muted">No data available for this section.</p>'}function Ze(e){document.querySelectorAll(".summary-tab").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".summary-tab").forEach(a=>a.classList.remove("active")),t.classList.add("active");const n=document.getElementById("summary-content");n&&(n.innerHTML=oe(t.dataset.tab,e))})})}function et(e,t){var n,a;(n=document.getElementById("save-summary-btn"))==null||n.addEventListener("click",()=>{l.saveDocument({type:"summary",title:e.title||"Judgment Summary",content:e}),c.success("Summary saved to library")}),(a=document.getElementById("export-summary-btn"))==null||a.addEventListener("click",()=>{let i=`<h1>${w(e.title||"Judgment Summary")}</h1>`;i+=`<div class="meta">${w(e.court||"")} ${e.date?"· "+w(e.date):""}</div>`,re.forEach(s=>{const r=e[s.id];r&&(i+=`<div class="section"><div class="section-title">${s.label}</div>`,Array.isArray(r)?i+=`<ul>${r.map(o=>`<li>${w(o)}</li>`).join("")}</ul>`:i+=`<p>${w(r)}</p>`,i+="</div>")}),P(i,e.title||"Judgment Summary",`summary_${Date.now()}.html`),c.success("Summary exported")})}function w(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const le={legal_notice:"📋",nda:"🤝",employment:"👔",service_agreement:"🔧",partnership:"🤝",rent_agreement:"🏠"};let k=null,de=null;function tt(){return`
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>✍️ Legal Draft Generator</h2>
        <p>Select a template, fill the form, and generate a professional legal document.</p>
      </div>

      <h4 style="margin-bottom: 16px;">Choose Template</h4>
      <div class="template-grid" id="template-grid">
        ${ie().map(n=>`
    <div class="template-card" data-template="${n.id}" id="template-${n.id}">
      <div class="template-card-icon">${le[n.id]||"📄"}</div>
      <h5>${n.name}</h5>
      <p>${n.fields.length} fields</p>
    </div>
  `).join("")}
      </div>

      <div id="draft-form-section" style="display: none;"></div>
      <div id="draft-preview-section" style="display: none;"></div>
    </div>
  `}function nt(){document.querySelectorAll(".template-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.template;at(t)})})}function at(e){var o,m,d;k=e,de=null,document.querySelectorAll(".template-card").forEach(p=>p.classList.remove("selected")),(o=document.getElementById(`template-${e}`))==null||o.classList.add("selected");const t=document.getElementById("draft-form-section"),n=document.getElementById("draft-preview-section");n.style.display="none";const a=se(e),s=ie().find(p=>p.id===e),r=a.map(p=>{const h=p.type==="textarea";let v;return p.type==="textarea"?v=`<textarea class="form-textarea" id="field-${p.name}" placeholder="${p.hint||""}" ${p.required?"required":""} rows="3"></textarea>`:p.type==="date"?v=`<input type="date" class="form-input" id="field-${p.name}" ${p.required?"required":""} />`:p.type==="number"?v=`<input type="number" class="form-input" id="field-${p.name}" ${p.required?"required":""} min="1" />`:v=`<input type="text" class="form-input" id="field-${p.name}" placeholder="${p.hint||""}" ${p.required?"required":""} />`,`
      <div class="form-group ${h?"full-width":""}">
        <label class="form-label">${p.label} ${p.required?"*":""}</label>
        ${v}
        ${p.hint&&p.type!=="textarea"?`<span class="form-hint">${p.hint}</span>`:""}
      </div>
    `}).join("");t.style.display="block",t.innerHTML=`
    <div class="draft-form animate-fade-up">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <h3>${le[e]||"📄"} ${(s==null?void 0:s.name)||"Draft"}</h3>
        ${$()?'<span class="badge badge-success">API Connected</span>':'<span class="badge badge-warning">Demo Mode</span>'}
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
  `,t.scrollIntoView({behavior:"smooth"}),(m=document.getElementById("draft-generate-form"))==null||m.addEventListener("submit",p=>{p.preventDefault(),it()}),(d=document.getElementById("clear-draft-btn"))==null||d.addEventListener("click",()=>{document.querySelectorAll("#draft-generate-form input, #draft-generate-form textarea").forEach(h=>{h.value=""})})}async function it(){const e=se(k),t={};let n=!0;if(e.forEach(i=>{var o;const s=document.getElementById(`field-${i.name}`),r=((o=s==null?void 0:s.value)==null?void 0:o.trim())||"";i.required&&!r?(n=!1,s!=null&&s.style&&(s.style.borderColor="var(--danger)")):s&&(s.style.borderColor=""),t[i.name]=r}),!n){c.warning("Please fill in all required fields");return}const a=document.getElementById("generate-draft-btn");a.disabled=!0,document.getElementById("generate-btn-text").textContent="Generating...";try{let i;$()?i=await Te(k,t):(await new Promise(s=>setTimeout(s,2e3)),i=rt(k,t),c.info("Showing demo draft. Add your Gemini API key in Settings for live generation.")),de=i,l.incrementUsage("drafts"),l.logActivity("draft",`Generated: ${i.title||k}`,"✍️"),st(i,t)}catch(i){c.error("Draft generation failed: "+i.message)}finally{a.disabled=!1,document.getElementById("generate-btn-text").textContent="Generate Draft"}}function st(e,t){var a,i,s;const n=document.getElementById("draft-preview-section");n.style.display="block",n.innerHTML=`
    <div class="draft-preview animate-fade-up">
      <div class="draft-preview-header">
        <h4>${X(e.title||"Legal Draft")}</h4>
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
  `,n.scrollIntoView({behavior:"smooth"}),(a=document.getElementById("copy-draft-btn"))==null||a.addEventListener("click",()=>{navigator.clipboard.writeText(e.content||e.raw||""),c.success("Draft copied to clipboard")}),(i=document.getElementById("export-draft-btn"))==null||i.addEventListener("click",()=>{P(`<h1>${X(e.title||"Legal Draft")}</h1>${Q(e.content||e.raw||"")}`,e.title||"Legal Draft",`draft_${k}_${Date.now()}.html`),c.success("Draft exported")}),(s=document.getElementById("save-draft-btn"))==null||s.addEventListener("click",()=>{l.saveDocument({type:"draft",title:e.title||`${k} Draft`,content:e,metadata:{template:k,formData:t}}),c.success("Draft saved to library")})}function Q(e){return e.replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>").replace(/^(\d+\.\s)/gm,"<strong>$1</strong>").replace(/^(WHEREAS|NOW THEREFORE|IN WITNESS WHEREOF)/gm,"<strong>$1</strong>")}function rt(e,t){const n=new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"});return{legal_notice:{title:"LEGAL NOTICE",content:`LEGAL NOTICE

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
`)}`}}function X(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const ot=[{id:"petition",label:"Petition",icon:"📑"},{id:"fir",label:"FIR",icon:"🚔"},{id:"agreement",label:"Agreement",icon:"📃"},{id:"legal_notice",label:"Legal Notice",icon:"📋"},{id:"contract",label:"Contract",icon:"📝"}];let R=null;function lt(){return`
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
          ${$()?'<span class="badge badge-success">API Connected</span>':'<span class="badge badge-warning">Demo Mode</span>'}
          <button class="btn btn-primary" id="analyze-btn" style="margin-left: auto;">
            <span id="analyze-btn-text">Analyze Document</span>
          </button>
        </div>
      </div>

      <div id="analysis-loading" style="display: none;"></div>
      <div id="analysis-report" style="display: none;"></div>
    </div>
  `}function dt(){var a;document.querySelectorAll("[data-doctype]").forEach(i=>{i.addEventListener("click",()=>{R=i.dataset.doctype,document.querySelectorAll("[data-doctype]").forEach(s=>s.classList.remove("active")),i.classList.add("active")})});const e=document.getElementById("analyzer-dropzone"),t=document.getElementById("analyzer-file-input"),n=document.getElementById("analyzer-text");e==null||e.addEventListener("click",()=>t==null?void 0:t.click()),e==null||e.addEventListener("dragover",i=>{i.preventDefault(),e.classList.add("drag-over")}),e==null||e.addEventListener("dragleave",()=>e.classList.remove("drag-over")),e==null||e.addEventListener("drop",i=>{i.preventDefault(),e.classList.remove("drag-over");const s=i.dataTransfer.files[0];s&&Z(s,n,e)}),t==null||t.addEventListener("change",i=>{const s=i.target.files[0];s&&Z(s,n,e)}),(a=document.getElementById("analyze-btn"))==null||a.addEventListener("click",()=>ct(n))}function Z(e,t,n){if(e.size>10*1024*1024){c.error("File too large. Maximum 10MB.");return}if(e.name.split(".").pop().toLowerCase()==="txt"){const i=new FileReader;i.onload=s=>{t.value=s.target.result,n.innerHTML=`
        <div class="file-dropzone-icon" style="background:rgba(0,184,148,0.1);">✓</div>
        <h4>${e.name}</h4>
        <p class="text-muted">${(e.size/1024).toFixed(1)} KB loaded</p>
      `,c.success("File loaded")},i.readAsText(e)}else n.innerHTML=`
      <div class="file-dropzone-icon" style="background:rgba(253,203,110,0.1);">📄</div>
      <h4>${e.name}</h4>
      <p class="text-muted">💡 Paste text directly for best results</p>
    `,c.info("For best results, paste the document text directly")}async function ct(e){const t=e.value.trim();if(!t||t.length<50){c.warning("Please provide document text (minimum 50 characters)");return}if(!R){c.warning("Please select a document type");return}const n=document.getElementById("analyze-btn"),a=document.getElementById("analysis-loading"),i=document.getElementById("analysis-report");n.disabled=!0,document.getElementById("analyze-btn-text").textContent="Analyzing...",a.style.display="block",i.style.display="none",a.innerHTML=`
    <div class="card animate-fade-up" style="padding: 40px; text-align: center;">
      <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
        <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
      </div>
      <p class="text-muted">Analyzing document for risks and issues...</p>
    </div>
  `;try{let s;$()?s=await Ce(t,R):(await new Promise(r=>setTimeout(r,2500)),s=Be(),c.info("Showing demo analysis. Add Gemini API key in Settings for live analysis.")),l.incrementUsage("analyses"),l.logActivity("analysis",`Analyzed: ${R}`,"🔬"),a.style.display="none",i.style.display="block",i.innerHTML=pt(s),i.scrollIntoView({behavior:"smooth"}),mt(s)}catch(s){c.error("Analysis failed: "+s.message),a.style.display="none"}finally{n.disabled=!1,document.getElementById("analyze-btn-text").textContent="Analyze Document"}}function pt(e){const t=e.overall_risk_score>=70?"var(--danger)":e.overall_risk_score>=40?"var(--warning)":"var(--secondary)",n=e.overall_risk_score>=70?"High Risk":e.overall_risk_score>=40?"Medium Risk":"Low Risk",a=2*Math.PI*60,i=a-e.overall_risk_score/100*a,s=(e.key_facts||[]).map(d=>`<div class="fact-item"><span>•</span><span>${f(d)}</span></div>`).join(""),r=(e.risks||[]).map(d=>`<div class="risk-item">
      <div class="risk-dot ${d.level}"></div>
      <div class="risk-item-content">
        <h5>${f(d.title)}</h5>
        <p>${f(d.description)}</p>
      </div>
    </div>`).join(""),o=(e.missing_clauses||[]).map(d=>`<div class="clause-item"><span>⚠️</span><div><strong>${f(d.clause)}</strong><br><span class="text-xs text-muted">${f(d.importance)}</span></div></div>`).join(""),m=(e.legal_issues||[]).map(d=>`<div class="issue-item"><span>ℹ️</span><div><strong>${f(d.issue)}</strong><br><span class="text-xs text-muted">${f(d.explanation)}</span></div></div>`).join("");return`
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
          <p class="text-muted text-sm" style="line-height: 1.7;">${f(e.recommendation||"")}</p>
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
  `}function mt(e){var t,n;(t=document.getElementById("save-analysis-btn"))==null||t.addEventListener("click",()=>{l.saveDocument({type:"analysis",title:`${e.document_type||"Document"} Analysis`,content:e}),c.success("Analysis saved to library")}),(n=document.getElementById("export-analysis-btn"))==null||n.addEventListener("click",()=>{let a="<h1>Case Analysis Report</h1>";a+=`<div class="meta">Document Type: ${f(e.document_type||"Unknown")} | Risk Score: ${e.overall_risk_score}/100</div>`,a+='<div class="section"><div class="section-title">Key Facts</div><ul>',(e.key_facts||[]).forEach(i=>{a+=`<li>${f(i)}</li>`}),a+="</ul></div>",a+='<div class="section"><div class="section-title">Risk Assessment</div>',(e.risks||[]).forEach(i=>{a+=`<p><span class="risk-${i.level}">[${i.level.toUpperCase()}]</span> <strong>${f(i.title)}</strong> — ${f(i.description)}</p>`}),a+="</div>",a+='<div class="section"><div class="section-title">Missing Clauses</div><ul>',(e.missing_clauses||[]).forEach(i=>{a+=`<li><strong>${f(i.clause)}</strong>: ${f(i.importance)}</li>`}),a+="</ul></div>",a+='<div class="section"><div class="section-title">Recommendation</div>',a+=`<p>${f(e.recommendation||"")}</p></div>`,P(a,"Case Analysis Report",`analysis_${Date.now()}.html`),c.success("Analysis exported")})}function f(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}function ut({title:e,content:t,footer:n,maxWidth:a="540px"}){const i=document.getElementById("modal-container");if(!i)return;i.innerHTML=`
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
  `,requestAnimationFrame(()=>{const m=document.getElementById("modal-overlay");m&&m.classList.add("visible")});const s=document.getElementById("modal-close-btn"),r=document.getElementById("modal-overlay"),o=()=>{r.classList.remove("visible"),setTimeout(()=>{i.innerHTML=""},200)};return s.addEventListener("click",o),r.addEventListener("click",m=>{m.target===r&&o()}),document.addEventListener("keydown",function m(d){d.key==="Escape"&&(o(),document.removeEventListener("keydown",m))}),o}function H(e,t="Confirm"){return new Promise(n=>{const a=ut({title:t,content:`<p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.6;">${e}</p>`,footer:`
        <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="modal-confirm">Confirm</button>
      `});setTimeout(()=>{var i,s;(i=document.getElementById("modal-cancel"))==null||i.addEventListener("click",()=>{a(),n(!1)}),(s=document.getElementById("modal-confirm"))==null||s.addEventListener("click",()=>{a(),n(!0)})},50)})}const ce={research:{icon:"🔍",label:"Research",badgeClass:"badge-primary"},summary:{icon:"📄",label:"Summary",badgeClass:"badge-success"},draft:{icon:"✍️",label:"Draft",badgeClass:"badge-warning"},analysis:{icon:"🔬",label:"Analysis",badgeClass:"badge-danger"}};let M="all",L="";function gt(){return`
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
  `}function yt(){var e;N(),document.querySelectorAll("[data-filter]").forEach(t=>{t.addEventListener("click",()=>{M=t.dataset.filter,document.querySelectorAll("[data-filter]").forEach(n=>n.classList.remove("active")),t.classList.add("active"),N()})}),(e=document.getElementById("library-search-input"))==null||e.addEventListener("input",t=>{L=t.target.value.trim().toLowerCase(),N()})}function N(){const e=document.getElementById("library-content");if(!e)return;let t=l.getDocuments();if(M!=="all"&&(t=t.filter(a=>a.type===M)),L&&(t=t.filter(a=>{var i,s;return((i=a.title)==null?void 0:i.toLowerCase().includes(L))||((s=a.type)==null?void 0:s.toLowerCase().includes(L))})),t.length===0){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">📁</div>
        <h4>No documents found</h4>
        <p>${M!=="all"?"No documents in this category.":L?"Try a different search term.":"Start using NyayaGPT to build your document library."}</p>
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
              <div style="font-weight: 500;">${I(a.title||"Untitled")}</div>
              <div class="text-xs text-muted">${(s=a.id)==null?void 0:s.slice(0,8)}</div>
            </div>
          </div>
        </td>
        <td><span class="badge ${i.badgeClass}">${i.label}</span></td>
        <td class="text-muted text-sm">${G(a.createdAt)}</td>
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
  `,e.querySelectorAll("[data-export]").forEach(a=>{a.addEventListener("click",()=>{const i=t.find(s=>s.id===a.dataset.export);i&&vt(i)})}),e.querySelectorAll("[data-delete]").forEach(a=>{a.addEventListener("click",async()=>{await H("Are you sure you want to delete this document? This cannot be undone.")&&(ft(a.dataset.delete),N(),c.success("Document deleted"))})})}function vt(e){const t=ce[e.type]||{label:"Document"};let n=`<h1>${I(e.title||"Document")}</h1>`;n+=`<div class="meta">Type: ${t.label} | Created: ${new Date(e.createdAt).toLocaleDateString("en-IN")}</div>`;const a=e.content;typeof a=="string"?n+=`<p>${I(a)}</p>`:a&&Object.entries(a).forEach(([i,s])=>{i!=="raw"&&(n+=`<div class="section"><div class="section-title">${i.replace(/_/g," ")}</div>`,Array.isArray(s)?n+=`<ul>${s.map(r=>`<li>${I(typeof r=="object"?JSON.stringify(r):r)}</li>`).join("")}</ul>`:typeof s=="object"?n+=`<pre>${I(JSON.stringify(s,null,2))}</pre>`:n+=`<p>${I(String(s))}</p>`,n+="</div>")}),P(n,e.title||"Document",`${e.type}_${Date.now()}.html`),c.success("Document exported")}function ft(e){const t=l.getDocuments().filter(n=>n.id!==e);l.set("documents",t)}function I(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const ht=[{id:"profile",label:"Profile",icon:"👤"},{id:"api",label:"API Keys",icon:"🔑"},{id:"plan",label:"Subscription",icon:"💎"},{id:"data",label:"Data & Privacy",icon:"🔒"}];let S="profile";function bt(){return`
    <div class="page-content animate-fade-up">
      <div class="page-header">
        <h2>⚙️ Settings</h2>
        <p>Manage your profile, API keys, and subscription.</p>
      </div>

      <div class="settings-layout">
        <nav class="settings-nav">${ht.map(t=>`
    <button class="settings-nav-item ${t.id===S?"active":""}" data-settings-tab="${t.id}">
      <span>${t.icon}</span> ${t.label}
    </button>
  `).join("")}</nav>
        <div class="settings-content" id="settings-content">
          ${pe(S)}
        </div>
      </div>
    </div>
  `}function xt(){document.querySelectorAll("[data-settings-tab]").forEach(e=>{e.addEventListener("click",()=>{S=e.dataset.settingsTab,document.querySelectorAll("[data-settings-tab]").forEach(n=>n.classList.remove("active")),e.classList.add("active");const t=document.getElementById("settings-content");t&&(t.innerHTML=pe(S),_(S))})}),_(S)}function pe(e){switch(e){case"profile":return wt();case"api":return U();case"plan":return me();case"data":return $t();default:return""}}function wt(){const e=l.getUser()||{};return`
    <div class="settings-section">
      <h4>Personal Information</h4>
      <p>Update your profile details.</p>
      <form id="profile-form" class="settings-form-grid">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" id="settings-name" value="${j(e.name||"")}" />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="settings-email" value="${j(e.email||"")}" />
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
          <input type="text" class="form-input" id="settings-barcouncil" value="${j(e.barCouncil||"")}" placeholder="e.g., D/1234/2020" />
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
            <input type="password" class="form-input" id="api-key-input" value="${j(e)}" placeholder="Enter your Gemini API key..." style="flex: 1;" />
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
          ${$()?'<div style="width: 10px; height: 10px; border-radius: 50%; background: var(--secondary); box-shadow: 0 0 8px rgba(0,184,148,0.5);"></div><span style="color: var(--secondary);">Connected</span>':'<div style="width: 10px; height: 10px; border-radius: 50%; background: var(--warning);"></div><span style="color: var(--warning);">Demo Mode (no API key)</span>'}
        </div>
      </div>
    </div>
  `}function me(){const t=(l.getUser()||{}).plan||"free";return`
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
  `}function $t(){const e=l.getDocuments(),t=l.getResearchHistory();return`
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
  `}function _(e){var t,n,a,i,s;switch(e){case"profile":(t=document.getElementById("save-profile-btn"))==null||t.addEventListener("click",()=>{var o,m,d,p,h,v,C;const r=l.getUser()||{};r.name=((m=(o=document.getElementById("settings-name"))==null?void 0:o.value)==null?void 0:m.trim())||r.name,r.email=((p=(d=document.getElementById("settings-email"))==null?void 0:d.value)==null?void 0:p.trim())||r.email,r.role=((h=document.getElementById("settings-role"))==null?void 0:h.value)||r.role,r.barCouncil=((C=(v=document.getElementById("settings-barcouncil"))==null?void 0:v.value)==null?void 0:C.trim())||"",l.setUser(r),c.success("Profile updated")});break;case"api":(n=document.getElementById("save-api-key-btn"))==null||n.addEventListener("click",()=>{var o,m;const r=(m=(o=document.getElementById("api-key-input"))==null?void 0:o.value)==null?void 0:m.trim();if(r){l.set("gemini_api_key",r),c.success("API key saved! AI features are now live.");const d=document.getElementById("settings-content");d&&(d.innerHTML=U(),_("api"))}else{l.remove("gemini_api_key"),c.info("API key removed. Running in demo mode.");const d=document.getElementById("settings-content");d&&(d.innerHTML=U(),_("api"))}});break;case"plan":document.querySelectorAll("[data-switch-plan]").forEach(r=>{r.addEventListener("click",()=>{const o=l.getUser()||{};o.plan=r.dataset.switchPlan,l.setUser(o),c.success(`Switched to ${o.plan} plan`);const m=document.getElementById("settings-content");m&&(m.innerHTML=me(),_("plan"))})});break;case"data":(a=document.getElementById("export-all-data-btn"))==null||a.addEventListener("click",()=>{const r={user:l.getUser(),documents:l.getDocuments(),research:l.getResearchHistory(),activity:l.getActivity(),usage:l.getUsage(),exportedAt:new Date().toISOString()},o=new Blob([JSON.stringify(r,null,2)],{type:"application/json"}),m=URL.createObjectURL(o),d=document.createElement("a");d.href=m,d.download=`nyayagpt_backup_${Date.now()}.json`,d.click(),URL.revokeObjectURL(m),c.success("Data exported")}),(i=document.getElementById("clear-all-data-btn"))==null||i.addEventListener("click",async()=>{if(await H("This will delete ALL your documents, research history, and settings. This cannot be undone.")){const o=l.getUser(),m=l.get("gemini_api_key");l.clear(),o&&l.setUser(o),m&&l.set("gemini_api_key",m),c.success("All data cleared")}}),(s=document.getElementById("delete-account-btn"))==null||s.addEventListener("click",async()=>{await H("⚠️ This will permanently delete your account and ALL associated data. Are you absolutely sure?")&&(l.clear(),c.success("Account deleted"),window.location.hash="/")});break}}function j(e){return e.replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const Et=["Public Interest Litigation Admissibility","Admissibility of electronic evidence in criminal trial","Enforceability of non-compete clauses in employment contracts","Scope of judicial review in arbitration awards","Applicability of Section 300 Clause 4 IPC"];function At(){return`
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
              ${$()?'<span class="badge badge-success">API Connected</span>':'<span class="badge badge-warning">Demo Mode</span>'}
            </div>
            <button class="btn btn-primary" id="find-citations-btn">
              <span id="find-btn-text">Find Precedents</span>
            </button>
          </div>
        </div>
        <div class="suggested-queries">
          ${Et.map(e=>`<button class="chip" data-issue="${e}">${e}</button>`).join("")}
        </div>
      </div>

      <div id="citation-results"></div>
    </div>
  `}function kt(){const e=document.getElementById("find-citations-btn"),t=document.getElementById("citation-query"),n=document.getElementById("citation-results");e&&e.addEventListener("click",()=>ee(t,n,e)),t&&t.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),ee(t,n,e))}),document.querySelectorAll("[data-issue]").forEach(a=>{a.addEventListener("click",()=>{t.value=a.dataset.issue,t.focus()})})}async function ee(e,t,n){var i,s;const a=e.value.trim();if(!a){c.warning("Please enter a legal issue or case");return}n.disabled=!0,document.getElementById("find-btn-text").textContent="Analyzing...",t.innerHTML=It();try{let r;$()?r=await ze(a):(await new Promise(o=>setTimeout(o,2e3)),r=Re(),c.info("Showing demo precedents. Input your Gemini API key in Settings for live lookup.")),l.incrementUsage("analyses"),l.logActivity("citation",`Citation Find: ${a.slice(0,50)}...`,"⚖️"),t.innerHTML=St(a,r),t.scrollIntoView({behavior:"smooth",block:"start"}),(i=document.getElementById("save-citation-btn"))==null||i.addEventListener("click",()=>{l.saveDocument({type:"citation",title:`Citations: ${a}`,content:r}),c.success("Citation report saved to library")}),(s=document.getElementById("export-citation-btn"))==null||s.addEventListener("click",()=>{W(()=>Promise.resolve().then(()=>O),void 0).then(o=>{o.downloadAsHTML(_t(a,r),`Citation Report: ${a}`,`citations_${Date.now()}.html`)})})}catch(r){c.error("Search failed: "+r.message),t.innerHTML=""}finally{n.disabled=!1,document.getElementById("find-btn-text").textContent="Find Precedents"}}function It(){return`
    <div class="result-section animate-fade-up" style="padding: 40px; text-align: center;">
      <div class="typing-indicator" style="justify-content: center; margin-bottom: 16px;">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
      <p class="text-muted">Analyzing citation network and calculating authority scores...</p>
    </div>
  `}function St(e,t){const n=(t.judgments||[]).map(i=>{const s=i.citation_strength==="High"?"badge-success":i.citation_strength==="Medium"?"badge-primary":"badge-secondary";return`
      <div class="judgment-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
          <div class="case-name" style="margin: 0; font-size: 1.0625rem;">${b(i.name)}</div>
          <span class="badge ${s}">${b(i.citation_strength)} Authority</span>
        </div>
        <div class="case-meta" style="margin-bottom: 12px;">
          <span>📌 ${b(i.citation)}</span>
          <span>🏛️ ${b(i.court)}</span>
          <span>📅 ${i.year}</span>
          <span>🔥 Cited ${i.citation_count} times</span>
        </div>
        <div class="case-snippet" style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: 6px; border-left: 3px solid var(--primary);">
          ${b(i.snippet)}
        </div>
      </div>
    `}).join("");return`
    <div class="research-results animate-fade-up">
      <div class="result-section">
        <div class="result-section-header">
          <span class="icon">🕸️</span> Citation Network Graph
        </div>
        <div class="result-section-content" style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 24px; display: flex; flex-direction: column; align-items: center; border: 1px solid rgba(255,255,255,0.05);">
          ${Lt(t.graph)}
        </div>
      </div>

      <div class="result-section">
        <div class="result-section-header">
          <span class="icon">⚖️</span> Top Precedents & Authorities
        </div>
        <div class="result-section-content">${n}</div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px;">
        <button class="btn btn-secondary btn-sm" id="export-citation-btn">📥 Export Report</button>
        <button class="btn btn-primary btn-sm" id="save-citation-btn">💾 Save to Library</button>
      </div>
    </div>
  `}function Lt(e){return!e||!e.nodes||!e.nodes.length?'<div class="text-muted">No connection data available</div>':`
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
      <div style="font-size: 0.8125rem; font-weight: 500; color: var(--text-secondary); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Hierarchy Citation Flow</div>
      <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        ${e.nodes.map(n=>{let a="⚖️";return n.type==="supreme_court"?a="🏛️ SC":n.type==="high_court"&&(a="🏛️ HC"),`
      <div class="card" style="padding: 12px; border-radius: 8px; width: 100%; max-width: 320px; background: var(--bg-secondary); border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--primary); margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          <span>${a}</span>
        </div>
        <div style="font-weight: 500; font-size: 0.875rem; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
          ${b(n.label)}
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
  `}function _t(e,t){var a;let n=`<h1>Citation Report: ${b(e)}</h1><div class="meta">Generated by NyayaGPT</div>`;return(a=t.judgments)!=null&&a.length&&(n+='<div class="section"><div class="section-title">Top Authority Precedents</div>',t.judgments.forEach(i=>{n+=`<p><strong>${b(i.name)}</strong> — <em>${b(i.citation)}</em> (${b(i.court)}, ${i.year})<br><strong>Strength:</strong> ${b(i.citation_strength)} | <strong>Cited count:</strong> ${i.citation_count}<br>${b(i.snippet)}</p>`}),n+="</div>"),n}function b(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Pt(){const e=l.getDocuments();return`
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
                  <div style="font-weight: 500; font-size: 0.8125rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${y(t.title)}</div>
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
  `}function Tt(){var t;const e=document.getElementById("master-scratchpad");e&&(e.value=l.get("workspace_scratchpad",""),e.addEventListener("input",()=>{l.set("workspace_scratchpad",e.value)})),document.querySelectorAll(".workspace-asset-item").forEach(n=>{n.addEventListener("click",()=>{const a=n.dataset.assetId,s=l.getDocuments().find(r=>r.id===a);s&&(Ct(s),document.querySelectorAll(".workspace-asset-item").forEach(r=>r.classList.remove("active")),n.classList.add("active"))})}),(t=document.getElementById("workspace-export-btn"))==null||t.addEventListener("click",()=>{const n=e?e.value.trim():"";if(!n){c.warning("Your scratchpad is empty");return}W(()=>Promise.resolve().then(()=>O),void 0).then(a=>{a.downloadAsHTML(`<h2>NyayaGPT Compile Master Draft</h2><hr><p style="white-space: pre-wrap;">${y(n)}</p>`,"Workspace Master Draft",`workspace_master_${Date.now()}.html`),c.success("Workspace Master exported successfully")})})}function Ct(e){var s,r;const t=document.getElementById("inspector-placeholder"),n=document.getElementById("inspector-content");if(!t||!n)return;t.style.display="none",n.style.display="block";let a=`
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; margin-bottom: 12px;">
      <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${y(e.title)}</h3>
      <button class="btn btn-secondary btn-sm" id="copy-inspector-text-btn" style="padding: 4px 8px; font-size: 0.75rem;">📋 Copy Content</button>
    </div>
  `,i="";e.type==="research"?(i=e.content.analysis||"",a+=`
      <div style="font-size: 0.8125rem; line-height: 1.6;">
        <h5 style="color: var(--primary); margin-top: 12px; margin-bottom: 6px;">Relevant Sections:</h5>
        <ul>
          ${(e.content.acts||[]).map(o=>`<li><strong>${y(o.name)}</strong> - ${y(o.section)}: ${y(o.description)}</li>`).join("")}
        </ul>
        <h5 style="color: var(--success); margin-top: 16px; margin-bottom: 6px;">Precedents:</h5>
        <ul>
          ${(e.content.judgments||[]).map(o=>`<li><strong>${y(o.name)}</strong> (${o.year}) - ${y(o.snippet)}</li>`).join("")}
        </ul>
        <h5 style="color: var(--text-secondary); margin-top: 16px; margin-bottom: 6px;">AI Analysis:</h5>
        <p style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 4px;">${y(e.content.analysis)}</p>
      </div>
    `):e.type==="summary"?(i=`Facts: ${((s=e.content.facts)==null?void 0:s.join(`
`))||""}
Reasoning: ${e.content.court_reasoning||""}
Verdict: ${e.content.verdict||""}`,a+=`
      <div style="font-size: 0.8125rem; line-height: 1.6;">
        <div style="color: var(--text-muted); margin-bottom: 8px;">Court: ${y(e.content.court)} | Date: ${y(e.content.date)}</div>
        <h5 style="color: var(--primary); margin-bottom: 4px;">Facts:</h5>
        <p>${(e.content.facts||[]).map(o=>`• ${y(o)}`).join("<br>")}</p>
        <h5 style="color: var(--primary); margin-top: 12px; margin-bottom: 4px;">Issues:</h5>
        <p>${(e.content.issues||[]).map(o=>`• ${y(o)}`).join("<br>")}</p>
        <h5 style="color: var(--success); margin-top: 12px; margin-bottom: 4px;">Verdict:</h5>
        <p style="background: rgba(0,184,148,0.1); padding: 8px; border-radius: 4px;">${y(e.content.verdict)}</p>
      </div>
    `):e.type==="draft"?(i=e.content.content||"",a+=`
      <div style="font-size: 0.8125rem; line-height: 1.6;">
        <h5 style="color: var(--primary); margin-bottom: 8px;">Generated Draft:</h5>
        <pre style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; white-space: pre-wrap; font-family: monospace; font-size: 0.75rem;">${y(e.content.content)}</pre>
      </div>
    `):e.type==="citation"?(i=(e.content.judgments||[]).map(o=>`${o.name} (${o.citation}) - ${o.snippet}`).join(`
`),a+=`
      <div style="font-size: 0.8125rem; line-height: 1.6;">
        <h5 style="color: var(--primary); margin-bottom: 8px;">Precedent Citations:</h5>
        ${(e.content.judgments||[]).map(o=>`
          <div style="margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.02); padding-bottom: 8px;">
            <div style="font-weight: 600; color: var(--text-primary);">${y(o.name)}</div>
            <div class="text-xs text-muted" style="margin: 2px 0;">${y(o.citation)} | ${y(o.court)}</div>
            <p style="font-size: 0.75rem; margin-top: 4px;">${y(o.snippet)}</p>
          </div>
        `).join("")}
      </div>
    `):(i=JSON.stringify(e.content),a+=`<pre style="font-size: 0.75rem;">${y(JSON.stringify(e.content,null,2))}</pre>`),n.innerHTML=a,(r=document.getElementById("copy-inspector-text-btn"))==null||r.addEventListener("click",()=>{navigator.clipboard.writeText(i).then(()=>{c.success("Asset content copied to clipboard")}).catch(()=>{c.error("Failed to copy")})})}function y(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}const zt=[{section:"MAIN"},{path:"/dashboard",icon:"📊",label:"Dashboard"},{path:"/research",icon:"🔍",label:"AI Research"},{path:"/summarizer",icon:"📄",label:"Summarizer"},{path:"/drafts",icon:"✍️",label:"Draft Generator"},{path:"/citation-finder",icon:"⚖️",label:"Citation Finder"},{path:"/workspace",icon:"💼",label:"Workspace Canvas"},{path:"/analyzer",icon:"🔬",label:"Case Analyzer"},{section:"LIBRARY"},{path:"/library",icon:"📁",label:"My Documents"},{section:"ACCOUNT"},{path:"/settings",icon:"⚙️",label:"Settings"}];function Dt(){const e=l.get("sidebar_collapsed",!1),t=g.getCurrentPath(),n=zt.map(a=>{if(a.section)return`<div class="sidebar-section-title">${a.section}</div>`;const i=t===a.path;return`
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
  `}function Bt(){const e=document.getElementById("sidebar-toggle");e&&e.addEventListener("click",()=>{const t=document.getElementById("sidebar"),n=document.querySelector(".main-content"),a=t.classList.toggle("collapsed");l.set("sidebar_collapsed",a),n&&n.classList.toggle("sidebar-collapsed",a),e.textContent=a?"▶":"◀"})}function Rt(e){document.querySelectorAll(".sidebar-link").forEach(t=>{const n=t.getAttribute("data-route");t.classList.toggle("active",n===e)})}const Mt={"/dashboard":{breadcrumb:"Home",title:"Dashboard"},"/research":{breadcrumb:"Tools",title:"AI Research"},"/summarizer":{breadcrumb:"Tools",title:"Summarizer"},"/drafts":{breadcrumb:"Tools",title:"Draft Generator"},"/analyzer":{breadcrumb:"Tools",title:"Case Analyzer"},"/library":{breadcrumb:"Library",title:"My Documents"},"/settings":{breadcrumb:"Account",title:"Settings"}};function Nt(e){const t=l.getUser(),n=Mt[e]||{breadcrumb:"Home",title:"Dashboard"},a=t!=null&&t.name?t.name.split(" ").map(i=>i[0]).join("").toUpperCase().slice(0,2):"U";return`
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
  `}function jt(){const e=document.getElementById("mobile-menu-btn");e&&(window.innerWidth<=1024&&(e.style.display="flex"),e.addEventListener("click",()=>{const n=document.getElementById("sidebar");n&&n.classList.toggle("mobile-open")}));const t=document.getElementById("topbar-avatar");t&&t.addEventListener("click",()=>{window.location.hash="/settings"}),window.addEventListener("resize",()=>{const n=document.getElementById("mobile-menu-btn");n&&(n.style.display=window.innerWidth<=1024?"flex":"none")})}function E(e,t){const n=document.getElementById("app"),a=l.get("sidebar_collapsed",!1);n.innerHTML=`
    ${Dt()}
    <div class="main-content ${a?"sidebar-collapsed":""}">
      ${Nt(e)}
      ${t}
    </div>
  `,Bt(),jt(),Rt(e)}function q(e){const t=document.getElementById("app");t.innerHTML=e}function A(e){return l.isLoggedIn()?!0:(g.navigate("/login"),!1)}g.register("/",()=>{if(l.isLoggedIn()){g.navigate("/dashboard");return}q(ye()),ve()});g.register("/login",()=>{if(l.isLoggedIn()){g.navigate("/dashboard");return}q(he()),xe()});g.register("/signup",()=>{if(l.isLoggedIn()){g.navigate("/dashboard");return}q(be()),we()});g.register("/dashboard",e=>{A()&&E(e,ke())});g.register("/research",e=>{A()&&(E(e,Ne()),je())});g.register("/summarizer",e=>{A()&&(E(e,Je()),Ke())});g.register("/drafts",e=>{A()&&(E(e,tt()),nt())});g.register("/analyzer",e=>{A()&&(E(e,lt()),dt())});g.register("/citation-finder",e=>{A()&&(E(e,At()),kt())});g.register("/workspace",e=>{A()&&(E(e,Pt()),Tt())});g.register("/library",e=>{A()&&(E(e,gt()),yt())});g.register("/settings",e=>{A()&&(E(e,bt()),xt())});g.register("/logout",()=>{l.logout(),g.navigate("/")});g.register("/404",()=>{q(`
    <div class="auth-page">
      <div class="auth-card animate-scale-in" style="text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 16px;">🔍</div>
        <h2>Page Not Found</h2>
        <p class="auth-subtitle">The page you're looking for doesn't exist.</p>
        <a href="#/" class="btn btn-primary" style="margin-top: 20px;">Go Home</a>
      </div>
    </div>
  `)});document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),l.isLoggedIn())){const t=document.getElementById("topbar-search");t&&t.click()}});window.navigateTo=e=>{g.navigate(e)};console.log("%c⚖️ NyayaGPT","font-size: 24px; font-weight: bold; color: #6C5CE7;");console.log("%cAI-Powered Legal Intelligence for Indian Law","font-size: 12px; color: #8888A8;");g.start();
