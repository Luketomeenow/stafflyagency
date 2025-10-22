-- ============================================
-- CANDIDATES TABLE SCHEMA
-- For storing VA candidate profiles
-- ============================================

CREATE TABLE IF NOT EXISTS public.candidates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Personal Info
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  profile_photo_url text,
  
  -- Professional Info
  title text, -- e.g., "Executive Assistant", "Lead Gen Specialist"
  bio text, -- Short bio/summary
  experience_years int, -- Years of experience
  hourly_rate numeric(10,2), -- Hourly rate in USD
  
  -- Availability
  available_hours_per_week int, -- e.g., 20, 40
  timezone text, -- e.g., "PST", "PH", "EST"
  availability_status text DEFAULT 'available', -- available, busy, unavailable
  
  -- Skills & Industries (arrays for multi-select)
  industries text[], -- e.g., {"Real Estate", "E-commerce"}
  roles text[], -- e.g., {"Executive Assistant", "Admin"}
  skills text[], -- e.g., {"Salesforce", "Google Workspace"}
  tools text[], -- e.g., {"Asana", "Slack", "HubSpot"}
  
  -- Matching Score Fields
  communication_style text, -- Driver, Analytical, Expressive, Amiable
  work_style text, -- Independent, Collaborative, Structured, Flexible
  temperament_score jsonb, -- Store temperament quiz results
  
  -- Featured/Status
  is_featured boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  status text DEFAULT 'active', -- active, inactive, onboarding
  
  -- Metadata
  portfolio_links jsonb, -- Array of portfolio URLs
  certifications jsonb, -- Array of certification objects
  languages text[], -- e.g., {"English", "Spanish"}
  
  -- Admin notes
  internal_notes text,
  placement_history jsonb -- Track previous placements
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_candidates_email ON public.candidates(email);
CREATE INDEX IF NOT EXISTS idx_candidates_status ON public.candidates(status);
CREATE INDEX IF NOT EXISTS idx_candidates_availability ON public.candidates(availability_status);
CREATE INDEX IF NOT EXISTS idx_candidates_industries ON public.candidates USING GIN (industries);
CREATE INDEX IF NOT EXISTS idx_candidates_roles ON public.candidates USING GIN (roles);
CREATE INDEX IF NOT EXISTS idx_candidates_tools ON public.candidates USING GIN (tools);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- Allow anon users to SELECT (for public-facing matching)
CREATE POLICY "Allow anon SELECT on candidates" ON public.candidates
  FOR SELECT TO anon USING (status = 'active');

-- Only authenticated admins can INSERT/UPDATE/DELETE
CREATE POLICY "Allow authenticated INSERT on candidates" ON public.candidates
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated UPDATE on candidates" ON public.candidates
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated DELETE on candidates" ON public.candidates
  FOR DELETE TO authenticated USING (true);

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

INSERT INTO public.candidates (name, email, phone, title, bio, experience_years, hourly_rate, available_hours_per_week, timezone, industries, roles, skills, tools, communication_style, work_style, is_featured, is_verified, languages)
VALUES
  (
    'Maria Santos',
    'maria.santos@example.com',
    '+63-XXX-XXX-XXXX',
    'Executive Assistant',
    'Experienced EA specializing in calendar management, inbox coordination, and SOPs. 5+ years supporting C-level executives.',
    5,
    15.00,
    40,
    'PH',
    ARRAY['Real Estate', 'Coaching'],
    ARRAY['Executive Assistant', 'Administrative Assistant'],
    ARRAY['Calendar Management', 'Email Management', 'SOP Creation'],
    ARRAY['Google Workspace', 'Asana', 'Calendly', 'Slack'],
    'Analytical',
    'Structured',
    true,
    true,
    ARRAY['English', 'Tagalog']
  ),
  (
    'John Dela Cruz',
    'john.delacruz@example.com',
    '+63-XXX-XXX-XXXX',
    'Lead Generation Specialist',
    'Cold calling expert with proven track record in B2B lead generation. Proficient in CRM management and appointment setting.',
    3,
    12.00,
    40,
    'PH',
    ARRAY['Agency', 'E-commerce'],
    ARRAY['Appointment Setter', 'Customer Support'],
    ARRAY['Cold Calling', 'Email Outreach', 'CRM Management'],
    ARRAY['Salesforce', 'HubSpot', 'Zoom'],
    'Driver',
    'Independent',
    true,
    true,
    ARRAY['English']
  ),
  (
    'Ana Reyes',
    'ana.reyes@example.com',
    '+63-XXX-XXX-XXXX',
    'Social Media Manager',
    'Creative social media manager with expertise in content creation, scheduling, and community management across platforms.',
    4,
    18.00,
    30,
    'PH',
    ARRAY['Marketing', 'E-commerce'],
    ARRAY['Administrative Assistant'],
    ARRAY['Social Media', 'Content Creation', 'Canva'],
    ARRAY['Canva', 'Hootsuite', 'Meta Business Suite', 'Notion'],
    'Expressive',
    'Collaborative',
    false,
    true,
    ARRAY['English', 'Spanish']
  ),
  (
    'Carlos Lopez',
    'carlos.lopez@example.com',
    '+63-XXX-XXX-XXXX',
    'Project Coordinator',
    'Detail-oriented project coordinator with strong organizational skills. Experience managing timelines, resources, and cross-functional teams.',
    6,
    20.00,
    40,
    'PH',
    ARRAY['IT', 'Real Estate'],
    ARRAY['Project Manager', 'Operations Analyst'],
    ARRAY['Project Management', 'Documentation', 'Reporting'],
    ARRAY['Asana', 'Trello', 'Slack', 'Google Workspace', 'Notion'],
    'Analytical',
    'Structured',
    true,
    true,
    ARRAY['English']
  ),
  (
    'Lisa Tan',
    'lisa.tan@example.com',
    '+63-XXX-XXX-XXXX',
    'Customer Support Specialist',
    'Customer-focused support specialist with experience in ticketing systems, live chat, and email support. Excellent communication skills.',
    2,
    10.00,
    40,
    'PH',
    ARRAY['E-commerce', 'Healthcare'],
    ARRAY['Customer Support'],
    ARRAY['Zendesk', 'Live Chat', 'Email Support'],
    ARRAY['Zendesk', 'Intercom', 'Slack', 'Gmail'],
    'Amiable',
    'Collaborative',
    false,
    true,
    ARRAY['English', 'Mandarin']
  );

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE public.candidates IS 'Stores VA candidate profiles for matching with client needs';
COMMENT ON COLUMN public.candidates.industries IS 'Array of industries the candidate has experience in';
COMMENT ON COLUMN public.candidates.roles IS 'Array of roles the candidate can fulfill';
COMMENT ON COLUMN public.candidates.tools IS 'Array of tools/software the candidate is proficient in';
COMMENT ON COLUMN public.candidates.temperament_score IS 'JSON object storing temperament quiz results';
COMMENT ON COLUMN public.candidates.placement_history IS 'JSON array tracking previous client placements';

