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
  Layout,
  ExternalLink,
  Zap,
  Star
} from 'lucide-react';
import FAQ from './FAQ';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'portfolio' | 'templates' | 'dashboard' | 'admin') => void;
  user: any;
  onOpenAuth: () => void;
}

export default function HomeView({ onNavigate, user, onOpenAuth }: HomeViewProps) {
  // WhatsApp link template
  const whatsappUrl = "https://wa.me/919028724168?text=Hello%20Webora%20AI%20Team,%20I%20am%20interested%20in%20building%20a%20website!";

  const handleGetStarted = () => {
    if (user) {
      onNavigate('dashboard');
    } else {
      onOpenAuth();
    }
  };

  return (
    <div className="space-y-32 pt-8 md:pt-16">
      
      {/* ================= HERO SECTION ================= */}
      <section id="home-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24">
        {/* Left Side Content */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          {/* Trust Rating & Fast Delivery Double Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
              <span>⚡ Delivery in 48–72 Hours</span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-gray-900/60 border border-gray-800 py-1 px-2.5 rounded-full">
              <div className="flex -space-x-1.5">
                <img className="w-5 h-5 rounded-full border border-gray-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=40&q=80" alt="Client 1" />
                <img className="w-5 h-5 rounded-full border border-gray-950 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80" alt="Client 2" />
                <img className="w-5 h-5 rounded-full border border-gray-950 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&q=80" alt="Client 3" />
              </div>
              <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                <span className="text-white">5.0</span>
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-gray-500 hidden sm:inline">100+ Trusted</span>
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            We Build High-Converting Websites in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">48–72 Hours</span> Using AI + Expert Design Systems.
          </h1>
          
          <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed">
            From idea to live website — fast, modern, and built to convert. Our unique hybrid flow delivers production-ready visual code without typical agency delays.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={handleGetStarted}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Get Your Website</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <a
              href="#pricing-section"
              className="px-6 py-3.5 rounded-xl border border-gray-800 bg-gray-900/30 hover:bg-gray-800/60 text-gray-300 font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] text-center"
            >
              View Pricing
            </a>
          </div>

          {/* Subtle Key Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-900">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>48–72 Hours Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Smartphone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Mobile Responsive</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Search className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>SEO Ready</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Conversion Focused</span>
            </div>
          </div>

        </div>

        {/* Right Side Mockup Displays */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div className="relative w-full max-w-[520px] h-[340px] md:h-[400px]">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
            
            {/* Desktop Laptop Frame Layout */}
            <div className="absolute top-4 left-0 w-[90%] bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden aspect-[16/10] glow-blue">
              {/* Header Bar */}
              <div className="bg-gray-900/80 px-4 py-2 flex items-center justify-between border-b border-gray-950">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-[8px] text-gray-500 font-mono ml-2 uppercase tracking-widest">WEBORA AI SYSTEM</span>
                </div>
                <div className="bg-gray-950/90 text-[8px] font-mono text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/10">
                  LIVE VISUAL COMPILER
                </div>
              </div>

              {/* Mockup Body Content */}
              <div className="p-6 bg-slate-950 h-full flex flex-col justify-between text-left relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl"></div>
                <div className="space-y-3 max-w-[80%]">
                  <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">Webora AI</span>
                  <h3 className="text-md sm:text-xl font-black text-white leading-tight">
                    We Build Digital Experiences That Drive Results.
                  </h3>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    Sleek components, lightning speeds, custom visuals, and high conversion structures.
                  </p>
                  <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-[9px] uppercase tracking-wider">
                    Get Started
                  </button>
                </div>
                
                {/* Platform Badge overlays inside Laptop */}
                <div className="border-t border-gray-900 pt-3 flex gap-4 text-[8px] text-gray-500 font-medium">
                  <span>★ Trustpilot</span>
                  <span>Google</span>
                  <span>Clutch</span>
                  <span>Fiverr.</span>
                </div>
              </div>
            </div>

            {/* Floating Mobile phone overlay */}
            <div className="absolute bottom-0 right-0 w-[160px] bg-gray-950 rounded-[30px] border-[5px] border-gray-800 shadow-2xl overflow-hidden aspect-[9/19] h-[240px] md:h-[280px]">
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-gray-800 rounded-full z-20"></div>
              <div className="relative p-4 bg-[#090D18] h-full flex flex-col justify-between text-left">
                <div className="space-y-2 pt-4">
                  <h4 className="text-[10px] font-extrabold text-white leading-tight">
                    We Build Digital Experiences That Drive Results.
                  </h4>
                  <p className="text-[8px] text-gray-400 leading-normal">
                    Fully responsive structures customized for optimal conversion.
                  </p>
                  <button className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold text-[8px] uppercase">
                    Get Started
                  </button>
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-[10px] ml-auto">
                  ★
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services-section" className="space-y-12 scroll-mt-24">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">OUR SERVICES</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Web Solutions That Drive Real Results
          </h2>
          <p className="text-gray-400 text-xs max-w-sm mx-auto">
            Engineered using AI speed and verified by expert conversion strategists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass p-8 rounded-2xl border border-gray-850 space-y-4 hover:border-blue-500/20 duration-300 transition-all text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/15 flex items-center justify-center text-blue-400">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Landing Pages</h4>
                <p className="text-xs text-blue-400 font-semibold mt-1">for Startups & Ads</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                High-converting, single-page platforms specifically customized to capture traffic, highlight key values, and generate maximum lead signups.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-900 flex items-center justify-between text-[10px] text-gray-500">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-blue-400" /> 48–72h Delivery</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-cyan-400" /> Conversions</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass p-8 rounded-2xl border border-gray-850 space-y-4 hover:border-indigo-500/20 duration-300 transition-all text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/15 flex items-center justify-center text-indigo-400">
                <Monitor className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Business Websites</h4>
                <p className="text-xs text-indigo-400 font-semibold mt-1">for Brands</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Professional multi-page portals designed to showcase company trust, core services, case histories, portfolios, and seamless booking structures.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-900 flex items-center justify-between text-[10px] text-gray-500">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-blue-400" /> 48–72h Delivery</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-cyan-400" /> Trust-First</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass p-8 rounded-2xl border border-gray-850 space-y-4 hover:border-cyan-500/20 duration-300 transition-all text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/15 flex items-center justify-center text-cyan-400">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">AI Conversion Funnels</h4>
                <p className="text-xs text-cyan-400 font-semibold mt-1">for Leads</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Smart lead capturing and nurturing systems fully customized with WhatsApp alerts, appointment setting, and CRM hooks.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-900 flex items-center justify-between text-[10px] text-gray-500">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-blue-400" /> 48–72h Delivery</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-cyan-400" /> Auto Leads</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS SECTION ================= */}
      <section id="process-section" className="space-y-12 scroll-mt-24">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">HOW IT WORKS</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Sleek, Streamlined Process Map
          </h2>
          <p className="text-gray-400 text-xs max-w-sm mx-auto">
            From collaborative planning to production launch in 4 easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Share Your Details", desc: "Collaborate on goals, branding requirements, and layout targets via our interactive web brief console." },
            { step: "02", title: "AI-Powered Layouts", desc: "Our system instantly pairs structure constraints and creates highly customized, bespoke drafts with expert code frameworks." },
            { step: "03", title: "Custom Coding", desc: "Our specialist developers code pixel-perfect details, integrate SEO structures, and setup call/leads triggers." },
            { step: "04", title: "Go Live & Convert", desc: "We deploy onto high-performance cloud servers, provide full edit controls, and launch within 48-72 hours." }
          ].map((item, idx) => (
            <div key={idx} className="relative p-6 rounded-2xl bg-gray-900/40 border border-gray-900 text-left space-y-3">
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-cyan-400 font-mono">
                {item.step}
              </span>
              <h4 className="text-sm font-bold text-white">{item.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAST DELIVERY GUARANTEE ================= */}
      <section className="glass p-8 sm:p-12 rounded-3xl border border-gray-850 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Guarantee Title Column */}
          <div className="lg:col-span-5 space-y-4 flex items-start gap-4">
            {/* Stopwatch Graphic overlay */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/10">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Fast Delivery Guarantee
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-1">
                We deliver fully functional, production-level client websites within 48–72 hours after receiving all structured assets.
              </p>
            </div>
          </div>

          {/* Mid Checklist Column */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-gray-850 pt-6 lg:pt-0 lg:pl-8 space-y-2.5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">What's Included:</span>
            <div className="grid grid-cols-1 gap-2 text-xs text-gray-300 font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>UI/UX Architecture & Design</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Mobile-First Responsive Coding</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Basic Technical SEO Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Contact Forms / WhatsApp Triggers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Hosting Configuration & Live Deployment</span>
              </div>
            </div>
          </div>

          {/* Shield Promise Box Column */}
          <div className="lg:col-span-3">
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/10 text-left space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>On-Time Promise</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                If we miss the deadline, we immediately prioritize your project and provide free premium revision upgrade packages.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= PRICING SECTION ================= */}
      <section id="pricing-section" className="space-y-12 scroll-mt-24 text-center">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">PRICING PLANS</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Simple, Transparent & Affordable Pricing
          </h2>
          <p className="text-gray-400 text-xs max-w-sm mx-auto">
            Choose a starter package structure. No hidden fees. Just elite conversion code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          
          {/* Card 1: Starter */}
          <div className="glass p-8 rounded-2xl border border-gray-850 flex flex-col justify-between space-y-6 hover:border-gray-700 transition-all">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-white">Starter Plan</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Single Landing Website</p>
              </div>
              
              <div className="border-b border-gray-900 pb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">₹4,999</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mt-1">Ideal for simple launch MVP</span>
              </div>

              <ul className="space-y-2.5 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1-Page Landing Website</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mobile Responsive Design</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Contact Form + WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Basic SEO Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>48–72 Hour Delivery</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleGetStarted}
              className="w-full py-2.5 rounded-xl border border-gray-850 hover:bg-gray-900 text-gray-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
            >
              Get Started
            </button>
          </div>

          {/* Card 2: Growth Plan (Spotlight Card) */}
          <div className="relative glass p-8 rounded-2xl border border-blue-500/20 glow-blue flex flex-col justify-between space-y-6 transform lg:-translate-y-2 bg-[#0C1224]/80">
            {/* Most Popular Label banner */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/20">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="pt-2">
                <h4 className="text-lg font-bold text-white">Growth Plan</h4>
                <p className="text-xs text-blue-400 uppercase tracking-widest mt-1">Multi-page Business Site</p>
              </div>
              
              <div className="border-b border-gray-900 pb-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">₹9,999</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mt-1">Highly requested layout setup</span>
              </div>

              <ul className="space-y-2.5 text-xs text-gray-300 font-semibold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3–5 Page Business Website</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Premium UI/UX System Design</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lead Generation Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp + Call Integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>SEO Optimized Structure</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>48–72 Hour Delivery</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleGetStarted}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] cursor-pointer text-center"
            >
              Get Started
            </button>
          </div>

          {/* Card 3: Pro Plan */}
          <div className="glass p-8 rounded-2xl border border-gray-850 flex flex-col justify-between space-y-6 hover:border-gray-700 transition-all">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-white">Pro Plan</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Custom Corporate / Funnel</p>
              </div>
              
              <div className="border-b border-gray-900 pb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">₹19,999</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mt-1">Bespoke customized branding</span>
              </div>

              <ul className="space-y-2.5 text-xs text-gray-300 font-semibold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full Custom Business Website</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Advanced Animations & Custom UI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Conversion-Focused Design</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Copywriting Assistance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priority 48h Delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Complete SEO Blueprint</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleGetStarted}
              className="w-full py-2.5 rounded-xl border border-gray-850 hover:bg-gray-900 text-gray-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
            >
              Get Started
            </button>
          </div>

        </div>

        {/* Custom Funnel Pricing Banner overlay */}
        <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-gray-900/40 border border-gray-900 flex flex-col sm:flex-row items-center justify-between text-left gap-4">
          <div>
            <h5 className="text-sm font-bold text-white">Need a Premium Funnel System or custom specifications?</h5>
            <p className="text-xs text-gray-400 mt-1">Starting from ₹29,999+ for full custom database structures, strategy design, and performance optimizations.</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap"
          >
            Custom Quote
          </a>
        </div>
      </section>

      {/* ================= ABOUT & FOUNDER SECTION ================= */}
      <section id="about-us-section" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-24 text-left">
        
        {/* Left column: About metrics */}
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">ABOUT WEBORA AI</span>
            <h2 className="text-3xl font-extrabold text-white">
              Pioneering Speed & Performance Web Systems
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              We combine the speed of AI with the creativity of expert design systems to deliver high-converting websites in record time. No lengthy processes. No delays. Just results.
            </p>
          </div>

          {/* Simple metrics grid */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-900">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">100+</span>
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Projects Launched</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">98%</span>
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Happy Customers</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">48-72h</span>
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Average Build</span>
            </div>
          </div>
        </div>

        {/* Right column: Founder profile card */}
        <div className="p-8 rounded-3xl bg-gray-900/20 border border-gray-900 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-extrabold text-2xl tracking-wider shadow-xl shrink-0 select-none">
            US
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <div>
              <h4 className="text-md font-bold text-white">Mr. Ujjwal Singh</h4>
              <p className="text-xs text-cyan-400 uppercase tracking-widest font-bold">Founder & CEO, Webora AI</p>
            </div>
            <p className="text-xs text-gray-400 italic leading-relaxed">
              &ldquo;We focus on building websites that don&apos;t just look beautiful — they are engineered from the ground up to generate real-world leads and sales.&rdquo;
            </p>
          </div>
        </div>

      </section>

      {/* ================= FAQ ACCORDION ================= */}
      <FAQ />

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact-section" className="glass p-8 sm:p-12 rounded-3xl border border-gray-850 relative overflow-hidden text-left scroll-mt-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block">CONTACT US</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Let&apos;s Build Your Website in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">48–72 Hours</span>
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
              Have a project or specific integration requirement in mind? Get in touch with our specialists now or chat instantly with Mr. Ujjwal Singh to kickstart your launch pipeline.
            </p>

            {/* Core Info Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300 font-semibold pt-4">
              <div className="flex items-center gap-3 bg-gray-950/40 p-3 rounded-xl border border-gray-900">
                <Phone className="w-4.5 h-4.5 text-blue-400" />
                <span>+91 9028724168</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-950/40 p-3 rounded-xl border border-gray-900">
                <Mail className="w-4.5 h-4.5 text-cyan-400" />
                <span>webora.ai.agency@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-950/40 p-3 rounded-xl border border-gray-900">
                <MapPin className="w-4.5 h-4.5 text-indigo-400" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-950/40 p-3 rounded-xl border border-gray-900">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Active Support Hours</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-6 bg-gray-950/50 p-8 rounded-2xl border border-gray-900">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Fast Track Conversation</h4>
              <p className="text-[11px] text-gray-500">Connect directly on WhatsApp to share your visual ideas.</p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/10 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
