import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Navigation, ExternalLink } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-24 lg:py-36 bg-olive text-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 text-terracotta text-xs tracking-[0.3em] font-sans uppercase mb-3">
            <MapPin className="w-4 h-4" />
            <span>VISIT THE SANCTUARY</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-cream uppercase tracking-wide">
            FIND <span className="text-terracotta italic">VIVEVONS.</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-cream/70 mt-3 font-light">
            Located in the heart of the Creative District. Easy parking, courtyard entrance, and sidewalk seating available.
          </p>
        </motion.div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-olive-dark p-8 md:p-12 rounded-3xl border border-cream/15 flex flex-col justify-between shadow-2xl space-y-8"
          >
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-cream/10 border border-cream/15 flex items-center justify-center text-terracotta flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-sage tracking-widest uppercase block mb-1">LOCATION</span>
                  <h3 className="font-serif text-xl text-cream font-light">428 Sanctuary Lane, Creative District</h3>
                  <p className="font-sans text-xs text-cream/70 font-light">Metropolis, MP 10001</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-cream/10 border border-cream/15 flex items-center justify-center text-terracotta flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-sage tracking-widest uppercase block mb-1">OPENING HOURS</span>
                  <p className="font-sans text-xs text-cream/90 font-medium">Monday – Friday: <span className="text-cream/70 font-normal">7:30 AM – 10:00 PM</span></p>
                  <p className="font-sans text-xs text-cream/90 font-medium">Saturday – Sunday: <span className="text-cream/70 font-normal">8:00 AM – 11:00 PM</span></p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-cream/10 border border-cream/15 flex items-center justify-center text-terracotta flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-sage tracking-widest uppercase block mb-1">GET IN TOUCH</span>
                  <p className="font-sans text-xs text-cream/90 font-medium">+1 (555) 848-3866</p>
                  <p className="font-sans text-xs text-cream/70 font-light">hello@vivevons.com</p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-cream/10 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-5 bg-terracotta text-cream rounded-full text-xs font-sans tracking-[0.2em] uppercase font-semibold text-center hover:bg-terracotta-dark transition-colors flex items-center justify-center space-x-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href="tel:+15558483866"
                className="flex-1 py-3.5 px-5 bg-cream/10 border border-cream/20 text-cream rounded-full text-xs font-sans tracking-[0.2em] uppercase font-semibold text-center hover:bg-cream hover:text-olive transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CALL VIVEVONS</span>
              </a>
            </div>
          </motion.div>

          {/* Right Map Visual Simulation Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-cream rounded-3xl overflow-hidden border border-cream/20 shadow-2xl relative min-h-[400px] flex items-center justify-center"
          >
            {/* Styled Map Image Backdrop */}
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
              alt="Map view of Creative District"
              className="w-full h-full object-cover filter contrast-125 saturate-50 opacity-40 mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive via-transparent to-olive/30" />

            {/* Custom Map Pin Marker Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 bg-olive p-5 rounded-2xl border border-terracotta shadow-2xl flex items-center space-x-4 max-w-xs text-cream"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-terracotta shadow-lg flex-shrink-0">
                <img src="/logo.jpg" alt="VIVEVONS Pin Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-serif text-lg uppercase tracking-wider text-cream font-medium">VIVEVONS</h4>
                <p className="font-sans text-[11px] text-sage font-light">428 Sanctuary Lane</p>
                <span className="inline-block mt-1 text-[9px] font-mono uppercase text-terracotta tracking-widest">OPEN NOW</span>
              </div>
            </motion.div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 bg-espresso/80 backdrop-blur-md text-cream px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest flex items-center space-x-1.5 hover:bg-terracotta transition-colors"
            >
              <span>VIEW LARGE MAP</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
