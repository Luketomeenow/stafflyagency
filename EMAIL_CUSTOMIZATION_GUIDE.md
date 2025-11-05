# 📧 Email Customization Guide for StafflyhQ

## 🎯 **Goal**
Change email sender from "Supabase Auth" to "StafflyhQ" and customize all email templates with your branding.

---

## 📋 **Quick Setup (5 minutes)**

### **Step 1: Access Email Templates**

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Navigate to: **Authentication** → **Email Templates**

You'll see 4 templates:
- ✉️ Confirm signup
- ✉️ Magic Link
- ✉️ Reset Password
- ✉️ Change Email Address

---

### **Step 2: Configure Site URL & Redirect URLs**

Before customizing templates, set up your URLs:

1. Go to: **Authentication** → **URL Configuration**

2. **Site URL** (your main domain):
   ```
   http://localhost:5173  (for development)
   https://yourdomain.com  (for production)
   ```

3. **Redirect URLs** (add all these):
   ```
   http://localhost:5173/candidate/login
   http://localhost:5173/candidate/dashboard
   https://yourdomain.com/candidate/login
   https://yourdomain.com/candidate/dashboard
   ```

4. Click **Save**

---

### **Step 3: Customize "Confirm Signup" Template**

This is the email sent when candidates register.

#### **Subject Line:**
```
Verify Your Email - Welcome to StafflyhQ
```

#### **Email Body (HTML):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">StafflyhQ</h1>
    <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">Your Virtual Assistant Marketplace</p>
  </div>
  
  <!-- Body -->
  <div style="background-color: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #1e293b; margin-top: 0;">Welcome to StafflyhQ! 🎉</h2>
    
    <p style="color: #475569; line-height: 1.6; font-size: 16px;">
      Hi there,
    </p>
    
    <p style="color: #475569; line-height: 1.6; font-size: 16px;">
      Thank you for applying to join the <strong>StafflyhQ</strong> team! We're excited to have you on board.
    </p>
    
    <p style="color: #475569; line-height: 1.6; font-size: 16px;">
      To complete your registration and access your candidate profile, please verify your email address by clicking the button below:
    </p>
    
    <!-- CTA Button -->
    <div style="text-align: center; margin: 35px 0;">
      <a href="{{ .ConfirmationURL }}" 
         style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                color: white;
                padding: 16px 40px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                font-size: 16px;
                display: inline-block;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
        ✅ Verify Email Address
      </a>
    </div>
    
    <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
      Or copy and paste this link into your browser:
    </p>
    <p style="word-break: break-all; color: #2563eb; font-size: 13px; background-color: #f1f5f9; padding: 12px; border-radius: 6px; border-left: 4px solid #2563eb;">
      {{ .ConfirmationURL }}
    </p>
    
    <!-- What's Next Section -->
    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #2563eb;">
      <p style="color: #1e293b; font-weight: bold; margin-top: 0; font-size: 16px;">
        📋 What happens next?
      </p>
      <ul style="color: #475569; line-height: 1.8; font-size: 14px; margin: 10px 0;">
        <li>✅ Click the verification button above</li>
        <li>✅ You'll be redirected to the login page</li>
        <li>✅ Sign in with your email and password</li>
        <li>✅ Access your candidate dashboard</li>
        <li>✅ Our team will review your application within 2-3 business days</li>
      </ul>
    </div>
    
    <!-- Warning -->
    <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
      <p style="color: #92400e; margin: 0; font-size: 14px;">
        ⚠️ <strong>Important:</strong> This link will expire in 24 hours for security purposes.
      </p>
    </div>
    
    <!-- Footer -->
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
    
    <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
      If you didn't create an account with StafflyhQ, please ignore this email.
    </p>
    
    <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
      <strong>Need help?</strong> Contact us at <a href="mailto:support@stafflyhq.ai" style="color: #2563eb; text-decoration: none;">support@stafflyhq.ai</a>
    </p>
    
    <p style="margin-top: 30px; color: #475569; font-size: 14px;">
      Best regards,<br>
      <strong style="color: #1e293b;">The StafflyhQ Team</strong><br>
      <a href="https://stafflyhq.ai" style="color: #2563eb; text-decoration: none;">stafflyhq.ai</a>
    </p>
  </div>
  
  <!-- Footer Branding -->
  <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
    <p style="margin: 5px 0;">© 2025 StafflyhQ. All rights reserved.</p>
    <p style="margin: 5px 0;">Connecting businesses with exceptional virtual assistants.</p>
  </div>
