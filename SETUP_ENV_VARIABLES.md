# 🔧 Setup Environment Variables - URGENT FIX

## ❌ **Current Error**

```
Supabase environment variables not configured: {hasURL: false, hasAnonKey: false}
Database connection not available
```

---

## ✅ **Quick Fix (5 minutes)**

### **Step 1: Create `.env` File**

In your project root (`/Users/jeladiaz/Documents/StafflyFolder/stafflytest/`), create a file named `.env`:

```bash
# In terminal, run:
cd /Users/jeladiaz/Documents/StafflyFolder/stafflytest
touch .env
```

Or create it manually:
1. Right-click in VS Code file explorer
2. Click "New File"
3. Name it `.env` (exactly, with the dot)

---

### **Step 2: Add Your Supabase Credentials**

Open the `.env` file and paste this:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE

# OpenAI Configuration (for AI Chatbot)
VITE_OPENAI_API_KEY=YOUR_OPENAI_KEY_HERE
VITE_OPENAI_MODEL=gpt-4o-mini
```

---

### **Step 3: Get Your Supabase Credentials**

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Log in to your account

2. **Select Your Project:**
   - Click on your Staffly project

3. **Get API Credentials:**
   - Go to: **Settings** (⚙️ icon in sidebar)
   - Click: **API**
   - You'll see:
     - **Project URL** (copy this)
     - **anon public** key (copy this)

4. **Copy to `.env` file:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE2MTYxNiwiZXhwIjoxOTMxNzM3NjE2fQ.abcdefghijklmnopqrstuvwxyz1234567890
```

---

### **Step 4: Get Your OpenAI API Key (Optional for Chatbot)**

1. **Go to OpenAI Platform:**
   - Visit: https://platform.openai.com/api-keys
   - Log in to your account

2. **Create API Key:**
   - Click: **+ Create new secret key**
   - Name it: "Staffly Chatbot"
   - Copy the key (starts with `sk-proj-...`)

3. **Add to `.env` file:**
```env
VITE_OPENAI_API_KEY=sk-proj-abcdefghijklmnopqrstuvwxyz1234567890
```

---

### **Step 5: Restart Your Dev Server**

**IMPORTANT:** After creating/updating `.env`, you MUST restart the server:

```bash
# Stop the server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

---

## 📋 **Complete `.env` File Example**

Your final `.env` file should look like this:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE2MTYxNiwiZXhwIjoxOTMxNzM3NjE2fQ.abcdefghijklmnopqrstuvwxyz1234567890

# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-proj-abcdefghijklmnopqrstuvwxyz1234567890
VITE_OPENAI_MODEL=gpt-4o-mini
```

**Replace the example values with your actual credentials!**

---

## ✅ **Verify It Works**

After restarting the server:

1. **Open Admin Dashboard:** http://localhost:5173/admin
2. **Open Browser Console:** Press F12
3. **Look for:**
   - ✅ No more "Supabase environment variables not configured" warning
   - ✅ "Loaded data: { ... }" log appears
   - ✅ Error banner disappears

---

## 🔐 **Security Notes**

### **IMPORTANT:**

1. **Never commit `.env` to Git:**
   - The `.env` file should already be in `.gitignore`
   - Never share your API keys publicly

2. **Keep keys secret:**
   - Don't share screenshots with API keys visible
   - Don't paste keys in public channels

3. **Use environment variables in production:**
   - For Netlify: Settings → Environment Variables
   - For Vercel: Settings → Environment Variables

---

## 🚨 **Common Issues**

### **Issue 1: File not found after creating `.env`**
**Solution:** Make sure the file is named exactly `.env` (with the dot, no extension)

### **Issue 2: Still showing error after adding keys**
**Solution:** Restart the dev server (Ctrl+C, then `npm run dev`)

### **Issue 3: Invalid API key error**
**Solution:** Double-check you copied the entire key (no spaces, no line breaks)

### **Issue 4: CORS error**
**Solution:** 
1. Go to Supabase Dashboard
2. Settings → API → CORS
3. Add your domain (e.g., `http://localhost:5173`)

---

## 📍 **Where to Find Things**

### **Supabase Dashboard:**
```
https://supabase.com/dashboard
↓
Select your project
↓
Settings (⚙️) → API
↓
Copy: Project URL & anon public key
```

### **OpenAI Platform:**
```
https://platform.openai.com/api-keys
↓
+ Create new secret key
↓
Copy the key (starts with sk-proj-)
```

---

## 🎯 **Quick Checklist**

- [ ] Created `.env` file in project root
- [ ] Added `VITE_SUPABASE_URL` with your project URL
- [ ] Added `VITE_SUPABASE_ANON_KEY` with your anon key
- [ ] Added `VITE_OPENAI_API_KEY` (optional, for chatbot)
- [ ] Restarted dev server (`npm run dev`)
- [ ] Refreshed admin dashboard
- [ ] Checked browser console (no more errors)

---

## 💡 **What Each Variable Does**

| Variable | Purpose | Required? |
|----------|---------|-----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | ✅ Yes |
| `VITE_SUPABASE_ANON_KEY` | Public API key for Supabase | ✅ Yes |
| `VITE_OPENAI_API_KEY` | OpenAI API for chatbot | ⚠️ Only if using chatbot |
| `VITE_OPENAI_MODEL` | AI model to use | ⚠️ Only if using chatbot |

---

## 🆘 **Still Not Working?**

If you still see errors after following all steps:

1. **Check the file location:**
   ```
   /Users/jeladiaz/Documents/StafflyFolder/stafflytest/.env
   ```
   (Should be in the same folder as `package.json`)

2. **Check file contents:**
   - No quotes around values
   - No spaces before/after `=`
   - No empty lines between variables

3. **Check server is restarted:**
   - Stop server completely (Ctrl+C)
   - Wait 2 seconds
   - Start again: `npm run dev`

4. **Check browser console:**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - Look for new error messages

---

**Once you add the environment variables and restart, the admin dashboard will work!** 🎉

---

**Last Updated:** 2025-01-30  
**Status:** 🚨 **ACTION REQUIRED - CREATE .env FILE**

