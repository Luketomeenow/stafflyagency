import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { 
  Users, 
  MessageSquare, 
  UserCheck, 
  TrendingUp, 
  Calendar,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  BarChart3,
  Filter,
  Download,
  Eye,
  Search
} from 'lucide-react'

type Conversation = {
  id: string
  session_id: string | null
  metadata: any
  created_at?: string
  lead_name?: string | null
  lead_email?: string | null
  lead_phone?: string | null
  service?: string | null
  industry?: string | null
  goal?: string | null
  company?: string | null
  team_size?: string | null
  revenue_range?: string | null
  role_or_scope?: string | null
  hours_per_week?: string | null
  timezone?: string | null
  tools_stack?: string | null
  tech_stack?: string | null
  api_access?: string | null
  timeline?: string | null
}

type Message = {
  id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  created_at?: string
}

type Lead = {
  email: string
  name: string | null
  phone: string | null
  conversation_id: string | null
  created_at: string
}

type Candidate = {
  id: string
  user_id: string
  email: string
  name: string
  phone: string | null
  city: string | null
  whatsapp: string | null
  age_range: string | null
  gender: string | null
  industry_experience: string[] | null
  desired_industry: string[] | null
  desired_roles: string[] | null
  resume_url: string | null
  internet_speed_url: string | null
  workspace_photo_url: string | null
  tech_stack: any
  status: string
  temperament_score: any
  created_at: string
  updated_at: string
}

