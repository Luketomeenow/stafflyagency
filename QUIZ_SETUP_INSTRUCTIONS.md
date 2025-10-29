# 🎯 Quick Setup: Quiz Assessment System

## ✅ What's Been Built

You now have **two fully functional quiz systems** for candidate assessments:

1. **Temperament Quiz** - 10 multiple-choice questions
2. **Role Validation Assessment** - 4 audio response questions

### 📦 New Files Created

**Temperament Quiz:**
1. **`src/data/temperamentQuiz.ts`** - 10 quiz questions with scoring logic
2. **`src/components/TemperamentQuiz.tsx`** - Multiple-choice popup component

**Role Validation Quiz:**
3. **`src/data/roleValidationQuiz.ts`** - 4 audio questions with evaluation criteria
4. **`src/components/RoleValidationQuiz.tsx`** - Audio recording popup component

**Database & Documentation:**
5. **`QUIZ_DATABASE_SCHEMA.sql`** - Database tables, storage policies, and triggers
6. **`QUIZ_SYSTEM_GUIDE.md`** - Complete technical documentation
7. **`ROLE_VALIDATION_QUIZ_GUIDE.md`** - Audio quiz specific guide
8. **`QUIZ_SETUP_INSTRUCTIONS.md`** - This file

### 🔧 Modified Files

1. **`src/pages/CandidateApplicationPage.tsx`** - Integrated both quiz popups
2. **`src/lib/candidateAuth.ts`** - Updated signup function

---

## 🚀 Setup Steps (10 minutes)

### Step 1: Create Storage Bucket (For Audio Responses)

1. Open **Supabase Dashboard** → **Storage**
2. Click **"New bucket"**
3. Name: `audio-responses`
4. Public: **Yes** ✅
5. Click **"Create bucket"**

### Step 2: Run Database Migration

1. Open **Supabase Dashboard** → **SQL Editor**
2. Copy the contents of `QUIZ_DATABASE_SCHEMA.sql`
3. Paste and **Run** the SQL

This creates:
- ✅ `quiz_results` table
- ✅ Row Level Security policies for database
- ✅ Storage policies for audio files
- ✅ Auto-update trigger for `candidates.temperament_score`
- ✅ Helper functions

### Step 3: Verify Setup

Run this query in Supabase SQL Editor:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('candidates', 'quiz_results');

-- Check if storage bucket exists
SELECT name, public FROM storage.buckets WHERE name = 'audio-responses';
```

You should see both tables and the storage bucket listed.

### Step 4: Test Both Quizzes

```bash
# Start your dev server
npm run dev

# Navigate to:
http://localhost:5173/apply

# Test Temperament Quiz:
# 1. Create account (Step 1)
# 2. Fill personal info (Step 2)
# 3. Select industries/roles (Step 3)
# 4. Upload resume (Step 4)
# 5. Click "Start Quiz" on Step 5
# 6. Complete all 10 questions
# 7. Verify "Completed" badge appears

# Test Role Validation Quiz:
# 1. Click "Start Assessment" for Role Validation
# 2. Allow microphone access
# 3. Record 4 audio responses (one per role level)
# 4. Verify "Completed" badge appears
```

---

## 🎨 Features

### Temperament Quiz Experience

- ✅ **Popup modal** with beautiful gradient design
- ✅ **10 scenario-based questions** with 4 options each
- ✅ **Progress bar** showing current question
- ✅ **Previous/Next navigation** (can go back)
- ✅ **Auto-submit** on last question
- ✅ **Loading states** during submission
- ✅ **Error handling** with user-friendly messages

### Role Validation Quiz Experience

- ✅ **Audio recording** with MediaRecorder API
- ✅ **4 role-level questions** (Runner, Admin, EA, CoS)
- ✅ **Live timer** during recording (up to 2:30)
- ✅ **Playback controls** to review recording
- ✅ **Re-record option** if not satisfied
- ✅ **Auto-stop** at maximum duration
- ✅ **Microphone permission** handling
- ✅ **Browser compatibility** (WebM/MP4 fallback)

### Scoring System

- ✅ **4 Temperament Profiles:**
  - 🐴 **Strong Horse (27-30)** - Autonomous, proactive, leadership potential
  - 🐴 **Developing Horse (20-26)** - Shows initiative, needs guidance
  - 🐴 **Mule (11-19)** - Reliable but approval-seeking
  - 🐴 **Donkey (0-10)** - Reactive, needs constant direction

- ✅ **Scores are hidden** from candidates (internal use only)
- ✅ **Detailed profile data** saved for admin review

### Database Features

- ✅ **Automatic profile updates** via database trigger
- ✅ **Row Level Security** (candidates can only see their own results)
- ✅ **Quiz versioning** (v1, v2, etc. for future updates)
- ✅ **Time tracking** (how long they took)
- ✅ **Answer history** (full breakdown of responses)

---

## 📊 Viewing Results (For Admins)

### Get Latest Quiz Result

```sql
SELECT 
  c.name,
  c.email,
  qr.raw_score,
  qr.max_score,
  qr.percentage,
  qr.profile_result->>'type' as temperament_type,
  qr.time_taken_seconds,
  qr.created_at
