import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// More robust error handling for production
if (!url || !anon) {
  console.warn('Supabase environment variables not configured:', {
    hasUrl: !!url,
    hasAnonKey: !!anon
  })
}

export const supabase = url && anon ? createClient(url, anon) : null



