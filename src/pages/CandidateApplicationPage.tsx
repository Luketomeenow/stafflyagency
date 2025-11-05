import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { signupCandidate, getCandidateSession } from '../lib/candidateAuth'
import { supabase } from '../lib/supabase'
import { TemperamentQuiz } from '../components/TemperamentQuiz'
import { RoleValidationQuiz } from '../components/RoleValidationQuiz'
import { CommunicationStyleQuiz } from '../components/CommunicationStyleQuiz'
import { BehavioralStressQuiz } from '../components/BehavioralStressQuiz'

type FormData = {
  // Account Information
  email: string
  password: string
  confirmPassword: string
  
  // Personal Information
  firstName: string
  lastName: string
  city: string
  phone: string
  whatsapp: string
  ageRange: string
  gender: string
  
  // Background & Experience
  industryExperience: string[]
  desiredIndustry: string[]
  desiredRoles: string[]
  
  // Resume & Portfolio
  resume: File | null
  portfolioLinks: string
  
  // Assessments (will be completed)
  temperamentCompleted: boolean
  roleValidationCompleted: boolean
  communicationCompleted: boolean
  behavioralCompleted: boolean
  
  // Technical Setup
  internetSpeed: File | null
  workspacePhoto: File | null
  
  // Tech Stack (will be filled after industries selected)
  techStack: Record<string, 'B' | 'I' | 'A'>
}

const INDUSTRIES = [
  'Real Estate', 'IT / Technology', 'E-commerce', 'Legal', 'Marketing / Advertising',
  'Healthcare', 'Finance / Accounting', 'Hospitality', 'Education', 'Construction'
]

const ROLE_CATEGORIES = {
  'Runner Roles': ['Appointment Setter', 'Customer Support', 'Data Entry', 'Research Assistant'],
  'Admin / Secretary Roles': ['Administrative Assistant', 'Transaction Coordinator', 'Bookkeeper', 'Scheduler'],
  'Executive Assistant Roles': ['Executive Assistant', 'SDR', 'Account Executive', 'Project Manager', 'Operations Analyst', 'Recruiter'],
  'Chief of Staff Roles': ['Chief of Staff', 'Operations Lead', 'Department Coordinator', 'Business Analyst', 'Technical Systems Manager']
}

const AGE_RANGES = ['18-24', '25-34', '35-44', '45-54', '55+']

const TECH_TOOLS_BY_INDUSTRY: Record<string, string[]> = {
  'Real Estate': ['Salesforce', 'Follow Up Boss', 'Dotloop', 'Calendly', 'Canva', 'Google Workspace', 'Zoom', 'DocuSign', 'Slack', 'Trello'],
  'IT / Technology': ['Jira', 'GitHub', 'Slack', 'Confluence', 'AWS', 'Docker', 'Asana', 'Zendesk', 'Notion', 'Linear'],
  'E-commerce': ['Shopify', 'WooCommerce', 'Klaviyo', 'Google Analytics', 'Facebook Ads Manager', 'Canva', 'Asana', 'Zendesk', 'Mailchimp', 'Hootsuite'],
  'Marketing / Advertising': ['HubSpot', 'Google Analytics', 'Facebook Ads Manager', 'Canva', 'Hootsuite', 'Mailchimp', 'SEMrush', 'Ahrefs', 'Asana', 'Slack'],
  'Finance / Accounting': ['QuickBooks', 'Xero', 'Excel', 'SAP', 'NetSuite', 'Bill.com', 'Expensify', 'Gusto', 'ADP', 'Slack']
}

const CandidateApplicationPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    email: '', password: '', confirmPassword: '',
    firstName: '', lastName: '', city: '', phone: '', whatsapp: '', ageRange: '', gender: '',
    industryExperience: [], desiredIndustry: [], desiredRoles: [],
    resume: null, portfolioLinks: '',
    temperamentCompleted: false, roleValidationCompleted: false,
    communicationCompleted: false, behavioralCompleted: false,
    internetSpeed: null, workspacePhoto: null,
    techStack: {}
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTemperamentQuizOpen, setIsTemperamentQuizOpen] = useState(false)
  const [isRoleValidationQuizOpen, setIsRoleValidationQuizOpen] = useState(false)
  const [isCommunicationStyleQuizOpen, setIsCommunicationStyleQuizOpen] = useState(false)
  const [isBehavioralStressQuizOpen, setIsBehavioralStressQuizOpen] = useState(false)

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isStepComplete = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1: // Account Creation
        return !!(formData.email && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && formData.password.length >= 6)
      case 2: // Personal Information
        return !!(formData.firstName && formData.lastName && formData.city && formData.phone && formData.whatsapp && formData.ageRange && formData.gender)
      case 3: // Background & Experience
        return !!(formData.industryExperience.length > 0 && formData.desiredIndustry.length > 0 && formData.desiredRoles.length > 0)
      case 4: // Resume & Portfolio
        return !!formData.resume
      case 5: // Assessments (ALL 4 quizzes required)
        return !!(formData.temperamentCompleted && formData.roleValidationCompleted && formData.communicationCompleted && formData.behavioralCompleted)
      case 6: // Technical Setup
        return !!(formData.internetSpeed && formData.workspacePhoto)
      case 7: // Tech Stack
        return Object.keys(formData.techStack).length > 0
      default:
        return false
    }
  }

  const handleNextStep = () => {
    if (!isStepComplete(step)) {
      setError('Please complete all required fields before proceeding.')
      return
    }
    setError('')
    setStep(step + 1)
  }

  const toggleMultiSelect = (field: 'industryExperience' | 'desiredIndustry' | 'desiredRoles', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }))
  }

  const handleFileUpload = (field: 'resume' | 'internetSpeed' | 'workspacePhoto', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateField(field, e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    console.log('🚀 Starting application submission...')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsSubmitting(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsSubmitting(false)
      return
    }

    try {
      console.log('📝 Creating candidate account...')
      // Create account with email and password
      const result = await signupCandidate(
        formData.email,
        formData.password,
        `${formData.firstName} ${formData.lastName}`,
        formData.phone
      )

      if (result.error) {
        console.error('❌ Signup error:', result.error)
        setError(result.error)
        setIsSubmitting(false)
        return
      }

      console.log('✅ Account created successfully')

      // Get the newly created user
      console.log('🔍 Getting user session...')
      const session = await getCandidateSession()
      if (!session?.user) {
        throw new Error('Failed to get user session')
      }

      console.log('✅ User session retrieved:', session.user.id)

      // Wait for trigger to create candidate profile (with retry logic)
      console.log('🔍 Waiting for candidate profile to be created...')
      let candidateData = null
      let retries = 0
      const maxRetries = 10
      
      while (!candidateData && retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 500)) // Wait 500ms
        
        const { data, error } = await supabase
          ?.from('candidates')
          .select('id')
          .eq('user_id', session.user.id)
          .single()
        
        if (data) {
          candidateData = data
          console.log('✅ Candidate profile found:', candidateData.id)
        } else if (error && error.code !== 'PGRST116') { // PGRST116 = not found
          console.error('❌ Candidate profile error:', error)
          throw new Error(`Failed to get candidate profile: ${error.message}`)
        }
        
        retries++
        if (!candidateData) {
          console.log(`⏳ Retry ${retries}/${maxRetries}...`)
        }
      }

      if (!candidateData) {
        console.error('❌ Candidate profile not created after', maxRetries, 'retries')
        throw new Error('Failed to create candidate profile. Please contact support.')
      }

      // Upload files to storage if they exist
      let resumeUrl = null
      let internetSpeedUrl = null
      let workspacePhotoUrl = null

      if (formData.resume) {
        console.log('📤 Uploading resume...')
        const resumePath = `${candidateData.id}/resume_${Date.now()}.pdf`
        const { error: resumeError } = await supabase
          ?.storage
          .from('candidate-files')
          .upload(resumePath, formData.resume)
        
        if (resumeError) {
          console.error('❌ Resume upload error:', resumeError)
        } else {
          const { data: urlData } = supabase?.storage.from('candidate-files').getPublicUrl(resumePath)
          resumeUrl = urlData?.publicUrl
          console.log('✅ Resume uploaded:', resumeUrl)
        }
      }

      if (formData.internetSpeed) {
        console.log('📤 Uploading internet speed test...')
        const speedPath = `${candidateData.id}/internet_speed_${Date.now()}.png`
        const { error: speedError } = await supabase
          ?.storage
          .from('candidate-files')
          .upload(speedPath, formData.internetSpeed)
        
        if (speedError) {
          console.error('❌ Speed test upload error:', speedError)
        } else {
          const { data: urlData } = supabase?.storage.from('candidate-files').getPublicUrl(speedPath)
          internetSpeedUrl = urlData?.publicUrl
          console.log('✅ Speed test uploaded:', internetSpeedUrl)
        }
      }

      if (formData.workspacePhoto) {
        console.log('📤 Uploading workspace photo...')
        const workspacePath = `${candidateData.id}/workspace_${Date.now()}.png`
        const { error: workspaceError } = await supabase
          ?.storage
          .from('candidate-files')
          .upload(workspacePath, formData.workspacePhoto)
        
        if (workspaceError) {
          console.error('❌ Workspace photo upload error:', workspaceError)
        } else {
          const { data: urlData } = supabase?.storage.from('candidate-files').getPublicUrl(workspacePath)
          workspacePhotoUrl = urlData?.publicUrl
          console.log('✅ Workspace photo uploaded:', workspacePhotoUrl)
        }
      }

      // Prepare comprehensive profile data
      const profileUpdateData: any = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        // Store additional personal data
        industries: formData.industryExperience,
        roles: formData.desiredRoles,
        tools: Object.keys(formData.techStack),
        // Store application metadata
        onboarding_completed: true,
        status: 'pending_approval', // Awaiting admin approval
        updated_at: new Date().toISOString(),
      }

      // Add portfolio links if provided
      if (formData.portfolioLinks && formData.portfolioLinks.trim()) {
        profileUpdateData.portfolio_links = {
          links: formData.portfolioLinks.split('\n').filter(link => link.trim())
        }
      }

      // Add file URLs if uploaded
      if (resumeUrl || internetSpeedUrl || workspacePhotoUrl) {
        profileUpdateData.internal_notes = JSON.stringify({
          resume_url: resumeUrl,
          internet_speed_url: internetSpeedUrl,
          workspace_photo_url: workspacePhotoUrl,
          application_data: {
            city: formData.city,
            whatsapp: formData.whatsapp,
            age_range: formData.ageRange,
            gender: formData.gender,
            desired_industry: formData.desiredIndustry,
            tech_stack: formData.techStack,
            quiz_completed: {
              temperament: formData.temperamentCompleted,
              role_validation: formData.roleValidationCompleted,
              communication: formData.communicationCompleted,
              behavioral: formData.behavioralCompleted,
            }
          }
        })
      }

      // Update candidate profile with all application data
      console.log('💾 Updating candidate profile with data:', profileUpdateData)
      const { data: updatedProfile, error: updateError } = await supabase
        ?.from('candidates')
        .update(profileUpdateData)
        .eq('id', candidateData.id)
        .select()
        .single()

      if (updateError) {
        console.error('❌ Error updating candidate profile:', updateError)
        throw new Error(`Failed to save application data: ${updateError.message}`)
      } else {
        console.log('✅ Profile updated successfully:', updatedProfile)
      }

      // Log out the user so they need to verify email
      console.log('🚪 Logging out user...')
      await supabase?.auth.signOut()
      console.log('✅ User logged out')
      
      // Redirect to login page with success message
      console.log('🎯 Redirecting to login page...')
      
      // Use window.location for guaranteed redirect
      setTimeout(() => {
        window.location.href = '/candidate/login?registered=true'
      }, 500)
      
      console.log('✅ Application submission complete!')
    } catch (err: any) {
      console.error('❌ Application submission error:', err)
      setError(err.message || 'An error occurred during signup')
      setIsSubmitting(false)
    } finally {
      // Don't reset isSubmitting here - let the redirect happen
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Create Your Account</h2>
            <p className="text-slate-600">Set up your account to apply for positions</p>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Email Address *" 
                value={formData.email} 
                onChange={e => updateField('email', e.target.value)} 
                className="input-field" 
                required 
              />
              <input 
                type="password" 
                placeholder="Password (min. 6 characters) *" 
                value={formData.password} 
                onChange={e => updateField('password', e.target.value)} 
                className="input-field" 
                required 
                minLength={6}
              />
              <input 
                type="password" 
                placeholder="Confirm Password *" 
                value={formData.confirmPassword} 
                onChange={e => updateField('confirmPassword', e.target.value)} 
                className="input-field" 
                required 
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm">
              <p className="font-semibold mb-1">Password Requirements:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>At least 6 characters long</li>
                <li>Use a unique password you don't use elsewhere</li>
              </ul>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name *" value={formData.firstName} onChange={e => updateField('firstName', e.target.value)} className="input-field" required />
              <input type="text" placeholder="Last Name *" value={formData.lastName} onChange={e => updateField('lastName', e.target.value)} className="input-field" required />
            </div>
            <input type="text" placeholder="Current City *" value={formData.city} onChange={e => updateField('city', e.target.value)} className="input-field" required />
            <div className="grid md:grid-cols-2 gap-4">
              <input type="tel" placeholder="Mobile Phone *" value={formData.phone} onChange={e => updateField('phone', e.target.value)} className="input-field" required />
              <input type="tel" placeholder="WhatsApp Number *" value={formData.whatsapp} onChange={e => updateField('whatsapp', e.target.value)} className="input-field" required />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <select value={formData.ageRange} onChange={e => updateField('ageRange', e.target.value)} className="input-field" required>
                <option value="">Age Range *</option>
                {AGE_RANGES.map(range => <option key={range} value={range}>{range}</option>)}
              </select>
              <select value={formData.gender} onChange={e => updateField('gender', e.target.value)} className="input-field" required>
                <option value="">Gender *</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Background & Experience</h2>
            <div>
              <label className="block font-semibold text-slate-700 mb-2">Industry Experience (Select all that apply)</label>
              <div className="grid md:grid-cols-3 gap-3">
                {INDUSTRIES.map(industry => (
                  <button key={industry} type="button" onClick={() => toggleMultiSelect('industryExperience', industry)}
                    className={`px-4 py-2 rounded-lg border text-sm ${formData.industryExperience.includes(industry) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'}`}>
                    {industry}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-2">Desired Industry (Industries you want to explore)</label>
              <div className="grid md:grid-cols-3 gap-3">
                {INDUSTRIES.map(industry => (
                  <button key={industry} type="button" onClick={() => toggleMultiSelect('desiredIndustry', industry)}
                    className={`px-4 py-2 rounded-lg border text-sm ${formData.desiredIndustry.includes(industry) ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-700 border-slate-300 hover:border-purple-400'}`}>
                    {industry}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-2">Desired Roles (Select all that apply)</label>
              {Object.entries(ROLE_CATEGORIES).map(([category, roles]) => (
                <div key={category} className="mb-4">
                  <div className="font-medium text-slate-600 mb-2">{category}</div>
                  <div className="grid md:grid-cols-3 gap-2">
                    {roles.map(role => (
                      <button key={role} type="button" onClick={() => toggleMultiSelect('desiredRoles', role)}
                        className={`px-3 py-2 rounded-lg border text-sm ${formData.desiredRoles.includes(role) ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-700 border-slate-300 hover:border-green-400'}`}>
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Resume & Portfolio</h2>
            <div>
              <label className="block font-semibold text-slate-700 mb-2">Upload Resume (PDF required) *</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 bg-slate-50">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm text-slate-600">{formData.resume ? formData.resume.name : 'Click to upload PDF'}</span>
                <input type="file" accept=".pdf" onChange={e => handleFileUpload('resume', e)} className="hidden" />
              </label>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-2">Creative Portfolio Links (Optional)</label>
              <textarea placeholder="Paste links to your Canva, CapCut, Figma, or other portfolio work" value={formData.portfolioLinks} onChange={e => updateField('portfolioLinks', e.target.value)} className="input-field" rows={4} />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Assessments & Quizzes</h2>
            <p className="text-slate-600">
              Please complete <strong>ALL 4 assessments</strong> to help us match you with the right opportunities. 
              All quizzes are required to proceed.
            </p>
            {!isStepComplete(5) && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Required: Complete All 4 Quizzes</p>
                  <p className="text-sm mt-1">You must complete all assessments before moving to the next step.</p>
                </div>
              </div>
            )}
            <div className="space-y-4">
              {/* Temperament Quiz */}
              <div className="border border-slate-200 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">Temperament Quiz</div>
                    <div className="text-sm text-slate-600">Measures your natural work style and preferences.</div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (!formData.temperamentCompleted) {
                        setIsTemperamentQuizOpen(true)
                      }
                    }}
                    disabled={formData.temperamentCompleted}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      formData.temperamentCompleted 
                        ? 'bg-green-600 text-white cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                    }`}
                  >
                    {formData.temperamentCompleted ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Completed</span>
                      </div>
                    ) : (
                      'Start Quiz'
                    )}
                  </button>
                </div>
              </div>

              {/* Role Validation Assessment */}
              <div className="border border-slate-200 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">Role Validation Assessment</div>
                    <div className="text-sm text-slate-600">Audio-based validation of your experience level (4 questions).</div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (!formData.roleValidationCompleted) {
                        setIsRoleValidationQuizOpen(true)
                      }
                    }}
                    disabled={formData.roleValidationCompleted}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      formData.roleValidationCompleted 
                        ? 'bg-green-600 text-white cursor-not-allowed' 
                        : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg'
                    }`}
                  >
                    {formData.roleValidationCompleted ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Completed</span>
                      </div>
                    ) : (
                      'Start Assessment'
                    )}
                  </button>
                </div>
              </div>

              {/* Communication Style Test */}
              <div className="border border-slate-200 rounded-lg p-4 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <div>
                    <div className="font-semibold text-slate-900">Communication Style Test</div>
                    <div className="text-sm text-slate-600">Determines your communication quadrant (10 questions).</div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (!formData.communicationCompleted) {
                        setIsCommunicationStyleQuizOpen(true)
                      }
                    }}
                    disabled={formData.communicationCompleted}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      formData.communicationCompleted 
                        ? 'bg-green-600 text-white cursor-not-allowed' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
                    }`}
                  >
                    {formData.communicationCompleted ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Completed</span>
                    </div>
                    ) : (
                      'Start Test'
                    )}
                    </button>
                </div>
              </div>

              {/* Behavioral Stress Test */}
              <div className="border border-slate-200 rounded-lg p-4 bg-gradient-to-r from-orange-50 to-red-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">Behavioral Stress Test</div>
                    <div className="text-sm text-slate-600">Measures adaptability and people skills (10 questions + audio).</div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (!formData.behavioralCompleted) {
                        setIsBehavioralStressQuizOpen(true)
                      }
                    }}
                    disabled={formData.behavioralCompleted}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      formData.behavioralCompleted 
                        ? 'bg-green-600 text-white cursor-not-allowed' 
                        : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg'
                    }`}
                  >
                    {formData.behavioralCompleted ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Completed</span>
                      </div>
                    ) : (
                      'Start Test'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Technical Setup</h2>
            <div>
              <label className="block font-semibold text-slate-700 mb-2">Internet Speed Test Screenshot *</label>
              <p className="text-sm text-slate-600 mb-2">Visit Speedtest.net, run a test, and upload a screenshot</p>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 bg-slate-50">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm text-slate-600">{formData.internetSpeed ? formData.internetSpeed.name : 'Upload screenshot'}</span>
                <input type="file" accept="image/*" onChange={e => handleFileUpload('internetSpeed', e)} className="hidden" />
              </label>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-2">Remote Workspace Photo *</label>
              <p className="text-sm text-slate-600 mb-2">Upload a photo showing your desk, laptop/desktop, monitors, and headset</p>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 bg-slate-50">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm text-slate-600">{formData.workspacePhoto ? formData.workspacePhoto.name : 'Upload photo'}</span>
                <input type="file" accept="image/*" onChange={e => handleFileUpload('workspacePhoto', e)} className="hidden" />
              </label>
            </div>
          </div>
        )

      case 7:
        const selectedIndustry = formData.industryExperience[0] || formData.desiredIndustry[0]
        const tools = selectedIndustry ? TECH_TOOLS_BY_INDUSTRY[selectedIndustry] || [] : []
        
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Tech Stack Proficiency</h2>
            <p className="text-slate-600">Rate your familiarity with common tools in {selectedIndustry || 'your industry'}</p>
            {tools.length > 0 ? (
              <div className="space-y-3">
                {tools.map(tool => (
                  <div key={tool} className="flex items-center justify-between border border-slate-200 rounded-lg p-4">
                    <span className="font-medium text-slate-900">{tool}</span>
                    <div className="flex gap-2">
                      {(['B', 'I', 'A'] as const).map(level => (
                        <button key={level} type="button"
                          onClick={() => updateField('techStack', { ...formData.techStack, [tool]: level })}
                          className={`px-4 py-2 rounded-lg font-medium text-sm ${formData.techStack[tool] === level ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                          {level === 'B' ? 'Beginner' : level === 'I' ? 'Intermediate' : 'Advanced'}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                Please select an industry in Step 2 to see relevant tools
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-200 max-w-2xl text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Application Submitted!</h1>
          <p className="text-xl text-slate-600 mb-8">Thank you for applying. Our team will review your application and get back to you within 2-3 business days.</p>
          <button onClick={() => window.location.href = '/'} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition">Back to Home</button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Progress (minimal) */}
          <div className="p-6 border-b border-slate-200 bg-white">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300" style={{ width: `${(step / 7) * 100}%` }} />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
              {step > 1 && (
                <button type="button" onClick={() => { setStep(step - 1); setError(''); }} className="px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50">Previous</button>
              )}
              {step < 7 ? (
                <button 
                  type="button" 
                  onClick={handleNextStep} 
                  className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  disabled={!isStepComplete(step)}
                >
                  Next
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={isSubmitting || !isStepComplete(step)} 
                  className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? 'Creating Account...' : 'Submit Application'}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>

      {/* Temperament Quiz Popup */}
      <TemperamentQuiz
        isOpen={isTemperamentQuizOpen}
        onClose={() => setIsTemperamentQuizOpen(false)}
        onComplete={(completed) => {
          if (completed) {
            updateField('temperamentCompleted', true)
          }
          setIsTemperamentQuizOpen(false)
        }}
      />

      {/* Role Validation Quiz Popup */}
      <RoleValidationQuiz
        isOpen={isRoleValidationQuizOpen}
        onClose={() => setIsRoleValidationQuizOpen(false)}
        onComplete={(completed) => {
          if (completed) {
            updateField('roleValidationCompleted', true)
          }
          setIsRoleValidationQuizOpen(false)
        }}
      />

      {/* Communication Style Quiz Popup */}
      <CommunicationStyleQuiz
        isOpen={isCommunicationStyleQuizOpen}
        onClose={() => setIsCommunicationStyleQuizOpen(false)}
        onComplete={(completed) => {
          if (completed) {
            updateField('communicationCompleted', true)
          }
          setIsCommunicationStyleQuizOpen(false)
        }}
      />

      {/* Behavioral Stress Quiz Popup */}
      <BehavioralStressQuiz
        isOpen={isBehavioralStressQuizOpen}
        onClose={() => setIsBehavioralStressQuizOpen(false)}
        onComplete={(completed) => {
          if (completed) {
            updateField('behavioralCompleted', true)
          }
          setIsBehavioralStressQuizOpen(false)
        }}
      />

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid rgb(203 213 225);
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .input-field:focus {
          outline: none;
          border-color: rgb(59 130 246);
          ring: 2px;
          ring-color: rgb(59 130 246 / 0.2);
        }
      `}</style>
    </div>
  )
}

export default CandidateApplicationPage
