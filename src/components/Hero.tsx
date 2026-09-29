import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Coffee } from 'lucide-react';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-espresso">
      {/* Background Cinematic High-Res Image with Slow Reveal & Motion */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.65 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop"
          alt="VIVEVONS Interior Atmosphere"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
        />
        {/* Subtle Vignette & Gradient Overlays for Editorial Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/60 via-transparent to-espresso/60" />
      </motion.div>

      {/* Floating Light Ambient Glow Effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-terracotta/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-cream flex flex-col items-center pt-16">
        
        {/* Small Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cream/10 border border-cream/20 backdrop-blur-md mb-8 text-sage text-xs tracking-[0.3em] uppercase font-sans"
        >
          <Sparkles className="w-3.5 h-3.5 text-terracotta" />
          <span>A Sanctuary for Ideas</span>
        </motion.div>

        {/* Main Title: VIVEVONS */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-[0.15em] font-light text-cream mb-2 uppercase drop-shadow-lg"
        >
          VIVEVONS
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif text-xl md:text-3xl text-terracotta tracking-[0.2em] font-normal italic mb-6"
        >
          THE CAFÉ OF SECOND CHANCES
        </motion.div>

        {/* Emotional Quote & Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-sans text-base md:text-lg text-cream/80 max-w-2xl font-light leading-relaxed tracking-wide mb-10"
        >
          “More Than Just a Café.”
          <span className="block text-cream/60 text-sm md:text-base mt-1 font-light italic">
            A place for unfinished dreams and fresh beginnings.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md"
        >
          <button
            onClick={scrollToMenu}
            className="w-full sm:w-auto px-8 py-4 bg-terracotta text-cream rounded-full font-sans text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 hover:bg-terracotta-light hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center space-x-2 border border-terracotta-light/30"
          >
            <Coffee className="w-4 h-4" />
            <span>EXPLORE THE MENU</span>
          </button>

          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 bg-cream/10 backdrop-blur-md text-cream border border-cream/30 rounded-full font-sans text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 hover:bg-cream hover:text-espresso hover:border-cream hover:-translate-y-0.5"
          >
            <span>RESERVE A TABLE</span>
          </button>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.button
        onClick={scrollToStory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-cream/50 hover:text-cream transition-colors group cursor-pointer"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase mb-2 group-hover:tracking-[0.4em] transition-all">
          SCROLL TO DISCOVER
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-terracotta" />
        </motion.div>
      </motion.button>
    </section>
  );
};