</div>
```

---

### **Step 4: Customize "Magic Link" Template**

#### **Subject Line:**
```
Your StafflyhQ Sign-In Link
```

#### **Email Body (HTML):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
  <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">StafflyhQ</h1>
    <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">Your Virtual Assistant Marketplace</p>
  </div>
  
  <div style="background-color: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #1e293b; margin-top: 0;">Sign In to StafflyhQ</h2>
    
    <p style="color: #475569; line-height: 1.6; font-size: 16px;">
      Hi there,
    </p>
    
    <p style="color: #475569; line-height: 1.6; font-size: 16px;">
      Click the button below to sign in to your <strong>StafflyhQ</strong> candidate account:
    </p>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="{{ .ConfirmationURL }}" 
         style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                color: white;
                padding: 16px 40px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                font-size: 16px;
                display: inline-block;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
        🔐 Sign In to StafflyhQ
      </a>
    </div>
    
    <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
      Or copy and paste this link into your browser:
    </p>
    <p style="word-break: break-all; color: #2563eb; font-size: 13px; background-color: #f1f5f9; padding: 12px; border-radius: 6px; border-left: 4px solid #2563eb;">
      {{ .ConfirmationURL }}
    </p>
    
    <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
      <p style="color: #92400e; margin: 0; font-size: 14px;">
        ⚠️ <strong>Important:</strong> This link will expire in 1 hour for security purposes.
      </p>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
    
    <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
      If you didn't request this sign-in link, please ignore this email or contact us if you have concerns.
    </p>
    
    <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
      <strong>Need help?</strong> Contact us at <a href="mailto:support@stafflyhq.ai" style="color: #2563eb;">support@stafflyhq.ai</a>
    </p>
    
    <p style="margin-top: 30px; color: #475569; font-size: 14px;">
      Best regards,<br>
      <strong style="color: #1e293b;">The StafflyhQ Team</strong><br>
      <a href="https://stafflyhq.ai" style="color: #2563eb; text-decoration: none;">stafflyhq.ai</a>
    </p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
    <p style="margin: 5px 0;">© 2025 StafflyhQ. All rights reserved.</p>
  </div>
</div>
```

---

### **Step 5: Customize "Reset Password" Template**

#### **Subject Line:**
```
Reset Your StafflyhQ Password
```

#### **Email Body (HTML):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
  <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">StafflyhQ</h1>
    <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">Your Virtual Assistant Marketplace</p>
  </div>
  
  <div style="background-color: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #1e293b; margin-top: 0;">Reset Your Password</h2>
    
    <p style="color: #475569; line-height: 1.6; font-size: 16px;">
      Hi there,
    </p>
    
    <p style="color: #475569; line-height: 1.6; font-size: 16px;">
      We received a request to reset your <strong>StafflyhQ</strong> password. Click the button below to create a new password:
    </p>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="{{ .ConfirmationURL }}" 
         style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                color: white;
                padding: 16px 40px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                font-size: 16px;
                display: inline-block;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
        🔑 Reset Password
      </a>
    </div>
    
    <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
      Or copy and paste this link into your browser:
    </p>
    <p style="word-break: break-all; color: #2563eb; font-size: 13px; background-color: #f1f5f9; padding: 12px; border-radius: 6px; border-left: 4px solid #2563eb;">
      {{ .ConfirmationURL }}
    </p>
    
    <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
      <p style="color: #92400e; margin: 0; font-size: 14px;">
        ⚠️ <strong>Important:</strong> This link will expire in 1 hour for security purposes.
      </p>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
    
    <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
      If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
    </p>
    
    <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
      <strong>Security tip:</strong> Never share your password with anyone, including StafflyhQ staff.
    </p>
    
    <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
      <strong>Need help?</strong> Contact us at <a href="mailto:support@stafflyhq.ai" style="color: #2563eb;">support@stafflyhq.ai</a>
    </p>
    
    <p style="margin-top: 30px; color: #475569; font-size: 14px;">
      Best regards,<br>
      <strong style="color: #1e293b;">The StafflyhQ Team</strong><br>
      <a href="https://stafflyhq.ai" style="color: #2563eb; text-decoration: none;">stafflyhq.ai</a>
    </p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
    <p style="margin: 5px 0;">© 2025 StafflyhQ. All rights reserved.</p>
  </div>
</div>
```

---

### **Step 6: Customize "Change Email Address" Template**

#### **Subject Line:**
```
Confirm Your New Email Address - StafflyhQ
```

#### **Email Body (HTML):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
  <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">StafflyhQ</h1>
    <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">Your Virtual Assistant Marketplace</p>
  </div>
  
  <div style="background-color: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #1e293b; margin-top: 0;">Confirm Your New Email Address</h2>
    
    <p style="color: #475569; line-height: 1.6; font-size: 16px;">
      Hi there,
    </p>
    
    <p style="color: #475569; line-height: 1.6; font-size: 16px;">
      You've requested to change your <strong>StafflyhQ</strong> account email address. To confirm this change, please click the button below:
    </p>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="{{ .ConfirmationURL }}" 
         style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                color: white;
                padding: 16px 40px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                font-size: 16px;
                display: inline-block;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
        ✉️ Confirm New Email
      </a>
    </div>
    
    <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
      Or copy and paste this link into your browser:
    </p>
    <p style="word-break: break-all; color: #2563eb; font-size: 13px; background-color: #f1f5f9; padding: 12px; border-radius: 6px; border-left: 4px solid #2563eb;">
      {{ .ConfirmationURL }}
    </p>
    
    <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
      <p style="color: #92400e; margin: 0; font-size: 14px;">
        ⚠️ <strong>Important:</strong> This link will expire in 24 hours for security purposes.
      </p>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
    
    <div style="background-color: #fee2e2; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
      <p style="color: #991b1b; margin: 0; font-size: 13px;">
        🚨 <strong>Security Alert:</strong> If you didn't request this email change, please contact us immediately at <a href="mailto:support@stafflyhq.ai" style="color: #dc2626;">support@stafflyhq.ai</a>
      </p>
    </div>
    
    <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
      <strong>Need help?</strong> Contact us at <a href="mailto:support@stafflyhq.ai" style="color: #2563eb;">support@stafflyhq.ai</a>
    </p>
    
    <p style="margin-top: 30px; color: #475569; font-size: 14px;">
      Best regards,<br>
      <strong style="color: #1e293b;">The StafflyhQ Team</strong><br>
      <a href="https://stafflyhq.ai" style="color: #2563eb; text-decoration: none;">stafflyhq.ai</a>
    </p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
    <p style="margin: 5px 0;">© 2025 StafflyhQ. All rights reserved.</p>
  </div>
</div>
```

