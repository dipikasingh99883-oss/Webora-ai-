import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client to prevent startup crashes if key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined. Please add it via Settings > Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// System instructions for the chatbot to guide website building
const CHATBOT_SYSTEM_INSTRUCTION = `
You are Webora, the elite AI web consultant for "Webora AI" Web Agency.
Your goal is to guide clients step-by-step through designing their ideal website.
Be professional, friendly, and structured. Keep your answers relatively concise, warm, and highly focused.

Inquire about these core items in an organic, step-by-step conversation:
1. Business/Brand Name & Industry type (e.g. e-commerce, local plumber, law firm, SaaS app).
2. The core website purpose & main goals (e.g. lead generation, direct sales, portfolio showcase, booking).
3. Design styles and aesthetic preferences (e.g. dark and futuristic, clean and minimalist, organic and warm).
4. Required pages and specific features (e.g. Stripe checkout, contact form, user auth, blog, scheduling).

Once you have gathered enough details (usually after 3-5 turns), summarize their details and instruct them to click the "Generate Project Requirements" button below to create their formal Website Requirement Document.
`;

// API endpoint for chatbot responses
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    const ai = getGeminiClient();

    // Map message roles to Gemini content format
    // Note that Gemini role mapping expects 'user' and 'model'
    const geminiContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    // Prepend system instructions
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: geminiContents,
      config: {
        systemInstruction: CHATBOT_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't process that response.";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini Chat Error:', error);
    res.status(500).json({ error: error.message || 'Error communicating with Gemini' });
  }
});

