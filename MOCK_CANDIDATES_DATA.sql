-- ============================================
-- MOCK CANDIDATE DATA FOR TESTING
-- ============================================
-- This file contains 15 realistic candidate profiles for testing the matching algorithm
-- Run this after setting up the candidates table (CANDIDATES_SCHEMA.sql)

-- Clear existing mock data (optional - comment out if you want to keep existing data)
-- DELETE FROM public.candidates WHERE email LIKE '%@mockcandidate.com';

-- ============================================
-- EXECUTIVE ASSISTANTS
-- ============================================

INSERT INTO public.candidates (
  name, email, phone, status, availability_status,
  hourly_rate, available_hours_per_week,
  timezone, experience_years,
  skills, industries, roles, bio
) VALUES 
(
  'Sarah Chen',
  'sarah.chen@mockcandidate.com',
  '+63 917 123 4567',
  'active',
  'available',
  28.00,
  40,
  'PST',
  5,
  ARRAY['calendar management', 'email management', 'travel coordination', 'salesforce', 'asana', 'slack', 'google workspace', 'notion'],
  ARRAY['real estate', 'e-commerce'],
  ARRAY['executive assistant', 'administrative assistant'],
  'Experienced EA with strong organizational skills. Managed C-suite executives'' calendars and coordinated complex travel itineraries. Proficient in CRM management and project coordination.'
),
(
  'Michael Santos',
  'michael.santos@mockcandidate.com',
  '+63 917 234 5678',
  'active',
  'available',
  32.00,
  40,
  'EST',
  7,
  ARRAY['executive support', 'project management', 'hubspot', 'salesforce', 'zoom', 'microsoft office', 'quickbooks', 'trello'],
  ARRAY['legal', 'consulting', 'real estate'],
  ARRAY['executive assistant', 'chief of staff'],
  'Senior EA with 7 years of experience supporting C-level executives in legal and consulting firms. Expert in managing complex schedules, preparing board presentations, and handling confidential matters.'
),
(
  'Jessica Liu',
  'jessica.liu@mockcandidate.com',
  '+63 917 345 6789',
  'active',
  'available',
  26.00,
  30,
  'GMT+8',
  4,
  ARRAY['scheduling', 'inbox management', 'canva', 'google workspace', 'slack', 'zoom', 'airtable', 'clickup'],
  ARRAY['marketing', 'e-commerce', 'tech'],
  ARRAY['executive assistant', 'operations coordinator'],
  'Detail-oriented EA specializing in tech and e-commerce companies. Skilled in managing multiple executives'' schedules and coordinating cross-functional projects.'
),

-- ============================================
-- SALES & CUSTOMER SUPPORT
-- ============================================

(
  'David Rodriguez',
  'david.rodriguez@mockcandidate.com',
  '+63 917 456 7890',
  'active',
  'available',
  22.00,
  40,
  'CST',
  3,
  ARRAY['appointment setting', 'cold calling', 'crm management', 'hubspot', 'pipedrive', 'zoom', 'calendly', 'outreach'],
  ARRAY['real estate', 'saas', 'consulting'],
  ARRAY['appointment setter', 'sdr', 'business development'],
  'Experienced appointment setter with proven track record in B2B sales. Consistently exceeds monthly booking targets. Proficient in CRM systems and sales automation tools.'
),
(
  'Amanda Park',
  'amanda.park@mockcandidate.com',
  '+63 917 567 8901',
  'active',
  'available',
  20.00,
  40,
  'PST',
  4,
  ARRAY['customer support', 'zendesk', 'freshdesk', 'intercom', 'live chat', 'email support', 'ticket management', 'crm'],
  ARRAY['e-commerce', 'saas', 'tech'],
  ARRAY['customer support specialist', 'customer success'],
  'Customer support specialist with 4 years in e-commerce and SaaS. Expert in resolving complex customer issues and maintaining high satisfaction ratings. Familiar with all major helpdesk platforms.'
),
(
  'Ryan Cooper',
  'ryan.cooper@mockcandidate.com',
  '+63 917 678 9012',
  'active',
  'available',
  24.00,
  40,
  'EST',
  5,
  ARRAY['sales development', 'lead generation', 'salesforce', 'linkedin sales navigator', 'apollo', 'cold email', 'outbound sales'],
  ARRAY['saas', 'tech', 'marketing'],
  ARRAY['sdr', 'account executive', 'sales'],
  'SDR with 5 years of experience in B2B SaaS. Skilled in outbound prospecting, lead qualification, and pipeline management. Consistently ranks in top 10% of sales team.'
),

