import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Send, Sparkles, RefreshCw, MessageSquare, AlertCircle } from 'lucide-react';

interface ChatbotProps {
  chatHistory: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  onResetChat: () => void;
  isGenerating: boolean;
  generateProgress: number; // 0 to 100
}

export default function Chatbot({
  chatHistory,
  onSendMessage,
  onResetChat,
  isGenerating,
  generateProgress
}: ChatbotProps) {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested starting queries
  const suggestions = [
    'Build a sleek SaaS platform landing page with dark design',
    'I need an e-commerce storefront for a boutique clothing line',
    'Generate a minimal portfolio for an agency designer',
    'A wellness site with appointment calendars and service lists'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isGenerating]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating) return;

    const textToSend = inputText;
    setInputText('');
    setError(null);

    try {
      await onSendMessage(textToSend);
    } catch (err: any) {
      console.error(err);
      setError('Failed to reach Webora AI. Please try sending again.');
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    if (isGenerating) return;
    setError(null);
    try {
      await onSendMessage(suggestion);
    } catch (err: any) {
      console.error(err);
      setError('Failed to reach Webora AI. Please try sending again.');
    }
  };

  return (
    <div className="flex flex-col h-[600px] rounded-2xl glass overflow-hidden flex-grow border border-[#EADBCE]/45">
      {/* Chatbot Header */}
      <div className="p-4 bg-[#F4ECE1]/60 border-b border-[#EADBCE]/35 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#AA7C11]/15 flex items-center justify-center text-[#AA7C11]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-[#312520] flex items-center gap-1.5">
              <span>Webora AI Assistant</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h4>
            <p className="text-[10px] text-[#5C4C41]">Guiding you through your website specification</p>
          </div>
        </div>

        <button
          onClick={onResetChat}
          className="text-[#5C4C41] hover:text-[#312520] transition-colors p-1.5 rounded-lg hover:bg-[#F4ECE1] text-xs flex items-center gap-1 cursor-pointer border border-[#EADBCE]/35"
          title="Restart Chat Consultation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Restart</span>
        </button>
      </div>

      {/* Specification Progress Bar */}
      <div className="px-4 py-2.5 bg-[#FAF6F0]/80 border-b border-[#EADBCE]/35 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-[10px] text-[#8E7B6E] font-bold mb-1 uppercase tracking-wider">
            <span>Consultation Requirement Level</span>
            <span className="text-[#AA7C11]">{generateProgress}% Spec Complete</span>
          </div>
          <div className="w-full bg-[#EADBCE]/55 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${generateProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <MessageSquare className="w-10 h-10 text-[#C5A86B] animate-bounce" />
            <div>
              <h5 className="text-sm font-serif font-bold text-[#312520]">Start Your Design Brief</h5>
              <p className="text-xs text-[#5C4C41] max-w-xs mt-1">
                Tell me about your business, the core purpose of your site, and your styling preferences.
              </p>
            </div>

            {/* Suggestions list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg pt-4">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-3 text-left rounded-xl bg-white border border-[#EADBCE]/60 hover:border-[#AA7C11]/40 hover:bg-[#FAF6F0] text-xs text-[#5C4C41] transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          chatHistory.map((message) => {
            const isUser = message.role === 'user';
            return (
              <div
                key={message.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                    isUser
                      ? 'bg-[#AA7C11]/20 text-[#AA7C11]'
                      : 'bg-[#C5A86B]/20 text-[#AA7C11] border border-[#C5A86B]/20'
                  }`}
                >
                  {isUser ? 'ME' : 'AI'}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#AA7C11] text-white rounded-tr-none'
                      : 'bg-white border border-[#EADBCE] text-[#312520] rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            );
          })
        )}

        {/* AI Typing Indicator */}
        {isGenerating && (
          <div className="flex gap-3 max-w-[85%]">
            <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold bg-[#C5A86B]/20 text-[#AA7C11] border border-[#C5A86B]/20">
              AI
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#EADBCE] text-[#5C4C41] rounded-tl-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#AA7C11] typing-dot animate-pulse"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#AA7C11] typing-dot animate-pulse delay-75"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#AA7C11] typing-dot animate-pulse delay-150"></span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <form onSubmit={handleSubmit} className="p-4 bg-[#FAF6F0]/80 border-t border-[#EADBCE]/35 flex gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isGenerating ? "Webora is formulating a strategy..." : "Type your website ideas here..."}
          disabled={isGenerating}
          className="flex-grow px-4 py-3 bg-white border border-[#EADBCE] rounded-xl text-[#312520] placeholder-[#8E7B6E]/60 focus:outline-none focus:border-[#AA7C11] transition-colors text-sm"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isGenerating}
          className="p-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:from-[#E5C483] hover:to-[#8C6207] text-white disabled:bg-[#FAF6F0] disabled:text-[#8E7B6E] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0 border border-[#AA7C11]/20"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </form>
    </div>
  );
}
