// ============================================
// BEHAVIORAL STRESS TEST DATA
// ============================================

export type StressCategory = 'ego' | 'pressure' | 'crisis' | 'people' | 'initiative'

export type BehavioralQuestion = {
  id: string
  category: StressCategory
  question: string
  options: {
    id: 'A' | 'B' | 'C' | 'D'
    text: string
    type: 'defensive' | 'reactive' | 'proactive' | 'frozen'
    points: number // 0, 1, or 2
  }[]
  audioPrompt: string
  audioTimeLimit: number // in seconds
}

export const BEHAVIORAL_STRESS_QUESTIONS: BehavioralQuestion[] = [
  // Ego (Titles & Feedback) - 2 questions
  {
    id: 'ego1',
    category: 'ego',
    question: 'Your client tells you that the report you submitted wasn\'t good enough.',
    options: [
      {
        id: 'A',
        text: 'I would explain my reasoning because I don\'t want them to think I made a careless mistake.',
        type: 'defensive',
        points: 1
      },
      {
        id: 'B',
        text: 'I would quietly redo it and resubmit without asking questions.',
        type: 'reactive',
        points: 1
      },
      {
        id: 'C',
        text: 'I would thank them, ask what wasn\'t meeting their expectations, and then adjust accordingly.',
        type: 'proactive',
        points: 2
      },
      {
        id: 'D',
        text: 'I\'d feel unsure how to respond and would probably just wait for more direction.',
        type: 'frozen',
        points: 0
      }
    ],
    audioPrompt: 'Tell me about a time you received feedback you didn\'t agree with. How did you actually handle it?',
    audioTimeLimit: 120
  },
  {
    id: 'ego2',
    category: 'ego',
    question: 'You find out another assistant on the team has a higher title (Executive Assistant) while you\'re an Admin.',
    options: [
      {
        id: 'A',
        text: 'I would feel undervalued and bring it up directly to my client or manager.',
        type: 'defensive',
        points: 1
      },
      {
        id: 'B',
        text: 'I would ignore the difference and just focus on doing my tasks.',
        type: 'reactive',
        points: 1
      },
      {
        id: 'C',
        text: 'I would use it as motivation to sharpen my skills and show I\'m ready for the next level.',
        type: 'proactive',
        points: 2
      },
      {
        id: 'D',
        text: 'I don\'t know how I\'d feel — maybe frustrated, maybe not.',
        type: 'frozen',
        points: 0
      }
    ],
    audioPrompt: 'Have you ever compared yourself to a teammate\'s role or title? What did you do about it?',
    audioTimeLimit: 120
  },
  
  // Pressure Handling (Deadlines & Expectations) - 2 questions
  {
    id: 'pressure1',
    category: 'pressure',
    question: 'Your client assigns five tasks at once — some urgent, some not — but no deadlines are given.',
    options: [
      {
        id: 'A',
        text: 'I would wait for the client to clarify which ones matter most before starting.',
        type: 'defensive',
        points: 1
      },
      {
        id: 'B',
        text: 'I would just start with the easiest one so I can show progress quickly.',
        type: 'reactive',
        points: 1
      },
      {
        id: 'C',
        text: 'I would prioritize by impact (e.g., revenue vs. non-revenue), confirm with the client, then execute.',
        type: 'proactive',
        points: 2
      },
      {
        id: 'D',
        text: 'I would feel stuck until I got more instructions.',
        type: 'frozen',
        points: 0
      }
    ],
    audioPrompt: 'Give me an example of a time when you had to juggle multiple priorities without clear deadlines. What did you do first?',
    audioTimeLimit: 120
  },
  {
    id: 'pressure2',
    category: 'pressure',
    question: 'Your WhatsApp group with the client has gone silent for days.',
    options: [
      {
        id: 'A',
        text: 'I assume they\'re just busy and I wait for them to come back.',
        type: 'defensive',
        points: 1
      },
      {
        id: 'B',
        text: 'I send a casual check-in like, \'Just making sure you saw my last update.\'',
        type: 'reactive',
        points: 1
      },
      {
        id: 'C',
        text: 'I proactively message them, acknowledge the silence, and ask if priorities shifted or if feedback is needed.',
        type: 'proactive',
        points: 2
      },
      {
        id: 'D',
        text: 'I would avoid messaging again until they reach out.',
        type: 'frozen',
        points: 0
      }
    ],
    audioPrompt: 'Tell me about a time a client went quiet on you. How did you handle it?',
    audioTimeLimit: 120
  },
  
  // Crisis Adaptability (Trust & Recovery) - 2 questions
  {
    id: 'crisis1',
    category: 'crisis',
    question: 'You forgot to follow up on a task, and the client is upset.',
    options: [
      {
        id: 'A',
        text: 'I explain I had too much on my plate and hope they understand.',
        type: 'defensive',
        points: 1
      },
      {
        id: 'B',
        text: 'I apologize quickly and promise it won\'t happen again, but don\'t go deeper.',
        type: 'reactive',
        points: 1
      },
      {
        id: 'C',
        text: 'I take ownership, explain what happened, and outline how I\'ll prevent it going forward.',
        type: 'proactive',
        points: 2
      },
      {
        id: 'D',
        text: 'I avoid bringing it up and move on.',
        type: 'frozen',
        points: 0
      }
    ],
    audioPrompt: 'Have you ever made a mistake that upset a client? Walk me through exactly how you fixed it.',
    audioTimeLimit: 120
  },
  {
    id: 'crisis2',
    category: 'crisis',
    question: 'A client believes you\'re "not working" because they didn\'t see updates.',
    options: [
      {
        id: 'A',
        text: 'I just wait until the next assignment to prove myself.',
        type: 'defensive',
        points: 1
      },
      {
        id: 'B',
        text: 'I send a quick note saying I was working in the background.',
        type: 'reactive',
        points: 1
      },
      {
        id: 'C',
        text: 'I prepare a clear update of what I\'ve done, explain progress, and set expectations.',
        type: 'proactive',
        points: 2
      },
      {
        id: 'D',
        text: 'I feel stuck and wouldn\'t know how to respond.',
        type: 'frozen',
        points: 0
      }
    ],
    audioPrompt: 'Give me an example of how you\'ve rebuilt trust with a client after miscommunication.',
    audioTimeLimit: 120
  },
  
  // People Skills (Rapport & Reassurance) - 2 questions
  {
    id: 'people1',
    category: 'people',
    question: 'A client expresses doubt about whether hiring you was the right choice.',
    options: [
      {
        id: 'A',
        text: 'I take it personally and feel discouraged.',
        type: 'defensive',
        points: 1
      },
      {
        id: 'B',
        text: 'I reassure them with a simple \'Don\'t worry, I\'ll do better.\'',
        type: 'reactive',
        points: 1
      },
      {
        id: 'C',
        text: 'I acknowledge their concern, explain my plan to improve, and remind them why I\'m valuable.',
        type: 'proactive',
        points: 2
      },
      {
        id: 'D',
        text: 'I avoid responding directly and just try to work harder.',
        type: 'frozen',
        points: 0
      }
    ],
    audioPrompt: 'Tell me about a time when a client questioned your work. How did you win them back?',
    audioTimeLimit: 120
  },
  {
    id: 'people2',
    category: 'people',
    question: 'During a video call, the client is visibly frustrated about delays.',
    options: [
      {
        id: 'A',
        text: 'I argue back to explain my side.',
        type: 'defensive',
        points: 1
      },
      {
        id: 'B',
        text: 'I stay quiet and let them vent until they cool off.',
        type: 'reactive',
        points: 1
      },
      {
        id: 'C',
        text: 'I acknowledge their frustration and offer solutions to get things back on track.',
        type: 'proactive',
        points: 2
      },
      {
        id: 'D',
        text: 'I freeze up and don\'t know what to say.',
        type: 'frozen',
        points: 0
      }
    ],
    audioPrompt: 'What\'s the toughest client conversation you\'ve had? How did you handle it?',
    audioTimeLimit: 120
  },
  
  // Initiative (Anticipation & Improvement) - 2 questions
  {
    id: 'initiative1',
    category: 'initiative',
    question: 'You notice a task can be automated with a free AI tool.',
    options: [
      {
        id: 'A',
        text: 'I ignore it and just do it manually.',
        type: 'defensive',
        points: 1
      },
      {
        id: 'B',
        text: 'I test it myself but keep it quiet in case it doesn\'t work.',
        type: 'reactive',
        points: 1
      },
      {
        id: 'C',
        text: 'I test it, prepare a short demo, and recommend it to my client.',
        type: 'proactive',
        points: 2
      },
      {
        id: 'D',
        text: 'I\'m not sure if it\'s my role to suggest things like that.',
        type: 'frozen',
        points: 0
      }
    ],
    audioPrompt: 'Share an example of when you introduced a new tool or process to a client or team. What happened?',
    audioTimeLimit: 120
  },
  {
    id: 'initiative2',
    category: 'initiative',
    question: 'Your client never schedules daily check-ins with you.',
    options: [
      {
        id: 'A',
        text: 'I wait for them to set the rhythm.',
        type: 'defensive',
        points: 1
      },
      {
        id: 'B',
        text: 'I send updates at random times.',
        type: 'reactive',
        points: 1
      },
      {
        id: 'C',
        text: 'I propose a short daily huddle (10–15 mins) and explain the benefit.',
        type: 'proactive',
        points: 2
      },
      {
        id: 'D',
        text: 'I avoid suggesting it because I don\'t want to bother them.',
        type: 'frozen',
        points: 0
      }
    ],
    audioPrompt: 'Tell me about a time you created a new communication routine with a client or team. What was the result?',
    audioTimeLimit: 120
  }
]

