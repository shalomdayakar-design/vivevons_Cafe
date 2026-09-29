import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { HeroSectionContent, BrandStoryContent, SignatureWallContent, SectionVisibility } from '../../types';
import { Sparkles, Globe, Eye, Check, Save } from 'lucide-react';

export const WebsiteContentManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hero' | 'story' | 'signature' | 'visibility'>('hero');
  const [hero, setHero] = useState<HeroSectionContent>(db.getHeroSection());
  const [story, setStory] = useState<BrandStoryContent>(db.getBrandStorySection());
  const [wall, setWall] = useState<SignatureWallContent>(db.getSignatureWallSection());
  const [visibility, setVisibility] = useState<SectionVisibility>(db.getSectionVisibility());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveHeroSection(hero);
    db.logActivity('admin@vivevons.com', 'ADMIN', 'HERO_UPDATE', 'Updated Hero section copy & background image.');
    triggerToast('✓ Hero Section updated on public website!');
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveBrandStorySection(story);
    db.logActivity('admin@vivevons.com', 'ADMIN', 'STORY_UPDATE', 'Updated Brand Story copy & image.');
    triggerToast('✓ Brand Story section updated!');
  };

  const handleSaveWall = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveSignatureWallSection(wall);
    db.logActivity('admin@vivevons.com', 'ADMIN', 'WALL_UPDATE', 'Updated Signature Wall content.');
    triggerToast('✓ Signature Wall updated!');
  };

  const handleToggleVisibility = (key: keyof SectionVisibility) => {
    const updated = { ...visibility, [key]: !visibility[key] };
    setVisibility(updated);
    db.saveSectionVisibility(updated);
    triggerToast(`✓ Section "${key}" visibility set to ${updated[key] ? 'VISIBLE' : 'HIDDEN'}`);
  };

  return (
    <div className="space-y-6">
      
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-olive text-cream px-6 py-3 rounded-2xl shadow-2xl border border-terracotta text-xs font-sans font-medium flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-terracotta" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm">
        <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block">CONTENT CMS</span>
        <h2 className="font-serif text-3xl text-olive font-light uppercase">WEBSITE CONTENT & SECTION MANAGER</h2>
        <p className="font-sans text-xs text-espresso/70 mt-1">
          Edit homepage hero, brand origin story, signature physical wall notes, or toggle section visibility.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center space-x-2 border-b border-olive/15 pb-2">
        {[
          { id: 'hero', label: 'Hero Section' },
          { id: 'story', label: 'Brand Story' },
          { id: 'signature', label: 'Signature Wall' },
          { id: 'visibility', label: 'Section Visibility (Show/Hide)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans tracking-wider uppercase transition-all ${
              activeTab === tab.id ? 'bg-olive text-cream font-semibold' : 'bg-cream text-espresso/70 hover:bg-cream-dark'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* HERO EDITOR */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="bg-cream p-8 rounded-2xl border border-olive/15 space-y-6">
          <h3 className="font-serif text-2xl text-olive uppercase font-light">HERO SECTION SETTINGS</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Brand Title</label>
              <input
                type="text"
                value={hero.brandTitle}
                onChange={(e) => setHero({ ...hero, brandTitle: e.target.value })}
                className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-serif text-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Main Headline</label>
              <input
                type="text"
                value={hero.headline}
                onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-serif"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Subtitle / Quote</label>
              <input
                type="text"
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-serif italic"
              />
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Hero Description</label>
              <input
                type="text"
                value={hero.description}
                onChange={(e) => setHero({ ...hero, description: e.target.value })}
                className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Hero Background Image URL</label>
            <input
              type="text"
              value={hero.bgImage}
              onChange={(e) => setHero({ ...hero, bgImage: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-mono"
            />
          </div>

          <button type="submit" className="px-8 py-3.5 bg-olive text-cream rounded-xl text-xs font-sans tracking-wider uppercase font-semibold hover:bg-terracotta transition-colors shadow-md flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>SAVE HERO SECTION</span>
          </button>
        </form>
      )}

      {/* BRAND STORY EDITOR */}
      {activeTab === 'story' && (
        <form onSubmit={handleSaveStory} className="bg-cream p-8 rounded-2xl border border-olive/15 space-y-6">
          <h3 className="font-serif text-2xl text-olive uppercase font-light">BRAND STORY SETTINGS</h3>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Story Heading</label>
            <input
              type="text"
              value={story.heading}
              onChange={(e) => setStory({ ...story, heading: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-serif text-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Intro Quote</label>
            <input
              type="text"
              value={story.quote}
              onChange={(e) => setStory({ ...story, quote: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-serif italic"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut">Story Paragraphs</label>
            <textarea
              rows={2}
              value={story.p1}
              onChange={(e) => setStory({ ...story, p1: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs"
            />
            <textarea
              rows={2}
              value={story.p2}
              onChange={(e) => setStory({ ...story, p2: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs"
            />
            <textarea
              rows={2}
              value={story.p3}
              onChange={(e) => setStory({ ...story, p3: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Founder Dedication Quote</label>
            <input
              type="text"
              value={story.founderQuote}
              onChange={(e) => setStory({ ...story, founderQuote: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-serif italic"
            />
          </div>

          <button type="submit" className="px-8 py-3.5 bg-olive text-cream rounded-xl text-xs font-sans tracking-wider uppercase font-semibold hover:bg-terracotta transition-colors shadow-md flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>SAVE BRAND STORY</span>
          </button>
        </form>
      )}

      {/* SIGNATURE WALL EDITOR */}
      {activeTab === 'signature' && (
        <form onSubmit={handleSaveWall} className="bg-cream p-8 rounded-2xl border border-olive/15 space-y-6">
          <h3 className="font-serif text-2xl text-olive uppercase font-light">SIGNATURE PHYSICAL WALL SETTINGS</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Heading Line 1</label>
              <input
                type="text"
                value={wall.headingLine1}
                onChange={(e) => setWall({ ...wall, headingLine1: e.target.value })}
                className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Heading Line 2</label>
              <input
                type="text"
                value={wall.headingLine2}
                onChange={(e) => setWall({ ...wall, headingLine2: e.target.value })}
                className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs font-serif text-terracotta"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Wall Description Subtext</label>
            <textarea
              rows={2}
              value={wall.subtext}
              onChange={(e) => setWall({ ...wall, subtext: e.target.value })}
              className="w-full p-3 rounded-xl bg-offwhite border border-olive/20 text-xs"
            />
          </div>

          <button type="submit" className="px-8 py-3.5 bg-olive text-cream rounded-xl text-xs font-sans tracking-wider uppercase font-semibold hover:bg-terracotta transition-colors shadow-md flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>SAVE SIGNATURE WALL</span>
          </button>
        </form>
      )}

      {/* SECTION VISIBILITY TOGGLES */}
      {activeTab === 'visibility' && (
        <div className="bg-cream p-8 rounded-2xl border border-olive/15 space-y-6">
          <div>
            <h3 className="font-serif text-2xl text-olive uppercase font-light">SECTION VISIBILITY TOGGLES</h3>
            <p className="font-sans text-xs text-espresso/70 mt-1">
              Enable or disable website sections on the public homepage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(visibility).map((key) => {
              const k = key as keyof SectionVisibility;
              const isVis = visibility[k];
              return (
                <div key={key} className="p-4 rounded-xl bg-offwhite border border-olive/15 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-olive font-semibold">{key}</span>
                    <span className="block text-[10px] text-sage font-mono">{isVis ? 'VISIBLE ON HOMEPAGE' : 'HIDDEN FROM HOMEPAGE'}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(k)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-semibold transition-colors ${
                      isVis ? 'bg-olive text-cream' : 'bg-cream-dark text-espresso'
                    }`}
                  >
                    {isVis ? 'ON' : 'OFF'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
