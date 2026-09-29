import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'MENU', href: '#menu' },
    { name: 'OUR STORY', href: '#story' },
    { name: 'THE SPACE', href: '#experience' },
    { name: 'FIVE TABLES', href: '#five-tables' },
    { name: 'IDEA WALL', href: '#idea-wall' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'CONTACT', href: '#location' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-offwhite/90 backdrop-blur-md shadow-sm border-b border-olive/10 py-3 text-olive'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 text-cream'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#"
            className="flex items-center space-x-3 group text-left"
          >
            <div className="relative overflow-hidden rounded-full border border-cream/30 group-hover:border-terracotta transition-colors duration-300 w-10 h-10 md:w-11 md:h-11 flex-shrink-0">
              <img
                src="/logo.jpg"
                alt="VIVEVONS Logo"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif tracking-[0.2em] font-light text-xl md:text-2xl leading-none transition-colors ${
                isScrolled ? 'text-olive' : 'text-cream'
              }`}>
                VIVEVONS
              </span>
              <span className={`font-sans text-[9px] md:text-[10px] tracking-[0.25em] uppercase transition-colors ${
                isScrolled ? 'text-walnut' : 'text-cream/70'
              }`}>
                More Than Just a Café
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-sans text-xs tracking-[0.2em] font-medium transition-colors hover-underline-animation ${
                  isScrolled
                    ? 'text-olive hover:text-terracotta'
                    : 'text-cream/90 hover:text-cream'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Reservation Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onOpenReservation}
              className={`px-6 py-2.5 rounded-full text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 border flex items-center space-x-2 group ${
                isScrolled
                  ? 'bg-olive text-cream border-olive hover:bg-terracotta hover:border-terracotta shadow-md'
                  : 'bg-cream/10 backdrop-blur-sm text-cream border-cream/30 hover:bg-cream hover:text-olive'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
              <span>RESERVE A TABLE</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={onOpenReservation}
              className={`px-3 py-1.5 rounded-full text-[10px] font-sans tracking-widest uppercase border ${
                isScrolled
                  ? 'bg-olive text-cream border-olive'
                  : 'bg-cream/20 text-cream border-cream/30'
              }`}
            >
              Reserve
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full focus:outline-none transition-colors ${
                isScrolled ? 'text-olive hover:bg-cream/50' : 'text-cream hover:bg-white/10'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-olive/95 backdrop-blur-xl lg:hidden flex flex-col justify-between p-8 pt-28 text-cream"
          >
            <div className="flex flex-col space-y-6">
              <div className="text-xs uppercase tracking-[0.3em] text-sage border-b border-cream/10 pb-4">
                Navigation
              </div>

              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  className="font-serif text-3xl font-light tracking-wide text-cream hover:text-terracotta transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="font-sans text-xs text-sage tracking-widest font-mono">0{idx + 1}</span>
                </motion.a>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-cream/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-4 bg-terracotta text-cream rounded-full font-sans text-xs tracking-[0.25em] uppercase font-medium flex items-center justify-center space-x-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>RESERVE A TABLE NOW</span>
              </button>

              <div className="text-center text-xs text-cream/50 font-sans tracking-widest">
                VIVEVONS — The Café of Second Chances
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