// ============================================
// SCORING & ANALYSIS
// ============================================

export type CategoryScore = {
  category: StressCategory
  score: number
  maxScore: number
  level: 'low' | 'medium' | 'high'
  description: string
}

export type BehavioralProfile = {
  totalScore: number
  maxScore: number
  riskLevel: 'high_risk' | 'medium' | 'high_capacity'
  categoryScores: CategoryScore[]
  overallReadiness: string
  strengths: string[]
  developmentAreas: string[]
  redFlags: string[]
}

export function calculateBehavioralProfile(
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>,
  audioAdjustments?: Record<string, number> // ±1 point per question based on audio quality
): BehavioralProfile {
  let totalScore = 0
  const categoryScores: Record<StressCategory, { score: number; count: number }> = {
    ego: { score: 0, count: 0 },
    pressure: { score: 0, count: 0 },
    crisis: { score: 0, count: 0 },
    people: { score: 0, count: 0 },
    initiative: { score: 0, count: 0 }
  }

  // Calculate base scores from multiple choice
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = BEHAVIORAL_STRESS_QUESTIONS.find(q => q.id === questionId)
    if (!question) return

    const option = question.options.find(opt => opt.id === answer)
    if (!option) return

    let points = option.points
    
    // Apply audio adjustment if provided
    if (audioAdjustments && audioAdjustments[questionId]) {
      points += audioAdjustments[questionId]
      points = Math.max(0, Math.min(3, points)) // Clamp between 0-3
    }

    totalScore += points
    categoryScores[question.category].score += points
    categoryScores[question.category].count += 1
  })

  // Calculate category scores
  const categoryResults: CategoryScore[] = Object.entries(categoryScores).map(([cat, data]) => {
    const category = cat as StressCategory
    const maxScore = data.count * 2 // 2 points max per question
    const percentage = maxScore > 0 ? (data.score / maxScore) * 100 : 0
    
    let level: 'low' | 'medium' | 'high'
    if (percentage >= 75) level = 'high'
    else if (percentage >= 50) level = 'medium'
    else level = 'low'

    return {
      category,
      score: data.score,
      maxScore,
      level,
      description: getCategoryDescription(category, level)
    }
  })

  // Determine overall risk level
  const maxScore = 20 // 10 questions × 2 points
  let riskLevel: 'high_risk' | 'medium' | 'high_capacity'
  if (totalScore <= 8) riskLevel = 'high_risk'
  else if (totalScore <= 16) riskLevel = 'medium'
  else riskLevel = 'high_capacity'

  // Generate profile details
  const { overallReadiness, strengths, developmentAreas, redFlags } = generateProfileDetails(
    riskLevel,
    categoryResults,
    answers
  )

  return {
    totalScore,
    maxScore,
    riskLevel,
    categoryScores: categoryResults,
    overallReadiness,
    strengths,
    developmentAreas,
    redFlags
  }
}

