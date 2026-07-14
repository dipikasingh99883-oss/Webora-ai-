import { useState } from 'react';
import { Template } from '../types';
import { Layers, Eye, Check } from 'lucide-react';

interface TemplateGridProps {
  selectedTemplateId: string | null;
  onSelectTemplate: (template: Template) => void;
  templates: Template[];
}

export default function TemplateGrid({ selectedTemplateId, onSelectTemplate, templates }: TemplateGridProps) {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const categories = ['All', 'SaaS & Tech', 'Creative & Portfolio', 'E-commerce', 'Business & Agency', 'Health & Wellness'];

  // Only display active templates to end-users (Drafts are kept hidden for admin design)
  const displayTemplates = templates.filter(t => (t.status || 'Active') === 'Active');

  const filteredTemplates = activeTab === 'All'
    ? displayTemplates
    : displayTemplates.filter(t => t.category === activeTab);

  return (
    <div className="space-y-8">
      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-[#EADBCE]/50">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer ${
              activeTab === cat
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-white shadow-md shadow-[#AA7C11]/15'
                : 'text-[#5C4C41] hover:text-[#312520] bg-white/60 hover:bg-white border border-[#EADBCE]/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          return (
            <div
              key={template.id}
              className={`group relative overflow-hidden rounded-2xl glass transition-all hover:-translate-y-1 duration-300 flex flex-col ${
                isSelected ? 'ring-2 ring-[#AA7C11] bg-white/80' : 'hover:border-[#C5A86B]/40'
              }`}
            >
              {/* Template Cover Image */}
              <div className="relative aspect-video overflow-hidden bg-[#FAF6F0]">
                <img
                  referrerPolicy="no-referrer"
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#FAF6F0]/95 backdrop-blur-md text-[#AA7C11] border border-[#C5A86B]/20">
                  {template.complexity} Complexity
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#312520] mb-2">{template.name}</h4>
                  <p className="text-xs text-[#5C4C41] leading-relaxed mb-4">{template.description}</p>
                </div>

                <div className="space-y-4">
                  {/* Features Bullets */}
                  <div className="flex flex-wrap gap-1.5">
                    {template.features.slice(0, 3).map((f, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-[#F4ECE1] border border-[#EADBCE]/50 text-[#312520] px-2 py-0.5 rounded">
                        • {f}
                      </span>
                    ))}
                    {template.features.length > 3 && (
                      <span className="text-[10px] text-[#8E7B6E] font-semibold italic pl-1">+{template.features.length - 3} more</span>
                    )}
                  </div>

                  {/* CTA row */}
                  <div className="flex gap-2.5 pt-2">
                    <button
                      onClick={() => setPreviewTemplate(template)}
                      className="flex-1 py-2 rounded-xl bg-[#F4ECE1] hover:bg-[#EADBCE] text-[#312520] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#D7C5B2]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => onSelectTemplate(template)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:from-[#E5C483] hover:to-[#8C6207] text-white border border-[#AA7C11]/20'
                      }`}
                    >
                      {isSelected ? <Check className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                      <span>{isSelected ? 'Selected' : 'Select'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details/Preview Drawer Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1310]/60 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-2xl glass border border-[#EADBCE]/35 relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-[#FAF6F0]">
              <img
                referrerPolicy="no-referrer"
                src={previewTemplate.image}
                alt={previewTemplate.name}
                className="w-full h-full object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] to-transparent"></div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="absolute top-4 right-4 text-[#312520] hover:text-red-600 transition-colors p-1.5 rounded-full bg-white/80 backdrop-blur-md"
              >
                <XIcon className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-xs uppercase font-bold tracking-widest text-[#AA7C11] mb-1 block">
                  {previewTemplate.category}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#312520] tracking-tight">{previewTemplate.name}</h3>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-[#352922]">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E7B6E] mb-2">Template Overview</h4>
                <p className="text-sm text-[#5C4C41] leading-relaxed">{previewTemplate.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E7B6E] mb-3">Included High-End Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {previewTemplate.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-[#5C4C41] bg-[#F4ECE1]/50 border border-[#EADBCE]/45 p-2.5 rounded-xl">
                      <Check className="w-4.5 h-4.5 text-[#AA7C11] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#EADBCE]/30 flex justify-end gap-3">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-5 py-2.5 rounded-xl border border-[#D7C5B2]/30 bg-[#F4ECE1] text-[#312520] text-sm font-semibold hover:bg-[#EADBCE] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onSelectTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:from-[#E5C483] hover:to-[#8C6207] text-white text-sm font-semibold flex items-center gap-1.5 shadow-lg border border-[#AA7C11]/20 transition-colors cursor-pointer"
                >
                  <Layers className="w-4.5 h-4.5" />
                  <span>Choose This Template</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple internal helper SVG X Icon so we don't have to keep imports messy
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
  );
}
