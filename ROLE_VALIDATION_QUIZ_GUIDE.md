# 🎙️ Role Validation Quiz (Audio Response) - Complete Guide

## Overview

The **Role Validation Assessment** is an audio-based quiz that evaluates candidates' real-world experience across four role levels:

1. **Runner** - Basic support & initiative
2. **Admin / Secretary** - Accuracy & client journey
3. **Executive Assistant** - Executive representation
4. **Chief of Staff** - Strategy, systems & leadership

Each candidate records **4 audio responses** (one per role level), with a **2-minute time limit** per question.

---

## 🎯 Objectives

### For Candidates
- Demonstrate **real experience** with specific examples
- Follow the **Situation-Action-Result (SAR)** format
- Provide **honest, detailed responses** (not just job titles)
- Show **communication skills** through clear audio responses

### For Admins
- **Validate experience level** beyond resume claims
- **Identify highest validated role** based on responses
- **Score candidates** on 4 criteria (0-5 points each):
  - Specificity
  - Structure
  - Impact
  - Communication
- **Match candidates** to appropriate client needs

---

## 📋 The Four Questions

### 1. Runner Test (Basic Support & Initiative)
**Level:** Runner  
**Color:** Green to Teal  

**Question:**
> "Think back to a time when you were given simple, repetitive tasks — like scheduling calls, updating notes, setting appointments, or handling basic admin work. Describe a moment when you didn't know how to do the task at first. How did you figure it out, and how did you update your manager or client afterward?"

**What We're Looking For:**
- Basic task execution
- Learning ability
- Communication with manager
- Initiative to figure things out

---

### 2. Admin Test (Accuracy & Client Journey)
**Level:** Admin / Secretary  
**Color:** Blue to Indigo  

**Question:**
> "Imagine you were responsible for contracts, paperwork, or a client file where even a small mistake could cost the company money or damage trust. Tell me about a time when you personally managed an important document, process, or customer handoff. What steps did you take to make sure everything was correct, and how did you communicate expectations to the client or your team?"

**What We're Looking For:**
- Attention to detail
- Quality control processes
- Risk awareness
- Stakeholder communication

---

### 3. Executive Assistant Test (Executive Representation)
**Level:** Executive Assistant  
**Color:** Purple to Pink  

**Question:**
> "Think of a time when the executive you supported was unavailable and you had to step in. Maybe it was protecting their calendar, filtering meetings, negotiating with a client, or leading a discussion in their place. Walk me through the exact situation — what decisions did you make, how did you manage relationships, and how did you update your executive afterward?"

**What We're Looking For:**
- Autonomous decision-making
- Executive-level judgment
- Relationship management
- Proactive communication

---

### 4. Chief of Staff Test (Strategy, Systems & Leadership)
**Level:** Chief of Staff  
**Color:** Orange to Red  

**Question:**
> "Tell me about a time when you had to act as the bridge between leadership and the rest of the team. Maybe you managed budgets, built systems, trained others, or coordinated across departments while your leader focused on growth. What exactly did you own, how did you communicate with both leadership and the team, and what was the result?"

**What We're Looking For:**
- Strategic thinking
- Systems leadership
- Cross-functional coordination
- Bidirectional communication (up and down)

---

## 🎙️ Audio Recording Features

### Recording Constraints
- **Minimum Duration:** 30 seconds
- **Maximum Duration:** 2 minutes 30 seconds (150 seconds)
- **Warning:** At 2 minutes (120 seconds)
- **Format:** WebM (Opus codec) or MP4 (Safari fallback)

### User Experience
1. **Click microphone button** to start recording
2. **See live timer** counting up
3. **Get warning** at 2-minute mark
4. **Auto-stop** at 2:30 if still recording
5. **Click stop button** to finish early
6. **Play back** recording to review
7. **Re-record** if not satisfied
8. **Navigate** back to previous questions

### Recording States
- **Idle** - Ready to record (red microphone button)
- **Recording** - Active recording (pulsing red button with timer)
- **Recorded** - Playback available (blue play button)
- **Playing** - Audio playing (pause button)

---

## 💾 Database Storage

### Audio Files
- **Stored in:** Supabase Storage bucket `audio-responses`
- **Path:** `{candidate_id}/{question_id}_{timestamp}.webm`
- **Public URL:** Generated for admin review
- **Security:** RLS policies ensure candidates can only upload their own files

### Quiz Results
Each audio response is saved to `quiz_results` table:

```typescript
{
  candidate_id: uuid,
  user_id: uuid,
  quiz_type: 'role_validation',
  quiz_version: 'v1',
  raw_score: 0, // Admin scores after review
  max_score: 20, // 5 points × 4 criteria
  percentage: 0,
  answers: {
    questionId: 'runner',
    level: 'runner',
    audioUrl: 'https://...',
    duration: 87 // seconds
  },
  profile_result: {
    level: 'runner',
    title: 'Basic Support & Initiative',
    audioUrl: 'https://...',
    duration: 87,
    needsReview: true
  },
  status: 'completed',
  time_taken_seconds: 87
}
```

