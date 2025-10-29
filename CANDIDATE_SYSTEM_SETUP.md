# 🎯 Candidate Registration & Profile System Setup Guide

Complete guide for setting up the candidate registration, approval, and profile management system.

---

## 📋 **Table of Contents**

1. [System Overview](#system-overview)
2. [Database Setup](#database-setup)
3. [Storage Setup](#storage-setup)
4. [Email Configuration](#email-configuration)
5. [Testing the Flow](#testing-the-flow)
6. [Admin Approval Process](#admin-approval-process)

---

## 🎨 **System Overview**

### **User Flow:**

```
1. Candidate applies at /apply
   ├─ Creates account (email + password)
   ├─ Fills out 7-step application form
   ├─ Completes 4 assessment quizzes
   ├─ Uploads resume, internet speed, workspace photo
   └─ Submits application

2. System saves all data to database
   ├─ Creates auth.users record
   ├─ Creates candidates table record
   ├─ Uploads files to storage
   ├─ Saves quiz results
   └─ Sets status to 'pending_approval'

3. Candidate is logged out automatically
   └─ Redirected to /candidate/login?registered=true

4. Candidate sees success message
   ├─ "Check your email for verification"
   ├─ "Application under review"
   └─ "You'll be notified when approved"

5. Admin reviews application
   └─ Changes status to 'approved' or 'rejected'

6. Candidate logs in after approval
   └─ Redirected to /candidate/dashboard

7. Candidate manages profile
   ├─ Upload profile picture
   ├─ Edit bio, location, social links
   ├─ View assessment results
   └─ Update contact information
```

---

## 🗄️ **Database Setup**

### **Step 1: Run the Candidate Profile Schema**

1. Open **Supabase Dashboard** → **SQL Editor**
2. Copy and paste the contents of `CANDIDATE_PROFILE_SCHEMA.sql`
3. Click **Run** to execute

This will:
- ✅ Add new columns to `candidates` table
- ✅ Create storage buckets (`candidate-avatars`, `candidate-files`)
- ✅ Set up RLS policies for secure file access
- ✅ Create indexes for performance
- ✅ Add auto-update triggers

### **Step 2: Verify the Schema**

Run this query to check the `candidates` table structure:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'candidates'
ORDER BY ordinal_position;
```

You should see these columns:
- `id` (uuid)
- `user_id` (uuid)
- `name` (text)
- `email` (text)
- `phone` (text)
- `avatar_url` (text)
- `bio` (text)
- `location` (text)
- `linkedin_url` (text)
- `github_url` (text)
- `portfolio_url` (text)
- `industries` (text[])
- `roles` (text[])
- `skills` (text[])
- `tools` (text[])
- `portfolio_links` (jsonb)
- `resume_url` (text)
- `internet_speed_url` (text)
- `workspace_photo_url` (text)
- `status` (text) - Default: 'pending_approval'
- `temperament_score` (jsonb)
- `onboarding_completed` (boolean)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

---

## 📦 **Storage Setup**

### **Step 1: Verify Storage Buckets**

1. Go to **Supabase Dashboard** → **Storage**
2. Verify these buckets exist:
   - ✅ `candidate-avatars` (public)
   - ✅ `candidate-files` (public)
   - ✅ `audio-responses` (public) - from quiz system

### **Step 2: Test File Upload**

Try uploading a test file to each bucket:

```sql
-- Check bucket policies
SELECT * FROM storage.buckets 
WHERE name IN ('candidate-avatars', 'candidate-files', 'audio-responses');
```

### **Step 3: Set Bucket Size Limits (Optional)**

```sql
-- Set max file size to 5MB for avatars
UPDATE storage.buckets
SET file_size_limit = 5242880
WHERE name = 'candidate-avatars';

-- Set max file size to 10MB for candidate files
UPDATE storage.buckets
SET file_size_limit = 10485760
WHERE name = 'candidate-files';
```

---

## 📧 **Email Configuration**

### **Step 1: Enable Email Confirmations**

1. Go to **Supabase Dashboard** → **Authentication** → **Email Templates**
2. Enable **Confirm signup** template
3. Customize the email template (optional)

### **Step 2: Configure Email Settings**

1. Go to **Authentication** → **Settings**
2. Under **Email Auth**, ensure:
   - ✅ **Enable email confirmations** is ON
   - ✅ **Secure email change** is ON
   - ✅ **Double confirm email changes** is ON (optional)

### **Step 3: Set Redirect URLs**

Add these URLs to **Redirect URLs** whitelist:
```
http://localhost:5173/candidate/dashboard
https://your-domain.com/candidate/dashboard
```

### **Step 4: Customize Email Templates (Optional)**

**Confirm Signup Template:**
```html
<h2>Welcome to Staffly!</h2>
<p>Thank you for applying to join our talent pool.</p>
<p>Click the link below to verify your email address:</p>
<p><a href="{{ .ConfirmationURL }}">Verify Email</a></p>
<p>Your application is currently under review. You'll receive another email once approved.</p>
```

---

## 🧪 **Testing the Flow**

### **Test 1: Complete Registration**

1. Navigate to `http://localhost:5173/apply`
2. Fill out all 7 steps:
   - Step 1: Email + Password
   - Step 2: Personal Info
   - Step 3: Background & Experience
   - Step 4: Resume & Portfolio
   - Step 5: Assessments (complete all 4 quizzes)
   - Step 6: Technical Setup
   - Step 7: Tech Stack
3. Click **Submit Application**
4. Verify redirect to `/candidate/login?registered=true`
5. Check success message appears

### **Test 2: Verify Database Records**

```sql
-- Check if candidate was created
SELECT * FROM public.candidates 
WHERE email = 'test@example.com';

-- Check if quiz results were saved
SELECT * FROM public.quiz_results 
WHERE candidate_id = 'your-candidate-id';

-- Check if files were uploaded
SELECT * FROM storage.objects 
WHERE bucket_id IN ('candidate-files', 'audio-responses');
```

### **Test 3: Login Before Approval**

1. Try logging in at `/candidate/login`
2. Should see error: "Your application is still under review"
3. Verify cannot access dashboard

### **Test 4: Approve Candidate**

```sql
-- Approve the candidate
UPDATE public.candidates
SET status = 'approved'
WHERE email = 'test@example.com';
```

### **Test 5: Login After Approval**

1. Log in at `/candidate/login`
2. Should redirect to `/candidate/dashboard`
3. Verify profile loads correctly

### **Test 6: Profile Management**

1. Click **Edit Profile** button
2. Update bio, location, social links
3. Click **Save Changes**
4. Verify changes persist after page refresh

### **Test 7: Avatar Upload**

1. Click camera icon on avatar
2. Select an image file (< 5MB)
3. Verify image uploads and displays
4. Check storage bucket:
   ```sql
   SELECT * FROM storage.objects 
   WHERE bucket_id = 'candidate-avatars';
   ```

---

## 👨‍💼 **Admin Approval Process**

### **Manual Approval (Current)**

```sql
-- View all pending candidates
SELECT 
  id,
  name,
  email,
  phone,
  industries,
  roles,
  status,
  created_at
FROM public.candidates
WHERE status = 'pending_approval'
ORDER BY created_at DESC;

-- Approve a candidate
UPDATE public.candidates
SET status = 'approved'
WHERE id = 'candidate-uuid-here';

-- Reject a candidate
UPDATE public.candidates
SET status = 'rejected'
WHERE id = 'candidate-uuid-here';
```

### **Future: Admin Dashboard (To Be Built)**

The admin dashboard will include:
- 📋 List of all pending applications
- 👀 View full candidate profiles
- ✅ Approve/Reject buttons
- 📊 View quiz results and scores
- 📧 Send approval/rejection emails
- 🔍 Search and filter candidates

---

## 🔒 **Security Checklist**

- ✅ RLS policies enabled on `candidates` table
- ✅ Storage policies restrict access to own files
- ✅ Email verification required
- ✅ Password minimum length enforced (6 chars)
- ✅ Auth session management
- ✅ Protected routes (redirect if not authenticated)
- ✅ File size limits on uploads
- ✅ File type validation (images only for avatars)

---

## 📊 **Database Queries for Monitoring**

### **Candidate Statistics**

```sql
-- Total candidates by status
SELECT status, COUNT(*) as count
FROM public.candidates
GROUP BY status;

-- Recent registrations (last 7 days)
SELECT COUNT(*) as new_candidates
FROM public.candidates
WHERE created_at > NOW() - INTERVAL '7 days';

-- Quiz completion rates
SELECT 
  c.name,
  c.email,
  COUNT(DISTINCT qr.quiz_type) as quizzes_completed
FROM public.candidates c
LEFT JOIN public.quiz_results qr ON c.id = qr.candidate_id
WHERE c.status = 'pending_approval'
GROUP BY c.id, c.name, c.email
HAVING COUNT(DISTINCT qr.quiz_type) < 4;
```

### **Storage Usage**

```sql
-- Total storage used per bucket
SELECT 
  bucket_id,
  COUNT(*) as file_count,
  SUM(metadata->>'size')::bigint / 1024 / 1024 as total_mb
FROM storage.objects
GROUP BY bucket_id;
```

---

## 🐛 **Troubleshooting**

### **Issue: "Profile not found" after signup**

**Solution:**
```sql
-- Check if candidate record was created
SELECT * FROM public.candidates WHERE email = 'user@example.com';

-- If missing, check auth.users
SELECT * FROM auth.users WHERE email = 'user@example.com';

-- Manually create candidate record if needed
INSERT INTO public.candidates (user_id, name, email, phone, status)
VALUES (
  'user-uuid-from-auth-users',
  'Full Name',
  'user@example.com',
  '+1234567890',
  'pending_approval'
);
```

### **Issue: "Failed to upload image"**

**Solution:**
1. Check storage bucket exists
2. Verify RLS policies are correct
3. Check file size < 5MB
4. Verify file type is image/*

```sql
-- Check storage policies
SELECT * FROM storage.policies 
WHERE bucket_id = 'candidate-avatars';
```

### **Issue: "Cannot log in after approval"**

**Solution:**
```sql
-- Verify candidate status
SELECT status FROM public.candidates WHERE email = 'user@example.com';

-- Verify email is confirmed
SELECT email_confirmed_at FROM auth.users WHERE email = 'user@example.com';
```

---

## 🚀 **Next Steps**

1. ✅ Run `CANDIDATE_PROFILE_SCHEMA.sql` in Supabase
2. ✅ Configure email templates
3. ✅ Test the complete registration flow
4. ✅ Approve a test candidate
5. ✅ Test profile management features
6. 🔜 Build admin dashboard for approvals
7. 🔜 Add email notifications for approval/rejection
8. 🔜 Add forgot password functionality

---

## 📝 **Notes**

- Candidates are automatically logged out after registration
- Email verification is required before login
- Admin approval is required to access dashboard
- All files are stored in Supabase Storage
- Quiz results are linked to candidate profiles
- Profile pictures are limited to 5MB
- Resumes and other files are limited to 10MB

---

**Need Help?** Check the Supabase documentation or contact the development team.