type QuizResult = {
  id: string
  candidate_id: string
  user_id: string
  quiz_type: 'temperament' | 'role_validation' | 'communication' | 'behavioral'
  raw_score: number
  max_score: number
  percentage: number
  profile_result: any
  status: string
  created_at: string
}

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'candidates'>('overview')
  
  // Leads data
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [messagesCount, setMessagesCount] = useState<number>(0)
  
  // Candidates data
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [showCandidateModal, setShowCandidateModal] = useState(false)
  const [leadDetail, setLeadDetail] = useState<Lead | null>(null)
  const [candidateDetail, setCandidateDetail] = useState<Candidate | null>(null)
  const [candidateQuizzes, setCandidateQuizzes] = useState<QuizResult[]>([])
  const [leadConversation, setLeadConversation] = useState<Conversation | null>(null)
  const [leadMessages, setLeadMessages] = useState<Message[]>([])
  
  // Filters
  const [leadSearch, setLeadSearch] = useState('')
  const [candidateSearch, setCandidateSearch] = useState('')
  const [conversationSearch, setConversationSearch] = useState('')
  const [serviceFilter, setServiceFilter] = useState<string>('all')
  const [industryFilter, setIndustryFilter] = useState<string>('all')
  const [timelineFilter, setTimelineFilter] = useState<string>('all')
  const [candidateStatusFilter, setCandidateStatusFilter] = useState<string>('all')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const authed = localStorage.getItem('adminAuthed') === 'true'
    if (!authed) {
      navigate('/admin/login')
    }
  }, [navigate])

  // Function to load all data
  const loadData = async (showLoadingState = true) => {
    try {
      if (showLoadingState) {
        setIsRefreshing(true)
      }
      setLoadError(null)
      if (!supabase) {
        console.log('Supabase client not initialized')
        setLoadError('Database connection not available')
        return
      }
      
      // Load leads data
      const { data: convs, error: convsError } = await supabase.from('conversations').select('*').order('created_at', { ascending: false })
      if (convsError) {
        console.error('Error loading conversations:', convsError)
        setLoadError(`Error loading conversations: ${convsError.message}`)
      }
      
      const { data: leadsData, error: leadsError } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
      if (leadsError) {
        console.error('Error loading leads:', leadsError)
        setLoadError(`Error loading leads: ${leadsError.message}`)
      }
      
      const { count, error: countError } = await supabase.from('conversation_messages').select('*', { count: 'exact', head: true })
      if (countError) {
        console.error('Error loading message count:', countError)
      }
      
      // Load candidates data
      const { data: candidatesData, error: candidatesError } = await supabase.from('candidates').select('*').order('created_at', { ascending: false })
      if (candidatesError) {
        console.error('Error loading candidates:', candidatesError)
        setLoadError(`Error loading candidates: ${candidatesError.message}`)
      }
      
      const { data: quizData, error: quizError } = await supabase.from('quiz_results').select('*').order('created_at', { ascending: false })
      if (quizError) {
        console.error('Error loading quiz results:', quizError)
      }
      
      console.log('Loaded data:', {
        conversations: convs?.length || 0,
        leads: leadsData?.length || 0,
        messages: count || 0,
        candidates: candidatesData?.length || 0,
        quizzes: quizData?.length || 0
      })
      
      setConversations(convs || [])
      setLeads(leadsData || [])
      setMessagesCount(count || 0)
      setCandidates(candidatesData || [])
      setQuizResults(quizData || [])
    } catch (err) {
      console.error('Error loading admin data:', err)
      setLoadError(err instanceof Error ? err.message : 'Unknown error loading data')
    } finally {
      if (showLoadingState) {
        setIsRefreshing(false)
      }
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadData()
  }, [])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadData(false) // Silent refresh without loading indicator
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Manual refresh handler
  const handleRefresh = () => {
    loadData(true)
  }

  // Analytics calculations
  const analytics = useMemo(() => {
    const uniqueUsers = new Set((conversations || []).map(c => c.session_id || c.id)).size
    
    // Candidate analytics
    const totalCandidates = candidates.length
    const pendingCandidates = candidates.filter(c => c.status === 'pending_approval').length
    const approvedCandidates = candidates.filter(c => c.status === 'approved').length
    const rejectedCandidates = candidates.filter(c => c.status === 'rejected').length
    
    // Quiz completion analytics
    const temperamentCompleted = quizResults.filter(q => q.quiz_type === 'temperament').length
    const roleValidationCompleted = quizResults.filter(q => q.quiz_type === 'role_validation').length
    const communicationCompleted = quizResults.filter(q => q.quiz_type === 'communication').length
    const behavioralCompleted = quizResults.filter(q => q.quiz_type === 'behavioral').length
    
    // Industry breakdown
    const industryBreakdown: Record<string, number> = {}
    candidates.forEach(c => {
      if (c.desired_industry && Array.isArray(c.desired_industry)) {
        c.desired_industry.forEach(ind => {
          industryBreakdown[ind] = (industryBreakdown[ind] || 0) + 1
        })
      }
    })
    
    // Roles breakdown
    const rolesBreakdown: Record<string, number> = {}
    candidates.forEach(c => {
      if (c.desired_roles && Array.isArray(c.desired_roles)) {
        c.desired_roles.forEach(role => {
          rolesBreakdown[role] = (rolesBreakdown[role] || 0) + 1
        })
      }
    })
    
    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentCandidates = candidates.filter(c => new Date(c.created_at) > sevenDaysAgo).length
    
    // New candidates in the last hour
    const oneHourAgo = new Date()
    oneHourAgo.setHours(oneHourAgo.getHours() - 1)
    const newCandidatesLastHour = candidates.filter(c => new Date(c.created_at) > oneHourAgo).length
    const recentLeads = leads.filter(l => new Date(l.created_at) > sevenDaysAgo).length
    
    return {
      // Leads
      totalConversations: conversations.length,
      totalMessages: messagesCount,
      totalLeads: leads.length,
      uniqueUsers,
      recentLeads,
      
      // Candidates
      totalCandidates,
      pendingCandidates,
      approvedCandidates,
      rejectedCandidates,
      recentCandidates,
      newCandidatesLastHour,
      
      // Quizzes
      temperamentCompleted,
      roleValidationCompleted,
      communicationCompleted,
      behavioralCompleted,
      totalQuizzes: quizResults.length,
      
      // Breakdowns
      industryBreakdown,
      rolesBreakdown
    }
  }, [conversations, leads, messagesCount, candidates, quizResults])

  const filteredLeads = useMemo(() => {
    if (!leadSearch.trim()) return leads
    const term = leadSearch.toLowerCase()
    return leads.filter(l =>
      (l.name || '').toLowerCase().includes(term) ||
      (l.email || '').toLowerCase().includes(term) ||
      (l.phone || '').toLowerCase().includes(term)
    )
  }, [leads, leadSearch])

  const filteredCandidates = useMemo(() => {
    let filtered = candidates
    
    // Apply search filter
    if (candidateSearch.trim()) {
      const term = candidateSearch.toLowerCase()
      filtered = filtered.filter(c =>
        (c.name || '').toLowerCase().includes(term) ||
        (c.email || '').toLowerCase().includes(term) ||
        (c.phone || '').toLowerCase().includes(term) ||
        (c.city || '').toLowerCase().includes(term)
      )
    }
    
    // Apply status filter
    if (candidateStatusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === candidateStatusFilter)
    }
    
    return filtered
  }, [candidates, candidateSearch, candidateStatusFilter])

  const filteredConversations = useMemo(() => {
    let filtered = conversations
    
    if (conversationSearch.trim()) {
      const term = conversationSearch.toLowerCase()
      filtered = filtered.filter(c =>
        (c.lead_name || '').toLowerCase().includes(term) ||
        (c.lead_email || '').toLowerCase().includes(term) ||
        (c.lead_phone || '').toLowerCase().includes(term) ||
        (c.id || '').toLowerCase().includes(term)
      )
    }
    
    if (serviceFilter !== 'all') {
      filtered = filtered.filter(c => (c.service || '').toLowerCase().includes(serviceFilter.toLowerCase()))
    }
    
    if (industryFilter !== 'all') {
      filtered = filtered.filter(c => (c.industry || '').toLowerCase().includes(industryFilter.toLowerCase()))
    }
    
    if (timelineFilter !== 'all') {
      filtered = filtered.filter(c => (c.timeline || '').toLowerCase().includes(timelineFilter.toLowerCase()))
    }
    
    return filtered
  }, [conversations, conversationSearch, serviceFilter, industryFilter, timelineFilter])

  const openLead = async (lead: Lead) => {
    setLeadDetail(lead)
    setLeadMessages([])
    setLeadConversation(null)
    setShowLeadModal(true)
    if (lead.conversation_id && supabase) {
      const { data: conv } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', lead.conversation_id)
        .single()
      if (conv) setLeadConversation(conv as Conversation)
      
      const { data: msgs } = await supabase
        .from('conversation_messages')
        .select('*')
        .eq('conversation_id', lead.conversation_id)
        .order('created_at', { ascending: true })
        .limit(200)
      setLeadMessages((msgs || []) as Message[])
    }
  }

  const openCandidate = async (candidate: Candidate) => {
    setCandidateDetail(candidate)
    setCandidateQuizzes([])
    setShowCandidateModal(true)
    if (supabase) {
      const { data: quizzes } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('candidate_id', candidate.id)
        .order('created_at', { ascending: false })
      setCandidateQuizzes((quizzes || []) as QuizResult[])
    }
  }

  const updateCandidateStatus = async (candidateId: string, newStatus: string) => {
    if (!supabase) return
    const { error } = await supabase
      .from('candidates')
      .update({ status: newStatus })
      .eq('id', candidateId)
    
    if (!error) {
      // Refresh candidates
      const { data: candidatesData } = await supabase.from('candidates').select('*').order('created_at', { ascending: false })
      setCandidates(candidatesData || [])
      if (candidateDetail?.id === candidateId) {
        setCandidateDetail({ ...candidateDetail, status: newStatus })
      }
    }
  }

  const exportToCSV = (type: 'leads' | 'candidates') => {
    let csvContent = ''
    let filename = ''
    
    if (type === 'leads') {
      csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += 'Name,Email,Phone,Created At\n'
      leads.forEach(lead => {
        csvContent += `"${lead.name || ''}","${lead.email}","${lead.phone || ''}","${lead.created_at}"\n`
      })
      filename = `leads_export_${new Date().toISOString().split('T')[0]}.csv`
    } else {
      csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += 'Name,Email,Phone,City,Status,Desired Roles,Created At\n'
      candidates.forEach(candidate => {
        const roles = Array.isArray(candidate.desired_roles) ? candidate.desired_roles.join('; ') : ''
        csvContent += `"${candidate.name}","${candidate.email}","${candidate.phone || ''}","${candidate.city || ''}","${candidate.status}","${roles}","${candidate.created_at}"\n`
      })
      filename = `candidates_export_${new Date().toISOString().split('T')[0]}.csv`
    }
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending_approval: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800'
    }
  return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-slate-100 text-slate-800'}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
        {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
            <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-500 mt-1">Manage leads and candidate applications • Auto-refreshes every 30s</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition flex items-center space-x-2 ${
                  isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <svg 
                  className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
          <button
            onClick={() => {
              localStorage.removeItem('adminAuthed')
              navigate('/admin/login')
            }}
            className="px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 rounded-lg transition"
          >
            Logout
          </button>
            </div>
        </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-4 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'leads'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4" />
                <span>Leads ({analytics.totalLeads})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                activeTab === 'candidates'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Candidates ({analytics.totalCandidates})</span>
                {analytics.newCandidatesLastHour > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-green-500 text-white rounded-full animate-pulse">
                    +{analytics.newCandidatesLastHour} New
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading dashboard data...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {loadError && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-900 font-semibold mb-1">Error Loading Data</h3>
                <p className="text-red-700 text-sm">{loadError}</p>
                <p className="text-red-600 text-xs mt-2">Check the browser console for more details.</p>
              </div>
            </div>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {!loading && activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-slate-500">Total Candidates</div>
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{analytics.totalCandidates}</div>
                  <div className="text-xs text-green-600 mt-2">+{analytics.recentCandidates} this week</div>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-slate-500">Pending Review</div>
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{analytics.pendingCandidates}</div>
                  <div className="text-xs text-slate-500 mt-2">Awaiting approval</div>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-slate-500">Total Leads</div>
                    <UserCheck className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{analytics.totalLeads}</div>
                  <div className="text-xs text-green-600 mt-2">+{analytics.recentLeads} this week</div>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-slate-500">Quiz Completions</div>
                    <FileText className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{analytics.totalQuizzes}</div>
                  <div className="text-xs text-slate-500 mt-2">All assessments</div>
                </div>
              </div>
            </div>

            {/* Candidate Status Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Candidate Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-slate-900">Pending Approval</span>
                    </div>
                    <span className="text-2xl font-bold text-yellow-600">{analytics.pendingCandidates}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-slate-900">Approved</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{analytics.approvedCandidates}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-slate-900">Rejected</span>
                    </div>
                    <span className="text-2xl font-bold text-red-600">{analytics.rejectedCandidates}</span>
                  </div>
                </div>
              </div>

              {/* Quiz Completion Stats */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Assessment Completions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Temperament Quiz</span>
                    <span className="font-bold text-slate-900">{analytics.temperamentCompleted}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(analytics.temperamentCompleted / analytics.totalCandidates) * 100}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-slate-600">Role Validation</span>
                    <span className="font-bold text-slate-900">{analytics.roleValidationCompleted}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${(analytics.roleValidationCompleted / analytics.totalCandidates) * 100}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-slate-600">Communication Style</span>
                    <span className="font-bold text-slate-900">{analytics.communicationCompleted}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(analytics.communicationCompleted / analytics.totalCandidates) * 100}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-slate-600">Behavioral Stress</span>
                    <span className="font-bold text-slate-900">{analytics.behavioralCompleted}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full" 
                      style={{ width: `${(analytics.behavioralCompleted / analytics.totalCandidates) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Industries & Roles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Industries</h3>
                <div className="space-y-2">
                  {Object.entries(analytics.industryBreakdown)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([industry, count]) => (
                      <div key={industry} className="flex items-center justify-between py-2 border-b border-slate-100">
                        <span className="text-sm text-slate-700">{industry}</span>
                        <span className="font-semibold text-slate-900">{count}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Roles</h3>
                <div className="space-y-2">
                  {Object.entries(analytics.rolesBreakdown)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([role, count]) => (
                      <div key={role} className="flex items-center justify-between py-2 border-b border-slate-100">
                        <span className="text-sm text-slate-700">{role}</span>
                        <span className="font-semibold text-slate-900">{count}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LEADS TAB */}
        {!loading && activeTab === 'leads' && (
          <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </div>
                <button
                  onClick={() => exportToCSV('leads')}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Search</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search leads..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Service Type</label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Services</option>
                <option value="operator">Operators</option>
                <option value="website">Websites</option>
                <option value="web app">Web Apps</option>
                <option value="ai">AI / Automation</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Industry</label>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Industries</option>
                <option value="real estate">Real Estate</option>
                <option value="agency">Agency / Marketing</option>
                <option value="coaching">Coaching / Consulting</option>
                <option value="e-commerce">E-commerce</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Timeline</label>
              <select
                value={timelineFilter}
                onChange={(e) => setTimelineFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Timelines</option>
                <option value="now">Now / Immediately</option>
                <option value="2-4 weeks">2-4 Weeks</option>
                <option value="later">Later</option>
              </select>
            </div>
          </div>
        </div>

            {/* Leads Table */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-semibold text-slate-900 mb-4">All Leads ({filteredLeads.length})</h2>
              <div className="overflow-x-auto">
              <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                  <tr className="text-left text-slate-600 border-b border-slate-200">
                      <th className="py-3 px-4 font-semibold">Name</th>
                      <th className="py-3 px-4 font-semibold">Email</th>
                      <th className="py-3 px-4 font-semibold">Phone</th>
                      <th className="py-3 px-4 font-semibold">Created</th>
                      <th className="py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map(l => (
                    <tr
                      key={l.email}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="py-3 px-4">{l.name || '-'}</td>
                        <td className="py-3 px-4">{l.email}</td>
                        <td className="py-3 px-4">{l.phone || '-'}</td>
                        <td className="py-3 px-4">{new Date(l.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <button
                      onClick={() => openLead(l)}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredLeads.length === 0 && (
                  <div className="text-center py-12 text-slate-500">No leads found</div>
              )}
            </div>
          </div>
          </div>
        )}

        {/* CANDIDATES TAB */}
        {!loading && activeTab === 'candidates' && (
          <div className="space-y-6">
            {/* Filters */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </div>
                <button
                  onClick={() => exportToCSV('candidates')}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Search</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                      placeholder="Search candidates..."
                      value={candidateSearch}
                      onChange={(e) => setCandidateSearch(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Status</label>
                  <select
                    value={candidateStatusFilter}
                    onChange={(e) => setCandidateStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending_approval">Pending Approval</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="active">Active</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Candidates Table */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-semibold text-slate-900 mb-4">All Candidates ({filteredCandidates.length})</h2>
              <div className="overflow-x-auto">
              <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                  <tr className="text-left text-slate-600 border-b border-slate-200">
                      <th className="py-3 px-4 font-semibold">Name</th>
                      <th className="py-3 px-4 font-semibold">Email</th>
                      <th className="py-3 px-4 font-semibold">Phone</th>
                      <th className="py-3 px-4 font-semibold">City</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold">Created</th>
                      <th className="py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {filteredCandidates.map(c => (
                      <tr
                        key={c.id}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="py-3 px-4 font-medium">{c.name}</td>
                        <td className="py-3 px-4">{c.email}</td>
                        <td className="py-3 px-4">{c.phone || '-'}</td>
                        <td className="py-3 px-4">{c.city || '-'}</td>
                        <td className="py-3 px-4">{getStatusBadge(c.status)}</td>
                        <td className="py-3 px-4">{new Date(c.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => openCandidate(c)}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                {filteredCandidates.length === 0 && (
                  <div className="text-center py-12 text-slate-500">No candidates found</div>
              )}
            </div>
          </div>
        </div>
        )}

        {loading && <div className="text-center py-12 text-slate-500">Loading…</div>}

        {/* Lead Detail Modal */}
        {showLeadModal && leadDetail && (
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="font-semibold text-slate-900">Lead Details</div>
                <button 
                  className="text-slate-500 hover:text-slate-700 font-medium" 
                  onClick={() => setShowLeadModal(false)}
                >
                  Close
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-3">
                  <div>
                    <div className="text-xs text-slate-500">Name</div>
                    <div className="font-medium text-slate-900">{leadDetail.name || '-'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Email</div>
                    <div className="font-medium text-slate-900">{leadDetail.email}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Phone</div>
                    <div className="font-medium text-slate-900">{leadDetail.phone || '-'}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-slate-500">Conversation</div>
                      <div className="font-medium text-slate-900">{leadDetail.conversation_id?.slice(0,8) || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Created</div>
                        <div className="font-medium text-slate-900">{new Date(leadDetail.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-slate-700 font-medium mb-3">Business Qualification</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500">Service</div>
                      <div className="font-medium text-slate-900 capitalize">{leadConversation?.service || '-'}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500">Industry</div>
                      <div className="font-medium text-slate-900 capitalize">{leadConversation?.industry || '-'}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500">Company</div>
                      <div className="font-medium text-slate-900">{leadConversation?.company || '-'}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500">Team Size</div>
                      <div className="font-medium text-slate-900">{leadConversation?.team_size || '-'}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500">Revenue Range</div>
                      <div className="font-medium text-slate-900">{leadConversation?.revenue_range || '-'}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500">Timeline</div>
                      <div className="font-medium text-slate-900 capitalize">{leadConversation?.timeline || '-'}</div>
                    </div>
                  </div>

                    <div className="text-sm text-slate-700 font-medium mb-2">Recent Messages</div>
                  <div className="h-60 overflow-y-auto border border-slate-200 rounded-lg">
                    <div className="divide-y divide-slate-100">
                      {(leadMessages || []).slice(-50).map(m => (
                        <div key={m.id} className="px-3 py-2 text-sm">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs mr-2 ${m.role === 'user' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>{m.role}</span>
                          <span className="text-slate-800 whitespace-pre-wrap">{m.content}</span>
                        </div>
                      ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Candidate Detail Modal */}
        {showCandidateModal && candidateDetail && (
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div>
                  <div className="font-semibold text-slate-900">Candidate Profile</div>
                  <div className="text-sm text-slate-500 mt-1">{candidateDetail.email}</div>
                </div>
                <button 
                  className="text-slate-500 hover:text-slate-700 font-medium" 
                  onClick={() => setShowCandidateModal(false)}
                >
                  Close
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Basic Info */}
                  <div className="space-y-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <h3 className="font-semibold text-slate-900 mb-3">Basic Information</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-slate-500">Full Name</div>
                          <div className="font-medium text-slate-900">{candidateDetail.name}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Email</div>
                          <div className="font-medium text-slate-900 text-sm break-all">{candidateDetail.email}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Phone</div>
                          <div className="font-medium text-slate-900">{candidateDetail.phone || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">WhatsApp</div>
                          <div className="font-medium text-slate-900">{candidateDetail.whatsapp || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">City</div>
                          <div className="font-medium text-slate-900">{candidateDetail.city || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Age Range</div>
                          <div className="font-medium text-slate-900">{candidateDetail.age_range || '-'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Gender</div>
                          <div className="font-medium text-slate-900">{candidateDetail.gender || '-'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <h3 className="font-semibold text-slate-900 mb-3">Status & Actions</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-slate-500 mb-2">Current Status</div>
                          {getStatusBadge(candidateDetail.status)}
                        </div>
                        <div className="pt-3 border-t border-slate-200">
                          <div className="text-xs text-slate-500 mb-2">Update Status</div>
                          <div className="space-y-2">
                            <button
                              onClick={() => updateCandidateStatus(candidateDetail.id, 'approved')}
                              className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center justify-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => updateCandidateStatus(candidateDetail.id, 'rejected')}
                              className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition flex items-center justify-center space-x-2"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                            <button
                              onClick={() => updateCandidateStatus(candidateDetail.id, 'pending_approval')}
                              className="w-full px-3 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition flex items-center justify-center space-x-2"
                            >
                              <AlertCircle className="w-4 h-4" />
                              <span>Set Pending</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Detailed Info */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Experience & Preferences */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <h3 className="font-semibold text-slate-900 mb-3">Experience & Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-slate-500 mb-2">Industry Experience</div>
                          <div className="flex flex-wrap gap-1">
                            {candidateDetail.industry_experience && Array.isArray(candidateDetail.industry_experience) ? (
                              candidateDetail.industry_experience.map((ind, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                  {ind}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400 text-sm">-</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-2">Desired Industry</div>
                          <div className="flex flex-wrap gap-1">
                            {candidateDetail.desired_industry && Array.isArray(candidateDetail.desired_industry) ? (
                              candidateDetail.desired_industry.map((ind, i) => (
                                <span key={i} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                                  {ind}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400 text-sm">-</span>
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-xs text-slate-500 mb-2">Desired Roles</div>
                          <div className="flex flex-wrap gap-1">
                            {candidateDetail.desired_roles && Array.isArray(candidateDetail.desired_roles) ? (
                              candidateDetail.desired_roles.map((role, i) => (
                                <span key={i} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                  {role}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400 text-sm">-</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    {candidateDetail.tech_stack && Object.keys(candidateDetail.tech_stack).length > 0 && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <h3 className="font-semibold text-slate-900 mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(candidateDetail.tech_stack).map(([key, value]) => (
                            <span key={key} className="px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-xs font-medium">
                              {key}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Files */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <h3 className="font-semibold text-slate-900 mb-3">Uploaded Files</h3>
                      <div className="space-y-2">
                        {candidateDetail.resume_url && (
                          <a
                            href={candidateDetail.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <FileText className="w-4 h-4" />
                            <span>View Resume</span>
                          </a>
                        )}
                        {candidateDetail.internet_speed_url && (
                          <a
                            href={candidateDetail.internet_speed_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <FileText className="w-4 h-4" />
                            <span>View Internet Speed Test</span>
                          </a>
                        )}
                        {candidateDetail.workspace_photo_url && (
                          <a
                            href={candidateDetail.workspace_photo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <FileText className="w-4 h-4" />
                            <span>View Workspace Photo</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Quiz Results */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <h3 className="font-semibold text-slate-900 mb-3">Assessment Results</h3>
                      {candidateQuizzes.length > 0 ? (
                        <div className="space-y-3">
                          {candidateQuizzes.map(quiz => (
                            <div key={quiz.id} className="bg-white border border-slate-200 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-slate-900 capitalize">
                                  {quiz.quiz_type.replace('_', ' ')} Quiz
                                </span>
                                <span className="text-sm text-slate-600">
                                  {quiz.percentage?.toFixed(0)}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${quiz.percentage || 0}%` }}
                                />
                              </div>
                              <div className="text-xs text-slate-500">
                                Score: {quiz.raw_score} / {quiz.max_score} • {new Date(quiz.created_at).toLocaleDateString()}
                              </div>
                              {quiz.profile_result && (
                                <div className="mt-2 text-xs text-slate-700 bg-slate-100 rounded p-2">
                                  <pre className="whitespace-pre-wrap font-mono text-xs">
                                    {JSON.stringify(quiz.profile_result, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-slate-500 text-sm">
                          No quiz results available
                        </div>
                      )}
                    </div>

                    {/* Timestamps */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <h3 className="font-semibold text-slate-900 mb-3">Timeline</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Created</span>
                          <span className="font-medium text-slate-900">
                            {new Date(candidateDetail.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Last Updated</span>
                          <span className="font-medium text-slate-900">
                            {new Date(candidateDetail.updated_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboardPage
