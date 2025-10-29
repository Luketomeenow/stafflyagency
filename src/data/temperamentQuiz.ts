// ============================================
// TEMPERAMENT QUIZ DATA
// ============================================

export type QuizOption = {
  id: string
  text: string
  points: number // 0 = Neutral, 1 = Donkey, 2 = Mule, 3 = Horse
  reasoning: string // The emotional reasoning behind the choice
}

export type QuizQuestion = {
  id: string
  scenario: string
  options: QuizOption[]
}

export const TEMPERAMENT_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    scenario: "It's 9:00 AM. Your founder is on a sales call. You have 3 unread Slack messages, 2 urgent emails, a client asking for a proposal revision, and a calendar invite conflict for this afternoon. What do you do first?",
    options: [
      {
        id: 'a',
        text: "Wait for the founder to finish their call and ask them what to prioritize.",
        points: 1,
        reasoning: "I don't want to make the wrong choice and upset anyone."
      },
      {
        id: 'b',
        text: "Quickly scan everything, flag the urgent items, and start resolving the calendar conflict while drafting a priority list.",
        points: 3,
        reasoning: "I can assess urgency and act without needing permission for obvious tasks."
      },
      {
        id: 'c',
        text: "Reply to the Slack messages first since they're probably time-sensitive, then check the emails.",
        points: 2,
        reasoning: "I'll handle what I can confidently, then ask about the rest."
      },
      {
        id: 'd',
        text: "Feel overwhelmed and start with whatever seems easiest to avoid making a mistake.",
        points: 0,
        reasoning: "There's too much happening at once and I'm not sure where to start."
      }
    ]
  },
  {
    id: 'q2',
    scenario: "A client emails saying they're 'disappointed' with the last deliverable but doesn't specify what's wrong. Your founder is unavailable for 3 hours. The client expects a response today. What do you do?",
    options: [
      {
        id: 'a',
        text: "Forward the email to the founder and wait for their guidance before responding.",
        points: 1,
        reasoning: "I don't want to say the wrong thing and make it worse."
      },
      {
        id: 'b',
        text: "Reply immediately: 'Thank you for your feedback. Can you help me understand which specific areas fell short so we can address them right away?'",
        points: 3,
        reasoning: "I can handle ambiguity, de-escalate, and gather information to solve this."
      },
      {
        id: 'c',
        text: "Draft a polite response asking for clarification, save it, and send it to the founder for approval before replying.",
        points: 2,
        reasoning: "I want to act, but I'd feel safer getting approval first."
      },
      {
        id: 'd',
        text: "Panic slightly and re-read the email multiple times, unsure how to respond without more context.",
        points: 0,
        reasoning: "I'm not confident handling upset clients without clear direction."
      }
    ]
  },
  {
    id: 'q3',
    scenario: "Your founder mentions in passing: 'We should really update the client onboarding process.' They don't give you a deadline or specific instructions. What do you do?",
    options: [
      {
        id: 'a',
        text: "Add it to a task list and wait for them to bring it up again with more details.",
        points: 1,
        reasoning: "I don't want to overstep or waste time on something that might not be urgent."
      },
      {
        id: 'b',
        text: "Immediately draft a proposed onboarding workflow, flag gaps, and send it to them with a note: 'Here's a starting point—let me know what you'd like adjusted.'",
        points: 3,
        reasoning: "I take initiative and create solutions without needing hand-holding."
      },
      {
        id: 'c',
        text: "Ask them: 'Should I prioritize this now? What would you like included in the update?'",
        points: 2,
        reasoning: "I want to act, but I need a bit more clarity before diving in."
      },
      {
        id: 'd',
        text: "Feel unsure about what 'update' means and avoid starting until they give clearer instructions.",
        points: 0,
        reasoning: "I need more structure and direction to feel confident taking action."
      }
    ]
  },
  {
    id: 'q4',
    scenario: "You're managing the founder's inbox. You see an email from a potential investor asking for a meeting 'this week if possible.' The founder's calendar is packed. What do you do?",
    options: [
      {
        id: 'a',
        text: "Forward the email to the founder and let them decide how to handle it.",
        points: 1,
        reasoning: "This feels too important for me to make a call on my own."
      },
      {
        id: 'b',
        text: "Check the founder's priorities, move a lower-priority meeting, and reply with 2-3 available time slots, CCing the founder.",
        points: 3,
        reasoning: "I understand what's revenue-critical and can make judgment calls."
      },
      {
        id: 'c',
        text: "Reply to the investor: 'Let me check availability and get back to you shortly,' then confirm with the founder before booking.",
        points: 2,
        reasoning: "I want to respond quickly but get approval before committing their time."
      },
      {
        id: 'd',
        text: "Feel stressed about making the wrong choice and delay responding until the founder is available.",
        points: 0,
        reasoning: "I'm not comfortable making decisions about their schedule without explicit permission."
      }
    ]
  },
  {
    id: 'q5',
    scenario: "A vendor sends an invoice that's 20% higher than expected. Your founder is traveling and hard to reach. The payment is due in 2 days. What do you do?",
    options: [
      {
        id: 'a',
        text: "Wait for the founder to return and let them handle it—I don't want to question the vendor incorrectly.",
        points: 1,
        reasoning: "This feels like a financial decision I shouldn't make alone."
      },
      {
        id: 'b',
        text: "Email the vendor immediately: 'Hi, I noticed the invoice is higher than our agreed rate of $X. Can you clarify the difference? Happy to process once confirmed.'",
        points: 3,
        reasoning: "I can spot discrepancies, ask the right questions, and protect the business."
      },
      {
        id: 'c',
        text: "Flag the invoice, send a quick message to the founder ('Invoice is higher than expected—should I pay or question it?'), and wait for their response.",
        points: 2,
        reasoning: "I want to act but prefer confirmation before engaging the vendor."
      },
      {
        id: 'd',
        text: "Feel uncertain about whether this is normal and avoid taking action until the founder clarifies.",
        points: 0,
        reasoning: "I'm not confident handling financial discrepancies without guidance."
      }
    ]
  },
  {
    id: 'q6',
    scenario: "Your founder says: 'I need a report on Q1 performance by end of week.' It's Wednesday. They didn't specify what metrics to include. What do you do?",
    options: [
      {
        id: 'a',
        text: "Ask them: 'What specific metrics would you like me to include in the report?'",
        points: 1,
        reasoning: "I don't want to guess and create the wrong thing."
      },
      {
        id: 'b',
        text: "Pull revenue, client acquisition, retention, and key project milestones, format it clearly, and send a draft: 'Here's a starting point—let me know what else you'd like added.'",
        points: 3,
        reasoning: "I know what matters in business and can create a solid first draft without hand-holding."
      },
      {
        id: 'c',
        text: "Draft a quick outline of what I think should be included and send it for approval before building the full report.",
        points: 2,
        reasoning: "I want to move forward but prefer validation before investing too much time."
      },
      {
        id: 'd',
        text: "Feel unsure about what 'performance' means and wait for them to provide more details.",
        points: 0,
        reasoning: "I need clearer instructions to feel confident starting."
      }
    ]
  },
  {
    id: 'q7',
    scenario: "A client texts your founder at 11:00 PM asking for an urgent update on their project. Your founder is asleep. You have access to the project status. What do you do?",
    options: [
      {
        id: 'a',
        text: "Leave it for the founder to handle in the morning—I don't want to overstep.",
        points: 1,
        reasoning: "I'm not comfortable responding to clients without explicit permission."
      },
      {
        id: 'b',
        text: "Reply immediately: 'Hi [Client], I have access to the project status. Here's where we're at: [brief update]. [Founder] will follow up with more details in the morning if needed.'",
        points: 3,
        reasoning: "I can handle client communication confidently and protect my founder's time."
      },
      {
        id: 'c',
        text: "Reply: 'Thanks for reaching out. Let me check on this and get back to you first thing in the morning,' then update the founder.",
        points: 2,
        reasoning: "I want to acknowledge the client but prefer the founder to provide the actual update."
      },
      {
        id: 'd',
        text: "Feel anxious about responding without permission and leave it unread until morning.",
        points: 0,
        reasoning: "I'm not confident handling client communication independently."
      }
    ]
  },
  {
    id: 'q8',
    scenario: "Your founder is about to join a pitch call but doesn't have the latest proposal deck. You realize it's still in draft form with missing sections. The call starts in 10 minutes. What do you do?",
    options: [
      {
        id: 'a',
        text: "Panic and tell the founder the deck isn't ready—they'll have to reschedule or wing it.",
        points: 1,
        reasoning: "I don't know how to fix this quickly and don't want to make it worse."
      },
      {
        id: 'b',
        text: "Quickly fill in the missing sections with placeholder content, polish the formatting, and send it with a note: 'Deck is ready. I filled in [X sections]—let me know if you need tweaks post-call.'",
        points: 3,
        reasoning: "I thrive under pressure and can make fast, smart decisions to save the situation."
      },
      {
        id: 'c',
        text: "Send the draft as-is and let the founder know which sections are incomplete so they can adjust on the fly.",
        points: 2,
        reasoning: "I want to help but don't feel confident making content decisions without approval."
      },
      {
        id: 'd',
        text: "Freeze and feel overwhelmed by the time pressure, unsure what to do.",
        points: 0,
        reasoning: "I struggle to think clearly under tight deadlines."
      }
    ]
  },
  {
    id: 'q9',
    scenario: "Your founder mentions they're frustrated with how disorganized their task management system is but doesn't ask you to fix it. What do you do?",
    options: [
      {
        id: 'a',
        text: "Acknowledge their frustration but wait for them to ask me to help before taking action.",
        points: 1,
        reasoning: "I don't want to overstep or waste time on something they might not want changed."
      },
      {
        id: 'b',
        text: "Audit their current system, research better tools, build a new workflow, and present it: 'I reorganized your task system—here's how it works. Let me know if you'd like adjustments.'",
        points: 3,
        reasoning: "I see problems and fix them proactively without needing to be asked."
      },
      {
        id: 'c',
        text: "Ask them: 'Would you like me to take a look at your task system and suggest improvements?'",
        points: 2,
        reasoning: "I want to help but prefer to get permission before diving in."
      },
      {
        id: 'd',
        text: "Feel unsure about whether they want me to act and avoid doing anything without clearer direction.",
        points: 0,
        reasoning: "I need explicit instructions before taking initiative."
      }
    ]
  },
  {
    id: 'q10',
    scenario: "A high-value lead fills out a contact form on the website at 6:00 PM (after business hours). Your founder is offline. The lead says they're evaluating 3 vendors and need a response by tomorrow morning. What do you do?",
    options: [
      {
        id: 'a',
        text: "Leave it for the founder to handle in the morning—I don't want to say the wrong thing to a high-value lead.",
        points: 1,
        reasoning: "This feels too important for me to respond without the founder's input."
      },
      {
        id: 'b',
        text: "Reply immediately: 'Hi [Lead], thanks for reaching out! I've flagged your inquiry as high-priority. [Founder] will reach out first thing tomorrow with a tailored proposal. In the meantime, here's a quick overview of how we can help: [brief pitch].'",
        points: 3,
        reasoning: "I understand urgency, can represent the business confidently, and won't let a lead go cold."
      },
      {
        id: 'c',
        text: "Reply: 'Thanks for your inquiry! I'll make sure [Founder] reaches out to you first thing in the morning,' and leave it at that.",
        points: 2,
        reasoning: "I want to acknowledge them quickly but prefer the founder to handle the pitch."
      },
      {
        id: 'd',
        text: "Feel nervous about responding to a high-value lead and wait for the founder to handle it.",
        points: 0,
        reasoning: "I'm not confident representing the business without explicit guidance."
      }
    ]
  }
]

