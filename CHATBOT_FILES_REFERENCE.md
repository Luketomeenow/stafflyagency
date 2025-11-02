# 🤖 AI Chatbot - Complete File Reference

This document lists all files connected to the Staffly AI Chatbot system.

---

## 📁 **Core Chatbot Files**

### **1. Main Chatbot Component**
**File:** `src/components/FullScreenChatbot.tsx`
- **Purpose:** Main full-screen chatbot UI component
- **Features:**
  - Real-time chat interface
  - Message history
  - Quick response buttons
  - Lead qualification form
  - Candidate matching integration
  - Cal.com scheduling integration
  - RAG (Retrieval-Augmented Generation) search
- **Dependencies:**
  - OpenAI API for chat completions
  - Supabase for RAG search
  - Cal.com for appointment scheduling
  - Candidate matching algorithm
- **Key Functions:**
  - `handleSendMessage()` - Sends user messages to OpenAI
  - `ragSearch()` - Searches knowledge base
  - `extractOptions()` - Parses bot response for quick replies
  - `stripEmojis()` - Cleans text formatting

---

### **2. Legacy Chatbot Component**
**File:** `src/components/AIChatbot.tsx`
- **Purpose:** Original smaller chatbot component (may be deprecated)
- **Note:** Check if this is still in use or if FullScreenChatbot replaced it

---

## 🔌 **API & Integration Files**

### **3. Chat API Service**
**File:** `src/api/chatApi.ts`
- **Purpose:** Handles OpenAI API requests
- **Functions:**
  - `sendMessage()` - Sends chat messages to OpenAI
  - System prompt configuration
  - Error handling
- **Environment Variables Required:**
  - `VITE_OPENAI_API_KEY`
  - `VITE_OPENAI_MODEL`

---

### **4. RAG (Knowledge Base) System**
**File:** `src/knowledge/rag.ts`
- **Purpose:** PDF parsing and knowledge base search
- **Features:**
  - PDF text extraction
  - Document chunking
  - Knowledge base ingestion
- **Functions:**
  - `buildChunksFromPdf()` - Extracts text from PDF
  - `ingestPdfIfRequested()` - Loads PDF into knowledge base
- **Dependencies:**
  - `pdfjs-dist` library
  - PDF worker configuration

---

### **5. Knowledge Base PDF**
**File:** `src/knowledge/knowledge-base.pdf`
- **Purpose:** Source document for RAG system
- **Content:** Company information, services, FAQs, etc.
- **Note:** Update this PDF to change chatbot's knowledge

---

### **6. Knowledge Loader**
**File:** `src/knowledge/loader.ts`
- **Purpose:** Helper functions for loading knowledge base
- **May contain:** Initialization logic, caching, etc.

---

## 🎯 **Candidate Matching System**

### **7. Candidate Matching Algorithm**
**File:** `src/lib/candidateMatching.ts`
- **Purpose:** Matches leads with suitable candidates
- **Features:**
  - Lead qualification scoring
  - Candidate ranking algorithm
  - Match email generation
- **Key Functions:**
  - `matchCandidates()` - Scores and ranks candidates
  - `generateMatchEmail()` - Creates match notification emails
- **Types:**
  - `Lead` - Lead qualification data
  - `Candidate` - Candidate profile data
  - `MatchResult` - Match scores and rankings

---

## 🗄️ **Database & Backend**

### **8. Supabase Client**
**File:** `src/lib/supabase.ts`
- **Purpose:** Supabase client configuration
- **Used For:**
  - RAG search queries
  - Candidate data fetching
  - Lead storage
- **Environment Variables Required:**
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

---

### **9. Edge Function - Send Match Email**
**File:** `supabase/functions/send-match-email/index.ts`
- **Purpose:** Serverless function to send match notification emails
- **Triggered By:** Chatbot after candidate matching
- **Sends To:** Admin/team when lead is matched with candidates

---

## 📧 **Email Integration**

### **10. Email API Service**
**File:** `src/api/sendEmail.ts`
- **Purpose:** Handles email sending (Resend integration)
- **May be used for:** Lead notifications, contact forms

---

## 🎨 **UI Components Using Chatbot**

