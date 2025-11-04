import { supabase } from './supabase'

export interface CandidateSignupData {
  email: string
  password: string
  fullName: string
  phone?: string
}

export interface CandidateLoginData {
  email: string
  password: string
}

/**
 * Sign up a new candidate
 */
export async function signupCandidate(
  email: string,
  password: string,
  fullName: string,
  phone?: string
) {
  if (!supabase) {
    throw new Error('Supabase client not configured')
  }

  // Get the current window location for redirect URL
  const redirectUrl = `${window.location.origin}/candidate/login`

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_type: 'candidate',
        full_name: fullName,
        phone: phone || '',
      },
      emailRedirectTo: redirectUrl,
    },
  })

  if (error) return { error: error.message }
  return { data: authData, error: null }
}

/**
 * Log in a candidate
 */
export async function loginCandidate(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase client not configured')
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return { error: error.message }
  return { data: authData, error: null }
}

/**
 * Log out the current user
 */
export async function logoutCandidate() {
  if (!supabase) {
    throw new Error('Supabase client not configured')
  }

  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Get current candidate session
 */
export async function getCandidateSession() {
  if (!supabase) {
    return null
  }

  const { data: { session } } = await supabase.auth.getSession()
  return session
}

/**
 * Get current candidate profile
 */
export async function getCandidateProfile() {
  if (!supabase) {
    return null
  }

  const session = await getCandidateSession()
  if (!session?.user) return null

  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  if (error) {
    console.error('Error fetching candidate profile:', error)
    return null
  }

  return data
}

/**
 * Update candidate profile
 */
export async function updateCandidateProfile(profileData: any) {
  if (!supabase) {
    throw new Error('Supabase client not configured')
  }

  const session = await getCandidateSession()
  if (!session?.user) {
    throw new Error('No authenticated user')
  }

  const { data, error } = await supabase
    .from('candidates')
    .update(profileData)
    .eq('user_id', session.user.id)
    .select()
    .single()

  if (error) throw error
  return data
}

