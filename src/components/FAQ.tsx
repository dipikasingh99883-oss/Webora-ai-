import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      question: "How can you build websites in 48–72 hours?",
      answer: "We combine our proprietary AI-assisted design flow with pre-tested expert design systems and structured component libraries. Once you consult with our AI and we receive your branding assets, our expert developers assemble, customize, and optimize your website for production-grade speeds in record time."
    },
    {
      question: "Are these templates, or will my website be unique?",
      answer: "Every website we build is tailored to your brand goals, target conversion funnel, and style preferences. We use templates as initial structural baseline guides to streamline the technical process, but the visual design, custom assets, copywriting hooks, and SEO code are entirely custom-built for you."
    },
    {
      question: "Is copywriting and basic SEO setup included?",
      answer: "Yes, our Growth, Pro, and Premium packages include professional copywriting assistance optimized with hooks designed to convert visitors. Basic technical SEO setup (meta tags, mobile speed indexing, alt descriptions, and fast sitemaps) is included standard across all tiers."
    },
    {
      question: "What is your on-time delivery promise?",
      answer: "We guarantee delivery within the 48–72 hour window after receiving your content resources. If we miss the deadline due to an internal delay, we will prioritize your website with immediate senior engineering resources and give you permanent free revision upgrade tokens."
    },
    {
      question: "Can I manage or edit my website after it goes live?",
      answer: "Absolutely. We supply you with complete code source access, integrated web editor tools, or connect standard lightweight CMS configurations so you can seamlessly adjust copy, change prices, or publish blog articles independently."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="space-y-8 scroll-mt-24">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A86B]">FAQS</span>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#312520]">
          Frequently Asked Questions
        </h2>
        <p className="text-[#5C4C41] text-xs max-w-sm mx-auto">
          Everything you need to know about our next-generation luxury delivery pipeline.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass rounded-2xl border border-[#EADBCE]/30 hover:border-[#C5A86B]/30 transition-all overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#C5A86B] shrink-0" />
                  <span className="text-sm font-bold text-[#312520] leading-snug">{faq.question}</span>
                </div>
                <div className={`w-6 h-6 rounded-lg bg-[#F5EFE3] flex items-center justify-center text-[#5C4C41] transition-transform ${isOpen ? 'rotate-180 text-[#AA7C11]' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-60 border-t border-[#EADBCE]/30 p-5' : 'max-h-0'
                } overflow-hidden bg-[#FAF6F0]/50`}
              >
                <p className="text-xs text-[#5C4C41] leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
