import { useState } from 'react';
import { ShieldAlert, LogOut, Menu, X, LogIn } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full glass border-b border-[#EADBCE]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Interlocking W layout with Premium Editorial style */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
        >
          <Logo size={42} className="group-hover:scale-105 transition-all" />
          <div className="hidden sm:block">
            <span className="font-serif text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] block">
              webora <span className="font-sans font-extrabold">ai</span>
            </span>
            <span className="text-[7.5px] font-semibold text-[#C5A86B] uppercase tracking-[0.25em] block -mt-1">
              A G E N C Y
            </span>
          </div>
        </button>

        {/* Desktop Links (Smooth scroll or navigate) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold text-[#5C4C41]">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="hover:text-[#1B120E] transition-colors cursor-pointer uppercase tracking-wider text-[11px]"
            >
              {item.label}
            </button>
          ))}
          
          {/* Active view additions */}
          <button
            onClick={() => onNavigate('portfolio')}
            className={`font-semibold hover:text-[#1B120E] uppercase tracking-wider transition-colors cursor-pointer text-[11px] ${
              currentView === 'portfolio' ? 'text-[#C5A86B] font-bold' : ''
            }`}
          >
            Showcase
          </button>
          
          <button
            onClick={() => onNavigate('templates')}
            className={`font-semibold hover:text-[#1B120E] uppercase tracking-wider transition-colors cursor-pointer text-[11px] ${
              currentView === 'templates' ? 'text-[#C5A86B] font-bold' : ''
            }`}
          >
            Templates
          </button>

          {user && !user.isAdmin && (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`font-bold uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-lg bg-[#C5A86B]/10 border border-[#C5A86B]/20 text-[#AA7C11] transition-colors cursor-pointer ${
                currentView === 'dashboard' ? 'bg-[#C5A86B] text-white' : ''
              }`}
            >
              Workspace
            </button>
          )}

          {user && user.isAdmin && (
            <button
              onClick={() => onNavigate('admin')}
              className={`font-bold flex items-center gap-1 uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-lg bg-[#C5A86B]/15 border border-[#C5A86B]/35 text-[#AA7C11] transition-colors cursor-pointer ${
                currentView === 'admin' ? 'bg-[#C5A86B] text-white' : ''
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
            <div className="flex items-center gap-3 bg-white/60 border border-[#EADBCE] p-1.5 pr-3 rounded-2xl relative group">
              <img
                referrerPolicy="no-referrer"
                src={user.photoURL}
                alt={user.displayName}
                className="w-8 h-8 rounded-xl object-cover border border-[#EADBCE]/50"
              />
              <div className="text-left">
                <span className="text-[10px] font-bold text-[#312520] block max-w-[90px] truncate">{user.displayName}</span>
                <span className="text-[8px] font-semibold text-[#C5A86B] block uppercase tracking-wider">
                  {user.isAdmin ? 'Admin Staff' : 'Client User'}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-[#FAF6F0] transition-colors ml-1 cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleGetStarted}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C483] to-[#AA7C11] hover:from-[#E5C483] hover:to-[#8C6207] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#AA7C11]/10 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border border-[#AA7C11]/30"
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
              className="p-2 rounded-xl bg-white border border-[#EADBCE] text-[#C5A86B]"
              title="Sign In"
            >
              <LogIn className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white border border-[#EADBCE] text-[#312520] focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EADBCE] bg-[#FAF6F0]/95 backdrop-blur-xl absolute top-full left-0 w-full p-6 space-y-4 shadow-2xl z-50">
          <div className="flex flex-col gap-3 text-left">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="py-2.5 text-sm font-bold text-[#5C4C41] hover:text-[#1B120E] border-b border-[#EADBCE]/30 text-left"
              >
                {item.label}
              </button>
            ))}
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('portfolio');
              }}
              className="py-2.5 text-sm font-bold text-[#5C4C41] hover:text-[#1B120E] border-b border-[#EADBCE]/30 text-left"
            >
              Showcase Portfolio
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('templates');
              }}
              className="py-2.5 text-sm font-bold text-[#5C4C41] hover:text-[#1B120E] border-b border-[#EADBCE]/30 text-left"
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
                  className="py-2.5 text-sm font-bold text-[#AA7C11] border-b border-[#EADBCE]/30 text-left"
                >
                  {user.isAdmin ? 'Admin Dashboard' : 'My Workspace'}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="py-2.5 text-sm font-bold text-red-500 text-left"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

          {!user && (
            <button
              onClick={handleGetStarted}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-white font-bold text-xs uppercase tracking-wider text-center block"
            >
              Get Started
            </button>
          )}
        </div>
      )}
    </header>
  );
}
