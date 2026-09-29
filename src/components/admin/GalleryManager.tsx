import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { GalleryItem } from '../../types';
import { UploadCloud, Trash2, Edit2, Plus, Sparkles, X, Check, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';

export const GalleryManager: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [editingItem, setEditingItem] = useState<Partial<GalleryItem>>({
    title: '',
    caption: '',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    isPublished: true,
  });

  const loadData = () => {
    setGallery(db.getGalleryImages(false));
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

  const handleOpenAdd = () => {
    setEditingItem({
      title: '',
      caption: '',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
      isPublished: true,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.title || !editingItem.image) return;

    const saved = db.saveGalleryImage(editingItem);
    db.logActivity('admin@vivevons.com', 'ADMIN', 'GALLERY_UPLOAD', `Uploaded/edited photo: ${saved.title}`);
    setShowModal(false);
    triggerToast(`✓ Gallery photo "${saved.title}" saved!`);
  };

  const handleTogglePublish = (item: GalleryItem) => {
    db.saveGalleryImage({ ...item, isPublished: !item.isPublished });
    triggerToast(`✓ Photo ${!item.isPublished ? 'Published' : 'Unpublished'}`);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}" from the gallery?`)) {
      db.deleteGalleryImage(id);
      db.logActivity('admin@vivevons.com', 'ADMIN', 'GALLERY_DELETE', `Deleted photo ID: ${id}`);
      triggerToast(`✓ Deleted photo`);
    }
  };

  const filteredGallery = gallery.filter(
    (g) => selectedCat === 'all' || g.category === selectedCat
  );

  return (
    <div className="space-y-6">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-olive text-cream px-6 py-3 rounded-2xl shadow-2xl border border-terracotta text-xs font-sans font-medium flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-terracotta" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm">
        <div>
          <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block">MEDIA ARCHIVE</span>
          <h2 className="font-serif text-3xl text-olive font-light uppercase">GALLERY & PHOTO MANAGER</h2>
          <p className="font-sans text-xs text-espresso/70 mt-1">
            Upload, categorize, caption, and order high-resolution café photos.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-6 py-3.5 bg-olive text-cream rounded-xl text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-terracotta transition-colors shadow-lg flex items-center justify-center space-x-2"
        >
          <UploadCloud className="w-4 h-4" />
          <span>UPLOAD NEW PHOTO</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar bg-cream p-4 rounded-2xl border border-olive/15">
        {[
          { id: 'all', label: 'All Photos' },
          { id: 'interior', label: 'Interior' },
          { id: 'coffee', label: 'Coffee' },
          { id: 'food', label: 'Food' },
          { id: 'tables', label: 'Tables' },
          { id: 'details', label: 'Details' },
          { id: 'people', label: 'People' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-4 py-2 rounded-lg text-xs font-sans tracking-wider uppercase transition-all whitespace-nowrap ${
              selectedCat === cat.id
                ? 'bg-olive text-cream font-semibold'
                : 'bg-offwhite text-espresso/70 hover:bg-cream-dark'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            className="bg-cream rounded-2xl border border-olive/15 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all"
          >
            <div className="h-48 relative overflow-hidden bg-offwhite">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-olive/80 backdrop-blur-md text-cream text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
                {item.category}
              </span>
              {!item.isPublished && (
                <span className="absolute top-3 right-3 bg-terracotta text-cream text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
                  UNPUBLISHED
                </span>
              )}
            </div>

            <div className="p-5 space-y-2">
              <h3 className="font-serif text-xl font-light text-olive uppercase">{item.title}</h3>
              <p className="font-sans text-xs text-espresso/70 font-light">{item.caption || 'No caption added.'}</p>
            </div>

            <div className="p-4 border-t border-olive/10 bg-offwhite/50 flex items-center justify-between">
              <button
                onClick={() => handleTogglePublish(item)}
                className={`text-[11px] font-mono uppercase tracking-wider flex items-center space-x-1 ${
                  item.isPublished ? 'text-olive' : 'text-terracotta'
                }`}
              >
                {item.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{item.isPublished ? 'Published' : 'Draft'}</span>
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-lg bg-cream border border-olive/15 text-olive hover:bg-olive hover:text-cream transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-2 rounded-lg bg-cream border border-olive/15 text-terracotta hover:bg-terracotta hover:text-cream transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-offwhite max-w-md w-full rounded-3xl p-8 border border-olive/20 shadow-2xl relative text-espresso">
            <div className="flex justify-between items-start mb-6 pb-3 border-b border-olive/15">
              <div>
                <span className="font-mono text-xs text-terracotta uppercase tracking-widest block">MEDIA EDITOR</span>
                <h3 className="font-serif text-2xl text-olive uppercase font-light">
                  {editingItem.id ? 'EDIT PHOTO DETAILS' : 'UPLOAD PHOTO'}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full bg-cream text-olive">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Warm Sanctuary Light"
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Image URL / File Path *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.image || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Category
                </label>
                <select
                  value={editingItem.category || 'interior'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso"
                >
                  <option value="interior">Interior</option>
                  <option value="coffee">Specialty Coffee</option>
                  <option value="food">Gourmet Dishes</option>
                  <option value="tables">Chapter Tables</option>
                  <option value="details">Details</option>
                  <option value="people">People & Vibes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={3}
                  value={editingItem.caption || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  placeholder="Atmospheric caption..."
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-olive text-cream rounded-xl text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-terracotta transition-colors shadow-lg"
                >
                  SAVE & PUBLISH PHOTO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
