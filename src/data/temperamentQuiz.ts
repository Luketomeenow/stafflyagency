export interface TemperamentQuestion {
  id: string;
  scenario: string;
  options: {
    A: { text: string; score: number; type: 'Donkey' };
    B: { text: string; score: number; type: 'Mule' };
    C: { text: string; score: number; type: 'Horse' };
    D: { text: string; score: number; type: 'Neutral' };
  };
}

export type QuizQuestion = TemperamentQuestion;

export type QuizOption = {
  id: string;
  text: string;
  score: number;
  type: 'Donkey' | 'Mule' | 'Horse' | 'Neutral';
};

export const temperamentQuestions: TemperamentQuestion[] = [
  {
    id: 'tq1',
    scenario: 'Your client messages you at 9:30 AM with the following:\n\n"Can you help me with these today?\n– Update the CRM with yesterday\'s notes (some calls might be missing).\n– Draft a follow-up email to the client I spoke with this morning who wants a proposal tomorrow.\n– Schedule the Friday team meeting (check everyone\'s calendars).\n– Research 3 vendors for automation software (pricing options).\n– Create a quick report on last week\'s sales numbers and email it to me by end of day."\n\nNo priorities or deadlines are listed, and your client doesn\'t reply when you ask for clarification.',
    options: {
      A: { 
        text: 'I\'d hold off until I get more direction because I\'d feel uneasy about doing the wrong thing. I\'d reply: "I got your list — can you tell me what to start with first when you\'re back?"', 
        score: 1, 
        type: 'Donkey' 
      },
      B: { 
        text: 'I\'d feel a little nervous about choosing wrong, so I\'d start with something straightforward like scheduling or CRM, just so progress is being made. I\'d message: "I scheduled the meeting and updated CRM while waiting for clarity on the rest."', 
        score: 2, 
        type: 'Mule' 
      },
      C: { 
        text: 'I\'d feel confident separating urgent tasks from routine ones. I\'d draft the follow-up and begin the sales report, since those seem most time-sensitive. I\'d message: "I worked on the follow-up and report first. Next, I\'ll move to scheduling and vendor research unless you prefer differently."', 
        score: 3, 
        type: 'Horse' 
      },
      D: { 
        text: 'I\'d feel stuck and a bit overwhelmed by so many requests at once. I\'d reply: "I\'m not sure which is the priority, so I\'ll wait until you\'re available."', 
        score: 0, 
        type: 'Neutral' 
      },
    },
  },
  {
    id: 'tq2',
    scenario: 'You complete your assigned work by mid-afternoon, but your client hasn\'t checked in all day. You see open threads in email, Slack, and the project board. Some are minor (e.g., updating contact info), and some could be impactful (e.g., missing invoice for a big client).',
    options: {
      A: { 
        text: 'I\'d log off and wait until the client assigns something new. Honestly, I\'d feel it\'s safer not to touch things they didn\'t tell me to do.', 
        score: 1, 
        type: 'Donkey' 
      },
      B: { 
        text: 'I\'d feel a little anxious about leaving things undone, so I\'d continue with smaller admin items and message: "I updated the contact list while waiting for your guidance."', 
        score: 2, 
        type: 'Mule' 
      },
      C: { 
        text: 'I\'d feel confident taking initiative and would call or voice note: "I wrapped up today\'s list and checked the invoice thread. I started prepping it so we don\'t miss anything — I\'ll finalize once you confirm."', 
        score: 3, 
        type: 'Horse' 
      },
      D: { 
        text: 'I\'d feel unsure what counts as important, so I\'d reply: "I\'m done but don\'t know if I should keep going — do you want me to stop here?"', 
        score: 0, 
        type: 'Neutral' 
      },
    },
  },
  {
    id: 'tq3',
    scenario: 'Your client adds you to a new project management tool with no instructions except: "Start using this for tracking." The boards are messy, with overdue tasks and unclear ownership.',
    options: {
      A: { 
        text: 'I\'d feel nervous about breaking something, so I\'d wait for my client to explain. "I saw the tool but I\'ll wait for you to show me how you want me to use it."', 
        score: 1, 
        type: 'Donkey' 
      },
      B: { 
        text: 'I\'d feel curious but cautious. I\'d explore a little, then stop if I get stuck: "I started checking the tool, but I\'ll need your guidance before I can continue."', 
        score: 2, 
        type: 'Mule' 
      },
      C: { 
        text: 'I\'d feel comfortable diving in and learning. I\'d research tutorials, test features, and message: "I organized the overdue tasks and drafted a tracking board. Let me know if you\'d like adjustments."', 
        score: 3, 
        type: 'Horse' 
      },
      D: { 
        text: 'I\'d feel hesitant and ignore the tool until my client directly assigns me something inside it.', 
        score: 0, 
        type: 'Neutral' 
      },
    },
  },
  {
    id: 'tq4',
    scenario: 'At 4:00 PM, your client emails: "I need these three things done ASAP — receipts organized, a thank-you email to a partner, and a draft report for tomorrow\'s meeting." They don\'t say which comes first.',
    options: {
      A: { 
        text: 'I\'d feel uncomfortable choosing wrong, so I\'d reply: "Got your list — which one should I prioritize?" and wait.', 
        score: 1, 
        type: 'Donkey' 
      },
      B: { 
        text: 'I\'d feel better doing something concrete, so I\'d start with receipts and check in: "I began with receipts — should I do the email or report next?"', 
        score: 2, 
        type: 'Mule' 
      },
      C: { 
        text: 'I\'d feel confident assuming time-sensitivity, so I\'d do the report and partner email first. I\'d reply: "I finished the report and email and will handle receipts next unless you\'d like a different order."', 
        score: 3, 
        type: 'Horse' 
      },
      D: { 
        text: 'I\'d feel overwhelmed because they all sound urgent. I\'d reply: "Not sure where to begin — can you confirm the order?"', 
        score: 0, 
        type: 'Neutral' 
      },
    },
  },
  {
    id: 'tq5',
    scenario: 'A vendor calls saying they can\'t access your client\'s shared system. Your client is in a board meeting for three hours.',
    options: {
      A: { 
        text: 'I\'d feel safer not to interfere, so I\'d forward the issue and wait until my client is free.', 
        score: 1, 
        type: 'Donkey' 
      },
      B: { 
        text: 'I\'d feel like I should show initiative, but still cautious. I\'d ping my client mid-meeting: "Vendor can\'t access the system — should I hold this for you?"', 
        score: 2, 
        type: 'Mule' 
      },
      C: { 
        text: 'I\'d feel confident handling it myself. I\'d troubleshoot with the vendor, test access, then update my client: "Vendor issue resolved — they\'re logged in now. Here\'s what I did."', 
        score: 3, 
        type: 'Horse' 
      },
      D: { 
        text: 'I\'d feel stuck and tell the vendor: "You\'ll have to wait until my client is available."', 
        score: 0, 
        type: 'Neutral' 
      },
    },
  },
  {
    id: 'tq6',
    scenario: 'Your client hasn\'t replied for 24 hours. You have open tasks: a client presentation, booking travel, and updating a report. Some require decisions you don\'t have answers for.',
    options: {
      A: { 
        text: 'I\'d feel nervous about making mistakes, so I\'d stop until my client replies.', 
        score: 1, 
        type: 'Donkey' 
      },
      B: { 
        text: 'I\'d feel cautious but still want to help, so I\'d do low-risk items and message: "I worked on the report while waiting for your input on travel and presentation."', 
        score: 2, 
        type: 'Mule' 
      },
      C: { 
        text: 'I\'d feel confident pushing forward. I\'d finish the report, draft slides, and leave options for travel. I\'d leave a voice note: "Here\'s what I completed, here\'s where I need your decision."', 
        score: 3, 
        type: 'Horse' 
      },
      D: { 
        text: 'I\'d feel stuck and reply: "I don\'t know what to do without your feedback — should I hold off?"', 
        score: 0, 
        type: 'Neutral' 
      },
    },
  },
  {
    id: 'tq7',
    scenario: 'A customer emails your client directly with a question about a product. Your client is traveling and unreachable, but you know the answer.',
    options: {
      A: { 
        text: 'I\'d feel worried about saying the wrong thing, so I\'d just forward the email to my client and leave it.', 
        score: 1, 
        type: 'Donkey' 
      },
      B: { 
        text: 'I\'d feel cautious but helpful, so I\'d draft a reply and ask: "Here\'s a draft — should I send it?"', 
        score: 2, 
        type: 'Mule' 
      },
      C: { 
        text: 'I\'d feel confident answering right away. I\'d reply to the customer, copy my client, and then message: "I responded so they weren\'t left waiting — details are in the thread."', 
        score: 3, 
        type: 'Horse' 
      },
      D: { 
        text: 'I\'d feel uncertain about overstepping, so I\'d tell the customer: "You\'ll need to wait until my client returns."', 
        score: 0, 
        type: 'Neutral' 
      },
    },
  },
  {
    id: 'tq8',
    scenario: 'Your client says: "From now on, you own weekly reporting. I don\'t want to think about it anymore." They don\'t explain further.',
    options: {
      A: { 
        text: 'I\'d feel safer waiting for reminders: "Do you want me to run the report this week?"', 
        score: 1, 
        type: 'Donkey' 
      },
      B: { 
        text: 'I\'d feel cautious about getting it wrong, so I\'d prepare it weekly but still ask: "Here\'s this week\'s report — is it okay to send?"', 
        score: 2, 
        type: 'Mule' 
      },
      C: { 
        text: 'I\'d feel confident owning it. I\'d set reminders, automate parts, and message: "Report is complete and already sent. I\'ll flag you only if I see something unusual."', 
        score: 3, 
        type: 'Horse' 
      },
      D: { 
        text: 'I\'d feel unsure without clear instructions and just wait until my client brings it up again.', 
        score: 0, 
        type: 'Neutral' 
      },
    },
  },
  {
    id: 'tq9',
    scenario: 'You\'re balancing multiple deadlines when a new urgent task arrives from another department. Your client is unavailable.',
    options: {
      A: { 
        text: 'I\'d feel anxious about messing up priorities, so I\'d pause everything until my client clarifies.', 
        score: 1, 
        type: 'Donkey' 
      },
      B: { 
        text: 'I\'d feel cautious and keep my current focus, but flag: "Another urgent item came in — should I adjust?"', 
        score: 2, 
        type: 'Mule' 
      },
      C: { 
        text: 'I\'d feel confident reshuffling priorities. I\'d do the urgent task first and update: "I adjusted the schedule so deadlines are still met — here\'s the new plan."', 
        score: 3, 
        type: 'Horse' 
      },
      D: { 
        text: 'I\'d feel overwhelmed and ignore the urgent task until I finish what I was already working on.', 
        score: 0, 
        type: 'Neutral' 
      },
    },
  },
  {
    id: 'tq10',
    scenario: 'Your client says: "I need you to fully own this recurring process from now on." They don\'t give details on how to handle exceptions.',
    options: {
      A: { 
        text: 'I\'d feel safer asking each time: "Do you want me to run this now?"', 
        score: 1, 
        type: 'Donkey' 
      },
      B: { 
        text: 'I\'d feel cautious about final mistakes, so I\'d do it regularly but always send drafts for approval.', 
        score: 2, 
        type: 'Mule' 
      },
      C: { 
        text: 'I\'d feel confident taking ownership. I\'d clarify expectations once, then message: "I\'ll handle this automatically each week and notify you only if something unusual comes up."', 
        score: 3, 
        type: 'Horse' 
      },
      D: { 
        text: 'I\'d feel hesitant without details and just wait until they assign it again.', 
        score: 0, 
        type: 'Neutral' 
      },
    },
  },
];

