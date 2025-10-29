import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { 
  COMMUNICATION_STYLE_QUESTIONS,
  calculateCommunicationProfile,
  getStyleColor,
  getStyleLabel,
  getAdaptabilityLabel,
  type QuizQuestion 
} from '../data/communicationStyleQuiz'
import { supabase } from '../lib/supabase'
import { getCandidateSession } from '../lib/candidateAuth'

type CommunicationStyleQuizProps = {
  isOpen: boolean
  onClose: () => void
  onComplete: (completed: boolean) => void
}

export function CommunicationStyleQuiz({ isOpen, onClose, onComplete }: CommunicationStyleQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B'>>({})
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentQuestion = COMMUNICATION_STYLE_QUESTIONS[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / COMMUNICATION_STYLE_QUESTIONS.length) * 100
  const isLastQuestion = currentQuestionIndex === COMMUNICATION_STYLE_QUESTIONS.length - 1

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0)
      setAnswers({})
      setSelectedOption(null)
      setError(null)
    }
  }, [isOpen])

  // Restore previous answer when navigating back
  useEffect(() => {
    const previousAnswer = answers[currentQuestion.id]
    setSelectedOption(previousAnswer || null)
  }, [currentQuestionIndex, currentQuestion.id, answers])

  const handleOptionSelect = (option: 'A' | 'B') => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    if (!selectedOption) {
      setError('Please select an option before continuing.')
      return
    }

    setError(null)
    
    // Save answer
    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption }
    setAnswers(newAnswers)

    if (isLastQuestion) {
      submitQuiz(newAnswers)
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedOption(null)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setError(null)
    }
  }

  const submitQuiz = async (finalAnswers: Record<string, 'A' | 'B'>) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Calculate profile
      const profile = calculateCommunicationProfile(finalAnswers)

      // Get current user session
      const session = await getCandidateSession()
      if (!session?.user) {
        throw new Error('No authenticated user found')
      }

      // Get candidate ID
      const { data: candidateData, error: candidateError } = await supabase
        ?.from('candidates')
        .select('id')
        .eq('user_id', session.user.id)
        .single()

      if (candidateError) throw candidateError
      if (!candidateData) throw new Error('Candidate profile not found')

      // Save quiz result to database
      const { error: insertError } = await supabase
        ?.from('quiz_results')
        .insert({
          candidate_id: candidateData.id,
          user_id: session.user.id,
          quiz_type: 'communication',
          quiz_version: 'v1',
          raw_score: 0, // Not applicable for this quiz
          max_score: 0,
          percentage: 0,
          answers: finalAnswers,
          profile_result: {
            dominantStyle: profile.dominantStyle,
            coordinates: profile.coordinates,
            axisScores: profile.axisScores,
            adaptability: profile.adaptability,
            traits: profile.traits,
            idealClientMatch: profile.idealClientMatch,
            avoidPairing: profile.avoidPairing
          },
          status: 'completed',
          time_taken_seconds: 0
        })

      if (insertError) throw insertError

      // Update candidate's communication_style field
      const { error: updateError } = await supabase
        ?.from('candidates')
        .update({ communication_style: profile.dominantStyle })
        .eq('id', candidateData.id)

      if (updateError) throw updateError

      // Success!
      onComplete(true)
      onClose()
    } catch (err: any) {
      console.error('Error submitting quiz:', err)
      setError(err.message || 'Failed to submit quiz. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isSubmitting) {
            onClose()
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 md:p-8">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Close quiz"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Communication Style Assessment</h2>
                <p className="text-indigo-100 text-sm md:text-base">Question {currentQuestionIndex + 1} of {COMMUNICATION_STYLE_QUESTIONS.length}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start"
              >
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}

            {/* Info Banner */}
            <div className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-4 md:p-6">
              <p className="text-sm md:text-base text-slate-700">
                <strong className="text-indigo-700">Remember:</strong> There are no right or wrong answers. Choose the option that feels most natural to you. This helps us understand your communication style and pair you with compatible clients.
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Question */}
                <div className="mb-8">
                  <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-xs md:text-sm font-semibold rounded-full mb-4">
                    {currentQuestion.axis === 'thinker_feeler' ? 'Thinker ↔ Feeler' : 'Introvert ↔ Extrovert'}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    {currentQuestion.question}
                  </h3>
                  <p className="text-sm text-slate-600">Choose the option that best describes you:</p>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  {/* Option A */}
                  <motion.button
                    onClick={() => handleOptionSelect('A')}
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`w-full text-left p-6 md:p-8 rounded-2xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedOption === 'A'
                        ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-[1.02]'
                        : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        selectedOption === 'A'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        A
                      </div>
                      <div className="flex-1">
                        <p className="text-base md:text-lg text-slate-900 font-medium mb-2">
                          {currentQuestion.optionA.text}
                        </p>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedOption === 'A'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {currentQuestion.optionA.label}
                        </div>
                      </div>
                      {selectedOption === 'A' && (
                        <CheckCircle className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>

                  {/* Option B */}
                  <motion.button
                    onClick={() => handleOptionSelect('B')}
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`w-full text-left p-6 md:p-8 rounded-2xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedOption === 'B'
                        ? 'border-purple-600 bg-purple-50 shadow-lg scale-[1.02]'
                        : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        selectedOption === 'B'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        B
                      </div>
                      <div className="flex-1">
                        <p className="text-base md:text-lg text-slate-900 font-medium mb-2">
                          {currentQuestion.optionB.text}
                        </p>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedOption === 'B'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {currentQuestion.optionB.label}
                        </div>
                      </div>
                      {selectedOption === 'B' && (
                        <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 p-6 md:p-8 bg-slate-50">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0 || isSubmitting}
                className="px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!selectedOption || isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>{isLastQuestion ? 'Complete Assessment' : 'Next Question'}</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

