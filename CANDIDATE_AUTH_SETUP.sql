-- ============================================
-- CANDIDATE AUTHENTICATION SETUP
-- Link candidates table to Supabase Auth users
-- ============================================

-- Add user_id column to candidates table to link with auth.users
ALTER TABLE public.candidates 
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false;

-- Create unique index on user_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_candidates_user_id ON public.candidates(user_id);

-- Update RLS policies for authenticated candidate users
DROP POLICY IF EXISTS "Allow anon SELECT on candidates" ON public.candidates;
DROP POLICY IF EXISTS "Allow authenticated INSERT on candidates" ON public.candidates;
DROP POLICY IF EXISTS "Allow authenticated UPDATE on candidates" ON public.candidates;
DROP POLICY IF EXISTS "Allow authenticated DELETE on candidates" ON public.candidates;

-- Allow any authenticated user to SELECT active candidates
CREATE POLICY "Allow authenticated SELECT active candidates" ON public.candidates
  FOR SELECT TO authenticated USING (status = 'active');

-- Allow anon users to SELECT active candidates (for public job board)
CREATE POLICY "Allow anon SELECT active candidates" ON public.candidates
  FOR SELECT TO anon USING (status = 'active');

-- Allow candidates to INSERT their own profile (one-time during signup)
CREATE POLICY "Allow candidate INSERT own profile" ON public.candidates
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Allow candidates to UPDATE only their own profile
CREATE POLICY "Allow candidate UPDATE own profile" ON public.candidates
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Allow candidates to SELECT their own profile even if not active
CREATE POLICY "Allow candidate SELECT own profile" ON public.candidates
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Function to create candidate profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_candidate_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create candidate profile if user metadata indicates they're a candidate
  IF NEW.raw_user_meta_data->>'user_type' = 'candidate' THEN
    INSERT INTO public.candidates (
      user_id,
      email,
      name,
      status,
      availability_status,
      onboarding_completed
    ) VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
      'inactive', -- Set to inactive until profile is completed
      'unavailable',
      false
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create candidate profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created_candidate ON auth.users;
CREATE TRIGGER on_auth_user_created_candidate
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_candidate_user();

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON COLUMN public.candidates.user_id IS 'Foreign key to auth.users - links candidate to authentication';
COMMENT ON COLUMN public.candidates.onboarding_completed IS 'Whether candidate has completed their profile setup';
COMMENT ON FUNCTION public.handle_new_candidate_user() IS 'Automatically creates candidate profile when a new user signs up with user_type=candidate';

