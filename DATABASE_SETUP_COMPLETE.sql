-- =====================================================
-- COMPLETE DATABASE SETUP FOR STAFFLYHQ
-- Run this script in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- STEP 1: ENSURE CANDIDATES TABLE EXISTS
-- =====================================================

-- Create candidates table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.candidates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Auth link
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  onboarding_completed boolean DEFAULT false,
  
  -- Personal Info
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  profile_photo_url text,
  
  -- Professional Info
  title text,
  bio text,
  experience_years int,
  hourly_rate numeric(10,2),
  
  -- Availability
  available_hours_per_week int,
  timezone text,
  availability_status text DEFAULT 'available',
  
  -- Skills & Industries (arrays for multi-select)
  industries text[],
  roles text[],
  skills text[],
  tools text[],
  
  -- Matching Score Fields
  communication_style text,
  work_style text,
  temperament_score jsonb,
  
  -- Featured/Status
  is_featured boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  status text DEFAULT 'inactive',
  
  -- Metadata
  portfolio_links jsonb,
  certifications jsonb,
  languages text[],
  
  -- Admin notes
  internal_notes text,
  placement_history jsonb
);

-- =====================================================
-- STEP 2: ADD INDEXES
-- =====================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_candidates_user_id ON public.candidates(user_id);
CREATE INDEX IF NOT EXISTS idx_candidates_email ON public.candidates(email);
CREATE INDEX IF NOT EXISTS idx_candidates_status ON public.candidates(status);
CREATE INDEX IF NOT EXISTS idx_candidates_availability ON public.candidates(availability_status);
CREATE INDEX IF NOT EXISTS idx_candidates_industries ON public.candidates USING GIN (industries);
CREATE INDEX IF NOT EXISTS idx_candidates_roles ON public.candidates USING GIN (roles);
CREATE INDEX IF NOT EXISTS idx_candidates_tools ON public.candidates USING GIN (tools);

-- =====================================================
-- STEP 3: ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anon SELECT on candidates" ON public.candidates;
DROP POLICY IF EXISTS "Allow authenticated INSERT on candidates" ON public.candidates;
DROP POLICY IF EXISTS "Allow authenticated UPDATE on candidates" ON public.candidates;
DROP POLICY IF EXISTS "Allow authenticated DELETE on candidates" ON public.candidates;
DROP POLICY IF EXISTS "Allow authenticated SELECT active candidates" ON public.candidates;
DROP POLICY IF EXISTS "Allow anon SELECT active candidates" ON public.candidates;
DROP POLICY IF EXISTS "Allow candidate INSERT own profile" ON public.candidates;
DROP POLICY IF EXISTS "Allow candidate UPDATE own profile" ON public.candidates;
DROP POLICY IF EXISTS "Allow candidate SELECT own profile" ON public.candidates;

-- Create new policies
-- Allow anon users to SELECT active candidates (for public job board)
CREATE POLICY "Allow anon SELECT active candidates" ON public.candidates
  FOR SELECT TO anon USING (status = 'active');

-- Allow authenticated users to SELECT active candidates
CREATE POLICY "Allow authenticated SELECT active candidates" ON public.candidates
  FOR SELECT TO authenticated USING (status = 'active');

-- Allow candidates to INSERT their own profile (one-time during signup)
CREATE POLICY "Allow candidate INSERT own profile" ON public.candidates
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Allow candidates to UPDATE only their own profile
CREATE POLICY "Allow candidate UPDATE own profile" ON public.candidates
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Allow candidates to SELECT their own profile even if not active
CREATE POLICY "Allow candidate SELECT own profile" ON public.candidates
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Allow authenticated admins to do everything (optional - add admin role check)
CREATE POLICY "Allow authenticated INSERT on candidates" ON public.candidates
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated UPDATE on candidates" ON public.candidates
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated DELETE on candidates" ON public.candidates
  FOR DELETE TO authenticated USING (true);

-- =====================================================
-- STEP 4: CREATE TRIGGER FUNCTION
-- =====================================================

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
    
    -- Log the creation
    RAISE NOTICE 'Created candidate profile for user: %', NEW.id;
  END IF;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the user creation
    RAISE WARNING 'Failed to create candidate profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- STEP 5: CREATE TRIGGER
-- =====================================================

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created_candidate ON auth.users;

-- Create trigger to auto-create candidate profile on user signup
CREATE TRIGGER on_auth_user_created_candidate
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_candidate_user();

-- =====================================================
-- STEP 6: CREATE STORAGE BUCKETS
-- =====================================================

