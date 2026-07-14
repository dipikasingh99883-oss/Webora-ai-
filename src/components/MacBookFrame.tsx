import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export default function MacBookFrame() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Smoothly open the lid after a short delay on mount
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-xl sm:max-w-2xl mx-auto flex flex-col items-center justify-center p-4 select-none">
      {/* 3D Perspective Wrapper */}
      <div 
        className="relative w-full flex flex-col items-center"
        style={{ perspective: '1200px' }}
      >
        {/* ================= LAPTOP LID / SCREEN ================= */}
        <div 
          className="relative w-[90%] aspect-[16/10] rounded-t-xl bg-[#1d1d1f] p-[4px] sm:p-[6px] border border-neutral-700/30 shadow-2xl transition-transform duration-1000 ease-out origin-bottom"
          style={{
            transform: isOpen ? 'rotateX(-10deg)' : 'rotateX(-95deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Bezel inner border */}
          <div className="relative w-full h-full bg-[#0a0a0a] rounded-t-lg p-[1.5%] flex flex-col overflow-hidden">
            
            {/* Webcam & Sensor Dot */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1 z-30">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-900 border border-slate-800"></span>
              <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-blue-900/60"></span>
            </div>

            {/* Screen Reflective Gloss Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10"></div>

            {/* Simulated Live Webora Agency Website Content inside Display */}
            <div 
              className={`w-full h-full flex flex-col justify-between text-left relative overflow-hidden rounded-md transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Outer soft ambient gold screen glow */}
              <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>

              {/* Simulated Website Navbar */}
              <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 flex items-center justify-between border-b border-[#EADBCE]/35 z-10">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Logo size={12} />
                  <span className="font-serif text-[8px] sm:text-[10px] font-bold text-[#312520]">
                    Webora <span className="text-[#C5A86B] font-sans font-extrabold text-[7px] sm:text-[8px]">AI</span>
                  </span>
                </div>
                <button className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-white font-extrabold text-[5px] sm:text-[6px] uppercase tracking-wider shadow-sm hover:brightness-110 active:scale-95 duration-150">
                  Request a Demo
                </button>
              </div>

              {/* Simulated Website Hero Content */}
              <div className="px-3 sm:px-6 py-2 sm:py-3 flex-1 grid grid-cols-12 items-center gap-3 sm:gap-4 z-10 w-full">
                {/* Left Column */}
                <div className="col-span-7 space-y-1 sm:space-y-2 text-left">
                  <div className="space-y-0.5 sm:space-y-1">
                    <h3 className="text-[10px] sm:text-sm md:text-base lg:text-lg font-serif font-black text-[#312520] tracking-tight leading-[1.2]">
                      Elevate Your <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AA7C11] to-[#D4AF37]">Brand Online</span>
                    </h3>
                    <p className="text-[5.5px] sm:text-[7px] md:text-[8px] text-[#5C4C41] font-bold leading-tight">
                      Bespoke Luxury Design. <br /> Ultra-Fast AI Engineering.
                    </p>
                  </div>

                  <div className="flex gap-1 sm:gap-1.5 pt-0.5">
                    <button className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-white font-black text-[4.5px] sm:text-[6px] md:text-[7px] uppercase tracking-widest shadow-sm">
                      Get Started
                    </button>
                    <button className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#EADBCE]/80 text-[#312520] font-bold text-[4.5px] sm:text-[6px] md:text-[7px] uppercase tracking-widest bg-white/80">
                      View Work
                    </button>
                  </div>
                </div>

                {/* Right Column: Growth Card */}
                <div className="col-span-5 relative h-full flex flex-col justify-center items-end pr-1 sm:pr-2">
                  <div className="bg-white/95 backdrop-blur-md border border-[#EADBCE]/50 shadow-md rounded-lg p-1.5 sm:p-2.5 w-full max-w-[100px] sm:max-w-[140px] space-y-1 sm:space-y-1.5">
                    <div className="flex justify-between items-center border-b border-[#EADBCE]/30 pb-0.5 sm:pb-1">
                      <div>
                        <span className="text-[4.5px] sm:text-[6px] font-bold text-[#A29182] uppercase tracking-wider block">Growth</span>
                        <span className="font-serif text-[8px] sm:text-[10px] font-black text-[#312520] leading-none">80%</span>
                      </div>
                      <div className="px-1 py-0.5 bg-[#C5A86B]/10 rounded text-[#AA7C11] font-mono text-[4.5px] sm:text-[6px] font-black leading-none">
                        +32%
                      </div>
                    </div>

                    {/* Exquisite SVG line chart upward trend */}
                    <div className="h-3 sm:h-5 flex items-end">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" fill="none" preserveAspectRatio="none">
                        <path
                          d="M0 25 Q15 22 30 18 T60 12 T100 4"
                          stroke="url(#goldGradient)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M0 25 Q15 22 30 18 T60 12 T100 4 L100 30 L0 30 Z"
                          fill="url(#goldAreaGradient)"
                          opacity="0.12"
                        />
                        <circle cx="100" cy="4" r="2" fill="#AA7C11" />
                        
                        <defs>
                          <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#C5A86B" />
                            <stop offset="100%" stopColor="#AA7C11" />
                          </linearGradient>
                          <linearGradient id="goldAreaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#C5A86B" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <div className="pt-1 border-t border-[#EADBCE]/30 flex items-center gap-1">
                      <div className="flex -space-x-1 shrink-0">
                        <img className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=30&q=80" alt="Avatar 1" />
                        <img className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=30&q=80" alt="Avatar 2" />
                      </div>
                      <div className="leading-none scale-90 origin-left">
                        <span className="text-[4px] sm:text-[5px] text-[#A29182] uppercase tracking-wider block font-bold">Trusted By</span>
                        <span className="text-[4.5px] sm:text-[5.5px] text-[#312520] font-black block">100+ Clients</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulated Footer Badge list */}
              <div className="bg-white/80 backdrop-blur-md px-3 py-1 border-t border-[#EADBCE]/35 flex justify-center gap-3 text-[4.5px] sm:text-[5.5px] text-[#A29182] font-extrabold uppercase tracking-widest z-10">
                <span>★ Trustpilot</span>
                <span>Google Reviews</span>
                <span>Elite Designs</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LAPTOP BASE ================= */}
        {/* Hinge Cylinder */}
        <div className="relative w-[75%] h-2 sm:h-3 bg-[#1c1c1e] rounded-full -mt-1 z-10 border-t border-black/40 shadow-sm"></div>

        {/* Keyboard Base */}
        <div 
          className="relative w-full h-[12px] sm:h-[18px] bg-gradient-to-b from-[#e3d7c5] via-[#cfc1ad] to-[#a89984] rounded-b-[10px] sm:rounded-b-[16px] rounded-t-[3px] border-x border-b border-[#AA7C11]/25 shadow-2xl z-20 flex flex-col items-center"
          style={{
            transform: 'rotateX(15deg) translateY(-2px)',
            boxShadow: '0 12px 28px -4px rgba(53, 41, 34, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15)'
          }}
        >
          {/* Aluminum well shadow */}
          <div className="w-[88%] h-[2px] sm:h-[4px] bg-[#40352F]/20 rounded-b-[2px] border-b border-white/5"></div>

          {/* Precision trackpad indentation */}
          <div className="w-[24%] h-[6px] sm:h-[10px] bg-[#5a4c41]/10 rounded-t-[3px] rounded-b-[2px] border-x border-t border-[#352922]/20 mt-0.5"></div>
        </div>

        {/* Ambient base shadow underneath */}
        <div className="w-[96%] h-3 bg-black/20 blur-md rounded-full -mt-2.5 -z-10"></div>
      </div>
    </div>
  );
}
