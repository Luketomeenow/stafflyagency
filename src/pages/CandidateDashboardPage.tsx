import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCandidateProfile, getCandidateSession, logoutCandidate, updateCandidateProfile } from '../lib/candidateAuth'
import { 
  User, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Globe, 
  Star,
  LogOut,
  Save,
  FileText,
  Link as LinkIcon
} from 'lucide-react'

const CandidateDashboardPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    hourly_rate_usd: '',
    hours_per_week_min: '',
    hours_per_week_max: '',
    timezone: '',
    experience_years: '',
    skills: [] as string[],
    industries: [] as string[],
    roles: [] as string[],
    notes: '',
    resume_url: '',
    portfolio_url: '',
  })

  // Multi-select states
  const [skillInput, setSkillInput] = useState('')
  const [industryInput, setIndustryInput] = useState('')
  const [roleInput, setRoleInput] = useState('')

  useEffect(() => {
    checkAuthAndLoadProfile()
  }, [])

  const checkAuthAndLoadProfile = async () => {
    try {
      const session = await getCandidateSession()
      if (!session) {
        navigate('/candidate/login')
        return
      }

      const profileData = await getCandidateProfile()
      if (!profileData) {
        console.error('No profile found')
        navigate('/candidate/login')
        return
      }

      setProfile(profileData)
      setFormData({
        name: profileData.name || '',
        phone: profileData.phone || '',
        hourly_rate_usd: profileData.hourly_rate_usd?.toString() || '',
        hours_per_week_min: profileData.hours_per_week_min?.toString() || '',
        hours_per_week_max: profileData.hours_per_week_max?.toString() || '',
        timezone: profileData.timezone || '',
        experience_years: profileData.experience_years?.toString() || '',
        skills: profileData.skills || [],
        industries: profileData.industries || [],
        roles: profileData.roles || [],
        notes: profileData.notes || '',
        resume_url: profileData.resume_url || '',
        portfolio_url: profileData.portfolio_url || '',
      })
    } catch (error) {
      console.error('Error loading profile:', error)
      navigate('/candidate/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await logoutCandidate()
    navigate('/candidate/login')
  }

  const handleSave = async () => {
    setSaving(true)
    setSuccessMessage('')

    try {
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        hourly_rate_usd: formData.hourly_rate_usd ? parseFloat(formData.hourly_rate_usd) : null,
        hours_per_week_min: formData.hours_per_week_min ? parseInt(formData.hours_per_week_min) : null,
        hours_per_week_max: formData.hours_per_week_max ? parseInt(formData.hours_per_week_max) : null,
        timezone: formData.timezone,
        experience_years: formData.experience_years ? parseInt(formData.experience_years) : null,
        skills: formData.skills,
        industries: formData.industries,
        roles: formData.roles,
        notes: formData.notes,
        resume_url: formData.resume_url,
        portfolio_url: formData.portfolio_url,
        onboarding_completed: true,
        status: 'active', // Activate profile after first save
        availability_status: 'available',
      }

      const updated = await updateCandidateProfile(updateData)
      setProfile(updated)
      setEditing(false)
      setSuccessMessage('Profile updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error: any) {
      console.error('Error updating profile:', error)
      alert(error.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] })
      setSkillInput('')
    }
  }

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) })
  }

  const addIndustry = () => {
    if (industryInput.trim() && !formData.industries.includes(industryInput.trim())) {
      setFormData({ ...formData, industries: [...formData.industries, industryInput.trim()] })
      setIndustryInput('')
    }
  }

  const removeIndustry = (industry: string) => {
    setFormData({ ...formData, industries: formData.industries.filter(i => i !== industry) })
  }

  const addRole = () => {
    if (roleInput.trim() && !formData.roles.includes(roleInput.trim())) {
      setFormData({ ...formData, roles: [...formData.roles, roleInput.trim()] })
      setRoleInput('')
    }
  }

  const removeRole = (role: string) => {
    setFormData({ ...formData, roles: formData.roles.filter(r => r !== role) })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{profile?.name || 'Candidate'}</h1>
                <p className="text-slate-600">{profile?.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    profile?.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {profile?.status || 'inactive'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    profile?.availability_status === 'available' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {profile?.availability_status || 'unavailable'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-green-700"
          >
            {successMessage}
          </motion.div>
        )}

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Your Profile</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-semibold"
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                <User className="w-4 h-4" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-600"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                <User className="w-4 h-4" />
                <span>Phone</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-600"
                placeholder="+1 234 567 8900"
              />
            </div>

            {/* Rate & Hours */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                <DollarSign className="w-4 h-4" />
                <span>Hourly Rate (USD)</span>
              </label>
              <input
                type="number"
                value={formData.hourly_rate_usd}
                onChange={(e) => setFormData({ ...formData, hourly_rate_usd: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-600"
                placeholder="25.00"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                <Clock className="w-4 h-4" />
                <span>Hours Per Week (Min - Max)</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={formData.hours_per_week_min}
                  onChange={(e) => setFormData({ ...formData, hours_per_week_min: e.target.value })}
                  disabled={!editing}
                  className="w-1/2 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-600"
                  placeholder="20"
                />
                <input
                  type="number"
                  value={formData.hours_per_week_max}
                  onChange={(e) => setFormData({ ...formData, hours_per_week_max: e.target.value })}
                  disabled={!editing}
                  className="w-1/2 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-600"
                  placeholder="40"
                />
              </div>
            </div>

            {/* Timezone & Experience */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                <Globe className="w-4 h-4" />
                <span>Timezone</span>
              </label>
              <input
                type="text"
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-600"
                placeholder="PST, EST, GMT+8"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                <Star className="w-4 h-4" />
                <span>Years of Experience</span>
              </label>
              <input
                type="number"
                value={formData.experience_years}
                onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-600"
                placeholder="3"
              />
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Skills</span>
              </label>
              {editing && (
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a skill and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center space-x-2"
                  >
                    <span>{skill}</span>
                    {editing && (
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-blue-900 hover:text-red-600"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
                {formData.skills.length === 0 && (
                  <p className="text-slate-500 text-sm">No skills added yet</p>
                )}
              </div>
            </div>

            {/* Industries */}
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Industries</span>
              </label>
              {editing && (
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={industryInput}
                    onChange={(e) => setIndustryInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIndustry())}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type an industry and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addIndustry}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {formData.industries.map((industry, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center space-x-2"
                  >
                    <span>{industry}</span>
                    {editing && (
                      <button
                        type="button"
                        onClick={() => removeIndustry(industry)}
                        className="text-purple-900 hover:text-red-600"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
                {formData.industries.length === 0 && (
                  <p className="text-slate-500 text-sm">No industries added yet</p>
                )}
              </div>
            </div>

            {/* Roles */}
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Roles</span>
              </label>
              {editing && (
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRole())}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a role and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addRole}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {formData.roles.map((role, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center space-x-2"
                  >
                    <span>{role}</span>
                    {editing && (
                      <button
                        type="button"
                        onClick={() => removeRole(role)}
                        className="text-green-900 hover:text-red-600"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
                {formData.roles.length === 0 && (
                  <p className="text-slate-500 text-sm">No roles added yet</p>
                )}
              </div>
            </div>

            {/* Resume & Portfolio */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                <FileText className="w-4 h-4" />
                <span>Resume URL</span>
              </label>
              <input
                type="url"
                value={formData.resume_url}
                onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-600"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                <LinkIcon className="w-4 h-4" />
                <span>Portfolio URL</span>
              </label>
              <input
                type="url"
                value={formData.portfolio_url}
                onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-600"
                placeholder="https://..."
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                <FileText className="w-4 h-4" />
                <span>Additional Notes</span>
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                disabled={!editing}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-600"
                placeholder="Tell us more about your experience, preferences, etc."
              />
            </div>
          </div>

          {/* Save Button */}
          {editing && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                <span>{saving ? 'Saving...' : 'Save Profile'}</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default CandidateDashboardPage