### **11. Hero Section**
**File:** `src/components/hero-1.tsx`
- **Purpose:** Main hero section with chatbot integration
- **Includes:** FullScreenChatbot component
- **Location:** Top of homepage

---

### **12. AI Agent Page**
**File:** `src/pages/AIAgentPage.tsx`
- **Purpose:** Main landing page with chatbot
- **Includes:** Hero section with chatbot
- **Route:** `/` (homepage)

---

### **13. Landing Page**
**File:** `src/pages/LandingPage.tsx`
- **Purpose:** Alternative landing page layout
- **May Include:** AIChatbot component

---

## 🎛️ **Navigation Components**

### **14. Header**
**File:** `src/components/header-1.tsx`
- **Purpose:** Main navigation header
- **Chatbot Link:** "Start Scaling" button redirects to `/#chat`

---

### **15. Floating Navbar**
**File:** `src/components/FloatingNavbar.tsx`
- **Purpose:** Floating navigation menu
- **Chatbot Link:** "Start Scaling" button redirects to `/#chat`

---

### **16. Footer**
**File:** `src/components/footer-1.tsx`
- **Purpose:** Site footer
- **Chatbot Link:** "Start Scaling" button redirects to `/#chat`

---

### **17. Call to Action**
**File:** `src/components/call-to-action-1.tsx`
- **Purpose:** CTA section throughout site
- **Chatbot Link:** May include "Start Scaling" button

---

## 📄 **Documentation Files**

### **18. Chatbot Setup Guide**
**File:** `CHATBOT_SETUP.md`
- **Purpose:** Setup instructions for chatbot
- **Includes:**
  - Environment variable configuration
  - OpenAI API key setup
  - Troubleshooting guide
  - Customization options

---

### **19. Edge Function Setup**
**File:** `EDGE_FUNCTION_SETUP.md`
- **Purpose:** Instructions for deploying Supabase Edge Functions
- **Related To:** Match email sending function

---

### **20. Email Setup Guide**
**File:** `EMAIL_SETUP.md`
- **Purpose:** Email service configuration (Resend)
- **Related To:** Match notification emails

---

### **21. Resend Setup**
**File:** `RESEND_SETUP.md`
- **Purpose:** Resend email service setup
- **Related To:** Email notifications from chatbot

---

## ⚙️ **Configuration Files**

### **22. Environment Variables**
**File:** `.env` (not in repo, create locally)
- **Required Variables:**
  ```bash
  VITE_OPENAI_API_KEY=sk-...
  VITE_OPENAI_MODEL=gpt-4o-mini
  VITE_SUPABASE_URL=https://...supabase.co
  VITE_SUPABASE_ANON_KEY=eyJ...
  ```

---

### **23. Vite Configuration**
**File:** `vite.config.ts`
- **Purpose:** Build configuration
- **May Include:** API proxy settings for development

---

### **24. Netlify Configuration**
**File:** `netlify.toml`
- **Purpose:** Deployment configuration
- **Includes:** Environment variable references
- **Build Settings:** For production deployment

---

## 📊 **Data & Types**

### **25. TypeScript Declarations**
**File:** `src/vite-env.d.ts`
- **Purpose:** TypeScript type definitions
- **May Include:** Chatbot-related types

---

## 🧪 **Testing & Guides**

### **26. Testing Guide**
**File:** `TESTING_GUIDE.md`
- **Purpose:** Testing procedures
- **May Include:** Chatbot testing scenarios

---

### **27. Setup Instructions**
**File:** `SETUP_INSTRUCTIONS.txt`
- **Purpose:** General setup guide
- **May Include:** Chatbot configuration steps

---

## 🎨 **Related Feature Components**

### **28. Cal.com Embed**
**File:** `src/components/CalComEmbed.tsx`
- **Purpose:** Standalone Cal.com calendar embed
- **Used By:** Chatbot for appointment scheduling
- **Integration:** `@calcom/embed-react`

---

### **29. Features Section**
**File:** `src/components/feature-2.tsx`
- **Purpose:** Features showcase
- **May Reference:** Chatbot as a feature

---

## 📦 **Dependencies**

### **NPM Packages Used by Chatbot:**

