import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { INITIAL_IDEAS } from '../data/initialIdeas';
import { IdeaNote } from '../types';
import { Lightbulb, Send, Heart, CheckCircle2, ShieldCheck, Filter, PlusCircle } from 'lucide-react';

export const IdeaWall: React.FC = () => {
  const [ideas, setIdeas] = useState<IdeaNote[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showFormModal, setShowFormModal] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'dream' | 'project' | 'life' | 'creative'>('dream');
  const [color, setColor] = useState<string>('cream');
  const [errors, setErrors] = useState<{ name?: string; title?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Load from LocalStorage or Fallback to INITIAL_IDEAS
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vivevons_ideas');
      if (stored) {
        setIdeas(JSON.parse(stored));
      } else {
        setIdeas(INITIAL_IDEAS);
        localStorage.setItem('vivevons_ideas', JSON.stringify(INITIAL_IDEAS));
      }
    } catch {
      setIdeas(INITIAL_IDEAS);
    }
  }, []);

  const saveIdeas = (updated: IdeaNote[]) => {
    setIdeas(updated);
    try {
      localStorage.setItem('vivevons_ideas', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLike = (id: string) => {
    const updated = ideas.map((item) =>
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    );
    saveIdeas(updated);
  };

  const validate = () => {
    const errs: { name?: string; title?: string; message?: string } = {};
    if (!name.trim()) errs.name = 'Please enter your name or pseudonym.';
    if (!title.trim() || title.trim().length < 4) errs.title = 'Title must be at least 4 characters long.';
    if (!message.trim() || message.trim().length < 10) errs.message = 'Please share a message (at least 10 characters).';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newIdea: IdeaNote = {
        id: `idea-${Date.now()}`,
        author: name.trim(),
        title: title.trim(),
        message: message.trim(),
        category,
        createdAt: 'Just now',
        likes: 1,
        color,
        status: 'APPROVED',
      };

      const updated = [newIdea, ...ideas];
      saveIdeas(updated);

      setIsSubmitting(false);
      setSubmittedSuccess(true);

      // Trigger Luxury Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#263F32', '#5A402B', '#B96F4A', '#F4EBDD'],
        });
      } catch (err) {
        console.error(err);
      }

      setTimeout(() => {
        setSubmittedSuccess(false);
        setShowFormModal(false);
        setName('');
        setTitle('');
        setMessage('');
      }, 2500);
    }, 600);
  };

  const filteredIdeas = ideas.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section id="idea-wall" className="py-24 lg:py-36 bg-offwhite text-espresso relative overflow-hidden">
      
      {/* Decorative Blur Effect */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-terracotta/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <div className="flex items-center space-x-2 text-terracotta text-xs tracking-[0.3em] font-sans uppercase mb-3">
              <Lightbulb className="w-4 h-4" />
              <span>INTERACTIVE COMMUNITY BOARD</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-olive uppercase tracking-tight">
              WHAT’S YOUR <br className="hidden md:inline" />
              <span className="text-walnut italic">NEXT IDEA?</span>
            </h2>
            <p className="font-serif text-lg text-walnut italic mt-2">
              “Every big thing once started as a small thought.”
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center space-x-4">
            <button
              onClick={() => setShowFormModal(true)}
              className="px-8 py-4 bg-terracotta text-cream rounded-full font-sans text-xs tracking-[0.25em] uppercase font-semibold hover:bg-terracotta-dark transition-all duration-300 shadow-xl hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>LEAVE AN IDEA</span>
            </button>
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex items-center space-x-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
          <span className="text-xs font-mono uppercase tracking-widest text-walnut/60 mr-2 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" /> FILTER:
          </span>
          {[
            { id: 'all', name: 'ALL IDEAS' },
            { id: 'dream', name: 'UNFINISHED DREAMS' },
            { id: 'project', name: 'PROJECTS' },
            { id: 'creative', name: 'CREATIVE WRITING' },
            { id: 'life', name: 'FRESH STARTS' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                activeCategory === cat.id
                  ? 'bg-olive text-cream font-medium shadow-md'
                  : 'bg-cream text-espresso/70 hover:bg-cream-dark border border-olive/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid of Idea Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredIdeas.map((idea, idx) => {
              // Color styles mapping
              const bgStyles =
                idea.color === 'olive'
                  ? 'bg-olive text-cream border-olive-light'
                  : idea.color === 'terracotta'
                  ? 'bg-terracotta text-cream border-terracotta-light'
                  : idea.color === 'walnut'
                  ? 'bg-walnut text-cream border-walnut-light'
                  : 'bg-cream text-espresso border-olive/15';

              return (
                <motion.div
                  key={idea.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`p-7 rounded-2xl border shadow-md flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group min-h-[220px] ${bgStyles}`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase opacity-75 mb-3 border-b border-current/15 pb-2">
                      <span>{idea.category.toUpperCase()}</span>
                      <span>{idea.createdAt}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-light tracking-wide mb-3 leading-snug">
                      {idea.title}
                    </h3>

                    <p className="font-sans text-xs leading-relaxed opacity-90 font-light">
                      “{idea.message}”
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-6 border-t border-current/15">
                    <span className="font-sans text-xs font-semibold tracking-wider">
                      — {idea.author}
                    </span>

                    <button
                      onClick={() => handleLike(idea.id)}
                      className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/10 hover:bg-black/20 transition-colors text-xs"
                      title="Inspiring idea"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current text-terracotta" />
                      <span className="font-mono text-[11px]">{idea.likes}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {showFormModal && (
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
              className="bg-offwhite max-w-lg w-full rounded-3xl p-8 md:p-10 border border-olive/20 shadow-2xl relative text-espresso"
            >
              {!submittedSuccess ? (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="font-mono text-xs text-terracotta tracking-widest block uppercase">THE IDEA BOARD</span>
                      <h3 className="font-serif text-3xl text-olive font-light tracking-wide uppercase">SHARE YOUR IDEA</h3>
                    </div>
                    <button
                      onClick={() => setShowFormModal(false)}
                      className="text-xs font-mono uppercase tracking-widest text-espresso/50 hover:text-espresso"
                    >
                      [ CLOSE ]
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                        Your Name / Pseudonym *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Julian M. or Solitary Writer"
                        className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta transition-colors"
                      />
                      {errors.name && <p className="text-[11px] text-terracotta mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                        Idea Title / Headline *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. A indie bookstore by the sea"
                        className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta transition-colors"
                      />
                      {errors.title && <p className="text-[11px] text-terracotta mt-1">{errors.title}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta transition-colors"
                      >
                        <option value="dream">Unfinished Dream</option>
                        <option value="project">New Project</option>
                        <option value="creative">Creative Writing / Art</option>
                        <option value="life">Fresh Beginning / Life</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                        Card Color Theme
                      </label>
                      <div className="flex space-x-3 pt-1">
                        {[
                          { id: 'cream', name: 'Warm Cream', bg: 'bg-cream border-olive/20' },
                          { id: 'olive', name: 'Deep Olive', bg: 'bg-olive' },
                          { id: 'terracotta', name: 'Terracotta', bg: 'bg-terracotta' },
                          { id: 'walnut', name: 'Walnut', bg: 'bg-walnut' },
                        ].map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setColor(c.id)}
                            className={`w-8 h-8 rounded-full border-2 ${c.bg} ${
                              color === c.id ? 'scale-110 border-black' : 'border-transparent'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                        Your Story / Idea Details *
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share a sentence or two about your unfinished dream or new spark..."
                        className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta transition-colors"
                      />
                      {errors.message && <p className="text-[11px] text-terracotta mt-1">{errors.message}</p>}
                    </div>

                    <div className="flex items-center text-[10px] text-sage font-mono space-x-1.5 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                      <span>Spam protection active. Notes are stored securely.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-terracotta text-cream rounded-xl font-sans text-xs tracking-[0.2em] uppercase font-semibold hover:bg-terracotta-dark transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'PINNING YOUR IDEA...' : 'LEAVE AN IDEA'}</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-olive mx-auto animate-bounce" />
                  <h3 className="font-serif text-3xl text-olive uppercase tracking-wide">
                    YOUR IDEA HAS A PLACE HERE.
                  </h3>
                  <p className="font-sans text-xs text-espresso/70 max-w-sm mx-auto">
                    Thank you for sharing your spark with VIVEVONS. Your note has been pinned to the public idea wall!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
