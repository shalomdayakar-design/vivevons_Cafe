import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Instagram, Facebook, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-espresso text-cream pt-20 pb-12 border-t border-cream/10 relative overflow-hidden">
      
      {/* Ambient background light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-terracotta/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Branding & Newsletter Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-cream/10 items-start">
          
          {/* Brand Info */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-cream/30 p-0.5 bg-cream/10">
                <img src="/logo.jpg" alt="VIVEVONS Logo Footer" className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="font-serif text-3xl font-light tracking-[0.2em] uppercase text-cream">
                VIVEVONS
              </span>
            </div>

            <p className="font-serif text-xl text-terracotta italic font-light">
              “More Than Just a Café.”
            </p>

            <p className="font-sans text-xs text-cream/70 max-w-md font-light leading-relaxed">
              A place for unfinished dreams and fresh beginnings. Specialty coffee, slow mornings, and quiet sanctuary for original ideas.
            </p>
          </div>

          {/* Newsletter Input */}
          <div className="lg:col-span-6 bg-cream/5 p-8 rounded-3xl border border-cream/10 space-y-4">
            <span className="font-mono text-xs text-sage tracking-widest uppercase block">
              STAY IN THE LOOP
            </span>
            <h3 className="font-serif text-2xl font-light text-cream uppercase">
              Receive quiet notes & private events.
            </h3>

            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full px-5 py-3.5 rounded-full bg-espresso border border-cream/20 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-terracotta transition-colors font-sans"
                  />
                  {error && <p className="text-[11px] text-terracotta absolute left-4 -bottom-5">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-terracotta text-cream rounded-full text-xs font-sans tracking-[0.25em] uppercase font-semibold hover:bg-terracotta-light transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>JOIN</span>
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-olive text-cream text-xs font-sans flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-terracotta flex-shrink-0" />
                <span>Thank you for joining. Welcome to the VIVEVONS inner circle.</span>
              </div>
            )}
          </div>

        </div>

        {/* Middle Quick Links & Social */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-cream/10 text-xs font-sans">
          
          {/* Column 1: Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-sage uppercase tracking-widest mb-4">NAVIGATION</h4>
            <ul className="space-y-2.5 text-cream/70">
              <li><a href="#menu" className="hover:text-cream transition-colors">Menu</a></li>
              <li><a href="#story" className="hover:text-cream transition-colors">Our Story</a></li>
              <li><a href="#experience" className="hover:text-cream transition-colors">The Space</a></li>
              <li><a href="#five-tables" className="hover:text-cream transition-colors">Five Tables</a></li>
            </ul>
          </div>

          {/* Column 2: Experience */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-sage uppercase tracking-widest mb-4">EXPERIENCE</h4>
            <ul className="space-y-2.5 text-cream/70">
              <li><a href="#idea-wall" className="hover:text-cream transition-colors">Idea Wall</a></li>
              <li><a href="#gallery" className="hover:text-cream transition-colors">Gallery</a></li>
              <li><button onClick={onOpenReservation} className="hover:text-cream transition-colors">Reservations</button></li>
              <li><a href="#location" className="hover:text-cream transition-colors">Contact & Map</a></li>
            </ul>
          </div>

          {/* Column 3: Hours */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-sage uppercase tracking-widest mb-4">HOURS</h4>
            <p className="text-cream/70 font-light">Mon – Fri: 7:30 AM – 10:00 PM</p>
            <p className="text-cream/70 font-light">Sat – Sun: 8:00 AM – 11:00 PM</p>
            <p className="text-terracotta font-mono text-[11px] pt-1">Fresh bakery batch at 8:00 AM</p>
          </div>

          {/* Column 4: Social */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-sage uppercase tracking-widest mb-4">SOCIAL & COMMUNITY</h4>
            <div className="flex space-x-3 text-cream">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-terracotta transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-terracotta transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-terracotta transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-cream/50 space-y-4 sm:space-y-0">
          <div>
            © 2026 VIVEVONS. All rights reserved. Designed for contemporary hospitality.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-sage hover:text-cream transition-colors group"
          >
            <span className="font-mono tracking-widest uppercase text-[10px]">BACK TO TOP</span>
            <div className="p-1.5 rounded-full bg-cream/10 group-hover:bg-terracotta transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};