function getCategoryDescription(category: StressCategory, level: 'low' | 'medium' | 'high'): string {
  const descriptions: Record<StressCategory, Record<string, string>> = {
    ego: {
      low: 'Defensive about feedback, may struggle with growth mindset.',
      medium: 'Accepts feedback but may need coaching on implementation.',
      high: 'Open to feedback, growth-oriented, handles criticism well.'
    },
    pressure: {
      low: 'Struggles under deadlines, needs clear direction.',
      medium: 'Handles pressure adequately with some guidance.',
      high: 'Stays calm under deadlines, clarifies priorities proactively.'
    },
    crisis: {
      low: 'Avoids accountability, struggles with trust recovery.',
      medium: 'Accepts mistakes, may need coaching on rebuilding trust.',
      high: 'Takes ownership, rebuilds trust effectively after mistakes.'
    },
    people: {
      low: 'Struggles with difficult conversations, may take things personally.',
      medium: 'Handles client relationships adequately, room for growth.',
      high: 'Reinforces relationships, handles tough conversations with tact.'
    },
    initiative: {
      low: 'Waits for direction, lacks proactive problem-solving.',
      medium: 'Shows some initiative but may need encouragement.',
      high: 'Identifies improvements, introduces solutions proactively.'
    }
  }
  return descriptions[category][level]
}

