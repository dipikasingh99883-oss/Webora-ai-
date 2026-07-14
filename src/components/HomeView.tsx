import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Smartphone, 
  Search, 
  TrendingUp, 
  Rocket, 
  Monitor, 
  Sliders, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Phone,
  Zap,
  Star,
  Award,
  Activity
} from 'lucide-react';
import FAQ from './FAQ';
import MacBookFrame from './MacBookFrame';
import TemplateCarousel from './TemplateCarousel';
import { Template } from '../types';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'portfolio' | 'templates' | 'dashboard' | 'admin') => void;
  user: any;
  onOpenAuth: () => void;
  templates?: Template[];
  onSelectTemplate?: (template: Template) => void;
}

export default function HomeView({ onNavigate, user, onOpenAuth, templates = [], onSelectTemplate }: HomeViewProps) {
  const whatsappUrl = "https://wa.me/919028724168?text=Hello%20Webora%20AI%20Team,%20I%20am%20interested%20in%20building%20a%20website!";

  const handleGetStarted = () => {
    if (user) {
      onNavigate('dashboard');
    } else {
      onOpenAuth();
    }
  };

  const handleSelectTemplate = (template: Template) => {
    if (onSelectTemplate) {
      onSelectTemplate(template);
    } else {
      onNavigate('templates');
    }
  };

  return (
    <div className="space-y-32 pt-8 md:pt-12 overflow-x-hidden w-full">
      
      {/* ================= 1. HERO SECTION ================= */}
      <section id="home-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24 w-full">
        {/* Left Side Content - Symmetrical luxury typography */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          {/* Symmetrical Luxury Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C5A86B]/10 border border-[#C5A86B]/20 text-[#AA7C11] text-xs font-semibold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 animate-pulse" />
              <span>⚡ Bespoke Delivery in 48–72 Hours</span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-white/60 border border-[#EADBCE]/60 py-1 px-3 rounded-full shadow-sm">
              <div className="flex -space-x-1.5">
                <img className="w-5 h-5 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=40&q=80" alt="Client 1" />
                <img className="w-5 h-5 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80" alt="Client 2" />
                <img className="w-5 h-5 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&q=80" alt="Client 3" />
              </div>
              <span className="text-[10px] text-[#5C4C41] font-bold flex items-center gap-1">
                <span className="text-[#312520]">5.0</span>
                <span className="text-[#D4AF37]">★★★★★</span>
                <span className="text-[#A29182] hidden sm:inline">100+ Brands Launched</span>
              </span>
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#312520] leading-[1.15]">
            Crafting High-Converting Web Platforms for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#E5C483] to-[#AA7C11]">Elite Businesses</span>.
          </h1>
          
          <p className="text-[#5C4C41] text-sm sm:text-base max-w-xl leading-relaxed">
            We pair bespoke, luxury design systems with advanced AI development speed to build production-ready digital channels in hours, not months. High-end, frictionless, and optimized to convert.
          </p>

          {/* Symmetrical CTAs with Gold and Cashmere Styles */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C483] to-[#AA7C11] hover:from-[#E5C483] hover:to-[#8C6207] text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#AA7C11]/10 hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 group border border-[#AA7C11]/30"
            >
              <span>Get Your Website</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <a
              href="#pricing-section"
              className="px-8 py-4 rounded-xl border border-[#EADBCE] bg-white/50 hover:bg-[#F5EFE3] text-[#312520] font-bold text-xs uppercase tracking-widest transition-all hover:scale-[1.02] text-center shadow-sm"
            >
              View Pricing
            </a>
          </div>

          {/* Symmetrical Key Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#EADBCE]/30">
            <div className="flex items-center gap-2 text-xs text-[#5C4C41] font-semibold">
              <Clock className="w-4 h-4 text-[#C5A86B] shrink-0" />
              <span>48–72h Launch Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#5C4C41] font-semibold">
              <Smartphone className="w-4 h-4 text-[#C5A86B] shrink-0" />
              <span>Flawless Responsive Layouts</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#5C4C41] font-semibold">
              <Search className="w-4 h-4 text-[#C5A86B] shrink-0" />
              <span>Bespoke SEO Indexing</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#5C4C41] font-semibold">
              <TrendingUp className="w-4 h-4 text-[#C5A86B] shrink-0" />
              <span>Conversion-First Focus</span>
            </div>
          </div>

        </div>

        {/* Right Side: High-Fidelity 3D MacBook Lid Opening Frame */}
        <div className="lg:col-span-6 relative flex items-center justify-center w-full">
          <MacBookFrame />
        </div>
      </section>

      {/* ================= 2. VISION SECTION (THE MANIFESTO) ================= */}
      <section id="vision-section" className="scroll-mt-24 py-6 w-full">
        <div className="glass-accent p-8 md:p-14 rounded-3xl border border-[#C5A86B]/25 max-w-4xl mx-auto text-center space-y-6 relative overflow-hidden">
          {/* Gold foil background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#C5A86B]/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex justify-center mb-2">
            <Award className="w-8 h-8 text-[#C5A86B]" />
          </div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A86B] uppercase block">THE BRAND MANIFESTO</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#312520] tracking-tight leading-tight">
            Speed is a Design Parameter.
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C5A86B] mx-auto"></div>
          <p className="font-serif italic text-[#5C4C41] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            &ldquo;We believe traditional agency bureaucracy is obsolete. Luxury web engineering should not take months. Our mission is to combine the precision of bespoke design frameworks with AI generation speed to deliver flawless digital products in hours, not months.&rdquo;
          </p>
          <span className="text-[9px] font-bold text-[#C5A86B] uppercase tracking-widest block">Webora AI Agency</span>
        </div>
      </section>

      {/* ================= 3. SERVICES SECTION ================= */}
      <section id="services-section" className="space-y-12 scroll-mt-24 w-full">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A86B]">OUR SERVICES</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#312520]">
            Web Solutions That Drive Real Results
          </h2>
          <p className="text-[#5C4C41] text-xs max-w-sm mx-auto">
            Engineered using AI compilation speeds and verified by elite conversion strategists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass p-8 rounded-3xl border border-[#EADBCE]/30 space-y-4 hover:border-[#C5A86B]/30 duration-300 transition-all text-left flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A86B]/10 flex items-center justify-center text-[#AA7C11]">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#312520]">Landing Pages</h4>
                <p className="text-xs text-[#C5A86B] font-bold mt-1 uppercase tracking-wide">for Startups & Advertising</p>
              </div>
              <p className="text-xs text-[#5C4C41] leading-relaxed">
                High-converting, single-page platforms specifically customized to capture traffic, highlight core values, and generate maximum lead signups.
              </p>
            </div>
            <div className="pt-4 border-t border-[#EADBCE]/30 flex items-center justify-between text-[10px] text-[#A29182] font-semibold">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#C5A86B]" /> 48–72h Delivery</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A86B]" /> High Conversion</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass p-8 rounded-3xl border border-[#EADBCE]/30 space-y-4 hover:border-[#C5A86B]/30 duration-300 transition-all text-left flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A86B]/10 flex items-center justify-center text-[#AA7C11]">
                <Monitor className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#312520]">Business Websites</h4>
                <p className="text-xs text-[#C5A86B] font-bold mt-1 uppercase tracking-wide">for Growing Brands</p>
              </div>
              <p className="text-xs text-[#5C4C41] leading-relaxed">
                Professional multi-page portals designed to showcase company trust, core services, case histories, portfolios, and seamless booking structures.
              </p>
            </div>
            <div className="pt-4 border-t border-[#EADBCE]/30 flex items-center justify-between text-[10px] text-[#A29182] font-semibold">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#C5A86B]" /> 48–72h Delivery</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A86B]" /> Trust-First</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass p-8 rounded-3xl border border-[#EADBCE]/30 space-y-4 hover:border-[#C5A86B]/30 duration-300 transition-all text-left flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A86B]/10 flex items-center justify-center text-[#AA7C11]">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#312520]">AI Conversion Funnels</h4>
                <p className="text-xs text-[#C5A86B] font-bold mt-1 uppercase tracking-wide">for Automating Leads</p>
              </div>
              <p className="text-xs text-[#5C4C41] leading-relaxed">
                Smart lead capturing and nurturing systems fully customized with WhatsApp alerts, appointment setting, and CRM hooks.
              </p>
            </div>
            <div className="pt-4 border-t border-[#EADBCE]/30 flex items-center justify-between text-[10px] text-[#A29182] font-semibold">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#C5A86B]" /> 48–72h Delivery</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A86B]" /> Auto Leads</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. TEMPLATE CAROUSEL SECTION (Circular Carousel) ================= */}
      <section className="space-y-8 text-center scroll-mt-24 w-full" id="templates-carousel">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A86B]">THE PORTFOLIO CATALOG</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#312520]">
            The Exquisite Framework Catalog
          </h2>
          <p className="text-[#5C4C41] text-xs max-w-sm mx-auto">
            Interactive, touch-enabled 160° Circular Carousel of our premium baseline layouts.
          </p>
        </div>

        <TemplateCarousel templates={templates} onSelectTemplate={handleSelectTemplate} />
      </section>

      {/* ================= 5. HOW IT WORKS (PROCESS MAP) ================= */}
      <section id="process-section" className="space-y-12 scroll-mt-24 w-full">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A86B]">HOW IT WORKS</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#312520]">
            Sleek, Streamlined Process Map
          </h2>
          <p className="text-[#5C4C41] text-xs max-w-sm mx-auto">
            From collaborative planning to production launch in 4 easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Share Your Details", desc: "Collaborate on goals, branding requirements, and layout targets via our interactive web brief console." },
            { step: "02", title: "AI-Powered Layouts", desc: "Our system instantly pairs structure constraints and creates highly customized, bespoke drafts with expert code frameworks." },
            { step: "03", title: "Bespoke Coding", desc: "Our specialist developers code pixel-perfect details, integrate SEO structures, and setup call/leads triggers." },
            { step: "04", title: "Go Live & Convert", desc: "We deploy onto high-performance cloud servers, provide full edit controls, and launch within 48-72 hours." }
          ].map((item, idx) => (
            <div key={idx} className="relative p-6 rounded-2xl bg-white border border-[#EADBCE]/30 text-left space-y-3 shadow-sm">
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] to-[#AA7C11] font-mono">
                {item.step}
              </span>
              <h4 className="font-serif text-sm font-bold text-[#312520]">{item.title}</h4>
              <p className="text-xs text-[#5C4C41] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 6. FAST DELIVERY GUARANTEE ================= */}
      <section className="glass p-8 sm:p-12 rounded-3xl border border-[#EADBCE]/30 relative overflow-hidden text-left w-full">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A86B]/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Guarantee Title Column */}
          <div className="lg:col-span-5 space-y-4 flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#AA7C11] flex items-center justify-center text-white shrink-0 shadow-md">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#312520]">
                Fast Delivery Guarantee
              </h3>
              <p className="text-xs text-[#5C4C41] leading-relaxed mt-1">
                We deliver fully functional, production-level client websites within 48–72 hours after receiving all structured assets.
              </p>
            </div>
          </div>

          {/* Mid Checklist Column */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#EADBCE]/40 pt-6 lg:pt-0 lg:pl-8 space-y-2.5">
            <span className="text-[10px] font-bold text-[#A29182] uppercase tracking-wider block">What's Included:</span>
            <div className="grid grid-cols-1 gap-2 text-xs text-[#5C4C41] font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A86B]"></span>
                <span>UI/UX Architecture & Design</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A86B]"></span>
                <span>Mobile-First Responsive Coding</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A86B]"></span>
                <span>Basic Technical SEO Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A86B]"></span>
                <span>Contact Forms / WhatsApp Triggers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A86B]"></span>
                <span>Hosting Configuration & Live Deployment</span>
              </div>
            </div>
          </div>

          {/* Shield Promise Box Column */}
          <div className="lg:col-span-3">
            <div className="p-5 rounded-2xl bg-[#C5A86B]/10 border border-[#C5A86B]/20 text-left space-y-2">
              <div className="flex items-center gap-2 text-[#AA7C11] font-bold text-xs">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>On-Time Promise</span>
              </div>
              <p className="text-[11px] text-[#5C4C41] leading-relaxed">
                If we miss the deadline, we immediately prioritize your project and provide free premium revision upgrade packages.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 7. PRICING SECTION ================= */}
      <section id="pricing-section" className="space-y-12 scroll-mt-24 text-center w-full">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A86B]">PRICING PLANS</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#312520]">
            Simple, Transparent & Affordable Pricing
          </h2>
          <p className="text-[#5C4C41] text-xs max-w-sm mx-auto">
            Choose a starter package framework. No hidden fees. Just elite conversion code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left items-stretch">
          
          {/* Card 1: Starter */}
          <div className="glass p-8 rounded-3xl border border-[#EADBCE]/30 flex flex-col justify-between space-y-6 hover:border-[#C5A86B]/30 transition-all shadow-sm">
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#312520]">Starter Plan</h4>
                <p className="text-xs text-[#A29182] uppercase tracking-widest mt-1">Single Landing Website</p>
              </div>
              
              <div className="border-b border-[#EADBCE]/30 pb-4">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#312520]">₹4,999</span>
                <span className="text-[10px] text-[#A29182] uppercase tracking-wider block mt-1">Ideal for simple launch MVP</span>
              </div>

              <ul className="space-y-2.5 text-xs text-[#5C4C41] font-semibold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A86B] shrink-0" />
                  <span>1-Page Landing Website</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A86B] shrink-0" />
                  <span>Mobile Responsive Design</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A86B] shrink-0" />
                  <span>Contact Form + WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A86B] shrink-0" />
                  <span>Basic SEO Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A86B] shrink-0" />
                  <span>48–72 Hour Delivery</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleGetStarted}
              className="w-full py-3 rounded-xl border border-[#EADBCE] hover:bg-[#F5EFE3] text-[#312520] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center bg-white"
            >
              Get Started
            </button>
          </div>

          {/* Card 2: Growth Plan (Spotlight Card) */}
          <div className="relative glass p-8 rounded-3xl border border-[#C5A86B]/35 shadow-lg shadow-[#AA7C11]/5 flex flex-col justify-between space-y-6 transform lg:-translate-y-2 bg-[#F5EFE3]/70">
            {/* Most Popular Label banner */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[9px] font-black uppercase tracking-widest text-white shadow-md">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-[#312520]">Growth Plan</h4>
                <p className="text-xs text-[#AA7C11] uppercase tracking-widest mt-1">Multi-page Business Site</p>
              </div>
              
              <div className="border-b border-[#EADBCE]/30 pb-4">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#312520]">₹9,999</span>
                <span className="text-[10px] text-[#A29182] uppercase tracking-wider block mt-1">Highly requested layout setup</span>
              </div>

              <ul className="space-y-2.5 text-xs text-[#5C4C41] font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#AA7C11] shrink-0" />
                  <span>3–5 Page Business Website</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#AA7C11] shrink-0" />
                  <span>Premium UI/UX System Design</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#AA7C11] shrink-0" />
                  <span>Lead Generation Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#AA7C11] shrink-0" />
                  <span>WhatsApp + Call Integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#AA7C11] shrink-0" />
                  <span>SEO Optimized Structure</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#AA7C11] shrink-0" />
                  <span>48–72 Hour Delivery</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleGetStarted}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-white font-bold text-xs uppercase tracking-widest transition-all hover:scale-[1.02] cursor-pointer text-center shadow-sm"
            >
              Get Started
            </button>
          </div>

          {/* Card 3: Pro Plan */}
          <div className="glass p-8 rounded-3xl border border-[#EADBCE]/30 flex flex-col justify-between space-y-6 hover:border-[#C5A86B]/30 transition-all shadow-sm">
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#312520]">Pro Plan</h4>
                <p className="text-xs text-[#A29182] uppercase tracking-widest mt-1">Custom Corporate / Funnel</p>
              </div>
              
              <div className="border-b border-[#EADBCE]/30 pb-4">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#312520]">₹19,999</span>
                <span className="text-[10px] text-[#A29182] uppercase tracking-wider block mt-1">Bespoke customized branding</span>
              </div>

              <ul className="space-y-2.5 text-xs text-[#5C4C41] font-semibold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A86B] shrink-0" />
                  <span>Full Custom Business Website</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A86B] shrink-0" />
                  <span>Advanced Animations & Custom UI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A86B] shrink-0" />
                  <span>Conversion-Focused Design</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A86B] shrink-0" />
                  <span>Copywriting Assistance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A86B] shrink-0" />
                  <span>Priority 48h Delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A86B] shrink-0" />
                  <span>Complete SEO Blueprint</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleGetStarted}
              className="w-full py-3 rounded-xl border border-[#EADBCE] hover:bg-[#F5EFE3] text-[#312520] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center bg-white"
            >
              Get Started
            </button>
          </div>

        </div>

        {/* Custom Funnel Pricing Banner */}
        <div className="max-w-3xl mx-auto p-6 rounded-2xl glass border border-[#EADBCE]/30 flex flex-col sm:flex-row items-center justify-between text-left gap-4 shadow-sm">
          <div>
            <h5 className="font-serif text-sm font-bold text-[#312520]">Need a Premium Funnel System or custom database specifications?</h5>
            <p className="text-xs text-[#5C4C41] mt-1">Starting from ₹29,999+ for full custom database structures, strategy design, and performance optimizations.</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-sm"
          >
            Custom Quote
          </a>
        </div>
      </section>

      {/* ================= 8. ABOUT US SECTION ================= */}
      <section id="about-us-section" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-24 text-left w-full">
        
        {/* Left column: About metrics */}
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A86B]">ABOUT WEBORA AI</span>
            <h2 className="font-serif text-3xl font-extrabold text-[#312520] leading-tight">
              Pioneering Speed & Performance Web Systems
            </h2>
            <p className="text-xs text-[#5C4C41] leading-relaxed">
              We combine the speed of AI compilations with the creativity of expert design systems to deliver high-converting websites in record time. No lengthy processes. No administrative delays. Just stellar results.
            </p>
          </div>

          {/* Simple metrics grid */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#EADBCE]/40">
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#312520] block">100+</span>
              <span className="text-[9px] uppercase font-bold text-[#A29182] tracking-wider">Projects Launched</span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#312520] block">98%</span>
              <span className="text-[9px] uppercase font-bold text-[#A29182] tracking-wider">Happy Customers</span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#312520] block">48-72h</span>
              <span className="text-[9px] uppercase font-bold text-[#A29182] tracking-wider">Average Build</span>
            </div>
          </div>
        </div>

        {/* Right column: Symmetrical Premium Compliance Card (No personal founder profiles) */}
        <div className="p-8 rounded-3xl glass border border-[#EADBCE]/30 text-left space-y-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A86B]/5 rounded-full blur-2xl"></div>
          <span className="text-[9px] font-bold text-[#C5A86B] uppercase tracking-[0.2em] block">AGENCY COMPLIANCE</span>
          <h4 className="font-serif text-xl font-bold text-[#312520]">Bespoke Production-Ready SLA</h4>
          <p className="text-xs text-[#5C4C41] leading-relaxed">
            Webora AI designs and compiles code to match the rigid quality guidelines of modern search engines and premium user experiences. Every build undergoes meticulous optimization for sub-second loading performance and flawless responsive displays.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-[9px] text-[#C5A86B] font-bold uppercase tracking-wider border-t border-[#EADBCE]/20">
            <span>✔ React / Vite Framework</span>
            <span>✔ 100% SEO Friendly</span>
            <span>✔ Mobile Responsive</span>
          </div>
        </div>

      </section>

      {/* ================= 9. RESPONSIVE SHOWCASE ================= */}
      <section id="showcase-section" className="space-y-12 scroll-mt-24 w-full">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A86B]">FLAWLESS ADAPTABILITY</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#312520]">
            Symmetrical Device Responsiveness
          </h2>
          <p className="text-[#5C4C41] text-xs max-w-sm mx-auto">
            Our interfaces adapt dynamically to ensure optimal usability from large desktops down to compact mobile phones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Desktop Preview */}
          <div className="glass p-6 rounded-3xl border border-[#EADBCE]/30 space-y-4 flex flex-col justify-between shadow-sm">
            <div className="w-full aspect-[16/10] bg-[#312520]/5 rounded-2xl border border-[#EADBCE]/20 overflow-hidden relative">
              {/* Header */}
              <div className="bg-[#FAF6F0] px-4 py-1.5 border-b border-[#EADBCE]/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              </div>
              {/* Main Content Visualizer */}
              <div className="p-8 h-full flex flex-col justify-center space-y-2 text-left bg-white/50">
                <div className="w-16 h-2 bg-[#C5A86B]/30 rounded-md"></div>
                <div className="w-48 h-4 bg-[#312520]/80 rounded-md"></div>
                <div className="w-32 h-3 bg-[#5C4C41]/50 rounded-md"></div>
                <div className="flex gap-2 pt-2">
                  <div className="w-16 h-6 bg-[#C5A86B] rounded-lg"></div>
                  <div className="w-16 h-6 bg-[#EADBCE] rounded-lg"></div>
                </div>
              </div>
            </div>
            <div className="text-left">
              <h4 className="font-serif text-md font-bold text-[#312520]">Widescreen Desktop Experience</h4>
              <p className="text-xs text-[#5C4C41] mt-1">Spacious padding alignments, grid offsets, and rich animations configured for premium large monitors.</p>
            </div>
          </div>

          {/* Mobile Preview */}
          <div className="glass p-6 rounded-3xl border border-[#EADBCE]/30 space-y-4 flex flex-col justify-between shadow-sm">
            <div className="w-full aspect-[16/10] bg-[#312520]/5 rounded-2xl border border-[#EADBCE]/20 flex items-center justify-center relative">
              {/* Centered Phone Chassis */}
              <div className="w-24 aspect-[9/18] bg-[#FAF6F0] rounded-xl border-4 border-[#312520] p-1.5 flex flex-col justify-between text-left shadow-lg">
                <div className="w-4 h-1 bg-[#312520] rounded-full mx-auto"></div>
                <div className="space-y-1.5 pt-2 flex-1 flex flex-col justify-center">
                  <div className="w-6 h-1.5 bg-[#C5A86B]/40 rounded-sm"></div>
                  <div className="w-12 h-2.5 bg-[#312520]/70 rounded-sm"></div>
                  <div className="w-8 h-1.5 bg-[#5C4C41]/50 rounded-sm"></div>
                  <div className="w-8 h-3 bg-[#C5A86B] rounded-sm pt-0.5"></div>
                </div>
              </div>
            </div>
            <div className="text-left">
              <h4 className="font-serif text-md font-bold text-[#312520]">Mobile-First Optimization</h4>
              <p className="text-xs text-[#5C4C41] mt-1">Touch target sizes exceeding 44px, lightweight layout calculations, and streamlined layouts optimized for active speed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 10. CLIENT TESTIMONIALS ================= */}
      <section className="space-y-12 w-full scroll-mt-24" id="reviews-section">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A86B]">CLIENT REVIEWS</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#312520]">
            Trusted by Forward-Thinking Brands
          </h2>
          <p className="text-[#5C4C41] text-xs max-w-sm mx-auto">
            Here is what luxury developers, founders, and startups say about Webora AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Elena Rostova",
              role: "SaaS Founder",
              text: "Webora AI built our fully loaded software product landing page in 72 hours flat. Exceptional clean aesthetics and conversion flow!",
              rating: 5
            },
            {
              name: "Sanjay Deshmukh",
              role: "Real Estate Developer",
              text: "Our medical and clinic lead pages were transformed overnight. Outstanding layout speeds, highly responsive, and real lead traction within days.",
              rating: 5
            },
            {
              name: "Marcus Thorne",
              role: "Creative Director",
              text: "Absolute masterclass in web design. No administrative delays. The circular templates are beautiful baselines that convert traffic instantly.",
              rating: 5
            }
          ].map((rev, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-[#EADBCE]/30 space-y-4 text-left flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="flex text-[#D4AF37]">
                  {Array.from({ length: rev.rating }).map((_, rIdx) => (
                    <Star key={rIdx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#5C4C41] italic leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-[#EADBCE]/20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C5A86B]/15 flex items-center justify-center text-[#AA7C11] font-bold text-xs select-none">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#312520]">{rev.name}</h5>
                  <p className="text-[9px] text-[#A29182] uppercase tracking-wider font-semibold">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 11. FAQ SECTION ================= */}
      <FAQ />

      {/* ================= 12. CONTACT / FORM SECTION ================= */}
      <section id="contact-section" className="glass p-8 sm:p-12 rounded-3xl border border-[#C5A86B]/25 relative overflow-hidden text-left scroll-mt-24 w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A86B]/5 rounded-full blur-3xl -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A86B] block">CONTACT US</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#312520] leading-tight">
              Let&apos;s Build Your Website in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]">48–72 Hours</span>
            </h2>
            <p className="text-xs text-[#5C4C41] leading-relaxed max-w-xl">
              Have a project, corporate launch, or specific database integration in mind? Get in touch with our specialists now or chat instantly with our core design team to kickstart your pipeline.
            </p>

            {/* Core Info Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5C4C41] font-semibold pt-4">
              <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-[#EADBCE]/30 shadow-sm">
                <Phone className="w-4.5 h-4.5 text-[#C5A86B]" />
                <span>+91 9028724168</span>
              </div>
              <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-[#EADBCE]/30 shadow-sm">
                <Mail className="w-4.5 h-4.5 text-[#C5A86B]" />
                <span>webora.ai.agency@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-[#EADBCE]/30 shadow-sm">
                <MapPin className="w-4.5 h-4.5 text-[#C5A86B]" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-[#EADBCE]/30 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shrink-0"></span>
                <span>Active Support Hours</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-6 bg-white/70 p-8 rounded-2xl border border-[#EADBCE]/30 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#C5A86B]/15 flex items-center justify-center text-[#AA7C11] shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h4 className="font-serif text-sm font-bold text-[#312520] uppercase tracking-wider">Fast Track Conversation</h4>
              <p className="text-[11px] text-[#5C4C41]">Connect directly on WhatsApp to share your visual ideas.</p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-[#AA7C11]/15 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer border border-[#AA7C11]/25"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
