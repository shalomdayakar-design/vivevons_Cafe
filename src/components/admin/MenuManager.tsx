import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { MenuItem, ItemAvailability } from '../../types';
import { Plus, Edit2, Trash2, Copy, Eye, EyeOff, Search, Sparkles, X, CheckCircle2, AlertTriangle, Image as ImageIcon } from 'lucide-react';

export const MenuManager: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [editingItem, setEditingItem] = useState<Partial<MenuItem>>({
    creativeName: '',
    normalName: '',
    price: '$5.50',
    category: 'coffee',
    description: '',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop',
    availability: 'AVAILABLE',
    isVegetarian: true,
    isSpicy: false,
    isFeatured: false,
  });

  const loadData = () => {
    setItems(db.getAllMenuItemsAdmin());
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
      creativeName: '',
      normalName: '',
      price: '$5.50',
      category: 'coffee',
      description: '',
      image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop',
      availability: 'AVAILABLE',
      isVegetarian: true,
      isSpicy: false,
      isFeatured: false,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.creativeName || !editingItem.normalName || !editingItem.price) {
      alert('Please fill in required fields.');
      return;
    }

    const saved = db.saveMenuItem(editingItem);
    db.logActivity('admin@vivevons.com', 'ADMIN', 'MENU_UPDATE', `Saved menu item: ${saved.creativeName} (${saved.normalName}) - ${saved.price}`);
    setShowModal(false);
    triggerToast(`✓ Menu item "${saved.creativeName}" updated! Public site updated.`);
  };

  const handleToggleAvailability = (id: string, current: ItemAvailability) => {
    const nextState: ItemAvailability =
      current === 'AVAILABLE' ? 'SOLD_OUT' : current === 'SOLD_OUT' ? 'HIDDEN' : 'AVAILABLE';
    db.toggleItemAvailability(id, nextState);
    triggerToast(`✓ Item status changed to ${nextState}`);
  };

  const handleDuplicate = (item: MenuItem) => {
    const dup = db.saveMenuItem({
      ...item,
      id: undefined,
      creativeName: `${item.creativeName} (COPY)`,
      normalName: `${item.normalName} (Copy)`,
    });
    triggerToast(`✓ Duplicated ${dup.creativeName}`);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the menu database?`)) {
      db.deleteMenuItem(id, false);
      db.logActivity('admin@vivevons.com', 'ADMIN', 'MENU_DELETE', `Deleted menu item ID: ${id}`);
      triggerToast(`✓ Deleted "${name}"`);
    }
  };

  const filteredItems = items.filter((item) => {
    if (item.deletedAt) return false;
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      item.creativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.normalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-olive text-cream px-6 py-3 rounded-2xl shadow-2xl border border-terracotta text-xs font-sans font-medium flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-terracotta" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Main Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm">
        <div>
          <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block">MENU DATABASE</span>
          <h2 className="font-serif text-3xl text-olive font-light uppercase">DIGITAL CAFÉ MENU MANAGER</h2>
          <p className="font-sans text-xs text-espresso/70 mt-1">
            Any change made here immediately updates the public website without redeployment.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-6 py-3.5 bg-olive text-cream rounded-xl text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-terracotta transition-colors shadow-lg flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW MENU ITEM</span>
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-cream p-4 rounded-2xl border border-olive/15">
        
        {/* Category Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'coffee', label: 'Coffee' },
            { id: 'tea', label: 'Tea' },
            { id: 'cold-drinks', label: 'Cold Drinks' },
            { id: 'pizzas', label: 'Pizzas' },
            { id: 'burgers', label: 'Burgers' },
            { id: 'pasta', label: 'Pasta' },
            { id: 'snacks', label: 'Snacks' },
            { id: 'signatures', label: 'Signatures' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans tracking-wider uppercase transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-olive text-cream font-semibold'
                  : 'bg-offwhite text-espresso/70 hover:bg-cream-dark'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-olive/40" />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-offwhite border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta font-sans"
          />
        </div>
      </div>

      {/* Menu Table / Cards */}
      <div className="bg-cream rounded-2xl border border-olive/15 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-offwhite border-b border-olive/15 font-mono text-[10px] text-walnut uppercase tracking-widest">
              <tr>
                <th className="py-3.5 px-4">Item Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Availability</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-olive/10">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-offwhite/60 transition-colors">
                  
                  {/* Item Image & Names */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-4">
                      {item.image ? (
                        <img src={item.image} alt={item.creativeName} className="w-12 h-12 rounded-xl object-cover border border-olive/10" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-offwhite border border-olive/10 flex items-center justify-center text-olive/40">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="font-serif text-lg text-olive font-medium uppercase">{item.creativeName}</div>
                        <div className="font-sans text-xs text-walnut font-semibold uppercase">Order as: {item.normalName}</div>
                        <p className="font-sans text-[11px] text-espresso/70 truncate max-w-xs">{item.description}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 font-mono text-[11px] uppercase tracking-wider text-walnut">
                    {item.category}
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4 font-serif text-lg text-terracotta font-medium font-mono">
                    {item.price}
                  </td>

                  {/* Availability Badge & Fast Toggle */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleAvailability(item.id, item.availability)}
                      className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider font-semibold border transition-all ${
                        item.availability === 'AVAILABLE'
                          ? 'bg-olive text-cream border-olive'
                          : item.availability === 'SOLD_OUT'
                          ? 'bg-terracotta text-cream border-terracotta'
                          : 'bg-cream-dark text-espresso border-olive/20'
                      }`}
                    >
                      {item.availability === 'AVAILABLE' ? '✓ AVAILABLE' : item.availability === 'SOLD_OUT' ? '✖ SOLD OUT' : '👁 HIDDEN'}
                    </button>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 rounded-lg bg-offwhite border border-olive/15 text-olive hover:bg-olive hover:text-cream transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDuplicate(item)}
                        className="p-2 rounded-lg bg-offwhite border border-olive/15 text-olive hover:bg-olive hover:text-cream transition-colors"
                        title="Duplicate Item"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id, item.creativeName)}
                        className="p-2 rounded-lg bg-offwhite border border-olive/15 text-terracotta hover:bg-terracotta hover:text-cream transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-offwhite max-w-lg w-full rounded-3xl p-8 border border-olive/20 shadow-2xl relative text-espresso max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-olive/15">
              <div>
                <span className="font-mono text-xs text-terracotta uppercase tracking-widest block">MENU EDITOR</span>
                <h3 className="font-serif text-2xl text-olive uppercase font-light">
                  {editingItem.id ? 'EDIT MENU ITEM' : 'CREATE NEW MENU ITEM'}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full bg-cream text-olive hover:bg-terracotta hover:text-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Creative VIVEVONS Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.creativeName || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, creativeName: e.target.value })}
                  placeholder="e.g. THE FIRST DRAFT"
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta font-sans font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Standard Order Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.normalName || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, normalName: e.target.value })}
                  placeholder="e.g. CAPPUCCINO"
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                    Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.price || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    placeholder="e.g. $5.50 or ₹180"
                    className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs font-mono font-semibold text-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                    Category
                  </label>
                  <select
                    value={editingItem.category || 'coffee'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso font-sans"
                  >
                    <option value="coffee">Coffee</option>
                    <option value="tea">Tea</option>
                    <option value="cold-drinks">Cold Drinks</option>
                    <option value="pizzas">Pizzas</option>
                    <option value="burgers">Burgers</option>
                    <option value="pasta">Pasta</option>
                    <option value="snacks">Snacks</option>
                    <option value="signatures">Signatures</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Availability Status
                </label>
                <select
                  value={editingItem.availability || 'AVAILABLE'}
                  onChange={(e) => setEditingItem({ ...editingItem, availability: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso font-sans"
                >
                  <option value="AVAILABLE">AVAILABLE (Visible & Orderable)</option>
                  <option value="SOLD_OUT">SOLD OUT (Displays SOLD OUT Badge)</option>
                  <option value="HIDDEN">HIDDEN (Hidden from Public Website)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editingItem.image || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Short artisanal description..."
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs text-espresso focus:outline-none focus:border-terracotta font-sans"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-olive text-cream rounded-xl text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-terracotta transition-colors shadow-lg"
                >
                  SAVE & PUBLISH ITEM
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-4 px-6 bg-cream border border-olive/20 text-espresso rounded-xl text-xs font-sans uppercase"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
