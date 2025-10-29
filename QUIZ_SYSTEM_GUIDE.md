# Quiz System Guide

This document explains the **Temperament Quiz System** for candidate assessments in the Staffly application.

---

## Overview

The quiz system evaluates candidates' natural temperament when working as an assistant, measuring how they handle unclear priorities, pressure, and communication challenges.

### Temperament Profiles

The quiz identifies candidates as one of four profiles:

1. **Donkey (0-10 points)** - Reactive, heavily dependent on guidance
2. **Mule (11-19 points)** - Steady, reliable but approval-seeking
3. **Developing Horse (20-26 points)** - Shows proactive tendencies but may hesitate
4. **Strong Horse (27-30 points)** - Autonomous, proactive, thrives in chaos

---

## Database Setup

### 1. Run the SQL Schema

Execute the SQL in `QUIZ_DATABASE_SCHEMA.sql` in your Supabase SQL Editor:

```bash
# This creates:
# - quiz_results table
# - RLS policies for candidate access
# - Trigger to auto-update candidates.temperament_score
# - Helper functions
```

### 2. Verify Tables

Check that the following tables exist:
- `public.candidates` (should already exist)
- `public.quiz_results` (newly created)

---

## How It Works

### 1. Quiz Flow

1. **Candidate navigates to `/apply`** (CandidateApplicationPage)
2. **On Step 5 (Assessments)**, they see the Temperament Quiz card
3. **Click "Start Quiz"** → Opens popup window with 10 questions
4. **Answer all questions** → Quiz auto-submits on last question
5. **Results saved to database** → Popup closes, card shows "Completed"

### 2. Quiz Popup Features

- **Full-screen modal** with backdrop blur
- **Progress bar** showing question X of 10
- **Scenario-based questions** with 4 options (A-D)
- **Previous/Next navigation** (can go back to change answers)
- **Auto-save on completion** to `quiz_results` table
- **Scores are hidden** from candidates (internal use only)

### 3. Scoring Logic

Each answer is worth 0-3 points:
- **0 points** = Neutral/Overwhelmed
- **1 point** = Donkey (avoids responsibility, fearful)
- **2 points** = Mule (reliable but cautious)
- **3 points** = Horse (proactive, confident)

**Total Score: 30 points maximum (10 questions × 3 points)**

### 4. Database Storage

Quiz results are saved to `public.quiz_results`:

```typescript
{
  candidate_id: uuid,
  user_id: uuid,
  quiz_type: 'temperament',
  quiz_version: 'v1',
  raw_score: 27,
  max_score: 30,
  percentage: 90.00,
  answers: [
    { questionId: 'q1', selectedOptionId: 'b', points: 3 },
    { questionId: 'q2', selectedOptionId: 'b', points: 3 },
    // ... all 10 answers
  ],
  profile_result: {
    type: 'Strong Horse',
    score: 27,
    maxScore: 30,
    description: '...',
    traits: ['Proactive problem-solver', '...']
  },
  status: 'completed',
  time_taken_seconds: 420
}
```

The `profile_result` is also automatically copied to `candidates.temperament_score` via database trigger.

---

## File Structure

### New Files

- **`QUIZ_DATABASE_SCHEMA.sql`** - Database schema for quiz results
- **`src/data/temperamentQuiz.ts`** - Quiz questions, options, and scoring logic
- **`src/components/TemperamentQuiz.tsx`** - Popup quiz component
- **`QUIZ_SYSTEM_GUIDE.md`** - This guide

### Modified Files

- **`src/pages/CandidateApplicationPage.tsx`** - Integrated quiz popup
- **`src/lib/candidateAuth.ts`** - Updated signup function signature

---

## Usage

### For Candidates

1. Navigate to `/apply`
2. Fill out Steps 1-4 (Account, Personal Info, Background, Resume)
3. On Step 5 (Assessments), click **"Start Quiz"** on the Temperament Quiz card
4. Complete all 10 questions in the popup
5. Quiz auto-submits and closes
6. Continue with remaining steps

### For Admins

#### View Quiz Results

```sql
-- Get all quiz results for a candidate
SELECT * FROM public.quiz_results
WHERE candidate_id = 'candidate-uuid-here'
ORDER BY created_at DESC;

-- Get latest temperament quiz result
SELECT 
  profile_result->>'type' as temperament_type,
  raw_score,
  percentage,
  created_at
FROM public.quiz_results
WHERE candidate_id = 'candidate-uuid-here'
  AND quiz_type = 'temperament'
  AND status = 'completed'
ORDER BY created_at DESC
LIMIT 1;
```

#### View Candidate with Quiz Scores

```sql
SELECT 
  c.id,
  c.name,
  c.email,
  c.temperament_score->>'type' as temperament_type,
  c.temperament_score->>'score' as temperament_score,
  c.status
FROM public.candidates c
WHERE c.email = 'candidate@example.com';
```

---

## Customization

### Adding New Questions

Edit `src/data/temperamentQuiz.ts`:

```typescript
export const TEMPERAMENT_QUIZ: QuizQuestion[] = [
  // ... existing questions
  {
    id: 'q11', // New question ID
    scenario: "Your scenario text here...",
    options: [
      {
        id: 'a',
        text: "Option A text",
        points: 1, // Donkey
        reasoning: "Emotional reasoning here"
      },
      // ... more options
    ]
  }
]
```

### Adjusting Score Ranges

Edit the `calculateTemperamentProfile()` function in `src/data/temperamentQuiz.ts`:

```typescript
export function calculateTemperamentProfile(totalScore: number): TemperamentProfile {
  const maxScore = 30 // Update if you add/remove questions

  if (totalScore >= 27) {
    return { type: 'Strong Horse', ... }
  } else if (totalScore >= 20) {
    return { type: 'Developing Horse', ... }
  }
  // ... adjust ranges as needed
}
```

---

## Future Enhancements

### Planned Quizzes

1. **Role Validation Assessment** - Audio-based validation
2. **Communication Style Test** - Determines communication quadrant
3. **Behavioral Stress Test** - Measures adaptability

These are currently shown as "Coming Soon" in Step 5.

### Admin Dashboard

Build an admin view to:
- See all quiz results in a table
- Filter by temperament type
- Export results to CSV
- View detailed answer breakdowns

### Candidate Dashboard

Show candidates:
- Which quizzes they've completed
- Option to retake quizzes (with cooldown period)
- General feedback (without revealing exact scores)

---

## Testing

### 1. Test Quiz Flow

```bash
# Start dev server
npm run dev

# Navigate to:
http://localhost:5173/apply

# Complete Steps 1-4
# On Step 5, click "Start Quiz"
# Answer all 10 questions
# Verify:
# - Popup opens/closes correctly
# - Progress bar updates
# - Previous/Next navigation works
# - Quiz submits on last question
# - "Completed" badge appears
```

### 2. Verify Database

```sql
-- Check if quiz result was saved
SELECT * FROM public.quiz_results
ORDER BY created_at DESC
LIMIT 1;

-- Check if candidate temperament_score was updated
SELECT 
  name,
  email,
  temperament_score
FROM public.candidates
WHERE temperament_score IS NOT NULL
ORDER BY created_at DESC
LIMIT 1;
```

### 3. Test Different Scores

Try answering with:
- **All "A" answers** → Should get Donkey profile
- **All "B" answers** → Should get Mule profile
- **All "C" answers** → Should get Developing Horse
- **All "D" answers** → Should get Strong Horse

---

## Troubleshooting

### Quiz doesn't open

**Check:**
- Is Supabase configured? (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
- Are there console errors?
- Is the candidate authenticated?

### Quiz doesn't submit

**Check:**
- Database connection
- RLS policies (candidate must be authenticated)
- `quiz_results` table exists
- Console for error messages

### Temperament score not updating

**Check:**
- Trigger `on_temperament_quiz_completed` exists
- Function `update_candidate_temperament_score()` exists
- Candidate has a row in `candidates` table

---

## API Reference

### TemperamentQuiz Component

```typescript
<TemperamentQuiz
  isOpen={boolean}           // Controls popup visibility
  onClose={() => void}       // Called when user closes popup
  onComplete={(completed: boolean) => void}  // Called after submission
/>
```

### Quiz Data Types

```typescript
type QuizQuestion = {
  id: string
  scenario: string
  options: QuizOption[]
}

type QuizOption = {
  id: string
  text: string
  points: number  // 0-3
  reasoning: string
}

type TemperamentProfile = {
  type: 'Donkey' | 'Mule' | 'Developing Horse' | 'Strong Horse'
  score: number
  maxScore: number
  description: string
  traits: string[]
  developmentAreas?: string[]
}
```

---

## Support

For questions or issues:
1. Check this guide
2. Review `QUIZ_DATABASE_SCHEMA.sql` for database structure
3. Check `src/data/temperamentQuiz.ts` for quiz logic
4. Review console logs for errors

---

**Last Updated:** 2025-01-29

