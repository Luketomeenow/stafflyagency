# Testing Guide - Candidate Matching & Email System

This guide shows you how to test the candidate matching algorithm and email automation with realistic mock data.

---

## 1. Setup Mock Candidates

First, insert the mock candidate data into your Supabase database:

### Step 1: Run the SQL
1. Go to your Supabase Dashboard
2. Click "SQL Editor"
3. Copy and paste the contents of `MOCK_CANDIDATES_DATA.sql`
4. Click "Run"

This will insert **15 realistic candidates** with varying:
- Skills (different tools and software)
- Industries (real estate, e-commerce, tech, etc.)
- Roles (EA, SDR, customer support, etc.)
- Rates ($18-35/hr)
- Experience (3-8 years)
- Timezones (PST, EST, CST, GMT+8)

### Step 2: Verify Data
Run this query in Supabase SQL Editor:
```sql
SELECT 
  name,
  ARRAY_TO_STRING(roles, ', ') as roles,
  ARRAY_TO_STRING(industries, ', ') as industries,
  hourly_rate_usd,
  experience_years
FROM candidates 
WHERE email LIKE '%@mockcandidate.com'
ORDER BY name;
```

You should see all 15 candidates.

---

## 2. Test Matching Scenarios

Test the matching algorithm with different lead requirements to see how scoring works.

### Scenario 1: Real Estate Executive Assistant

**Lead Requirements:**
- Service: AI-Enhanced Operators
- Industry: Real Estate
- Role: Executive Assistant
- Tools: Salesforce, Google Workspace, Asana
- Hours: 30-40 hrs/week
- Timezone: PST

**Expected Top 5 Matches (in order):**
1. **Sarah Chen** (High score)
   - ✅ Real Estate industry
   - ✅ EA role
   - ✅ Salesforce + Google Workspace + Asana
   - ✅ PST timezone
   - ✅ 5 years experience
   
2. **Michael Santos** (High score)
   - ✅ Real Estate industry
   - ✅ EA/Chief of Staff role
   - ✅ Salesforce + project management
   - ⚠️ EST timezone (no match)
   - ✅ 7 years experience

3. **Rachel Green** (Medium-High score)
   - ✅ Real Estate industry (specialized)
   - ⚠️ Transaction Coordinator (related role)
   - ⚠️ Different tools (MLS, Dotloop)
   - ✅ EST timezone
   - ✅ 7 years experience

4. **Jessica Liu** (Medium score)
   - ⚠️ No real estate (but has e-commerce)
   - ✅ EA role
   - ✅ Google Workspace + Slack
   - ⚠️ GMT+8 timezone
   - ✅ 4 years experience

5. **Emily Johnson** (Lower score)
   - ✅ Real Estate industry
   - ⚠️ Administrative Assistant (related)
   - ⚠️ Basic tools (Google Sheets, Excel)
   - ⚠️ GMT+8 timezone
   - ⚠️ 3 years experience

**How to Test:**
1. Go to your chatbot on `/`
2. Answer questions with the requirements above
3. Submit the lead form
4. Check browser console for "Matched top 5 candidates"
5. Check the generated email HTML in console

---

### Scenario 2: E-commerce Customer Support

**Lead Requirements:**
- Service: AI-Enhanced Operators
- Industry: E-commerce
- Role: Customer Support Specialist
- Tools: Zendesk, Intercom, Live Chat
- Hours: 40 hrs/week
- Timeline: Now

**Expected Top 5 Matches:**
1. **Amanda Park** (Very High score)
   - ✅ E-commerce + SaaS + Tech industries
   - ✅ Customer Support role
   - ✅ Zendesk + Freshdesk + Intercom + Live Chat
   - ✅ 40 hrs/week available
   - ✅ 4 years experience

2. **Sophie Williams** (Medium score)
   - ✅ E-commerce industry
   - ⚠️ Social Media Manager (different role)
   - ⚠️ Different tools (Canva, social platforms)
   - ✅ 5 years experience

3. **Jessica Liu** (Medium score)
   - ✅ E-commerce industry
   - ⚠️ EA role
   - ⚠️ Some overlap (Slack, Google Workspace)
   - ✅ 4 years experience

4. Others with partial matches...

---

### Scenario 3: Tech/SaaS Operations Manager

**Lead Requirements:**
- Service: AI-Enhanced Operators
- Industry: Tech / SaaS
- Role: Chief of Staff / Operations Manager
- Tools: Asana, Slack, Data Analysis
- Hours: 40 hrs/week
- Revenue: $200k+

