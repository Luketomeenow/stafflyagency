import { motion } from 'framer-motion';
import { BookOpen, Target, Users, TrendingUp, Download, Play, CheckCircle, ArrowRight, Zap, Shield, Globe, Rocket, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';

const PlaybooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

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

  const categories = [
    { id: 'all', label: 'ALL PLAYBOOKS', subtitle: 'Complete Collection' },
    { id: 'hiring', label: 'HIRING & MANAGEMENT', subtitle: 'Recruitment, Onboarding, Team Building' },
    { id: 'growth', label: 'BUSINESS GROWTH', subtitle: 'Scaling, Operations, Strategy' },
    { id: 'automation', label: 'AUTOMATION', subtitle: 'Workflows, Tools, Efficiency' },
    { id: 'quality', label: 'QUALITY CONTROL', subtitle: 'Standards, Reviews, Improvement' },
    { id: 'international', label: 'INTERNATIONAL', subtitle: 'Global Teams, Cultural Training' },
    { id: 'agency', label: 'AGENCY BUILDING', subtitle: 'Business Model, Client Acquisition' }
  ];

  const playbooks = useMemo(() => [
    {
      id: 'va-hiring',
      title: 'Virtual Assistant Hiring Playbook',
      description: 'Complete guide to hiring, onboarding, and managing virtual assistants for maximum productivity.',
      category: 'hiring',
      categoryLabel: 'Hiring & Management',
      difficulty: 'Beginner',
      duration: '2-3 weeks',
      icon: Users,
      features: ['Hiring Process', 'Interview Templates', 'Onboarding Checklist', 'Performance Metrics'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'business-scaling',
      title: 'Business Scaling with VAs',
      description: 'Strategic framework for scaling your business operations using virtual assistant teams.',
      category: 'growth',
      categoryLabel: 'Business Growth',
      difficulty: 'Intermediate',
      duration: '4-6 weeks',
      icon: TrendingUp,
      features: ['Team Structure', 'Process Documentation', 'Quality Control', 'Growth Metrics'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'process-automation',
      title: 'Process Automation Playbook',
      description: 'Step-by-step guide to automating repetitive tasks and building efficient workflows.',
      category: 'automation',
      categoryLabel: 'Automation',
      difficulty: 'Advanced',
      duration: '3-4 weeks',
      icon: Zap,
      features: ['Workflow Design', 'Tool Integration', 'Automation Scripts', 'Efficiency Tracking'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'quality-assurance',
      title: 'Quality Assurance Framework',
      description: 'Comprehensive system for maintaining high standards across all VA deliverables.',
      category: 'quality',
      categoryLabel: 'Quality Control',
      difficulty: 'Intermediate',
      duration: '2-3 weeks',
      icon: Shield,
      features: ['Quality Standards', 'Review Processes', 'Feedback Systems', 'Continuous Improvement'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'global-expansion',
      title: 'Global Team Expansion',
      description: 'Strategic playbook for building and managing international virtual assistant teams.',
      category: 'international',
      categoryLabel: 'International',
      difficulty: 'Advanced',
      duration: '6-8 weeks',
      icon: Globe,
      features: ['Cultural Training', 'Time Zone Management', 'Legal Compliance', 'Communication Protocols'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'agency-building',
      title: 'VA Agency Building',
      description: 'Complete blueprint for building and scaling your own virtual assistant agency.',
      category: 'agency',
      categoryLabel: 'Agency Development',
      difficulty: 'Expert',
      duration: '8-12 weeks',
      icon: Rocket,
      features: ['Business Model', 'Client Acquisition', 'Team Management', 'Financial Planning'],
      color: 'from-yellow-500 to-orange-500'
    }
  ], []);

  const testimonials = [
    {
      name: 'Sarah Chen',
      company: 'TechStart Inc.',
      role: 'CEO',
      content: 'The VA Hiring Playbook helped us build a team of 15 virtual assistants in just 3 months.',
      avatar: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      company: 'GrowthLab',
      role: 'Operations Director',
      content: 'The Business Scaling Playbook increased our operational efficiency by 300%.',
      avatar: 'MR'
    },
    {
      name: 'Lisa Thompson',
      company: 'Digital Solutions',
      role: 'Founder',
      content: 'Process Automation Playbook saved us 20 hours per week on repetitive tasks.',
      avatar: 'LT'
    }
  ];

  // Filter playbooks based on search and category
  const filteredPlaybooks = useMemo(() => {
    return playbooks.filter(playbook => {
      const matchesSearch = playbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           playbook.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           playbook.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || playbook.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, playbooks]);

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
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="text-center mb-16"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-800 text-sm font-medium mb-8"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                <span>Proven Business Playbooks</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Business{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Playbooks
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  That Scale
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                Access proven strategies, frameworks, and step-by-step guides to build, scale, and optimize your virtual assistant operations.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download All Playbooks
                </button>
                <button className="bg-white text-gray-700 font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl border border-gray-200 hover:border-purple-300 transition-all duration-300">
                  View Case Studies
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Search and Categories Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search playbooks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none shadow-lg"
                />
              </div>
            </motion.div>

            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-3 rounded-xl transition-all duration-300 text-left min-w-[200px] ${
                      activeCategory === category.id
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="font-semibold text-sm">{category.label}</div>
                    <div className={`text-xs mt-1 ${
                      activeCategory === category.id ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                      {category.subtitle}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Playbooks Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Playbook</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Each playbook contains proven strategies, templates, and actionable steps to transform your business
              </p>
            </motion.div>

            {filteredPlaybooks.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlaybooks.map((playbook, index) => (
                  <motion.div
                    key={playbook.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${playbook.color} rounded-xl flex items-center justify-center`}>
                          <playbook.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {playbook.difficulty}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {playbook.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        {playbook.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-medium text-gray-500 bg-blue-50 px-2 py-1 rounded-full">
                          {playbook.categoryLabel}
                        </span>
                        <span className="text-xs text-gray-500">
                          ⏱️ {playbook.duration}
                        </span>
                      </div>

                      <div className="space-y-2 mb-6">
                        {playbook.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-xs text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                        <button className="bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="text-gray-500 mb-4">
                  <Search className="w-16 h-16 mx-auto text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No playbooks found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Playbooks Work</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Simple, actionable steps to transform your business operations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Download & Study',
                  description: 'Get your playbook and study the proven strategies and frameworks.',
                  icon: Download
                },
                {
                  step: '02',
                  title: 'Implement & Execute',
                  description: 'Follow the step-by-step guides to implement changes in your business.',
                  icon: Target
                },
                {
                  step: '03',
                  title: 'Scale & Optimize',
                  description: 'Use the metrics and feedback systems to continuously improve.',
                  icon: TrendingUp
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See how businesses have transformed their operations using our playbooks
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                      <p className="text-xs text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Download our comprehensive playbooks and start building your virtual assistant empire today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Get All Playbooks
                </button>
                <Link to="/contact" className="bg-white text-gray-700 font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl border border-gray-200 hover:border-purple-300 transition-all duration-300 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Talk to an Expert
                </Link>
              </div>
            </motion.div>
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

export default PlaybooksPage;
