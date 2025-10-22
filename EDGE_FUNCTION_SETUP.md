# 🚀 Supabase Edge Function Setup for Email Sending

This guide shows you how to deploy the email sending Edge Function to fix the CORS error.

---

## 📋 What We're Doing

Instead of calling Resend API directly from the browser (which causes CORS errors), we're creating a **secure backend endpoint** using Supabase Edge Functions that:

1. Receives email requests from your app
2. Calls Resend API securely (with your API key hidden)
3. Returns success/error to your app

---

## 🚀 Quick Setup

### Step 1: Install Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Windows (PowerShell)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Or use npm
npm install -g supabase
```

Verify installation:
```bash
supabase --version
```

### Step 2: Login to Supabase

```bash
supabase login
```

This will open a browser to authenticate.

### Step 3: Link Your Project

```bash
cd /Users/jeladiaz/Documents/staffly/stafflytest

# Link to your Supabase project
supabase link --project-ref your-project-ref
```

**To find your project ref:**
1. Go to your Supabase Dashboard
2. Click on your project
3. Look at the URL: `https://supabase.com/dashboard/project/YOUR-PROJECT-REF`

### Step 4: Add Resend API Key as Secret

```bash
# Add your Resend API key as a secret
supabase secrets set RESEND_API_KEY=re_your_actual_resend_key_here
```

**Get your Resend API key:**
1. Go to https://resend.com/api-keys
2. Copy your API key (starts with `re_`)
3. Use it in the command above

### Step 5: Deploy the Edge Function

```bash
# Deploy the send-match-email function
supabase functions deploy send-match-email --no-verify-jwt
```

The `--no-verify-jwt` flag allows your app to call this function without authentication (it's already protected by your Supabase URL).

### Step 6: Test It

```bash
# Test the function locally first (optional)
supabase functions serve send-match-email

# In another terminal, test with curl:
curl -i --location --request POST 'http://localhost:54321/functions/v1/send-match-email' \
  --header 'Content-Type: application/json' \
  --data '{"to":"test@example.com","subject":"Test","text":"Test","html":"<p>Test</p>"}'
```

---

## ✅ Verify It's Working

After deploying, your Edge Function URL will be:
```
https://YOUR-PROJECT-REF.supabase.co/functions/v1/send-match-email
```

Your app already knows how to call it (using `VITE_SUPABASE_URL` from `.env.local`).

Now test by:
1. Go to your chatbot
2. Fill out the form
3. Submit
4. Check console for: `✅ Email sent successfully`
5. Check your email inbox!

---

## 🔍 Troubleshooting

### "Command not found: supabase"
- Install Supabase CLI first (Step 1)
- Restart terminal after installing

### "Project not linked"
- Run `supabase link --project-ref YOUR-REF` again
- Make sure you're in the correct directory

### "RESEND_API_KEY not configured"
- Make sure you ran: `supabase secrets set RESEND_API_KEY=re_...`
- Verify with: `supabase secrets list`
- Redeploy the function after adding secrets

### "Failed to deploy"
- Check that `supabase/functions/send-match-email/index.ts` exists
- Make sure you're logged in: `supabase login`
- Try with verbose flag: `supabase functions deploy send-match-email -v`

### Still getting CORS error
- Make sure Edge Function is deployed: Check Supabase Dashboard → Edge Functions
- Verify `VITE_SUPABASE_URL` in `.env.local` is correct
- Check browser console for the actual URL being called

---

## 📊 Monitor Your Edge Function

1. Go to Supabase Dashboard
2. Click **Edge Functions** in sidebar
3. Click **send-match-email**
4. View:
   - Invocation count
   - Error rate
   - Logs (real-time)

---

## 🔐 Security Notes

✅ **Secure:**
- Resend API key is stored in Supabase secrets (not in your code)
- API key is never exposed to the browser
- CORS headers only allow your domain

⚠️ **Optional Improvements:**
- Add JWT verification for authenticated requests only
- Add rate limiting to prevent abuse
- Add email validation/sanitization

---

## 📝 Files Created

- `supabase/functions/send-match-email/index.ts` - Edge Function code
- `src/api/sendEmail.ts` - Updated to call Edge Function

---

## 🎯 What Happens Now

**Old Flow (CORS Error):**
```
Browser → Resend API ❌ CORS Error
```

**New Flow (Works!):**
```
Browser → Supabase Edge Function → Resend API ✅
```

---

## 💡 Alternative: Netlify Functions

If you prefer Netlify Functions instead of Supabase Edge Functions:

1. Create `netlify/functions/send-email.ts`:
```typescript
import type { Handler } from '@netlify/functions'

export const handler: Handler = async (event) => {
  // Similar code to Edge Function
}
```

2. Update `src/api/sendEmail.ts` to call `/.netlify/functions/send-email`

Both work! Supabase Edge Functions are faster and closer to your database.

---

## 🚀 Quick Commands Reference

```bash
# Login
supabase login

# Link project
supabase link --project-ref YOUR-REF

# Add secret
supabase secrets set RESEND_API_KEY=re_...

# Deploy function
supabase functions deploy send-match-email --no-verify-jwt

# View logs
supabase functions logs send-match-email

# Test locally
supabase functions serve
```

---

Once deployed, your emails will start working! 🎉

