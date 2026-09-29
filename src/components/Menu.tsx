import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { Search, Sparkles, Utensils, X, Check } from 'lucide-react';

interface MenuProps {
  onOpenReservation: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onOpenReservation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string | null>(null);
  const [showFullMenuModal, setShowFullMenuModal] = useState(false);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.creativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.normalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDietary = selectedDietary ? item.dietary?.includes(selectedDietary as any) : true;
    return matchesCategory && matchesSearch && matchesDietary;
  });

  return (
    <section id="menu" className="py-24 lg:py-36 bg-cream text-espresso relative">
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
            <Utensils className="w-4 h-4" />
            <span>CURATED HOSPITALITY</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-olive uppercase tracking-wide leading-tight">
            GOOD FOOD. <br className="hidden sm:inline" />
            GREAT COFFEE. <span className="text-walnut italic">BIG IDEAS.</span>
          </h2>
          <p className="font-sans text-sm text-espresso/70 mt-4 font-light">
            Every dish and beverage carries a creative chapter title alongside its classic recipe.
          </p>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="mb-12 space-y-6">
          
          {/* Category Tabs Scrollable Horizontal Bar */}
          <div className="flex items-center overflow-x-auto pb-4 space-x-2 no-scrollbar justify-start md:justify-center">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-olive text-cream shadow-lg scale-105'
                      : 'bg-offwhite text-espresso/70 border border-olive/10 hover:bg-cream hover:text-olive'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search Input & Tag Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-olive/40" />
              <input
                type="text"
                placeholder="Search coffee or food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-offwhite border border-olive/15 text-xs text-espresso placeholder-espresso/40 focus:outline-none focus:border-terracotta transition-colors font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-olive/50 hover:text-olive"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Dietary Filters */}
            <div className="flex items-center space-x-2 text-xs font-sans">
              <span className="text-walnut/70 uppercase tracking-wider text-[10px]">Filter:</span>
              {[
                { id: 'chef-choice', label: "Chef's Pick" },
                { id: 'vegan', label: 'Vegan' },
                { id: 'popular', label: 'Popular' },
              ].map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedDietary(selectedDietary === tag.id ? null : tag.id)}
                  className={`px-3 py-1 rounded-full text-[11px] transition-all border ${
                    selectedDietary === tag.id
                      ? 'bg-terracotta text-cream border-terracotta'
                      : 'bg-offwhite text-espresso/70 border-olive/15 hover:border-olive/30'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-offwhite rounded-2xl p-6 border border-olive/10 shadow-sm hover:shadow-xl hover:border-olive/30 transition-all duration-300 flex flex-col sm:flex-row gap-6 group"
              >
                {/* Item Thumbnail */}
                {item.image && (
                  <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img
                      src={item.image}
                      alt={item.creativeName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.dietary?.includes('popular') && (
                      <span className="absolute top-2 left-2 bg-terracotta text-cream text-[9px] font-sans uppercase tracking-widest px-2 py-0.5 rounded-full shadow">
                        POPULAR
                      </span>
                    )}
                  </div>
                )}

                {/* Content Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Creative VIVEVONS Name & Price */}
                    <div className="flex justify-between items-baseline mb-1 border-b border-olive/10 pb-2">
                      <h3 className="font-serif text-xl font-medium tracking-wide text-olive uppercase">
                        {item.creativeName}
                      </h3>
                      <span className="font-serif text-xl text-terracotta font-medium ml-4">
                        {item.price}
                      </span>
                    </div>

                    {/* Clear Normal Ordering Name */}
                    <div className="flex items-center space-x-2 my-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-walnut bg-cream px-2 py-0.5 rounded border border-walnut/20">
                        ORDER AS:
                      </span>
                      <span className="font-sans text-xs font-semibold text-espresso uppercase tracking-wider">
                        {item.normalName}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-xs text-espresso/70 leading-relaxed font-light mt-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Dietary Badges */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 mt-2 border-t border-olive/5">
                      {item.dietary.map((d) => (
                        <span
                          key={d}
                          className="text-[9px] uppercase tracking-wider font-mono text-sage px-2 py-0.5 rounded bg-cream/80"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-espresso/60 font-sans text-sm">
            No items matched your search criteria. Try selecting another category!
          </div>
        )}

        {/* View Full Menu CTA Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setShowFullMenuModal(true)}
            className="px-10 py-4 bg-olive text-cream rounded-full font-sans text-xs tracking-[0.25em] uppercase font-semibold hover:bg-walnut transition-all duration-300 shadow-xl hover:-translate-y-0.5 inline-flex items-center space-x-3"
          >
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span>VIEW FULL PRINTABLE MENU</span>
          </button>
        </div>

      </div>

      {/* Full Menu Overview Modal */}
      <AnimatePresence>
        {showFullMenuModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-offwhite max-w-4xl w-full max-h-[85vh] rounded-3xl p-6 md:p-10 overflow-y-auto border border-olive/20 shadow-2xl relative text-espresso"
            >
              <button
                onClick={() => setShowFullMenuModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-cream hover:bg-terracotta hover:text-cream transition-colors text-olive"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8 border-b border-olive/15 pb-6">
                <span className="font-mono text-xs text-terracotta tracking-widest block uppercase">VIVEVONS COMPACT MENU</span>
                <h2 className="font-serif text-4xl text-olive font-light tracking-wide uppercase">FULL SANCTUARY OFFERINGS</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {MENU_ITEMS.map((item) => (
                  <div key={item.id} className="border-b border-olive/10 pb-4">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-serif text-lg text-olive font-medium uppercase">{item.creativeName}</h4>
                      <span className="font-serif text-base text-terracotta">{item.price}</span>
                    </div>
                    <p className="font-sans text-xs text-walnut font-semibold uppercase">{item.normalName}</p>
                    <p className="font-sans text-xs text-espresso/70 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-olive/15 flex justify-between items-center flex-wrap gap-4">
                <p className="text-xs text-sage font-sans">Prices subject to local taxes. All baked goods prepared fresh daily.</p>
                <button
                  onClick={() => {
                    setShowFullMenuModal(false);
                    onOpenReservation();
                  }}
                  className="px-6 py-2.5 bg-terracotta text-cream rounded-full text-xs font-sans tracking-widest uppercase hover:bg-terracotta-dark transition-colors"
                >
                  Book a Table to Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