From `package.json`:
- `openai` or direct fetch to OpenAI API
- `@supabase/supabase-js` - Database and RAG search
- `pdfjs-dist` - PDF parsing for knowledge base
- `@calcom/embed-react` - Calendar scheduling
- `framer-motion` - UI animations
- `lucide-react` - Icons (MessageCircle, Send, Bot, etc.)
- `react` & `react-dom` - Core framework

---

## 🔄 **Data Flow Diagram**

```
User Types Message
       ↓
FullScreenChatbot.tsx
       ↓
ragSearch() → Supabase Edge Function (if enabled)
       ↓                    ↓
       ↓              Returns relevant
       ↓              knowledge chunks
       ↓                    ↓
chatApi.ts ← Context from RAG
       ↓
OpenAI API (GPT-4o-mini)
       ↓
AI Response Generated
       ↓
FullScreenChatbot.tsx
       ↓
extractOptions() → Quick reply buttons
       ↓
Lead Qualification Form (if triggered)
       ↓
candidateMatching.ts
       ↓
Matched Candidates Displayed
       ↓
User books call → Cal.com Integration
       ↓
Match Email Sent → supabase/functions/send-match-email
```

---

## 🚀 **Key Environment Variables**

| Variable | Purpose | Required |
|----------|---------|----------|
| `VITE_OPENAI_API_KEY` | OpenAI API authentication | ✅ Yes |
| `VITE_OPENAI_MODEL` | AI model (gpt-4o-mini) | ✅ Yes |
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase public key | ✅ Yes |

---

## 📝 **System Prompt Location**

The chatbot's personality and behavior are defined in:
**`src/components/FullScreenChatbot.tsx`** (line ~49)

```typescript
const SYSTEM_PROMPT = `0) SYSTEM ROLE (Core Prompt)
You are the official StafflyAI Assistant...
```

**To Customize:** Edit this string to change chatbot behavior.

---

## 🎯 **Chatbot Features**

1. ✅ **Real-time AI Chat** - OpenAI GPT-4o-mini powered
2. ✅ **RAG Search** - Knowledge base from PDF
3. ✅ **Lead Qualification** - Multi-step form
4. ✅ **Candidate Matching** - AI-powered matching algorithm
5. ✅ **Quick Replies** - Suggested responses
6. ✅ **Cal.com Integration** - Direct appointment booking
7. ✅ **Email Notifications** - Match alerts to team
8. ✅ **Responsive Design** - Mobile-friendly UI
9. ✅ **Animated UI** - Framer Motion effects
10. ✅ **Message History** - Conversation persistence

---

## 🛠️ **How to Modify the Chatbot**

### **Change AI Behavior:**
Edit `SYSTEM_PROMPT` in `src/components/FullScreenChatbot.tsx`

### **Update Knowledge Base:**
Replace `src/knowledge/knowledge-base.pdf` with new PDF

### **Modify Quick Replies:**
Edit `extractOptions()` parsing logic in `FullScreenChatbot.tsx`

### **Change Matching Algorithm:**
Edit scoring logic in `src/lib/candidateMatching.ts`

### **Update Lead Form:**
Modify the lead qualification form JSX in `FullScreenChatbot.tsx`

### **Change Calendar Link:**
Update Cal.com link in `FullScreenChatbot.tsx` (search for "calLink")

---

## 📊 **File Count Summary**

- **Core Chatbot Files:** 5
- **API & Integration:** 5
- **UI Components:** 7
- **Documentation:** 6
- **Configuration:** 3
- **Edge Functions:** 1
- **Knowledge Base:** 1

**Total: ~28 files directly connected to chatbot system**

---

## 🔍 **Quick File Finder**

**Need to change chatbot text/behavior?**
→ `src/components/FullScreenChatbot.tsx`

**Need to update knowledge base?**
→ `src/knowledge/knowledge-base.pdf`

**Need to fix API errors?**
→ Check `.env` variables, then `src/api/chatApi.ts`

**Need to modify candidate matching?**
→ `src/lib/candidateMatching.ts`

**Need to change calendar integration?**
→ `src/components/CalComEmbed.tsx` or search "calLink" in FullScreenChatbot

**Need to update email notifications?**
→ `supabase/functions/send-match-email/index.ts`

---

**Last Updated:** 2025-01-30  
**Chatbot Version:** FullScreenChatbot with RAG + Candidate Matching  
**AI Model:** GPT-4o-mini

