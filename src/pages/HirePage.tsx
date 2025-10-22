import { motion } from 'framer-motion';
import { Users, Shield, Zap, Globe, CheckCircle, ArrowRight, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HirePage = () => {


  const testimonials = [
    { company: 'TechCorp', savings: '75%', position: 'top-16 right-20' },
    { company: 'StartupXYZ', savings: '60%', position: 'top-32 right-80' },
    { company: 'BusinessInc', savings: '80%', position: 'bottom-32 right-16' },
  ];

  const toolLogos = [
    { name: 'Microsoft Office', logo: '📊' },
    { name: 'Canva', logo: '🎨' },
    { name: 'Slack', logo: '💬' },
    { name: 'Shopify', logo: '🛍️' },
    { name: 'WordPress', logo: '📝' },
    { name: 'HubSpot', logo: '🎯' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Pre-Vetted Talent',
      description: 'All VAs are thoroughly screened and verified'
    },
    {
      icon: Zap,
      title: 'Quick Turnaround',
      description: 'Get matched with the right VA within 24 hours'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access top Filipino talent from anywhere'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: '24/7 support to ensure smooth operations'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-800 text-sm font-medium mb-8"
              >
                <Users className="w-4 h-4 mr-2" />
                <span>3K+ Businesses Cut Costs by 75%</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              >
                The Easiest Way to<br />
                Hire a <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">VA</span> Using{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">AI</span>{' '}
                <span className="inline-block">🤖</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center mb-8"
              >
                <p className="text-xl text-gray-700 mb-2">
                  Let <span className="font-semibold text-purple-600">AI</span> Find the Right Virtual Assistant
                </p>
                <p className="text-xl text-gray-700">
                  So You Don't Have To <span className="inline-block">🔍</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="bg-white text-gray-700 font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300">
                  See Solution
                </button>
              </motion.div>
            </div>

            {/* Tools Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-20"
            >
              <p className="text-gray-600 mb-8 text-lg">Hire Virtual Assistants Who Know Your Tools</p>
              <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
                {toolLogos.map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="text-2xl">{tool.logo}</span>
                    <span className="font-medium text-gray-700">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Central Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative max-w-4xl mx-auto"
            >
              {/* Main Search Interface Mockup */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect VA</h3>
                  <p className="text-gray-600">AI-powered matching in seconds</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="I need a VA for social media management..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { name: 'Maria Santos', skill: 'Social Media Expert', rating: 4.9 },
                      { name: 'John Cruz', skill: 'Content Creator', rating: 4.8 },
                      { name: 'Ana Lopez', skill: 'Marketing Specialist', rating: 5.0 }
                    ].map((va, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {va.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{va.name}</p>
                            <p className="text-gray-500 text-xs">{va.skill}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{va.rating}</span>
                          </div>
                          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                            View Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating testimonials */}
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className={`absolute ${testimonial.position} transform hover:scale-110 transition-all duration-300 hidden lg:block`}
                >
                  <div className="bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">{testimonial.company}</p>
                      <p className="text-green-600 text-xs font-medium">Saved {testimonial.savings}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose Staffly Agency?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We make hiring virtual assistants simple, fast, and reliable
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer with Legal Links */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-600">
                <p>&copy; 2025 Staffly Agency. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HirePage;