import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2, Sparkles, X, ChevronRight } from 'lucide-react';
import { FIVE_TABLES } from '../data/tablesData';

interface ReservationProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const Reservation: React.FC<ReservationProps> = ({ isOpenModal, onCloseModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:30',
    guests: 2,
    tablePreference: '02 — THE NOTEBOOK',
    specialNotes: '',
  });

  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const validate = () => {
    const errs: { name?: string; phone?: string; email?: string } = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name.';
    if (!formData.phone.trim() || formData.phone.trim().length < 7) errs.phone = 'Please enter a valid phone number.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please enter a valid email address.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const ref = `VV-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(ref);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#263F32', '#B96F4A', '#F4EBDD'],
        });
      } catch (err) {
        console.error(err);
      }
    }, 800);
  };

  const formContent = (
    <div className="w-full max-w-4xl mx-auto bg-cream rounded-3xl p-8 lg:p-14 border border-olive/20 shadow-2xl relative text-espresso">
      {onCloseModal && (
        <button
          onClick={onCloseModal}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-offwhite hover:bg-terracotta hover:text-cream transition-colors text-olive"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {!bookingRef ? (
        <>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 text-terracotta text-xs tracking-[0.3em] font-sans uppercase mb-2">
              <CalendarIcon className="w-4 h-4" />
              <span>TABLE RESERVATION</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-olive uppercase tracking-wide">
              YOUR TABLE <span className="text-walnut italic">IS WAITING.</span>
            </h2>
            <p className="font-sans text-xs md:text-sm text-espresso/70 mt-2 font-light">
              Select your preferred table chapter, date, and time. We will reserve your place with fresh coffee ready.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid 1: Name, Phone, Email */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sophia Vance"
                  className="w-full px-4 py-3 rounded-xl bg-offwhite border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta transition-colors"
                />
                {errors.name && <p className="text-[11px] text-terracotta mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-offwhite border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta transition-colors"
                />
                {errors.phone && <p className="text-[11px] text-terracotta mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sophia@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-offwhite border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta transition-colors"
                />
                {errors.email && <p className="text-[11px] text-terracotta mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Grid 2: Date, Time, Guests */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-offwhite border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Time Slot
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-offwhite border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta transition-colors font-mono"
                >
                  <option value="08:00">08:00 AM — Early Spark</option>
                  <option value="10:30">10:30 AM — Slow Morning</option>
                  <option value="13:00">01:00 PM — Midday Thoughts</option>
                  <option value="16:00">04:00 PM — Afternoon Pause</option>
                  <option value="18:30">06:30 PM — Sunset Conversation</option>
                  <option value="20:30">08:30 PM — Night Writers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Number of Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-offwhite border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta transition-colors font-mono"
                >
                  <option value={1}>1 Guest — Solitary Focus</option>
                  <option value={2}>2 Guests — Pair Dialogue</option>
                  <option value={4}>4 Guests — Creative Squad</option>
                  <option value={6}>6 Guests — Communal Table</option>
                </select>
              </div>
            </div>

            {/* Table Preference Selector */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-2">
                Table Chapter Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {FIVE_TABLES.map((tbl) => (
                  <button
                    key={tbl.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, tablePreference: `${tbl.number} — ${tbl.title}` })}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      formData.tablePreference.includes(tbl.title)
                        ? 'bg-olive text-cream border-olive font-medium shadow-md'
                        : 'bg-offwhite text-espresso/80 border-olive/15 hover:border-olive/30'
                    }`}
                  >
                    <span className="font-mono text-[10px] block opacity-70">TABLE {tbl.number}</span>
                    <span className="font-serif font-light text-sm uppercase block truncate">{tbl.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                Special Requests or Dietary Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.specialNotes}
                onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                placeholder="e.g. Window seat preferred, extra outlets for laptops, celebrating a new venture launch..."
                className="w-full px-4 py-3 rounded-xl bg-offwhite border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-12 py-4 bg-terracotta text-cream rounded-full font-sans text-xs tracking-[0.25em] uppercase font-semibold hover:bg-terracotta-dark transition-all duration-300 shadow-xl hover:-translate-y-0.5 inline-flex items-center justify-center space-x-3"
              >
                <Sparkles className="w-4 h-4 text-cream" />
                <span>{isSubmitting ? 'RESERVED SANCTUARY...' : 'RESERVE MY TABLE'}</span>
              </button>
            </div>
          </form>
        </>
      ) : (
        /* Confirmation Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 space-y-6"
        >
          <div className="w-20 h-20 bg-olive text-cream rounded-full flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-10 h-10 text-terracotta" />
          </div>

          <div>
            <span className="font-mono text-xs text-terracotta tracking-widest block uppercase mb-1">
              BOOKING CONFIRMED — REF #{bookingRef}
            </span>
            <h3 className="font-serif text-4xl text-olive font-light tracking-wide uppercase">
              WE ARE READY FOR YOU, {formData.name.toUpperCase()}.
            </h3>
          </div>

          <div className="bg-offwhite p-6 rounded-2xl border border-olive/15 max-w-md mx-auto text-left space-y-2 text-xs font-sans">
            <div className="flex justify-between border-b border-olive/10 pb-2">
              <span className="text-walnut">Date & Time:</span>
              <span className="font-semibold text-olive">{formData.date} at {formData.time}</span>
            </div>
            <div className="flex justify-between border-b border-olive/10 pb-2">
              <span className="text-walnut">Guests:</span>
              <span className="font-semibold text-olive">{formData.guests} Guests</span>
            </div>
            <div className="flex justify-between border-b border-olive/10 pb-2">
              <span className="text-walnut">Table Chapter:</span>
              <span className="font-semibold text-terracotta">{formData.tablePreference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-walnut">Confirmation Email:</span>
              <span className="font-mono text-olive">{formData.email}</span>
            </div>
          </div>

          <p className="font-serif text-lg italic text-walnut max-w-md mx-auto">
            “Your table, hot coffee, and warm lighting will be waiting for your arrival.”
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                setBookingRef(null);
                if (onCloseModal) onCloseModal();
              }}
              className="px-8 py-3 bg-olive text-cream rounded-full text-xs font-sans tracking-widest uppercase hover:bg-walnut transition-colors"
            >
              Done / Return to Site
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );

  if (isOpenModal) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
        >
          {formContent}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <section id="reservation" className="py-24 lg:py-36 bg-offwhite relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {formContent}
      </div>
    </section>
  );
};
