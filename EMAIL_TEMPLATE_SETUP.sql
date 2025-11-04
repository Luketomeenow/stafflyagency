-- =====================================================
-- EMAIL TEMPLATE CUSTOMIZATION FOR STAFFLYHQ
-- =====================================================
-- This file contains instructions for customizing email templates in Supabase Dashboard
-- These changes must be made through the Supabase Dashboard UI, not via SQL

-- =====================================================
-- HOW TO CUSTOMIZE EMAIL TEMPLATES
-- =====================================================

/*
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to: Authentication > Email Templates
4. You'll see these templates available:
   - Confirm signup
   - Magic Link
   - Change Email Address
   - Reset Password

5. Edit each template as shown below
*/

-- =====================================================
-- TEMPLATE 1: CONFIRM SIGNUP (EMAIL VERIFICATION)
-- =====================================================

/*
Subject: Verify Your Email - Welcome to StafflyhQ

Body:
*/

/*
<h2>Welcome to StafflyhQ! 🎉</h2>

<p>Hi there,</p>

<p>Thank you for applying to join the StafflyhQ team! We're excited to have you.</p>

<p>To complete your registration and access your candidate profile, please verify your email address by clicking the button below:</p>

<p style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #2563eb; 
            color: white; 
            padding: 14px 28px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold;
            display: inline-block;">
    Verify Email Address
  </a>
</p>

<p>Or copy and paste this link into your browser:</p>
<p style="word-break: break-all; color: #64748b; font-size: 14px;">{{ .ConfirmationURL }}</p>

<p><strong>What happens next?</strong></p>
<ul>
  <li>✅ Click the verification button above</li>
  <li>✅ You'll be redirected to the login page</li>
  <li>✅ Sign in with your email and password</li>
  <li>✅ Access your candidate dashboard</li>
  <li>✅ Our team will review your application within 2-3 business days</li>
</ul>

<p><strong>Important:</strong> This link will expire in 24 hours for security purposes.</p>

<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">

<p style="color: #64748b; font-size: 14px;">
  If you didn't create an account with StafflyhQ, please ignore this email.
</p>

<p style="color: #64748b; font-size: 14px;">
  <strong>Need help?</strong> Contact us at <a href="mailto:support@stafflyhq.ai">support@stafflyhq.ai</a>
</p>

<p style="margin-top: 30px;">
  Best regards,<br>
  <strong>The StafflyhQ Team</strong><br>
  <a href="https://stafflyhq.ai">stafflyhq.ai</a>
</p>
*/

-- =====================================================
-- TEMPLATE 2: MAGIC LINK
-- =====================================================

/*
Subject: Your StafflyhQ Sign-In Link

Body:
*/

/*
<h2>Sign In to StafflyhQ</h2>

<p>Hi there,</p>

<p>Click the button below to sign in to your StafflyhQ candidate account:</p>

<p style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #2563eb; 
            color: white; 
            padding: 14px 28px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold;
            display: inline-block;">
    Sign In to StafflyhQ
  </a>
</p>

<p>Or copy and paste this link into your browser:</p>
<p style="word-break: break-all; color: #64748b; font-size: 14px;">{{ .ConfirmationURL }}</p>

<p><strong>Important:</strong> This link will expire in 1 hour for security purposes.</p>

<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">

<p style="color: #64748b; font-size: 14px;">
  If you didn't request this sign-in link, please ignore this email or contact us if you have concerns.
</p>

<p style="color: #64748b; font-size: 14px;">
  <strong>Need help?</strong> Contact us at <a href="mailto:support@stafflyhq.ai">support@stafflyhq.ai</a>
</p>

<p style="margin-top: 30px;">
  Best regards,<br>
  <strong>The StafflyhQ Team</strong><br>
  <a href="https://stafflyhq.ai">stafflyhq.ai</a>
</p>
*/

-- =====================================================
-- TEMPLATE 3: RESET PASSWORD
-- =====================================================

/*
Subject: Reset Your StafflyhQ Password

Body:
*/

