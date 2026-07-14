import React, { useState } from 'react';
import { Template, TemplateCustomContent, TemplateSection } from '../types';
import { 
  ArrowLeft, 
  Sparkles, 
  Palette, 
  Type as FontIcon, 
  Info, 
  Check, 
  Sliders, 
  Layers, 
  Trash, 
  Plus, 
  Save, 
  Upload, 
  RefreshCw, 
  Laptop, 
  Phone as PhoneIcon, 
  Globe,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Heart,
  Coffee,
  Activity,
  Home,
  ShoppingBag,
  Layout,
  Search,
  Briefcase,
  Shield,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TemplateCustomizerProps {
  template: Template;
  onSave: (customContent: TemplateCustomContent, sections: TemplateSection[]) => Promise<void>;
  onClose: () => void;
}

const FONTS_OPTIONS = [
  { name: 'Inter (Sans)', value: 'Inter, sans-serif', importName: 'Inter' },
  { name: 'Space Grotesk (Tech)', value: '"Space Grotesk", sans-serif', importName: 'Space+Grotesk' },
  { name: 'Outfit (Modern)', value: '"Outfit", sans-serif', importName: 'Outfit' },
  { name: 'Playfair Display (Serif)', value: '"Playfair Display", serif', importName: 'Playfair+Display' },
  { name: 'JetBrains Mono (Mono)', value: '"JetBrains Mono", monospace', importName: 'JetBrains+Mono' }
];

export default function TemplateCustomizer({ template, onSave, onClose }: TemplateCustomizerProps) {
  const [activeTab, setActiveTab] = useState<'blocks' | 'branding' | 'copy' | 'ai-autofill'>('copy');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  
  // Custom Content State
  const [customContent, setCustomContent] = useState<TemplateCustomContent>(
    template.customContent || {
      brandName: template.name,
      logo: template.name.substring(0, 2).toUpperCase(),
      primaryColor: template.primaryColor || '#3b82f6',
      secondaryColor: template.secondaryColor || '#06b6d4',
      heroTitle: `Websites Built for ${template.name}`,
      heroSubtitle: `We design top-tier custom professional experiences dynamically tailored for maximum conversion speed.`,
      heroCtaText: 'Get Started Now',
      fontFamily: 'Inter',
      services: [
        { icon: 'Sparkles', title: 'Interactive UX Design', desc: 'Sleek visual styling combined with frictionless responsive layouts.' },
        { icon: 'Shield', title: 'Secure Operations', desc: 'Hardened architectures configured for zero security leaks.' },
        { icon: 'Briefcase', title: 'Consultancy Growth', desc: 'Optimized conversion workflows engineered for business lead tracking.' }
      ],
      pricingCards: [
        { planName: 'Starter', price: '$299', period: 'Flat', features: ['3 Core Landing Sections', 'Clean Layout Code', 'Responsive Support'] },
        { planName: 'Professional', price: '$599', period: 'Flat', features: ['Complete Multi-Page Structure', 'Dynamic Booking Widgets', 'Stripe Payments Setup'], highlight: true },
        { planName: 'Enterprise Scale', price: '$1199', period: 'Flat', features: ['Robust API Integrations', 'Custom Content Delivery', 'Priority 48-hour SLA SLA'] }
      ],
      testimonials: [
        { name: 'Elena Rostova', role: 'SaaS Founder', text: 'Built our fully loaded software product mockups in 72 hours flat. Exceptional clean aesthetics!' },
        { name: 'Sanjay Deshmukh', role: 'Real Estate Developer', text: 'Webora AI transformed our clinic lead pages overnight. Outstanding layout speed and custom conversion paths.' }
      ],
      contactEmail: 'contact@webora-client.com',
      contactPhone: '+91 9028724168',
      contactAddress: 'Pune, Maharashtra, India',
      socials: [
        { platform: 'Twitter', url: 'https://twitter.com' },
        { platform: 'LinkedIn', url: 'https://linkedin.com' }
      ]
    }
  );

  // Sections State - Reusable Section Blocks
  const [sections, setSections] = useState<TemplateSection[]>(
    template.sections || [
      { id: 'sec-hero', type: 'hero', title: 'Hero Section', content: {} },
      { id: 'sec-services', type: 'services', title: 'Services Grid', content: {} },
      { id: 'sec-testimonials', type: 'testimonials', title: 'Customer Testimonials', content: {} },
      { id: 'sec-pricing', type: 'pricing', title: 'Pricing Packages', content: {} },
      { id: 'sec-contact', type: 'contact', title: 'Contact / Booking', content: {} },
      { id: 'sec-footer', type: 'footer', title: 'Standard Footer', content: {} }
    ]
  );

  // AI Autofill fields
  const [aiBizName, setAiBizName] = useState('');
  const [aiBizType, setAiBizType] = useState('Restaurant');
  const [aiAbout, setAiAbout] = useState('');
  const [aiServices, setAiServices] = useState('');
  const [aiContact, setAiContact] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  // Handle generic state updates helper
  const updateContent = (fields: Partial<TemplateCustomContent>) => {
    setCustomContent(prev => ({ ...prev, ...fields }));
  };

  const handleSaveConfig = async () => {
    await onSave(customContent, sections);
    setAiSuccessMessage("Configuration successfully synced with database!");
    setTimeout(() => setAiSuccessMessage(null), 3000);
  };

  // AI Generation Handler
  const handleAIGenerate = async () => {
    if (!aiBizName || !aiBizType) {
      alert("Business Name and Type are required to run AI Autofill!");
      return;
    }

    setIsGeneratingAI(true);
    setAiSuccessMessage(null);

    try {
      const response = await fetch('/api/ai-autofill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: aiBizName,
          businessType: aiBizType,
          about: aiAbout,
          services: aiServices,
          contactInfo: aiContact
        })
      });

      if (!response.ok) {
        throw new Error('Failed to run AI Auto-fill');
      }

      const data = await response.json();
      
      // Successfully generated. Set values in customContent state
      setCustomContent(prev => ({
        ...prev,
        brandName: data.brandName || aiBizName,
        logo: (data.brandName || aiBizName).substring(0, 2).toUpperCase(),
        primaryColor: data.primaryColor || prev.primaryColor,
        secondaryColor: data.secondaryColor || prev.secondaryColor,
        fontFamily: data.fontFamily || prev.fontFamily,
        heroTitle: data.heroTitle || prev.heroTitle,
        heroSubtitle: data.heroSubtitle || prev.heroSubtitle,
        heroCtaText: data.heroCtaText || prev.heroCtaText,
        services: data.services || prev.services,
        pricingCards: data.pricingCards || prev.pricingCards,
        testimonials: data.testimonials || prev.testimonials,
        contactEmail: data.contactEmail || prev.contactEmail || 'contact@client.com',
        contactPhone: data.contactPhone || prev.contactPhone || '+91 9028724168',
        contactAddress: data.contactAddress || prev.contactAddress || 'Pune, India'
      }));

      setAiSuccessMessage("AI auto-filled all components successfully! Check the Live Preview.");
    } catch (err: any) {
      console.error(err);
      alert("AI Generation failed. Please try again.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Drag and drop simulator - move section block up
  const moveSectionUp = (idx: number) => {
    if (idx === 0) return;
    const updated = [...sections];
    const temp = updated[idx];
    updated[idx] = updated[idx - 1];
    updated[idx - 1] = temp;
    setSections(updated);
  };

  // Drag and drop simulator - move section block down
  const moveSectionDown = (idx: number) => {
    if (idx === sections.length - 1) return;
    const updated = [...sections];
    const temp = updated[idx];
    updated[idx] = updated[idx + 1];
    updated[idx + 1] = temp;
    setSections(updated);
  };

  // Delete section
  const deleteSectionBlock = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  // Add reusable section block
  const addSectionBlock = (type: TemplateSection['type']) => {
    const randomId = 'sec-' + Math.random().toString(36).substr(2, 9);
    const newSec: TemplateSection = {
      id: randomId,
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1) + ' Section',
      content: {}
    };
    // Insert before footer if footer exists, otherwise append
    const footerIdx = sections.findIndex(s => s.type === 'footer');
    if (footerIdx !== -1) {
      const updated = [...sections];
      updated.splice(footerIdx, 0, newSec);
      setSections(updated);
    } else {
      setSections([...sections, newSec]);
    }
  };

  // Helper function to map string icon names to Lucide icon components
  const renderIconComponent = (iconName: string) => {
    const props = { className: "w-5 h-5 shrink-0" };
    switch(iconName) {
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Layout': return <Layout {...props} />;
      case 'Search': return <Search {...props} />;
      case 'Phone': return <Phone {...props} />;
      case 'Mail': return <Mail {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'Coffee': return <Coffee {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Home': return <Home {...props} />;
      case 'ShoppingBag': return <ShoppingBag {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  // Dynamic Google Font Loader inject
  const activeFontObj = FONTS_OPTIONS.find(f => f.name.includes(customContent.fontFamily || 'Inter')) || FONTS_OPTIONS[0];
  const googleFontImportLink = `https://fonts.googleapis.com/css2?family=${activeFontObj.importName}:wght@400;500;600;700;800&display=swap`;

  return (
    <div className="space-y-6">
      
      {/* Import the active Google font for live rendering */}
      <link rel="stylesheet" href={googleFontImportLink} />

      {/* Header and Control Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EADBCE]/40 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 bg-[#F4ECE1] hover:bg-[#EADBCE] text-[#312520] rounded-xl transition-all cursor-pointer border border-[#D7C5B2]/30"
            title="Back to Catalog"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] text-[#AA7C11] font-bold uppercase tracking-wider">No-Code Website Studio</span>
            <h2 className="text-xl font-bold text-[#312520] flex items-center gap-2">
              <span>Customizing Layout:</span>
              <span className="text-[#AA7C11] font-bold">{template.name}</span>
            </h2>
          </div>
        </div>

        {/* Sync Actions */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex bg-white/60 p-1 rounded-xl border border-[#EADBCE]/50">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${previewDevice === 'desktop' ? 'bg-[#AA7C11] text-white' : 'text-[#8E7B6E]'}`}
              title="Desktop Preview"
            >
              <Laptop className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${previewDevice === 'mobile' ? 'bg-[#AA7C11] text-white' : 'text-[#8E7B6E]'}`}
              title="Mobile Preview"
            >
              <PhoneIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleSaveConfig}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/15 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Customizations</span>
          </button>
        </div>
      </div>

      {/* Main studio interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Edit Panels (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Tabs header */}
          <div className="flex bg-white/60 p-1.5 rounded-xl border border-[#EADBCE]/50 justify-between gap-1">
            <button
              onClick={() => { setActiveTab('copy'); setAiSuccessMessage(null); }}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${
                activeTab === 'copy' ? 'bg-[#AA7C11] text-white' : 'text-[#5C4C41] hover:text-[#312520]'
              }`}
            >
              Copy Details
            </button>
            <button
              onClick={() => { setActiveTab('branding'); setAiSuccessMessage(null); }}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${
                activeTab === 'branding' ? 'bg-[#AA7C11] text-white' : 'text-[#5C4C41] hover:text-[#312520]'
              }`}
            >
              Branding / Fonts
            </button>
            <button
              onClick={() => { setActiveTab('blocks'); setAiSuccessMessage(null); }}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${
                activeTab === 'blocks' ? 'bg-[#AA7C11] text-white' : 'text-[#5C4C41] hover:text-[#312520]'
              }`}
            >
              Blocks Layout
            </button>
            <button
              onClick={() => { setActiveTab('ai-autofill'); setAiSuccessMessage(null); }}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'ai-autofill' ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-white shadow-md' : 'text-[#AA7C11] hover:text-[#D4AF37]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>AI AutoFill</span>
            </button>
          </div>

          {/* Feedback Area */}
          {aiSuccessMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-medium flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{aiSuccessMessage}</span>
            </div>
          )}

          {/* Tab Content Box */}
          <div className="p-5 rounded-2xl glass border border-[#EADBCE]/35 space-y-5 bg-[#FAF6F0]/20 max-h-[64vh] overflow-y-auto">
            
            {/* TAB: COPY WRITING */}
            {activeTab === 'copy' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#312520] font-serif mb-3">Hero Headline Copy</h4>
                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#8E7B6E] uppercase tracking-widest mb-1.5">Hero Headline Title</label>
                      <input
                        type="text"
                        value={customContent.heroTitle || ''}
                        onChange={(e) => updateContent({ heroTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-white/80 border border-[#EADBCE] rounded-xl text-xs text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#8E7B6E] uppercase tracking-widest mb-1.5">Hero Subtitle</label>
                      <textarea
                        rows={2}
                        value={customContent.heroSubtitle || ''}
                        onChange={(e) => updateContent({ heroSubtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-white/80 border border-[#EADBCE] rounded-xl text-xs text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#8E7B6E] uppercase tracking-widest mb-1.5">Hero CTA Button Text</label>
                      <input
                        type="text"
                        value={customContent.heroCtaText || ''}
                        onChange={(e) => updateContent({ heroCtaText: e.target.value })}
                        className="w-full px-3 py-2 bg-white/80 border border-[#EADBCE] rounded-xl text-xs text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#EADBCE]/50 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#312520] font-serif mb-3">Core Custom Services (Exactly 3)</h4>
                  <div className="space-y-4">
                    {customContent.services?.map((service, index) => (
                      <div key={index} className="p-3.5 rounded-xl bg-white/70 border border-[#EADBCE]/40 space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#AA7C11]/10 text-[#AA7C11] text-[10px] font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-[10px] font-semibold text-[#8E7B6E] uppercase tracking-wider">Service Card {index + 1}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-1">
                            <label className="block text-[9px] text-[#8E7B6E] uppercase font-semibold mb-1">Lucide Icon</label>
                            <select
                              value={service.icon}
                              onChange={(e) => {
                                const list = [...(customContent.services || [])];
                                list[index].icon = e.target.value;
                                updateContent({ services: list });
                              }}
                              className="w-full px-2 py-1.5 bg-white border border-[#EADBCE] rounded-lg text-[10px] text-[#312520]"
                            >
                              {['Sparkles', 'Shield', 'Briefcase', 'Layout', 'Search', 'Phone', 'Mail', 'Heart', 'Coffee', 'Activity', 'Home', 'ShoppingBag'].map(i => (
                                <option key={i} value={i}>{i}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-2">
                            <label className="block text-[9px] text-[#8E7B6E] uppercase font-semibold mb-1">Service Title</label>
                            <input
                              type="text"
                              value={service.title}
                              onChange={(e) => {
                                const list = [...(customContent.services || [])];
                                list[index].title = e.target.value;
                                updateContent({ services: list });
                              }}
                              className="w-full px-2 py-1.5 bg-white border border-[#EADBCE] rounded-lg text-[10px] text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[9px] text-[#8E7B6E] uppercase font-semibold mb-1">Service Description</label>
                          <textarea
                            rows={1.5}
                            value={service.desc}
                            onChange={(e) => {
                              const list = [...(customContent.services || [])];
                              list[index].desc = e.target.value;
                              updateContent({ services: list });
                            }}
                            className="w-full px-2 py-1.5 bg-white border border-[#EADBCE] rounded-lg text-[10px] text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#EADBCE]/50 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#312520] font-serif mb-3">Contact and Social Channels</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[9px] text-[#8E7B6E] uppercase font-semibold mb-1">Contact Email</label>
                      <input
                        type="email"
                        value={customContent.contactEmail || ''}
                        onChange={(e) => updateContent({ contactEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-white/80 border border-[#EADBCE] rounded-xl text-xs text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-[#8E7B6E] uppercase font-semibold mb-1">Contact Phone</label>
                      <input
                        type="text"
                        value={customContent.contactPhone || ''}
                        onChange={(e) => updateContent({ contactPhone: e.target.value })}
                        className="w-full px-3 py-2 bg-white/80 border border-[#EADBCE] rounded-xl text-xs text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[9px] text-[#8E7B6E] uppercase font-semibold mb-1">Office / Operations Location</label>
                      <input
                        type="text"
                        value={customContent.contactAddress || ''}
                        onChange={(e) => updateContent({ contactAddress: e.target.value })}
                        className="w-full px-3 py-2 bg-white/80 border border-[#EADBCE] rounded-xl text-xs text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: BRANDING AND TYPOGRAPHY */}
            {activeTab === 'branding' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#312520] font-serif mb-3">Identity Logo & Brand Title</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className="block text-[9px] text-[#8E7B6E] uppercase font-semibold mb-1">Text Logo</label>
                      <input
                        type="text"
                        maxLength={4}
                        value={customContent.logo || ''}
                        onChange={(e) => updateContent({ logo: e.target.value })}
                        className="w-full px-3 py-2 bg-white/80 border border-[#EADBCE] rounded-xl text-xs text-[#312520] font-bold tracking-widest text-center focus:outline-none focus:border-[#AA7C11]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] text-[#8E7B6E] uppercase font-semibold mb-1">Business Name Display</label>
                      <input
                        type="text"
                        value={customContent.brandName || ''}
                        onChange={(e) => updateContent({ brandName: e.target.value })}
                        className="w-full px-3 py-2 bg-white/80 border border-[#EADBCE] rounded-xl text-xs text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#EADBCE]/50 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#312520] font-serif mb-3">Design Color Accents</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] text-[#8E7B6E] uppercase font-semibold mb-1 flex items-center gap-1">
                        <Palette className="w-3.5 h-3.5 text-[#AA7C11]" />
                        <span>Primary Color</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={customContent.primaryColor}
                          onChange={(e) => updateContent({ primaryColor: e.target.value })}
                          className="w-10 h-9 p-0 bg-transparent border-none rounded cursor-pointer shrink-0"
                        />
                        <input
                          type="text"
                          value={customContent.primaryColor}
                          onChange={(e) => updateContent({ primaryColor: e.target.value })}
                          className="w-full px-2 py-1 bg-white border border-[#EADBCE] rounded-lg text-xs font-mono text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] text-[#8E7B6E] uppercase font-semibold mb-1 flex items-center gap-1">
                        <Palette className="w-3.5 h-3.5 text-[#AA7C11]" />
                        <span>Secondary Color</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={customContent.secondaryColor}
                          onChange={(e) => updateContent({ secondaryColor: e.target.value })}
                          className="w-10 h-9 p-0 bg-transparent border-none rounded cursor-pointer shrink-0"
                        />
                        <input
                          type="text"
                          value={customContent.secondaryColor}
                          onChange={(e) => updateContent({ secondaryColor: e.target.value })}
                          className="w-full px-2 py-1 bg-white border border-[#EADBCE] rounded-lg text-xs font-mono text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#EADBCE]/50 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#312520] font-serif mb-3 flex items-center gap-1.5">
                    <FontIcon className="w-4 h-4 text-[#AA7C11]" />
                    <span>Brand Typography Fonts</span>
                  </h4>
                  <div className="space-y-1.5">
                    {FONTS_OPTIONS.map(font => (
                      <button
                        key={font.name}
                        type="button"
                        onClick={() => updateContent({ fontFamily: font.value })}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          customContent.fontFamily === font.value 
                            ? 'bg-[#AA7C11]/10 border-[#AA7C11] text-[#AA7C11]' 
                            : 'bg-white/70 border border-[#EADBCE]/60 text-[#5C4C41] hover:text-[#312520]'
                        }`}
                        style={{ fontFamily: font.value }}
                      >
                        <span>{font.name}</span>
                        {customContent.fontFamily === font.value && <Check className="w-4 h-4 text-[#AA7C11]" />}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: REUSABLE SECTION BLOCKS */}
            {activeTab === 'blocks' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#312520] font-serif">Arrange Website Sections</h4>
                  <p className="text-[10px] text-[#5C4C41] mt-0.5 mb-3">Re-order blocks, toggle active visibility, or add custom landing layout rows.</p>
                  
                  <div className="space-y-2.5">
                    {sections.map((sec, idx) => (
                      <div key={sec.id} className="p-3 bg-white/75 border border-[#EADBCE]/50 rounded-xl flex items-center justify-between gap-3 group">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#8E7B6E]">{idx + 1}</span>
                          <div>
                            <span className="text-xs font-bold text-[#312520] block">{sec.title}</span>
                            <span className="text-[9px] text-[#AA7C11] uppercase tracking-widest block font-bold">{sec.type} block</span>
                          </div>
                        </div>

                        {/* Arrange Controls */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveSectionUp(idx)}
                            className="p-1 hover:bg-[#F4ECE1] disabled:opacity-20 text-[#8E7B6E] hover:text-[#312520] rounded transition-colors cursor-pointer"
                            title="Move Block Up"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            disabled={idx === sections.length - 1}
                            onClick={() => moveSectionDown(idx)}
                            className="p-1 hover:bg-[#F4ECE1] disabled:opacity-20 text-[#8E7B6E] hover:text-[#312520] rounded transition-colors cursor-pointer"
                            title="Move Block Down"
                          >
                            ▼
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteSectionBlock(sec.id)}
                            className="p-1 hover:bg-red-500/10 text-red-500/60 hover:text-red-600 rounded transition-colors cursor-pointer"
                            title="Delete Block"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#EADBCE]/50 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#312520] font-serif mb-2 flex items-center gap-1">
                    <Plus className="w-4 h-4 text-[#AA7C11]" />
                    <span>Insert Section Blocks</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['hero', 'services', 'testimonials', 'pricing', 'faq', 'contact', 'footer'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => addSectionBlock(type as any)}
                        className="p-2.5 bg-white/80 hover:bg-white border border-[#EADBCE] rounded-xl text-[10px] font-bold text-[#5C4C41] text-left hover:border-[#AA7C11]/50 transition-colors cursor-pointer"
                      >
                        + Add {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: AI AUTO-FILL SYSTEM */}
            {activeTab === 'ai-autofill' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#C5A86B]/10 border border-[#C5A86B]/20 text-[#AA7C11] flex gap-2">
                  <Sparkles className="w-5 h-5 text-[#AA7C11] shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-relaxed">
                    <strong>AI Smart Fill:</strong> Supply basic business parameters below, and the server-side Gemini 3.5 model will generate coordinating layout content, custom pricing scales, styled services lists, and hex color pairings!
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[9px] font-semibold text-[#8E7B6E] uppercase tracking-widest mb-1">Company Display Name</label>
                    <input
                      type="text"
                      value={aiBizName}
                      onChange={(e) => setAiBizName(e.target.value)}
                      placeholder="e.g. FitPulse Elite"
                      className="w-full px-3 py-2 bg-white border border-[#EADBCE] rounded-xl text-xs text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-semibold text-[#8E7B6E] uppercase tracking-widest mb-1">Business Type Category</label>
                    <select
                      value={aiBizType}
                      onChange={(e) => setAiBizType(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#EADBCE] rounded-xl text-xs text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                    >
                      {['Restaurant', 'Gym', 'Salon', 'Real Estate', 'Clinic', 'E-commerce', 'Portfolio', 'Agency', 'Consulting', 'Software SaaS'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-semibold text-[#8E7B6E] uppercase tracking-widest mb-1">About / Core Focus description</label>
                    <textarea
                      rows={2.5}
                      value={aiAbout}
                      onChange={(e) => setAiAbout(e.target.value)}
                      placeholder="A high-end boutique fitness studio in Mumbai offering personalized CrossFit, Pilates, and nutritionist coaches..."
                      className="w-full px-3 py-2 bg-white border border-[#EADBCE] rounded-xl text-xs text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-semibold text-[#8E7B6E] uppercase tracking-widest mb-1">Coordinating Services (Optional)</label>
                    <input
                      type="text"
                      value={aiServices}
                      onChange={(e) => setAiServices(e.target.value)}
                      placeholder="Crossfit groups, 1-on-1 diet advice, luxury lockers"
                      className="w-full px-3 py-2 bg-white border border-[#EADBCE] rounded-xl text-xs text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-semibold text-[#8E7B6E] uppercase tracking-widest mb-1">Location / Contact Details</label>
                    <input
                      type="text"
                      value={aiContact}
                      onChange={(e) => setAiContact(e.target.value)}
                      placeholder="Bandra West, Mumbai. contact@fitpulse.in"
                      className="w-full px-3 py-2 bg-white border border-[#EADBCE] rounded-xl text-xs text-[#312520] focus:outline-none focus:border-[#AA7C11]"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={isGeneratingAI || !aiBizName}
                    onClick={handleAIGenerate}
                    id="ai-customizer-autofill-btn"
                    className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:from-[#E5C483] hover:to-[#8C6207] disabled:bg-[#FAF6F0] disabled:text-[#8E7B6E] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#AA7C11]/15 flex items-center justify-center gap-2 cursor-pointer border border-[#AA7C11]/20"
                  >
                    {isGeneratingAI ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                        <span>AI Generating Content...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>AI Auto-Fill Website</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Quick tips */}
          <div className="p-4 rounded-2xl bg-[#F4ECE1]/65 border border-[#EADBCE]/60 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#AA7C11] mt-0.5 shrink-0" />
            <p className="text-[10px] text-[#5C4C41] leading-normal">
              <strong>Live Layout:</strong> Double check that you hit <strong>Publish Customizations</strong> on the top right to store your layouts inside the spec db permanently.
            </p>
          </div>

        </div>

        {/* Right Column: Live Web Demo Frame (Col 7) */}
        <div className="lg:col-span-7">
          
          {/* Webframe container */}
          <div className="rounded-2xl border border-gray-800 bg-gray-950 overflow-hidden flex flex-col shadow-2xl transition-all">
            
            {/* Browser top chrome bar */}
            <div className="px-4 py-3 bg-gray-900 border-b border-gray-850 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              </div>

              {/* URL address bar */}
              <div className="flex-grow max-w-lg mx-auto bg-black/40 border border-gray-800 px-3 py-1.5 rounded-lg flex items-center gap-2 text-[10px] text-gray-400 font-mono select-none overflow-hidden truncate">
                <Globe className="w-3.5 h-3.5 text-cyan-500" />
                <span>https://{customContent.brandName?.toLowerCase().replace(/\s+/g, '-') || 'preview'}.webora.ai</span>
              </div>

              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest shrink-0">
                Live Demo Preview
              </div>
            </div>

            {/* Inner frame viewport canvas */}
            <div 
              className={`bg-slate-950 overflow-y-auto relative mx-auto transition-all ${
                previewDevice === 'mobile' ? 'w-full max-w-[375px] h-[550px] border-x border-gray-800' : 'w-full h-[550px]'
              }`}
              style={{ fontFamily: customContent.fontFamily || 'Inter, sans-serif' }}
            >
              
              {/* Dynamic Theme Colors */}
              <style dangerouslySetInnerHTML={{__html: `
                :root {
                  --client-primary: ${customContent.primaryColor || '#3b82f6'};
                  --client-secondary: ${customContent.secondaryColor || '#06b6d4'};
                }
              `}} />

              {/* Loop and render ordered section blocks */}
              {sections.map((section) => {
                switch (section.type) {
                  
                  // SECTION: HERO
                  case 'hero':
                    return (
                      <div key={section.id} className="relative py-16 px-6 bg-gradient-to-b from-gray-900 to-black overflow-hidden flex flex-col items-center text-center border-b border-gray-900">
                        {/* Mesh gradient dots */}
                        <div className="absolute inset-0 bg-[radial-gradient(#2c2c2c_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
                        
                        {/* Header Navbar Simulator inside canvas */}
                        <div className="w-full flex items-center justify-between gap-4 mb-12 max-w-5xl relative z-10">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg text-xs font-black flex items-center justify-center text-white" style={{ backgroundColor: 'var(--client-primary)' }}>
                              {customContent.logo || 'L'}
                            </span>
                            <span className="text-sm font-black text-white tracking-tight">{customContent.brandName || 'Brand'}</span>
                          </div>
                          <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            <span>Services</span>
                            <span>Pricing</span>
                            <span>Contact</span>
                          </div>
                        </div>

                        <div className="max-w-xl space-y-4 relative z-10 my-6">
                          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                            {customContent.heroTitle || 'Your Ultimate Custom Business Presence'}
                          </h1>
                          <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                            {customContent.heroSubtitle || 'Beautiful high-performance specifications generated to increase operations and sales.'}
                          </p>
                          <div className="pt-4 flex gap-3 justify-center">
                            <button 
                              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:scale-105 transition-all cursor-pointer"
                              style={{ backgroundColor: 'var(--client-primary)', boxShadow: '0 4px 14px var(--client-primary)' }}
                            >
                              {customContent.heroCtaText || 'Get Started Now'}
                            </button>
                            <button className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gray-800 hover:bg-gray-750 text-white border border-gray-700 transition-colors">
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    );

                  // SECTION: SERVICES
                  case 'services':
                    return (
                      <div key={section.id} className="py-12 px-6 bg-black border-b border-gray-900">
                        <div className="max-w-4xl mx-auto space-y-8">
                          <div className="text-center space-y-2">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">WHAT WE OFFER</span>
                            <h2 className="text-xl font-bold text-white tracking-tight">Our Premium Core Services</h2>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {customContent.services?.map((serv, i) => (
                              <div key={i} className="p-5 rounded-2xl bg-gray-900/40 border border-gray-850 space-y-3 hover:border-gray-700 transition-all">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: 'var(--client-primary)' }}>
                                  {renderIconComponent(serv.icon)}
                                </div>
                                <h3 className="text-sm font-bold text-white">{serv.title}</h3>
                                <p className="text-[11px] text-gray-400 leading-relaxed">{serv.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );

                  // SECTION: TESTIMONIALS
                  case 'testimonials':
                    return (
                      <div key={section.id} className="py-12 px-6 bg-gray-900/30 border-b border-gray-900">
                        <div className="max-w-4xl mx-auto space-y-8">
                          <div className="text-center space-y-2">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400">SUCCESS STORIES</span>
                            <h2 className="text-xl font-bold text-white tracking-tight">What Clients Say About Us</h2>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {customContent.testimonials?.map((test, i) => (
                              <div key={i} className="p-6 rounded-2xl bg-gray-950 border border-gray-850 space-y-4 flex flex-col justify-between">
                                <p className="text-xs text-gray-300 italic leading-relaxed">
                                  "{test.text}"
                                </p>
                                <div className="flex items-center gap-3 pt-2">
                                  <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center font-bold text-xs text-white">
                                    {test.name.substring(0, 2).toUpperCase()}
                                  </div>
                                  <div>
                                    <span className="text-xs font-bold text-white block">{test.name}</span>
                                    <span className="text-[10px] text-gray-500 block">{test.role}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );

                  // SECTION: PRICING
                  case 'pricing':
                    return (
                      <div key={section.id} className="py-12 px-6 bg-black border-b border-gray-900">
                        <div className="max-w-4xl mx-auto space-y-8">
                          <div className="text-center space-y-2">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">MEMBERSHIPS & PLAN</span>
                            <h2 className="text-xl font-bold text-white tracking-tight">Flexible, Transparent Pricing</h2>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {customContent.pricingCards?.map((plan, i) => {
                              const isPopular = plan.highlight;
                              return (
                                <div 
                                  key={i} 
                                  className={`p-5 rounded-2xl flex flex-col justify-between h-full border ${
                                    isPopular 
                                      ? 'bg-gray-900/80 border-blue-500 scale-[1.03] shadow-lg shadow-blue-500/5' 
                                      : 'bg-gray-950 border-gray-850'
                                  }`}
                                >
                                  <div>
                                    {isPopular && (
                                      <span className="px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-blue-600 text-white rounded-full inline-block mb-3">
                                        Most Popular
                                      </span>
                                    )}
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{plan.planName}</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                      <span className="text-xl font-extrabold text-white">{plan.price}</span>
                                      <span className="text-[10px] text-gray-500">{plan.period}</span>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2 mb-6">
                                      {plan.features.map((feat, k) => (
                                        <div key={k} className="flex items-start gap-1.5 text-[10px] text-gray-400">
                                          <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                                          <span>{feat}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <button 
                                    className="w-full py-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                                    style={{ 
                                      backgroundColor: isPopular ? 'var(--client-primary)' : '#1e293b',
                                      color: '#fff'
                                    }}
                                  >
                                    Get {plan.planName}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );

                  // SECTION: CONTACT
                  case 'contact':
                    return (
                      <div key={section.id} className="py-12 px-6 bg-gray-900/20 border-b border-gray-900">
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <div className="space-y-4">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">GET IN TOUCH</span>
                            <h2 className="text-xl font-bold text-white tracking-tight">Schedule Your Consultation</h2>
                            <p className="text-[11px] text-gray-400 leading-relaxed">
                              Have questions or want a tailored proposal? Write to us or call our hotline. We revert inside 1-2 hours.
                            </p>

                            <div className="space-y-2 text-[11px] text-gray-300">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-cyan-400" />
                                <span>{customContent.contactEmail || 'contact@client-brand.com'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <span>{customContent.contactPhone || '+91 9028724168'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-purple-400" />
                                <span>{customContent.contactAddress || 'Pune, India'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Contact form mockup */}
                          <div className="p-5 rounded-2xl bg-gray-950 border border-gray-850 space-y-3">
                            <input 
                              type="text" 
                              disabled 
                              placeholder="Your Name" 
                              className="w-full bg-gray-900 border border-gray-850 rounded-lg px-3 py-1.5 text-[10px] text-gray-400 focus:outline-none" 
                            />
                            <input 
                              type="email" 
                              disabled 
                              placeholder="Your Email" 
                              className="w-full bg-gray-900 border border-gray-850 rounded-lg px-3 py-1.5 text-[10px] text-gray-400 focus:outline-none" 
                            />
                            <textarea 
                              disabled 
                              rows={2.5} 
                              placeholder="Briefly describe your goals..." 
                              className="w-full bg-gray-900 border border-gray-850 rounded-lg px-3 py-1.5 text-[10px] text-gray-400 focus:outline-none" 
                            />
                            <button 
                              className="w-full py-2 rounded-lg text-[10px] font-bold text-white transition-all cursor-pointer"
                              style={{ backgroundColor: 'var(--client-primary)' }}
                            >
                              Send Message
                            </button>
                          </div>
                        </div>
                      </div>
                    );

                  // SECTION: FOOTER
                  case 'footer':
                    return (
                      <div key={section.id} className="py-8 px-6 bg-black border-b border-gray-950 text-center space-y-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className="w-6 h-6 rounded text-[10px] font-black flex items-center justify-center text-white" style={{ backgroundColor: 'var(--client-primary)' }}>
                            {customContent.logo || 'L'}
                          </span>
                          <span className="text-xs font-bold text-white tracking-tight">{customContent.brandName || 'Brand'}</span>
                        </div>
                        
                        <p className="text-[10px] text-gray-500">
                          © {new Date().getFullYear()} {customContent.brandName}. All rights reserved. Powered by Webora AI.
                        </p>
                      </div>
                    );

                  default:
                    return null;
                }
              })}

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
