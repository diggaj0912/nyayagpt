// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Auth Pages (Login & Signup)
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { toast } from '../components/toast.js';
import { router } from '../utils/router.js';
import { supabase } from '../services/supabase.js';

export function renderLogin() {
  const isOffline = !supabase;
  return `
    <div class="auth-page">
      <div class="auth-card animate-scale-in">
        <a href="#/" class="auth-logo">
          <div class="logo-icon" style="width:32px;height:32px;background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.1rem;">⚖️</div>
          <span>NyayaGPT</span>
        </a>
        <h2>Welcome back</h2>
        <p class="auth-subtitle">Sign in to your legal AI copilot</p>
        
        ${isOffline ? `
          <div class="alert alert-warning" style="margin-bottom: 16px; padding: 10px; background: rgba(243,156,18,0.1); border: 1px solid var(--secondary); border-radius: var(--radius-sm); font-size: 0.85rem; color: #f39c12; text-align: center;">
            ⚠️ Running in Offline Mock Mode (No Supabase detected)
          </div>
        ` : ''}

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
  `;
}

export function renderSignup() {
  const isOffline = !supabase;
  return `
    <div class="auth-page">
      <div class="auth-card animate-scale-in">
        <a href="#/" class="auth-logo">
          <div class="logo-icon" style="width:32px;height:32px;background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.1rem;">⚖️</div>
          <span>NyayaGPT</span>
        </a>
        <h2>Create your account</h2>
        <p class="auth-subtitle">Start your AI-powered legal journey</p>

        ${isOffline ? `
          <div class="alert alert-warning" style="margin-bottom: 16px; padding: 10px; background: rgba(243,156,18,0.1); border: 1px solid var(--secondary); border-radius: var(--radius-sm); font-size: 0.85rem; color: #f39c12; text-align: center;">
            ⚠️ Running in Offline Mock Mode (No Supabase detected)
          </div>
        ` : ''}

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
  `;
}

export function initLogin() {
  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      if (!email || !password) {
        toast.error('Please fill in all fields');
        return;
      }

      if (supabase) {
        toast.info('Signing in with Supabase...');
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Welcome back!');
          router.navigate('/dashboard');
        }
      } else {
        // MVP/Offline fallback
        const existingUser = storage.getUser();
        if (existingUser && existingUser.email === email) {
          toast.success('Welcome back!');
          router.navigate('/dashboard');
          return;
        }

        const user = {
          id: crypto.randomUUID(),
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          email,
          role: 'lawyer',
          plan: 'student',
          createdAt: new Date().toISOString(),
        };
        storage.setUser(user);
        toast.success('Welcome to NyayaGPT (Offline Mode)!');
        router.navigate('/dashboard');
      }
    });
  }

  const googleBtn = document.getElementById('google-login-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      if (supabase) {
        toast.info('Redirecting to Google OAuth...');
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) toast.error(error.message);
      } else {
        toast.info('Google OAuth requires Supabase configuration');
      }
    });
  }
}

export function initSignup() {
  const form = document.getElementById('signup-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const role = document.getElementById('signup-role').value;

      if (!name || !email || !password) {
        toast.error('Please fill in all fields');
        return;
      }
      if (password.length < 8) {
        toast.error('Password must be at least 8 characters');
        return;
      }

      if (supabase) {
        toast.info('Registering account in Supabase...');
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              role: role
            }
          }
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Sign up successful! Please check your email for confirmation.');
          router.navigate('/login');
        }
      } else {
        // Offline Mode fallback
        const user = {
          id: crypto.randomUUID(),
          name,
          email,
          role,
          plan: 'student',
          createdAt: new Date().toISOString(),
        };
        storage.setUser(user);
        storage.logActivity('signup', 'Account created (Offline)', '🎉');
        toast.success('Account created! Welcome to NyayaGPT (Offline Mode)');
        router.navigate('/dashboard');
      }
    });
  }

  const googleBtn = document.getElementById('google-signup-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      if (supabase) {
        toast.info('Redirecting to Google OAuth...');
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) toast.error(error.message);
      } else {
        toast.info('Google OAuth requires Supabase configuration');
      }
    });
  }
}

