import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, User, Bot, Loader2, X, Minimize2 } from 'lucide-react';
// RAG: use server-side search; keep client MiniSearch fallback only if needed
import { ingestPdfIfRequested } from '../knowledge/rag';
import { supabase } from '../lib/supabase';
import Cal, { getCalApi } from '@calcom/embed-react'
import { matchCandidates, generateMatchEmail, type Lead, type Candidate } from '../lib/candidateMatching'

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Remove emojis and decorative glyphs from text
const stripEmojis = (text: string) => {
  return text
    .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, '')
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, '')
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
    .replace(/[\u{1F700}-\u{1F77F}]/gu, '')
    .replace(/[\u{1F780}-\u{1F7FF}]/gu, '')
    .replace(/[\u{1F800}-\u{1F8FF}]/gu, '')
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, '')
    .replace(/[\u{1FA00}-\u{1FAFF}]/gu, '')
    .replace(/[\u{2600}-\u{26FF}]/gu, '')
    .replace(/[\u{2700}-\u{27BF}]/gu, '')
    .replace(/\uFE0F/gu, '')
    .replace(/\u200D/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
};

// Extract bracketed option labels from a bot message
const extractOptions = (text: string): { cleanedText: string; options: string[] } => {
  const options: string[] = [];
  const bracketMatches = [...text.matchAll(/\[([^\]]+)\]/g)];
  for (const m of bracketMatches) {
    const candidate = (m[1] || '').trim();
    if (candidate) options.push(candidate);
  }
  const cleanedText = text.replace(/Options?:[\s\S]*$/i, '').trim();
  return { cleanedText: cleanedText || text, options };
};

const SYSTEM_PROMPT = `You are StafflyAI Assistant, helping business owners find the right Filipino Operators (remote team members) for their business.

IMPORTANT TERMINOLOGY: Always use "Operators" instead of "VAs" or "virtual assistants". Staffly provides skilled Filipino Operators.

YOUR GOAL: Collect these 5 key pieces of information through natural conversation:
1. SERVICE TYPE - What type of Operator do they need? (Executive Assistant, Customer Support, Sales/Lead Gen, Admin, Project Manager, etc.)
2. INDUSTRY - What industry is their business in? (Real Estate, Marketing Agency, E-commerce, Coaching, Tech, Healthcare, etc.)
3. COMPANY NAME - What's the name of their company/business?
4. TEAM SIZE - How many people are on their team? (Just me, 2-5, 6-15, 16-50, 50+)
5. REVENUE RANGE - What's their approximate monthly/annual revenue? (Under $10k, $10k-$50k, $50k-$200k, $200k+)

CONVERSATION FLOW:
1. Start by asking what type of Operator they're looking for
2. Ask about their industry
3. Ask for their company name
4. Ask about team size
5. Ask about revenue range
6. Once you have ALL 5 pieces of info, summarize and say: "That's everything I need - please fill out the form on the right to see your matched Operator profiles!"

RULES:
- Ask ONE question at a time
- Keep responses short (1-3 sentences)
- Be friendly and professional
- Do NOT ask for name, email, or phone - those come from the form
- Do NOT mention pricing or timelines
- Use "Operators" NOT "VAs" or "virtual assistants"
- After collecting all info, always end with the summary and form prompt
`

interface FullScreenChatbotProps {
  autoOpen?: boolean;
}

