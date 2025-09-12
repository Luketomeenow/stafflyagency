import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, User, Bot, Loader2, X, Minimize2 } from 'lucide-react';
// RAG: use server-side search; keep client MiniSearch fallback only if needed
import { ingestPdfIfRequested } from '../knowledge/rag';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are Staffly AI, the friendly, concise, and professional “Staffly Guide.” You help founders and business owners match with the right Filipino Virtual Assistants (VAs) so they can free up time and focus on growth.

OBJECTIVE
- Qualify the user, discover their pain, recommend a VA type, collect an email, optionally offer a call, and confirm next steps.
- Keep messages short (1–3 sentences), ask only one question at a time, and present clear options.
- Be upbeat and business-focused. Use light emojis (✅ 📅 ✉️) sparingly.

HOW TO USE KNOWLEDGE
- You may receive an additional hidden instruction titled “Staffly Knowledge” containing snippets from internal documents (with page numbers).
- When a user asks a specific factual question, first consult these snippets and answer using them. Prefer these over general knowledge. Do NOT mention “system” or “snippets.”
- Briefly cite like: “(Source: page X)” when the answer clearly derives from a snippet.
- If no relevant snippet exists, say you don’t have that in your notes and offer to check with the team, then continue the flow.
- After answering any off-flow question, gracefully steer back to the next step of the flow.

PRICING POLICY
- If asked about pricing: "Staffly offers three service tiers: Staffly Starter at $1,800/month (up to 120 hours), Staffly Growth at $2,500/month (up to 160 hours - our most popular), and Staffly Executive with custom pricing based on your specific needs. I can connect you with a specialist for detailed pricing."

GUARDRAILS
- Never collect payment or sensitive data. Only collect email for sending curated profiles.
- Validate email format; if invalid, ask once more for a valid email.
- If the user declines to continue, offer to send a quick checklist and end politely if they refuse.

CONVERSATION FLOW (one step per turn)
1) GREETING & POSITIONING
   “👋 Hey there! I’m your Staffly Guide… Can I ask a few quick questions to recommend the right VA for your business?”
   Options: [Yes, let’s do it ✅] [Not right now ❌]

2) QUALIFYING QUESTIONS
   Q1 Industry? Options: [Agency / Marketing] [Coaching / Consulting] [E-commerce] [Real Estate] [Other]
   Q2 Team size? Options: [Just me] [2–5 employees] [6–15 employees] [15+ employees]
   Q3 Approx. monthly revenue? Options: [Under $10k/month] [$10k–$50k/month] [$50k–$200k/month] [$200k+/month]

3) PAIN DISCOVERY
   “Which challenge sounds most like you right now?”
   Options: [Generating more leads & sales] [I’m drowning in admin / inbox / scheduling] [Too much time on creative work] [Other challenges]

4) OBJECTION SOFTENER (if user hesitates)
   “Many founders are stuck in low‑value tasks. Do you spend more time on sales & growth or admin/ops?”
   Options: [Sales & Growth] [Admin/Operational tasks]

5) PRESCRIPTION (RECOMMENDATION)
   Map pain → VA type:
   - Leads/Sales → Lead Generation VA (prospecting, outreach, appointment setting → more deals closed)
   - Admin drowning → Executive/Advanced Admin VA (inbox, calendar, recurring ops → focus on high‑value work)
   - Creative overload → Creative VA (video editing, Canva/design → offload time‑consuming creative)
   - Other → ask one clarifying question, then map accordingly.
   Format: “Based on what you’ve shared, I recommend a [VA Type]. They’ll handle [2–3 key tasks] so you can [business outcome].”

6) CLOSE & NEXT STEP (EMAIL)
   “I’ll send you 2–3 curated VA profiles from our pre‑vetted database matched to your needs. What’s the best email to send them to? ✉️”
   Validate email; if invalid, ask once more.
   After a valid email, optionally ask: “Would you like to book a quick call to walk through the candidates together?” Options: [Yes, schedule a call 📅] [No thanks, just send profiles]

7) CONFIRMATION
   “Perfect! 🎉 Your curated VA matches will be on their way within 24 hours.” If a call is booked, confirm enthusiastically.

STYLE & UX RULES
- One question per turn. Options in square brackets like buttons.
- Keep replies skimmable. Infer and confirm when users reply in free text.
- After answering any knowledge question, return to the flow without repeating prior steps.

