# 🚨 FIX CHATBOT NOW - Simple 3-Step Solution

## Current Error: CORS Blocked

```
Access to fetch at 'https://gxtqhxtsanqeeaeifrrc.functions.supabase.co/chat' 
has been blocked by CORS policy
```

**This means:** The Edge Function is **NOT DEPLOYED** yet.

---

## ✅ **3-Step Fix (Copy & Paste)**

### **STEP 1: Deploy the Edge Function**

Open terminal and run:

```bash
cd /Users/jeladiaz/Documents/StafflyFolder/stafflytest
npx supabase functions deploy chat --project-ref gxtqhxtsanqeeaeifrrc --no-verify-jwt
```

If you haven't logged in yet, it will prompt you to login first.

---

### **STEP 2: Set OpenAI API Key**

```bash
npx supabase secrets set OPENAI_API_KEY=sk-your-openai-key-here --project-ref gxtqhxtsanqeeaeifrrc
```

Get your OpenAI key from: https://platform.openai.com/api-keys

---

### **STEP 3: Refresh Browser**

Press **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)

Then test the chatbot!

---

## 🎯 **If Step 1 Fails**

If you get "command not found", install Supabase CLI:

```bash
npm install -g supabase
supabase login
```

Then try Step 1 again.

---

## ✅ **Expected Result**

After deployment, the chatbot will:
- ✅ Respond to messages
- ✅ No CORS errors
- ✅ Console shows: `POST ...chat 200 OK`

---

## 🧪 **Test Deployment**

Check if function is deployed:

```bash
curl -X POST https://gxtqhxtsanqeeaeifrrc.functions.supabase.co/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{"message": "test"}'
```

Should return: `{"response":"...","success":true}`

---

## 📋 **Quick Troubleshooting**

**Error: "Not logged in"**
```bash
supabase login
```

**Error: "Project not found"**
```bash
supabase link --project-ref gxtqhxtsanqeeaeifrrc
```

**Error: "Permission denied"**
- Make sure you're logged into the correct Supabase account
- Check you have access to project gxtqhxtsanqeeaeifrrc

---

## 🎉 **That's It!**

Just deploy the function and your chatbot will work!

**Time:** 2 minutes  
**Commands:** 2  
**Result:** Working chatbot! 🤖✨


