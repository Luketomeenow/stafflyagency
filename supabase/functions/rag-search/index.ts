// Supabase Edge Function for RAG Search
// Searches the knowledge_chunks table for relevant content

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
    const { query, top_k = 3, min_similarity = 0.2 } = await req.json()

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Get Supabase credentials
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const openAiKey = Deno.env.get('OPENAI_API_KEY')

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if we have OpenAI key for embeddings
    if (openAiKey) {
      // Generate embedding for the query using OpenAI
      try {
        const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'text-embedding-ada-002',
            input: query,
          }),
        })

        if (embeddingResponse.ok) {
          const embeddingData = await embeddingResponse.json()
          const queryEmbedding = embeddingData.data[0].embedding

          // Search using vector similarity (if embedding column exists)
          const { data: vectorResults, error: vectorError } = await supabase
            .rpc('match_knowledge_chunks', {
              query_embedding: queryEmbedding,
              match_threshold: min_similarity,
              match_count: top_k
            })

          if (!vectorError && vectorResults && vectorResults.length > 0) {
            console.log(`Found ${vectorResults.length} matches via vector search`)
            return new Response(
              JSON.stringify({ 
                matches: vectorResults.map((r: any) => ({
                  content: r.content,
                  page: r.page || r.metadata?.page || 1,
                  similarity: r.similarity
                })),
                method: 'vector'
              }),
              { 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200 
              }
            )
          }
        }
      } catch (embeddingError) {
        console.warn('Embedding search failed, falling back to text search:', embeddingError)
      }
    }

    // Fallback: Text-based search using PostgreSQL full-text search
    const searchTerms = query.toLowerCase().split(/\s+/).filter((t: string) => t.length > 2)
    
    if (searchTerms.length === 0) {
      return new Response(
        JSON.stringify({ matches: [], method: 'none' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    // Build search query - look for any of the search terms
    // Table has columns: id, file, page, chunk_index, content, embedding
    const { data: textResults, error: textError } = await supabase
      .from('knowledge_chunks')
      .select('content, page, chunk_index, file')
      .or(searchTerms.map((term: string) => `content.ilike.%${term}%`).join(','))
      .limit(top_k)

    if (textError) {
      console.error('Text search error:', textError)
      // Try simple select as last resort
      const { data: simpleResults } = await supabase
        .from('knowledge_chunks')
        .select('content, page, chunk_index, file')
        .limit(top_k)

      return new Response(
        JSON.stringify({ 
          matches: (simpleResults || []).map((r: any) => ({
            content: r.content,
            page: r.page || 1,
            file: r.file,
            similarity: 0.5
          })),
          method: 'simple'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    console.log(`Found ${textResults?.length || 0} matches via text search for query: "${query}"`)

    return new Response(
      JSON.stringify({ 
        matches: (textResults || []).map((r: any) => ({
          content: r.content,
          page: r.page || 1,
          file: r.file,
          similarity: 0.7 // Approximate score for text matches
        })),
        method: 'text'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('RAG search error:', error)
    
    return new Response(
      JSON.stringify({ 
        matches: [],
        error: error.message,
        method: 'error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 // Return 200 so chat continues even if RAG fails
      }
    )
  }
})

