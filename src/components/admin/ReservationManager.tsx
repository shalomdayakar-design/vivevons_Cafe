import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { Reservation, ReservationStatus } from '../../types';
import { Calendar, Search, Filter, CheckCircle, XCircle, Clock, Sparkles, Trash2, Check, UserCheck } from 'lucide-react';

export const ReservationManager: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = () => {
    setReservations(db.getReservations('ALL'));
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

  const handleUpdateStatus = (id: string, status: ReservationStatus) => {
    db.updateReservationStatus(id, status);
    db.logActivity('admin@vivevons.com', 'ADMIN', 'RESERVATION_UPDATE', `Updated booking ${id} to ${status}`);
    triggerToast(`✓ Reservation updated to ${status}`);
  };

  const handleDelete = (id: string, ref: string) => {
    if (confirm(`Delete reservation ${ref}?`)) {
      db.deleteReservation(id);
      triggerToast('✓ Reservation removed.');
    }
  };

  const filtered = reservations.filter((r) => {
    const matchStatus = statusFilter === 'ALL' || r.status === statusFilter;
    const matchQuery =
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery);
    return matchStatus && matchQuery;
  });

  return (
    <div className="space-y-6">
      
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-olive text-cream px-6 py-3 rounded-2xl shadow-2xl border border-terracotta text-xs font-sans font-medium flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-terracotta" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm">
        <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block">HOSPITALITY MANAGEMENT</span>
        <h2 className="font-serif text-3xl text-olive font-light uppercase">RESERVATION MANAGER</h2>
        <p className="font-sans text-xs text-espresso/70 mt-1">
          View, confirm, complete, or cancel table reservations submitted by guests.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-cream p-4 rounded-2xl border border-olive/15">
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          {[
            { id: 'ALL', label: 'All Bookings' },
            { id: 'PENDING', label: 'Pending' },
            { id: 'CONFIRMED', label: 'Confirmed' },
            { id: 'COMPLETED', label: 'Completed' },
            { id: 'CANCELLED', label: 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans tracking-wider uppercase transition-all whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-olive text-cream font-semibold'
                  : 'bg-offwhite text-espresso/70 hover:bg-cream-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-olive/40" />
          <input
            type="text"
            placeholder="Search booking ref or guest..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-offwhite border border-olive/20 text-xs text-espresso"
          />
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-cream rounded-2xl border border-olive/15 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-offwhite border-b border-olive/15 font-mono text-[10px] text-walnut uppercase tracking-widest">
              <tr>
                <th className="py-3.5 px-4">Ref #</th>
                <th className="py-3.5 px-4">Guest Details</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Guests</th>
                <th className="py-3.5 px-4">Table Preference</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-olive/10">
              {filtered.map((res) => (
                <tr key={res.id} className="hover:bg-offwhite/60 transition-colors">
                  <td className="py-4 px-4 font-mono font-medium text-olive">{res.bookingRef}</td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-espresso">{res.customerName}</div>
                    <div className="text-[10px] font-mono text-sage">{res.phone}</div>
                    <div className="text-[10px] text-walnut/70">{res.email}</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-espresso/90">
                    <div>{res.date}</div>
                    <div className="text-[10px] text-terracotta">{res.time}</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-center">{res.guests}</td>
                  <td className="py-4 px-4 font-serif text-sm text-walnut">{res.tablePreference}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold ${
                        res.status === 'CONFIRMED'
                          ? 'bg-olive text-cream'
                          : res.status === 'PENDING'
                          ? 'bg-terracotta text-cream'
                          : res.status === 'COMPLETED'
                          ? 'bg-sage text-cream'
                          : 'bg-cream-dark text-espresso'
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      {res.status !== 'CONFIRMED' && (
                        <button
                          onClick={() => handleUpdateStatus(res.id, 'CONFIRMED')}
                          className="px-2.5 py-1 rounded-lg bg-olive text-cream text-[10px] font-sans uppercase font-semibold"
                        >
                          Confirm
                        </button>
                      )}
                      {res.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleUpdateStatus(res.id, 'COMPLETED')}
                          className="px-2.5 py-1 rounded-lg bg-sage text-cream text-[10px] font-sans uppercase font-semibold"
                        >
                          Complete
                        </button>
                      )}
                      {res.status !== 'CANCELLED' && (
                        <button
                          onClick={() => handleUpdateStatus(res.id, 'CANCELLED')}
                          className="px-2.5 py-1 rounded-lg bg-cream border border-olive/15 text-walnut text-[10px] font-sans uppercase"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(res.id, res.bookingRef)}
                        className="p-1.5 rounded-lg bg-cream border border-olive/15 text-terracotta"
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

    </div>
  );
};
