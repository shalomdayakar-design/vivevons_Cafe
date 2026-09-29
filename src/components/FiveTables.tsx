import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FIVE_TABLES } from '../data/tablesData';
import { Sparkles, ArrowRight, Quote } from 'lucide-react';

export const FiveTables: React.FC = () => {
  const [activeTableId, setActiveTableId] = useState(FIVE_TABLES[0].id);

  const activeTable = FIVE_TABLES.find((t) => t.id === activeTableId) || FIVE_TABLES[0];

  return (
    <section id="five-tables" className="py-24 lg:py-36 bg-offwhite text-espresso relative overflow-hidden">
      
      {/* Background Decorative Gradient */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cream/80 rounded-full blur-[100px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <div className="flex items-center space-x-2 text-terracotta text-xs tracking-[0.3em] font-sans uppercase mb-3">
              <Sparkles className="w-4 h-4" />
              <span>THE VIVEVONS EXPERIENCE</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-olive uppercase tracking-tight">
              FIVE TABLES. <br className="hidden md:inline" />
              <span className="text-walnut italic">FIVE CHAPTERS.</span>
            </h2>
          </div>

          <p className="font-sans text-sm text-espresso/70 max-w-sm mt-4 md:mt-0 font-light leading-relaxed">
            Every table inside VIVEVONS represents a distinct state of mind. Find the sanctuary crafted for your current journey.
          </p>
        </motion.div>

        {/* Desktop Interactive Horizontal Experience */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch min-h-[580px]">
          
          {/* Left Column: Interactive Chapter List */}
          <div className="col-span-5 flex flex-col justify-between space-y-3">
            {FIVE_TABLES.map((table) => {
              const isActive = table.id === activeTableId;
              return (
                <div
                  key={table.id}
                  onClick={() => setActiveTableId(table.id)}
                  onMouseEnter={() => setActiveTableId(table.id)}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all duration-500 flex items-center justify-between group ${
                    isActive
                      ? 'bg-olive text-cream border-olive shadow-xl scale-[1.02]'
                      : 'bg-cream/40 text-olive border-olive/10 hover:bg-cream hover:border-olive/30'
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    <span
                      className={`font-serif text-3xl font-light transition-all duration-300 ${
                        isActive ? 'text-terracotta scale-110 font-medium' : 'text-walnut/50 group-hover:text-walnut'
                      }`}
                    >
                      {table.number}
                    </span>
                    <div>
                      <h3
                        className={`font-serif text-xl tracking-wider uppercase transition-colors ${
                          isActive ? 'text-cream font-normal' : 'text-olive group-hover:text-walnut'
                        }`}
                      >
                        {table.title}
                      </h3>
                      <p
                        className={`font-sans text-xs tracking-wide transition-colors ${
                          isActive ? 'text-sage' : 'text-espresso/60'
                        }`}
                      >
                        {table.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isActive
                        ? 'text-terracotta translate-x-1 opacity-100'
                        : 'text-olive/20 group-hover:text-olive group-hover:translate-x-1 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Immersive Active Chapter Preview Card */}
          <div className="col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTable.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full bg-cream rounded-3xl overflow-hidden border border-olive/15 shadow-2xl flex flex-col justify-between p-8 lg:p-10 relative"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={activeTable.image}
                    alt={activeTable.title}
                    className="w-full h-full object-cover filter brightness-90 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/60 to-espresso/20" />
                </div>

                {/* Top Badge & Number */}
                <div className="relative z-10 flex justify-between items-start text-cream">
                  <div className="px-4 py-1.5 rounded-full bg-cream/10 border border-cream/20 backdrop-blur-md text-xs font-mono tracking-widest uppercase text-sage">
                    CHAPTER {activeTable.number} OF 05
                  </div>
                  <span className="font-serif text-6xl font-light text-terracotta opacity-80 font-mono">
                    {activeTable.number}
                  </span>
                </div>

                {/* Bottom Content Detail */}
                <div className="relative z-10 text-cream space-y-4 pt-20">
                  <h3 className="font-serif text-4xl font-light tracking-wide text-cream uppercase">
                    {activeTable.title}
                  </h3>

                  <div className="flex items-start space-x-3 text-terracotta">
                    <Quote className="w-5 h-5 flex-shrink-0 mt-1" />
                    <p className="font-serif text-xl italic text-cream/90 font-light">
                      {activeTable.quote}
                    </p>
                  </div>

                  <p className="font-sans text-sm text-cream/80 leading-relaxed font-light max-w-xl">
                    {activeTable.description}
                  </p>

                  <div className="pt-4 border-t border-cream/15 flex items-center space-x-3">
                    <span className="text-xs uppercase tracking-widest text-sage font-mono">IDEAL FOR:</span>
                    <div className="flex flex-wrap gap-2">
                      {activeTable.idealFor.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-cream/15 border border-cream/20 text-[11px] font-sans tracking-wider text-cream"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Mobile Vertical Cards Stack */}
        <div className="lg:hidden space-y-6">
          {FIVE_TABLES.map((table) => (
            <div
              key={table.id}
              className="bg-cream border border-olive/15 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="h-56 relative">
                <img
                  src={table.image}
                  alt={table.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-cream">
                  <div>
                    <span className="font-mono text-xs text-terracotta tracking-widest block">CHAPTER {table.number}</span>
                    <h3 className="font-serif text-2xl uppercase tracking-wider">{table.title}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6 text-espresso space-y-3">
                <p className="font-serif text-base italic text-walnut">
                  {table.quote}
                </p>
                <p className="font-sans text-xs text-espresso/80 leading-relaxed">
                  {table.description}
                </p>
                <div className="pt-3 border-t border-olive/10 flex flex-wrap gap-1.5">
                  {table.idealFor.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-olive/10 text-[10px] font-sans text-olive"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