-- ============================================
-- ADMINISTRATIVE & OPERATIONS
-- ============================================

(
  'Emily Johnson',
  'emily.johnson@mockcandidate.com',
  '+63 917 789 0123',
  'active',
  'available',
  18.00,
  40,
  'GMT+8',
  3,
  ARRAY['data entry', 'spreadsheets', 'google sheets', 'excel', 'typing', 'research', 'documentation', 'file management'],
  ARRAY['healthcare', 'legal', 'real estate'],
  ARRAY['administrative assistant', 'data entry specialist'],
  'Efficient administrative assistant with strong attention to detail. Experienced in data entry, document management, and research. Fast typing speed (75+ WPM) and excellent organizational skills.'
),
(
  'Carlos Martinez',
  'carlos.martinez@mockcandidate.com',
  '+63 917 890 1234',
  'active',
  'available',
  25.00,
  40,
  'CST',
  6,
  ARRAY['project coordination', 'asana', 'monday.com', 'trello', 'jira', 'documentation', 'process improvement', 'slack'],
  ARRAY['tech', 'consulting', 'marketing'],
  ARRAY['project coordinator', 'operations coordinator', 'project manager'],
  'Operations-focused project coordinator with 6 years of experience. Expert in managing multiple projects simultaneously and implementing efficient workflows. Strong communication and stakeholder management skills.'
),
(
  'Nina Patel',
  'nina.patel@mockcandidate.com',
  '+63 917 901 2345',
  'active',
  'available',
  22.00,
  30,
  'PST',
  4,
  ARRAY['bookkeeping', 'quickbooks', 'xero', 'invoicing', 'accounts payable', 'accounts receivable', 'financial reporting', 'excel'],
  ARRAY['e-commerce', 'consulting', 'real estate'],
  ARRAY['bookkeeper', 'administrative assistant', 'financial coordinator'],
  'Detail-oriented bookkeeper with 4 years of experience managing finances for small to medium businesses. Proficient in QuickBooks and Xero. Ensures accurate financial records and timely reporting.'
),

-- ============================================
-- MARKETING & CONTENT
-- ============================================

(
  'Sophie Williams',
  'sophie.williams@mockcandidate.com',
  '+63 917 012 3456',
  'active',
  'available',
  24.00,
  40,
  'EST',
  5,
  ARRAY['social media management', 'content creation', 'canva', 'instagram', 'facebook', 'tiktok', 'hootsuite', 'buffer', 'copywriting'],
  ARRAY['e-commerce', 'marketing', 'fashion', 'lifestyle'],
  ARRAY['social media manager', 'content creator', 'community manager'],
  'Creative social media manager with 5 years of experience growing brand presence. Skilled in content creation, community management, and analytics. Increased engagement by 300% for previous clients.'
),
(
  'Daniel Kim',
  'daniel.kim@mockcandidate.com',
  '+63 917 123 4568',
  'active',
  'available',
  28.00,
  30,
  'PST',
  6,
  ARRAY['graphic design', 'adobe photoshop', 'adobe illustrator', 'canva', 'figma', 'video editing', 'branding', 'web design'],
  ARRAY['marketing', 'e-commerce', 'tech'],
  ARRAY['graphic designer', 'content creator', 'creative assistant'],
  'Experienced graphic designer specializing in digital marketing assets. Created visual content for 50+ brands. Proficient in Adobe Creative Suite and modern design tools.'
),

-- ============================================
-- SPECIALIZED ROLES
-- ============================================

