# 📧 Resend Email Setup - Quick Start

Your email automation is ready! Just need to add your Resend API key to start sending emails.

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Get Your Resend API Key

1. Go to **https://resend.com**
2. Sign up for a free account (100 emails/day free)
3. Go to **API Keys** in the dashboard
4. Click **"Create API Key"**
5. Name it "StafflyAI"
6. Copy the key (starts with `re_...`)

### Step 2: Add to Your Project

Create or update `.env.local` in your project root:

```bash
# Create the file if it doesn't exist
touch .env.local
```

Add this line (replace with your actual key):

```env
VITE_RESEND_API_KEY=re_your_actual_api_key_here
```

**Full `.env.local` example:**
```env
# OpenAI API Key (for chatbot)
VITE_OPENAI_API_KEY=sk-...

# Supabase Configuration
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Resend API Key (for emails)
VITE_RESEND_API_KEY=re_...
```

### Step 3: Restart Your Dev Server

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

---

## ✅ Test It

1. Go to your chatbot
2. Fill out the form and submit
3. Check your email inbox
4. You should receive a beautiful HTML email with 5 matched candidates!

---

## 📧 Email Features Included

Your emails now have:
- ✨ Beautiful HTML design with gradient header
- 📊 Match scores for each candidate
- 🔗 Clickable "View Full Profile" buttons
- 🎨 Styled skill tags
- 📱 Mobile-responsive design
- 📄 Plain text fallback

---

## 🔍 Troubleshooting

### "Email API key not configured"
- Make sure `.env.local` exists in your project root
- Variable must be named exactly `VITE_RESEND_API_KEY`
- Restart your dev server after adding it

### Email not arriving
- Check spam folder
- Verify the email address is correct
- Check Resend dashboard for delivery status
- Free tier: 100 emails/day limit

### "onboarding@resend.dev" sender
- For testing, we use Resend's test domain
- To use your own domain:
  1. Add domain in Resend dashboard
  2. Verify DNS records
  3. Update `from:` in `src/api/sendEmail.ts`:
     ```typescript
     from: 'StafflyAI <hello@yourdomain.com>',
     ```

---

## 🚀 What Happens Now

When a lead submits the form:

1. ✅ **Lead data saved** to Supabase
2. 🔍 **Top 5 candidates matched** using scoring algorithm
3. 📧 **Beautiful HTML email sent** with profile links
4. 📊 **Logged in console** for debugging
5. 💬 **Calendar shown** for strategy call booking

---

## 💡 Tips

**Better Deliverability:**
- Use your own domain (not @resend.dev)
- Add SPF and DKIM records
- Keep bounce rate low

**Testing:**
- Send test emails to yourself first
- Check both HTML and plain text versions
- Test on different email clients (Gmail, Outlook, etc.)

**Monitoring:**
- Check Resend dashboard for delivery stats
- Set up webhooks for delivery/bounce notifications
- Monitor console logs for errors

---

## 📊 Current Email Template

Your email includes:
- **Header**: "✨ Your Top 5 Matched VA Profiles"
- **Greeting**: Personalized with lead name
- **5 Candidate Cards**: Each with:
  - Avatar (first letter)
  - Name, timezone, experience
  - Match score badge
  - Rate and availability
  - "Why this match" reasons
  - Skills as styled tags
  - "View Full Profile →" button
- **Requirements Summary**: What the lead asked for
- **Next Steps**: CTA to schedule strategy call
- **Footer**: Contact info and branding

---

## 🎯 Next Steps

Once emails are working:

1. **Test with real leads**
2. **Monitor delivery rates** in Resend dashboard
3. **Add your domain** for professional sender address
4. **Set up webhooks** for delivery notifications
5. **Track email opens/clicks** (optional)

---

## 📝 Files Modified

- ✅ `src/api/sendEmail.ts` - Email sending API
- ✅ `src/components/FullScreenChatbot.tsx` - Integrated email sending
- ✅ `src/lib/candidateMatching.ts` - HTML email template

Everything is ready! Just add your Resend API key and restart. 🎉

