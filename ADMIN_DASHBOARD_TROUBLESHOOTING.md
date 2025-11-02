# 🔧 Admin Dashboard - Troubleshooting Guide

## 🐛 **Issue: "No leads found" or "Leads (0)"**

### **Possible Causes & Solutions**

---

### **1. No Data in Database Yet**

**Symptom:** Dashboard shows 0 leads and 0 candidates

**Solution:**
- This is normal if you haven't had any chatbot conversations or candidate applications yet
- Test the chatbot at `/` or `/agent` to create some leads
- Test the application form at `/apply` to create candidate records

**How to verify:**
1. Open browser console (F12)
2. Look for the log: `Loaded data: { conversations: 0, leads: 0, ... }`
3. If all numbers are 0, the database is empty (this is normal for a new setup)

---

### **2. Supabase Connection Issue**

**Symptom:** Error message appears: "Database connection not available" or "Error loading leads"

**Solution:**
1. Check your `.env` file has these variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Verify Supabase is initialized:
   - Open browser console (F12)
   - Look for: `Supabase client not initialized`
   - If you see this, check `src/lib/supabase.ts`

3. Restart your development server:
```bash
npm run dev
```

---

### **3. Database Tables Don't Exist**

**Symptom:** Error message: "relation 'public.leads' does not exist" or similar

**Solution:**
1. Run the database migrations in Supabase:
   - Go to Supabase Dashboard → SQL Editor
   - Run the SQL from these files:
     - `QUIZ_DATABASE_SCHEMA.sql`
     - `CANDIDATE_PROFILE_SCHEMA.sql`

2. Verify tables exist:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

Expected tables:
- `conversations`
- `conversation_messages`
- `leads`
- `candidates`
- `quiz_results`

---

### **4. Row Level Security (RLS) Blocking Access**

**Symptom:** Data exists but dashboard shows 0 records, or error: "new row violates row-level security policy"

**Solution:**
1. Check RLS policies in Supabase Dashboard → Authentication → Policies

2. For admin access, you may need to temporarily disable RLS or add admin policies:

```sql
-- Disable RLS for testing (NOT for production!)
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates DISABLE ROW LEVEL SECURITY;
```

3. Or create admin policies:
```sql
-- Allow admins to view all leads
CREATE POLICY "Allow admin SELECT all leads" ON public.leads
  FOR SELECT TO authenticated 
  USING (auth.jwt() ->> 'user_type' = 'admin');
```

---

### **5. Browser Console Shows Errors**

**What to check:**

1. Open browser console (F12 or Cmd+Option+I)
2. Look for red error messages
3. Common errors and solutions:

**Error:** `Failed to fetch`
- **Solution:** Check internet connection, verify Supabase URL is correct

**Error:** `Invalid API key`
- **Solution:** Check `VITE_SUPABASE_ANON_KEY` in `.env` file

**Error:** `CORS policy`
- **Solution:** Add your domain to Supabase → Settings → API → CORS

**Error:** `401 Unauthorized`
- **Solution:** Check authentication, may need to log in again

---

### **6. Data Shows in Supabase But Not in Dashboard**

**Symptom:** You can see data in Supabase Dashboard → Table Editor, but admin dashboard shows 0

**Solution:**

1. Check browser console for the log:
```
Loaded data: { conversations: X, leads: Y, ... }
```

2. If numbers are correct in console but not displaying:
   - Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
   - Clear browser cache
   - Try incognito/private window

3. Check if filters are applied:
   - Reset all filters to "All"
   - Clear search box

---

### **7. Authentication Issues**

**Symptom:** Redirected to `/admin/login` immediately

**Solution:**
1. Log in at `/admin/login`
2. Check localStorage has `adminAuthed = 'true'`:
   - Open browser console
   - Type: `localStorage.getItem('adminAuthed')`
   - Should return `"true"`

3. If login doesn't work:
   - Check admin credentials
   - Verify admin login page is working

---

## 🔍 **Debug Checklist**

Use this checklist to systematically debug the issue:

### **Step 1: Check Browser Console**
- [ ] Open browser console (F12)
- [ ] Look for error messages (red text)
- [ ] Look for the log: `Loaded data: { ... }`
- [ ] Note any error messages

### **Step 2: Verify Environment Variables**
- [ ] `.env` file exists
- [ ] `VITE_SUPABASE_URL` is set
- [ ] `VITE_SUPABASE_ANON_KEY` is set
- [ ] Restart dev server after changing `.env`

