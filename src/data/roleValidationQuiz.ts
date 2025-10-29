// ============================================
// ROLE VALIDATION QUIZ DATA (Audio Response)
// ============================================

export type RoleLevel = 'runner' | 'admin' | 'executive_assistant' | 'chief_of_staff'

export type AudioQuestion = {
  id: string
  level: RoleLevel
  title: string
  question: string
  guidelines: string[]
  timeLimit: number // in seconds
  evaluationCriteria: {
    specificity: string
    structure: string
    impact: string
    communication: string
  }
}

export const ROLE_VALIDATION_QUESTIONS: AudioQuestion[] = [
  {
    id: 'runner',
    level: 'runner',
    title: 'Basic Support & Initiative (Runner Test)',
    question: "Think back to a time when you were given simple, repetitive tasks — like scheduling calls, updating notes, setting appointments, or handling basic admin work. Describe a moment when you didn't know how to do the task at first. How did you figure it out, and how did you update your manager or client afterward?",
    guidelines: [
      'What was the situation?',
      'What did you do?',
      'What happened as a result?'
    ],
    timeLimit: 120, // 2 minutes
    evaluationCriteria: {
      specificity: 'Did they provide a concrete example with specific tasks?',
      structure: 'Did they follow the situation-action-result format?',
      impact: 'Did they explain how they learned and communicated progress?',
      communication: 'Was the response clear and easy to follow?'
    }
  },
  {
    id: 'admin',
    level: 'admin',
    title: 'Accuracy & Client Journey (Admin Test)',
    question: "Imagine you were responsible for contracts, paperwork, or a client file where even a small mistake could cost the company money or damage trust. Tell me about a time when you personally managed an important document, process, or customer handoff. What steps did you take to make sure everything was correct, and how did you communicate expectations to the client or your team?",
    guidelines: [
      'What was the situation?',
      'What did you do?',
      'What happened as a result?'
    ],
    timeLimit: 120,
    evaluationCriteria: {
      specificity: 'Did they describe a real high-stakes document or process?',
      structure: 'Did they explain their quality control steps?',
      impact: 'Did they demonstrate attention to detail and risk awareness?',
      communication: 'Did they explain how they communicated with stakeholders?'
    }
  },
  {
    id: 'executive_assistant',
    level: 'executive_assistant',
    title: 'Executive Representation (EA Test)',
    question: "Think of a time when the executive you supported was unavailable and you had to step in. Maybe it was protecting their calendar, filtering meetings, negotiating with a client, or leading a discussion in their place. Walk me through the exact situation — what decisions did you make, how did you manage relationships, and how did you update your executive afterward?",
    guidelines: [
      'What was the situation?',
      'What did you do?',
      'What happened as a result?'
    ],
    timeLimit: 120,
    evaluationCriteria: {
      specificity: 'Did they provide a real example of executive-level responsibility?',
      structure: 'Did they demonstrate autonomous decision-making?',
      impact: 'Did they show relationship management and judgment?',
      communication: 'Did they explain how they kept the executive informed?'
    }
  },
  {
    id: 'chief_of_staff',
    level: 'chief_of_staff',
    title: 'Strategy, Systems & Leadership (Chief of Staff Test)',
    question: "Tell me about a time when you had to act as the bridge between leadership and the rest of the team. Maybe you managed budgets, built systems, trained others, or coordinated across departments while your leader focused on growth. What exactly did you own, how did you communicate with both leadership and the team, and what was the result?",
    guidelines: [
      'What was the situation?',
      'What did you do?',
      'What happened as a result?'
    ],
    timeLimit: 120,
    evaluationCriteria: {
      specificity: 'Did they describe strategic-level responsibilities?',
      structure: 'Did they demonstrate systems thinking and leadership?',
      impact: 'Did they show cross-functional coordination and ownership?',
      communication: 'Did they explain bidirectional communication (up and down)?'
    }
  }
]

// ============================================
// EVALUATION SCORING
// ============================================

export type AudioEvaluationScore = {
  specificity: number // 0-5
  structure: number // 0-5
  impact: number // 0-5
  communication: number // 0-5
  overall: number // 0-20
}

export type RoleValidationResult = {
  questionId: string
  level: RoleLevel
  audioUrl: string
  duration: number // actual recording duration in seconds
  transcription?: string // Optional: if you implement transcription
  evaluation: AudioEvaluationScore
  adminNotes?: string
  validated: boolean // Admin marks as validated after review
}

export function calculateOverallRoleLevel(results: RoleValidationResult[]): {
  highestValidatedLevel: RoleLevel | null
  scores: Record<RoleLevel, number>
  recommendation: string
} {
  const scores: Record<RoleLevel, number> = {
    runner: 0,
    admin: 0,
    executive_assistant: 0,
    chief_of_staff: 0
  }

  // Calculate average score for each level
  results.forEach(result => {
    if (result.validated) {
      scores[result.level] = result.evaluation.overall
    }
  })

  // Determine highest validated level (must score >= 12/20)
  const validationThreshold = 12
  let highestValidatedLevel: RoleLevel | null = null

  if (scores.chief_of_staff >= validationThreshold) {
    highestValidatedLevel = 'chief_of_staff'
  } else if (scores.executive_assistant >= validationThreshold) {
    highestValidatedLevel = 'executive_assistant'
  } else if (scores.admin >= validationThreshold) {
    highestValidatedLevel = 'admin'
  } else if (scores.runner >= validationThreshold) {
    highestValidatedLevel = 'runner'
  }

  // Generate recommendation
  let recommendation = ''
  if (highestValidatedLevel === 'chief_of_staff') {
    recommendation = 'Validated for Chief of Staff roles. Demonstrates strategic thinking, systems leadership, and cross-functional coordination.'
  } else if (highestValidatedLevel === 'executive_assistant') {
    recommendation = 'Validated for Executive Assistant roles. Shows autonomous decision-making and executive representation capabilities.'
  } else if (highestValidatedLevel === 'admin') {
    recommendation = 'Validated for Admin/Secretary roles. Demonstrates attention to detail and process management.'
  } else if (highestValidatedLevel === 'runner') {
    recommendation = 'Validated for Runner roles. Shows basic task execution and learning ability.'
  } else {
    recommendation = 'Needs additional validation. Responses did not meet minimum threshold for any role level.'
  }

  return {
    highestValidatedLevel,
    scores,
    recommendation
  }
}

// ============================================
// AUDIO RECORDING CONSTRAINTS
// ============================================

export const AUDIO_CONSTRAINTS = {
  minDuration: 30, // Minimum 30 seconds
  maxDuration: 150, // Maximum 2 minutes 30 seconds
  warningDuration: 120, // Warning at 2 minutes
  mimeType: 'audio/webm;codecs=opus', // Modern browsers
  fallbackMimeType: 'audio/mp4', // Safari fallback
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function getRoleLevelLabel(level: RoleLevel): string {
  const labels: Record<RoleLevel, string> = {
    runner: 'Runner',
    admin: 'Admin / Secretary',
    executive_assistant: 'Executive Assistant',
    chief_of_staff: 'Chief of Staff'
  }
  return labels[level]
}

export function getRoleLevelColor(level: RoleLevel): string {
  const colors: Record<RoleLevel, string> = {
    runner: 'from-green-500 to-teal-600',
    admin: 'from-blue-500 to-indigo-600',
    executive_assistant: 'from-purple-500 to-pink-600',
    chief_of_staff: 'from-orange-500 to-red-600'
  }
  return colors[level]
}

