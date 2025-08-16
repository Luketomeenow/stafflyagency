import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, Rocket, Star, Globe, Shield, Zap, Sparkles } from 'lucide-react';
import { FloatingOrb, MagneticCard, ShimmerButton, GlassCard, FloatingProfile, TextReveal, ParticleField } from '../components/AdvancedComponents';

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

  const profileRows = [
    {
      profiles: [
        { role: 'Human Resource', delay: 0.2 },
        { role: 'Sales', delay: 0.4 },
        { role: 'Social Media Manager', delay: 0.6 },
        { role: 'Content Creator', delay: 0.8 },
        { role: 'Data Analyst', delay: 1.0 },
      ],
      rowClass: 'infinite-scroll-row',
      top: '20%'
    },
    {
      profiles: [
        { role: 'Event Coordinator', delay: 0.3 },
        { role: 'IT Support', delay: 0.5 },
        { role: 'Customer Service', delay: 0.7 },
        { role: 'Graphic Designer', delay: 0.9 },
        { role: 'Marketing Specialist', delay: 1.1 },
      ],
      rowClass: 'infinite-scroll-row-reverse',
      top: '50%'
    },
    {
      profiles: [
        { role: 'Web Developer', delay: 0.4 },
        { role: 'Project Manager', delay: 0.6 },
        { role: 'Quality Assurance', delay: 0.8 },
        { role: 'Business Analyst', delay: 1.0 },
        { role: 'Technical Writer', delay: 1.2 },
      ],
      rowClass: 'infinite-scroll-row-slow',
      top: '80%'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <FloatingOrb 
          size="w-96 h-96" 
          colors="from-gray-600 to-gray-800" 
          delay={0}
        />
        <FloatingOrb 
          size="w-80 h-80" 
          colors="from-gray-700 to-black" 
          delay={1}
        />
        <FloatingOrb 
          size="w-72 h-72" 
          colors="from-gray-500 to-gray-700" 
          delay={2}
        />
        <ParticleField count={30} />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="text-center lg:text-left"
              >
                <TextReveal delay={0}>
                  <div className="inline-flex items-center px-6 py-3 glass-card rounded-full text-white text-sm font-medium mb-8 glow-purple">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>20,000+ Elite Virtual Assistants</span>
                  </div>
                </TextReveal>

                <TextReveal delay={0.2}>
                  <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                    The Home of{' '}
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                      Staffly Agency
                    </span>
                  </h1>
                </TextReveal>

                <TextReveal delay={0.4}>
                  <p className="text-2xl text-gray-200 mb-12 max-w-3xl leading-relaxed">
                    Connecting world-class Filipino talent with global opportunities through 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold"> AI-powered matching</span> 
                    {' '}and unmatched support.
                  </p>
                </TextReveal>

                <TextReveal delay={0.6}>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-8">
                    <Link to="/jobs">
                      <ShimmerButton className="group bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-5 px-10 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center glow-orange">
                        <Briefcase className="mr-3 w-5 h-5" />
                        I'm Looking for Jobs
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </ShimmerButton>
                    </Link>
                    
                    <Link to="/hire">
                      <ShimmerButton className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-5 px-10 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center glow-blue">
                        <Users className="mr-3 w-5 h-5" />
                        I'm Looking to Hire
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </ShimmerButton>
                    </Link>
                  </div>
                </TextReveal>

                <motion.div
                  variants={fadeInUp}
                  className="mt-12 flex items-center justify-center lg:justify-start space-x-4"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white font-semibold"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-white font-medium">20,000+ Virtual Assistants</span>
                </motion.div>
              </motion.div>

              {/* Right Content - Infinite Scroll Profiles */}
              <div className="relative h-96 lg:h-[600px] w-full hidden lg:block overflow-hidden infinite-scroll-container">
                {profileRows.map((row, rowIndex) => (
                  <div 
                    key={rowIndex}
                    className={row.rowClass}
                    style={{ top: row.top }}
                  >
                    {/* Duplicate the profiles for seamless loop */}
                    {[...row.profiles, ...row.profiles].map((profile, index) => (
                      <motion.div
                        key={`${rowIndex}-${index}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: profile.delay }}
                        className="flex-shrink-0"
                      >
                        <FloatingProfile
                          name={`${profile.role} Expert`}
                          role={profile.role}
                          initials={profile.role.substring(0, 2)}
                          position="relative"
                          delay={0}
                        />
                      </motion.div>
                    ))}
                  </div>
                ))}
                
                {/* Central Hero Element - Positioned in center of infinite scroll area */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <MagneticCard className="w-72 h-72 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-full flex items-center justify-center shadow-2xl border-4 border-gray-700/50">
                    <div className="w-64 h-64 rounded-full overflow-hidden relative border-2 border-gray-600/30">
                      {/* Stock Image Background */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                        }}
                      />
                      
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex items-center justify-center text-center">
                        <div className="bg-black/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
                          <div className="w-16 h-16 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                            <Sparkles className="w-8 h-8 text-white animate-pulse" />
                          </div>
                          <p className="text-white font-bold text-xl mb-1">Elite</p>
                          <p className="text-white/90 font-semibold text-sm">Virtual Team</p>
                        </div>
                      </div>
                    </div>
                  </MagneticCard>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <TextReveal>
              <GlassCard className="p-8 rounded-3xl glow-pink">
                <h2 className="text-3xl font-bold text-white mb-6">
                  🚀 Start Your Own Outsourcing Empire
                </h2>
                <p className="text-white/80 mb-8 text-lg">
                  Join our partner program and build a thriving VA agency with our complete business-in-a-box solution.
                </p>
                <Link to="/partner">
                  <ShimmerButton className="group bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-5 px-10 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 inline-flex items-center glow-pink">
                    <Rocket className="mr-3 w-6 h-6" />
                    Be a Partner
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </ShimmerButton>
                </Link>
              </GlassCard>
            </TextReveal>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <TextReveal>
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-6">
                  Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Staffly Agency</span>?
                </h2>
                <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                  We revolutionize how businesses connect with world-class Filipino virtual assistants, 
                  creating unprecedented opportunities and driving remarkable success.
                </p>
              </div>
            </TextReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Globe,
                  title: 'Global Reach',
                  description: 'Connect with businesses and talent worldwide',
                  color: 'from-blue-400 to-cyan-500'
                },
                {
                  icon: Shield,
                  title: 'Trusted Platform',
                  description: 'Secure and reliable hiring process',
                  color: 'from-green-400 to-emerald-500'
                },
                {
                  icon: Zap,
                  title: 'AI-Powered Matching',
                  description: 'Lightning-fast intelligent talent matching',
                  color: 'from-yellow-400 to-orange-500'
                },
                {
                  icon: Star,
                  title: 'Elite Quality',
                  description: 'Pre-vetted and exceptionally skilled professionals',
                  color: 'from-purple-400 to-pink-500'
                }
              ].map((feature, index) => (
                <MagneticCard key={index}>
                  <GlassCard className={`p-8 rounded-3xl text-center h-full glow-${feature.color.includes('blue') ? 'blue' : feature.color.includes('green') ? 'blue' : feature.color.includes('yellow') ? 'pink' : 'purple'}`}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-200 leading-relaxed">{feature.description}</p>
                  </GlassCard>
                </MagneticCard>
              ))}
            </div>
          </div>
        </section>

        {/* Footer with Legal Links */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/80">
                <p>&copy; 2025 Staffly Agency. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <Link to="/terms" className="text-white/80 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="text-white/80 hover:text-white transition-colors">
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

export default LandingPage;