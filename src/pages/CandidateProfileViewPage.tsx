import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Briefcase,
  Mail,
  Phone,
  Globe,
  CheckCircle,
  Award
} from 'lucide-react'

const CandidateProfileViewPage = () => {
  const { id } = useParams<{ id: string }>()
  const [candidate, setCandidate] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCandidate()
  }, [id])

  const loadCandidate = async () => {
    if (!supabase || !id) {
      setError('Unable to load candidate profile')
      setLoading(false)
      return
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', id)
        .eq('status', 'active') // Only show active candidates
        .single()

      if (fetchError || !data) {
        setError('Candidate not found')
      } else {
        setCandidate(data)
      }
    } catch (err) {
      console.error('Error loading candidate:', err)
      setError('Failed to load candidate profile')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error || !candidate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Profile Not Found</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-slate-200"
        >
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {candidate.name?.charAt(0)?.toUpperCase() || 'C'}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{candidate.name}</h1>
                  <div className="flex items-center space-x-3 text-slate-600 mb-4">
                    {candidate.timezone && (
                      <div className="flex items-center space-x-1">
                        <Globe className="w-4 h-4" />
                        <span>{candidate.timezone}</span>
                      </div>
                    )}
                    {candidate.experience_years && (
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>{candidate.experience_years} years exp</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-col space-y-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold text-center">
                    {candidate.availability_status || 'Available'}
                  </span>
                  {candidate.status === 'active' && (
                    <div className="flex items-center space-x-1 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Rate & Hours */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {candidate.hourly_rate_usd && (
                  <div className="flex items-center space-x-2 text-slate-700">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-slate-500">Hourly Rate</div>
                      <div className="font-semibold">${candidate.hourly_rate_usd}/hr</div>
                    </div>
                  </div>
                )}
                {(candidate.hours_per_week_min || candidate.hours_per_week_max) && (
                  <div className="flex items-center space-x-2 text-slate-700">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-slate-500">Availability</div>
                      <div className="font-semibold">
                        {candidate.hours_per_week_min || 0}-{candidate.hours_per_week_max || 40} hrs/week
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes/Bio */}
          {candidate.notes && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-slate-700 leading-relaxed">{candidate.notes}</p>
            </div>
          )}
        </motion.div>

        {/* Skills & Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-slate-200"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Skills & Experience</h2>

          {/* Roles */}
          {candidate.roles && candidate.roles.length > 0 && (
            <div className="mb-6">
              <h3 className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                <Briefcase className="w-4 h-4" />
                <span>Roles</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidate.roles.map((role: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Industries */}
          {candidate.industries && candidate.industries.length > 0 && (
            <div className="mb-6">
              <h3 className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                <Briefcase className="w-4 h-4" />
                <span>Industries</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidate.industries.map((industry: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {candidate.skills && candidate.skills.length > 0 && (
            <div>
              <h3 className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
                <Star className="w-4 h-4" />
                <span>Skills</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Portfolio Links */}
        {(candidate.resume_url || candidate.portfolio_url) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-slate-200"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Portfolio</h2>
            <div className="space-y-3">
              {candidate.resume_url && (
                <a
                  href={candidate.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">Resume / CV</div>
                    <div className="text-sm text-slate-500">View full resume</div>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-slate-400 rotate-180" />
                </a>
              )}
              {candidate.portfolio_url && (
                <a
                  href={candidate.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">Portfolio</div>
                    <div className="text-sm text-slate-500">View work samples</div>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-slate-400 rotate-180" />
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-3">Interested in {candidate.name}?</h2>
          <p className="text-blue-100 mb-6">
            Schedule a free strategy call with our team to discuss onboarding and next steps.
          </p>
          <a
            href="/#chat"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Book a Strategy Call
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default CandidateProfileViewPage

