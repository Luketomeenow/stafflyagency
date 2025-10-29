import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { TEMPERAMENT_QUIZ, calculateTemperamentProfile, type QuizQuestion, type QuizOption } from '../data/temperamentQuiz'
import { supabase } from '../lib/supabase'
import { getCandidateSession } from '../lib/candidateAuth'

type TemperamentQuizProps = {
  isOpen: boolean
  onClose: () => void
  onComplete: (completed: boolean) => void
}

type Answer = {
  questionId: string
  selectedOptionId: string
  points: number
}

export function TemperamentQuiz({ isOpen, onClose, onComplete }: TemperamentQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [startTime] = useState(Date.now())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentQuestion = TEMPERAMENT_QUIZ[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / TEMPERAMENT_QUIZ.length) * 100
  const isLastQuestion = currentQuestionIndex === TEMPERAMENT_QUIZ.length - 1

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0)
      setAnswers([])
      setSelectedOption(null)
      setError(null)
    }
  }, [isOpen])

  const handleOptionSelect = (option: QuizOption) => {
    setSelectedOption(option.id)
  }

  const handleNext = () => {
    if (!selectedOption) return

    const option = currentQuestion.options.find(opt => opt.id === selectedOption)
    if (!option) return

    // Save answer
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedOptionId: option.id,
      points: option.points
    }

    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)

    if (isLastQuestion) {
      // Submit quiz
      submitQuiz(updatedAnswers)
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedOption(null)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // Remove last answer
      setAnswers(prev => prev.slice(0, -1))
      setCurrentQuestionIndex(prev => prev - 1)
      
      // Restore previous selection
      const previousAnswer = answers[currentQuestionIndex - 1]
      if (previousAnswer) {
        setSelectedOption(previousAnswer.selectedOptionId)
      }
    }
  }

  const submitQuiz = async (finalAnswers: Answer[]) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Calculate total score
      const totalScore = finalAnswers.reduce((sum, answer) => sum + answer.points, 0)
      const maxScore = 30
      const percentage = (totalScore / maxScore) * 100

      // Calculate profile
      const profile = calculateTemperamentProfile(totalScore)

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

      // Calculate time taken
      const timeTakenSeconds = Math.floor((Date.now() - startTime) / 1000)

      // Save quiz result to database
      const { error: insertError } = await supabase
        ?.from('quiz_results')
        .insert({
          candidate_id: candidateData.id,
          user_id: session.user.id,
          quiz_type: 'temperament',
          quiz_version: 'v1',
          raw_score: totalScore,
          max_score: maxScore,
          percentage: percentage,
          answers: finalAnswers,
          profile_result: profile,
          status: 'completed',
          time_taken_seconds: timeTakenSeconds
        })

      if (insertError) throw insertError

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
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 md:p-8">
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
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Temperament Assessment</h2>
                <p className="text-blue-100 text-sm md:text-base">Question {currentQuestionIndex + 1} of {TEMPERAMENT_QUIZ.length}</p>
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

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Scenario */}
                <div className="mb-8">
                  <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    Scenario
                  </div>
                  <p className="text-lg md:text-xl text-slate-800 leading-relaxed">
                    {currentQuestion.scenario}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
                    What would you do?
                  </p>
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionSelect(option)}
                      disabled={isSubmitting}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        selectedOption === option.id
                          ? 'border-blue-600 bg-blue-50 shadow-lg scale-[1.02]'
                          : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          selectedOption === option.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className="flex-1">
                          <p className="text-base md:text-lg text-slate-900 font-medium mb-2">
                            {option.text}
                          </p>
                          <p className="text-sm text-slate-600 italic">
                            "{option.reasoning}"
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
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
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>{isLastQuestion ? 'Submit Quiz' : 'Next Question'}</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

