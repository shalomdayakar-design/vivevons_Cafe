import React, { useState } from 'react';
import { auth } from '../../lib/auth';
import { AdminUser } from '../../types';
import {
  LayoutDashboard,
  Utensils,
  Image,
  Layers,
  Lightbulb,
  Calendar,
  MapPin,
  Globe,
  Settings,
  Search,
  Users,
  History,
  LogOut,
  ExternalLink,
  Menu as MenuIcon,
  X,
  Sparkles,
  ShieldCheck,
  Eye,
} from 'lucide-react';

interface AdminLayoutProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  currentUser: AdminUser;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onTabChange,
  currentUser,
  children,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'menu', label: 'Menu Management', icon: Utensils },
    { id: 'gallery', label: 'Gallery Manager', icon: Image },
    { id: 'tables', label: 'Five Tables', icon: Layers },
    { id: 'ideas', label: 'Idea Wall', icon: Lightbulb },
    { id: 'reservations', label: 'Reservations', icon: Calendar },
    { id: 'contact', label: 'Contact & Location', icon: MapPin },
    { id: 'website', label: 'Website Content', icon: Globe },
    { id: 'brand', label: 'Brand & SEO', icon: Settings },
    ...(currentUser.role === 'SUPER_ADMIN'
      ? [{ id: 'users', label: 'Users & Roles', icon: Users }]
      : []),
    { id: 'activity', label: 'Activity Log', icon: History },
  ];

  const handleLogout = () => {
    auth.logout();
    window.location.hash = '#admin/login';
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-espresso flex flex-col md:flex-row select-none">
      
      {/* Desktop & Tablet Permanent Left Sidebar */}
      <aside className="w-64 bg-olive text-cream hidden md:flex flex-col justify-between p-6 flex-shrink-0 border-r border-olive-dark shadow-2xl">
        <div className="space-y-8">
          
          {/* Brand Header */}
          <div className="flex items-center space-x-3 pb-6 border-b border-cream/10">
            <div className="w-10 h-10 rounded-full border border-cream/30 overflow-hidden bg-cream/10 flex-shrink-0">
              <img src="/logo.jpg" alt="VIVEVONS Admin Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-xl tracking-widest text-cream uppercase font-light">VIVEVONS</h2>
              <span className="font-mono text-[9px] text-sage tracking-widest block uppercase">CMS CONSOLE</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-sans tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? 'bg-terracotta text-cream font-semibold shadow-md'
                      : 'text-cream/70 hover:bg-cream/10 hover:text-cream'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>

        </div>

        {/* Bottom Profile & Logout Card */}
        <div className="pt-6 border-t border-cream/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center font-mono text-xs text-terracotta">
                {currentUser.fullName.charAt(0)}
              </div>
              <div>
                <p className="font-sans text-xs text-cream font-medium truncate max-w-[120px]">{currentUser.fullName}</p>
                <span className="font-mono text-[9px] text-sage tracking-wider uppercase block">{currentUser.role}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 bg-cream/10 hover:bg-terracotta hover:text-cream rounded-xl text-xs font-sans tracking-widest uppercase transition-colors flex items-center justify-center space-x-2 border border-cream/10 text-cream/80"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-cream border-b border-olive/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="md:hidden p-2 rounded-lg bg-offwhite border border-olive/15 text-olive"
            >
              {mobileDrawerOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>

            <div>
              <span className="font-mono text-[10px] text-walnut uppercase tracking-widest block">ADMINISTRATION</span>
              <h1 className="font-serif text-2xl text-olive font-light tracking-wide uppercase">
                {navItems.find((n) => n.id === currentTab)?.label || 'Dashboard'}
              </h1>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-olive/10 border border-olive/20 text-[11px] font-mono text-olive">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>LIVE DATABASE SYNC</span>
            </div>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '';
              }}
              className="px-4 py-2 bg-olive text-cream rounded-full text-xs font-sans tracking-wider uppercase font-semibold hover:bg-terracotta transition-colors flex items-center space-x-2 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PREVIEW PUBLIC WEBSITE</span>
              <span className="sm:hidden">PUBLIC</span>
            </a>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileDrawerOpen && (
          <div className="md:hidden bg-olive text-cream p-6 border-b border-olive-dark space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-cream/10">
              <span className="font-serif text-lg tracking-widest">VIVEVONS CMS</span>
              <span className="font-mono text-[10px] text-sage">{currentUser.role}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileDrawerOpen(false);
                  }}
                  className={`p-3 rounded-xl text-left text-xs font-sans tracking-wider uppercase transition-colors ${
                    currentTab === item.id ? 'bg-terracotta text-cream' : 'bg-cream/10 text-cream/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Inner Tab View */}
        <main className="p-6 md:p-10 flex-1 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