REFERENCE REMINDERS
- Lead Gen VA: prospecting, list-building, outreach, follow-ups, appointment setting.
- Exec/Admin VA: inbox triage, calendar, SOPs, recurring ops, light project coordination.
- Creative VA: video editing, thumbnails, Canva/design, light content repurposing.
- Pricing line: “Starting at $299/month” with offer to connect to a specialist.`;

interface FullScreenChatbotProps {
  autoOpen?: boolean;
}

const FullScreenChatbot: React.FC<FullScreenChatbotProps> = ({ autoOpen = false }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hey there! I’m your Staffly Guide. I help founders and business owners like you match with the right Filipino VAs so you can free up time and focus on growth. Can I ask you a few quick questions so I can recommend the right VA for your business?",
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
  
  // Handle autoOpen prop
  useEffect(() => {
    if (autoOpen) {
      setIsFullScreen(true);
    }
  }, [autoOpen]);
  
  // Optional query param ?ingest=1 to ingest the PDF to Supabase via Edge Function
  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
    ingestPdfIfRequested(supabaseUrl, anonKey)
  }, [])

  // Create conversation on mount
  useEffect(() => {
    (async () => {
      try {
        if (!supabase) return
        const sessionId = crypto.randomUUID()
        const res = await supabase
          .from('conversations')
          .insert({ session_id: sessionId, metadata: { user_agent: navigator.userAgent } })
          .select('id')
          .single()
        if (res.error) throw res.error
        setConversationId(res.data.id)
      } catch (e) {
        console.warn('Conversation create failed', e)
      }
    })()
  }, [])

  // Lead capture and gated profiles state
  const [capturedEmail, setCapturedEmail] = useState<string | null>(null);
  const [profilesUnlocked, setProfilesUnlocked] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [showSearching, setShowSearching] = useState(false);

  useEffect(() => {
    if (capturedEmail && !profilesUnlocked) {
      setLeadEmail(capturedEmail);
    }
  }, [capturedEmail, profilesUnlocked]);

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
      if (supabase && conversationId) {
        try { await supabase.from('conversation_messages').insert({ conversation_id: conversationId, role: 'user', content: userMessage.text }) } catch {}
      }
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo';

      if (!apiKey) {
        console.error('OpenAI API key not configured');
        throw new Error('OpenAI API key not configured');
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

      // Use direct OpenAI API in production, proxy in development
      const apiUrl = import.meta.env.DEV 
        ? '/api/openai/v1/chat/completions'
        : 'https://api.openai.com/v1/chat/completions';
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: openAiMessages,
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.choices[0].message.content,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      setIsTyping(false);

      if (supabase && conversationId) {
        try { await supabase.from('conversation_messages').insert({ conversation_id: conversationId, role: 'assistant', content: botMessage.text }) } catch {}
      }

      // Detect email capture from user's last message
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(userMessage.text)) {
        setCapturedEmail(userMessage.text);
        // simulate searching animation before showing profiles
        setShowSearching(true);
        setTimeout(() => {
          setShowSearching(false);
        }, 1800);
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
                  <div className={`px-4 py-3 rounded-2xl shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                      : 'bg-slate-100 text-slate-900 rounded-bl-md border border-slate-200'
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
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
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
            className="flex-1 px-5 py-3 bg-white/80 border-2 border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg text-slate-900 font-medium disabled:opacity-50 placeholder-slate-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
        className="fixed inset-0 z-50 bg-gradient-to-br from-slate-50 via-white to-blue-50"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Staffly AI Assistant</h2>
              <p className="text-slate-600">Your virtual assistant specialist</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsFullScreen(false)}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[calc(100vh-120px)]">
          {/* Left Side - Chat Interface */}
          <div className="w-4/5 border-r border-slate-200 p-6 flex flex-col">
            <div className="flex-1 space-y-4 mb-6 overflow-y-auto max-h-full">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                          : 'bg-gradient-to-r from-slate-400 to-slate-500'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className={`px-6 py-4 rounded-2xl shadow-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                          : 'bg-slate-100 text-slate-900 rounded-bl-md border border-slate-200'
                      }`}>
                        <p className="text-base leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
              <div className="flex space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What do you want to scale?"
                  disabled={isLoading}
                  className="flex-1 px-6 py-4 bg-white/80 border-2 border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg text-slate-900 font-medium disabled:opacity-50 placeholder-slate-500 text-lg"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputText.trim()}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Send className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Intro / Searching / Gated VA Profiles */}
          <div className="w-1/2 p-6">
            <div className="h-full bg-slate-50 rounded-2xl border border-slate-200 p-6 overflow-y-auto relative">
              {/* Hero intro when conversation just starts */}
              {(!capturedEmail && !showSearching) && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-5xl font-black text-slate-900 mb-4">Hire A+ <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Operators</span></div>
                  <div className="text-2xl text-slate-700">— For 60% Less</div>
                  <p className="mt-6 text-slate-600 max-w-lg">Answer a few quick questions in the chat and I’ll curate 2–3 pre-vetted VA profiles for you.</p>
                </div>
              )}

              {/* Searching animation after email capture */}
              {capturedEmail && showSearching && (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mb-4"></div>
                  <p className="text-slate-700 font-medium">Finding your best-fit profiles…</p>
                  <p className="text-slate-500 text-sm mt-1">Matching skills, availability, and track record</p>
                </div>
              )}

              {(capturedEmail || profilesUnlocked || showSearching) && (
                <h3 className="text-xl font-bold text-slate-900 mb-4">Curated VA Profiles</h3>
              )}

              {/* Profiles Grid */}
              {(capturedEmail || profilesUnlocked || showSearching) && (
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${profilesUnlocked ? '' : 'blur-sm select-none pointer-events-none'}`}>
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold">{['AM','JR','KP','LC','VN'][i]}</div>
                      <div>
                        <div className="font-semibold text-slate-900">{['Alexa M.','Jared R.','Kyla P.','Liam C.','Vera N.'][i]}</div>
                        <div className="text-slate-600 text-sm">{['Executive Assistant','Lead Gen Specialist','Project Coordinator','Customer Support','Creative VA'][i]}</div>
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
              {capturedEmail && !profilesUnlocked && !showSearching && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 w-full max-w-md">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Unlock your curated profiles</h4>
                    <p className="text-slate-600 text-sm mb-4">Complete this quick form and we’ll reveal 2–3 best-fit candidates immediately.</p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        const phoneDigits = leadPhone.replace(/\D/g, '');
                        if (!leadName.trim()) return;
                        if (!emailRegex.test(leadEmail)) return;
                        if (phoneDigits.length < 7) return;
                        setProfilesUnlocked(true);
                        // TODO: send to backend or webhook if available
                        console.log('Lead captured', { leadName, leadEmail, leadPhone });
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
                        View Profiles
                      </button>
                      {!!capturedEmail && (
                        <div className="text-xs text-slate-500 text-center">Using email from chat: {capturedEmail}</div>
                      )}
                    </form>
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
