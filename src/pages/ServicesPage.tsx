import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Phone, 
  Settings, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Briefcase,
  Rocket,
  Target,
  BarChart3
} from 'lucide-react';
import { GlassCard, ShimmerButton, MagneticCard, TextReveal } from '../components/AdvancedComponents';

const ServicesPage = () => {
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
      title: 'Remote Staffing Solutions',
      subtitle: 'Virtual & Executive Assistants',
      description: 'Access to a curated pool of 20,000+ pre-vetted Filipino professionals across all industries and skill levels.',
      features: [
        'Pre-screened and tested candidates',
        'Flexible hiring models (full-time, part-time, project-based)',
        'Dedicated account manager',
        'Performance monitoring and support',
        '2-week trial period included'
      ],
      color: 'from-blue-500 to-cyan-600',
      glow: 'glow-blue'
    },
    {
      icon: Phone,
      title: 'AutoCaller AI Voice-Cloning',
      subtitle: 'Outbound SDR Outreach',
      description: 'Revolutionary AI-powered calling system that scales your sales outreach with human-like voice interactions.',
      features: [
        'Custom voice cloning technology',
        'Multi-language support',
        'Advanced call analytics and reporting',
        'Integration with major CRMs',
        'Compliance with international calling laws'
      ],
      color: 'from-green-500 to-emerald-600',
      glow: 'glow-green'
    },
    {
      icon: Settings,
      title: 'Systems & Automations Buildouts',
      subtitle: 'Complete Business Infrastructure',
      description: 'End-to-end automation solutions that streamline your operations and eliminate manual processes.',
      features: [
        'Workflow automation design',
        'CRM and tool integration',
        'Custom software development',
        'Process documentation and SOPs',
        'Ongoing maintenance and updates'
      ],
      color: 'from-purple-500 to-pink-600',
      glow: 'glow-purple'
    },
    {
      icon: TrendingUp,
      title: 'Strategic Business Development',
      subtitle: 'Sales Advisory & Growth',
      description: 'Expert consulting to accelerate your business growth with proven strategies and market insights.',
      features: [
        'Market analysis and strategy',
        'Sales process optimization',
        'Revenue growth planning',
        'Team structure and scaling',
        'Performance metrics and KPIs'
      ],
      color: 'from-orange-500 to-red-600',
      glow: 'glow-orange'
    }
  ];

  const stats = [
    { number: '20,000+', label: 'Virtual Assistants', icon: Users },
    { number: '95%', label: 'Client Satisfaction', icon: Star },
    { number: '500+', label: 'Businesses Served', icon: Briefcase },
    { number: '24/7', label: 'Support Available', icon: Shield }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Assessment',
      description: 'We analyze your business needs and create a customized solution plan.',
      icon: Target
    },
    {
      step: '02',
      title: 'Strategy & Planning',
      description: 'Detailed roadmap development with timelines and milestones.',
      icon: BarChart3
    },
    {
      step: '03',
      title: 'Implementation & Training',
      description: 'Seamless execution with comprehensive training for your team.',
      icon: Rocket
    },
    {
      step: '04',
      title: 'Ongoing Support',
      description: 'Continuous monitoring, optimization, and support for long-term success.',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center mb-16"
          >
            <TextReveal delay={0}>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
                Our{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Services
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Comprehensive B2B solutions designed to scale your business efficiently. 
                From remote staffing to AI-powered automation, we've got you covered.
              </p>
            </TextReveal>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <MagneticCard>
                  <GlassCard className={`p-8 rounded-3xl h-full ${service.glow}`}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-lg font-semibold text-gray-600 mb-4">{service.subtitle}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/contact">
                      <ShimmerButton className={`w-full bg-gradient-to-r ${service.color} text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center`}>
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </ShimmerButton>
                    </Link>
                  </GlassCard>
                </MagneticCard>
              </motion.div>
            ))}
          </div>

          {/* Process Section */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful implementation and long-term results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {processSteps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <MagneticCard>
                  <GlassCard className="p-6 rounded-2xl text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </GlassCard>
                </MagneticCard>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div variants={fadeInUp} className="text-center">
            <GlassCard className="p-12 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join hundreds of businesses that have already scaled their operations with our proven solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <ShimmerButton className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center">
                    Get Started Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </ShimmerButton>
                </Link>
                <Link to="/hire">
                  <ShimmerButton className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </ShimmerButton>
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Staffly Agency?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another service provider. We're your strategic partner in growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Global Expertise',
                description: 'International experience with businesses across North America and beyond.'
              },
              {
                icon: Shield,
                title: 'Trusted Partner',
                description: 'Long-term relationships built on transparency, reliability, and results.'
              },
              {
                icon: Zap,
                title: 'Innovation First',
                description: 'Cutting-edge technology and methodologies to stay ahead of the curve.'
              },
              {
                icon: Star,
                title: 'Quality Assured',
                description: 'Rigorous vetting processes and ongoing quality monitoring.'
              },
              {
                icon: Users,
                title: 'Dedicated Support',
                description: 'Personal account managers and 24/7 support for all clients.'
              },
              {
                icon: TrendingUp,
                title: 'Proven Results',
                description: 'Track record of helping businesses achieve significant growth and efficiency gains.'
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <MagneticCard>
                  <GlassCard className="p-6 rounded-2xl text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </GlassCard>
                </MagneticCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
