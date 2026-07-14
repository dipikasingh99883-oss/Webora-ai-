import React, { useState, useEffect, useRef } from 'react';
import { Template } from '../types';
import { WEBSITE_TEMPLATES } from '../data';
import { ChevronLeft, ChevronRight, CheckCircle2, Sliders } from 'lucide-react';

interface TemplateCarouselProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
}

export default function TemplateCarousel({ templates, onSelectTemplate }: TemplateCarouselProps) {
  // Use loaded templates if available, otherwise fallback to static website templates
  const list = templates && templates.length > 0 
    ? templates.filter(t => (t.status || 'Active') === 'Active')
    : WEBSITE_TEMPLATES;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = list.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isHovered || total <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500); // Rotate every 4.5s
    return () => clearInterval(interval);
  }, [isHovered, total]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Click direct card to slide to it
  const handleCardClick = (idx: number, offset: number) => {
    if (offset === 0) return; // Clicking active card does nothing or open customizer
    setActiveIndex(idx);
  };

  // Swipe gesture for mobile friendliness
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div 
      className="relative w-full overflow-hidden py-10 select-none flex flex-col items-center justify-center scroll-mt-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      id="template-carousel-section"
    >
      {/* 3D Perspective Container */}
      <div 
        className="relative w-full max-w-5xl h-[460px] flex items-center justify-center"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {list.map((template, idx) => {
          // Compute shortest angular offset on 160 degree circle
          let offset = idx - activeIndex;
          if (offset < -total / 2) offset += total;
          if (offset > total / 2) offset -= total;

          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          // Responsive spacing based on device viewport
          const xOffsetDesktop = offset * 260; // Spacing for large screens
          const xOffsetMobile = offset * 110;  // Spacing for mobile (preventing white side overflow)

          // 3D rotations and scale factors
          const rotateY = -offset * 25;
          const zTranslation = -Math.abs(offset) * 110;
          const scale = isActive ? 1.05 : 0.82;
          const opacity = isActive ? 1 : Math.abs(offset) === 1 ? 0.68 : 0.28;
          const zIndex = 30 - Math.abs(offset) * 10;

          return (
            <div
              key={template.id}
              onClick={() => handleCardClick(idx, offset)}
              className={`absolute w-[290px] sm:w-[350px] aspect-[4/5] rounded-3xl p-6 glass transition-all duration-[800ms] ease-out flex flex-col justify-between cursor-pointer ${
                isActive 
                  ? 'border-[#C5A86B]/40 shadow-2xl shadow-[#352922]/10 ring-1 ring-[#C5A86B]/25' 
                  : 'border-[#EADBCE]/10'
              }`}
              style={{
                zIndex,
                opacity,
                transform: `translateX(var(--x-pos)) translateZ(${zTranslation}px) rotateY(${rotateY}deg) scale(${scale})`,
                transformStyle: 'preserve-3d',
                '--x-pos': `${isMobile ? xOffsetMobile : xOffsetDesktop}px`,
                pointerEvents: isHovered && !isActive && Math.abs(offset) > 1 ? 'none' : 'auto'
              } as React.CSSProperties}
            >
              {/* Card Body - Content & Images */}
              <div className="space-y-4">
                {/* Template Visual Cover */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#EADBCE]/30">
                  <img
                    referrerPolicy="no-referrer"
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#312520]/80 backdrop-blur-md text-[8px] font-black uppercase text-[#C5A86B] tracking-wider border border-[#C5A86B]/20">
                    {template.category}
                  </div>
                </div>

                {/* Typography Metadata */}
                <div className="text-left space-y-1.5">
                  <h4 className="font-serif text-lg font-bold text-[#312520] flex items-center justify-between">
                    <span>{template.name}</span>
                    <span className="text-[10px] font-bold text-[#AA7C11] font-mono bg-[#C5A86B]/10 px-2 py-0.5 rounded-md">
                      {template.complexity}
                    </span>
                  </h4>
                  <p className="text-[11px] text-[#5C4C41] leading-relaxed line-clamp-2 h-8">
                    {template.description}
                  </p>
                </div>

                {/* Bullet Specifications */}
                <div className="pt-3 border-t border-[#EADBCE]/30 text-left space-y-1.5">
                  <span className="text-[8px] font-bold text-[#A29182] uppercase tracking-wider block">Key Deliverables</span>
                  <div className="space-y-1 text-[10px] text-[#4A3A31] font-semibold">
                    {template.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A86B] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-auto">
                {isActive ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Avoid triggering card click
                      onSelectTemplate(template);
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C483] to-[#AA7C11] hover:from-[#E5C483] hover:to-[#8C6207] text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-[#AA7C11]/10 flex items-center justify-center gap-2 group transition-all"
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Customize Layout</span>
                  </button>
                ) : (
                  <div className="w-full text-center text-[10px] uppercase font-bold text-[#C5A86B] tracking-widest py-3">
                    Click to View
                  </div>
                )}
              </div>

              {/* Elegant Simulated Ground Reflection (Fading Gold Shadow) */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-gradient-to-b from-[#C5A86B]/10 to-transparent blur-md rounded-full pointer-events-none opacity-60"></div>
            </div>
          );
        })}
      </div>

      {/* Glass navigation arrows */}
      <div className="flex items-center gap-6 mt-4 z-40">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full glass border border-[#EADBCE] text-[#312520] hover:text-[#C5A86B] hover:scale-105 duration-200 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="font-mono text-xs text-[#A29182] uppercase tracking-widest">
          Framework {activeIndex + 1} <span className="opacity-40">/</span> {total}
        </span>

        <button
          onClick={handleNext}
          className="p-3 rounded-full glass border border-[#EADBCE] text-[#312520] hover:text-[#C5A86B] hover:scale-105 duration-200 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
