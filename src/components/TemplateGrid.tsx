import { useState } from 'react';
import { Template } from '../types';
import { Layers, Eye, Check, ExternalLink } from 'lucide-react';

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
      <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer ${
              activeTab === cat
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10'
                : 'text-gray-400 hover:text-white bg-gray-800/40 hover:bg-gray-850'
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
                isSelected ? 'ring-2 ring-blue-500 bg-gray-900/40' : 'hover:border-gray-700'
              }`}
            >
              {/* Template Cover Image */}
              <div className="relative aspect-video overflow-hidden bg-gray-950">
                <img
                  referrerPolicy="no-referrer"
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/20">
                  {template.complexity} Complexity
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{template.name}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{template.description}</p>
                </div>

                <div className="space-y-4">
                  {/* Features Bullets */}
                  <div className="flex flex-wrap gap-1.5">
                    {template.features.slice(0, 3).map((f, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-gray-800/70 border border-gray-750 text-gray-300 px-2 py-0.5 rounded">
                        • {f}
                      </span>
                    ))}
                    {template.features.length > 3 && (
                      <span className="text-[10px] text-gray-400 font-semibold italic pl-1">+{template.features.length - 3} more</span>
                    )}
                  </div>

                  {/* CTA row */}
                  <div className="flex gap-2.5 pt-2">
                    <button
                      onClick={() => setPreviewTemplate(template)}
                      className="flex-1 py-2 rounded-xl bg-gray-800 hover:bg-gray-750 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-gray-700 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => onSelectTemplate(template)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-white glow-emerald shadow-lg'
                          : 'bg-blue-600 hover:bg-blue-500 text-white'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-2xl glass glow-cyan relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-gray-950">
              <img
                referrerPolicy="no-referrer"
                src={previewTemplate.image}
                alt={previewTemplate.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors p-1.5 rounded-full bg-black/60 backdrop-blur-md"
              >
                <XIcon className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 mb-1 block">
                  {previewTemplate.category}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{previewTemplate.name}</h3>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Template Overview</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{previewTemplate.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Included High-End Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {previewTemplate.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-300 bg-gray-800/35 border border-gray-750 p-2.5 rounded-xl">
                      <Check className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-gray-300 text-sm font-semibold hover:bg-gray-750 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onSelectTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/10 transition-colors cursor-pointer"
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
