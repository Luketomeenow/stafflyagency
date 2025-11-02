import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mic, Square, Play, Pause, CheckCircle, AlertCircle, TrendingUp, Loader2 } from 'lucide-react'
import { 
  BEHAVIORAL_STRESS_QUESTIONS,
  calculateBehavioralProfile,
  getCategoryLabel,
  getCategoryColor,
  formatTime,
  type BehavioralQuestion 
} from '../data/behavioralStressQuiz'
import { supabase } from '../lib/supabase'
import { getCandidateSession } from '../lib/candidateAuth'

type BehavioralStressQuizProps = {
  isOpen: boolean
  onClose: () => void
  onComplete: (completed: boolean) => void
}

type RecordingState = 'idle' | 'recording' | 'recorded' | 'playing'

type QuestionResponse = {
  questionId: string
  selectedOption: 'A' | 'B' | 'C' | 'D'
  audioBlob: Blob | null
  duration: number
  audioUrl: string | null
}

export function BehavioralStressQuiz({ isOpen, onClose, onComplete }: BehavioralStressQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<QuestionResponse[]>([])
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')
  const [recordingTime, setRecordingTime] = useState(0)
  const [playbackTime, setPlaybackTime] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [permissionDenied, setPermissionDenied] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentQuestion = BEHAVIORAL_STRESS_QUESTIONS[currentQuestionIndex]
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id)
  const progress = ((currentQuestionIndex + 1) / BEHAVIORAL_STRESS_QUESTIONS.length) * 100
  const isLastQuestion = currentQuestionIndex === BEHAVIORAL_STRESS_QUESTIONS.length - 1

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0)
      setResponses([])
      setSelectedOption(null)
      setRecordingState('idle')
      setRecordingTime(0)
      setPlaybackTime(0)
      setError(null)
      setPermissionDenied(false)
    }
  }, [isOpen])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current)
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current)
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      setError(null)
      setPermissionDenied(false)

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      let mimeType = 'audio/webm;codecs=opus'
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/mp4'
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType })
        const audioUrl = URL.createObjectURL(audioBlob)
        
        // Update current response with audio
        setResponses(prev => {
          const filtered = prev.filter(r => r.questionId !== currentQuestion.id)
          return [...filtered, {
            questionId: currentQuestion.id,
            selectedOption: selectedOption!,
            audioBlob,
            duration: recordingTime,
            audioUrl
          }]
        })

        setRecordingState('recorded')
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setRecordingState('recording')
      setRecordingTime(0)

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1
          if (newTime >= 150) { // 2:30 max
            stopRecording()
            return 150
          }
          return newTime
        })
      }, 1000)

    } catch (err: any) {
      console.error('Error starting recording:', err)
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionDenied(true)
        setError('Microphone access denied. Please enable microphone permissions.')
      } else {
        setError('Failed to start recording. Please check your microphone.')
      }
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
        recordingTimerRef.current = null
      }
    }
  }

  const playRecording = () => {
    if (!currentResponse?.audioUrl) return

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const audio = new Audio(currentResponse.audioUrl)
    audioRef.current = audio

    audio.onended = () => {
      setRecordingState('recorded')
      setPlaybackTime(0)
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current)
        playbackTimerRef.current = null
      }
    }

    audio.play()
    setRecordingState('playing')
    setPlaybackTime(0)

    playbackTimerRef.current = setInterval(() => {
      setPlaybackTime(prev => prev + 1)
    }, 1000)
  }

  const pausePlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setRecordingState('recorded')
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current)
        playbackTimerRef.current = null
      }
    }
  }

  const deleteRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    
    setResponses(prev => prev.filter(r => r.questionId !== currentQuestion.id))
    setRecordingState('idle')
    setRecordingTime(0)
    setPlaybackTime(0)
    
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current)
    if (playbackTimerRef.current) clearInterval(playbackTimerRef.current)
  }

  const handleOptionSelect = (option: 'A' | 'B' | 'C' | 'D') => {
    setSelectedOption(option)
    
    // If audio already recorded, update the response
    if (currentResponse?.audioBlob) {
      setResponses(prev => {
        const filtered = prev.filter(r => r.questionId !== currentQuestion.id)
        return [...filtered, {
          ...currentResponse,
          selectedOption: option
        }]
      })
    }
  }

  const handleNext = () => {
    if (!selectedOption) {
      setError('Please select an option before continuing.')
      return
    }

    if (!currentResponse?.audioBlob) {
      setError('Please record your audio response before continuing.')
      return
    }

    if (currentResponse.duration < 30) {
      setError('Audio recording must be at least 30 seconds long.')
      return
    }

    setError(null)

    if (isLastQuestion) {
      submitQuiz()
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedOption(null)
      setRecordingState('idle')
      setRecordingTime(0)
      setPlaybackTime(0)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setRecordingState('idle')
      setRecordingTime(0)
      setPlaybackTime(0)
      setError(null)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }

  const submitQuiz = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Calculate profile from multiple choice answers
      const mcAnswers: Record<string, 'A' | 'B' | 'C' | 'D'> = {}
      responses.forEach(r => {
        mcAnswers[r.questionId] = r.selectedOption
      })
      const profile = calculateBehavioralProfile(mcAnswers)

      // Try to save to database if user is authenticated (for dashboard use)
      // If not authenticated (during application), just mark as complete
      const session = await getCandidateSession()
      
      if (session?.user) {
        // User is authenticated - save to database
        const { data: candidateData, error: candidateError } = await supabase
          ?.from('candidates')
          .select('id')
          .eq('user_id', session.user.id)
          .single()

        if (!candidateError && candidateData) {
          // Upload audio files and save results
          const uploadPromises = responses.map(async (response) => {
            if (!response.audioBlob) return null

            const fileName = `${candidateData.id}/${response.questionId}_${Date.now()}.webm`
            const { data: uploadData, error: uploadError } = await supabase
              ?.storage
              .from('audio-responses')
              .upload(fileName, response.audioBlob, {
                contentType: response.audioBlob.type,
                upsert: false
              })

            if (uploadError) {
              console.error('Upload error:', uploadError)
              return null
            }

            const { data: urlData } = supabase
              ?.storage
              .from('audio-responses')
              .getPublicUrl(fileName)

            return {
              questionId: response.questionId,
              selectedOption: response.selectedOption,
              audioUrl: urlData?.publicUrl,
              duration: response.duration
            }
          })

          const audioResults = await Promise.all(uploadPromises)

          // Save quiz result
          await supabase
            ?.from('quiz_results')
            .insert({
              candidate_id: candidateData.id,
              user_id: session.user.id,
              quiz_type: 'behavioral',
              quiz_version: 'v1',
              raw_score: profile.totalScore,
              max_score: profile.maxScore,
              percentage: (profile.totalScore / profile.maxScore) * 100,
              answers: audioResults,
              profile_result: {
                riskLevel: profile.riskLevel,
                categoryScores: profile.categoryScores,
                overallReadiness: profile.overallReadiness,
                strengths: profile.strengths,
                developmentAreas: profile.developmentAreas,
                redFlags: profile.redFlags
              },
              status: 'completed',
              time_taken_seconds: 0
            })
        }
      }

      // Mark as complete (works for both authenticated and non-authenticated users)
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
          if (e.target === e.currentTarget && !isSubmitting && recordingState !== 'recording') {
            onClose()
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className={`relative bg-gradient-to-r ${getCategoryColor(currentQuestion.category)} text-white p-6 md:p-8`}>
            <button
              onClick={onClose}
              disabled={isSubmitting || recordingState === 'recording'}
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
                <h2 className="text-2xl md:text-3xl font-bold">Behavioral Stress Test</h2>
                <p className="text-white/90 text-sm md:text-base">Question {currentQuestionIndex + 1} of {BEHAVIORAL_STRESS_QUESTIONS.length}</p>
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

            {permissionDenied && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg"
              >
                <p className="font-semibold mb-2">Microphone Access Required</p>
                <p className="text-sm">Please enable microphone access in your browser settings and try again.</p>
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
                {/* Category Badge */}
                <div className="mb-6">
                  <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${getCategoryColor(currentQuestion.category)} text-white text-sm font-bold rounded-full shadow-lg`}>
                    {getCategoryLabel(currentQuestion.category)}
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
                  {currentQuestion.question}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={isSubmitting}
                      className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        selectedOption === option.id
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          selectedOption === option.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {option.id}
                        </div>
                        <p className="flex-1 text-sm md:text-base text-slate-900">
                          {option.text}
                        </p>
                        {selectedOption === option.id && (
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Audio Prompt */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-2xl p-6 md:p-8">
                  <div className="flex items-start space-x-3 mb-4">
                    <Mic className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-900 mb-2">Audio Follow-up (Required):</p>
                      <p className="text-slate-700 text-sm md:text-base italic">"{currentQuestion.audioPrompt}"</p>
                      <p className="text-xs text-slate-500 mt-2">Time limit: {formatTime(currentQuestion.audioTimeLimit)} (minimum 30 seconds)</p>
                    </div>
                  </div>

                  {/* Recording Controls */}
                  <div className="flex flex-col items-center mt-6">
                    {recordingState === 'idle' && (
                      <>
                        <button
                          onClick={startRecording}
                          disabled={!selectedOption || isSubmitting}
                          className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white flex items-center justify-center hover:shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Mic className="w-8 h-8" />
                        </button>
                        <p className="mt-3 text-slate-700 font-medium text-sm">Click to start recording</p>
                      </>
                    )}

                    {recordingState === 'recording' && (
                      <>
                        <div className="relative">
                          <button
                            onClick={stopRecording}
                            className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white flex items-center justify-center animate-pulse hover:shadow-2xl transition-all duration-300"
                          >
                            <Square className="w-8 h-8" />
                          </button>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping" />
                        </div>
                        <p className="mt-3 text-xl font-bold text-red-600">{formatTime(recordingTime)}</p>
                        <p className="text-slate-600 text-sm">Recording... Click to stop</p>
                      </>
                    )}

                    {(recordingState === 'recorded' || recordingState === 'playing') && currentResponse && (
                      <>
                        <div className="flex items-center space-x-4 mb-3">
                          <button
                            onClick={recordingState === 'playing' ? pausePlayback : playRecording}
                            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center hover:shadow-lg transition-all duration-300"
                          >
                            {recordingState === 'playing' ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                          </button>
                        </div>
                        <p className="text-lg font-bold text-slate-900">
                          {recordingState === 'playing' ? formatTime(playbackTime) : formatTime(currentResponse.duration)}
                        </p>
                        <p className="text-slate-600 text-sm mb-3">
                          {recordingState === 'playing' ? 'Playing...' : 'Recording complete'}
                        </p>
                        <button
                          onClick={deleteRecording}
                          disabled={isSubmitting}
                          className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Re-record
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 p-6 md:p-8 bg-slate-50">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0 || isSubmitting || recordingState === 'recording'}
                className="px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!selectedOption || !currentResponse?.audioBlob || isSubmitting || recordingState === 'recording'}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>{isLastQuestion ? 'Submit Test' : 'Next Question'}</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

