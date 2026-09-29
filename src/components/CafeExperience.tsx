import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Flame, HeartHandshake, Compass } from 'lucide-react';

export const CafeExperience: React.FC = () => {
  const experiences = [
    {
      id: 'exp1',
      tag: 'CRAFT & PRECISION',
      title: 'Coffee Preparation',
      subtitle: 'Single-origin beans, water temperature tuned to 93°C.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
      icon: Coffee,
    },
    {
      id: 'exp2',
      tag: 'THE CREATIVE NOOK',
      title: 'Table with Notebook',
      subtitle: 'Oak tables crafted with space for your laptop and sketchbook.',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop',
      icon: Flame,
    },
    {
      id: 'exp3',
      tag: 'UNEXPECTED CONNECTIONS',
      title: 'Friends & Collaborators',
      subtitle: 'Conversations that flow seamlessly from morning till dusk.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
      icon: HeartHandshake,
    },
    {
      id: 'exp4',
      tag: 'BOTANICAL SANCTUARY',
      title: 'Warm Café Atmosphere',
      subtitle: 'Natural greenery, warm pendant light, ambient jazz vinyl.',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
      icon: Compass,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % experiences.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [experiences.length]);

  return (
    <section id="experience" className="py-28 lg:py-40 bg-espresso text-cream relative overflow-hidden">
      
      {/* Background Cinematic Slide */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={experiences[activeIndex].id}
            src={experiences[activeIndex].image}
            alt={experiences[activeIndex].title}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover filter brightness-75"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sage text-xs tracking-[0.3em] uppercase font-sans font-medium block mb-3">
            THE ATMOSPHERE
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-cream uppercase tracking-tight leading-tight">
            COME FOR THE COFFEE. <br />
            <span className="text-terracotta italic">STAY FOR THE IDEAS.</span>
          </h2>
        </motion.div>

        {/* Carousel / Tabbed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {experiences.map((exp, idx) => {
            const isActive = idx === activeIndex;
            const Icon = exp.icon;
            return (
              <div
                key={exp.id}
                onClick={() => setActiveIndex(idx)}
                className={`cursor-pointer p-8 rounded-2xl border transition-all duration-500 backdrop-blur-md flex flex-col justify-between group ${
                  isActive
                    ? 'bg-cream/15 border-terracotta shadow-2xl scale-[1.02]'
                    : 'bg-black/30 border-cream/10 hover:bg-cream/10 hover:border-cream/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-sage tracking-widest uppercase">
                      {exp.tag}
                    </span>
                    <div className={`p-2 rounded-full ${isActive ? 'bg-terracotta text-cream' : 'text-cream/50'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-cream font-light tracking-wide uppercase mb-2">
                    {exp.title}
                  </h3>

                  <p className="font-sans text-xs text-cream/70 leading-relaxed font-light">
                    {exp.subtitle}
                  </p>
                </div>

                {/* Progress bar indicator for active tab */}
                <div className="mt-8 pt-4 border-t border-cream/10">
                  <div className="h-[2px] w-full bg-cream/20 rounded-full overflow-hidden">
                    {isActive && (
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4.5, ease: 'linear' }}
                        className="h-full bg-terracotta"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
