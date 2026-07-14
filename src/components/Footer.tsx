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
    <footer className="bg-[#FAF6F0] border-t border-[#EADBCE]/40 py-16 mt-auto text-left relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Copy Column */}
        <div className="md:col-span-1 space-y-5">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div>
              <span className="font-serif text-md font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] block">
                webora <span className="font-sans font-extrabold">ai</span>
              </span>
              <span className="text-[7px] font-semibold text-[#C5A86B] uppercase tracking-[0.25em] block -mt-1">
                A G E N C Y
              </span>
            </div>
          </div>
          
          <p className="text-xs text-[#5C4C41] leading-relaxed max-w-sm">
            Webora AI combines the speed of state-of-the-art AI systems with luxury, bespoke design systems to launch high-converting, premium websites in 48–72 hours.
          </p>
          
          <div className="text-[10px] text-[#A29182] font-mono">
            &copy; 2026 Webora AI Agency. All Rights Reserved.
          </div>
        </div>

        {/* Contact Info Column */}
        <div className="space-y-4">
          <h5 className="text-[10px] font-bold text-[#AA7C11] uppercase tracking-[0.2em]">Contact Info</h5>
          <ul className="space-y-3 text-xs text-[#5C4C41]">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C5A86B] shrink-0" />
              <span className="font-medium">+91 9028724168</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C5A86B] shrink-0" />
              <span className="font-medium">webora.ai.agency@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C5A86B] shrink-0" />
              <span className="font-medium">India</span>
            </li>
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C5A86B]/10 hover:bg-[#C5A86B]/20 text-[#AA7C11] border border-[#C5A86B]/20 transition-all font-bold text-[10px] uppercase tracking-wide cursor-pointer"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h5 className="text-[10px] font-bold text-[#AA7C11] uppercase tracking-[0.2em]">Quick Links</h5>
          <ul className="space-y-2.5 text-xs text-[#5C4C41] font-medium">
            <li>
              <button 
                onClick={() => handleScrollToSection('home-section')} 
                className="hover:text-[#AA7C11] cursor-pointer transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToSection('services-section')} 
                className="hover:text-[#AA7C11] cursor-pointer transition-colors"
              >
                Services
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToSection('pricing-section')} 
                className="hover:text-[#AA7C11] cursor-pointer transition-colors"
              >
                Pricing
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToSection('process-section')} 
                className="hover:text-[#AA7C11] cursor-pointer transition-colors"
              >
                Process
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScrollToSection('contact-section')} 
                className="hover:text-[#AA7C11] cursor-pointer transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Social / Legal Column */}
        <div className="space-y-4">
          <h5 className="text-[10px] font-bold text-[#AA7C11] uppercase tracking-[0.2em]">Follow Us</h5>
          <ul className="space-y-2.5 text-xs text-[#5C4C41]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              <span>Instagram (Coming soon)</span>
            </li>
          </ul>

          <div className="pt-4 border-t border-[#EADBCE]/40 space-y-2">
            <h5 className="text-[10px] font-bold text-[#AA7C11] uppercase tracking-[0.15em] block">Legal</h5>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-[#A29182]">
              <span className="hover:text-[#312520] cursor-pointer">Terms & Conditions</span>
              <span className="hover:text-[#312520] cursor-pointer">Privacy Policy</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
