# 🎯 Candidate System Architecture Diagram

## 📊 **Complete System Overview**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STAFFLY CANDIDATE SYSTEM                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND PAGES                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  /apply                      /candidate/login              /candidate/      │
│  ┌─────────────────┐        ┌──────────────────┐         dashboard         │
│  │ Application     │        │ Login Page       │         ┌──────────────┐  │
│  │ Form (7 Steps)  │   →    │ - Email/Password │    →    │ Profile      │  │
│  │                 │        │ - Success Msg    │         │ Dashboard    │  │
│  │ 1. Account      │        │ - Error Handling │         │ (LinkedIn-   │  │
│  │ 2. Personal     │        └──────────────────┘         │  style)      │  │
│  │ 3. Experience   │                                     └──────────────┘  │
│  │ 4. Resume       │                                                        │
│  │ 5. Assessments  │                                                        │
│  │ 6. Tech Setup   │                                                        │
│  │ 7. Tech Stack   │                                                        │
│  └─────────────────┘                                                        │
│         │                                                                    │
│         │ Submit                                                             │
│         ↓                                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
         │
         │
         ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AUTHENTICATION LAYER                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  signupCandidate()          loginCandidate()           getCandidateSession()│
│  ┌──────────────┐          ┌──────────────┐           ┌─────────────────┐ │
│  │ Create User  │          │ Sign In      │           │ Get Session     │ │
│  │ in auth.users│          │ with Email/  │           │ & User Data     │ │
│  │              │          │ Password     │           │                 │ │
│  │ Set metadata │          │              │           │ Verify Auth     │ │
│  │ user_type:   │          │ Check email  │           │                 │ │
│  │ 'candidate'  │          │ verified     │           │                 │ │
│  └──────────────┘          │              │           └─────────────────┘ │
│         │                  │ Check status │                    │           │
│         │                  │ approved     │                    │           │
│         ↓                  └──────────────┘                    ↓           │
└─────────────────────────────────────────────────────────────────────────────┘
         │                           │                           │
         │                           │                           │
         ↓                           ↓                           ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATABASE LAYER                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ auth.users (Supabase Auth)                                          │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │ id (uuid)                                                            │  │
│  │ email                                                                │  │
│  │ encrypted_password                                                   │  │
│  │ email_confirmed_at                                                   │  │
│  │ raw_user_meta_data: { user_type: 'candidate', full_name, phone }   │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    │ user_id (FK)                           │
│                                    ↓                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ candidates (Profile Data)                                            │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │ id (uuid, PK)                                                        │  │
│  │ user_id (uuid, FK → auth.users)                                     │  │
│  │ name, email, phone                                                   │  │
│  │ avatar_url, bio, location                                            │  │
│  │ linkedin_url, github_url, portfolio_url                              │  │
│  │ industries[], roles[], skills[], tools[]                             │  │
│  │ resume_url, internet_speed_url, workspace_photo_url                  │  │
│  │ status (pending_approval/approved/rejected)                          │  │
│  │ temperament_score (jsonb)                                            │  │
│  │ onboarding_completed (boolean)                                       │  │
│  │ created_at, updated_at                                               │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    │ candidate_id (FK)                      │
│                                    ↓                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ quiz_results (Assessment Data)                                       │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │ id (uuid, PK)                                                        │  │
│  │ candidate_id (uuid, FK → candidates)                                │  │
│  │ user_id (uuid, FK → auth.users)                                     │  │
│  │ quiz_type (temperament/role_validation/communication/behavioral)    │  │
│  │ raw_score, max_score, percentage                                     │  │
│  │ answers (jsonb)                                                      │  │
│  │ profile_result (jsonb)                                               │  │
│  │ status (completed/in_progress)                                       │  │
│  │ created_at                                                           │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
         │
         │
         ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                             STORAGE LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌─────────────────┐ │
│  │ candidate-avatars    │  │ candidate-files      │  │ audio-responses │ │
│  ├──────────────────────┤  ├──────────────────────┤  ├─────────────────┤ │
│  │ {candidate_id}/      │  │ {candidate_id}/      │  │ {candidate_id}/ │ │
│  │   avatar_xxx.jpg     │  │   resume_xxx.pdf     │  │   q1_xxx.webm   │ │
│  │   avatar_yyy.png     │  │   internet_xxx.png   │  │   q2_xxx.webm   │ │
│  │                      │  │   workspace_xxx.jpg  │  │   q3_xxx.webm   │ │
│  │ Public: Yes          │  │ Public: Yes          │  │ Public: Yes     │ │
│  │ Max Size: 5MB        │  │ Max Size: 10MB       │  │ Max Size: 20MB  │ │
│  └──────────────────────┘  └──────────────────────┘  └─────────────────┘ │
│                                                                             │
│  RLS Policies:                                                              │
│  - Users can upload/read/delete their own files                            │
│  - Public read access for avatars                                           │
│  - Admin read access for all files                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 **Data Flow Diagram**

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         REGISTRATION FLOW                                │
└──────────────────────────────────────────────────────────────────────────┘

