# Email Automation Setup

## Overview
When a user submits the lead form, the system automatically:
1. Extracts qualification data from the conversation
2. Fetches active candidates from Supabase
3. Scores and ranks candidates using the matching algorithm
4. Generates a personalized **HTML email** with **top 5 matched candidates**
5. Includes **clickable profile links** for each candidate (`/profile/{candidateId}`)
6. Sends the email to the lead's email address

## Setup Options

### Option 1: Resend (Recommended - Easy Setup)

1. **Install Resend SDK**
   ```bash
   npm install resend
   ```

2. **Get API Key**
   - Sign up at https://resend.com
   - Get your API key from dashboard
   - Add to `.env.local`:
     ```
     VITE_RESEND_API_KEY=re_xxxxxxxxxxxxx
     ```

3. **Create Email API Route**
   Create `src/api/sendEmail.ts`:
   ```typescript
   import { Resend } from 'resend';

   const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

   export async function sendMatchEmail(
     to: string, 
     subject: string, 
     body: string,  // plain text fallback
     htmlBody: string  // rich HTML version
   ) {
     const { data, error } = await resend.emails.send({
       from: 'Staffly <noreply@yourdomain.com>',
       to: [to],
       subject: subject,
       text: body,      // Plain text fallback for email clients that don't support HTML
       html: htmlBody,  // Rich HTML with clickable profile links and styling
     });

     if (error) {
       console.error('Email send error:', error);
       throw error;
     }

     return data;
   }
   ```

4. **Update FullScreenChatbot.tsx**
   Uncomment the email sending code and import:
   ```typescript
   import { sendMatchEmail } from '../api/sendEmail'

   // In the form submission handler (around line 887):
   // Generate email content with HTML
   const baseUrl = window.location.origin
   const { subject, body, htmlBody } = generateMatchEmail(leadName, leadData, matched, baseUrl)

   // Send email with both plain text and HTML versions
   await sendMatchEmail(leadEmail, subject, body, htmlBody)
   ```

### Option 2: SendGrid

1. **Install SendGrid SDK**
   ```bash
   npm install @sendgrid/mail
   ```

2. **Setup**
   ```typescript
   import sgMail from '@sendgrid/mail'
   
   sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY!)
   
   export async function sendMatchEmail(to: string, subject: string, body: string) {
     await sgMail.send({
       to,
       from: 'noreply@yourdomain.com',
       subject,
       text: body,
     })
   }
   ```

### Option 3: Custom SMTP (Gmail, Outlook, etc.)

1. **Install Nodemailer**
   ```bash
   npm install nodemailer
   ```

2. **Setup**
   ```typescript
   import nodemailer from 'nodemailer'
   
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: import.meta.env.VITE_EMAIL_USER,
       pass: import.meta.env.VITE_EMAIL_PASSWORD
     }
   })
   
   export async function sendMatchEmail(to: string, subject: string, body: string) {
     await transporter.sendMail({
       from: 'noreply@yourdomain.com',
       to,
       subject,
       text: body
     })
   }
   ```

## Email Template Structure

The email includes:
- Personalized greeting with lead's name
- Top 3 matched candidates with:
  - Name, title, and bio
  - Contact info (email, phone)
  - Hourly rate and availability
  - Match score and reasons
  - Skills and tools
- Lead's requirements summary
- Next steps (book a strategy call)
- CTA to reply or book

## Testing

1. **Local Testing**
   - After running the SQL in `CANDIDATES_SCHEMA.sql`, you'll have 5 sample candidates
   - Fill out the chatbot form
   - Check browser console for:
     - "Extracted qualification data:"
     - "Matched candidates:"
     - "Email to send:"

2. **Verify Matching**
   - Match score should be 0-100
   - Higher scores = better match
   - Check `matchReasons` to understand why candidates were chosen

## Current Flow

```
User chats with bot
  ↓
Bot collects qualification data
  ↓
User fills form (name, email, phone)
  ↓
System extracts data from conversation
  ↓
System queries active candidates
  ↓
Matching algorithm scores candidates
  ↓
Top 3 candidates selected
  ↓
Email generated with personalized content
  ↓
Email sent to lead (TODO: uncomment email code)
  ↓
"Email sent!" confirmation popup
```

## Next Steps

1. Run `CANDIDATES_SCHEMA.sql` in your Supabase SQL editor
2. Choose an email provider (Resend recommended)
3. Add API key to `.env.local`
4. Create email sending function
5. Uncomment email code in `FullScreenChatbot.tsx`
6. Test with a real conversation

