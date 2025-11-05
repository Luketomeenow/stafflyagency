import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, AlertCircle, CheckCircle, Loader2, ArrowRight } from 'lucide-react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { loginCandidate } from '../lib/candidateAuth'

export default function CandidateLoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showRegisteredMessage, setShowRegisteredMessage] = useState(false)

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setShowRegisteredMessage(true)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await loginCandidate(email, password)

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      // Redirect to dashboard
      navigate('/candidate/dashboard')
    } catch (err: any) {
      setError(err.message || 'An error occurred during login')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src="/staffly-logo.svg" alt="Staffly" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your candidate account</p>
        </div>

        {/* Success Message for New Registrations */}
        {showRegisteredMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-blue-50 border-2 border-blue-300 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-900 mb-2">🎉 Application Submitted Successfully!</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Thank you for applying to <strong>StafflyhQ</strong>! Your application has been received.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-3">
                  <p className="text-sm font-semibold text-yellow-900 mb-1">
                    ⚠️ Important: Verify Your Email First
                  </p>
                  <p className="text-sm text-yellow-800">
                    Before you can log in, you must verify your email address. Check your inbox for a verification link from StafflyhQ.
                  </p>
                </div>
                
                <p className="text-sm text-blue-700 font-semibold mb-2">
                  📋 Next Steps:
                </p>
                <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1.5 ml-2">
                  <li><strong>Check your email inbox</strong> (and spam folder)</li>
                  <li><strong>Click the verification link</strong> in the email from StafflyhQ</li>
                  <li><strong>Return to this page</strong> and log in with your credentials</li>
                  <li><strong>Access your dashboard</strong> to view your application status</li>
                </ol>
                
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-xs text-blue-600">
                    💡 <strong>Tip:</strong> Our team will review your application within 2-3 business days. You'll receive an email notification once approved.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start"
            >
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Login Failed</p>
                <p className="text-sm mt-1">{error}</p>
                {error.includes('Email not confirmed') && (
                  <p className="text-sm mt-2">
                    Please check your email and click the verification link to activate your account.
                  </p>
                )}
                {error.includes('pending approval') && (
                  <p className="text-sm mt-2">
                    Your application is still under review. You'll receive an email once approved.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to="/apply" className="font-semibold text-blue-600 hover:text-blue-500">
                Apply Now
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-slate-600">
            Need help?{' '}
            <Link to="/contact" className="font-medium text-blue-600 hover:text-blue-500">
              Contact Support
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
