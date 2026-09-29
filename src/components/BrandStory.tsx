import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-24 lg:py-36 bg-offwhite text-espresso relative overflow-hidden">
      {/* Decorative Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cream/50 -z-0 pointer-events-none" />
      <div className="absolute bottom-10 left-10 text-[200px] font-serif text-cream/40 leading-none select-none pointer-events-none z-0">
        “
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col mb-16 md:mb-24"
        >
          <div className="flex items-center space-x-3 text-terracotta text-xs tracking-[0.3em] font-sans uppercase mb-3">
            <BookOpen className="w-4 h-4" />
            <span>OUR ORIGIN & PHILOSOPHY</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-olive tracking-tight uppercase leading-tight">
            EVERY IDEA <br className="hidden md:inline" />
            <span className="text-walnut italic">STARTS SOMEWHERE.</span>
          </h2>
        </motion.div>

        {/* Split Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-7 space-y-8"
          >
            <p className="font-serif text-2xl md:text-3xl text-olive leading-relaxed font-light italic border-l-2 border-terracotta pl-6 py-1">
              “Once, there was a boy with a mind full of ideas.”
            </p>

            <div className="font-sans text-base md:text-lg text-espresso/80 leading-relaxed space-y-6 font-light">
              <p>
                He dreamed of doing many things. Some worked. Some didn’t.
                Some never made it past the pages of his notebook.
              </p>
              
              <p className="bg-cream/60 p-6 rounded-2xl border border-olive/10 shadow-sm text-olive">
                <span className="font-medium text-walnut block mb-1 uppercase tracking-wider text-xs font-mono">The Realization</span>
                “But every failure left him with something new — a lesson, a different perspective, or another idea.”
              </p>

              <p>
                One day, he decided to turn his little dream into a place of its own. A place where coffee meets creativity, where conversations become possibilities, and where unfinished dreams are always welcome.
              </p>

              <p className="font-serif text-2xl text-olive font-normal pt-2">
                That place became <span className="underline decoration-terracotta/40 underline-offset-8">VIVEVONS</span>.
              </p>
            </div>

            {/* End Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="pt-6 border-t border-walnut/15 flex items-center space-x-4"
            >
              <div className="w-12 h-12 rounded-full bg-olive text-cream flex items-center justify-center flex-shrink-0 shadow-md">
                <Sparkles className="w-5 h-5 text-terracotta" />
              </div>
              <div>
                <p className="font-serif text-xl md:text-2xl text-walnut font-medium italic">
                  A café built by a boy who didn’t stop dreaming.
                </p>
                <p className="font-sans text-xs text-sage uppercase tracking-[0.2em]">FOUNDER’S DEDICATION</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Atmospheric Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-olive/10 group">
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
                alt="Notebook and Coffee at VIVEVONS"
                className="w-full h-[500px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 text-cream">
                <span className="font-mono text-xs text-terracotta uppercase tracking-widest block mb-1">
                  EST. 2026
                </span>
                <p className="font-serif text-xl text-cream font-light italic">
                  “Where every notebook page finds a fresh beginning.”
                </p>
              </div>
            </div>

            {/* Overlapping Small Accent Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-8 -left-8 bg-cream border border-olive/20 p-6 rounded-2xl shadow-xl hidden sm:block max-w-xs"
            >
              <p className="font-serif text-sm text-olive italic leading-snug">
                “Bring your unfinished drafts. We have hot coffee and open tables waiting.”
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