/*
<h2>Reset Your Password</h2>

<p>Hi there,</p>

<p>We received a request to reset your StafflyhQ password. Click the button below to create a new password:</p>

<p style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #2563eb; 
            color: white; 
            padding: 14px 28px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold;
            display: inline-block;">
    Reset Password
  </a>
</p>

<p>Or copy and paste this link into your browser:</p>
<p style="word-break: break-all; color: #64748b; font-size: 14px;">{{ .ConfirmationURL }}</p>

<p><strong>Important:</strong> This link will expire in 1 hour for security purposes.</p>

<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">

<p style="color: #64748b; font-size: 14px;">
  If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
</p>

<p style="color: #64748b; font-size: 14px;">
  <strong>Security tip:</strong> Never share your password with anyone, including StafflyhQ staff.
</p>

<p style="color: #64748b; font-size: 14px;">
  <strong>Need help?</strong> Contact us at <a href="mailto:support@stafflyhq.ai">support@stafflyhq.ai</a>
</p>

<p style="margin-top: 30px;">
  Best regards,<br>
  <strong>The StafflyhQ Team</strong><br>
  <a href="https://stafflyhq.ai">stafflyhq.ai</a>
</p>
*/

-- =====================================================
-- TEMPLATE 4: CHANGE EMAIL ADDRESS
-- =====================================================

/*
Subject: Confirm Your New Email Address - StafflyhQ

Body:
*/

/*
<h2>Confirm Your New Email Address</h2>

<p>Hi there,</p>

<p>You've requested to change your StafflyhQ account email address. To confirm this change, please click the button below:</p>

<p style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #2563eb; 
            color: white; 
            padding: 14px 28px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold;
            display: inline-block;">
    Confirm New Email
  </a>
</p>

<p>Or copy and paste this link into your browser:</p>
<p style="word-break: break-all; color: #64748b; font-size: 14px;">{{ .ConfirmationURL }}</p>

<p><strong>Important:</strong> This link will expire in 24 hours for security purposes.</p>

<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">

<p style="color: #64748b; font-size: 14px;">
  If you didn't request this email change, please contact us immediately at <a href="mailto:support@stafflyhq.ai">support@stafflyhq.ai</a>
</p>

<p style="color: #64748b; font-size: 14px;">
  <strong>Need help?</strong> Contact us at <a href="mailto:support@stafflyhq.ai">support@stafflyhq.ai</a>
</p>

<p style="margin-top: 30px;">
  Best regards,<br>
  <strong>The StafflyhQ Team</strong><br>
  <a href="https://stafflyhq.ai">stafflyhq.ai</a>
</p>
*/

-- =====================================================
-- ADDITIONAL SETTINGS TO CONFIGURE
-- =====================================================

/*
In Supabase Dashboard > Authentication > Settings > Auth Providers > Email:

1. Enable Email provider ✓
2. Confirm email: ENABLED ✓
3. Secure email change: ENABLED ✓
4. Email OTP: Optional (for additional security)

In Supabase Dashboard > Authentication > URL Configuration:

1. Site URL: https://yourdomain.com (or http://localhost:5173 for development)
2. Redirect URLs: Add these:
   - http://localhost:5173/candidate/login
   - http://localhost:5173/candidate/dashboard
   - https://yourdomain.com/candidate/login
   - https://yourdomain.com/candidate/dashboard

*/

-- =====================================================
-- TESTING THE EMAIL FLOW
-- =====================================================

/*
1. Submit application at /apply
2. Check your email inbox
3. Look for email from "StafflyhQ" (or noreply@mail.app.supabase.io)
4. Click "Verify Email Address" button
5. Should redirect to: /candidate/login
6. Sign in with email and password
7. Should redirect to: /candidate/dashboard

*/

-- =====================================================
-- CUSTOMIZING SENDER EMAIL (OPTIONAL - PAID FEATURE)
-- =====================================================

/*
By default, Supabase sends emails from: noreply@mail.app.supabase.io

To use a custom sender email (e.g., noreply@stafflyhq.ai):

1. Go to Supabase Dashboard > Project Settings > Auth
2. Scroll to "SMTP Settings"
3. Enable "Use Custom SMTP"
4. Configure your SMTP provider (e.g., SendGrid, AWS SES, Mailgun)
5. Enter:
   - SMTP Host
   - SMTP Port
   - SMTP User
   - SMTP Password
   - Sender Email: noreply@stafflyhq.ai
   - Sender Name: StafflyhQ

Popular SMTP Providers:
- SendGrid: https://sendgrid.com/
- AWS SES: https://aws.amazon.com/ses/
- Mailgun: https://www.mailgun.com/
- Postmark: https://postmarkapp.com/

Note: This requires a paid Supabase plan or SMTP provider account.
*/

-- =====================================================
-- END OF EMAIL TEMPLATE SETUP
-- =====================================================

