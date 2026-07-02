import { Sparkles, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (view: 'home' | 'portfolio' | 'templates' | 'dashboard' | 'admin') => void;
  currentView: string;
}

export default function Footer({ onNavigate, currentView }: FooterProps) {
  const whatsappUrl = "https://wa.me/919028724168?text=Hello%20Webora%20AI%20Team,%20I%20am%20interested%20in%20building%20a%20website!";

  // Handle scrolling to a specific element on the home page or navigating to home and scrolling
  const handleScrollToSection = (id: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#070A12]/90 border-t border-gray-900/80 py-16 mt-auto text-left relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Copy Column */}
        <div className="md:col-span-1.5 space-y-5">
          <div className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="text-md font-extrabold tracking-tight text-white block">WEBORA <span className="text-blue-400">AI</span></span>
          </div>
          
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            Webora AI combines the speed of state-of-the-art AI code assistants with expert design systems to launch high-converting, responsive websites in 48–72 hours.
          </p>
          
          <div className="text-[10px] text-gray-500 font-mono">
            &copy; 2024 Webora AI. All Rights Reserved.
          </div>
        </div>

        {/* Contact Info Column */}
        <div className="space-y-4">
          <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact Info</h5>
          <ul className="space-y-3 text-xs text-gray-400">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>+91 9028724168</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>webora.ai.agency@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>India</span>
            </li>
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/10 transition-colors font-bold text-[10px] uppercase tracking-wide cursor-pointer"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quick Links</h5>
          <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
            <li>
              <button 
                onClick={() => handleScrollToSection('home-section')} 
                className="hover:text-blue-400 cursor-pointer transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToSection('services-section')} 
                className="hover:text-blue-400 cursor-pointer transition-colors"
              >
                Services
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToSection('pricing-section')} 
                className="hover:text-blue-400 cursor-pointer transition-colors"
              >
                Pricing
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToSection('process-section')} 
                className="hover:text-blue-400 cursor-pointer transition-colors"
              >
                Process
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToSection('contact-section')} 
                className="hover:text-blue-400 cursor-pointer transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Social / Legal Column */}
        <div className="space-y-4">
          <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Follow Us</h5>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-center gap-1.5 text-gray-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-500"></span>
              <span>Instagram (Coming soon)</span>
            </li>
          </ul>

          <div className="pt-4 border-t border-gray-900/60 space-y-2">
            <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Legal</h5>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-500">
              <span className="hover:text-gray-300 cursor-pointer">Terms & Conditions</span>
              <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
