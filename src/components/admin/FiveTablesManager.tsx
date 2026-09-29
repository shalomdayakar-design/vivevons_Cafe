import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { TableChapter } from '../../types';
import { Edit2, Sparkles, Layers, Check, X } from 'lucide-react';

export const FiveTablesManager: React.FC = () => {
  const [tables, setTables] = useState<TableChapter[]>([]);
  const [editingTable, setEditingTable] = useState<TableChapter | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = () => {
    setTables(db.getFiveTables());
  };

  useEffect(() => {
    loadData();
    const unsub = db.subscribe(loadData);
    return unsub;
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTable) return;
    db.saveFiveTable(editingTable);
    db.logActivity('admin@vivevons.com', 'ADMIN', 'TABLE_EDIT', `Edited table chapter: ${editingTable.title}`);
    setEditingTable(null);
    triggerToast(`✓ Chapter "${editingTable.title}" updated!`);
  };

  return (
    <div className="space-y-6">
      
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-olive text-cream px-6 py-3 rounded-2xl shadow-2xl border border-terracotta text-xs font-sans font-medium flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-terracotta" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm">
        <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block">SIGNATURE FEATURES</span>
        <h2 className="font-serif text-3xl text-olive font-light uppercase">FIVE TABLES — FIVE CHAPTERS EDITOR</h2>
        <p className="font-sans text-xs text-espresso/70 mt-1">
          Customize descriptions, quotes, ideal-for tags, and imagery for VIVEVONS’ 5 signature sanctuary tables.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tables.map((t) => (
          <div key={t.id} className="bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm flex flex-col md:flex-row gap-6 items-start">
            <img src={t.image} alt={t.title} className="w-full md:w-48 h-36 rounded-xl object-cover border border-olive/10 flex-shrink-0" />
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-3">
                <span className="font-serif text-2xl text-terracotta font-mono">{t.number}</span>
                <h3 className="font-serif text-2xl text-olive uppercase">{t.title}</h3>
              </div>
              <p className="font-serif text-sm italic text-walnut">“{t.quote}”</p>
              <p className="font-sans text-xs text-espresso/80 font-light">{t.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {t.idealFor.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full bg-offwhite border border-olive/10 text-[10px] text-olive font-sans">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setEditingTable(t)}
              className="px-4 py-2 bg-olive text-cream rounded-xl text-xs font-sans tracking-wider uppercase font-semibold hover:bg-terracotta transition-colors flex items-center space-x-2"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>EDIT CHAPTER</span>
            </button>
          </div>
        ))}
      </div>

      {editingTable && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-offwhite max-w-lg w-full rounded-3xl p-8 border border-olive/20 shadow-2xl relative text-espresso max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6 pb-3 border-b border-olive/15">
              <div>
                <span className="font-mono text-xs text-terracotta uppercase block">CHAPTER {editingTable.number}</span>
                <h3 className="font-serif text-2xl text-olive uppercase">{editingTable.title}</h3>
              </div>
              <button onClick={() => setEditingTable(null)} className="p-2 rounded-full bg-cream text-olive">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingTable.subtitle}
                  onChange={(e) => setEditingTable({ ...editingTable, subtitle: e.target.value })}
                  className="w-full p-3 rounded-xl bg-cream border border-olive/20 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Chapter Quote</label>
                <input
                  type="text"
                  value={editingTable.quote}
                  onChange={(e) => setEditingTable({ ...editingTable, quote: e.target.value })}
                  className="w-full p-3 rounded-xl bg-cream border border-olive/20 text-xs font-serif italic"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Description</label>
                <textarea
                  rows={4}
                  value={editingTable.description}
                  onChange={(e) => setEditingTable({ ...editingTable, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-cream border border-olive/20 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingTable.image}
                  onChange={(e) => setEditingTable({ ...editingTable, image: e.target.value })}
                  className="w-full p-3 rounded-xl bg-cream border border-olive/20 text-xs"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="submit" className="flex-1 py-3.5 bg-olive text-cream rounded-xl text-xs font-sans uppercase font-semibold">
                  SAVE CHAPTER CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