---

## 📊 Scoring System (Admin Use)

### Evaluation Criteria (0-5 points each)

#### 1. Specificity (0-5)
- **5 points:** Concrete example with specific details, names, numbers
- **3 points:** General example with some details
- **1 point:** Vague or hypothetical response
- **0 points:** No specific example provided

#### 2. Structure (0-5)
- **5 points:** Clear SAR format (Situation → Action → Result)
- **3 points:** Partial structure, missing one element
- **1 point:** Disorganized or hard to follow
- **0 points:** No structure

#### 3. Impact (0-5)
- **5 points:** Demonstrates clear business impact and outcomes
- **3 points:** Some impact mentioned but not quantified
- **1 point:** Minimal or unclear impact
- **0 points:** No impact discussed

#### 4. Communication (0-5)
- **5 points:** Clear, confident, professional delivery
- **3 points:** Understandable but lacks polish
- **1 point:** Difficult to understand or unprofessional
- **0 points:** Incoherent or inappropriate

### Total Score: 0-20 per question

### Validation Threshold
- **≥ 12/20** = Validated for that role level
- **< 12/20** = Not validated

### Overall Role Level Determination

The system calculates the **highest validated level**:

```typescript
if (chief_of_staff_score >= 12) → "Chief of Staff"
else if (executive_assistant_score >= 12) → "Executive Assistant"
else if (admin_score >= 12) → "Admin / Secretary"
else if (runner_score >= 12) → "Runner"
else → "Needs additional validation"
```

---

## 🚀 Setup Instructions

### Step 1: Create Storage Bucket

1. Open **Supabase Dashboard** → **Storage**
2. Click **"New bucket"**
3. Name: `audio-responses`
4. Public: **Yes** (for admin playback)
5. Click **"Create bucket"**

### Step 2: Run SQL Migration

The storage policies are already in `QUIZ_DATABASE_SCHEMA.sql`. If you haven't run it yet:

1. Open **Supabase Dashboard** → **SQL Editor**
2. Copy contents of `QUIZ_DATABASE_SCHEMA.sql`
3. Paste and **Run**

### Step 3: Test the Quiz

```bash
npm run dev
# Navigate to: http://localhost:5173/apply
# Complete Steps 1-4
# On Step 5, click "Start Assessment" for Role Validation
```

---

## 🎨 UI Features

### Popup Modal
- **Gradient header** matching role level color
- **Progress bar** showing question X of 4
- **Role level badge** (Runner, Admin, EA, CoS)
- **Question card** with guidelines
- **Recording controls** with visual feedback
- **Timer display** (recording and playback)
- **Previous/Next navigation**

### Recording Controls
- **Red microphone button** - Start recording
- **Pulsing animation** - Active recording
- **Live timer** - Shows recording duration
- **Warning indicator** - At 2-minute mark
- **Auto-stop** - At 2:30 maximum
- **Play/Pause button** - Review recording
- **Re-record button** - Delete and start over

### Microphone Permissions
- **Permission request** on first recording
- **Error handling** if denied
- **Instructions** to enable in browser settings
- **Retry mechanism** after granting permission

---

## 📱 Browser Compatibility

### Supported Browsers
- ✅ **Chrome** (Desktop & Mobile)
- ✅ **Firefox** (Desktop & Mobile)
- ✅ **Safari** (Desktop & Mobile)
- ✅ **Edge** (Desktop & Mobile)

### Audio Formats
- **Primary:** WebM with Opus codec
- **Fallback:** MP4 (for Safari)
- **Auto-detection:** Uses `MediaRecorder.isTypeSupported()`

---

## 🔍 Admin Review Workflow

### 1. View Submitted Responses

```sql
-- Get all role validation responses for review
SELECT 
  c.name,
  c.email,
  qr.answers->>'level' as role_level,
  qr.answers->>'audioUrl' as audio_url,
  qr.answers->>'duration' as duration_seconds,
  qr.created_at,
  qr.id as quiz_result_id
FROM public.candidates c
JOIN public.quiz_results qr ON qr.candidate_id = c.id
WHERE qr.quiz_type = 'role_validation'
  AND qr.profile_result->>'needsReview' = 'true'
ORDER BY qr.created_at DESC;
```

### 2. Listen to Audio Response
- Copy the `audio_url` from query results
- Open in browser to listen
- Take notes on evaluation criteria

### 3. Score the Response

