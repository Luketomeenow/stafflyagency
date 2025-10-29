// ============================================
// COMMUNICATION STYLE QUIZ DATA
// ============================================

export type Axis = 'thinker_feeler' | 'introvert_extrovert'
export type CommunicationStyle = 'driver' | 'analytical' | 'expressive' | 'amiable'

export type QuizQuestion = {
  id: string
  axis: Axis
  question: string
  optionA: {
    text: string
    type: 'thinker' | 'introvert'
    label: string
  }
  optionB: {
    text: string
    type: 'feeler' | 'extrovert'
    label: string
  }
}

export const COMMUNICATION_STYLE_QUESTIONS: QuizQuestion[] = [
  // Thinker vs. Feeler Questions (5)
  {
    id: 'tf1',
    axis: 'thinker_feeler',
    question: 'When making a decision, I usually rely on…',
    optionA: {
      text: 'Logic, facts, and data.',
      type: 'thinker',
      label: 'Thinker'
    },
    optionB: {
      text: 'Emotions, relationships, and people\'s reactions.',
      type: 'feeler',
      label: 'Feeler'
    }
  },
  {
    id: 'tf2',
    axis: 'thinker_feeler',
    question: 'When giving feedback, I…',
    optionA: {
      text: 'Focus on being accurate, even if it\'s blunt.',
      type: 'thinker',
      label: 'Thinker'
    },
    optionB: {
      text: 'Focus on being considerate, even if it softens the truth.',
      type: 'feeler',
      label: 'Feeler'
    }
  },
  {
    id: 'tf3',
    axis: 'thinker_feeler',
    question: 'If I had to prioritize work…',
    optionA: {
      text: 'I would choose based on what is most efficient or logical.',
      type: 'thinker',
      label: 'Thinker'
    },
    optionB: {
      text: 'I would choose based on who needs help the most.',
      type: 'feeler',
      label: 'Feeler'
    }
  },
  {
    id: 'tf4',
    axis: 'thinker_feeler',
    question: 'When under pressure, I tend to…',
    optionA: {
      text: 'Stick to the plan and push through tasks.',
      type: 'thinker',
      label: 'Thinker'
    },
    optionB: {
      text: 'Seek support or reassurance from others.',
      type: 'feeler',
      label: 'Feeler'
    }
  },
  {
    id: 'tf5',
    axis: 'thinker_feeler',
    question: 'When asked to make a tough call…',
    optionA: {
      text: 'I prefer to decide quickly using logic and evidence.',
      type: 'thinker',
      label: 'Thinker'
    },
    optionB: {
      text: 'I prefer to consider everyone\'s feelings before deciding.',
      type: 'feeler',
      label: 'Feeler'
    }
  },
  
  // Introvert vs. Extrovert Questions (5)
  {
    id: 'ie1',
    axis: 'introvert_extrovert',
    question: 'When I need to recharge my energy, I prefer to…',
    optionA: {
      text: 'Spend time alone or in quiet.',
      type: 'introvert',
      label: 'Introvert'
    },
    optionB: {
      text: 'Be around people, socializing or collaborating.',
      type: 'extrovert',
      label: 'Extrovert'
    }
  },
  {
    id: 'ie2',
    axis: 'introvert_extrovert',
    question: 'In meetings, I usually…',
    optionA: {
      text: 'Listen carefully and speak only when I have something solid.',
      type: 'introvert',
      label: 'Introvert'
    },
    optionB: {
      text: 'Jump in quickly and share ideas to keep energy moving.',
      type: 'extrovert',
      label: 'Extrovert'
    }
  },
  {
    id: 'ie3',
    axis: 'introvert_extrovert',
    question: 'When I\'m with new people…',
    optionA: {
      text: 'I take time to warm up before engaging fully.',
      type: 'introvert',
      label: 'Introvert'
    },
    optionB: {
      text: 'I feel comfortable being outgoing right away.',
      type: 'extrovert',
      label: 'Extrovert'
    }
  },
  {
    id: 'ie4',
    axis: 'introvert_extrovert',
    question: 'When solving problems, I prefer…',
    optionA: {
      text: 'Quiet reflection and working alone.',
      type: 'introvert',
      label: 'Introvert'
    },
    optionB: {
      text: 'Brainstorming with others and exchanging ideas.',
      type: 'extrovert',
      label: 'Extrovert'
    }
  },
  {
    id: 'ie5',
    axis: 'introvert_extrovert',
    question: 'My colleagues would describe me as…',
    optionA: {
      text: 'Reserved, thoughtful, focused.',
      type: 'introvert',
      label: 'Introvert'
    },
    optionB: {
      text: 'Outgoing, energetic, engaging.',
      type: 'extrovert',
      label: 'Extrovert'
    }
  }
]

