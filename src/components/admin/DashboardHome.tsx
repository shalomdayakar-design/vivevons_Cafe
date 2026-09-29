import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { Utensils, Image, Calendar, Lightbulb, Activity, CheckCircle, Clock, ArrowUpRight, Plus, ExternalLink } from 'lucide-react';

interface DashboardHomeProps {
  onNavigate: (tab: string) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    menuCount: 0,
    galleryCount: 0,
    reservationCount: 0,
    ideaCount: 0,
    pendingIdeas: 0,
    pendingReservations: 0,
  });

  const [recentReservations, setRecentReservations] = useState<any[]>([]);
  const [recentIdeas, setRecentIdeas] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);

  useEffect(() => {
    const refresh = () => {
      const menu = db.getMenuItems(true);
      const gallery = db.getGalleryImages(false);
      const res = db.getReservations('ALL');
      const ideas = db.getIdeas('ALL');
      const logs = db.getActivityLogs();

      setStats({
        menuCount: menu.length,
        galleryCount: gallery.length,
        reservationCount: res.length,
        ideaCount: ideas.length,
        pendingIdeas: ideas.filter((i) => i.status === 'PENDING').length,
        pendingReservations: res.filter((r) => r.status === 'PENDING').length,
      });

      setRecentReservations(res.slice(0, 5));
      setRecentIdeas(ideas.slice(0, 5));
      setActivityLogs(logs.slice(0, 5));
    };

    refresh();
    const unsub = db.subscribe(refresh);
    return unsub;
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Metric 1: Menu Items */}
        <div
          onClick={() => onNavigate('menu')}
          className="bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-[10px] text-walnut uppercase tracking-widest">MENU CREATIONS</span>
            <div className="p-2 rounded-xl bg-olive text-cream group-hover:bg-terracotta transition-colors">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-3xl font-light text-olive font-mono">{stats.menuCount}</h3>
          <p className="font-sans text-[11px] text-sage mt-1">Active recipes in database</p>
        </div>

        {/* Metric 2: Gallery Photos */}
        <div
          onClick={() => onNavigate('gallery')}
          className="bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-[10px] text-walnut uppercase tracking-widest">GALLERY PHOTOS</span>
            <div className="p-2 rounded-xl bg-olive text-cream group-hover:bg-terracotta transition-colors">
              <Image className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-3xl font-light text-olive font-mono">{stats.galleryCount}</h3>
          <p className="font-sans text-[11px] text-sage mt-1">Editorial images uploaded</p>
        </div>

        {/* Metric 3: Reservations */}
        <div
          onClick={() => onNavigate('reservations')}
          className="bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-[10px] text-walnut uppercase tracking-widest">RESERVATIONS</span>
            <div className="p-2 rounded-xl bg-olive text-cream group-hover:bg-terracotta transition-colors">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="font-serif text-3xl font-light text-olive font-mono">{stats.reservationCount}</h3>
            {stats.pendingReservations > 0 && (
              <span className="text-xs text-terracotta font-mono font-semibold">({stats.pendingReservations} New)</span>
            )}
          </div>
          <p className="font-sans text-[11px] text-sage mt-1">Table bookings registered</p>
        </div>

        {/* Metric 4: Idea Posts */}
        <div
          onClick={() => onNavigate('ideas')}
          className="bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-[10px] text-walnut uppercase tracking-widest">COMMUNITY IDEAS</span>
            <div className="p-2 rounded-xl bg-olive text-cream group-hover:bg-terracotta transition-colors">
              <Lightbulb className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="font-serif text-3xl font-light text-olive font-mono">{stats.ideaCount}</h3>
            {stats.pendingIdeas > 0 && (
              <span className="text-xs text-terracotta font-mono font-semibold">({stats.pendingIdeas} Pending)</span>
            )}
          </div>
          <p className="font-sans text-[11px] text-sage mt-1">Submitted user sparks</p>
        </div>

        {/* Metric 5: Website Status */}
        <div className="bg-olive text-cream p-6 rounded-2xl border border-olive-dark shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="font-mono text-[10px] text-sage uppercase tracking-widest">WEBSITE STATUS</span>
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <h3 className="font-serif text-3xl font-light text-cream font-mono">LIVE</h3>
          <p className="font-sans text-[11px] text-sage mt-1">Database sync active</p>
        </div>

      </div>

      {/* Quick Actions Bar */}
      <div className="bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl text-olive font-medium uppercase">QUICK CMS ACTIONS</h3>
          <p className="font-sans text-xs text-espresso/70">Common management tasks performed in seconds</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('menu')}
            className="px-4 py-2.5 bg-olive text-cream rounded-xl text-xs font-sans tracking-wider uppercase font-semibold hover:bg-terracotta transition-colors flex items-center space-x-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD MENU ITEM</span>
          </button>

          <button
            onClick={() => onNavigate('gallery')}
            className="px-4 py-2.5 bg-cream/80 border border-olive/20 text-olive rounded-xl text-xs font-sans tracking-wider uppercase font-semibold hover:bg-olive hover:text-cream transition-colors flex items-center space-x-2"
          >
            <Image className="w-3.5 h-3.5" />
            <span>UPLOAD GALLERY PHOTO</span>
          </button>

          <button
            onClick={() => onNavigate('ideas')}
            className="px-4 py-2.5 bg-cream/80 border border-olive/20 text-olive rounded-xl text-xs font-sans tracking-wider uppercase font-semibold hover:bg-olive hover:text-cream transition-colors flex items-center space-x-2"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>MODERATE IDEAS ({stats.pendingIdeas})</span>
          </button>
        </div>
      </div>

      {/* Grid: Recent Reservations & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Reservations Table */}
        <div className="lg:col-span-7 bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-olive/10">
            <div>
              <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block">TABLE BOOKINGS</span>
              <h3 className="font-serif text-xl text-olive font-light uppercase">RECENT RESERVATIONS</h3>
            </div>

            <button
              onClick={() => onNavigate('reservations')}
              className="text-xs font-mono uppercase tracking-widest text-olive hover:text-terracotta flex items-center space-x-1"
            >
              <span>VIEW ALL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="border-b border-olive/10 font-mono text-[10px] text-walnut uppercase tracking-widest">
                <tr>
                  <th className="py-2.5 px-3">Ref #</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Date & Time</th>
                  <th className="py-2.5 px-3">Guests</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-olive/5">
                {recentReservations.map((r) => (
                  <tr key={r.id} className="hover:bg-offwhite/50">
                    <td className="py-3 px-3 font-mono font-medium text-olive">{r.bookingRef}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-espresso">{r.customerName}</div>
                      <div className="text-[10px] text-sage">{r.phone}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-espresso/80">{r.date} at {r.time}</td>
                    <td className="py-3 px-3 font-mono">{r.guests}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                          r.status === 'CONFIRMED'
                            ? 'bg-olive text-cream'
                            : r.status === 'PENDING'
                            ? 'bg-terracotta text-cream'
                            : 'bg-cream-dark text-espresso'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Activity Log */}
        <div className="lg:col-span-5 bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-olive/10">
            <div>
              <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block">AUDIT TRAIL</span>
              <h3 className="font-serif text-xl text-olive font-light uppercase">RECENT CMS ACTIVITY</h3>
            </div>

            <button
              onClick={() => onNavigate('activity')}
              className="text-xs font-mono uppercase tracking-widest text-olive hover:text-terracotta flex items-center space-x-1"
            >
              <span>FULL LOG</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activityLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-xl bg-offwhite border border-olive/10 space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-walnut">
                  <span className="font-semibold text-olive">{log.adminEmail}</span>
                  <span>{log.timestamp}</span>
                </div>
                <p className="font-sans text-xs text-espresso font-medium">{log.action}</p>
                <p className="font-sans text-[11px] text-espresso/70 font-light">{log.details}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