User fills form → Submit button clicked
         │
         ↓
┌────────────────────────────────────────┐
│ 1. Create Auth User                    │
│    signupCandidate(email, password)    │
│    ↓                                   │
│    auth.users record created           │
│    email_confirmed_at = null           │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ 2. Get Session                         │
│    getCandidateSession()               │
│    ↓                                   │
│    Returns user.id                     │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ 3. Get Candidate Profile               │
│    SELECT * FROM candidates            │
│    WHERE user_id = session.user.id     │
│    ↓                                   │
│    Returns candidate.id                │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ 4. Upload Files to Storage             │
│    - Resume → candidate-files/         │
│    - Internet Speed → candidate-files/ │
│    - Workspace → candidate-files/      │
│    ↓                                   │
│    Returns public URLs                 │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ 5. Update Candidate Profile            │
│    UPDATE candidates SET               │
│      name, email, phone,               │
│      industries, roles, tools,         │
│      portfolio_links,                  │
│      status = 'pending_approval',      │
│      onboarding_completed = true       │
│    WHERE id = candidate.id             │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ 6. Logout User                         │
│    supabase.auth.signOut()             │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ 7. Redirect to Login                   │
│    navigate('/candidate/login?         │
│             registered=true')          │
└────────────────────────────────────────┘
```

---

## 🔐 **Login Flow Diagram**

```
┌──────────────────────────────────────────────────────────────────────────┐
│                            LOGIN FLOW                                    │
└──────────────────────────────────────────────────────────────────────────┘

User enters email/password → Submit
         │
         ↓
┌────────────────────────────────────────┐
│ 1. Authenticate                        │
│    loginCandidate(email, password)     │
│    ↓                                   │
│    supabase.auth.signInWithPassword()  │
└────────────────────────────────────────┘
         │
         ├─ Error? → Show error message
         │            - "Invalid credentials"
         │            - "Email not confirmed"
         │            - "Account pending approval"
         │
         ↓ Success
┌────────────────────────────────────────┐
│ 2. Check Email Verification            │
│    IF email_confirmed_at IS NULL       │
│    ↓                                   │
│    Show: "Please verify your email"    │
│    STOP                                │
└────────────────────────────────────────┘
         │
         ↓ Email Verified
┌────────────────────────────────────────┐
│ 3. Check Approval Status               │
│    SELECT status FROM candidates       │
│    WHERE user_id = auth.uid()          │
│    ↓                                   │
│    IF status = 'pending_approval'      │
│       Show: "Application under review" │
│       STOP                             │
│    ↓                                   │
│    IF status = 'rejected'              │
│       Show: "Application rejected"     │
│       STOP                             │
└────────────────────────────────────────┘
         │
         ↓ Status = 'approved'
┌────────────────────────────────────────┐
│ 4. Redirect to Dashboard               │
│    navigate('/candidate/dashboard')    │
└────────────────────────────────────────┘
```

---

## 📊 **Dashboard Data Loading Flow**

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      DASHBOARD LOADING FLOW                              │
└──────────────────────────────────────────────────────────────────────────┘

Page loads → useEffect()
         │
         ↓
┌────────────────────────────────────────┐
│ 1. Check Authentication                │
│    getCandidateSession()               │
│    ↓                                   │
│    IF no session → redirect to login   │
└────────────────────────────────────────┘
         │
         ↓ Session exists
┌────────────────────────────────────────┐
│ 2. Load Profile Data                   │
│    getCandidateProfile()               │
│    ↓                                   │
│    SELECT * FROM candidates            │
│    WHERE user_id = auth.uid()          │
│    ↓                                   │
│    Returns full profile object         │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ 3. Display Profile                     │
│    - Avatar (or initials)              │
│    - Name, email, phone                │
│    - Status badge                      │
│    - Bio, location                     │
│    - Social links                      │
│    - Industries, roles, tools          │
│    - Assessment results                │
└────────────────────────────────────────┘
```

---

## 🖼️ **Profile Picture Upload Flow**

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    PROFILE PICTURE UPLOAD FLOW                           │
└──────────────────────────────────────────────────────────────────────────┘

User clicks camera icon → File picker opens
         │
         ↓
User selects image file
         │
         ↓
┌────────────────────────────────────────┐
│ 1. Validate File                       │
│    - Check file type (image/*)         │
│    - Check file size (< 5MB)           │
│    ↓                                   │
│    IF invalid → Show error             │
└────────────────────────────────────────┘
         │
         ↓ Valid
┌────────────────────────────────────────┐
│ 2. Delete Old Avatar (if exists)      │
│    IF profile.avatar_url exists        │
│    ↓                                   │
│    supabase.storage                    │
│      .from('candidate-avatars')        │
│      .remove([old_path])               │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ 3. Upload New Avatar                   │
│    Path: {candidate_id}/avatar_xxx.jpg │
│    ↓                                   │
│    supabase.storage                    │
│      .from('candidate-avatars')        │
│      .upload(filePath, file)           │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ 4. Get Public URL                      │
│    supabase.storage                    │
│      .from('candidate-avatars')        │
│      .getPublicUrl(filePath)           │
│    ↓                                   │
│    Returns: https://...                │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ 5. Update Profile                      │
│    UPDATE candidates                   │
│    SET avatar_url = public_url         │
│    WHERE id = candidate.id             │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ 6. Update UI                           │
│    setProfile({ ...profile,            │
│      avatar_url: public_url })         │
│    ↓                                   │
│    Show success message                │
└────────────────────────────────────────┘
```

---

## 🔒 **Security Architecture**

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         SECURITY LAYERS                                  │
└──────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ LAYER 1: Authentication                │
├────────────────────────────────────────┤
│ ✓ Email + Password required            │
│ ✓ Password min 6 characters            │
│ ✓ Email verification required          │
│ ✓ Session-based auth (JWT)             │
│ ✓ Auto-logout after registration       │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ LAYER 2: Authorization                 │
├────────────────────────────────────────┤
│ ✓ Admin approval required              │
│ ✓ Status check on login                │
│ ✓ Protected routes (auto-redirect)     │
│ ✓ RLS policies on tables               │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ LAYER 3: Data Access Control           │
├────────────────────────────────────────┤
│ ✓ Users can only read/update own data  │
│ ✓ Admins can read all data             │
│ ✓ RLS policies enforce access          │
│ ✓ No direct table access               │
└────────────────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│ LAYER 4: File Access Control           │
├────────────────────────────────────────┤
│ ✓ Users can upload to own folder       │
│ ✓ Users can read own files             │
│ ✓ Public read for avatars              │
│ ✓ File size limits enforced            │
│ ✓ File type validation                 │
└────────────────────────────────────────┘
```

---

## 📈 **Status State Machine**

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      CANDIDATE STATUS FLOW                               │
└──────────────────────────────────────────────────────────────────────────┘

                    ┌─────────────────────┐
                    │  pending_approval   │ ← Initial state
                    │  (Yellow badge)     │
                    └─────────────────────┘
                             │
                             │ Admin reviews
                             │
                ┌────────────┴────────────┐
                │                         │
                ↓                         ↓
      ┌─────────────────┐       ┌─────────────────┐
      │    approved     │       │    rejected     │
      │  (Green badge)  │       │   (Red badge)   │
      └─────────────────┘       └─────────────────┘
                │                         │
                │                         │
                ↓                         ↓
      Can access dashboard       Cannot access dashboard
      Can edit profile           Application closed
      Can view assessments       Contact support
```

---

## 🎯 **Component Hierarchy**

```
App.tsx
 │
 ├─ /apply → CandidateApplicationPage
 │            ├─ Step 1: Account Creation
 │            ├─ Step 2: Personal Info
 │            ├─ Step 3: Experience
 │            ├─ Step 4: Resume Upload
 │            ├─ Step 5: Assessments
 │            │   ├─ TemperamentQuiz (popup)
 │            │   ├─ RoleValidationQuiz (popup)
 │            │   ├─ CommunicationStyleQuiz (popup)
 │            │   └─ BehavioralStressQuiz (popup)
 │            ├─ Step 6: Tech Setup
 │            └─ Step 7: Tech Stack
 │
 ├─ /candidate/login → CandidateLoginPage
 │                      ├─ Success Message (if registered=true)
 │                      ├─ Email/Password Form
 │                      └─ Error Messages
 │
 └─ /candidate/dashboard → CandidateDashboardPage
                            ├─ Header (Logo, Logout)
                            ├─ Left Column (Profile Card)
                            │   ├─ Avatar + Upload Button
                            │   ├─ Name, Email, Status
                            │   ├─ Quick Stats
                            │   └─ Social Links
                            └─ Right Column (Profile Details)
                                ├─ Edit/Save Buttons
                                ├─ About Section
                                ├─ Contact Information
                                ├─ Professional Links
                                ├─ Skills & Experience
                                └─ Assessment Results
```

---

**This diagram provides a complete visual overview of the entire candidate system architecture.**