(
  'Rachel Green',
  'rachel.green@mockcandidate.com',
  '+63 917 234 5679',
  'active',
  'available',
  30.00,
  40,
  'EST',
  7,
  ARRAY['transaction coordination', 'contract management', 'mls', 'dotloop', 'zipforms', 'real estate', 'compliance', 'communication'],
  ARRAY['real estate'],
  ARRAY['transaction coordinator', 'real estate assistant'],
  'Specialized transaction coordinator with 7 years in real estate. Managed 200+ transactions from contract to close. Expert in MLS systems, compliance, and client communication.'
),
(
  'Kevin Nguyen',
  'kevin.nguyen@mockcandidate.com',
  '+63 917 345 6780',
  'active',
  'available',
  26.00,
  40,
  'GMT+8',
  5,
  ARRAY['recruitment', 'ats', 'greenhouse', 'lever', 'linkedin recruiter', 'candidate screening', 'interview coordination', 'onboarding'],
  ARRAY['tech', 'consulting', 'healthcare'],
  ARRAY['recruiter', 'talent acquisition', 'hr coordinator'],
  'Experienced recruiter with 5 years in tech and consulting. Skilled in full-cycle recruitment, from sourcing to onboarding. Successfully placed 100+ candidates in technical roles.'
),
(
  'Olivia Brown',
  'olivia.brown@mockcandidate.com',
  '+63 917 456 7891',
  'active',
  'available',
  35.00,
  40,
  'PST',
  8,
  ARRAY['operations management', 'process improvement', 'kpi tracking', 'data analysis', 'tableau', 'sql basics', 'project management', 'leadership'],
  ARRAY['tech', 'saas', 'consulting'],
  ARRAY['chief of staff', 'operations manager', 'business analyst'],
  'Senior operations professional with 8 years of experience scaling startups. Expert in building efficient processes, managing cross-functional teams, and driving strategic initiatives. MBA graduate.'
),
(
  'Marcus Thompson',
  'marcus.thompson@mockcandidate.com',
  '+63 917 567 8902',
  'active',
  'available',
  22.00,
  40,
  'CST',
  4,
  ARRAY['market research', 'data analysis', 'google analytics', 'excel', 'powerpoint', 'competitive analysis', 'reporting', 'surveys'],
  ARRAY['marketing', 'consulting', 'e-commerce'],
  ARRAY['research analyst', 'market researcher', 'business analyst'],
  'Research analyst with 4 years of experience conducting market research and competitive analysis. Strong analytical skills and ability to present complex data in clear, actionable insights.'
);

-- ============================================
-- VERIFY DATA
-- ============================================

-- Check how many candidates were inserted
SELECT 
  COUNT(*) as total_candidates,
  COUNT(*) FILTER (WHERE status = 'active') as active_candidates,
  COUNT(*) FILTER (WHERE availability_status = 'available') as available_candidates
FROM public.candidates
WHERE email LIKE '%@mockcandidate.com';

-- View all mock candidates
SELECT 
  id,
  name,
  email,
  string_agg(DISTINCT unnested_roles, ', ') as roles,
  string_agg(DISTINCT unnested_industries, ', ') as industries,
  hourly_rate,
  available_hours_per_week,
  timezone,
  experience_years,
  status,
  availability_status
FROM public.candidates
CROSS JOIN UNNEST(roles) as unnested_roles
CROSS JOIN UNNEST(industries) as unnested_industries
WHERE email LIKE '%@mockcandidate.com'
GROUP BY id, name, email, hourly_rate, available_hours_per_week, timezone, experience_years, status, availability_status
ORDER BY name;

-- ============================================
-- TEST MATCHING SCENARIOS
-- ============================================

-- Scenario 1: Real Estate EA (should match Sarah Chen, Michael Santos, Rachel Green)
-- Lead requirements:
-- - Industry: Real Estate
-- - Role: Executive Assistant
-- - Tools: Salesforce, Google Workspace
-- Expected top matches: Sarah Chen (28 score), Michael Santos (32 score), Rachel Green (30 score)

-- Scenario 2: E-commerce Customer Support (should match Amanda Park, Sophie Williams)
-- Lead requirements:
-- - Industry: E-commerce
-- - Role: Customer Support
-- - Tools: Zendesk, Live Chat
-- Expected top matches: Amanda Park (20 score), Emily Johnson (18 score)

-- Scenario 3: Tech Operations (should match Olivia Brown, Carlos Martinez, Kevin Nguyen)
-- Lead requirements:
-- - Industry: Tech / SaaS
-- - Role: Operations / Project Management
-- - Hours: 40/week
-- Expected top matches: Olivia Brown (35 score), Carlos Martinez (25 score)

-- Scenario 4: Marketing Social Media (should match Sophie Williams, Daniel Kim)
-- Lead requirements:
-- - Industry: Marketing / E-commerce
-- - Role: Social Media Manager
-- - Tools: Canva, Instagram, Facebook
-- Expected top matches: Sophie Williams (24 score), Daniel Kim (28 score)

-- Scenario 5: Sales SDR (should match David Rodriguez, Ryan Cooper)
-- Lead requirements:
-- - Industry: SaaS / Tech
-- - Role: SDR / Sales Development
-- - Tools: Salesforce, LinkedIn Sales Navigator
-- Expected top matches: Ryan Cooper (24 score), David Rodriguez (22 score)

-- ============================================
-- CLEANUP (Run if you want to remove mock data)
-- ============================================

-- DELETE FROM public.candidates WHERE email LIKE '%@mockcandidate.com';

