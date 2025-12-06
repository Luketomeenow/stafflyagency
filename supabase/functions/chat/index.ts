// Supabase Edge Function for Chatbot
// This proxies OpenAI API calls to avoid CORS issues

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    })
  }

  try {
    const { message, conversationHistory = [] } = await req.json()

    // Get OpenAI API key from environment
    const openAiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // System prompt for Staffly AI
    const systemPrompt = `You are StafflyAI Assistant, helping business owners find the right Filipino Operators (remote team members) for their business.

IMPORTANT: Always use "Operators" instead of "VAs" or "virtual assistants". Staffly provides skilled Filipino Operators.

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
- After collecting all info, always end with the summary and form prompt`

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    // Call OpenAI API
    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!openAiResponse.ok) {
      const errorData = await openAiResponse.text()
      console.error('OpenAI API Error:', errorData)
      throw new Error(`OpenAI API failed: ${openAiResponse.status}`)
    }

    const data = await openAiResponse.json()
    const botResponse = data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.'

    // Log conversation (optional - for analytics)
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
      
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey)
        
        await supabase.from('chat_logs').insert({
          user_message: message,
          bot_response: botResponse,
          timestamp: new Date().toISOString()
        })
      }
    } catch (logError) {
      console.error('Failed to log conversation:', logError)
      // Don't fail the request if logging fails
    }

    return new Response(
      JSON.stringify({ 
        response: botResponse,
        success: true 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Chat function error:', error)
    
    return new Response(
      JSON.stringify({ 
        response: "I'm sorry, I'm experiencing technical difficulties. Please try again later or contact our support team.",
        error: error.message,
        success: false
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

