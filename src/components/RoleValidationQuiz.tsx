import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mic, Square, Play, Pause, CheckCircle, AlertCircle, Clock, Volume2 } from 'lucide-react'
import { 
  ROLE_VALIDATION_QUESTIONS, 
  AUDIO_CONSTRAINTS,
  formatTime,
  getRoleLevelLabel,
  getRoleLevelColor,
  type AudioQuestion 
} from '../data/roleValidationQuiz'
import { supabase } from '../lib/supabase'
import { getCandidateSession } from '../lib/candidateAuth'

type RoleValidationQuizProps = {
  isOpen: boolean
  onClose: () => void
  onComplete: (completed: boolean) => void
}

type RecordingState = 'idle' | 'recording' | 'recorded' | 'playing'

type QuestionResponse = {
  questionId: string
  audioBlob: Blob | null
  duration: number
  audioUrl: string | null
}

export function RoleValidationQuiz({ isOpen, onClose, onComplete }: RoleValidationQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<QuestionResponse[]>([])
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

  const currentQuestion = ROLE_VALIDATION_QUESTIONS[currentQuestionIndex]
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id)
  const progress = ((currentQuestionIndex + 1) / ROLE_VALIDATION_QUESTIONS.length) * 100
  const isLastQuestion = currentQuestionIndex === ROLE_VALIDATION_QUESTIONS.length - 1

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0)
      setResponses([])
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
      
      // Try preferred mime type, fallback if not supported
      let mimeType = AUDIO_CONSTRAINTS.mimeType
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = AUDIO_CONSTRAINTS.fallbackMimeType
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
        
        // Save response
        const newResponse: QuestionResponse = {
          questionId: currentQuestion.id,
          audioBlob,
          duration: recordingTime,
          audioUrl
        }

        setResponses(prev => {
          const filtered = prev.filter(r => r.questionId !== currentQuestion.id)
          return [...filtered, newResponse]
        })

        setRecordingState('recorded')
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setRecordingState('recording')
      setRecordingTime(0)

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1
          
          // Auto-stop at max duration
          if (newTime >= AUDIO_CONSTRAINTS.maxDuration) {
            stopRecording()
            return AUDIO_CONSTRAINTS.maxDuration
          }
          
          return newTime
        })
      }, 1000)

    } catch (err: any) {
      console.error('Error starting recording:', err)
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionDenied(true)
        setError('Microphone access denied. Please enable microphone permissions in your browser settings.')
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

  const handleNext = () => {
    if (!currentResponse) {
      setError('Please record your response before continuing.')
      return
    }

    if (currentResponse.duration < AUDIO_CONSTRAINTS.minDuration) {
      setError(`Recording must be at least ${AUDIO_CONSTRAINTS.minDuration} seconds long.`)
      return
    }

    setError(null)

    if (isLastQuestion) {
      submitQuiz()
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
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
          // Upload audio files to Supabase Storage and save quiz results
          const uploadPromises = responses.map(async (response) => {
            if (!response.audioBlob) return null

            const question = ROLE_VALIDATION_QUESTIONS.find(q => q.id === response.questionId)
            if (!question) return null

            // Upload to Supabase Storage
            const fileName = `${candidateData.id}/${question.id}_${Date.now()}.webm`
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

            // Get public URL
            const { data: urlData } = supabase
              ?.storage
              .from('audio-responses')
              .getPublicUrl(fileName)

            // Save quiz result
            await supabase
              ?.from('quiz_results')
              .insert({
                candidate_id: candidateData.id,
                user_id: session.user.id,
                quiz_type: 'role_validation',
                quiz_version: 'v1',
                raw_score: 0, // Will be scored by admin
                max_score: 20, // 5 points per criteria x 4 criteria
                percentage: 0,
                answers: {
                  questionId: response.questionId,
                  level: question.level,
                  audioUrl: urlData?.publicUrl,
                  duration: response.duration
                },
                profile_result: {
                  level: question.level,
                  title: question.title,
                  audioUrl: urlData?.publicUrl,
                  duration: response.duration,
                  needsReview: true
                },
                status: 'completed',
                time_taken_seconds: response.duration
              })

            return true
          })

          await Promise.all(uploadPromises)
        }
      }

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
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className={`relative bg-gradient-to-r ${getRoleLevelColor(currentQuestion.level)} text-white p-6 md:p-8`}>
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
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Role Validation Assessment</h2>
                <p className="text-white/90 text-sm md:text-base">Question {currentQuestionIndex + 1} of {ROLE_VALIDATION_QUESTIONS.length}</p>
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
                <p className="text-sm">To complete this assessment, please:</p>
                <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
                  <li>Click the microphone icon in your browser's address bar</li>
                  <li>Select "Allow" for microphone access</li>
                  <li>Refresh this page and try again</li>
                </ol>
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
                {/* Role Level Badge */}
                <div className="mb-6">
                  <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${getRoleLevelColor(currentQuestion.level)} text-white text-sm font-bold rounded-full shadow-lg`}>
                    {getRoleLevelLabel(currentQuestion.level)}
                  </div>
                </div>

                {/* Question Title */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                  {currentQuestion.title}
                </h3>

                {/* Question */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
                  <p className="text-base md:text-lg text-slate-800 leading-relaxed mb-4">
                    {currentQuestion.question}
                  </p>
                  
                  <div className="border-t border-slate-300 pt-4 mt-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Your answer should include:</p>
                    <ul className="space-y-2">
                      {currentQuestion.guidelines.map((guideline, index) => (
                        <li key={index} className="flex items-start text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                          {guideline}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Time Limit Info */}
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
                  <Clock className="w-4 h-4" />
                  <span>Time limit: {formatTime(AUDIO_CONSTRAINTS.warningDuration)} (up to {formatTime(AUDIO_CONSTRAINTS.maxDuration)})</span>
                </div>

                {/* Recording Controls */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-2xl p-8">
                  <div className="flex flex-col items-center">
                    {recordingState === 'idle' && (
                      <>
                        <button
                          onClick={startRecording}
                          disabled={isSubmitting}
                          className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white flex items-center justify-center hover:shadow-2xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Mic className="w-10 h-10" />
                        </button>
                        <p className="mt-4 text-slate-700 font-medium">Click to start recording</p>
                        <div className="mt-3 space-y-1">
                          <p className="text-sm text-slate-500">Maximum {AUDIO_CONSTRAINTS.maxDuration / 60} minutes</p>
                          <p className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                            ⏱️ Minimum {AUDIO_CONSTRAINTS.minDuration} seconds required
                          </p>
                        </div>
                      </>
                    )}

                    {recordingState === 'recording' && (
                      <>
                        <div className="relative">
                          <button
                            onClick={stopRecording}
                            className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white flex items-center justify-center animate-pulse hover:shadow-2xl transition-all duration-300"
                          >
                            <Square className="w-10 h-10" />
                          </button>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping" />
                        </div>
                        <p className="mt-4 text-2xl font-bold text-red-600">{formatTime(recordingTime)}</p>
                        <p className="text-slate-600">Recording... Click to stop</p>
                        {recordingTime < AUDIO_CONSTRAINTS.minDuration && (
                          <p className="text-sm text-blue-600 font-semibold mt-2 bg-blue-50 px-3 py-1 rounded-full">
                            ⏱️ Keep recording ({AUDIO_CONSTRAINTS.minDuration - recordingTime}s remaining)
                          </p>
                        )}
                        {recordingTime >= AUDIO_CONSTRAINTS.minDuration && recordingTime < AUDIO_CONSTRAINTS.warningDuration && (
                          <p className="text-sm text-green-600 font-semibold mt-2 bg-green-50 px-3 py-1 rounded-full">
                            ✓ Minimum reached - you can stop anytime
                          </p>
                        )}
                        {recordingTime >= AUDIO_CONSTRAINTS.warningDuration && (
                          <p className="text-sm text-orange-600 font-semibold mt-2 bg-orange-50 px-3 py-1 rounded-full">
                            ⚠️ Approaching time limit
                          </p>
                        )}
                      </>
                    )}

                    {(recordingState === 'recorded' || recordingState === 'playing') && currentResponse && (
                      <>
                        <div className="flex items-center space-x-4 mb-4">
                          <button
                            onClick={recordingState === 'playing' ? pausePlayback : playRecording}
                            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center hover:shadow-lg transition-all duration-300"
                          >
                            {recordingState === 'playing' ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                          </button>
                        </div>
                        <p className="text-xl font-bold text-slate-900">
                          {recordingState === 'playing' ? formatTime(playbackTime) : formatTime(currentResponse.duration)}
                        </p>
                        <p className="text-slate-600 mb-2">
                          {recordingState === 'playing' ? 'Playing...' : 'Recording complete'}
                        </p>
                        {currentResponse.duration < AUDIO_CONSTRAINTS.minDuration && (
                          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                            <p className="font-semibold">⚠️ Recording too short</p>
                            <p>Minimum {AUDIO_CONSTRAINTS.minDuration} seconds required. Please re-record.</p>
                          </div>
                        )}
                        {currentResponse.duration >= AUDIO_CONSTRAINTS.minDuration && (
                          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm">
                            <p className="font-semibold">✓ Recording meets requirements</p>
                          </div>
                        )}
                        <div className="flex space-x-3">
                          <button
                            onClick={deleteRecording}
                            disabled={isSubmitting}
                            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Re-record
                          </button>
                        </div>
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
                disabled={!currentResponse || isSubmitting || recordingState === 'recording'}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>{isLastQuestion ? 'Submit Assessment' : 'Next Question'}</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