// ============================================
// SCORING & ANALYSIS
// ============================================

export type AxisScore = {
  thinkerCount: number
  feelerCount: number
  introvertCount: number
  extrovertCount: number
  thinkerPercentage: number
  feelerPercentage: number
  introvertPercentage: number
  extrovertPercentage: number
}

export type CommunicationProfile = {
  dominantStyle: CommunicationStyle
  axisScores: AxisScore
  coordinates: {
    x: number // -5 to +5 (Introvert to Extrovert)
    y: number // -5 to +5 (Feeler to Thinker)
  }
  adaptability: 'rigid' | 'moderate' | 'balanced'
  description: string
  traits: string[]
  idealClientMatch: CommunicationStyle
  avoidPairing: CommunicationStyle[]
  workingStyle: string
  strengthsWeaknesses: {
    strengths: string[]
    weaknesses: string[]
  }
}

export function calculateCommunicationProfile(answers: Record<string, 'A' | 'B'>): CommunicationProfile {
  let thinkerCount = 0
  let feelerCount = 0
  let introvertCount = 0
  let extrovertCount = 0

  // Count responses
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = COMMUNICATION_STYLE_QUESTIONS.find(q => q.id === questionId)
    if (!question) return

    if (question.axis === 'thinker_feeler') {
      if (answer === 'A') thinkerCount++
      else feelerCount++
    } else {
      if (answer === 'A') introvertCount++
      else extrovertCount++
    }
  })

  // Calculate percentages
  const thinkerPercentage = (thinkerCount / 5) * 100
  const feelerPercentage = (feelerCount / 5) * 100
  const introvertPercentage = (introvertCount / 5) * 100
  const extrovertPercentage = (extrovertCount / 5) * 100

  // Calculate coordinates (-5 to +5)
  const x = extrovertCount - introvertCount // -5 (Introvert) to +5 (Extrovert)
  const y = thinkerCount - feelerCount // -5 (Feeler) to +5 (Thinker)

  // Determine dominant style (quadrant)
  let dominantStyle: CommunicationStyle
  if (x > 0 && y > 0) {
    dominantStyle = 'driver' // Extrovert + Thinker
  } else if (x < 0 && y > 0) {
    dominantStyle = 'analytical' // Introvert + Thinker
  } else if (x > 0 && y < 0) {
    dominantStyle = 'expressive' // Extrovert + Feeler
  } else {
    dominantStyle = 'amiable' // Introvert + Feeler
  }

  // Assess adaptability
  let adaptability: 'rigid' | 'moderate' | 'balanced'
  const thinkerFeelerSplit = Math.abs(thinkerCount - feelerCount)
  const introvertExtrovertSplit = Math.abs(introvertCount - extrovertCount)
  const avgSplit = (thinkerFeelerSplit + introvertExtrovertSplit) / 2

  if (avgSplit >= 4.5) {
    adaptability = 'rigid' // 5-0 split
  } else if (avgSplit >= 2.5) {
    adaptability = 'moderate' // 4-1 or 3-2 split
  } else {
    adaptability = 'balanced' // Close splits
  }

  // Get profile details
  const profileDetails = getStyleProfile(dominantStyle)

  return {
    dominantStyle,
    axisScores: {
      thinkerCount,
      feelerCount,
      introvertCount,
      extrovertCount,
      thinkerPercentage,
      feelerPercentage,
      introvertPercentage,
      extrovertPercentage
    },
    coordinates: { x, y },
    adaptability,
    ...profileDetails
  }
}