-- Create storage bucket for candidate files (resumes, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('candidate-files', 'candidate-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for candidate avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('candidate-avatars', 'candidate-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STEP 7: STORAGE POLICIES
-- =====================================================

-- Drop existing storage policies
DROP POLICY IF EXISTS "Allow authenticated uploads to candidate-files" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read from candidate-files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads to candidate-avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read from candidate-avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow candidates to upload own files" ON storage.objects;
DROP POLICY IF EXISTS "Allow candidates to update own files" ON storage.objects;
DROP POLICY IF EXISTS "Allow candidates to delete own files" ON storage.objects;

-- Candidate files policies
CREATE POLICY "Allow authenticated uploads to candidate-files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'candidate-files');

CREATE POLICY "Allow public read from candidate-files" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'candidate-files');

CREATE POLICY "Allow candidates to update own files" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'candidate-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Allow candidates to delete own files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'candidate-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Candidate avatars policies
CREATE POLICY "Allow authenticated uploads to candidate-avatars" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'candidate-avatars');

CREATE POLICY "Allow public read from candidate-avatars" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'candidate-avatars');

-- =====================================================
-- STEP 8: QUIZ RESULTS TABLE
-- =====================================================

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Link to candidate
  candidate_id uuid REFERENCES public.candidates(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Quiz info
  quiz_type text NOT NULL, -- 'temperament', 'role_validation', 'communication_style', 'behavioral_stress'
  raw_score numeric,
  profile_result jsonb, -- Store the calculated profile/result
  answers jsonb, -- Store all answers
  status text DEFAULT 'completed',
  
  UNIQUE(candidate_id, quiz_type)
);

-- Index for quiz results
CREATE INDEX IF NOT EXISTS idx_quiz_results_candidate ON public.quiz_results(candidate_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user ON public.quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_type ON public.quiz_results(quiz_type);

-- Enable RLS
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Drop existing quiz policies
DROP POLICY IF EXISTS "Allow candidate INSERT own quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Allow candidate SELECT own quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Allow candidate UPDATE own quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Allow authenticated SELECT quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Allow authenticated INSERT quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Allow authenticated UPDATE quiz results" ON public.quiz_results;

-- Quiz results policies
CREATE POLICY "Allow candidate INSERT own quiz results" ON public.quiz_results
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow candidate SELECT own quiz results" ON public.quiz_results
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Allow candidate UPDATE own quiz results" ON public.quiz_results
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Allow authenticated SELECT quiz results" ON public.quiz_results
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated INSERT quiz results" ON public.quiz_results
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated UPDATE quiz results" ON public.quiz_results
  FOR UPDATE TO authenticated
  USING (true);

-- =====================================================
-- STEP 9: STORAGE BUCKET FOR AUDIO RESPONSES
-- =====================================================

-- Create storage bucket for audio responses
INSERT INTO storage.buckets (id, name, public)
VALUES ('audio-responses', 'audio-responses', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing audio storage policies
DROP POLICY IF EXISTS "Allow authenticated uploads to audio-responses" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated read from audio-responses" ON storage.objects;
DROP POLICY IF EXISTS "Allow candidates upload own audio" ON storage.objects;
DROP POLICY IF EXISTS "Allow candidates read own audio" ON storage.objects;

-- Audio responses policies
CREATE POLICY "Allow authenticated uploads to audio-responses" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'audio-responses');

CREATE POLICY "Allow authenticated read from audio-responses" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'audio-responses');

-- =====================================================
-- STEP 10: VERIFY SETUP
-- =====================================================

-- Check if trigger exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'on_auth_user_created_candidate'
  ) THEN
    RAISE NOTICE '✅ Trigger "on_auth_user_created_candidate" exists';
  ELSE
    RAISE WARNING '❌ Trigger "on_auth_user_created_candidate" NOT found';
  END IF;
END $$;

-- Check if function exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'handle_new_candidate_user'
  ) THEN
    RAISE NOTICE '✅ Function "handle_new_candidate_user" exists';
  ELSE
    RAISE WARNING '❌ Function "handle_new_candidate_user" NOT found';
  END IF;
END $$;

-- Check if buckets exist
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'candidate-files') THEN
    RAISE NOTICE '✅ Bucket "candidate-files" exists';
  ELSE
    RAISE WARNING '❌ Bucket "candidate-files" NOT found';
  END IF;
  
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'candidate-avatars') THEN
    RAISE NOTICE '✅ Bucket "candidate-avatars" exists';
  ELSE
    RAISE WARNING '❌ Bucket "candidate-avatars" NOT found';
  END IF;
  
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'audio-responses') THEN
    RAISE NOTICE '✅ Bucket "audio-responses" exists';
  ELSE
    RAISE WARNING '❌ Bucket "audio-responses" NOT found';
  END IF;
END $$;

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.candidates IS 'Stores VA candidate profiles for matching with client needs';
COMMENT ON COLUMN public.candidates.user_id IS 'Foreign key to auth.users - links candidate to authentication';
COMMENT ON COLUMN public.candidates.onboarding_completed IS 'Whether candidate has completed their profile setup';
COMMENT ON FUNCTION public.handle_new_candidate_user() IS 'Automatically creates candidate profile when a new user signs up with user_type=candidate';
COMMENT ON TABLE public.quiz_results IS 'Stores results from candidate assessment quizzes';

-- =====================================================
-- END OF SETUP
-- =====================================================

SELECT '✅ Database setup complete! You can now test the application flow.' AS status;