**Expected Top 5 Matches:**
1. **Olivia Brown** (Highest score)
   - ✅ Tech + SaaS industries
   - ✅ Chief of Staff + Operations Manager
   - ✅ Process improvement + KPI tracking + Data analysis
   - ✅ 40 hrs available
   - ✅ 8 years experience (bonus)

2. **Carlos Martinez** (High score)
   - ✅ Tech industry
   - ✅ Operations Coordinator / Project Manager
   - ✅ Asana + Monday.com + Slack
   - ✅ 6 years experience

3. **Kevin Nguyen** (Medium-High score)
   - ✅ Tech industry
   - ⚠️ Recruiter (different but related)
   - ⚠️ Different tools (ATS systems)
   - ✅ 5 years experience

4. **Michael Santos** (Medium score)
   - ⚠️ Consulting industry (related)
   - ✅ Chief of Staff role
   - ⚠️ Different tools but relevant
   - ✅ 7 years experience

5. Others...

---

### Scenario 4: Marketing Social Media Manager

**Lead Requirements:**
- Service: AI-Enhanced Operators
- Industry: E-commerce / Marketing
- Role: Social Media Manager
- Tools: Canva, Instagram, TikTok, Hootsuite
- Hours: 30 hrs/week

**Expected Top 5 Matches:**
1. **Sophie Williams** (Very High score)
   - ✅ E-commerce + Marketing industries
   - ✅ Social Media Manager role
   - ✅ Canva + Instagram + TikTok + Hootsuite + Buffer
   - ✅ 30-40 hrs available
   - ✅ 5 years experience

2. **Daniel Kim** (High score)
   - ✅ Marketing + E-commerce industries
   - ⚠️ Graphic Designer (related creative)
   - ✅ Canva + design tools
   - ✅ 20-30 hrs available
   - ✅ 6 years experience

3. Others with partial matches...

---

### Scenario 5: Sales SDR for SaaS

**Lead Requirements:**
- Service: AI-Enhanced Operators
- Industry: SaaS / Tech
- Role: SDR / Sales Development Rep
- Tools: Salesforce, LinkedIn Sales Navigator, Cold Email
- Hours: 40 hrs/week

**Expected Top 5 Matches:**
1. **Ryan Cooper** (Very High score)
   - ✅ SaaS + Tech industries
   - ✅ SDR + Account Executive roles
   - ✅ Salesforce + LinkedIn Sales Navigator + Cold Email
   - ✅ 40 hrs available
   - ✅ 5 years experience

2. **David Rodriguez** (High score)
   - ✅ Real Estate + SaaS industries
   - ✅ Appointment Setter + SDR roles
   - ✅ HubSpot + Pipedrive (CRM tools)
   - ✅ 40 hrs available
   - ✅ 3 years experience

3. Others...

---

## 3. Understanding the Scoring System

The matching algorithm scores candidates based on:

| Criteria | Max Points | Example |
|----------|------------|---------|
| **Industry Match** | 30 points | Lead wants "Real Estate", candidate has ["real estate", "e-commerce"] = +30 |
| **Role Match** | 25 points | Lead wants "Executive Assistant", candidate has ["executive assistant"] = +25 |
| **Tools/Skills Match** | 20 points | Lead wants "Salesforce, Asana", candidate has both = +10 each (max 20) |
| **Hours Availability** | 15 points | Lead needs 30 hrs/week, candidate available 40 hrs = +15 |
| **Timezone Match** | 10 points | Both PST = +10 |
| **Featured Candidate** | 5 points | Bonus for featured profiles |
| **Verified Profile** | 5 points | Bonus for verified profiles |
| **Experience Bonus** | Up to 10 points | 5 years = 7.5 points, 8 years = 10 points |

**Perfect Score Example:** ~120 points
- Industry match (30)
- Role match (25)  
- 4 tools match (20)
- Hours match (15)
- Timezone match (10)
- Featured + Verified (10)
- 8 years experience (10)

**Typical Good Match:** 70-90 points
**Decent Match:** 50-70 points
**Weak Match:** Below 50 points

---

## 4. Testing the Email

### Test in Browser Console

1. Submit a lead form through the chatbot
2. Open browser console (F12)
3. Look for:
   ```
   Matched top 5 candidates: [...]
   Email to send: {...}
   Full HTML Body: <!DOCTYPE html>...
   ```
4. Copy the HTML from "Full HTML Body"
5. Save to a file like `test-email.html`
6. Open in a web browser to see the email design

### What to Check in the Email

