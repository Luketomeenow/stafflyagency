/**
 * Candidate Matching Algorithm
 * Scores and ranks candidates based on lead qualification data
 */

export type Lead = {
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

export type Candidate = {
  id: string
  name: string
  email: string
  phone?: string
  profile_photo_url?: string
  title: string
  bio?: string
  experience_years?: number
  hourly_rate?: number
  available_hours_per_week?: number
  timezone?: string
  availability_status?: string
  industries?: string[]
  roles?: string[]
  skills?: string[]
  tools?: string[]
  communication_style?: string
  work_style?: string
  is_featured?: boolean
  is_verified?: boolean
  status?: string
  languages?: string[]
}

export type ScoredCandidate = Candidate & {
  matchScore: number
  matchReasons: string[]
}

/**
 * Main matching function
 * Returns top N candidates sorted by match score
 */
export function matchCandidates(
  lead: Lead,
  candidates: Candidate[],
  topN: number = 3
): ScoredCandidate[] {
  const scoredCandidates = candidates
    .filter(c => c.status === 'active' && c.availability_status === 'available')
    .map(candidate => scoreCandidate(lead, candidate))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, topN)

  return scoredCandidates
}

/**
 * Score a single candidate against lead requirements
 * Returns candidate with score and match reasons
 */
function scoreCandidate(lead: Lead, candidate: Candidate): ScoredCandidate {
  let score = 0
  const reasons: string[] = []

  // Industry match (30 points)
  if (lead.industry && candidate.industries) {
    const industryMatch = candidate.industries.some(
      ind => normalize(ind).includes(normalize(lead.industry!))
    )
    if (industryMatch) {
      score += 30
      reasons.push(`Experience in ${lead.industry}`)
    }
  }

  // Role match (25 points)
  if (lead.role_or_scope && candidate.roles) {
    const roleMatch = candidate.roles.some(
      role => normalize(role).includes(normalize(lead.role_or_scope!)) ||
              normalize(lead.role_or_scope!).includes(normalize(role))
    )
    if (roleMatch) {
      score += 25
      reasons.push(`Matches ${lead.role_or_scope} role`)
    }
  }

  // Tools/skills match (20 points)
  if (lead.tools_stack && candidate.tools) {
    const leadTools = lead.tools_stack.split(',').map(t => normalize(t))
    const matchedTools = leadTools.filter(tool =>
      candidate.tools!.some(ct => normalize(ct).includes(tool) || tool.includes(normalize(ct)))
    )
    if (matchedTools.length > 0) {
      const toolScore = Math.min(20, matchedTools.length * 5)
      score += toolScore
      reasons.push(`Proficient in ${matchedTools.length} required tool(s)`)
    }
  }

  // Hours availability (15 points)
  if (lead.hours_per_week && candidate.available_hours_per_week) {
    const leadHours = parseInt(lead.hours_per_week) || 0
    if (candidate.available_hours_per_week >= leadHours) {
      score += 15
      reasons.push(`Available ${candidate.available_hours_per_week}hrs/week`)
    }
  }

  // Timezone compatibility (10 points)
  if (lead.timezone && candidate.timezone) {
    if (normalize(candidate.timezone) === normalize(lead.timezone)) {
      score += 10
      reasons.push(`Same timezone (${candidate.timezone})`)
    }
  }

  // Featured/verified bonus (5 points each)
  if (candidate.is_featured) {
    score += 5
    reasons.push('Featured candidate')
  }
  if (candidate.is_verified) {
    score += 5
    reasons.push('Verified profile')
  }

  // Experience bonus (up to 10 points)
  if (candidate.experience_years) {
    const expScore = Math.min(10, candidate.experience_years * 1.5)
    score += expScore
    reasons.push(`${candidate.experience_years} years experience`)
  }

  return {
    ...candidate,
    matchScore: Math.round(score),
    matchReasons: reasons
  }
}

/**
 * Normalize string for comparison
 */
function normalize(str: string): string {
  return str.toLowerCase().trim().replace(/[^a-z0-9]/g, '')
}

/**
 * Format candidate for email template
 */
export function formatCandidateForEmail(candidate: ScoredCandidate): string {
  return `
**${candidate.name}** - ${candidate.title}
Match Score: ${candidate.matchScore}/100
${candidate.bio || 'Experienced VA ready to support your business'}

📧 ${candidate.email}
${candidate.phone ? `📞 ${candidate.phone}` : ''}
💰 $${candidate.hourly_rate}/hr | ⏰ ${candidate.available_hours_per_week}hrs/week
🌍 ${candidate.timezone} | 🏆 ${candidate.experience_years} years exp

**Why this match:**
${candidate.matchReasons.map(r => `• ${r}`).join('\n')}

**Skills:** ${(candidate.skills || []).slice(0, 5).join(', ')}
**Tools:** ${(candidate.tools || []).slice(0, 5).join(', ')}

---
  `.trim()
}

/**
 * Generate HTML email body with matched candidates
 */
