import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobsPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const floatingProfiles = [
    { name: 'Maria Santos', role: 'Content Writer', rating: 4.9, position: 'top-20 right-16' },
    { name: 'John dela Cruz', role: 'Graphic Designer', rating: 4.8, position: 'top-40 right-80' },
    { name: 'Ana Reyes', role: 'Social Media Manager', rating: 4.9, position: 'bottom-40 right-20' },
    { name: 'Carlos Lopez', role: 'Web Developer', rating: 5.0, position: 'bottom-20 right-64' },
  ];

  const jobCategories = [
    { name: 'Administrative', count: '2,500+', icon: '📋' },
    { name: 'Customer Service', count: '1,800+', icon: '🎧' },
    { name: 'Content Creation', count: '1,200+', icon: '✍️' },
    { name: 'Social Media', count: '950+', icon: '📱' },
    { name: 'Web Development', count: '800+', icon: '💻' },
    { name: 'Graphic Design', count: '650+', icon: '🎨' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="text-center lg:text-left"
              >
                <motion.div
                  variants={fadeInUp}
                  className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-8"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>5,000+ Active Job Listings</span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                >
                  Find Global{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Virtual Assistant
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                    Roles.
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl text-gray-600 mb-8 max-w-2xl"
                >
                  Browse Staffly Agency & get matched with local & international clients.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-xl p-6 mb-8"
                >
                  {/* Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search for jobs..."
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Location"
                        className="w-full sm:w-48 pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center">
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </button>
                  </div>

                  {/* Quick Filters */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    <span className="text-sm text-gray-500 mr-2">Popular:</span>
                    {['Remote', 'Full-time', 'Part-time', 'Freelance'].map((filter) => (
                      <button
                        key={filter}
                        className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm font-medium transition-colors"
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.button
                  variants={fadeInUp}
                  className="bg-black text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto lg:mx-0"
                >
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Right Content - Floating Profiles */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-96 lg:h-[500px] hidden lg:block"
              >
                {/* Central Profile */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full overflow-hidden shadow-2xl">
                      <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-300 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Briefcase className="w-8 h-8" />
                          </div>
                          <p className="font-semibold text-lg">Find Your Dream Job</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Profile Cards */}
                {floatingProfiles.map((profile, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className={`absolute ${profile.position} transform hover:scale-110 transition-all duration-300`}
                  >
                    <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {profile.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{profile.name}</p>
                          <p className="text-gray-500 text-xs">{profile.role}</p>
                          <div className="flex items-center mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">{profile.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Job Categories Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Categories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore thousands of job opportunities across different categories
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{category.icon}</div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-blue-600 font-medium">{category.count} jobs available</p>
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

export default JobsPage;