✅ **Header**: Gradient blue/purple with "✨ Your Matched VA Profiles"  
✅ **Greeting**: Personalized with lead name  
✅ **5 Candidate Cards**: Each showing:
   - Avatar (first letter of name)
   - Name and timezone
   - Match score badge (e.g., "87% Match")
   - Rate and availability
   - "Why this match" section with bullet points
   - Skills as blue tags
   - **"View Full Profile →"** button

✅ **Requirements Summary**: Shows what the lead asked for  
✅ **Next Steps**: Clear CTA to schedule strategy call  
✅ **Footer**: Contact info and branding

---

## 5. Testing Profile Pages

After generating the email, test the profile links:

1. Find a candidate ID from the console log or database
2. Go to: `http://localhost:5173/profile/{candidateId}`
3. You should see:
   - Candidate name and avatar
   - Rate and availability
   - Status badges (Active, Available)
   - Skills, industries, and roles as tags
   - Portfolio/resume links (if provided)
   - CTA button to book a call

**Example Profile URLs:**
```
http://localhost:5173/profile/550e8400-e29b-41d4-a716-446655440000
```

---

## 6. Viewing Candidates in Admin Dashboard

1. Go to `/admin` (login with `admin` / `admin1234`)
2. The dashboard should show:
   - Total leads count
   - Recent conversations
   - Recent leads with all qualification data
3. Click on a lead to see:
   - Full conversation transcript
   - All extracted data (industry, role, tools, etc.)

---

## 7. Score Verification

To manually verify scoring for a specific lead:

```sql
-- Example: Check candidates for Real Estate EA
SELECT 
  name,
  ARRAY_TO_STRING(industries, ', ') as industries,
  ARRAY_TO_STRING(roles, ', ') as roles,
  ARRAY_TO_STRING(skills, ', ') as skills,
  hourly_rate_usd,
  experience_years,
  timezone,
  -- Calculate rough match score manually
  CASE 
    WHEN 'real estate' = ANY(industries) THEN 30 
    ELSE 0 
  END +
  CASE 
    WHEN 'executive assistant' = ANY(roles) THEN 25 
    ELSE 0 
  END as estimated_score
FROM candidates
WHERE status = 'active' 
  AND availability_status = 'available'
  AND email LIKE '%@mockcandidate.com'
ORDER BY estimated_score DESC;
```

---

## 8. Testing Edge Cases

### No Matching Candidates
- Create a lead with very specific requirements (e.g., "Blockchain Developer")
- Should return fewer than 5 matches or none

### Partial Matches
- Create a lead with mixed requirements
- Check that candidates with partial matches still appear but with lower scores

### Different Timezones
- Test leads preferring PST vs EST vs GMT+8
- Verify timezone matching adds 10 points

### Budget Constraints
- Filter manually by hourly_rate_usd in future iterations
- Currently not part of scoring but could be added

---

## 9. Cleanup

To remove all mock data:
```sql
DELETE FROM public.candidates WHERE email LIKE '%@mockcandidate.com';
```

To keep some and remove others:
```sql
-- Remove only specific candidates
DELETE FROM public.candidates WHERE email IN (
  'sarah.chen@mockcandidate.com',
  'michael.santos@mockcandidate.com'
);
```

---

## 10. Next Steps

Once testing is complete:

1. **Replace mock data with real candidates**
   - Have candidates sign up at `/candidate/signup`
   - Or import real candidate data via SQL

2. **Set up email service**
   - Follow `EMAIL_SETUP.md` to connect Resend/SendGrid
   - Uncomment email sending code in `FullScreenChatbot.tsx`

3. **Monitor and optimize**
   - Track which candidates get matched most often
   - Adjust scoring weights if needed
   - Add more candidates to improve matching

4. **Enhance matching**
   - Add filters for budget (hourly rate)
   - Add language requirements
   - Add availability date filtering

---

## Troubleshooting

**Q: Candidates not showing up in matches?**
- Check that `status = 'active'` and `availability_status = 'available'`
- Verify candidates table has data: `SELECT COUNT(*) FROM candidates;`

**Q: Scores seem wrong?**
- Check console logs for match reasons
- Verify skills/industries arrays are populated correctly
- Test with exact matches first (same industry + role)

**Q: Email HTML not rendering?**
- Some email clients strip CSS - use inline styles (already done)
- Test in multiple browsers/email clients
- Use email testing tools like Litmus

**Q: Profile links not working?**
- Check that route `/profile/:id` is registered in `App.tsx`
- Verify candidate ID is a valid UUID
- Check RLS policies allow public read access to active candidates

---

Happy testing! 🚀