// ============================================
// SCORING LOGIC
// ============================================

export type TemperamentProfile = {
  type: 'Donkey' | 'Mule' | 'Developing Horse' | 'Strong Horse'
  score: number
  maxScore: number
  description: string
  traits: string[]
  developmentAreas?: string[]
}

export function calculateTemperamentProfile(totalScore: number): TemperamentProfile {
  const maxScore = 30

  if (totalScore >= 27) {
    return {
      type: 'Strong Horse',
      score: totalScore,
      maxScore,
      description: 'Autonomous, proactive, thrives in chaos, and demonstrates leadership potential. This candidate can anticipate needs, make confident decisions, and handle ambiguity with ease.',
      traits: [
        'Proactive problem-solver',
        'Confident decision-maker',
        'Thrives under pressure',
        'Anticipates needs',
        'Strong communication skills',
        'Leadership potential'
      ]
    }
  } else if (totalScore >= 20) {
    return {
      type: 'Developing Horse',
      score: totalScore,
      maxScore,
      description: 'Shows proactive tendencies but may hesitate in ambiguous situations. With proper guidance and experience, this candidate has strong potential to become a Strong Horse.',
      traits: [
        'Shows initiative',
        'Good problem-solving skills',
        'Reliable executor',
        'Growing confidence',
        'Needs occasional guidance'
      ],
      developmentAreas: [
        'Building confidence in ambiguous situations',
        'Reducing approval-seeking behavior',
        'Strengthening autonomous decision-making'
      ]
    }
  } else if (totalScore >= 11) {
    return {
      type: 'Mule',
      score: totalScore,
      maxScore,
      description: 'Steady and reliable executor who makes cautious progress and seeks approval. This candidate is dependable but may require more direction and confidence-building.',
      traits: [
        'Reliable and steady',
        'Follows instructions well',
        'Detail-oriented',
        'Cautious approach',
        'Seeks validation'
      ],
      developmentAreas: [
        'Building confidence to act independently',
        'Reducing reliance on approval',
        'Developing proactive problem-solving',
        'Improving decision-making speed'
      ]
    }
  } else {
    return {
      type: 'Donkey',
      score: totalScore,
      maxScore,
      description: 'Reactive and heavily dependent on guidance. This candidate tends to avoid responsibility, wait for direction, and may be fearful of making mistakes. Significant development needed.',
      traits: [
        'Waits for direction',
        'Avoids responsibility',
        'Fearful of mistakes',
        'Struggles with ambiguity',
        'Needs constant guidance'
      ],
      developmentAreas: [
        'Building basic confidence',
        'Developing initiative',
        'Overcoming fear of mistakes',
        'Learning to handle pressure',
        'Improving communication skills'
      ]
    }
  }
}