const FullScreenChatbot: React.FC<FullScreenChatbotProps> = ({ autoOpen = false }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! I'm your Staffly Guide. I help founders and business owners match with the right Filipino Operators so you can free up time and focus on growth. What type of Operator are you looking for?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  // Handle autoOpen prop: default false so the page starts at the landing view
  useEffect(() => {
    if (autoOpen) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  }, [autoOpen]);
  
  // Optional query param ?ingest=1 to ingest the PDF to Supabase via Edge Function
  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
    ingestPdfIfRequested(supabaseUrl, anonKey)
  }, [])

  // Create conversation only when first message is sent (moved to handleSendMessage)

  // Lead capture and gated profiles state
  // Email capture via chat no longer used; contact is collected via form
  const [profilesUnlocked, setProfilesUnlocked] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  // optional searching animation state removed for simplicity
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [showCalendarOnRight, setShowCalendarOnRight] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [searchingCandidates, setSearchingCandidates] = useState(false);

  // Extract business qualification data from conversation messages
  // Focus on: Service, Industry, Company Name, Team Size, Revenue Range
  const extractQualificationData = (messages: Message[]) => {
    const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()
    const userMsgs = messages.filter(m => m.sender === 'user').map(m => normalize(m.text))
    const originalUserMsgs = messages.filter(m => m.sender === 'user').map(m => m.text.trim())
    const botMsgs = messages.filter(m => m.sender === 'bot').map(m => normalize(m.text))

    const firstMatch = (options: string[]) => {
      for (const msg of userMsgs) {
        for (const opt of options) {
          if (msg.includes(normalize(opt))) return opt
        }
      }
      return null
    }

    // 1. SERVICE TYPE - What type of Operator they need
    const serviceKeywords = [
      'executive assistant', 'ea', 'admin', 'administrative', 
      'customer support', 'customer service', 'support',
      'sales', 'lead gen', 'lead generation', 'sdr', 'appointment setter',
      'project manager', 'pm', 'project management',
      'bookkeeper', 'bookkeeping', 'accounting',
      'social media', 'marketing', 'content',
      'data entry', 'research', 'virtual assistant', 'va', 'operator'
    ]
    let service: string | null = null
    for (const msg of userMsgs) {
      for (const keyword of serviceKeywords) {
        if (msg.includes(keyword)) {
          // Capitalize first letter of each word
          service = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
          break
        }
      }
      if (service) break
    }

    // 2. INDUSTRY - What industry their business is in
    const industryKeywords = [
      'real estate', 'realty', 'realtor',
      'agency', 'marketing agency', 'digital agency',
      'e-commerce', 'ecommerce', 'online store', 'shopify',
      'coaching', 'coach', 'consulting', 'consultant',
      'technology', 'tech', 'saas', 'software', 'it',
      'healthcare', 'medical', 'health',
      'finance', 'financial', 'accounting', 'fintech',
      'legal', 'law', 'attorney',
      'education', 'edtech', 'training',
      'hospitality', 'restaurant', 'hotel',
      'construction', 'contractor',
      'insurance', 'retail', 'manufacturing'
    ]
    let industry: string | null = null
    for (const msg of userMsgs) {
      for (const keyword of industryKeywords) {
        if (msg.includes(keyword)) {
          industry = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
          break
        }
      }
      if (industry) break
    }

    // 3. COMPANY NAME - Look for company name in responses
    // Check if bot asked about company and user's next response is the name
    let company: string | null = null
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i]
      if (msg.sender === 'bot' && normalize(msg.text).includes('company')) {
        // Next user message might be company name
        if (i + 1 < messages.length && messages[i + 1].sender === 'user') {
          const response = messages[i + 1].text.trim()
          // If response is short (likely just a name), use it
          if (response.length > 1 && response.length < 100 && !response.includes('?')) {
            // Clean up common prefixes
            company = response
              .replace(/^(it's|its|we're|we are|called|named|my company is|the company is)\s*/i, '')
              .replace(/^(i work at|i work for|i'm with|i am with)\s*/i, '')
              .trim()
            break
          }
        }
      }
    }
    // Fallback: look for patterns in all messages
    if (!company) {
      for (const msg of originalUserMsgs) {
        const patterns = [
          /(?:called|named|it's|its)\s+([A-Za-z0-9\s&\-\.]+?)(?:\.|,|$)/i,
          /(?:work at|work for|with|from)\s+([A-Za-z0-9\s&\-\.]+?)(?:\.|,|$)/i,
          /^([A-Z][A-Za-z0-9\s&\-\.]{2,30})$/  // Simple capitalized name
        ]
        for (const pattern of patterns) {
          const match = msg.match(pattern)
          if (match && match[1] && match[1].length > 1 && match[1].length < 50) {
            company = match[1].trim()
            break
          }
        }
        if (company) break
      }
    }

    // 4. TEAM SIZE - How many people on their team
    let team_size: string | null = null
    const teamSizePatterns = [
      /(\d+)\s*(?:employees?|staff|people|team members?|person)/i,
      /(?:team of|have|around|about)\s*(\d+)/i,
      /^(\d+)$/  // Just a number
    ]
    for (const msg of userMsgs) {
      // Check for keyword matches first
      const sizeKeywords = ['just me', 'solo', '1', '2-5', '2–5', '6-15', '6–15', '16-50', '50+', '51+', 'small', 'medium', 'large']
      for (const keyword of sizeKeywords) {
        if (msg.includes(keyword)) {
          team_size = keyword
          break
        }
      }
      if (team_size) break
      // Then check patterns
      for (const pattern of teamSizePatterns) {
        const match = msg.match(pattern)
        if (match) {
          team_size = match[1]
          break
        }
      }
      if (team_size) break
    }

    // 5. REVENUE RANGE - Monthly/annual revenue
    let revenue_range: string | null = null
    const revenuePatterns = [
      /\$?(\d+(?:,\d{3})*(?:\.\d+)?)\s*([km])?/i,
      /(under|less than|about|around|over|more than)\s*\$?(\d+(?:,\d{3})*)\s*([km])?/i
    ]
    const revenueKeywords = [
      'under $10k', 'under 10k', 'less than 10k',
      '$10k-$50k', '10k-50k', '$10k to $50k',
      '$50k-$200k', '50k-200k', '$50k to $200k',
      '$200k+', '200k+', 'over $200k', 'over 200k',
      '$500k', '$1m', '$1 million', 'million'
    ]
    for (const msg of userMsgs) {
      for (const keyword of revenueKeywords) {
        if (msg.includes(keyword.toLowerCase())) {
          revenue_range = keyword
          break
        }
      }
      if (revenue_range) break
      // Check for number patterns
      for (const pattern of revenuePatterns) {
        const match = msg.match(pattern)
        if (match) {
          revenue_range = match[0]
          break
        }
      }
      if (revenue_range) break
    }

    // Additional fields for compatibility
    const role_or_scope = service
    const timeline = firstMatch(['now', 'immediately', 'asap', '2-4 weeks', 'later', 'not sure']) || null

    console.log('📊 Extracted qualification data:', { service, industry, company, team_size, revenue_range })

    return {
      service,
      industry,
      company,
      team_size,
      revenue_range,
      role_or_scope,
      timeline,
      goal: null,
      hours_per_week: null,
      timezone: null,
      tools_stack: null,
      tech_stack: null,
      api_access: null
    }
  }

  // Initialize Cal embed when we show it on the right panel
  useEffect(() => {
    if (!showCalendarOnRight) return;
    (async () => {
      try {
        const cal = await getCalApi({ namespace: '45-strategy-call' })
        cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
      } catch {}
    })();
  }, [showCalendarOnRight]);

  // Load Cal.com embed when lead is submitted and calendar should appear
  useEffect(() => {
    if (!leadSubmitted) return;
    // Avoid double-injecting
    const existing = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]') as HTMLScriptElement | null
    const initCal = () => {
      // @ts-ignore
      if (window.Cal) {
        // @ts-ignore
        window.Cal("init", "45-strategy-call", { origin: "https://app.cal.com" })
        // @ts-ignore
        window.Cal.ns && window.Cal.ns["45-strategy-call"] && window.Cal.ns["45-strategy-call"]("inline", {
          elementOrSelector: "#my-cal-inline-45-strategy-call",
          config: { layout: "month_view" },
          calLink: "stafflyai/45-strategy-call",
        })
        // @ts-ignore
        window.Cal.ns && window.Cal.ns["45-strategy-call"] && window.Cal.ns["45-strategy-call"]("ui", { hideEventTypeDetails: false, layout: "month_view" })
      }
    }
    if (!existing) {
      const s = document.createElement('script')
      s.src = 'https://app.cal.com/embed/embed.js'
      s.async = true
      s.onload = initCal
      document.head.appendChild(s)
    } else {
      initCal()
    }
  }, [leadSubmitted])

  // profilesUnlocked manages right-panel preview blur only

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isFullScreen) {
      scrollToBottom();
    }
  }, [messages, isFullScreen]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setIsTyping(true);

    // Smoothly transition to full screen when user sends a message
    if (!isFullScreen) {
      // Add a small delay for smooth transition
      setTimeout(() => {
        setIsFullScreen(true);
      }, 300);
    }

    try {
      // Create conversation on first message if not exists
      let currentConversationId = conversationId
      if (supabase && !currentConversationId) {
        try {
          const sessionId = crypto.randomUUID()
          const res = await supabase
            .from('conversations')
            .insert({ session_id: sessionId, metadata: { user_agent: navigator.userAgent } })
            .select('id')
            .single()
          if (!res.error && res.data) {
            currentConversationId = res.data.id
            setConversationId(currentConversationId)
          }
        } catch (e) {
          console.warn('Conversation create failed', e)
        }
      }

      if (supabase && currentConversationId) {
        try { await supabase.from('conversation_messages').insert({ conversation_id: currentConversationId, role: 'user', content: userMessage.text }) } catch {}
      }

      // Build full conversation history so the model follows the flow
      // Server-side retrieval via Supabase Edge Function
      let kbSnippets: string[] = []
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
        const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
        
        if (supabaseUrl && anonKey) {
          const endpoint = supabaseUrl.replace('supabase.co', 'functions.supabase.co') + '/rag-search'
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${anonKey}` },
            body: JSON.stringify({ query: userMessage.text, top_k: 3, min_similarity: 0.2 })
          })
          if (res.ok) {
            const data = await res.json()
            kbSnippets = (data.matches || []).map((m: any) => `Source (page ${m.page}): ${m.content}`)
          } else {
            console.warn('RAG search failed with status:', res.status)
          }
        } else {
          console.warn('Supabase credentials not available for RAG search')
        }
      } catch (e) {
        console.warn('RAG search failed, continuing without snippets', e)
      }

      const openAiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...(kbSnippets.length ? [{ role: 'system', content: `Staffly Knowledge (use when relevant, cite briefly):\n${kbSnippets.join('\n\n')}` }] : []),
        ...[...messages, userMessage].map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      ];

      // Use Supabase Edge Function to avoid CORS issues
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration missing')
      }

      // Call Supabase Edge Function
      const functionUrl = supabaseUrl.replace('.supabase.co', '.functions.supabase.co') + '/chat'
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          message: userMessage.text,
          conversationHistory: [...messages].map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `API request failed: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: stripEmojis(data.response || 'I apologize, but I couldn\'t generate a response.'),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      setIsTyping(false);

      if (supabase && currentConversationId) {
        try { await supabase.from('conversation_messages').insert({ conversation_id: currentConversationId, role: 'assistant', content: botMessage.text }) } catch {}
      }

      // Detect if bot has summarized and trigger the searching animation, then form
      const summaryKeywords = ['summarize','that\'s everything','you can now book','you can now view','strategy call','calendar below']
      const lowerBot = botMessage.text.toLowerCase()
      if (!showLeadForm && !searchingCandidates && summaryKeywords.some(k => lowerBot.includes(k))) {
        setSearchingCandidates(true)
        // After 2.5 seconds, show the form
        setTimeout(() => {
          setSearchingCandidates(false)
          setShowLeadForm(true)
        }, 2500)
      }

    } catch (error) {
      console.error('Error:', error);
      
      let errorText = "I'm sorry, but I'm having trouble connecting right now. Please try again in a moment.";
      
      if (error instanceof Error) {
        if (error.message.includes('API key not configured')) {
          errorText = "I'm sorry, but the AI service is not properly configured. Please contact support to get this fixed.";
        } else if (error.message.includes('API request failed')) {
          errorText = "I'm having trouble connecting to the AI service. Please check your internet connection and try again.";
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  // Compact Chatbot (Hero Section)
  if (!isFullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-[90vw] mx-auto relative overflow-hidden"
      >
        {/* Chatbot Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Staffly AI</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-slate-700 font-medium">Online • Ready to help</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {messages.slice(0, 3).map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                      : 'bg-gradient-to-r from-slate-600 to-slate-700'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                <div className={`px-4 py-3 rounded-2xl shadow ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-50 text-slate-900 border border-slate-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {messages.length > 3 && (
            <div className="text-center">
              <button
                onClick={() => setIsFullScreen(true)}
                className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors"
              >
                View full conversation →
              </button>
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="flex space-x-3">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What do you want to scale?"
            disabled={isLoading}
            className="flex-1 px-5 py-3 bg-white/90 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow text-slate-900 font-medium disabled:opacity-50 placeholder-slate-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
            className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsFullScreen(true)}
          className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <Minimize2 className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  // Full Screen Chatbot
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-slate-900">Staffly AI Assistant</h2>
              <p className="text-xs md:text-base text-slate-600 hidden sm:block">Your Operator specialist</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsFullScreen(false)}
            className="w-9 h-9 md:w-10 md:h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-[calc(100vh-120px)]">
          {/* Left Side - Chat Interface */}
          <div className="w-full md:w-4/5 border-r-0 md:border-r border-slate-200 p-4 md:p-6 flex flex-col">
            <div className="flex-1 space-y-6 mb-8 overflow-y-auto max-h-full">
              <AnimatePresence>
                {messages.map((message) => {
                  const parsed = message.sender === 'bot' ? extractOptions(message.text) : { cleanedText: message.text, options: [] as string[] };
                  const displayText = parsed.cleanedText;
                  const showOptions = parsed.options.length > 0 && message.sender === 'bot';
                  return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 md:space-x-3 max-w-[85%] md:max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-blue-600' 
                          : 'bg-slate-500'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        )}
                      </div>
                      <div className={`px-4 py-3 md:px-6 md:py-4 rounded-2xl shadow ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-50 text-slate-900 border border-slate-200'
                      }`}>
                        <p className="text-sm md:text-base leading-relaxed">{displayText}</p>
                        {showOptions && (
                          <div className="mt-3 md:mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                            {parsed.options.map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setInputText(opt);
                                  setTimeout(() => handleSendMessage(), 0);
                                }}
                                className="text-sm px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-700 hover:shadow-sm transition-colors text-left"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );})}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white/10 px-6 py-4 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              {/* Input Field */}
              <div className="flex space-x-2 md:space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What do you want to scale?"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 md:px-6 md:py-4 bg-white/80 border-2 border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg text-slate-900 font-medium disabled:opacity-50 placeholder-slate-500 text-sm md:text-lg"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputText.trim()}
                  className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex-shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 md:w-6 md:h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Intro / Searching / Gated Operator Profiles */}
          <div className="hidden md:block md:w-1/2 p-6">
            <div className="h-full bg-slate-50 rounded-2xl border border-slate-200 p-6 overflow-y-auto relative">
              {/* Searching for candidates animation */}
              {searchingCandidates && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 animate-pulse"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Finding Your Perfect Match</h3>
                  <p className="text-slate-600 max-w-md">
                    Searching our database of pre-vetted candidates...
                  </p>
                  <div className="mt-6 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}

              {/* Hero intro when conversation just starts */}
              {(!leadSubmitted && !showLeadForm && !searchingCandidates) && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-5xl font-black text-slate-900 mb-4">Hire A+ <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Operators</span></div>
                  <div className="text-2xl text-slate-700">— For 60% Less</div>
                  <p className="mt-6 text-slate-600 max-w-lg">Answer a few quick questions in the chat and I'll curate 2–3 pre-vetted Operator profiles for you.</p>
                </div>
              )}

              {!leadSubmitted && profilesUnlocked && (
                <h3 className="text-xl font-bold text-slate-900 mb-4">Curated Operator Profiles</h3>
              )}

              {/* Profiles Grid */}
              {!leadSubmitted && profilesUnlocked && (
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${profilesUnlocked ? '' : 'blur-sm select-none pointer-events-none'}`}>
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold">{['AM','JR','KP','LC','VN'][i]}</div>
                      <div>
                        <div className="font-semibold text-slate-900">{['Alexa M.','Jared R.','Kyla P.','Liam C.','Vera N.'][i]}</div>
                        <div className="text-slate-600 text-sm">{['Executive Assistant','Lead Gen Specialist','Project Coordinator','Customer Support','Creative Operator'][i]}</div>
                      </div>
                    </div>
                    <div className="text-slate-700 text-sm">
                      <div className="mb-1"><span className="font-medium">Strengths:</span> {[
                        'Inbox, Calendar, SOPs',
                        'Prospecting, Outreach, Booking',
                        'Timelines, Coordination, Docs',
                        'Tickets, SLAs, CRM',
                        'Video Editing, Canva, Thumbnails'
                      ][i]}</div>
                      <div className="text-slate-500 text-xs">Availability: Immediate • Timezone: PH</div>
                    </div>
                  </div>
                ))}
              </div>
              )}

              {/* Gating overlay */}
              {!leadSubmitted && showLeadForm && !profilesUnlocked && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 w-full max-w-md">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Unlock your curated profiles</h4>
                    <p className="text-slate-600 text-sm mb-4">Complete this quick form and we’ll send 2–3 best-fit candidates to your email.</p>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        const phoneDigits = leadPhone.replace(/\D/g, '');
                        if (!leadName.trim()) return;
                        if (!emailRegex.test(leadEmail)) return;
                        if (phoneDigits.length < 7) return;
                        // Save lead to Supabase, then show confirmation popup
                        setProfilesUnlocked(false);
                        setLeadSubmitted(true);
                        setConfirmationOpen(true);
                        console.log('Lead captured', { leadName, leadEmail, leadPhone });
                        try {
                          if (supabase) {
                            // Extract qualification data from conversation
                            const qualData = extractQualificationData(messages)
                            console.log('Extracted qualification data:', qualData)
                            
                            // Update conversation row with lead info + qualification data
                            if (conversationId) {
                              await supabase.from('conversations').update({
                                lead_name: leadName,
                                lead_email: leadEmail,
                                lead_phone: leadPhone,
                                service: qualData.service,
                                industry: qualData.industry,
                                goal: qualData.goal,
                                company: qualData.company,
                                team_size: qualData.team_size,
                                revenue_range: qualData.revenue_range,
                                role_or_scope: qualData.role_or_scope,
                                hours_per_week: qualData.hours_per_week,
                                timezone: qualData.timezone,
                                tools_stack: qualData.tools_stack,
                                tech_stack: qualData.tech_stack,
                                api_access: qualData.api_access,
                                timeline: qualData.timeline
                              }).eq('id', conversationId);
                            }
                            // Also insert/upsert into a leads table for CRM-like tracking
                            await supabase.from('leads').upsert({
                              email: leadEmail,
                              name: leadName,
                              phone: leadPhone,
                              conversation_id: conversationId || null,
                              created_at: new Date().toISOString()
                            }, { onConflict: 'email' });

                            // Fetch candidates and match
                            const { data: candidates } = await supabase
                              .from('candidates')
                              .select('*')
                              .eq('status', 'active')
                              .eq('availability_status', 'available')
                            
                            if (candidates && candidates.length > 0) {
                              // Match top 5 candidates using the algorithm
                              const leadData: Lead = qualData
                              const matched = matchCandidates(leadData, candidates as Candidate[], 5)
                              console.log('Matched top 5 candidates:', matched)

                              // Generate email content with HTML
                              const baseUrl = window.location.origin
                              const { subject, body, htmlBody } = generateMatchEmail(leadName, leadData, matched, baseUrl)
                              console.log('Email to send:', { 
                                subject, 
                                to: leadEmail, 
                                plainText: body.substring(0, 200) + '...',
                                htmlPreview: 'HTML email generated with clickable profile links'
                              })
                              console.log('Full HTML Body:', htmlBody)

                              // Send email via Resend
                              try {
                                const { sendMatchEmail } = await import('../api/sendEmail')
                                const emailResult = await sendMatchEmail(leadEmail, subject, body, htmlBody)
                                
                                if (emailResult.success) {
                                  console.log('✅ Email sent successfully to', leadEmail)
                                } else {
                                  console.error('❌ Email failed:', emailResult.error)
                                  alert(`Email sending failed: ${emailResult.error}`)
                                }
                              } catch (emailError) {
                                console.error('Email error:', emailError)
                              }
                            }
                          }
                        } catch (err) {
                          console.warn('Lead save/matching failed', err);
                        }
                      }}
                      className="space-y-3"
                    >
                      <input
                        type="text"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="email"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="tel"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
                      >
                        Continue to Calendar
                      </button>
                      {/* no prefilled email from chat */}
                    </form>
                  </div>
                </div>
              )}

              {/* Confirmation popup after submit */}
              {confirmationOpen && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 w-full max-w-md text-center">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Email sent!</h4>
                    <p className="text-slate-700 mb-4">You can check the profiles there.</p>
                    <button
                      onClick={() => {
                        setConfirmationOpen(false);
                        setShowCalendarOnRight(true);
                        const calMsg: Message = {
                          id: (Date.now() + 6).toString(),
                          text: 'If you want to book a strategy call, you can schedule a meeting on the calendar on the right.',
                          sender: 'bot',
                          timestamp: new Date()
                        };
                        setMessages(prev => [...prev, calMsg]);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >Close</button>
                  </div>
                </div>
              )}

              {/* Calendar on the right panel after form submit */}
              {showCalendarOnRight && !confirmationOpen && (
                <div className="h-full flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Book your strategy call</h3>
                  <div style={{ width: '100%', height: '650px', overflow: 'auto' }}>
                    <Cal namespace="45-strategy-call" calLink="stafflyai/45-strategy-call" style={{ width: '100%', height: '100%', overflow: 'scroll' }} config={{ layout: 'month_view' }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FullScreenChatbot;
