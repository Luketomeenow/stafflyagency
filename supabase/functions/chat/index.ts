// Supabase Edge Function for Chatbot
// This proxies OpenAI API calls to avoid CORS issues

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, conversationHistory = [] } = await req.json()

    // Get OpenAI API key from environment
    const openAiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // System prompt for Staffly AI
    const systemPrompt = `You are Staffly AI, a helpful virtual assistant specialist. You help businesses find and hire virtual assistants for various roles like:
    - Virtual Admin
    - Customer Support
    - Social Media Management
    - Data Entry
    - Project Management
    - Digital Marketing
    - Content Creation
    - Bookkeeping
    
    Be professional, helpful, and provide specific advice about virtual assistant services. Keep responses concise but informative. If someone asks about pricing, mention that Staffly offers competitive rates starting at $299/month and that you can connect them with a specialist for detailed pricing.
    
    Always be friendly, professional, and focus on how Staffly can help businesses with their virtual assistant needs.`

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