export function generateMatchEmail(
  leadName: string,
  lead: Lead,
  candidates: ScoredCandidate[],
  baseUrl: string = 'https://staffly.ai'
): { subject: string; body: string; htmlBody: string } {
  const subject = `✨ Your Top ${candidates.length} Matched VA Profiles | StafflyAI`

  // Plain text version (fallback)
  const body = `
Hi ${leadName || 'there'},

Thank you for using Staffly AI! Based on your requirements, we've matched you with ${candidates.length} pre-vetted Virtual Assistant candidate(s):

${candidates.map((c, i) => `\n### Candidate ${i + 1}\n${formatCandidateForEmail(c)}\nView Profile: ${baseUrl}/profile/${c.id}`).join('\n\n')}

**Your Requirements Summary:**
• Service: ${lead.service || 'N/A'}
• Industry: ${lead.industry || 'N/A'}
• Role: ${lead.role_or_scope || 'N/A'}
• Hours: ${lead.hours_per_week || 'N/A'} hrs/week
• Timeline: ${lead.timeline || 'N/A'}

**Next Steps:**
1. Review the profiles above
2. Schedule a free strategy call: ${baseUrl}/#chat
3. Our team will help you onboard your chosen candidate(s)

Questions? Reply to this email or book a call with our team.

Best regards,
The Staffly Team
${baseUrl}
  `.trim()

  // HTML version (rich formatting with clickable links)
  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Matched VA Profiles</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #334155;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">✨ Your Matched VA Profiles</h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">We found ${candidates.length} perfect candidates for you!</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #475569;">
                Hi <strong>${leadName || 'there'}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #475569;">
                Thank you for using <strong>Staffly AI</strong>! Based on your requirements, we've curated the top ${candidates.length} pre-vetted Virtual Assistants that match your needs:
              </p>
            </td>
          </tr>

          <!-- Candidates -->
          ${candidates.map((c, i) => `
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px; overflow: hidden; border: 2px solid #e2e8f0;">
                <tr>
                  <td style="padding: 24px;">
                    <!-- Candidate Header -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <div style="display: inline-block; width: 60px; height: 60px; background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); border-radius: 50%; text-align: center; line-height: 60px; color: #ffffff; font-size: 24px; font-weight: bold; float: left; margin-right: 16px;">
                            ${c.name?.charAt(0)?.toUpperCase() || 'C'}
                          </div>
                          <div style="padding-top: 8px;">
                            <h2 style="margin: 0 0 4px 0; font-size: 20px; font-weight: bold; color: #0f172a;">${c.name}</h2>
                            <p style="margin: 0; font-size: 14px; color: #64748b;">
                              ${c.timezone || 'Remote'} • ${c.experience_years || 0} years exp
                            </p>
                          </div>
                        </td>
                        <td align="right" valign="top">
                          <span style="display: inline-block; padding: 6px 12px; background-color: #22c55e; color: #ffffff; border-radius: 20px; font-size: 12px; font-weight: 600;">
                            ${c.matchScore}% Match
                          </span>
                        </td>
                      </tr>
                    </table>

                    <!-- Candidate Details -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                      <tr>
                        <td style="padding: 12px; background-color: #ffffff; border-radius: 8px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="50%" style="padding: 8px 0;">
                                <span style="font-size: 14px; color: #64748b;">💰 Rate:</span>
                                <span style="font-size: 14px; font-weight: 600; color: #0f172a;"> $${c.hourly_rate || 'TBD'}/hr</span>
                              </td>
                              <td width="50%" style="padding: 8px 0;">
                                <span style="font-size: 14px; color: #64748b;">⏰ Availability:</span>
                                <span style="font-size: 14px; font-weight: 600; color: #0f172a;"> ${c.available_hours_per_week || 40}hrs/wk</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Match Reasons -->
                    ${c.matchReasons.length > 0 ? `
                    <div style="margin-top: 16px; padding: 16px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #2563eb;">
                      <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #0f172a;">Why this match:</p>
                      ${c.matchReasons.map(r => `<p style="margin: 4px 0; font-size: 13px; color: #475569;">✓ ${r}</p>`).join('')}
                    </div>
                    ` : ''}

                    <!-- Skills -->
                    ${(c.skills && c.skills.length > 0) ? `
                    <div style="margin-top: 16px;">
                      <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #0f172a;">Skills:</p>
                      <div style="margin-top: 8px;">
                        ${c.skills.slice(0, 5).map(skill => 
                          `<span style="display: inline-block; margin: 4px 4px 4px 0; padding: 4px 12px; background-color: #dbeafe; color: #1e40af; border-radius: 16px; font-size: 12px; font-weight: 500;">${skill}</span>`
                        ).join('')}
                      </div>
                    </div>
                    ` : ''}

                    <!-- View Profile Button -->
                    <div style="margin-top: 20px; text-align: center;">
                      <a href="${baseUrl}/profile/${c.id}" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
                        View Full Profile →
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `).join('')}

          <!-- Requirements Summary -->
          <tr>
            <td style="padding: 30px; background-color: #f1f5f9; border-top: 1px solid #e2e8f0;">
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold; color: #0f172a;">Your Requirements Summary</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #475569;">
                    <strong>Service:</strong> ${lead.service || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #475569;">
                    <strong>Industry:</strong> ${lead.industry || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #475569;">
                    <strong>Role:</strong> ${lead.role_or_scope || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #475569;">
                    <strong>Hours:</strong> ${lead.hours_per_week || 'N/A'} hrs/week
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #475569;">
                    <strong>Timeline:</strong> ${lead.timeline || 'N/A'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding: 30px;">
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold; color: #0f172a;">Next Steps</h3>
              <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: #475569;">
                <li style="margin-bottom: 8px;">Review the profiles above and click "View Full Profile" for details</li>
                <li style="margin-bottom: 8px;">Schedule a free strategy call to discuss your top picks</li>
                <li>Our team will help you onboard your chosen candidate(s)</li>
              </ol>
              <div style="margin-top: 24px; text-align: center;">
                <a href="${baseUrl}/#chat" style="display: inline-block; padding: 14px 40px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Schedule a Strategy Call
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #0f172a; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 14px;">
                Questions? Reply to this email or book a call with our team.
              </p>
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                © ${new Date().getFullYear()} StafflyAI. All rights reserved.
              </p>
              <p style="margin: 8px 0 0 0;">
                <a href="${baseUrl}" style="color: #3b82f6; text-decoration: none; font-size: 12px;">${baseUrl}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  return { subject, body, htmlBody }
}