export const calculateTemperamentScore = (answers: Record<string, 'A' | 'B' | 'C' | 'D'>) => {
  let totalScore = 0;
  const typeScores = {
    Donkey: 0,
    Mule: 0,
    Horse: 0,
    Neutral: 0,
  };

  temperamentQuestions.forEach((question) => {
    const selectedOption = answers[question.id];
    if (selectedOption) {
      const option = question.options[selectedOption];
      totalScore += option.score;
      typeScores[option.type]++;
    }
  });

  // Determine dominant temperament type
  let dominantType: 'Donkey' | 'Mule' | 'Horse' | 'Neutral' = 'Neutral';
  let maxCount = typeScores.Neutral;

  if (typeScores.Horse > maxCount) {
    dominantType = 'Horse';
    maxCount = typeScores.Horse;
  }
  if (typeScores.Mule > maxCount) {
    dominantType = 'Mule';
    maxCount = typeScores.Mule;
  }
  if (typeScores.Donkey > maxCount) {
    dominantType = 'Donkey';
    maxCount = typeScores.Donkey;
  }

  // Get profile description
  let profile = {
    type: dominantType,
    score: totalScore,
    maxScore: 30,
    description: '',
    traits: [] as string[],
  };

  switch (dominantType) {
    case 'Horse':
      profile.description = 'Proactive, confident, and takes initiative. You excel at independent decision-making and problem-solving.';
      profile.traits = [
        'Takes ownership of tasks',
        'Confident in decision-making',
        'Proactive problem solver',
        'Comfortable with ambiguity',
        'Strong initiative',
      ];
      break;
    case 'Mule':
      profile.description = 'Cautious but helpful. You balance initiative with seeking guidance, showing progress while maintaining communication.';
      profile.traits = [
        'Balances independence and guidance',
        'Shows consistent progress',
        'Communicates regularly',
        'Thoughtful in approach',
        'Seeks clarification when needed',
      ];
      break;
    case 'Donkey':
      profile.description = 'Task-oriented and follows direction closely. You prefer clear instructions and wait for guidance before acting.';
      profile.traits = [
        'Follows instructions carefully',
        'Values clear direction',
        'Risk-averse approach',
        'Waits for confirmation',
        'Prefers structured tasks',
      ];
      break;
    case 'Neutral':
      profile.description = 'Mixed responses or overwhelmed by scenarios. You may need additional support in developing decision-making confidence.';
      profile.traits = [
        'Uncertain in decision-making',
        'May feel overwhelmed',
        'Needs clearer structure',
        'Developing confidence',
        'Benefits from mentorship',
      ];
      break;
  }

  return {
    rawScore: totalScore,
    maxScore: 30,
    percentage: (totalScore / 30) * 100,
    profile,
    typeBreakdown: typeScores,
  };
};

// Alias exports for backward compatibility
export const TEMPERAMENT_QUIZ = temperamentQuestions;
export const calculateTemperamentProfile = calculateTemperamentScore;
