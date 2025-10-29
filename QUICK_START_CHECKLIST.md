# ✅ Quick Start Checklist - Candidate System

## 🚀 **5-Minute Setup**

### **Step 1: Database Migration** (2 minutes)

```bash
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy contents of CANDIDATE_PROFILE_SCHEMA.sql
4. Paste and click "Run"
5. Wait for "Success" message
```

**Verify:**
```sql
-- Check if new columns exist
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'candidates';

-- Should see: avatar_url, bio, location, linkedin_url, etc.
```

---

### **Step 2: Storage Buckets** (1 minute)

```bash
1. Go to Supabase Dashboard → Storage
2. Verify these buckets exist:
   ✓ candidate-avatars
   ✓ candidate-files
   ✓ audio-responses
```

**If missing, create them:**
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('candidate-avatars', 'candidate-avatars', true),
  ('candidate-files', 'candidate-files', true)
ON CONFLICT DO NOTHING;
```

---

### **Step 3: Email Configuration** (2 minutes)

```bash
1. Go to Supabase Dashboard → Authentication → Email Templates
2. Enable "Confirm signup" template
3. (Optional) Customize email content
4. Go to Authentication → Settings
5. Ensure "Enable email confirmations" is ON
```

---

## 🧪 **Testing (10 minutes)**

### **Test 1: Registration** (3 minutes)

```bash
1. Navigate to http://localhost:5173/apply
2. Fill out all 7 steps:
   - Email: test@example.com
   - Password: test123
   - Complete all fields
   - Complete all 4 quizzes
   - Upload files
3. Click "Submit Application"
4. Should redirect to /candidate/login?registered=true
5. Check for success message
```

**Verify in Database:**
```sql
SELECT * FROM candidates WHERE email = 'test@example.com';
-- Should see: status = 'pending_approval'
```

---

### **Test 2: Login Before Approval** (1 minute)

```bash
1. Try logging in with test@example.com
2. Should see error: "Application under review"
3. Cannot access dashboard
```

---

### **Test 3: Approve Candidate** (1 minute)

```sql
UPDATE candidates
SET status = 'approved'
WHERE email = 'test@example.com';
```

---

### **Test 4: Login After Approval** (2 minutes)

```bash
1. Log in with test@example.com
2. Should redirect to /candidate/dashboard
3. Profile should load with all data
4. Status badge should show "Approved" (green)
```

---

### **Test 5: Profile Management** (3 minutes)

```bash
1. Click camera icon on avatar
2. Upload a profile picture (< 5MB)
3. Verify image displays
4. Click "Edit Profile"
5. Update bio, location, LinkedIn URL
6. Click "Save Changes"
7. Refresh page
8. Verify changes persist
```

---

## 📋 **Pre-Flight Checklist**

Before going live, ensure:

- [ ] Database migration completed successfully
- [ ] Storage buckets created and public
- [ ] RLS policies active on candidates table
- [ ] Storage policies active on buckets
- [ ] Email templates configured
- [ ] Email confirmations enabled
- [ ] Test registration completed
- [ ] Test login works
- [ ] Test profile editing works
- [ ] Test file uploads work
- [ ] Test all 4 quizzes work
- [ ] Environment variables set in production

---

## 🔧 **Environment Variables**

Ensure these are set in your `.env` file and production environment:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_key (for chatbot)
VITE_OPENAI_MODEL=gpt-4o-mini (or your preferred model)
```

---

## 🐛 **Quick Troubleshooting**

### **Problem: "Profile not found" after registration**

```sql
-- Check if candidate record exists
SELECT * FROM candidates WHERE email = 'user@example.com';

-- If missing, check auth.users
SELECT * FROM auth.users WHERE email = 'user@example.com';

-- Manually create if needed
INSERT INTO candidates (user_id, name, email, status)
SELECT id, raw_user_meta_data->>'full_name', email, 'pending_approval'
FROM auth.users WHERE email = 'user@example.com';
```

---

### **Problem: "Failed to upload image"**

```sql
-- Check if bucket exists
SELECT * FROM storage.buckets WHERE name = 'candidate-avatars';

-- Check policies
SELECT * FROM storage.policies WHERE bucket_id = 'candidate-avatars';

-- If missing, run CANDIDATE_PROFILE_SCHEMA.sql again
```

---

### **Problem: "Cannot log in after approval"**

```sql
-- Check candidate status
SELECT status FROM candidates WHERE email = 'user@example.com';

-- Check email confirmation
SELECT email_confirmed_at FROM auth.users WHERE email = 'user@example.com';

-- If email not confirmed, manually confirm:
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'user@example.com';
```

---

## 📊 **Admin Quick Commands**

### **View All Pending Applications**

```sql
SELECT 
  id, name, email, phone, 
  industries, roles, 
  created_at
FROM candidates
WHERE status = 'pending_approval'
ORDER BY created_at DESC;
```

---

### **Approve Multiple Candidates**

```sql
UPDATE candidates
SET status = 'approved'
WHERE id IN (
  'uuid-1',
  'uuid-2',
  'uuid-3'
);
```

---

### **View Candidate with Quiz Results**

```sql
SELECT 
  c.name,
  c.email,
  c.status,
  COUNT(DISTINCT qr.quiz_type) as quizzes_completed,
  c.created_at
FROM candidates c
LEFT JOIN quiz_results qr ON c.id = qr.candidate_id
WHERE c.email = 'user@example.com'
GROUP BY c.id, c.name, c.email, c.status, c.created_at;
```

---

### **View Storage Usage**

```sql
SELECT 
  bucket_id,
  COUNT(*) as file_count,
  SUM((metadata->>'size')::bigint) / 1024 / 1024 as total_mb
FROM storage.objects
GROUP BY bucket_id;
```

---

## 🎯 **Success Criteria**

System is ready when:

✅ New candidates can register at `/apply`  
✅ All form data saves to database  
✅ Files upload to storage  
✅ Quiz results save correctly  
✅ Candidates see success message after registration  
✅ Login blocked until approved  
✅ Dashboard accessible after approval  
✅ Profile editing works  
✅ Avatar upload works  
✅ All data persists after refresh  

---

## 📞 **Need Help?**

1. Check `CANDIDATE_SYSTEM_SETUP.md` for detailed instructions
2. Check `CANDIDATE_SYSTEM_DIAGRAM.md` for architecture overview
3. Check Supabase logs for errors
4. Verify RLS policies are correct
5. Check browser console for frontend errors

---

## 🚀 **You're Ready!**

Once all checkboxes are complete, your candidate system is ready for production use.

**Next Steps:**
1. Build admin dashboard for reviewing applications
2. Add email notifications for approval/rejection
3. Add forgot password functionality
4. Monitor system performance and user feedback

---

**Estimated Total Setup Time: ~15 minutes**

**Status:** ✅ All components built and ready for deployment

