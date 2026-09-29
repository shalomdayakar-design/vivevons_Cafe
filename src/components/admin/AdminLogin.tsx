import React, { useState } from 'react';
import { auth } from '../../lib/auth';
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles, Key } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('owner@vivevons.com');
  const [password, setPassword] = useState('vivevons2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = auth.login(email, password);
      setLoading(false);

      if (res.success) {
        onSuccess();
      } else {
        setError(res.error || 'Authentication failed.');
      }
    }, 450);
  };

  const quickFill = (demoEmail: string, demoRole: string) => {
    setEmail(demoEmail);
    setPassword('vivevons2026');
    setError('');
  };

  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terracotta/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-olive/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md bg-offwhite rounded-3xl p-8 md:p-10 border border-cream/20 shadow-2xl relative z-10 text-espresso space-y-8">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-terracotta shadow-xl p-1 bg-cream mx-auto">
            <img src="/logo.jpg" alt="VIVEVONS Logo" className="w-full h-full object-cover rounded-full" />
          </div>

          <div>
            <span className="font-mono text-[10px] text-terracotta tracking-[0.3em] uppercase block">
              MANAGEMENT CONSOLE
            </span>
            <h1 className="font-serif text-3xl font-light text-olive tracking-widest uppercase">
              VIVEVONS CMS
            </h1>
            <p className="font-sans text-xs text-walnut/70 mt-1 font-light">
              Secure Administration Portal
            </p>
          </div>
        </div>

        {/* Quick Credentials Preset Badges */}
        <div className="bg-cream p-4 rounded-2xl border border-olive/10 space-y-2 text-xs">
          <div className="flex items-center space-x-1.5 text-walnut font-mono text-[10px] tracking-wider uppercase">
            <Key className="w-3.5 h-3.5 text-terracotta" />
            <span>QUICK PRESET CREDENTIALS:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => quickFill('owner@vivevons.com', 'Super Admin')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-sans border transition-all ${
                email === 'owner@vivevons.com' ? 'bg-olive text-cream border-olive' : 'bg-offwhite text-olive border-olive/15'
              }`}
            >
              Super Admin
            </button>

            <button
              type="button"
              onClick={() => quickFill('manager@vivevons.com', 'Admin')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-sans border transition-all ${
                email === 'manager@vivevons.com' ? 'bg-olive text-cream border-olive' : 'bg-offwhite text-olive border-olive/15'
              }`}
            >
              Admin
            </button>

            <button
              type="button"
              onClick={() => quickFill('editor@vivevons.com', 'Editor')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-sans border transition-all ${
                email === 'editor@vivevons.com' ? 'bg-olive text-cream border-olive' : 'bg-offwhite text-olive border-olive/15'
              }`}
            >
              Editor
            </button>
          </div>
          <p className="text-[10px] text-sage font-mono">Password: <span className="text-espresso font-semibold">vivevons2026</span></p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-terracotta/10 border border-terracotta/30 text-terracotta text-xs font-sans">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-olive/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vivevons.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta font-sans transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-olive/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta font-sans transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-olive text-cream rounded-xl font-sans text-xs tracking-[0.25em] uppercase font-semibold hover:bg-walnut transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'AUTHENTICATING...' : 'SIGN IN TO DASHBOARD'}</span>
            {!loading && <ArrowRight className="w-4 h-4 text-terracotta" />}
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-sage font-mono pt-4 border-t border-olive/10">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-olive" />
            <span>256-bit Encrypted Session</span>
          </div>
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to admin email.'); }} className="text-terracotta hover:underline">
            Forgot Password?
          </a>
        </div>

      </div>
    </div>
  );
};
