import React, { useState } from 'react';
import { db } from '../../lib/db';
import { BrandSettings, SeoSettings } from '../../types';
import { Settings, Globe, Save, Sparkles } from 'lucide-react';

export const BrandAndSeoSettings: React.FC = () => {
  const [brand, setBrand] = useState<BrandSettings>(db.getBrandSettings());
  const [seo, setSeo] = useState<SeoSettings>(db.getSeoSettings());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveBrandSettings(brand);
    db.logActivity('admin@vivevons.com', 'ADMIN', 'BRAND_UPDATE', 'Updated Brand settings.');
    triggerToast('✓ Brand settings updated!');
  };

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveSeoSettings(seo);
    db.logActivity('admin@vivevons.com', 'ADMIN', 'SEO_UPDATE', 'Updated Search Engine Optimization meta data.');
    triggerToast('✓ SEO settings updated!');
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
        <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block">SYSTEM CONFIGURATION</span>
        <h2 className="font-serif text-3xl text-olive font-light uppercase">BRAND IDENTITY & SEO MANAGEMENT</h2>
        <p className="font-sans text-xs text-espresso/70 mt-1">
          Control brand wordmarks, concept taglines, color palettes, and global search engine metadata.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Brand Identity Form */}
        <form onSubmit={handleSaveBrand} className="bg-cream p-8 rounded-2xl border border-olive/15 space-y-4">
          <h3 className="font-serif text-2xl text-olive uppercase font-light border-b border-olive/15 pb-3">
            BRAND IDENTITY & LOGO
          </h3>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Brand Name</label>
            <input
              type="text"
              value={brand.brandName}
              onChange={(e) => setBrand({ ...brand, brandName: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-serif text-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Main Tagline</label>
            <input
              type="text"
              value={brand.tagline}
              onChange={(e) => setBrand({ ...brand, tagline: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Concept Tagline</label>
            <input
              type="text"
              value={brand.conceptTagline}
              onChange={(e) => setBrand({ ...brand, conceptTagline: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-serif italic text-terracotta"
            />
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Logo URL</label>
            <input
              type="text"
              value={brand.logoUrl}
              onChange={(e) => setBrand({ ...brand, logoUrl: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-mono"
            />
          </div>

          <div className="pt-2">
            <span className="block text-xs font-sans uppercase tracking-wider text-walnut mb-2">Controlled Brand Palette (Read-Only)</span>
            <div className="flex gap-2">
              <div className="p-3 rounded-xl bg-olive text-cream text-[10px] font-mono">#263F32 (Olive)</div>
              <div className="p-3 rounded-xl bg-walnut text-cream text-[10px] font-mono">#5A402B (Walnut)</div>
              <div className="p-3 rounded-xl bg-terracotta text-cream text-[10px] font-mono">#B96F4A (Terracotta)</div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-olive text-cream rounded-xl text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-terracotta transition-colors shadow-lg flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE BRAND SETTINGS</span>
          </button>
        </form>

        {/* SEO Metadata Form */}
        <form onSubmit={handleSaveSeo} className="bg-cream p-8 rounded-2xl border border-olive/15 space-y-4">
          <h3 className="font-serif text-2xl text-olive uppercase font-light border-b border-olive/15 pb-3">
            SEARCH ENGINE OPTIMIZATION (SEO)
          </h3>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Website Meta Title</label>
            <input
              type="text"
              value={seo.siteTitle}
              onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-serif"
            />
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Meta Description</label>
            <textarea
              rows={3}
              value={seo.metaDescription}
              onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Keywords</label>
            <input
              type="text"
              value={seo.keywords}
              onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Open Graph Image (Social Share)</label>
            <input
              type="text"
              value={seo.ogImage}
              onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-mono text-terracotta"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-olive text-cream rounded-xl text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-terracotta transition-colors shadow-lg flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE SEO SETTINGS</span>
          </button>
        </form>

      </div>

    </div>
  );
};
