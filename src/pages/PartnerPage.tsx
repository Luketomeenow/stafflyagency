import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, CheckCircle, ArrowRight, Users, Globe, Shield, TrendingUp, Star, DollarSign } from 'lucide-react';
import placeholderImg from '../assets/images/placeholder.png';

const PartnerPage = () => {
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

  const features = [
    {
      icon: Users,
      title: 'All-In-One System',
      description: 'Complete platform for managing your VA business',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Globe,
      title: 'VA Recruitment Software',
      description: 'Advanced tools to find and hire the best talent',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Support',
      description: '24/7 dedicated support for your business growth',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const benefits = [
    { text: 'Build your own VA agency', icon: CheckCircle },
    { text: 'Access to 20,000+ pre-vetted VAs', icon: CheckCircle },
    { text: 'White-label platform available', icon: CheckCircle },
    { text: 'Comprehensive training included', icon: CheckCircle },
    { text: 'Ongoing technical support', icon: CheckCircle },
    { text: 'Revenue sharing opportunities', icon: CheckCircle },
  ];

  const stats = [
    { number: '500+', label: 'Active Partners', icon: Users },
    { number: '$2M+', label: 'Partner Revenue', icon: DollarSign },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
    { number: '24/7', label: 'Support Available', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8"
              >
                <div className="flex items-center space-x-2">
                  <img src={placeholderImg} alt="PinoyVA" className="w-6 h-6 rounded" />
                  <span>x</span>
                  <img src={placeholderImg} alt="Artisko" className="w-6 h-6 rounded" />
                  <span className="ml-2">Partnership Program</span>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Start Your Own<br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Outsourcing Agency
                </span>{' '}
                <span className="inline-block">🚀</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Build your website, launch your brand, and run everything in one system<br />
                so you can focus on getting clients and growing fast.
              </motion.p>

              {/* Feature Pills */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap justify-center gap-4 mb-12"
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}>
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{feature.title}</span>
                  </div>
                ))}
              </motion.div>

              <motion.button
                variants={fadeInUp}
                className="group bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-5 px-10 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto text-lg"
              >
                <Rocket className="mr-3 w-6 h-6" />
                Launch Your Business
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
                    <p className="text-white/80">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Complete business-in-a-box solution for launching your VA agency
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/80 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">What's Included</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Partner Success Stories</h2>
              <p className="text-xl text-white/80">See how our partners are building successful VA agencies</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Chen',
                  company: 'VA Solutions Pro',
                  revenue: '$50K/month',
                  story: 'Built a 6-figure agency in 8 months with Staffly Agency platform',
                  rating: 5
                },
                {
                  name: 'Michael Rodriguez',
                  company: 'Global VA Partners',
                  revenue: '$35K/month',
                  story: 'Scaled from 0 to 50 clients using our recruitment tools',
                  rating: 5
                },
                {
                  name: 'Lisa Wang',
                  company: 'Elite Virtual Team',
                  revenue: '$28K/month',
                  story: 'Launched successful niche agency specializing in e-commerce VAs',
                  rating: 5
                }
              ].map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {story.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{story.name}</h4>
                      <p className="text-white/80 text-sm">{story.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-white/90 mb-4">{story.story}</p>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold inline-block">
                    {story.revenue}
                  </div>
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
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Launch Your VA Agency?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Join hundreds of successful partners and start building your outsourcing empire today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  <Rocket className="mr-2 w-5 h-5" />
                  Start Your Agency Now
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300">
                  Schedule a Demo
                </button>
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

export default PartnerPage;