FROM public.candidates c
JOIN public.quiz_results qr ON qr.candidate_id = c.id
WHERE qr.quiz_type = 'temperament'
  AND qr.status = 'completed'
ORDER BY qr.created_at DESC;
```

### Get Candidate Profile with Score

```sql
SELECT 
  id,
  name,
  email,
  temperament_score->>'type' as temperament_type,
  temperament_score->>'score' as score,
  temperament_score->'traits' as traits
FROM public.candidates
WHERE temperament_score IS NOT NULL
ORDER BY created_at DESC;
```

---

## 🎯 Quiz Questions Overview

The quiz evaluates candidates through **10 realistic scenarios**:

1. **Overloaded inbox** - Multiple urgent tasks at once
2. **Upset client** - Handling vague negative feedback
3. **Vague directive** - Acting on unclear instructions
4. **Calendar conflict** - Managing investor meeting request
5. **Invoice discrepancy** - Handling financial issues
6. **Report request** - Creating deliverables without specs
7. **Late-night client text** - After-hours communication
8. **Last-minute pitch deck** - High-pressure situation
9. **Disorganized systems** - Proactive problem-solving
10. **High-value lead** - After-hours sales opportunity

Each question has 4 options (A-D) with:
- **Action** they would take
- **Emotional reasoning** behind it
- **Hidden point value** (0-3)

---

## 🔮 Future Enhancements

### Coming Soon (Shown as "Coming Soon" in UI)

1. **Role Validation Assessment** - Audio-based validation
2. **Communication Style Test** - Determines quadrant
3. **Behavioral Stress Test** - Measures adaptability

### Potential Additions

- **Admin dashboard** to view all results
- **Retake functionality** (with cooldown)
- **Quiz analytics** (average scores, completion rates)
- **Email notifications** when quiz is completed
- **PDF report generation** for candidates

---

## 🐛 Troubleshooting

### Quiz button doesn't work

**Solution:** Check browser console for errors. Ensure:
- Supabase is configured (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
- User is authenticated
- Database migration was run

### Quiz doesn't submit

**Solution:**
1. Check Supabase SQL Editor for errors
2. Verify `quiz_results` table exists
3. Check RLS policies are enabled
4. Ensure candidate has a row in `candidates` table

### Temperament score not updating

**Solution:**
1. Verify trigger exists: `on_temperament_quiz_completed`
2. Check function: `update_candidate_temperament_score()`
3. Run this to test:

```sql
-- Test trigger manually
UPDATE public.quiz_results
SET status = 'completed'
WHERE id = 'your-quiz-result-id';

-- Check if candidates.temperament_score updated
SELECT temperament_score FROM public.candidates WHERE id = 'your-candidate-id';
```

---

## 📚 Documentation

- **`QUIZ_SYSTEM_GUIDE.md`** - Complete technical documentation
- **`QUIZ_DATABASE_SCHEMA.sql`** - Database schema with comments
- **`src/data/temperamentQuiz.ts`** - Quiz questions and scoring logic

---

## ✨ What's Next?

1. **Run the database migration** (Step 1 above)
2. **Test the quiz** on `/apply` page
3. **Review results** in Supabase
4. **Customize questions** if needed (edit `temperamentQuiz.ts`)
5. **Build other quizzes** using the same pattern

---

## 🎉 You're All Set!

The Temperament Quiz is ready to use. Candidates can now:
- ✅ Start the quiz from the application page
- ✅ Complete 10 scenario-based questions
- ✅ Have their results automatically saved
- ✅ See "Completed" status after finishing

Admins can:
- ✅ View all quiz results in Supabase
- ✅ See temperament profiles for each candidate
- ✅ Use scores for matching and placement decisions

**Questions?** Check `QUIZ_SYSTEM_GUIDE.md` for detailed documentation!

