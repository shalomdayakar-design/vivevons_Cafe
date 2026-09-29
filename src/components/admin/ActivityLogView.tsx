import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { ActivityLog } from '../../types';
import { History, Search, ShieldCheck } from 'lucide-react';

export const ActivityLogView: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState('');

  const loadData = () => {
    setLogs(db.getActivityLogs());
  };

  useEffect(() => {
    loadData();
    const unsub = db.subscribe(loadData);
    return unsub;
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.adminEmail.toLowerCase().includes(query.toLowerCase()) ||
      l.action.toLowerCase().includes(query.toLowerCase()) ||
      l.details.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm">
        <div>
          <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block">AUDIT & GOVERNANCE</span>
          <h2 className="font-serif text-3xl text-olive font-light uppercase">SYSTEM ACTIVITY LOG</h2>
          <p className="font-sans text-xs text-espresso/70 mt-1">
            Complete immutable audit log of all administrator operations, content updates, and authentication events.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-olive/40" />
          <input
            type="text"
            placeholder="Search activity logs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-offwhite border border-olive/20 text-xs text-espresso"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-cream rounded-2xl border border-olive/15 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-offwhite border-b border-olive/15 font-mono text-[10px] text-walnut uppercase tracking-widest">
            <tr>
              <th className="py-3.5 px-4">Timestamp</th>
              <th className="py-3.5 px-4">Admin Email</th>
              <th className="py-3.5 px-4">Role</th>
              <th className="py-3.5 px-4">Action</th>
              <th className="py-3.5 px-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-olive/10 font-mono text-[11px]">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-offwhite/60 transition-colors">
                <td className="py-3.5 px-4 text-walnut whitespace-nowrap">{log.timestamp}</td>
                <td className="py-3.5 px-4 text-olive font-semibold">{log.adminEmail}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-cream-dark text-espresso text-[10px]">
                    {log.adminRole}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-sans font-semibold text-espresso">{log.action}</td>
                <td className="py-3.5 px-4 font-sans text-espresso/80">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
