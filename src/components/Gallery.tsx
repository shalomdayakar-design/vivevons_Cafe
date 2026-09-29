import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_ITEMS } from '../data/galleryData';
import { GalleryItem } from '../types';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'ALL ARCHIVES' },
    { id: 'interior', name: 'INTERIOR' },
    { id: 'coffee', name: 'SPECIALTY COFFEE' },
    { id: 'food', name: 'GOURMET DISHES' },
    { id: 'tables', name: 'CHAPTER TABLES' },
    { id: 'details', name: 'DETAILS' },
    { id: 'people', name: 'PEOPLE & VIBES' },
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const openLightbox = (item: GalleryItem) => {
    const idx = filteredItems.findIndex((i) => i.id === item.id);
    if (idx !== -1) setActiveLightboxIndex(idx);
  };

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1
      );
    }
  };

  return (
    <section id="gallery" className="py-24 lg:py-36 bg-offwhite text-espresso relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 text-terracotta text-xs tracking-[0.3em] font-sans uppercase mb-3">
            <Camera className="w-4 h-4" />
            <span>EDITORIAL GALLERY</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-olive uppercase tracking-wide">
            VISUAL <span className="text-walnut italic">CHAPTERS.</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-espresso/70 mt-3 font-light">
            A curated photographic view inside the lights, coffee pours, and quiet corners of VIVEVONS.
          </p>
        </motion.div>

        {/* Filter Categories */}
        <div className="flex items-center space-x-2 mb-12 overflow-x-auto pb-2 no-scrollbar justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-sans tracking-[0.2em] uppercase whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-olive text-cream font-medium shadow-md'
                  : 'bg-cream text-espresso/70 hover:bg-cream-dark border border-olive/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onClick={() => openLightbox(item)}
                className="relative overflow-hidden rounded-2xl border border-olive/10 shadow-md group cursor-pointer break-inside-avoid bg-cream"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-cream">
                  <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block mb-1">
                    {item.category.toUpperCase()}
                  </span>
                  <h3 className="font-serif text-2xl font-light tracking-wide uppercase">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-cream/80 font-light mt-1">
                    {item.caption}
                  </p>
                  <div className="mt-3 flex items-center space-x-1 text-[11px] font-mono tracking-widest text-sage">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>VIEW FULLSCREEN</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Premium Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-espresso/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-cream/10 text-cream hover:bg-terracotta transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevLightbox}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-cream/10 text-cream hover:bg-terracotta transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextLightbox}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-cream/10 text-cream hover:bg-terracotta transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image & Caption Content */}
            <div className="max-w-5xl w-full flex flex-col items-center">
              <motion.img
                key={filteredItems[activeLightboxIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={filteredItems[activeLightboxIndex].image}
                alt={filteredItems[activeLightboxIndex].title}
                className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border border-cream/20"
              />

              <div className="mt-6 text-center text-cream max-w-xl space-y-2">
                <span className="font-mono text-xs text-terracotta tracking-widest uppercase">
                  ARCHIVE {activeLightboxIndex + 1} OF {filteredItems.length}
                </span>
                <h3 className="font-serif text-3xl font-light tracking-wide uppercase">
                  {filteredItems[activeLightboxIndex].title}
                </h3>
                <p className="font-sans text-sm text-cream/80 font-light">
                  {filteredItems[activeLightboxIndex].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
