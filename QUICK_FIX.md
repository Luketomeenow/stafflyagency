# 🚨 QUICK FIX - Environment Variables Missing

## **The Problem:**
```
❌ Supabase environment variables not configured
❌ Database connection not available
```

---

## **The Solution (3 Steps):**

### **1️⃣ Create `.env` file**
In your project root, create a file named `.env`

### **2️⃣ Add your credentials**
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
VITE_OPENAI_API_KEY=YOUR_OPENAI_KEY_HERE
VITE_OPENAI_MODEL=gpt-4o-mini
```

### **3️⃣ Restart server**
```bash
# Stop server: Ctrl+C
npm run dev
```

---

## **Where to get credentials:**

### **Supabase:**
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Settings → API
4. Copy: **Project URL** and **anon public** key

### **OpenAI (for chatbot):**
1. Go to: https://platform.openai.com/api-keys
2. Create new secret key
3. Copy the key (starts with `sk-proj-`)

---

## **File location:**
```
/Users/jeladiaz/Documents/StafflyFolder/stafflytest/.env
```
(Same folder as `package.json`)

---

## **Example `.env` file:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_OPENAI_API_KEY=sk-proj-abcdefghijklmnop...
VITE_OPENAI_MODEL=gpt-4o-mini
```

---

## **After fixing:**
✅ Restart server  
✅ Refresh admin dashboard  
✅ Error should be gone!  

---

**Need detailed help?** See `SETUP_ENV_VARIABLES.md`

