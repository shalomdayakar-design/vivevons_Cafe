import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Star, Coffee, Feather } from 'lucide-react';

export const SignatureWall: React.FC = () => {
  const wallItems = [
    {
      type: 'note',
      text: 'Draft 01: A mobile app for antique collectors. (Scrapped 2024)',
      rotate: '-rotate-6',
      pos: 'top-10 left-6 md:left-16',
      tag: 'CROSSED OUT',
      crossed: true,
    },
    {
      type: 'sketch',
      text: '☕ + 💡 = VIVEVONS',
      sub: 'Original napkin sketch',
      rotate: 'rotate-3',
      pos: 'top-12 right-8 md:right-24',
      tag: 'THE SPARK',
    },
    {
      type: 'note',
      text: '“Fail faster, brew stronger, start again.”',
      rotate: 'rotate-2',
      pos: 'bottom-16 left-8 md:left-28',
      tag: 'CHAPTER 01',
    },
    {
      type: 'drawing',
      text: '★ ★ ★ ★ ★ "The place where my 2nd startup was born."',
      rotate: '-rotate-3',
      pos: 'bottom-12 right-6 md:right-20',
      tag: 'GUEST NOTE',
    },
    {
      type: 'thought',
      text: 'Architecture project attempt #4 -> PASSED!',
      rotate: 'rotate-6',
      pos: 'top-1/2 left-4 md:left-12 -translate-y-1/2 hidden md:block',
      tag: 'SUCCESS',
    },
    {
      type: 'thought',
      text: 'Don’t throw away the notebook.',
      rotate: '-rotate-2',
      pos: 'top-1/2 right-4 md:right-12 -translate-y-1/2 hidden md:block',
      tag: 'REMINDER',
    },
  ];

  return (
    <section className="py-28 lg:py-40 bg-olive text-cream relative overflow-hidden">
      
      {/* Background Physical Wall Texture Simulation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[radial-gradient(#F4EBDD_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 text-terracotta text-xs tracking-[0.3em] font-sans uppercase mb-3">
            <Feather className="w-4 h-4" />
            <span>THE PHYSICAL MONUMENT</span>
          </div>
          <h2 className="font-serif text-4xl md:text-7xl font-light text-cream uppercase tracking-tight leading-tight">
            FAILED IDEAS. <br />
            <span className="text-terracotta italic">NEW BEGINNINGS.</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-cream/70 mt-4 max-w-lg mx-auto font-light leading-relaxed">
            Inside VIVEVONS, our main wall is covered in physical notes, crossed-out blue-prints, coffee-stained sketches, and brave declarations.
          </p>
        </motion.div>

        {/* Physical Wall Display Board with Central Logo Emblem */}
        <div className="relative w-full min-h-[520px] md:min-h-[600px] bg-olive-dark rounded-3xl border border-cream/15 p-8 md:p-16 flex items-center justify-center shadow-2xl overflow-hidden">
          
          {/* Subtle Ambient Light Grid behind Emblem */}
          <div className="absolute w-80 h-80 bg-terracotta/20 rounded-full blur-[90px] pointer-events-none" />

          {/* Central VIVEVONS Logo Emblem */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 flex flex-col items-center text-center p-8 rounded-full bg-olive/80 border-2 border-cream/30 shadow-2xl backdrop-blur-md max-w-xs md:max-w-sm"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-terracotta shadow-xl p-1 bg-cream mb-4">
              <img
                src="/logo.jpg"
                alt="VIVEVONS Central Wall Emblem"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-cream tracking-widest font-light uppercase">
              VIVEVONS
            </h3>
            <div className="w-12 h-[1px] bg-terracotta my-2" />
            <p className="font-sans text-[10px] md:text-xs text-sage tracking-[0.25em] uppercase">
              THE CAFÉ OF SECOND CHANCES
            </p>
          </motion.div>

          {/* Floating Handwritten Notes & Pin Items */}
          {wallItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.7 }}
              whileHover={{ scale: 1.05, zIndex: 30 }}
              className={`absolute ${item.pos} ${item.rotate} z-10 max-w-[220px] md:max-w-[260px] p-5 rounded-xl bg-cream text-espresso shadow-2xl border border-walnut/20 font-sans cursor-pointer group`}
            >
              {/* Pushpin Graphic */}
              <div className="w-3 h-3 rounded-full bg-terracotta shadow-md absolute -top-1.5 left-1/2 -translate-x-1/2 border border-cream" />

              <div className="flex justify-between items-center mb-2 text-[9px] font-mono tracking-widest text-walnut uppercase border-b border-walnut/10 pb-1">
                <span>{item.tag}</span>
                <Star className="w-3 h-3 text-terracotta" />
              </div>

              <p className={`font-serif text-sm md:text-base leading-snug text-olive ${item.crossed ? 'line-through decoration-terracotta decoration-2 opacity-80' : 'font-medium'}`}>
                {item.text}
              </p>

              {item.sub && (
                <p className="font-sans text-[10px] text-walnut/70 mt-1 italic">
                  {item.sub}
                </p>
              )}
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};
