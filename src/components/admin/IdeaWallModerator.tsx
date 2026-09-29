import React, { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { IdeaNote, IdeaStatus } from '../../types';
import { CheckCircle2, EyeOff, Trash2, Sparkles, Filter, Heart } from 'lucide-react';

export const IdeaWallModerator: React.FC = () => {
  const [ideas, setIdeas] = useState<IdeaNote[]>([]);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'HIDDEN'>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = () => {
    setIdeas(db.getIdeas('ALL'));
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

  const handleUpdateStatus = (id: string, status: IdeaStatus) => {
    db.updateIdeaStatus(id, status);
    db.logActivity('admin@vivevons.com', 'ADMIN', 'IDEA_MODERATE', `Changed idea ${id} status to ${status}`);
    triggerToast(`✓ Idea status updated to ${status}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this user idea note permanently?')) {
      db.deleteIdea(id);
      triggerToast('✓ Idea deleted.');
    }
  };

  const filteredIdeas = ideas.filter(
    (i) => statusFilter === 'ALL' || i.status === statusFilter
  );

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
        <span className="font-mono text-[10px] text-terracotta uppercase tracking-widest block">COMMUNITY BOARD MODERATION</span>
        <h2 className="font-serif text-3xl text-olive font-light uppercase">IDEA WALL MODERATOR</h2>
        <p className="font-sans text-xs text-espresso/70 mt-1">
          Review, approve, hide, or delete user-submitted ideas. Only APPROVED ideas display publicly.
        </p>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center space-x-2 bg-cream p-4 rounded-2xl border border-olive/15">
        <Filter className="w-4 h-4 text-olive/40 mr-1" />
        {[
          { id: 'ALL', label: 'All Submissions' },
          { id: 'PENDING', label: 'Pending Approval' },
          { id: 'APPROVED', label: 'Approved & Live' },
          { id: 'HIDDEN', label: 'Hidden' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-sans tracking-wider uppercase transition-all ${
              statusFilter === tab.id
                ? 'bg-olive text-cream font-semibold'
                : 'bg-offwhite text-espresso/70 hover:bg-cream-dark'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Idea Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <div key={idea.id} className="bg-cream p-6 rounded-2xl border border-olive/15 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center pb-2 border-b border-olive/10 text-[10px] font-mono text-walnut uppercase">
                <span>{idea.category}</span>
                <span
                  className={`px-2 py-0.5 rounded ${
                    idea.status === 'APPROVED'
                      ? 'bg-olive text-cream'
                      : idea.status === 'PENDING'
                      ? 'bg-terracotta text-cream'
                      : 'bg-cream-dark text-espresso'
                  }`}
                >
                  {idea.status}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-olive font-light mt-3">{idea.title}</h3>
              <p className="font-sans text-xs text-espresso/80 mt-2 font-light">“{idea.message}”</p>
            </div>

            <div className="pt-4 border-t border-olive/10 flex items-center justify-between">
              <div>
                <span className="font-sans text-xs font-semibold text-espresso block">— {idea.author}</span>
                <span className="font-mono text-[10px] text-sage">{idea.createdAt}</span>
              </div>

              <div className="flex space-x-1.5">
                {idea.status !== 'APPROVED' && (
                  <button
                    onClick={() => handleUpdateStatus(idea.id, 'APPROVED')}
                    className="p-2 rounded-lg bg-olive text-cream hover:bg-terracotta transition-colors"
                    title="Approve Idea"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}

                {idea.status !== 'HIDDEN' && (
                  <button
                    onClick={() => handleUpdateStatus(idea.id, 'HIDDEN')}
                    className="p-2 rounded-lg bg-offwhite text-walnut hover:bg-cream-dark transition-colors border border-olive/15"
                    title="Hide Idea"
                  >
                    <EyeOff className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(idea.id)}
                  className="p-2 rounded-lg bg-offwhite text-terracotta hover:bg-terracotta hover:text-cream transition-colors border border-olive/15"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