```sql
-- Update quiz result with admin scoring
UPDATE public.quiz_results
SET 
  raw_score = 18, -- Total score (0-20)
  percentage = 90.00, -- (18/20) * 100
  profile_result = jsonb_set(
    profile_result,
    '{needsReview}',
    'false'
  ),
  profile_result = jsonb_set(
    profile_result,
    '{evaluation}',
    '{"specificity": 5, "structure": 4, "impact": 5, "communication": 4}'::jsonb
  ),
  reviewed_by = auth.uid(),
  reviewed_at = now(),
  admin_notes = 'Strong example with clear SAR format. Excellent communication.'
WHERE id = 'quiz-result-id-here';
```

### 4. Determine Overall Role Level

```sql
-- Get candidate's validated role level
SELECT 
  c.name,
  c.email,
  CASE 
    WHEN MAX(CASE WHEN qr.answers->>'level' = 'chief_of_staff' AND qr.raw_score >= 12 THEN 1 ELSE 0 END) = 1 
      THEN 'Chief of Staff'
    WHEN MAX(CASE WHEN qr.answers->>'level' = 'executive_assistant' AND qr.raw_score >= 12 THEN 1 ELSE 0 END) = 1 
      THEN 'Executive Assistant'
    WHEN MAX(CASE WHEN qr.answers->>'level' = 'admin' AND qr.raw_score >= 12 THEN 1 ELSE 0 END) = 1 
      THEN 'Admin / Secretary'
    WHEN MAX(CASE WHEN qr.answers->>'level' = 'runner' AND qr.raw_score >= 12 THEN 1 ELSE 0 END) = 1 
      THEN 'Runner'
    ELSE 'Needs Validation'
  END as validated_role_level
FROM public.candidates c
LEFT JOIN public.quiz_results qr ON qr.candidate_id = c.id AND qr.quiz_type = 'role_validation'
WHERE c.id = 'candidate-id-here'
GROUP BY c.id, c.name, c.email;
```

---

## 🐛 Troubleshooting

### Microphone Not Working

**Symptoms:** "Microphone access denied" error

**Solutions:**
1. Check browser permissions (click lock icon in address bar)
2. Grant microphone access
3. Refresh page and try again
4. Try different browser if issue persists

### Recording Won't Start

**Symptoms:** Button clicks but nothing happens

**Solutions:**
1. Check browser console for errors
2. Ensure HTTPS (required for microphone access)
3. Try different browser
4. Check if microphone is being used by another app

### Audio Upload Fails

**Symptoms:** "Failed to submit quiz" error

**Solutions:**
1. Check Supabase storage bucket exists (`audio-responses`)
2. Verify storage policies are set up
3. Check browser console for specific error
4. Ensure candidate is authenticated

### Playback Doesn't Work

**Symptoms:** Can't play back recording

**Solutions:**
1. Check if audio URL is valid
2. Verify browser supports WebM/MP4 format
3. Check browser console for errors
4. Try re-recording

---

## 📚 Files Reference

### New Files
1. **`src/data/roleValidationQuiz.ts`** - Quiz questions and scoring logic
2. **`src/components/RoleValidationQuiz.tsx`** - Audio recording component
3. **`ROLE_VALIDATION_QUIZ_GUIDE.md`** - This guide

### Modified Files
1. **`src/pages/CandidateApplicationPage.tsx`** - Integrated quiz
2. **`QUIZ_DATABASE_SCHEMA.sql`** - Added storage policies

---

## 🎯 Best Practices

### For Candidates
- **Find a quiet space** before starting
- **Test microphone** before recording
- **Think through example** before clicking record
- **Follow SAR format:** Situation → Action → Result
- **Be specific:** Use names, numbers, details
- **Stay under 2 minutes** for best results

### For Admins
- **Listen to full response** before scoring
- **Take notes** on each criterion
- **Be consistent** with scoring across candidates
- **Document reasoning** in admin notes
- **Compare** similar role levels for calibration

---

## 🔮 Future Enhancements

### Potential Features
- **Transcription** - Auto-transcribe audio to text (OpenAI Whisper)
- **AI Scoring** - Use AI to provide initial scores (admin reviews final)
- **Batch Review** - Admin dashboard to review multiple responses
- **Comparison View** - Compare candidates side-by-side
- **Email Notifications** - Alert admins when new responses submitted
- **Retake Policy** - Allow candidates to retake after X days

---

## ✅ Checklist

Before going live:

- [ ] Create `audio-responses` storage bucket in Supabase
- [ ] Run `QUIZ_DATABASE_SCHEMA.sql` migration
- [ ] Test recording on different browsers
- [ ] Test audio playback for admins
- [ ] Set up admin review process
- [ ] Document scoring guidelines for team
- [ ] Test on mobile devices
- [ ] Verify storage costs and limits

---

**Questions?** Check the main `QUIZ_SYSTEM_GUIDE.md` or contact the development team!

