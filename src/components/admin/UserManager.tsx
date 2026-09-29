import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { auth } from '../../lib/auth';
import { AdminUser, UserRole } from '../../types';
import { Users, UserPlus, Shield, Sparkles, X, Edit2, Lock } from 'lucide-react';

export const UserManager: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentUser = auth.getCurrentUser();

  const [editingUser, setEditingUser] = useState<Partial<AdminUser>>({
    fullName: '',
    email: '',
    role: 'EDITOR',
  });

  const loadData = () => {
    setUsers(db.getAdminUsers());
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

  if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
    return (
      <div className="bg-cream p-8 rounded-2xl border border-olive/15 text-center space-y-4">
        <Lock className="w-12 h-12 text-terracotta mx-auto" />
        <h3 className="font-serif text-2xl text-olive uppercase">SUPER ADMIN ACCESS REQUIRED</h3>
        <p className="font-sans text-xs text-espresso/70 max-w-md mx-auto">
          User account management is restricted to Super Admin role accounts only.
        </p>
      </div>
    );
  }

  const handleOpenAdd = () => {
    setEditingUser({
      fullName: '',
      email: '',
      role: 'EDITOR',
    });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser.email || !editingUser.fullName) return;

    const saved = db.saveAdminUser(editingUser);
    db.logActivity(currentUser.email, currentUser.role, 'USER_SAVE', `Created/updated admin user: ${saved.email} (${saved.role})`);
    setShowModal(false);
    triggerToast(`✓ Saved user ${saved.email}`);
  };

  const handleToggleStatus = (id: string, email: string) => {
    db.toggleUserStatus(id);
    db.logActivity(currentUser.email, currentUser.role, 'USER_TOGGLE', `Toggled user status for: ${email}`);
    triggerToast(`✓ Account status updated for ${email}`);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm">
        <div>
          <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block">SECURITY & GOVERNANCE</span>
          <h2 className="font-serif text-3xl text-olive font-light uppercase">ADMIN USER MANAGEMENT</h2>
          <p className="font-sans text-xs text-espresso/70 mt-1">
            Super Admin access control: Add administrators, assign roles (Super Admin, Admin, Editor), or deactivate accounts.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-6 py-3.5 bg-olive text-cream rounded-xl text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-terracotta transition-colors shadow-lg flex items-center justify-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>ADD NEW USER</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-cream rounded-2xl border border-olive/15 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-offwhite border-b border-olive/15 font-mono text-[10px] text-walnut uppercase tracking-widest">
            <tr>
              <th className="py-3.5 px-4">User Name</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Role</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Last Login</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-olive/10">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-offwhite/60 transition-colors">
                <td className="py-4 px-4 font-semibold text-espresso">{u.fullName}</td>
                <td className="py-4 px-4 font-mono text-olive">{u.email}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold ${
                      u.role === 'SUPER_ADMIN'
                        ? 'bg-terracotta text-cream'
                        : u.role === 'ADMIN'
                        ? 'bg-olive text-cream'
                        : 'bg-cream-dark text-espresso'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-4 px-4 font-mono text-[11px]">
                  <span className={u.isActive ? 'text-olive font-semibold' : 'text-terracotta font-semibold'}>
                    {u.isActive ? '✓ ACTIVE' : '✖ DISABLED'}
                  </span>
                </td>
                <td className="py-4 px-4 font-mono text-espresso/70">{u.lastLoginAt || 'Never'}</td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => handleToggleStatus(u.id, u.email)}
                    className="px-3 py-1 bg-offwhite border border-olive/15 rounded-lg text-[10px] font-mono uppercase"
                  >
                    {u.isActive ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-offwhite max-w-md w-full rounded-3xl p-8 border border-olive/20 shadow-2xl relative text-espresso">
            <div className="flex justify-between items-start mb-6 pb-3 border-b border-olive/15">
              <div>
                <span className="font-mono text-xs text-terracotta uppercase">SECURITY EDITOR</span>
                <h3 className="font-serif text-2xl text-olive uppercase font-light">ADD ADMIN USER</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full bg-cream text-olive">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingUser.fullName || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={editingUser.email || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  placeholder="sarah@vivevons.com"
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-walnut mb-1">Role Permission</label>
                <select
                  value={editingUser.role || 'EDITOR'}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-olive/20 text-xs font-mono"
                >
                  <option value="EDITOR">EDITOR — Can edit content, menu, and gallery.</option>
                  <option value="ADMIN">ADMIN — Full content, menu, gallery, and reservation access.</option>
                  <option value="SUPER_ADMIN">SUPER ADMIN — Full access + user management & security settings.</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="submit" className="flex-1 py-4 bg-olive text-cream rounded-xl text-xs font-sans uppercase font-semibold">
                  CREATE USER ACCOUNT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