// API endpoint to generate the comprehensive structured website specification document
app.post('/api/generate-requirements', async (req, res) => {
  try {
    const { chatHistory, templateName } = req.body;
    if (!chatHistory || !Array.isArray(chatHistory)) {
      res.status(400).json({ error: 'Chat history is required' });
      return;
    }

    const ai = getGeminiClient();

    const prompt = `
Analyze the following conversation between our Web Agency AI Consultant and the client.
Based on this chat, compile a formal, highly detailed, beautifully structured "Website Requirement Document" (WRD) in Markdown.
The client has also selected the base template: "${templateName || 'None Selected'}".

Use professional agency styling with clear sections:
1. **Executive Summary** (Overview of the project, goals, and core vision)
2. **Business & Brand Profile** (Name, industry, target audience, values)
3. **Core Site Purpose** (Primary objectives, CTAs)
4. **Visual & Design Identity** (Style, colors, tone, aesthetic preferences)
5. **Recommended Sitemap & Key Pages** (Detailed description of what goes on each page)
6. **Functional Specifications** (Form handling, payment gateways, booking, authentication, etc.)
7. **Chosen Template Fit** (How the chosen template will be customized)
8. **Estimated Development Phases & Recommended Stack** (Brief visual timeline/milestones: UX, Frontend, Backend, Launch)

Make the document detailed, professional, and visually formatted with Markdown lists, headers, bold text, and blockquotes. Do not output code blocks around the markdown itself.

Here is the conversation history:
${chatHistory.map((m: any) => `${m.role === 'user' ? 'Client' : 'Consultant'}: ${m.text}`).join('\n')}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.5,
      },
    });

    const docText = response.text || "Failed to generate website requirements.";
    res.json({ requirementsDoc: docText });
  } catch (error: any) {
    console.error('Generate Requirements Error:', error);
    res.status(500).json({ error: error.message || 'Error generating requirement document' });
  }
});

// API endpoint to auto-fill template customization details using Gemini AI
app.post('/api/ai-autofill', async (req, res) => {
  try {
    const { businessName, businessType, about, services, contactInfo } = req.body;
    if (!businessName || !businessType) {
      res.status(400).json({ error: 'Business Name and Business Type are required' });
      return;
    }

    const ai = getGeminiClient();

    const prompt = `
Generate high-quality, conversion-focused, customized website content for a modern business.
Business Details:
- Name: ${businessName}
- Type: ${businessType}
- Description/About: ${about || 'A leading professional service in its industry.'}
- Key Services: ${services || 'General industry standard professional services.'}
- Contact / Location: ${contactInfo || 'Global operations, email & phone support.'}

Your task is to generate complete copy, beautiful brand matching colors, professional font selection, 
high-value services descriptions, realistic pricing structures, and polished customer testimonials matching this brand.
`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        brandName: { type: Type.STRING },
        heroTitle: { type: Type.STRING, description: "A catchy, conversion-focused headline for the website landing page (max 10 words)" },
        heroSubtitle: { type: Type.STRING, description: "A supporting subheadline highlighting the unique value proposition (max 20 words)" },
        heroCtaText: { type: Type.STRING, description: "A strong action-oriented call to action text, e.g. 'Get Started Today' or 'Book Free Consult'" },
        primaryColor: { type: Type.STRING, description: "A beautiful hex color code that fits the industry and brand aesthetic (e.g. #3b82f6)" },
        secondaryColor: { type: Type.STRING, description: "A coordinating accent hex color code (e.g. #06b6d4)" },
        fontFamily: { type: Type.STRING, description: "One of these specific premium typography options: 'Inter', 'Space Grotesk', 'Outfit', 'Playfair Display', or 'JetBrains Mono'" },
        services: {
          type: Type.ARRAY,
          description: "List of exactly 3 core services detailed for this business.",
          items: {
            type: Type.OBJECT,
            properties: {
              icon: { type: Type.STRING, description: "One of the following exact Lucide icon names: 'Layout', 'Search', 'Phone', 'Mail', 'Briefcase', 'Sparkles', 'Shield', 'Layers', 'Heart', 'Coffee', 'Activity', 'Home', 'ShoppingBag'" },
              title: { type: Type.STRING, description: "Name of the service" },
              desc: { type: Type.STRING, description: "A professional 1-2 sentence description explaining the value" }
            },
            required: ['icon', 'title', 'desc']
          }
        },
        pricingCards: {
          type: Type.ARRAY,
          description: "List of exactly 3 tailored pricing plan cards.",
          items: {
            type: Type.OBJECT,
            properties: {
              planName: { type: Type.STRING, description: "Plan name, e.g. Standard, Growth, Premium, Starter, Pro, Enterprise" },
              price: { type: Type.STRING, description: "Monthly or flat cost, e.g. '$49', '$129', 'Custom'" },
              period: { type: Type.STRING, description: "E.g., '/mo', '/project', or empty string" },
              features: {
                type: Type.ARRAY,
                description: "3-5 high-value included features for this tier",
                items: { type: Type.STRING }
              },
              highlight: { type: Type.BOOLEAN, description: "True for the middle/most popular tier to draw user focus" }
            },
            required: ['planName', 'price', 'period', 'features', 'highlight']
          }
        },
        testimonials: {
          type: Type.ARRAY,
          description: "2 high-credibility custom written client testimonials reflecting successful outcomes",
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "A realistic customer name" },
              role: { type: Type.STRING, description: "Client role or company, e.g. CEO, Founder, Director, Homeowner" },
              text: { type: Type.STRING, description: "A rich, specific 2-sentence feedback testimonial praising the brand's quality, speed, or outcomes" }
            },
            required: ['name', 'role', 'text']
          }
        }
      },
      required: ['brandName', 'heroTitle', 'heroSubtitle', 'heroCtaText', 'primaryColor', 'secondaryColor', 'fontFamily', 'services', 'pricingCards', 'testimonials']
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema,
      },
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error('Model returned empty response');
    }

    res.json(JSON.parse(outputText.trim()));
  } catch (error: any) {
    console.error('AI Auto-Fill Error:', error);
    res.status(500).json({ error: error.message || 'Error executing AI auto-fill' });
  }
});

// Setup Vite Dev Server / Static Assets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Webora AI full-stack server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