function getStyleProfile(style: CommunicationStyle) {
  const profiles = {
    driver: {
      description: 'Fast, decisive, results-oriented. Drivers are direct communicators who value efficiency and action. They make quick decisions based on logic and push for tangible outcomes.',
      traits: [
        'Direct and assertive',
        'Results-focused',
        'Quick decision-maker',
        'Task-oriented',
        'Confident and decisive',
        'Prefers action over discussion'
      ],
      idealClientMatch: 'amiable' as CommunicationStyle,
      avoidPairing: ['driver', 'analytical'] as CommunicationStyle[],
      workingStyle: 'Thrives in fast-paced environments. Prefers clear goals and autonomy. May come across as blunt but gets things done efficiently.',
      strengthsWeaknesses: {
        strengths: [
          'Excellent at driving projects forward',
          'Clear and direct communication',
          'Makes decisions quickly',
          'High productivity and efficiency'
        ],
        weaknesses: [
          'May overlook emotional considerations',
          'Can be perceived as too blunt',
          'May rush decisions without full input',
          'Risk of power struggles with similar styles'
        ]
      }
    },
    analytical: {
      description: 'Thoughtful, detail-oriented, systematic. Analyticals are careful communicators who value accuracy and thoroughness. They prefer data-driven decisions and need time to process information.',
      traits: [
        'Detail-oriented and precise',
        'Logical and systematic',
        'Prefers written communication',
        'Thorough researcher',
        'Reserved and thoughtful',
        'Values accuracy over speed'
      ],
      idealClientMatch: 'expressive' as CommunicationStyle,
      avoidPairing: ['analytical', 'driver'] as CommunicationStyle[],
      workingStyle: 'Excels in structured environments. Needs clear processes and time for analysis. Prefers working independently with minimal interruptions.',
      strengthsWeaknesses: {
        strengths: [
          'Exceptional attention to detail',
          'Thorough and accurate work',
          'Strong analytical skills',
          'Reliable and consistent'
        ],
        weaknesses: [
          'May overthink decisions',
          'Can be slow to act',
          'May struggle with ambiguity',
          'Risk of over-controlling with similar styles'
        ]
      }
    },
    expressive: {
      description: 'Enthusiastic, people-focused, creative. Expressives are warm communicators who value relationships and collaboration. They energize teams and excel at building connections.',
      traits: [
        'Warm and enthusiastic',
        'People-oriented',
        'Creative and spontaneous',
        'Emotionally expressive',
        'Collaborative team player',
        'Values harmony and connection'
      ],
      idealClientMatch: 'analytical' as CommunicationStyle,
      avoidPairing: ['expressive', 'amiable'] as CommunicationStyle[],
      workingStyle: 'Thrives in collaborative, social environments. Prefers brainstorming and team interaction. May need help staying focused on tasks.',
      strengthsWeaknesses: {
        strengths: [
          'Excellent relationship builder',
          'Strong emotional intelligence',
          'Energizes and motivates teams',
          'Creative problem solver'
        ],
        weaknesses: [
          'May prioritize feelings over facts',
          'Can be easily distracted',
          'May avoid difficult conversations',
          'Risk of over-emotional responses'
        ]
      }
    },
    amiable: {
      description: 'Patient, empathetic, supportive. Amiables are steady communicators who value harmony and understanding. They create stable, trusting relationships and excel at supporting others.',
      traits: [
        'Patient and supportive',
        'Empathetic listener',
        'Conflict-averse',
        'Loyal and dependable',
        'Prefers consensus',
        'Values relationships over tasks'
      ],
      idealClientMatch: 'driver' as CommunicationStyle,
      avoidPairing: ['amiable', 'expressive'] as CommunicationStyle[],
      workingStyle: 'Excels in supportive, low-conflict environments. Needs reassurance and clear expectations. May struggle with confrontation or rapid change.',
      strengthsWeaknesses: {
        strengths: [
          'Exceptional at building trust',
          'Strong team player',
          'Patient and understanding',
          'Creates harmonious work environment'
        ],
        weaknesses: [
          'May avoid necessary conflict',
          'Can be indecisive',
          'May struggle with assertiveness',
          'Risk of being too accommodating'
        ]
      }
    }
  }

  return profiles[style]
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getStyleColor(style: CommunicationStyle): string {
  const colors = {
    driver: 'from-red-500 to-orange-600',
    analytical: 'from-blue-500 to-indigo-600',
    expressive: 'from-green-500 to-teal-600',
    amiable: 'from-purple-500 to-pink-600'
  }
  return colors[style]
}

export function getStyleLabel(style: CommunicationStyle): string {
  const labels = {
    driver: 'Driver',
    analytical: 'Analytical',
    expressive: 'Expressive',
    amiable: 'Amiable'
  }
  return labels[style]
}

export function getAdaptabilityLabel(adaptability: 'rigid' | 'moderate' | 'balanced'): string {
  const labels = {
    rigid: 'Rigid (5-0 split) - May lack flexibility',
    moderate: 'Moderate (4-1 or 3-2 split) - Can adapt when needed',
    balanced: 'Balanced (Close splits) - Highly adaptable'
  }
  return labels[adaptability]
}

export function getIdealMatchDescription(candidateStyle: CommunicationStyle, matchStyle: CommunicationStyle): string {
  const descriptions: Record<string, string> = {
    'driver-amiable': 'Driver + Amiable = Perfect balance. Driver pushes for results while Amiable provides patience and empathy, creating stability.',
    'analytical-expressive': 'Analytical + Expressive = Complementary strengths. Analytical provides structure while Expressive brings energy and creativity.',
    'expressive-analytical': 'Expressive + Analytical = Dynamic duo. Expressive energizes while Analytical grounds with data and process.',
    'amiable-driver': 'Amiable + Driver = Harmonious partnership. Amiable supports and stabilizes while Driver drives action and results.'
  }
  return descriptions[`${candidateStyle}-${matchStyle}`] || 'Complementary communication styles that balance each other\'s strengths.'
}

// ============================================
// RED FLAGS
// ============================================

export type RedFlag = {
  type: 'extreme_scores' | 'inconsistent' | 'gaming'
  severity: 'low' | 'medium' | 'high'
  description: string
}

export function detectRedFlags(profile: CommunicationProfile): RedFlag[] {
  const flags: RedFlag[] = []

  // Extreme scores (5-0 on both axes)
  if (
    (profile.axisScores.thinkerCount === 5 || profile.axisScores.feelerCount === 5) &&
    (profile.axisScores.introvertCount === 5 || profile.axisScores.extrovertCount === 5)
  ) {
    flags.push({
      type: 'extreme_scores',
      severity: 'high',
      description: 'Candidate scored 5-0 on both axes, indicating potential lack of adaptability or gaming the test.'
    })
  }

  // Single axis extreme
  if (
    profile.axisScores.thinkerCount === 5 || 
    profile.axisScores.feelerCount === 5 ||
    profile.axisScores.introvertCount === 5 || 
    profile.axisScores.extrovertCount === 5
  ) {
    flags.push({
      type: 'extreme_scores',
      severity: 'medium',
      description: 'Candidate scored 5-0 on one axis, suggesting rigid communication style or test gaming.'
    })
  }

  return flags
}

