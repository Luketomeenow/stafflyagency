-- ============================================
-- QUIZ RESULTS TABLE SCHEMA
-- For storing candidate assessment quiz results
-- ============================================

-- Create quiz_results table to store all quiz attempts and results
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Link to candidate
  candidate_id uuid REFERENCES public.candidates(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Quiz metadata
  quiz_type text NOT NULL, -- 'temperament', 'role_validation', 'communication', 'behavioral'
  quiz_version text DEFAULT 'v1', -- Track quiz version for future updates
  
  -- Results
  raw_score int NOT NULL, -- Total points earned
  max_score int NOT NULL, -- Maximum possible points
  percentage numeric(5,2), -- Calculated percentage
  
  -- Detailed results (stored as JSONB for flexibility)
  answers jsonb NOT NULL, -- Array of {question_id, selected_option, points_earned}
  profile_result jsonb, -- Computed profile (e.g., {"type": "Horse", "score": 27, "description": "..."})
  
  -- Status
  status text DEFAULT 'completed', -- completed, in_progress, abandoned
  time_taken_seconds int, -- How long they took to complete
  
  -- Admin review
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamptz,
  admin_notes text,
  
  CONSTRAINT valid_quiz_type CHECK (quiz_type IN ('temperament', 'role_validation', 'communication', 'behavioral'))
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_quiz_results_candidate_id ON public.quiz_results(candidate_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON public.quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_quiz_type ON public.quiz_results(quiz_type);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON public.quiz_results(created_at DESC);

-- Composite index for finding latest quiz by type for a candidate
CREATE INDEX IF NOT EXISTS idx_quiz_results_candidate_type_created 
  ON public.quiz_results(candidate_id, quiz_type, created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow candidate INSERT own quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Allow candidate SELECT own quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Allow candidate UPDATE own quiz results" ON public.quiz_results;

-- Allow candidates to INSERT their own quiz results
CREATE POLICY "Allow candidate INSERT own quiz results" ON public.quiz_results
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Allow candidates to SELECT their own quiz results
CREATE POLICY "Allow candidate SELECT own quiz results" ON public.quiz_results
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Allow candidates to UPDATE their own in-progress quiz results
CREATE POLICY "Allow candidate UPDATE own quiz results" ON public.quiz_results
  FOR UPDATE TO authenticated 
  USING (auth.uid() = user_id AND status = 'in_progress');

-- (Optional) Allow admins to view all quiz results
-- CREATE POLICY "Allow admin SELECT all quiz results" ON public.quiz_results
--   FOR SELECT TO authenticated 
--   USING (auth.jwt() ->> 'user_type' = 'admin');

-- ============================================
-- FUNCTION: Update candidate temperament_score
-- ============================================

CREATE OR REPLACE FUNCTION public.update_candidate_temperament_score()
RETURNS TRIGGER AS $$
BEGIN
  -- When a temperament quiz is completed, update the candidates table
  IF NEW.quiz_type = 'temperament' AND NEW.status = 'completed' THEN
    UPDATE public.candidates
    SET temperament_score = NEW.profile_result
    WHERE id = NEW.candidate_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-update candidate temperament_score
DROP TRIGGER IF EXISTS on_temperament_quiz_completed ON public.quiz_results;
CREATE TRIGGER on_temperament_quiz_completed
  AFTER INSERT OR UPDATE ON public.quiz_results
  FOR EACH ROW
  EXECUTE FUNCTION public.update_candidate_temperament_score();

-- ============================================
-- HELPER FUNCTION: Get Latest Quiz Result
-- ============================================

CREATE OR REPLACE FUNCTION public.get_latest_quiz_result(
  p_user_id uuid,
  p_quiz_type text
)
RETURNS TABLE (
  id uuid,
  raw_score int,
  max_score int,
  percentage numeric,
  profile_result jsonb,
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    qr.id,
    qr.raw_score,
    qr.max_score,
    qr.percentage,
    qr.profile_result,
    qr.created_at
  FROM public.quiz_results qr
  WHERE qr.user_id = p_user_id 
    AND qr.quiz_type = p_quiz_type
    AND qr.status = 'completed'
  ORDER BY qr.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- STORAGE BUCKET FOR AUDIO RESPONSES
-- ============================================

-- Create storage bucket for audio responses (Run in Supabase Dashboard > Storage)
/*
INSERT INTO storage.buckets (id, name, public)
VALUES ('audio-responses', 'audio-responses', true);
*/

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to upload audio" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to read their own audio" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to audio" ON storage.objects;

-- Storage policies for audio-responses bucket
CREATE POLICY "Allow authenticated users to upload audio"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'audio-responses' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Allow users to read their own audio"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'audio-responses' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Allow public read access to audio"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'audio-responses');

-- ============================================
-- SAMPLE QUERY: Get candidate with latest quiz scores
-- ============================================

-- Example query to fetch candidate with their latest quiz results
/*
SELECT 
  c.*,
  (SELECT jsonb_agg(jsonb_build_object(
    'quiz_type', qr.quiz_type,
    'score', qr.raw_score,
    'max_score', qr.max_score,
    'percentage', qr.percentage,
    'profile', qr.profile_result,
    'completed_at', qr.created_at
  ))
  FROM (
    SELECT DISTINCT ON (quiz_type) *
    FROM public.quiz_results
    WHERE candidate_id = c.id AND status = 'completed'
    ORDER BY quiz_type, created_at DESC
  ) qr) as quiz_results
FROM public.candidates c
WHERE c.user_id = auth.uid();
*/