---

## 🎨 **Customizing Sender Name (Advanced)**

### **Option 1: Free Tier (Limited)**

By default, emails come from: `noreply@mail.app.supabase.io`

The sender name will show as "Supabase Auth" but the email content will show StafflyhQ branding.

### **Option 2: Custom SMTP (Paid - Recommended)**

To change the sender email to `noreply@stafflyhq.ai`:

1. **Set up SMTP provider** (choose one):
   - **SendGrid**: https://sendgrid.com/ (Free tier: 100 emails/day)
   - **AWS SES**: https://aws.amazon.com/ses/ (Very cheap, $0.10 per 1000 emails)
   - **Mailgun**: https://www.mailgun.com/ (Free tier: 5000 emails/month)
   - **Postmark**: https://postmarkapp.com/ (Free tier: 100 emails/month)

2. **Configure in Supabase**:
   - Go to: **Project Settings** → **Auth** → **SMTP Settings**
   - Enable "Use Custom SMTP"
   - Enter your SMTP credentials:
     ```
     SMTP Host: smtp.sendgrid.net (or your provider)
     SMTP Port: 587
     SMTP User: apikey (for SendGrid)
     SMTP Password: your-api-key
     Sender Email: noreply@stafflyhq.ai
     Sender Name: StafflyhQ
     ```

3. **Verify Domain** (if using custom domain):
   - Add DNS records (SPF, DKIM, DMARC)
   - Verify in your SMTP provider dashboard

---

## ✅ **Testing Your Email Templates**

### **Test Confirmation Email:**

1. Go to `/apply`
2. Fill out application with a test email
3. Submit application
4. Check inbox for email
5. Verify:
   - ✅ Subject shows "Verify Your Email - Welcome to StafflyhQ"
   - ✅ Email shows StafflyhQ branding
   - ✅ Button says "✅ Verify Email Address"
   - ✅ Link redirects to `/candidate/login`

### **Test in Supabase Dashboard:**

1. Go to: **Authentication** → **Users**
2. Click on a user
3. Click **"Send Email Verification"**
4. Check inbox

---

## 🎯 **What Candidates Will See**

### **In Their Inbox:**

```
From: StafflyhQ <noreply@mail.app.supabase.io>  (or custom domain)
Subject: Verify Your Email - Welcome to StafflyhQ

[Beautiful email with StafflyhQ gradient header]
[Clear call-to-action button]
[Professional formatting]
```

### **After Clicking Verification Link:**

1. Redirects to: `/candidate/login`
2. Shows message: "⚠️ Important: Verify Your Email First"
3. Can log in after verification
4. Redirects to: `/candidate/dashboard`

---

## 📊 **Email Preview**

Your emails will have:

- ✅ **StafflyhQ branding** (gradient blue/purple header)
- ✅ **Professional design** (modern, clean layout)
- ✅ **Clear CTAs** (prominent buttons)
- ✅ **Mobile responsive** (works on all devices)
- ✅ **Security warnings** (expiration times, security tips)
- ✅ **Help links** (support email, website)
- ✅ **Footer branding** (copyright, tagline)

---

## 🚀 **Quick Checklist**

After customizing emails:

- [ ] Updated all 4 email templates
- [ ] Set Site URL in Supabase
- [ ] Added redirect URLs
- [ ] Tested confirmation email
- [ ] Verified links redirect correctly
- [ ] Checked mobile rendering
- [ ] (Optional) Set up custom SMTP

---

## 📝 **Notes**

- **Free tier**: Emails come from `noreply@mail.app.supabase.io` but show StafflyhQ branding
- **Custom SMTP**: Required for custom sender email (`noreply@stafflyhq.ai`)
- **Email limits**: Supabase free tier has email rate limits
- **Spam folder**: Test emails might go to spam initially
- **Domain verification**: Required for custom sender domain

---

**Status:** ✅ READY TO CUSTOMIZE  
**Time Required:** 5-10 minutes  
**Difficulty:** Easy - just copy/paste templates!

---

**Need help?** All templates are ready to copy/paste above! Just follow the steps. 🚀

