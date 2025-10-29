-- ============================================
-- CANDIDATE PROFILE SCHEMA UPDATES
-- Adds fields for comprehensive profile management
-- ============================================

-- Add new columns to candidates table if they don't exist
ALTER TABLE public.candidates
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS linkedin_url text,
ADD COLUMN IF NOT EXISTS github_url text,
ADD COLUMN IF NOT EXISTS portfolio_url text,
ADD COLUMN IF NOT EXISTS industries text[],
ADD COLUMN IF NOT EXISTS roles text[],
ADD COLUMN IF NOT EXISTS skills text[],
ADD COLUMN IF NOT EXISTS tools text[],
ADD COLUMN IF NOT EXISTS portfolio_links jsonb,
ADD COLUMN IF NOT EXISTS resume_url text,
ADD COLUMN IF NOT EXISTS internet_speed_url text,
ADD COLUMN IF NOT EXISTS workspace_photo_url text,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending_approval',
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Create index for status lookups
CREATE INDEX IF NOT EXISTS idx_candidates_status ON public.candidates(status);

-- Create index for user_id lookups
CREATE INDEX IF NOT EXISTS idx_candidates_user_id ON public.candidates(user_id);

-- ============================================
-- STORAGE BUCKETS FOR CANDIDATE FILES
-- ============================================

-- Create storage bucket for candidate avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('candidate-avatars', 'candidate-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for candidate files (resumes, screenshots, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('candidate-files', 'candidate-files', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE POLICIES FOR CANDIDATE AVATARS
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to read their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their own avatars" ON storage.objects;

-- Allow authenticated users to upload their own avatars
CREATE POLICY "Allow authenticated users to upload avatars"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'candidate-avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to read their own avatars
CREATE POLICY "Allow users to read their own avatars"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'candidate-avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public read access to avatars
CREATE POLICY "Allow public read access to avatars"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'candidate-avatars');

-- Allow users to update their own avatars
CREATE POLICY "Allow users to update their own avatars"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'candidate-avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own avatars
CREATE POLICY "Allow users to delete their own avatars"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'candidate-avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- ============================================
-- STORAGE POLICIES FOR CANDIDATE FILES
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to upload files" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to read their own files" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin read access to files" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their own files" ON storage.objects;

-- Allow authenticated users to upload their own files
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'candidate-files' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to read their own files
CREATE POLICY "Allow users to read their own files"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'candidate-files' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow admin read access to all candidate files
CREATE POLICY "Allow admin read access to files"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'candidate-files' AND
  auth.jwt() ->> 'user_type' = 'admin'
);

-- Allow users to delete their own files
CREATE POLICY "Allow users to delete their own files"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'candidate-files' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- ============================================
-- FUNCTION: Auto-update updated_at timestamp
-- ============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_candidates_updated_at ON public.candidates;
CREATE TRIGGER update_candidates_updated_at
  BEFORE UPDATE ON public.candidates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- SAMPLE QUERIES
-- ============================================

-- Get candidate with full profile
/*
SELECT 
  c.*,
  u.email as user_email,
  u.created_at as user_created_at
FROM public.candidates c
JOIN auth.users u ON c.user_id = u.id
WHERE c.user_id = auth.uid();
*/

-- Get all pending candidates for admin review
/*
SELECT 
  c.id,
  c.name,
  c.email,
  c.phone,
  c.industries,
  c.roles,
  c.status,
  c.created_at
FROM public.candidates c
WHERE c.status = 'pending_approval'
ORDER BY c.created_at DESC;
*/

-- Update candidate status (admin only)
/*
UPDATE public.candidates
SET status = 'approved'
WHERE id = 'candidate-uuid-here';
*/