function generateProfileDetails(
  riskLevel: 'high_risk' | 'medium' | 'high_capacity',
  categoryScores: CategoryScore[],
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>
) {
  const strengths: string[] = []
  const developmentAreas: string[] = []
  const redFlags: string[] = []

  // Analyze category scores
  categoryScores.forEach(cat => {
    if (cat.level === 'high') {
      strengths.push(getCategoryStrength(cat.category))
    } else if (cat.level === 'low') {
      developmentAreas.push(getCategoryDevelopment(cat.category))
    }
  })

  // Check for red flags
  const answerValues = Object.values(answers)
  const aCount = answerValues.filter(a => a === 'A').length
  const bCount = answerValues.filter(a => a === 'B').length
  const dCount = answerValues.filter(a => a === 'D').length

  if (aCount >= 5) {
    redFlags.push('Predominantly defensive responses - may struggle with accountability')
  }
  if (bCount >= 6) {
    redFlags.push('Mostly reactive responses - lacks proactive leadership')
  }
  if (dCount >= 3) {
    redFlags.push('Multiple "frozen" responses - may struggle under stress')
  }

  // Generate overall readiness
  let overallReadiness: string
  if (riskLevel === 'high_capacity') {
    overallReadiness = '✅ This candidate shows strong initiative and adaptability. They are likely to thrive under pressure and build long-term trust with clients.'
  } else if (riskLevel === 'medium') {
    overallReadiness = '⚖️ This candidate is reliable but may need guidance in high-pressure situations. With proper onboarding and support, they can develop into a strong performer.'
  } else {
    overallReadiness = '🚩 This candidate shows signs of defensive, avoidant, or frozen behavior under stress. They may require significant coaching and may not be suitable for autonomous roles.'
  }

  return { overallReadiness, strengths, developmentAreas, redFlags }
}

function getCategoryStrength(category: StressCategory): string {
  const strengths: Record<StressCategory, string> = {
    ego: 'Receptive to feedback and focused on continuous improvement',
    pressure: 'Excellent at managing multiple priorities and staying calm under pressure',
    crisis: 'Takes ownership of mistakes and effectively rebuilds trust',
    people: 'Strong interpersonal skills and handles difficult conversations well',
    initiative: 'Proactive problem-solver who identifies and implements improvements'
  }
  return strengths[category]
}

function getCategoryDevelopment(category: StressCategory): string {
  const developments: Record<StressCategory, string> = {
    ego: 'Needs coaching on receiving feedback constructively',
    pressure: 'Requires clearer direction and support under tight deadlines',
    crisis: 'Needs development in accountability and trust recovery',
    people: 'Requires coaching on handling difficult client conversations',
    initiative: 'Needs encouragement to take initiative and suggest improvements'
  }
  return developments[category]
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getCategoryLabel(category: StressCategory): string {
  const labels: Record<StressCategory, string> = {
    ego: 'Ego (Titles & Feedback)',
    pressure: 'Pressure Handling',
    crisis: 'Crisis Adaptability',
    people: 'People Skills',
    initiative: 'Initiative'
  }
  return labels[category]
}

export function getCategoryColor(category: StressCategory): string {
  const colors: Record<StressCategory, string> = {
    ego: 'from-red-500 to-orange-600',
    pressure: 'from-yellow-500 to-amber-600',
    crisis: 'from-blue-500 to-indigo-600',
    people: 'from-green-500 to-teal-600',
    initiative: 'from-purple-500 to-pink-600'
  }
  return colors[category]
}

export function getRiskLevelColor(riskLevel: 'high_risk' | 'medium' | 'high_capacity'): string {
  const colors = {
    high_risk: 'from-red-600 to-red-700',
    medium: 'from-yellow-600 to-orange-600',
    high_capacity: 'from-green-600 to-emerald-600'
  }
  return colors[riskLevel]
}

export function getRiskLevelLabel(riskLevel: 'high_risk' | 'medium' | 'high_capacity'): string {
  const labels = {
    high_risk: '🚩 High Risk Candidate',
    medium: '⚖️ Medium Candidate',
    high_capacity: '✅ High Capacity Candidate'
  }
  return labels[riskLevel]
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

