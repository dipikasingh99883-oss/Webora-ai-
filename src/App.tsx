import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Chatbot from './components/Chatbot';
import TemplateGrid from './components/TemplateGrid';
import RequirementPreview from './components/RequirementPreview';
import HomeView from './components/HomeView';
import AdminTemplates from './components/AdminTemplates';
import AdminAnalytics from './components/AdminAnalytics';
import TemplateCustomizer from './components/TemplateCustomizer';
import ReactMarkdown from 'react-markdown';
import { WEBSITE_TEMPLATES, PORTFOLIO_PROJECTS } from './data';
import { ChatMessage, ProjectRequest, Template } from './types';
import { db, initAuth, logout, auth } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
import { 
  Sparkles, 
  Layers, 
  FileText, 
  ChevronRight, 
  CheckCircle, 
  ShieldCheck, 
  Layout, 
  Send, 
  Download, 
  ArrowUpRight, 
  User as UserIcon, 
  Briefcase,
  ExternalLink,
  Trash,
  Info
} from 'lucide-react';

export default function App() {
  // Navigation states
  const [currentView, setCurrentView] = useState<'home' | 'portfolio' | 'templates' | 'dashboard' | 'admin'>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // User Authentication states
  const [user, setUser] = useState<{ email: string; displayName: string; photoURL: string; isAdmin: boolean; token?: string } | null>(null);

  // Client Workspace states
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [requirementsDoc, setRequirementsDoc] = useState<string>('');
  const [chatbotActive, setChatbotActive] = useState(false);
  const [isGeneratingChat, setIsGeneratingChat] = useState(false);
  const [isCompilingDoc, setIsCompilingDoc] = useState(false);
  const [consultProgress, setConsultProgress] = useState(0);

  // Admin states
  const [requestsList, setRequestsList] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [selectedAdminRequest, setSelectedAdminRequest] = useState<any | null>(null);
  const [adminActiveTab, setAdminActiveTab] = useState<'requests' | 'templates' | 'analytics'>('requests');
  const [selectedCustomizerTemplate, setSelectedCustomizerTemplate] = useState<Template | null>(null);

  // Dynamic templates state
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);

  // Portfolio interactive category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Monitor Auth state changes
  useEffect(() => {
    initAuth(
      (currentUser, token) => {
        const email = currentUser.email || '';
        setUser({
          email,
          displayName: currentUser.displayName || 'Webora Client',
          photoURL: currentUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          isAdmin: email === 'dipikasingh99883@gmail.com' || email === '@Ujjwal07' || email === 'ujjwal07@webora.ai',
          token
        });
      },
      () => {
        // Clear user if not authenticated or cached token not verified
        setUser(null);
      }
    );
  }, []);

  // Fetch submitted requests when Admin view mounts
  useEffect(() => {
    if (user?.isAdmin && currentView === 'admin') {
      fetchAdminRequests();
    }
  }, [user, currentView]);

  // Load templates on initial app startup
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'templates'));
      let list: Template[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Template);
      });

      // DB Auto-Seeding: If templates are missing, seed standard layouts immediately
      if (list.length === 0) {
        console.log("Seeding default templates into Firestore...");
        for (const t of WEBSITE_TEMPLATES) {
          await addDoc(collection(db, 'templates'), {
            name: t.name,
            category: t.category,
            description: t.description,
            image: t.image,
            features: t.features,
            complexity: t.complexity,
            demoUrl: t.demoUrl || '',
            pricingRange: t.pricingRange || '$499 - $899',
            status: t.status || 'Active',
            createdAt: new Date().toISOString(),
            primaryColor: t.primaryColor || '#3b82f6',
            secondaryColor: t.secondaryColor || '#06b6d4',
            tags: t.tags || [],
            customContent: t.customContent || {
              brandName: t.name,
              logo: t.name.substring(0, 2).toUpperCase(),
              primaryColor: t.primaryColor || '#3b82f6',
              secondaryColor: t.secondaryColor || '#06b6d4',
              heroTitle: `Stunning Websites Built for ${t.name}`,
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
            },
            sections: t.sections || [
              { id: 'sec-hero', type: 'hero', title: 'Hero Section', content: {} },
              { id: 'sec-services', type: 'services', title: 'Services Grid', content: {} },
              { id: 'sec-testimonials', type: 'testimonials', title: 'Customer Testimonials', content: {} },
              { id: 'sec-pricing', type: 'pricing', title: 'Pricing Packages', content: {} },
              { id: 'sec-contact', type: 'contact', title: 'Contact / Booking', content: {} },
              { id: 'sec-footer', type: 'footer', title: 'Standard Footer', content: {} }
            ]
          });
        }
        const reSnapshot = await getDocs(collection(db, 'templates'));
        list = [];
        reSnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Template);
        });
      }
      setTemplates(list);
    } catch (err) {
      console.error('Failed to query templates from Firestore:', err);
      handleFirestoreError(err, OperationType.LIST, 'templates');
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleAddTemplate = async (newT: Omit<Template, 'id'>) => {
    try {
      await addDoc(collection(db, 'templates'), newT);
      await fetchTemplates();
    } catch (err) {
      console.error('Failed to add template to Firestore:', err);
      handleFirestoreError(err, OperationType.CREATE, 'templates');
    }
  };

  const handleEditTemplate = async (updatedT: Template) => {
    try {
      const docRef = doc(db, 'templates', updatedT.id);
      const payload = { ...updatedT };
      delete (payload as any).id; // remove id field before writing
      await updateDoc(docRef, payload as any);
      await fetchTemplates();
    } catch (err) {
      console.error('Failed to edit template in Firestore:', err);
      handleFirestoreError(err, OperationType.UPDATE, `templates/${updatedT.id}`);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'templates', id));
      await fetchTemplates();
    } catch (err) {
      console.error('Failed to delete template from Firestore:', err);
      handleFirestoreError(err, OperationType.DELETE, `templates/${id}`);
    }
  };

  const handleSaveCustomizer = async (customContent: any, sections: any) => {
    if (!selectedCustomizerTemplate) return;
    try {
      const docRef = doc(db, 'templates', selectedCustomizerTemplate.id);
      await updateDoc(docRef, { customContent, sections });
      await fetchTemplates();
      setSelectedCustomizerTemplate(prev => prev ? { ...prev, customContent, sections } : null);
    } catch (err) {
      console.error('Failed to save customized template to Firestore:', err);
      handleFirestoreError(err, OperationType.UPDATE, `templates/${selectedCustomizerTemplate.id}`);
    }
  };

  const fetchAdminRequests = async () => {
    setLoadingRequests(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'requests'));
      const list: any[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setRequestsList(list);
    } catch (err) {
      console.error('Error fetching requirements requests:', err);
      handleFirestoreError(err, OperationType.LIST, 'requests');
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleAuthSuccess = (userData: { email: string; displayName: string; photoURL: string; isAdmin: boolean; token?: string }) => {
    setUser(userData);
    if (userData.isAdmin) {
      setCurrentView('admin');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setCurrentView('home');
  };

  // Chatbot message sender logic
  const handleSendMessage = async (text: string) => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      text,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    setIsGeneratingChat(true);

    // Dynamic progress bar increments based on conversation length
    const calculatedProgress = Math.min(100, Math.round((updatedHistory.filter(m => m.role === 'user').length) * 25));
    setConsultProgress(calculatedProgress);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedHistory })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reply');
      }

      const data = await response.json();
      
      setChatHistory(prev => [...prev, {
        id: Math.random().toString(),
        role: 'assistant',
        text: data.reply,
        timestamp: new Date().toISOString()
      }]);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsGeneratingChat(false);
    }
  };

  const handleResetChat = () => {
    setChatHistory([]);
    setConsultProgress(0);
    setRequirementsDoc('');
  };

  // Compile website requirement specification document using Gemini API
  const handleCompileDocument = async () => {
    if (chatHistory.length === 0) return;
    setIsCompilingDoc(true);

    try {
      const response = await fetch('/api/generate-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatHistory: chatHistory.map(m => ({ role: m.role, text: m.text })),
          templateName: selectedTemplate ? selectedTemplate.name : 'Custom Visual Architecture'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate document');
      }

      const data = await response.json();
      setRequirementsDoc(data.requirementsDoc);

      // Persist website request to Firestore database so Admin can view/manage it
      if (user) {
        const docPayload = {
          userId: user.email || 'guest-session',
          userEmail: user.email,
          userName: user.displayName,
          businessName: selectedTemplate ? `${selectedTemplate.name} Project` : 'AI Website Project',
          businessType: selectedTemplate ? selectedTemplate.category : 'Interactive Consulted',
          purpose: 'Compiled website spec and architecture blueprint',
          designStyle: selectedTemplate ? selectedTemplate.complexity : 'Medium',
          features: selectedTemplate ? selectedTemplate.features : ['AI Standard Integrations'],
          templateId: selectedTemplate ? selectedTemplate.id : 'custom',
          createdAt: new Date().toISOString(),
          status: 'Pending',
          requirementsDoc: data.requirementsDoc,
          chatHistory: chatHistory.map(m => ({ role: m.role, text: m.text }))
        };

        await addDoc(collection(db, 'requests'), docPayload);
      }
    } catch (err) {
      console.error('Document Compilation Error:', err);
      alert('Failed to compile detailed requirements. Please try again.');
      handleFirestoreError(err, OperationType.CREATE, 'requests');
    } finally {
      setIsCompilingDoc(false);
    }
  };

  // Seed sample request for admin dashboard if empty
  const handleSeedAdminData = async () => {
    const sample = {
      userId: 'client-dummy-id',
      userEmail: 'dipikasingh99883@gmail.com',
      userName: 'Dipika Singh',
      businessName: 'Nova Portfolio Portal',
      businessType: 'Creative Portfolio',
      purpose: 'Launch a highly visual design showcase to capture global corporate branding projects.',
      designStyle: 'Minimalist Clean with Bento Grids',
      features: ['Bento Grid Portfolio', 'Dynamic Filter Tabs', 'Sleek Contact Drawer'],
      templateId: 'nova-portfolio',
      createdAt: new Date().toISOString(),
      status: 'Pending',
      requirementsDoc: `
# Website Requirement Document: Nova Portfolio Portal

## 1. Executive Summary
A sleek, modern bento grid style portfolio website built to showcase creative identity and brand layouts.

## 2. Brand Identity
- **Name**: Nova Portfolio Portal
- **Industry**: Creative Art Direction & UX Consultation
- **Visual Palette**: #0B0F1A deep charcoal background paired with soft glass overlays and neon cyan highlights.

## 3. Recommended Sitemap
- **Home Grid**: 3x3 responsive grid housing portfolio pieces, statistics, values, and booking slots.
- **Projects**: Sub-pages with rich details and full screen visual assets.
- **Contact Drawer**: Responsive slide-out side sheet.
      `,
      chatHistory: [
        { role: 'user', text: 'I want a bento grid portfolio to show my creative assets.' },
        { role: 'assistant', text: 'Excellent choice! What accent colors do you want?' },
        { role: 'user', text: 'Soft glass overlays and bright glowing cyan borders.' }
      ]
    };

    try {
      await addDoc(collection(db, 'requests'), sample);
      fetchAdminRequests();
    } catch (err) {
      console.error(err);
      handleFirestoreError(err, OperationType.CREATE, 'requests');
    }
  };

  // Change request status (Admin function)
  const handleChangeStatus = async (requestId: string, currentStatus: string) => {
    const nextStatusMap: Record<string, 'Pending' | 'In Progress' | 'Completed'> = {
      'Pending': 'In Progress',
      'In Progress': 'Completed',
      'Completed': 'Pending'
    };
    const nextStatus = nextStatusMap[currentStatus] || 'Pending';

    try {
      const docRef = doc(db, 'requests', requestId);
      await updateDoc(docRef, { status: nextStatus });
      fetchAdminRequests();
      if (selectedAdminRequest?.id === requestId) {
        setSelectedAdminRequest((prev: any) => ({ ...prev, status: nextStatus }));
      }
    } catch (err) {
      console.error('Failed to change request status:', err);
      handleFirestoreError(err, OperationType.UPDATE, `requests/${requestId}`);
    }
  };

  // Delete Request (Admin function)
  const handleDeleteRequest = async (requestId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this client request? This action is permanent and cannot be undone.');
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, 'requests', requestId));
      fetchAdminRequests();
      if (selectedAdminRequest?.id === requestId) {
        setSelectedAdminRequest(null);
      }
    } catch (err) {
      console.error('Failed to delete request:', err);
      handleFirestoreError(err, OperationType.DELETE, `requests/${requestId}`);
    }
  };

  const categories = ['All', 'SaaS & Tech', 'Creative & Portfolio', 'E-commerce', 'Business & Agency', 'Health & Wellness'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#352922] flex flex-col font-sans selection:bg-[#C5A86B] selection:text-white relative overflow-x-hidden w-full">
      {/* Glow Effects Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C5A86B]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#AA7C11]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Navigation */}
      <Navbar 
        user={user} 
        onOpenAuth={() => setAuthModalOpen(true)} 
        onLogout={handleLogout} 
        onNavigate={(view) => {
          if (view === 'dashboard' && !user) {
            setAuthModalOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        currentView={currentView}
      />

      {/* Main Pages Router */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
        
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <HomeView 
            onNavigate={(view) => {
              if (view === 'dashboard' && !user) {
                setAuthModalOpen(true);
              } else {
                setCurrentView(view);
              }
            }} 
            user={user} 
            onOpenAuth={() => setAuthModalOpen(true)} 
            templates={templates}
            onSelectTemplate={(template) => {
              setSelectedTemplate(template);
              if (!user) {
                setAuthModalOpen(true);
              } else {
                setCurrentView('dashboard');
              }
            }}
          />
        )}

        {/* VIEW 2: PORTFOLIO SHOWCASE */}
        {currentView === 'portfolio' && (
          <div className="space-y-12 pt-4">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="font-serif text-3xl font-bold text-[#312520]">Agency Portfolio</h2>
              <p className="text-[#5C4C41] text-xs leading-relaxed">
                Take an interactive tour of past custom visual products designed, developed, and launched by the Webora AI team.
              </p>
            </div>

            {/* Categories filter */}
            <div className="flex flex-wrap gap-2 justify-center pb-4 border-b border-[#EADBCE]/50">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-white shadow-md shadow-[#AA7C11]/15'
                      : 'text-[#5C4C41] hover:text-[#312520] bg-white/60 hover:bg-white border border-[#EADBCE]/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative rounded-2xl overflow-hidden glass hover:border-[#C5A86B]/40 hover:scale-[1.01] duration-300 transition-all flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#FAF6F0]">
                    <img
                      referrerPolicy="no-referrer"
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0]/90 via-transparent to-[#FAF6F0]/10 opacity-80"></div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-[#FAF6F0]/95 backdrop-blur-md rounded-full text-[#AA7C11] border border-[#C5A86B]/20">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-md font-serif font-bold text-[#312520] group-hover:text-[#AA7C11] transition-colors">
                        {project.name}
                      </h4>
                      <p className="text-xs text-[#5C4C41] leading-relaxed mt-1.5">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#EADBCE]/40 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-[#8E7B6E] tracking-widest">
                        Project Completed
                      </span>
                      <span className="text-xs font-bold text-[#AA7C11] group-hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
                        <span>Read Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: TEMPLATES LIST */}
        {currentView === 'templates' && (
          <div className="space-y-12 pt-4">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="font-serif text-3xl font-bold text-[#312520]">Starter Frameworks</h2>
              <p className="text-[#5C4C41] text-xs leading-relaxed">
                Choose a baseline template framework below to kickstart your website consultation.
              </p>
            </div>

            <TemplateGrid 
              selectedTemplateId={selectedTemplate?.id || null} 
              onSelectTemplate={(template) => {
                setSelectedTemplate(template);
                if (!user) {
                  setAuthModalOpen(true);
                } else {
                  setCurrentView('dashboard');
                }
              }}
              templates={templates}
            />
          </div>
        )}

        {/* VIEW 4: CLIENT WORKSPACE */}
        {currentView === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-start">
            
            {/* Sidebar Controls */}
            <div className="lg:col-span-3 space-y-6">
              <div className="p-6 rounded-2xl glass space-y-6 border border-[#EADBCE]/35">
                <div className="border-b border-[#EADBCE]/20 pb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E7B6E]">Selected Framework</h4>
                  {selectedTemplate ? (
                    <div className="mt-3 flex items-center gap-3 bg-[#FAF6F0] p-2.5 rounded-xl border border-[#EADBCE]/40">
                      <img
                        referrerPolicy="no-referrer"
                        src={selectedTemplate.image}
                        alt={selectedTemplate.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#312520] block truncate">{selectedTemplate.name}</span>
                        <span className="text-[9px] text-[#8E7B6E] uppercase block font-semibold">{selectedTemplate.category}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 p-3 rounded-xl border border-dashed border-[#EADBCE]/55 text-center text-xs text-[#8E7B6E]">
                      No baseline selected.
                      <button 
                        onClick={() => setCurrentView('templates')} 
                        className="block w-full text-center text-xs text-[#AA7C11] font-bold mt-1.5 hover:underline cursor-pointer"
                      >
                        Browse Templates →
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-3.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E7B6E]">Actions</h4>
                  
                  <button
                    disabled={chatHistory.length === 0 || isCompilingDoc}
                    onClick={handleCompileDocument}
                    id="compile-wrd-btn"
                    className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:from-[#E5C483] hover:to-[#8C6207] text-white disabled:bg-[#FAF6F0]/40 disabled:text-[#8E7B6E] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 border border-[#AA7C11]/30"
                  >
                    {isCompilingDoc ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                        <span>Compiling...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 shrink-0" />
                        <span>Compile Spec Sheet</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleResetChat}
                    className="w-full py-2.5 bg-[#F4ECE1] hover:bg-[#EADBCE] border border-[#D7C5B2]/30 text-[#312520] font-semibold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Clear Work Space
                  </button>
                </div>
              </div>

              {/* Status Guide Widget */}
              <div className="p-5 rounded-2xl bg-[#C5A86B]/5 border border-[#C5A86B]/20 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#AA7C11] shrink-0 mt-0.5" />
                <div className="text-xs text-[#5C4C41] leading-relaxed">
                  <span className="font-bold text-[#312520] block mb-1">How it works:</span>
                  1. Have a chat with our AI consultant regarding your web requirements.<br/>
                  2. Choose a starter template optionally.<br/>
                  3. Click <span className="text-[#AA7C11] font-semibold">Compile Spec Sheet</span> to generate structured requirements.<br/>
                  4. Export directly to your <span className="text-[#AA7C11] font-semibold">Google Drive</span>.
                </div>
              </div>
            </div>

            {/* Interactive Workspace Panel */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Chatbot */}
              <div className="flex flex-col h-full">
                <Chatbot 
                  chatHistory={chatHistory} 
                  onSendMessage={handleSendMessage} 
                  onResetChat={handleResetChat} 
                  isGenerating={isGeneratingChat}
                  generateProgress={consultProgress}
                />
              </div>

              {/* Right Column: Spec Preview */}
              <div className="flex flex-col h-full">
                <RequirementPreview 
                  documentText={requirementsDoc} 
                  projectName={selectedTemplate ? selectedTemplate.name : 'AI_Brief'} 
                  hasGoogleToken={!!user?.token}
                  onTriggerGoogleLogin={() => setAuthModalOpen(true)}
                />
              </div>

            </div>

          </div>
        )}

        {/* VIEW 5: ADMIN DASHBOARD (PROTECTED) */}
        {currentView === 'admin' && user?.isAdmin && (
          <div className="space-y-8 pt-4">
            {selectedCustomizerTemplate ? (
              <TemplateCustomizer 
                template={selectedCustomizerTemplate}
                onSave={handleSaveCustomizer}
                onClose={() => setSelectedCustomizerTemplate(null)}
              />
            ) : (
              <>
                {/* Admin Header & Tabs Navigation Row */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#EADBCE]/40 pb-6 text-[#352922]">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-[#312520] flex items-center gap-2">
                      <ShieldCheck className="w-8 h-8 text-[#C5A86B]" />
                      <span>Webora AI Admin Hub</span>
                    </h2>
                    <p className="text-[#5C4C41] text-xs mt-1">
                      {adminActiveTab === 'requests' 
                        ? 'Review and manage user website specifications, export specs, and update project pipeline statuses.' 
                        : adminActiveTab === 'templates'
                        ? 'Create, edit, delete, and customize baseline frameworks in the Firestore layout catalog.'
                        : 'Examine live telemetry, conversion specs, estimated revenue, and template selection popularity.'}
                    </p>
                  </div>

                  {/* Tab triggers */}
                  <div className="flex bg-white/60 p-1.5 rounded-xl border border-[#EADBCE]/50 self-stretch md:self-auto justify-between gap-1">
                    <button
                      onClick={() => setAdminActiveTab('requests')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        adminActiveTab === 'requests' 
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-white shadow-md shadow-[#AA7C11]/15' 
                          : 'text-[#5C4C41] hover:text-[#312520]'
                      }`}
                    >
                      Client Requests ({requestsList.length})
                    </button>
                    <button
                      onClick={() => setAdminActiveTab('templates')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        adminActiveTab === 'templates' 
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-white shadow-md shadow-[#AA7C11]/15' 
                          : 'text-[#5C4C41] hover:text-[#312520]'
                      }`}
                    >
                      Template Catalog ({templates.length})
                    </button>
                    <button
                      onClick={() => setAdminActiveTab('analytics')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        adminActiveTab === 'analytics' 
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-white shadow-md shadow-[#AA7C11]/15' 
                          : 'text-[#5C4C41] hover:text-[#312520]'
                      }`}
                    >
                      Analytics
                    </button>
                  </div>
                </div>

                {/* TAB CONTENT: CLIENT REQUESTS */}
                {adminActiveTab === 'requests' && (
                  <div className="space-y-6">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={fetchAdminRequests}
                        id="admin-refresh-btn"
                        className="px-4 py-2 bg-[#F4ECE1] hover:bg-[#EADBCE] border border-[#D7C5B2]/30 text-[#312520] text-xs font-semibold rounded-xl transition-all cursor-pointer"
                      >
                        Refresh Data
                      </button>
                      <button
                        onClick={handleSeedAdminData}
                        id="admin-seed-btn"
                        className="px-4 py-2 bg-[#C5A86B] hover:bg-[#AA7C11] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#C5A86B]/15 transition-all cursor-pointer"
                      >
                        Seed Demo Request
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Requests Table */}
                      <div className="lg:col-span-7 rounded-2xl glass border border-[#EADBCE]/35 overflow-hidden">
                        <div className="p-4 bg-[#F4ECE1]/60 border-b border-[#EADBCE]/30">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E7B6E]">Logged Website Brief Requests</h4>
                        </div>

                        {loadingRequests ? (
                          <div className="p-12 text-center text-xs text-[#8E7B6E] flex flex-col items-center justify-center gap-2">
                            <span className="w-6 h-6 rounded-full border-2 border-[#C5A86B] border-t-transparent animate-spin"></span>
                            <span>Querying Firestore requests...</span>
                          </div>
                        ) : requestsList.length === 0 ? (
                          <div className="p-12 text-center text-xs text-[#8E7B6E] space-y-3">
                            <p>No client requests found in the Firestore database.</p>
                            <button 
                              onClick={handleSeedAdminData} 
                              className="text-xs text-[#AA7C11] font-bold hover:underline cursor-pointer"
                            >
                              Click to seed a beautiful demo request
                            </button>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-[#EADBCE]/30 text-[10px] font-bold uppercase tracking-wider text-[#8E7B6E]">
                                  <th className="p-4">User</th>
                                  <th className="p-4">Project Focus</th>
                                  <th className="p-4">Template</th>
                                  <th className="p-4 text-center">Status</th>
                                  <th className="p-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#EADBCE]/20 text-xs text-[#5C4C41]">
                                {requestsList.map((req) => (
                                  <tr 
                                    key={req.id} 
                                    onClick={() => setSelectedAdminRequest(req)}
                                    className={`hover:bg-[#F4ECE1]/40 transition-colors cursor-pointer ${
                                      selectedAdminRequest?.id === req.id ? 'bg-[#C5A86B]/10' : ''
                                    }`}
                                  >
                                    <td className="p-4">
                                      <span className="font-bold text-[#312520] block">{req.userName || 'Client'}</span>
                                      <span className="text-[10px] text-[#8E7B6E] block">{req.userEmail}</span>
                                    </td>
                                    <td className="p-4">
                                      <span className="block font-medium text-[#312520]">{req.businessName || 'Web Project'}</span>
                                      <span className="text-[10px] text-[#AA7C11] block uppercase tracking-wider font-semibold">{req.businessType}</span>
                                    </td>
                                    <td className="p-4 font-mono text-[10px]">{req.templateId}</td>
                                    <td className="p-4 text-center">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleChangeStatus(req.id, req.status);
                                        }}
                                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer ${
                                          req.status === 'Completed'
                                            ? 'bg-emerald-600/10 text-emerald-700 border border-emerald-600/20'
                                            : req.status === 'In Progress'
                                            ? 'bg-[#C5A86B]/20 text-[#AA7C11] border border-[#C5A86B]/30'
                                            : 'bg-yellow-600/10 text-yellow-700 border border-yellow-600/20'
                                        }`}
                                      >
                                        {req.status}
                                      </button>
                                    </td>
                                    <td className="p-4 text-right">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteRequest(req.id);
                                        }}
                                        className="text-[#8E7B6E] hover:text-red-600 p-1 rounded-lg hover:bg-[#F4ECE1] transition-colors cursor-pointer"
                                        title="Delete Request Record"
                                      >
                                        <Trash className="w-4.5 h-4.5" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* View/Details Pane */}
                      <div className="lg:col-span-5 rounded-2xl glass border border-[#EADBCE]/35 overflow-hidden">
                        <div className="p-4 bg-[#F4ECE1]/60 border-b border-[#EADBCE]/30">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E7B6E]">Selected Specification Details</h4>
                        </div>

                        {selectedAdminRequest ? (
                          <div className="p-6 space-y-6 overflow-y-auto max-h-[600px] text-[#352922]">
                            <div className="border-b border-[#EADBCE]/30 pb-4">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-[#AA7C11] mb-1 block">
                                Client Identity
                              </span>
                              <h3 className="text-lg font-serif font-bold text-[#312520]">{selectedAdminRequest.userName}</h3>
                              <p className="text-xs text-[#5C4C41]">{selectedAdminRequest.userEmail}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E7B6E] block mb-1">
                                  Created Date
                                </span>
                                <span className="text-xs text-[#5C4C41] font-mono">
                                  {new Date(selectedAdminRequest.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E7B6E] block mb-1">
                                  Project Status
                                </span>
                                <span className="text-xs text-[#312520] uppercase font-bold">
                                  {selectedAdminRequest.status}
                                </span>
                              </div>
                            </div>

                            {/* Features list */}
                            {selectedAdminRequest.features && selectedAdminRequest.features.length > 0 && (
                              <div>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E7B6E] block mb-2">
                                  Target Tech Features
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {selectedAdminRequest.features.map((f: string, idx: number) => (
                                    <span key={idx} className="text-[10px] bg-[#F4ECE1] text-[#312520] px-2.5 py-1 rounded border border-[#EADBCE]/40">
                                      {f}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Render requirements spec markdown */}
                            <div className="border-t border-[#EADBCE]/30 pt-4">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-[#AA7C11] block mb-3">
                                COMPILED REQUIREMENT MARKDOWN
                              </span>
                              <div className="p-4 rounded-xl bg-white/70 border border-[#EADBCE]/40 overflow-y-auto max-h-[300px] text-xs leading-relaxed prose text-[#352922]">
                                <ReactMarkdown>{selectedAdminRequest.requirementsDoc}</ReactMarkdown>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-12 text-center text-xs text-gray-500">
                            Select a logged request row on the left to examine the complete AI compiled website specification sheet.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: TEMPLATE CATALOG LIBRARY */}
                {adminActiveTab === 'templates' && (
                  <AdminTemplates 
                    templates={templates}
                    onAddTemplate={handleAddTemplate}
                    onEditTemplate={handleEditTemplate}
                    onDeleteTemplate={handleDeleteTemplate}
                    onOpenCustomizer={(t) => setSelectedCustomizerTemplate(t)}
                    onViewDemo={(t) => {
                      setSelectedCustomizerTemplate(t);
                    }}
                  />
                )}

                {/* TAB CONTENT: ANALYTICS WIDGETS */}
                {adminActiveTab === 'analytics' && (
                  <AdminAnalytics 
                    templatesCount={templates.length}
                    requestsCount={requestsList.length}
                  />
                )}
              </>
            )}
          </div>
        )}

      </main>

      {/* Visual Footer */}
      <Footer 
        onNavigate={(view) => {
          if (view === 'dashboard' && !user) {
            setAuthModalOpen(true);
          } else {
            setCurrentView(view);
          }
        }} 
        currentView={currentView}
      />

      {/* Authentication Modal Popup */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess} 
      />
    </div>
  );
}
