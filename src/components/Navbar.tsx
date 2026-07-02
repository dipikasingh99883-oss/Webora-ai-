import { useState } from 'react';
import { ShieldAlert, LogOut, Sparkles, Menu, X, LogIn } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  user: { email: string; displayName: string; photoURL: string; isAdmin: boolean } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onNavigate: (view: 'home' | 'portfolio' | 'templates' | 'dashboard' | 'admin') => void;
  currentView: string;
}

export default function Navbar({ user, onOpenAuth, onLogout, onNavigate, currentView }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle section scrolling
  const handleScrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: 'Home', action: () => handleScrollToSection('home-section') },
    { label: 'Services', action: () => handleScrollToSection('services-section') },
    { label: 'Pricing', action: () => handleScrollToSection('pricing-section') },
    { label: 'Process', action: () => handleScrollToSection('process-section') },
    { label: 'About Us', action: () => handleScrollToSection('about-us-section') },
    { label: 'FAQ', action: () => handleScrollToSection('faq-section') },
    { label: 'Contact', action: () => handleScrollToSection('contact-section') },
  ];

  const handleGetStarted = () => {
    setMobileMenuOpen(false);
    if (user) {
      onNavigate('dashboard');
    } else {
      onOpenAuth();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-gray-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Custom matching W layout in mockup */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
        >
          <Logo size={40} className="group-hover:scale-105 transition-all" />
          <div>
            <span className="text-md font-extrabold tracking-tight text-white block">WEBORA <span className="text-blue-400">AI</span></span>
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block -mt-0.5">SaaS Web Agency</span>
          </div>
        </button>

        {/* Desktop Links (Smooth scroll or navigate) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold text-gray-400">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider"
            >
              {item.label}
            </button>
          ))}
          
          {/* Active view additions */}
          <button
            onClick={() => onNavigate('portfolio')}
            className={`font-semibold hover:text-white uppercase tracking-wider transition-colors cursor-pointer ${
              currentView === 'portfolio' ? 'text-blue-400' : ''
            }`}
          >
            Showcase
          </button>
          
          <button
            onClick={() => onNavigate('templates')}
            className={`font-semibold hover:text-white uppercase tracking-wider transition-colors cursor-pointer ${
              currentView === 'templates' ? 'text-blue-400' : ''
            }`}
          >
            Templates
          </button>

          {user && !user.isAdmin && (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`font-bold uppercase tracking-widest text-[10px] px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 transition-colors cursor-pointer ${
                currentView === 'dashboard' ? 'bg-blue-600 text-white' : ''
              }`}
            >
              Workspace
            </button>
          )}

          {user && user.isAdmin && (
            <button
              onClick={() => onNavigate('admin')}
              className={`font-bold flex items-center gap-1 uppercase tracking-widest text-[10px] px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 transition-colors cursor-pointer ${
                currentView === 'admin' ? 'bg-cyan-600 text-white' : ''
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Admin</span>
            </button>
          )}
        </nav>

        {/* CTA Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 bg-gray-900/60 border border-gray-800 p-1.5 pr-3 rounded-2xl relative group">
              <img
                referrerPolicy="no-referrer"
                src={user.photoURL}
                alt={user.displayName}
                className="w-8 h-8 rounded-xl object-cover"
              />
              <div className="text-left">
                <span className="text-[10px] font-bold text-white block max-w-[90px] truncate">{user.displayName}</span>
                <span className="text-[8px] font-semibold text-gray-500 block uppercase tracking-wider">
                  {user.isAdmin ? 'Admin Staff' : 'Client User'}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="text-gray-400 hover:text-red-400 p-1 rounded-lg hover:bg-gray-850 transition-colors ml-1 cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleGetStarted}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Get Your Website
            </button>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex lg:hidden items-center gap-3">
          {!user && (
            <button
              onClick={onOpenAuth}
              className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-blue-400"
              title="Sign In"
            >
              <LogIn className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-gray-900 border border-gray-850 text-gray-300 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-900 bg-gray-950/95 backdrop-blur-xl absolute top-full left-0 w-full p-6 space-y-4 shadow-2xl z-50">
          <div className="flex flex-col gap-3 text-left">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="py-2 text-sm font-bold text-gray-300 hover:text-white border-b border-gray-900/40 text-left"
              >
                {item.label}
              </button>
            ))}
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('portfolio');
              }}
              className="py-2 text-sm font-bold text-gray-300 hover:text-white border-b border-gray-900/40 text-left"
            >
              Showcase Portfolio
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('templates');
              }}
              className="py-2 text-sm font-bold text-gray-300 hover:text-white border-b border-gray-900/40 text-left"
            >
              Templates
            </button>

            {user && (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(user.isAdmin ? 'admin' : 'dashboard');
                  }}
                  className="py-2 text-sm font-bold text-cyan-400 border-b border-gray-900/40 text-left"
                >
                  {user.isAdmin ? 'Admin Dashboard' : 'My Workspace'}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="py-2 text-sm font-bold text-red-400 text-left"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

          {!user && (
            <button
              onClick={handleGetStarted}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider text-center block"
            >
              Get Started
            </button>
          )}
        </div>
      )}
    </header>
  );
}
