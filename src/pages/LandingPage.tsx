import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, Rocket, Star, Globe, Shield, Zap, Sparkles, MessageCircle, Play, Check, ChevronDown } from 'lucide-react';
import FloatingNavbar from '../components/FloatingNavbar';

const LandingPage = () => {
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

  const services = [
    {
      icon: Users,
      title: 'Virtual Assistant Services',
      description: 'Professional VAs for admin, customer service, and business support',
      color: 'from-blue-400 to-blue-500'
    },
    {
      icon: Briefcase,
      title: 'Project Management',
      description: 'Expert project coordinators to keep your business on track',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Customer Support',
      description: '24/7 customer service representatives for your business',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Zap,
      title: 'Digital Marketing',
      description: 'Social media management and marketing automation',
      color: 'from-blue-700 to-blue-800'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      content: 'The virtual assistants from this platform transformed our operations. Highly recommended!',
      rating: 5,
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, GrowthLab',
      content: 'Professional, reliable, and cost-effective. Our business has grown 300% since partnering with them.',
      rating: 5,
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, InnovateCo',
      content: 'The quality of work and attention to detail is exceptional. They truly understand our business needs.',
      rating: 5,
      avatar: 'ER'
    },
    {
      name: 'David Kim',
      role: 'Operations Manager, ScaleUp',
      content: 'Staffly has been instrumental in our growth. The VAs are incredibly skilled and professional.',
      rating: 5,
      avatar: 'DK'
    },
    {
      name: 'Lisa Thompson',
      role: 'Founder, Digital Ventures',
      content: 'Outstanding service quality and support. Our productivity has increased dramatically.',
      rating: 5,
      avatar: 'LT'
    },
    {
      name: 'James Wilson',
      role: 'CTO, Innovation Corp',
      content: 'The best decision we made for our business. Highly skilled and reliable virtual assistants.',
      rating: 5,
      avatar: 'JW'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$299',
      period: '/month',
      description: 'Perfect for small businesses getting started',
      features: ['2 Virtual Assistants', 'Basic Support', 'Standard Tools', 'Email Support'],
      popular: false
    },
    {
      name: 'Professional',
      price: '$599',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: ['5 Virtual Assistants', 'Priority Support', 'Advanced Tools', 'Phone Support', 'Custom Workflows'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$999',
      period: '/month',
      description: 'For large organizations',
      features: ['Unlimited VAs', '24/7 Support', 'Custom Solutions', 'Dedicated Manager', 'API Access'],
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'How quickly can I get started with a virtual assistant?',
      answer: 'You can be matched with a qualified virtual assistant within 24-48 hours of your initial consultation.'
    },
    {
      question: 'What qualifications do your virtual assistants have?',
      answer: 'All our VAs undergo rigorous screening, including skills assessment, background checks, and reference verification.'
    },
    {
      question: 'Can I customize the services based on my business needs?',
      answer: 'Absolutely! We offer flexible, customizable solutions tailored to your specific business requirements and workflows.'
    },
    {
      question: 'What if I\'m not satisfied with my virtual assistant?',
      answer: 'We offer a 30-day satisfaction guarantee. If you\'re not happy, we\'ll find you a better match at no additional cost.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white">
      {/* Floating Navbar */}
      <FloatingNavbar />

      <div className="relative">
        {/* Hero Section with Chatbot and Gradient Background */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-violet-50 to-violet-100 relative overflow-hidden">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0">
            {/* Floating Geometric Shapes */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-violet-200/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-blue-300/20 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-violet-200/25 rounded-full blur-xl animate-pulse animation-delay-4000"></div>
            <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-blue-200/25 rounded-full blur-md animate-pulse animation-delay-1000"></div>
            
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, violet 1px, transparent 0)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
            {/* Gradient Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-200/20 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-300/20 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-gradient-to-tr from-violet-200/20 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="text-center lg:text-left text-gray-800 relative"
              >
                {/* Floating Badge */}
                <motion.div
                  variants={fadeInUp}
                  className="inline-flex items-center px-6 py-3 bg-violet-100/80 backdrop-blur-md rounded-full text-violet-800 text-sm font-medium mb-8 border border-violet-200 shadow-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Sparkles className="w-5 h-5 mr-3 text-violet-600 animate-pulse" />
                  <span className="relative z-10 font-semibold">20,000+ Elite Virtual Assistants</span>
                </motion.div>

                {/* Enhanced Headline */}
                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl lg:text-7xl font-black text-gray-800 mb-8 leading-tight relative"
                >
                  <span className="block">Hire A+ Niched</span>
                  <span className="block bg-gradient-to-r from-violet-600 via-violet-500 to-violet-400 bg-clip-text text-transparent">
                    Operators
                  </span>
                  <span className="block text-4xl lg:text-5xl font-bold text-violet-700 mt-2">
                    — For 60% Less
                  </span>
                </motion.h1>

                {/* Enhanced Subhead */}
                <motion.p
                  variants={fadeInUp}
                  className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-2xl leading-relaxed font-medium"
                >
                  Get qualified <span className="text-violet-600 font-semibold">A+ VA profiles</span> in the palm of your hand by chatting with{' '}
                  <span className="text-gray-800 font-bold">Staffly AI</span>
                </motion.p>

                {/* Enhanced CTA Buttons */}
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-10"
                >
                  <Link to="/hire">
                    <button className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white font-black py-5 px-10 rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Briefcase className="mr-3 w-6 h-6 relative z-10" />
                      <span className="relative z-10 text-lg">Start Scaling</span>
                      <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
                    </button>
                  </Link>
                  
                  <Link to="/jobs">
                    <button className="group border-3 border-blue-500 text-blue-600 font-bold py-5 px-10 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center backdrop-blur-sm hover:shadow-2xl transform hover:scale-105">
                      <Users className="mr-3 w-6 h-6" />
                      <span className="text-lg">Find Jobs</span>
                      <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </motion.div>

                {/* Enhanced Quick Start Section */}
                <motion.div
                  variants={fadeInUp}
                  className="text-sm text-gray-600 mb-4"
                >
                  <span className="inline-flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    Not sure where to start? Try one of these:
                  </span>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap gap-3 justify-center lg:justify-start"
                >
                  {['Virtual Admin', 'Customer Support', 'Social Media', 'Data Entry', 'Project Management'].map((service, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-3 bg-white/80 backdrop-blur-md border border-violet-200 rounded-full text-sm text-gray-700 hover:bg-violet-100 hover:border-violet-300 transition-all duration-300 shadow-lg hover:shadow-xl group"
                    >
                      <span className="group-hover:text-violet-700 transition-colors">{service}</span>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Stats Section */}
                <motion.div
                  variants={fadeInUp}
                  className="mt-12 flex items-center justify-center lg:justify-start space-x-8"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">Companies Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">24h</div>
                    <div className="text-sm text-gray-600">Response Time</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Content - Enhanced Chatbot Interface */}
              <div className="relative">
                {/* Floating Elements Around Chatbot */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-violet-400 rounded-full animate-bounce animation-delay-1000"></div>
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-violet-300/50 rounded-full animate-pulse"></div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/40 p-8 max-w-md mx-auto relative overflow-hidden"
                >
                  {/* Enhanced Chatbot Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Staffly AI</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <p className="text-sm text-gray-500">Online • Ready to help</p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Chat Messages */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs shadow-lg">
                        <p className="text-sm">I need a virtual assistant for customer support</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md max-w-xs shadow-lg">
                        <p className="text-sm">Great! I can help you find the perfect customer support VA. What's your budget and timeline?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs shadow-lg">
                        <p className="text-sm">Budget is $500/month, need someone ASAP</p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Typing Indicator */}
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Input Field */}
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="What do you want to scale?"
                      className="flex-1 px-5 py-3 border-2 border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-lg text-gray-700 font-medium"
                    />
                    <button className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlight Services Section - Light */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Highlight Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive virtual assistant solutions designed to scale your business efficiently
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 transition-all duration-300 h-full flex flex-col">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{service.title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed flex-grow">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Dark Blue with Moving Animation */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-800 to-blue-900 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                What Our Clients Say
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Don't just take our word for it - hear from businesses that have transformed their operations
              </p>
            </motion.div>

            {/* Moving Testimonials Container */}
            <div className="relative">
              {/* First Row - Moving Left */}
              <div className="flex space-x-8 mb-8 animate-scroll-left">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-blue-200 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-blue-100 italic text-sm leading-relaxed">"{testimonial.content}"</p>
                  </div>
                ))}
              </div>

              {/* Second Row - Moving Right */}
              <div className="flex space-x-8 animate-scroll-right">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={`row2-${index}`}
                    className="flex-shrink-0 w-80 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-blue-200 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-blue-100 italic text-sm leading-relaxed">"{testimonial.content}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Video Asset Section - Light */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                See Staffly in Action
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Watch how our platform revolutionizes virtual assistant hiring and management
              </p>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
                <div className="w-full h-64 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <button className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section - Dark Blue */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-blue-800">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Choose the plan that fits your business needs and scale as you grow
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative ${plan.popular ? 'scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg border border-blue-300/30">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border ${plan.popular ? 'border-blue-400/40' : 'border-white/20'} h-full flex flex-col ${plan.popular ? 'pt-12' : ''}`}>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-blue-200">{plan.period}</span>
                    </div>
                    <p className="text-blue-100 mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                          <span className="text-blue-100">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 mt-auto ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:shadow-lg' 
                        : 'border-2 border-white text-white hover:bg-white hover:text-blue-600'
                    }`}>
                      Get Started
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section - Light */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our virtual assistant services
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100"
                >
                  <div className="flex justify-between items-center cursor-pointer">
                    <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                    <ChevronDown className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-gray-600 mt-4">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Second Headline Section - Dark Blue */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-800 to-blue-900">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-700/30 to-blue-600/30 rounded-3xl p-12 border border-blue-600/30"
            >
              <h2 className="text-5xl font-bold text-white mb-8">
                So, What are we scaling?
              </h2>
              <Link to="/hire">
                <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Start scaling
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Contact Section - Light */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's discuss how Staffly can transform your business operations
              </p>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Tell us about your project"
                    rows={4}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-4 px-8 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer - Dark Blue */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-blue-800 border-t border-blue-700/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-white">Staffly</span>
              </div>
              <div className="flex space-x-6 text-sm">
                <Link to="/terms" className="text-blue-200 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="text-blue-200 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
            <div className="mt-8 text-center text-blue-300">
              <p>&copy; 2025 Staffly. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;