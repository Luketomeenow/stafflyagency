import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

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

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [messagesCount, setMessagesCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [leadDetail, setLeadDetail] = useState<Lead | null>(null)
  const [leadConversation, setLeadConversation] = useState<Conversation | null>(null)
  const [leadMessages, setLeadMessages] = useState<Message[]>([])
  const [leadSearch, setLeadSearch] = useState('')
  const [conversationSearch, setConversationSearch] = useState('')
  const [serviceFilter, setServiceFilter] = useState<string>('all')
  const [industryFilter, setIndustryFilter] = useState<string>('all')
  const [timelineFilter, setTimelineFilter] = useState<string>('all')

  useEffect(() => {
    const authed = localStorage.getItem('adminAuthed') === 'true'
    if (!authed) {
      navigate('/admin/login')
    }
  }, [navigate])

  useEffect(() => {
    const load = async () => {
      try {
        if (!supabase) return
        const { data: convs } = await supabase.from('conversations').select('*').order('created_at', { ascending: false })
        const { data: leadsData } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
        const { count } = await supabase.from('conversation_messages').select('*', { count: 'exact', head: true })
        setConversations(convs || [])
        setLeads(leadsData || [])
        setMessagesCount(count || 0)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const totals = useMemo(() => {
    const uniqueUsers = new Set((conversations || []).map(c => c.session_id || c.id)).size
    return {
      totalConversations: conversations.length,
      totalMessages: messagesCount,
      totalLeads: leads.length,
      uniqueUsers
    }
  }, [conversations, leads, messagesCount])

  const filteredLeads = useMemo(() => {
    if (!leadSearch.trim()) return leads
    const term = leadSearch.toLowerCase()
    return leads.filter(l =>
      (l.name || '').toLowerCase().includes(term) ||
      (l.email || '').toLowerCase().includes(term) ||
      (l.phone || '').toLowerCase().includes(term)
    )
  }, [leads, leadSearch])

  const filteredConversations = useMemo(() => {
    let filtered = conversations
    
    // Apply search filter
    if (conversationSearch.trim()) {
      const term = conversationSearch.toLowerCase()
      filtered = filtered.filter(c =>
        (c.lead_name || '').toLowerCase().includes(term) ||
        (c.lead_email || '').toLowerCase().includes(term) ||
        (c.lead_phone || '').toLowerCase().includes(term) ||
        (c.id || '').toLowerCase().includes(term)
      )
    }
    
    // Apply service filter
    if (serviceFilter !== 'all') {
      filtered = filtered.filter(c => (c.service || '').toLowerCase().includes(serviceFilter.toLowerCase()))
    }
    
    // Apply industry filter
    if (industryFilter !== 'all') {
      filtered = filtered.filter(c => (c.industry || '').toLowerCase().includes(industryFilter.toLowerCase()))
    }
    
    // Apply timeline filter
    if (timelineFilter !== 'all') {
      filtered = filtered.filter(c => (c.timeline || '').toLowerCase().includes(timelineFilter.toLowerCase()))
    }
    
    return filtered
  }, [conversations, conversationSearch, serviceFilter, industryFilter, timelineFilter])

  const parseBusinessInfo = (messages: Message[]) => {
    const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()
    const userMsgs = messages.filter(m => m.role === 'user').map(m => normalize(m.content))

    const contains = (msg: string, value: string) => msg.includes(normalize(value))
    const firstMatch = (options: string[]) => {
      for (const msg of userMsgs) {
        for (const opt of options) {
          if (contains(msg, opt)) return opt
        }
      }
      return null
    }

    const industry = firstMatch([
      'Agency / Marketing',
      'Coaching / Consulting',
      'E-commerce',
      'Real Estate',
      'Other'
    ])

    // Employees: try to extract a number (e.g., "3 employees")
    let employees: string | null = null
    for (const msg of userMsgs) {
      const m = msg.match(/(\d+[\.,]?\d*)\s*(employees?|staff|people|team)/)
      if (m) {
        const num = parseInt(m[1].replace(/[,\.]/g, ''), 10)
        if (!isNaN(num)) { employees = String(num); break }
      }
    }
    // Fallback to buckets if stated that way
    if (!employees) {
      const teamSize = firstMatch(['Just me','2–5 employees','2-5 employees','6–15 employees','6-15 employees','15+ employees'])
      if (teamSize) employees = teamSize
    }

    // Revenue: extract ranges like "10k-25k", "$10k – $50k", "under 10k-25k"
    const toNumber = (value: string, unit?: string) => {
      let n = parseFloat(value)
      if (isNaN(n)) return NaN
      const u = unit || ''
      if (u.includes('m')) n = n * 1_000_000
      else if (u.includes('k')) n = n * 1_000
      return Math.round(n)
    }
    const fmt = (n: number) => n.toLocaleString()
    let revenue: string | null = null
    for (const msg of userMsgs) {
      // range with separators or words
      const range = msg.match(/(?:under\s+)?\$?(\d+(?:\.\d+)?)\s*([km])?\s*(?:-|–|to)\s*\$?(\d+(?:\.\d+)?)\s*([km])?/)
      if (range) {
        const min = toNumber(range[1], range[2])
        const max = toNumber(range[3], range[4])
        if (!isNaN(min) && !isNaN(max)) { revenue = `${fmt(min)} - ${fmt(max)}`; break }
      }
      // single value with under/over
      const single = msg.match(/(under|below|over|above)\s*\$?(\d+(?:\.\d+)?)\s*([km])?/)
      if (single) {
        const val = toNumber(single[2], single[3])
        if (!isNaN(val)) {
          if (single[1].includes('under') || single[1].includes('below')) revenue = `0 - ${fmt(val)}`
          else revenue = `${fmt(val)}+`
          break
        }
      }
      // plain $10k format
      const plain = msg.match(/\$?(\d+(?:\.\d+)?)\s*([km])\b/)
      if (plain) {
        const val = toNumber(plain[1], plain[2])
        if (!isNaN(val)) { revenue = `${fmt(val)}`; break }
      }
    }

    // Primary challenge (map to a clean label)
    let primaryChallenge: string | null = null
    const challengeOptions: Array<[string, string[]]> = [
      ['Generating more leads & sales', ['generating more leads & sales', 'leads', 'sales']],
      ['Admin / inbox / scheduling overload', ['admin', 'inbox', 'scheduling']],
      ['Too much time on creative work', ['creative', 'video', 'canva', 'design']],
      ['Other', ['other']]
    ]
    outer: for (const msg of userMsgs) {
      for (const [label, keys] of challengeOptions) {
        if (keys.some(k => msg.includes(k))) { primaryChallenge = label; break outer }
      }
    }

    // Time spent most (from objection softener step)
    let timeSpentMost: string | null = null
    if (userMsgs.some(m => m.includes('sales & growth'))) timeSpentMost = 'Sales & Growth'
    else if (userMsgs.some(m => m.includes('admin/operational') || m.includes('admin/ops') || m.includes('admin'))) timeSpentMost = 'Admin / Operational'

    return { industry, employees, revenue, primaryChallenge, timeSpentMost }
  }

  const openLead = async (lead: Lead) => {
    setLeadDetail(lead)
    setLeadMessages([])
    setLeadConversation(null)
    setShowLeadModal(true)
    if (lead.conversation_id && supabase) {
      // Fetch conversation data with qualification fields
      const { data: conv } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', lead.conversation_id)
        .single()
      if (conv) setLeadConversation(conv as Conversation)
      
      // Fetch messages
      const { data: msgs } = await supabase
        .from('conversation_messages')
        .select('*')
        .eq('conversation_id', lead.conversation_id)
        .order('created_at', { ascending: true })
        .limit(200)
      setLeadMessages((msgs || []) as Message[])
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
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

        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-sm font-semibold text-slate-700 mb-3">Filters</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <option value="it">IT / Technology</option>
                <option value="legal">Legal</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance / Accounting</option>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-sm text-slate-500">Conversations</div>
            <div className="text-2xl font-bold">{totals.totalConversations}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-sm text-slate-500">Messages</div>
            <div className="text-2xl font-bold">{totals.totalMessages}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-sm text-slate-500">Leads</div>
            <div className="text-2xl font-bold">{totals.totalLeads}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-sm text-slate-500">Unique Users</div>
            <div className="text-2xl font-bold">{totals.uniqueUsers}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-slate-900">Recent Leads</h2>
              <input
                type="text"
                placeholder="Search leads..."
                value={leadSearch}
                onChange={(e) => setLeadSearch(e.target.value)}
                className="px-3 py-1 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-left text-slate-600 border-b border-slate-200">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Phone</th>
                    <th className="py-2">Conversation</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map(l => (
                    <tr
                      key={l.email}
                      className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer"
                      onClick={() => openLead(l)}
                    >
                      <td className="py-2 pr-4">{l.name}</td>
                      <td className="py-2 pr-4">{l.email}</td>
                      <td className="py-2 pr-4">{l.phone}</td>
                      <td className="py-2">{l.conversation_id?.slice(0,8)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredLeads.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-sm">No leads found</div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-slate-900">Recent Conversations</h2>
              <input
                type="text"
                placeholder="Search conversations..."
                value={conversationSearch}
                onChange={(e) => setConversationSearch(e.target.value)}
                className="px-3 py-1 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-left text-slate-600 border-b border-slate-200">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">Lead</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Phone</th>
                    <th className="py-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConversations.map(c => (
                    <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="py-2 pr-4">{c.id.slice(0,8)}</td>
                      <td className="py-2 pr-4">{c.lead_name || '-'}</td>
                      <td className="py-2 pr-4">{c.lead_email || '-'}</td>
                      <td className="py-2 pr-4">{c.lead_phone || '-'}</td>
                      <td className="py-2">{c.created_at ? new Date(c.created_at).toLocaleString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredConversations.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-sm">No conversations found</div>
              )}
            </div>
          </div>
        </div>

        {loading && <div className="text-sm text-slate-500">Loading…</div>}

        {/* Lead detail modal */}
        {showLeadModal && leadDetail && (
          <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <div className="font-semibold text-slate-900">Lead details</div>
                <button className="text-slate-500 hover:text-slate-700" onClick={() => setShowLeadModal(false)}>Close</button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <div className="font-medium text-slate-900">{new Date(leadDetail.created_at).toLocaleString()}</div>
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
                      <div className="text-xs text-slate-500">Role / Scope</div>
                      <div className="font-medium text-slate-900 capitalize">{leadConversation?.role_or_scope || '-'}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500">Hours/Week</div>
                      <div className="font-medium text-slate-900">{leadConversation?.hours_per_week || '-'}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500">Timezone</div>
                      <div className="font-medium text-slate-900 uppercase">{leadConversation?.timezone || '-'}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-xs text-slate-500">Timeline</div>
                      <div className="font-medium text-slate-900 capitalize">{leadConversation?.timeline || '-'}</div>
                    </div>
                    {leadConversation?.tools_stack && (
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 md:col-span-2">
                        <div className="text-xs text-slate-500">Tools / Tech Stack</div>
                        <div className="font-medium text-slate-900 text-sm">{leadConversation.tools_stack}</div>
                      </div>
                    )}
                    {leadConversation?.goal && (
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 md:col-span-3">
                        <div className="text-xs text-slate-500">Goal</div>
                        <div className="font-medium text-slate-900 text-sm">{leadConversation.goal}</div>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-slate-700 font-medium mb-2">Recent messages</div>
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
        )}
      </div>
    </div>
  )
}

export default AdminDashboardPage


