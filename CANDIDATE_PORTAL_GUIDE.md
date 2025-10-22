# Candidate Portal Guide

This document explains the new **Candidate Authentication & Profile System** for StafflyAI.

## Overview

Candidates can now:
1. **Sign up** for an account at `/candidate/signup`
2. **Log in** at `/candidate/login`
3. **View and manage their profile** at `/candidate/dashboard`

Once logged in, candidates can fill out their complete profile (skills, industries, roles, experience, etc.) which will be used for matching with client needs.

---

## Setup Instructions

### 1. Run the Supabase SQL Setup

Execute the following SQL in your Supabase SQL Editor:

```sql
-- Run the contents of CANDIDATE_AUTH_SETUP.sql
```

This will:
- Add `user_id` and `onboarding_completed` columns to the `candidates` table
- Link candidates to Supabase Auth users
- Set up RLS (Row Level Security) policies
- Create a trigger to auto-create candidate profiles on signup

### 2. Enable Supabase Auth

Make sure Supabase Auth is enabled in your project:

1. Go to your Supabase Dashboard → Authentication
2. Enable "Email" provider (or any other providers you want)
3. Configure email templates if needed

### 3. Test the Flow

1. Visit `http://localhost:5173/jobs`
2. Click "Apply" on any job posting
3. You'll be redirected to `/candidate/signup`
4. Create an account
5. After signup, you'll be redirected to `/candidate/dashboard`
6. Fill out your profile (skills, industries, roles, etc.)
7. Click "Save Profile"

---

## Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/candidate/signup` | Candidate sign up form | No |
| `/candidate/login` | Candidate log in form | No |
| `/candidate/dashboard` | Candidate profile view & edit | Yes |
| `/jobs` | Public job listings | No |

---

## File Structure

### New Files

- **`src/lib/candidateAuth.ts`** - Authentication helpers for candidates (signup, login, logout, profile fetch/update)
- **`src/pages/CandidateSignupPage.tsx`** - Signup page for candidates
- **`src/pages/CandidateLoginPage.tsx`** - Login page for candidates
- **`src/pages/CandidateDashboardPage.tsx`** - Protected dashboard with profile view/edit
- **`CANDIDATE_AUTH_SETUP.sql`** - Database schema and RLS policies for candidate auth

### Modified Files

- **`src/App.tsx`** - Added candidate routes, excluded them from SiteLayout
- **`src/pages/JobsPage.tsx`** - Updated "Apply" buttons to link to `/candidate/signup`

---

## How It Works

### 1. Signup Flow

1. User fills out signup form (name, email, password)
2. `signupCandidate()` is called, which:
   - Creates a new user in `auth.users` with `user_type: 'candidate'` in metadata
   - Triggers the `on_auth_user_created_candidate` trigger
   - Auto-creates a row in `public.candidates` with `user_id`, `email`, `name`, `status: 'inactive'`, `onboarding_completed: false`
3. User is redirected to `/candidate/dashboard`

### 2. Login Flow

1. User enters email and password
2. `loginCandidate()` is called, which uses Supabase `signInWithPassword()`
3. If successful, user is redirected to `/candidate/dashboard`

### 3. Profile Management

1. On dashboard load, `getCandidateProfile()` fetches the candidate's row from `public.candidates`
2. User can edit their profile fields (skills, industries, roles, rates, etc.)
3. When "Save Profile" is clicked, `updateCandidateProfile()` updates the row
4. After first save, `status` is set to `'active'` and `onboarding_completed` is set to `true`

### 4. Row Level Security (RLS)

- **Anon users** can SELECT active candidates (for public job board)
- **Authenticated candidates** can:
  - INSERT their own profile (during signup)
  - UPDATE only their own profile
  - SELECT their own profile (even if not active)
- **Admins** (if you set up admin policies) can view/edit all candidates

---

## Database Schema Changes

### `public.candidates` Table

New columns:
- `user_id` (UUID, FK to `auth.users.id`) - Links candidate to authentication
- `onboarding_completed` (BOOLEAN, default false) - Tracks if profile setup is done

### `auth.users` Metadata

When a candidate signs up, we store:
```json
{
  "user_type": "candidate",
  "full_name": "John Doe"
}
```

---

## Matching Candidates to Leads

With the new auth system, you can now:

1. **Admin Dashboard** - View all candidates and their profiles
2. **Candidate Matching** - Use the existing `matchCandidates()` function in `src/lib/candidateMatching.ts` to match leads with authenticated candidates
3. **Email Automation** - Send matched profiles to leads (see `EMAIL_SETUP.md`)

---

## Next Steps

1. **Run the SQL setup** (`CANDIDATE_AUTH_SETUP.sql`)
2. **Test the signup/login flow**
3. **Populate test candidates** (either manually via dashboard or have people sign up)
4. **Integrate candidate matching** with your lead flow (already partially done in `FullScreenChatbot.tsx`)

---

## Security Notes

- Passwords are hashed by Supabase Auth (bcrypt)
- RLS policies prevent candidates from viewing/editing other candidates' data
- Session tokens are stored securely in localStorage by Supabase client
- Email verification can be enabled in Supabase Auth settings

---

## Troubleshooting

### "No profile found" error after signup

- Check if the trigger `on_auth_user_created_candidate` is working
- Verify that `user_type` is being set in metadata during signup
- Check Supabase logs for any errors

### Can't update profile

- Verify RLS policies are set up correctly
- Check if user is authenticated (session exists)
- Look for errors in browser console

### Redirect loop after login

- Clear localStorage and try again
- Check if `getCandidateProfile()` is returning valid data
- Ensure `user_id` FK is set correctly in candidates table

---

## Future Enhancements

- **Email verification** - Require candidates to verify email before activating profile
- **Profile completeness indicator** - Show % complete on dashboard
- **Resume upload** - Store files in Supabase Storage instead of URLs
- **Assessments** - Integrate the temperament/role validation quizzes
- **Job applications** - Allow candidates to apply to specific jobs (track applications in a new table)
- **Notifications** - Email candidates when they're matched with a lead