### **Step 3: Check Supabase Connection**
- [ ] Supabase project is active (not paused)
- [ ] Can access Supabase Dashboard
- [ ] API keys are correct

### **Step 4: Verify Database Tables**
- [ ] Go to Supabase → Table Editor
- [ ] Check if `leads` table exists
- [ ] Check if `conversations` table exists
- [ ] Check if `candidates` table exists
- [ ] Check if tables have data

### **Step 5: Test Data Creation**
- [ ] Try creating a lead via chatbot
- [ ] Try creating a candidate via `/apply`
- [ ] Refresh admin dashboard
- [ ] Check if new data appears

### **Step 6: Check RLS Policies**
- [ ] Go to Supabase → Authentication → Policies
- [ ] Check if RLS is enabled
- [ ] Check if policies allow read access
- [ ] Try disabling RLS temporarily for testing

---

## 🎯 **Quick Fixes**

### **Fix 1: Hard Refresh**
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### **Fix 2: Clear Browser Cache**
```
Chrome: Settings → Privacy → Clear browsing data
Firefox: Settings → Privacy → Clear Data
```

### **Fix 3: Restart Dev Server**
```bash
# Stop server (Ctrl+C)
# Then restart
npm run dev
```

### **Fix 4: Check Supabase Status**
```
1. Go to https://status.supabase.com/
2. Check if all systems are operational
```

### **Fix 5: Verify Data Manually**
```sql
-- Run in Supabase SQL Editor
SELECT COUNT(*) FROM public.leads;
SELECT COUNT(*) FROM public.conversations;
SELECT COUNT(*) FROM public.candidates;
```

---

## 📊 **Expected Console Output**

When the dashboard loads successfully, you should see:

```javascript
Loaded data: {
  conversations: 5,
  leads: 3,
  messages: 42,
  candidates: 12,
  quizzes: 48
}
```

If you see:
```javascript
Loaded data: {
  conversations: 0,
  leads: 0,
  messages: 0,
  candidates: 0,
  quizzes: 0
}
```

This means:
- ✅ Database connection is working
- ✅ No errors occurred
- ⚠️ No data exists yet (create some test data)

---

## 🆘 **Still Having Issues?**

### **Collect This Information:**

1. **Browser Console Errors:**
   - Screenshot of any red errors
   - Copy the full error message

2. **Environment:**
   - Browser and version
   - Operating system
   - Node.js version (`node --version`)

3. **Supabase Status:**
   - Can you access Supabase Dashboard?
   - Do tables exist in Table Editor?
   - How many rows in each table?

4. **What You've Tried:**
   - List all troubleshooting steps attempted
   - What changed before the issue started?

---

## 💡 **Common Scenarios**

### **Scenario 1: Fresh Installation**
**Expected:** 0 leads, 0 candidates  
**Action:** Create test data via chatbot and `/apply` page

### **Scenario 2: After Updating Code**
**Expected:** Data should persist  
**Action:** Hard refresh browser, check console for errors

### **Scenario 3: After Supabase Migration**
**Expected:** May need to re-run migrations  
**Action:** Run SQL migration files again

### **Scenario 4: Production Deployment**
**Expected:** Environment variables may be different  
**Action:** Update production `.env` with production Supabase credentials

---

## 🔐 **Security Notes**

- Never share your `VITE_SUPABASE_ANON_KEY` publicly
- Don't commit `.env` file to Git
- Use RLS policies in production
- Implement proper admin authentication

---

## 📝 **Logging for Debugging**

The dashboard now includes comprehensive logging:

1. **Supabase Connection:**
   - Logs if client is not initialized

2. **Data Loading:**
   - Logs success/failure for each table
   - Shows count of records loaded

3. **Errors:**
   - Displays error messages in UI
   - Logs detailed errors to console

**To see all logs:**
1. Open browser console (F12)
2. Reload the page
3. Look for logs starting with "Loaded data:" or "Error loading"

---

**Last Updated:** 2025-01-30  
**Status:** ✅ **READY FOR DEBUGGING**

---

## 🎯 **Next Steps**

1. ✅ Check browser console for errors
2. ✅ Verify Supabase connection
3. ✅ Confirm database tables exist
4. ✅ Create test data if needed
5. ✅ Check RLS policies
6. ✅ Hard refresh browser

**If data still doesn't appear, check the console logs and error messages!**

