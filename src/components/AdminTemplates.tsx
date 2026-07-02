import React, { useState } from 'react';
import { Template } from '../types';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash, 
  Eye, 
  Compass, 
  Tags, 
  Palette, 
  Layers, 
  ExternalLink,
  Sliders,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

interface AdminTemplatesProps {
  templates: Template[];
  onAddTemplate: (template: Omit<Template, 'id'> & { id?: string }) => Promise<void>;
  onEditTemplate: (template: Template) => Promise<void>;
  onDeleteTemplate: (id: string) => Promise<void>;
  onOpenCustomizer: (template: Template) => void;
  onViewDemo: (template: Template) => void;
}

const CATEGORIES = ['All', 'SaaS & Tech', 'Creative & Portfolio', 'E-commerce', 'Business & Agency', 'Health & Wellness', 'Gym', 'Restaurant', 'Salon', 'Real Estate', 'Clinic'];

export default function AdminTemplates({
  templates,
  onAddTemplate,
  onEditTemplate,
  onDeleteTemplate,
  onOpenCustomizer,
  onViewDemo
}: AdminTemplatesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Active' | 'Draft'>('All');
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  // Form Fields State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('SaaS & Tech');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [pricingRange, setPricingRange] = useState('$499 - $899');
  const [complexity, setComplexity] = useState<'Simple' | 'Medium' | 'Complex'>('Medium');
  const [status, setStatus] = useState<'Active' | 'Draft'>('Active');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#06b6d4');
  
  // Tags and Features arrays
  const [featureInput, setFeatureInput] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  // Initialize form for adding a template
  const openAddForm = () => {
    setEditingTemplate(null);
    setName('');
    setCategory('SaaS & Tech');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80');
    setDemoUrl('');
    setPricingRange('$499 - $899');
    setComplexity('Medium');
    setStatus('Active');
    setPrimaryColor('#3b82f6');
    setSecondaryColor('#06b6d4');
    setFeatures(['Premium Layout', 'Custom Contact Form', 'Fully Responsive UI']);
    setTags(['Fast', 'AI-Ready']);
    setIsFormOpen(true);
  };

  // Initialize form for editing a template
  const openEditForm = (t: Template) => {
    setEditingTemplate(t);
    setName(t.name);
    setCategory(t.category);
    setDescription(t.description);
    setImage(t.image);
    setDemoUrl(t.demoUrl || '');
    setPricingRange(t.pricingRange || '$499 - $899');
    setComplexity(t.complexity);
    setStatus(t.status || 'Active');
    setPrimaryColor(t.primaryColor || '#3b82f6');
    setSecondaryColor(t.secondaryColor || '#06b6d4');
    setFeatures(t.features || []);
    setTags(t.tags || []);
    setIsFormOpen(true);
  };

  const handleAddFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (f: string) => {
    setFeatures(features.filter(item => item !== f));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tg: string) => {
    setTags(tags.filter(item => item !== tg));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !image) return;

    const templatePayload = {
      name,
      category,
      description,
      image,
      features,
      complexity,
      demoUrl,
      pricingRange,
      status,
      primaryColor,
      secondaryColor,
      tags,
      createdAt: editingTemplate?.createdAt || new Date().toISOString(),
      customContent: editingTemplate?.customContent || {
        brandName: name,
        logo: name.substring(0, 2).toUpperCase(),
        primaryColor,
        secondaryColor,
        heroTitle: `Stunning Websites Built for ${name}`,
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
          { name: 'Sanjay Deshmukh', role: 'Real Estate Developer', text: 'Webora AI transformed our clinic lead pages overnight. Outstanding layout speed and custom conversion paths.' },
          { name: 'Elena Rostova', role: 'SaaS Founder', text: 'Built our fully loaded software product mockups in 72 hours flat. Exceptional clean aesthetics!' }
        ]
      }
    };

    if (editingTemplate) {
      await onEditTemplate({ ...templatePayload, id: editingTemplate.id });
    } else {
      await onAddTemplate(templatePayload);
    }
    setIsFormOpen(false);
  };

  // Filter templates
  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || (t.status || 'Active') === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-2xl border border-gray-850">
        
        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3 flex-grow">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search layouts by keyword..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5 bg-gray-950 border border-gray-800 px-3 py-2 rounded-xl">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-xs text-white border-none focus:outline-none cursor-pointer"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c} className="bg-gray-950">{c} Category</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-gray-950 border border-gray-800 px-3 py-2 rounded-xl">
            <Sliders className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="bg-transparent text-xs text-white border-none focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-gray-950">All Statuses</option>
              <option value="Active" className="bg-gray-950">Active Only</option>
              <option value="Draft" className="bg-gray-950">Draft Only</option>
            </select>
          </div>
        </div>

        {/* Add Template Action Button */}
        <button
          onClick={openAddForm}
          id="admin-add-template-btn"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Website Template</span>
        </button>

      </div>

      {/* Grid of editable templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const isDraft = template.status === 'Draft';
          return (
            <div
              key={template.id}
              className="group relative rounded-2xl glass border border-gray-800 hover:border-gray-750 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image Banner */}
              <div className="relative aspect-video bg-gray-950 overflow-hidden">
                <img
                  referrerPolicy="no-referrer"
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                
                {/* Status Badges overlay */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className={`px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-full ${
                    isDraft 
                      ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20' 
                      : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {template.status || 'Active'}
                  </span>
                  <span className="px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-full bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/20">
                    {template.complexity}
                  </span>
                </div>

                {/* Cover Hover View Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => onViewDemo(template)}
                    className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-850 text-white border border-gray-700 hover:scale-105 transition-all cursor-pointer"
                    title="Live Demo Preview"
                  >
                    <Eye className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={() => onOpenCustomizer(template)}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1 hover:scale-105 transition-all cursor-pointer"
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Customize</span>
                  </button>
                </div>
              </div>

              {/* Info Container */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">{template.category}</span>
                    <span className="text-xs font-semibold text-gray-400">{template.pricingRange || '$499'}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{template.name}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{template.description}</p>
                </div>

                {/* Tags */}
                {template.tags && template.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {template.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] bg-gray-850 border border-gray-800 text-gray-400 px-1.5 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-gray-850 my-4"></div>

                {/* Bottom Actions Row */}
                <div className="flex items-center justify-between gap-2">
                  {/* Edit Meta Form */}
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => openEditForm(template)}
                      className="px-2.5 py-1.5 bg-gray-850 hover:bg-gray-800 border border-gray-750 text-gray-300 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Meta</span>
                    </button>
                    <button
                      onClick={() => onOpenCustomizer(template)}
                      className="px-2.5 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Customizer</span>
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => onDeleteTemplate(template.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                    title="Delete Template"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-over or Popup Dialog Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden my-8">
            
            {/* Header */}
            <div className="p-6 bg-gray-950 border-b border-gray-850 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Compass className="w-5.5 h-5.5 text-cyan-400" />
                  <span>{editingTemplate ? 'Modify Template Metadata' : 'Create Dynamic Website Template'}</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">Configure layout, specs, tags, and pricing targets for Firestore.</p>
              </div>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Field 1: Name and Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Template Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sapphire Salon, Retro Gym"
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Industry Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {CATEGORIES.slice(1).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 2: Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Short Description</label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="High-conversion minimalist beauty salon template optimized for mobile booking..."
                  className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Field 3: Thumbnail and Demo URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Thumbnail Image URL</label>
                  <input
                    type="text"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">External Demo URL (Optional)</label>
                  <input
                    type="text"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://client-demo.webora.ai"
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Field 4: Complexity, Pricing, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Complexity Tier</label>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Simple">Simple</option>
                    <option value="Medium">Medium</option>
                    <option value="Complex">Complex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Pricing Range</label>
                  <input
                    type="text"
                    required
                    value={pricingRange}
                    onChange={(e) => setPricingRange(e.target.value)}
                    placeholder="e.g. $499 - $899"
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Publish Status</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStatus('Active')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-transparent text-gray-400 border-gray-800 hover:bg-gray-850'
                      }`}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus('Draft')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        status === 'Draft'
                          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                          : 'bg-transparent text-gray-400 border-gray-800 hover:bg-gray-850'
                      }`}
                    >
                      Draft
                    </button>
                  </div>
                </div>
              </div>

              {/* Field 5: Brand Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-blue-400" />
                    <span>Primary Color Accent</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-11 h-10 p-0 bg-transparent border-none rounded-lg cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Secondary Color Accent</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-11 h-10 p-0 bg-transparent border-none rounded-lg cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Field 6: Core Features Included */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-gray-400" />
                  <span>Website Spec Features</span>
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. Instant Online Booking, Real-time SMS notifications"
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none"
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2.5 bg-gray-800 hover:bg-gray-750 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-gray-950/40 border border-gray-850">
                  {features.length === 0 ? (
                    <span className="text-gray-500 text-xs italic">No features added yet.</span>
                  ) : (
                    features.map((f, i) => (
                      <span key={i} className="text-xs bg-gray-850 border border-gray-750 text-gray-300 px-3 py-1 rounded-lg flex items-center gap-1.5">
                        <span>{f}</span>
                        <button type="button" onClick={() => handleRemoveFeature(f)} className="text-gray-500 hover:text-white">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Field 7: Template Tags */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                  <Tags className="w-3.5 h-3.5 text-gray-400" />
                  <span>Tags</span>
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="e.g. Modern, SinglePage, MultiUser"
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none"
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2.5 bg-gray-800 hover:bg-gray-750 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-gray-950/40 border border-gray-850">
                  {tags.length === 0 ? (
                    <span className="text-gray-500 text-xs italic">No tags added yet.</span>
                  ) : (
                    tags.map((tg, i) => (
                      <span key={i} className="text-xs bg-gray-850 border border-gray-750 text-cyan-400 px-3 py-1 rounded-lg flex items-center gap-1.5">
                        <span>#{tg}</span>
                        <button type="button" onClick={() => handleRemoveTag(tg)} className="text-gray-500 hover:text-white">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

            </form>

            {/* Footer */}
            <div className="p-6 bg-gray-950 border-t border-gray-850 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-800 bg-transparent text-gray-400 text-xs font-bold hover:bg-gray-850 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                id="admin-template-save-btn"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-blue-500/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {editingTemplate ? 'Update Spec & Save' : 'Add to Spec Library'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
