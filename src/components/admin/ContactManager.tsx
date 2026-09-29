import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { ContactDetails, OpeningHour } from '../../types';
import { MapPin, Phone, Mail, Clock, Save, Sparkles } from 'lucide-react';

export const ContactManager: React.FC = () => {
  const [contact, setContact] = useState<ContactDetails>(db.getContactDetails());
  const [hours, setHours] = useState<OpeningHour[]>(db.getOpeningHours());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveContactDetails(contact);
    db.logActivity('admin@vivevons.com', 'ADMIN', 'CONTACT_UPDATE', `Updated contact details & phone (${contact.phone})`);
    triggerToast('✓ Contact details updated on public website!');
  };

  const handleSaveHours = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveOpeningHours(hours);
    db.logActivity('admin@vivevons.com', 'ADMIN', 'HOURS_UPDATE', 'Updated café opening hours.');
    triggerToast('✓ Opening hours updated!');
  };

  const handleHourChange = (idx: number, field: keyof OpeningHour, val: any) => {
    const updated = [...hours];
    updated[idx] = { ...updated[idx], [field]: val };
    setHours(updated);
  };

  return (
    <div className="space-y-8">
      
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-olive text-cream px-6 py-3 rounded-2xl shadow-2xl border border-terracotta text-xs font-sans font-medium flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-terracotta" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm">
        <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block">LOCATION & HOURS</span>
        <h2 className="font-serif text-3xl text-olive font-light uppercase">CONTACT & OPENING HOURS MANAGER</h2>
        <p className="font-sans text-xs text-espresso/70 mt-1">
          When phone number, address, or operating hours change here, the public site updates automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Details Form */}
        <form onSubmit={handleSaveContact} className="bg-cream p-8 rounded-2xl border border-olive/15 space-y-4">
          <h3 className="font-serif text-2xl text-olive uppercase font-light border-b border-olive/15 pb-3">
            CAFÉ CONTACT DETAILS
          </h3>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Street Address</label>
            <input
              type="text"
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">City & Postal Code</label>
            <input
              type="text"
              value={contact.city}
              onChange={(e) => setContact({ ...contact, city: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Phone Number *</label>
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-mono font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Email Address *</label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">WhatsApp Contact</label>
            <input
              type="text"
              value={contact.whatsapp}
              onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Google Maps Direct URL</label>
            <input
              type="text"
              value={contact.googleMapsUrl}
              onChange={(e) => setContact({ ...contact, googleMapsUrl: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-mono text-terracotta"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-olive text-cream rounded-xl text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-terracotta transition-colors shadow-lg flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE CONTACT DETAILS</span>
          </button>
        </form>

        {/* Opening Hours Form */}
        <form onSubmit={handleSaveHours} className="bg-cream p-8 rounded-2xl border border-olive/15 space-y-4">
          <h3 className="font-serif text-2xl text-olive uppercase font-light border-b border-olive/15 pb-3">
            WEEKLY OPENING HOURS
          </h3>

          <div className="space-y-3">
            {hours.map((h, idx) => (
              <div key={h.dayName} className="p-3.5 rounded-xl bg-offwhite border border-olive/10 flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-olive font-semibold w-24">{h.dayName}</span>

                <div className="flex items-center space-x-2 flex-1 font-mono text-xs">
                  <input
                    type="text"
                    disabled={h.isClosed}
                    value={h.openTime}
                    onChange={(e) => handleHourChange(idx, 'openTime', e.target.value)}
                    className="w-20 p-2 rounded-lg bg-cream border border-olive/20 text-center"
                  />
                  <span>to</span>
                  <input
                    type="text"
                    disabled={h.isClosed}
                    value={h.closeTime}
                    onChange={(e) => handleHourChange(idx, 'closeTime', e.target.value)}
                    className="w-20 p-2 rounded-lg bg-cream border border-olive/20 text-center"
                  />
                </div>

                <label className="flex items-center space-x-1.5 text-xs font-sans">
                  <input
                    type="checkbox"
                    checked={h.isClosed}
                    onChange={(e) => handleHourChange(idx, 'isClosed', e.target.checked)}
                    className="rounded text-olive focus:ring-olive"
                  />
                  <span className="text-[11px] font-mono uppercase text-walnut">Closed</span>
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-olive text-cream rounded-xl text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-terracotta transition-colors shadow-lg flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE OPENING HOURS</span>
          </button>
        </form>

      </div>

    </div>
  );
};
