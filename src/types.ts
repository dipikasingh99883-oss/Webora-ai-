export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface ProjectRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  businessName: string;
  businessType: string;
  purpose: string;
  designStyle: string;
  features: string[];
  templateId: string;
  createdAt: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  requirementsDoc: string;
  chatHistory: { role: 'user' | 'assistant'; text: string }[];
}

export interface TemplateSection {
  id: string;
  type: 'hero' | 'services' | 'testimonials' | 'pricing' | 'faq' | 'contact' | 'footer';
  title: string;
  content: any; // Dynamic based on type
}

export interface TemplateCustomContent {
  logo?: string;
  brandName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaText?: string;
  services?: { icon: string; title: string; desc: string }[];
  testimonials?: { name: string; role: string; text: string; avatar?: string }[];
  pricingCards?: { planName: string; price: string; period: string; features: string[]; highlight?: boolean }[];
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  socials?: { platform: string; url: string }[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  complexity: 'Simple' | 'Medium' | 'Complex';
  demoUrl?: string;
  pricingRange?: string;
  status?: 'Active' | 'Draft';
  createdAt?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tags?: string[];
  customContent?: TemplateCustomContent;
  sections?: TemplateSection[];
}

export interface ClientProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: string;
}
