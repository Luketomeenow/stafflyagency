import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Mail, Phone, MapPin, Briefcase, Award, Link as LinkIcon, 
  Upload, Camera, Edit2, Save, X, Loader2, LogOut, FileText,
  TrendingUp, CheckCircle, Clock, AlertCircle, Globe, Linkedin, Github
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getCandidateSession, getCandidateProfile, updateCandidateProfile, logoutCandidate } from '../lib/candidateAuth'
import { supabase } from '../lib/supabase'

type CandidateProfile = {
  id: string
  user_id: string
  name: string
  email: string
  phone: string
  avatar_url?: string
  bio?: string
  location?: string
  linkedin_url?: string
  github_url?: string
  portfolio_url?: string
  industries?: string[]
  roles?: string[]
  skills?: string[]
  tools?: string[]
  status?: string
  temperament_score?: any
  onboarding_completed?: boolean
  created_at?: string
}

export default function CandidateDashboardPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [profile, setProfile] = useState<CandidateProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  // Editable fields
  const [editedProfile, setEditedProfile] = useState<Partial<CandidateProfile>>({})

  useEffect(() => {
    checkAuthAndLoadProfile()
  }, [])

  const checkAuthAndLoadProfile = async () => {
    try {
      const session = await getCandidateSession()
      
      if (!session?.user) {
        navigate('/candidate/login')
        return
      }

      const profileData = await getCandidateProfile()
      
      if (!profileData) {
        setError('Profile not found')
        setIsLoading(false)
        return
      }

      setProfile(profileData)
      setEditedProfile(profileData)
      setIsLoading(false)
    } catch (err: any) {
      console.error('Error loading profile:', err)
      setError(err.message)
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !profile) return

    const file = e.target.files[0]
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setIsUploadingImage(true)
    setError(null)

    try {
      // Delete old avatar if exists
      if (profile.avatar_url) {
        const oldPath = profile.avatar_url.split('/').pop()
        if (oldPath) {
          await supabase?.storage.from('candidate-avatars').remove([`${profile.id}/${oldPath}`])
        }
      }

      // Upload new avatar
      const fileExt = file.name.split('.').pop()
      const fileName = `avatar_${Date.now()}.${fileExt}`
      const filePath = `${profile.id}/${fileName}`

      const { error: uploadError } = await supabase
        ?.storage
        .from('candidate-avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase
        ?.storage
        .from('candidate-avatars')
        .getPublicUrl(filePath)

      if (!urlData?.publicUrl) throw new Error('Failed to get image URL')

      // Update profile
      await updateCandidateProfile({ avatar_url: urlData.publicUrl })

      setProfile(prev => prev ? { ...prev, avatar_url: urlData.publicUrl } : null)
      setSuccessMessage('Profile picture updated successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err: any) {
      console.error('Error uploading image:', err)
      setError(err.message || 'Failed to upload image')
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    setError(null)

    try {
      const updatedProfile = await updateCandidateProfile(editedProfile)
      setProfile(updatedProfile)
      setIsEditing(false)
      setSuccessMessage('Profile updated successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err: any) {
      console.error('Error updating profile:', err)
      setError(err.message || 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logoutCandidate()
      navigate('/candidate/login')
    } catch (err: any) {
      console.error('Error logging out:', err)
    }
  }

  const updateEditedField = (field: keyof CandidateProfile, value: any) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }))
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'approved':
        return (
          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
            <CheckCircle className="w-4 h-4 mr-1" />
            Approved
          </div>
        )
      case 'pending_approval':
        return (
          <div className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4 mr-1" />
            Pending Approval
          </div>
        )
      case 'rejected':
        return (
          <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
            <AlertCircle className="w-4 h-4 mr-1" />
            Rejected
          </div>
        )
      default:
        return (
          <div className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4 mr-1" />
            In Review
          </div>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile Not Found</h2>
          <p className="text-slate-600 mb-4">{error || 'Unable to load your profile'}</p>
          <button
            onClick={() => navigate('/candidate/login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/staffly-logo.svg" alt="Staffly" className="h-10" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-slate-900">Candidate Dashboard</h1>
                <p className="text-sm text-slate-600">Manage your profile and applications</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {successMessage}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-24"
            >
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg">
                      <span className="text-4xl font-bold text-white">
                        {profile.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {/* Upload Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 shadow-lg transition-colors disabled:opacity-50"
                  >
                    {isUploadingImage ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Camera className="w-5 h-5" />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Name & Status */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{profile.name}</h2>
                <p className="text-slate-600 mb-3">{profile.email}</p>
                {getStatusBadge(profile.status)}
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 pt-6 border-t border-slate-200">
                {profile.phone && (
                  <div className="flex items-center text-sm text-slate-700">
                    <Phone className="w-4 h-4 mr-2 text-slate-400" />
                    {profile.phone}
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center text-sm text-slate-700">
                    <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                    {profile.location}
                  </div>
                )}
                {profile.industries && profile.industries.length > 0 && (
                  <div className="flex items-start text-sm text-slate-700">
                    <Briefcase className="w-4 h-4 mr-2 text-slate-400 mt-0.5" />
                    <div className="flex-1">
                      {profile.industries.join(', ')}
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {(profile.linkedin_url || profile.github_url || profile.portfolio_url) && (
                <div className="pt-6 border-t border-slate-200 mt-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Connect</h3>
                  <div className="space-y-2">
                    {profile.linkedin_url && (
                      <a
                        href={profile.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    )}
                    {profile.github_url && (
                      <a
                        href={profile.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-slate-700 hover:text-slate-900"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    )}
                    {profile.portfolio_url && (
                      <a
                        href={profile.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-purple-600 hover:text-purple-700"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit/Save Buttons */}
            <div className="flex justify-end space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setEditedProfile(profile)
                      setError(null)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </>
              )}
            </div>

            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                About
              </h3>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio || ''}
                  onChange={(e) => updateEditedField('bio', e.target.value)}
                  placeholder="Tell us about yourself, your experience, and what you're looking for..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                />
              ) : (
                <p className="text-slate-700 leading-relaxed">
                  {profile.bio || 'No bio added yet. Click "Edit Profile" to add one.'}
                </p>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-600" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email || ''}
                      onChange={(e) => updateEditedField('email', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-slate-900">{profile.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone || ''}
                      onChange={(e) => updateEditedField('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-slate-900">{profile.phone || 'Not provided'}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.location || ''}
                      onChange={(e) => updateEditedField('location', e.target.value)}
                      placeholder="City, Country"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-slate-900">{profile.location || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Professional Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <LinkIcon className="w-5 h-5 mr-2 text-blue-600" />
                Professional Links
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn Profile</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editedProfile.linkedin_url || ''}
                      onChange={(e) => updateEditedField('linkedin_url', e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-slate-900">{profile.linkedin_url || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">GitHub Profile</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editedProfile.github_url || ''}
                      onChange={(e) => updateEditedField('github_url', e.target.value)}
                      placeholder="https://github.com/yourusername"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-slate-900">{profile.github_url || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Portfolio Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editedProfile.portfolio_url || ''}
                      onChange={(e) => updateEditedField('portfolio_url', e.target.value)}
                      placeholder="https://yourportfolio.com"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-slate-900">{profile.portfolio_url || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Skills & Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Skills & Experience
              </h3>
              <div className="space-y-4">
                {profile.industries && profile.industries.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Industries</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.industries.map((industry, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {profile.roles && profile.roles.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Desired Roles</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.roles.map((role, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {profile.tools && profile.tools.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Tools & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Assessment Results */}
            {profile.temperament_score && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Assessment Results
                </h3>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                  <p className="text-sm text-slate-600 mb-2">Temperament Profile</p>
                  <p className="text-lg font-bold text-slate-900">
                    {profile.temperament_score?.type || 'Completed'}
                  </p>
                  {profile.temperament_score?.score && (
                    <p className="text-sm text-slate-600 mt-1">
                      Score: {profile.temperament_score.score}/30
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
