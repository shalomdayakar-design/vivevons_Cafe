import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, MessageCircle, Lightbulb } from 'lucide-react';

export const MoreThanCoffee: React.FC = () => {
  const pillars = [
    {
      number: '01',
      title: 'COFFEE',
      subtitle: 'Good coffee for slow mornings, late conversations and new ideas.',
      description: 'Ethically sourced single-origin beans, roasted in small batches to preserve nuanced aromas of dark cocoa, roasted hazelnut, and wild honey.',
      icon: Coffee,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    },
    {
      number: '02',
      title: 'CONVERSATIONS',
      subtitle: 'A place where conversations become possibilities.',
      description: 'A space architected for human warmth. Quiet nooks for intimate talks, wide walnut tables for team brainstorming, and no rush to leave.',
      icon: MessageCircle,
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
    },
    {
      number: '03',
      title: 'CREATIVITY',
      subtitle: 'A table, a notebook, and somewhere to begin.',
      description: 'Power outlets under every table, natural window light, warm ambient jazz, and physical boards where ideas can be pinned and shared.',
      icon: Lightbulb,
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-24 lg:py-36 bg-olive text-cream relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sage text-xs tracking-[0.3em] uppercase font-sans font-medium block mb-3">
            THE THREE PILLARS
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-cream uppercase">
            COFFEE MEETS <span className="italic text-terracotta">CREATIVITY.</span>
          </h2>
          <div className="w-16 h-[1px] bg-terracotta mx-auto mt-6" />
        </motion.div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative bg-olive-dark rounded-2xl p-8 border border-cream/10 flex flex-col justify-between hover:border-terracotta/40 transition-all duration-500 overflow-hidden shadow-xl"
              >
                {/* Background Image Hover Reveal Effect */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-olive-dark via-olive-dark/80 to-transparent" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-4xl font-light text-terracotta font-mono">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-cream/5 border border-cream/10 flex items-center justify-center text-sage group-hover:text-terracotta group-hover:bg-cream/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-3xl font-light tracking-wider text-cream mb-4 uppercase">
                    {pillar.title}
                  </h3>

                  <p className="font-serif text-lg text-cream/90 italic font-light mb-4 leading-snug">
                    “{pillar.subtitle}”
                  </p>

                  <p className="font-sans text-sm text-cream/60 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="relative z-10 pt-8 mt-8 border-t border-cream/10 flex items-center text-xs font-sans tracking-[0.2em] text-sage group-hover:text-cream transition-colors">
                  <span>CHAPTER {pillar.number}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