## Advanced: HTML Email Templates

For rich HTML emails:

```typescript
import { Resend } from 'resend';

const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .candidate { background: #f5f5f5; padding: 20px; margin: 10px 0; border-radius: 8px; }
    .score { color: #2563eb; font-weight: bold; }
  </style>
</head>
<body>
  <h1>Your Matched VA Profiles</h1>
  ${matched.map(c => `
    <div class="candidate">
      <h2>${c.name} - ${c.title}</h2>
      <p class="score">Match Score: ${c.matchScore}/100</p>
      <p>${c.bio}</p>
      <p><strong>Email:</strong> ${c.email}</p>
      <ul>
        ${c.matchReasons.map(r => `<li>${r}</li>`).join('')}
      </ul>
    </div>
  `).join('')}
</body>
</html>
`

await resend.emails.send({
  from: 'Staffly <noreply@yourdomain.com>',
  to: [leadEmail],
  subject: subject,
  html: html,
})
```

## Monitoring

- Check Supabase logs for database operations
- Check browser console for matching/email logs
- Check email provider dashboard for delivery status
- Monitor `leads` and `conversations` tables in Supabase dashboard

---

## ✨ New Features (Latest Update)

### 1. **Top 5 Candidates (Previously 3)**
The matching algorithm now returns the **top 5 best-matched candidates** instead of 3, giving leads more options to choose from.

**Updated in:**
- `src/components/FullScreenChatbot.tsx` (line 882)
- `src/lib/candidateMatching.ts`

### 2. **HTML Email with Rich Formatting**
Emails are now sent in **beautiful HTML format** with:
- ✅ Gradient header with StafflyAI branding
- ✅ Professional candidate cards with match scores
- ✅ Clickable "View Full Profile" buttons
- ✅ Match reasons highlighted for each candidate
- ✅ Skills displayed as styled tags
- ✅ Mobile-responsive design
- ✅ Plain text fallback for older email clients

**Example email structure:**
```
┌──────────────────────────────┐
│  ✨ Your Matched VA Profiles │  (Gradient header)
├──────────────────────────────┤
│ Hi [Name],                    │
│ We found 5 perfect candidates│
├──────────────────────────────┤
│ [Candidate Card 1]            │
│   • Name, Match Score         │
│   • Rate, Hours available     │
│   • Why this match            │
│   • Skills tags               │
│   [View Full Profile →]       │
├──────────────────────────────┤
│ [Candidate Card 2]            │
│   ...                         │
├──────────────────────────────┤
│ [Next Steps]                  │
│ 1. Review profiles            │
│ 2. Schedule strategy call     │
│ [Schedule a Strategy Call]    │
└──────────────────────────────┘
```

### 3. **Clickable Profile Links**
Each candidate card includes a **"View Full Profile →"** button that links to:
```
https://yourdomain.com/profile/{candidateId}
```

This opens a **public candidate profile page** showing:
- Full bio and experience
- Complete skills, industries, and roles
- Availability and rates
- Portfolio/resume links
- CTA to book a strategy call

**New route added:**
- `/profile/:id` - Public candidate profile view page
- File: `src/pages/CandidateProfileViewPage.tsx`

### 4. **Automatic Base URL Detection**
The email generator now uses `window.location.origin` to automatically generate the correct profile URLs for both:
- **Development:** `http://localhost:5173/profile/abc123`
- **Production:** `https://staffly.ai/profile/abc123`

No manual configuration needed!

### How It Works

1. **Chatbot collects lead info** → Extracts qualification data
2. **Form submitted** → Triggers candidate matching
3. **Top 5 candidates selected** → Scored by matching algorithm
4. **HTML email generated** → Beautiful, professional format
5. **Profile links included** → Each candidate gets a unique URL
6. **Email sent** → Lead receives rich HTML email with clickable links
7. **Lead clicks profile** → Views full candidate details on public page

### Testing the Email

To test the HTML email in the browser:

1. Submit the lead form in the chatbot
2. Open browser console (F12)
3. Look for log: `Full HTML Body: <!DOCTYPE html>...`
4. Copy the HTML
5. Save to a `.html` file and open in browser
6. Or use an HTML email tester like [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com)

### Email Provider Recommendations

For best results with HTML emails:

- ✅ **Resend** - Best for HTML emails, modern API, great deliverability
- ✅ **SendGrid** - Robust, handles HTML well, good analytics
- ✅ **Mailgun** - Reliable for transactional HTML emails
- ⚠️ **Basic SMTP** - May have formatting issues with complex HTML

