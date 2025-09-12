import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, Rocket, Star, Globe, Shield, Zap, Sparkles, MessageCircle, Check, ChevronDown, Crown } from 'lucide-react';
import FloatingNavbar from '../components/FloatingNavbar';
import FullScreenChatbot from '../components/FullScreenChatbot';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import DarkVeil from '../components/DarkVeil';
import SplitTextAnimation from '../components/SplitTextAnimation';
import MagicBento from '../components/MagicBento';
import CardSwap, { Card } from '../components/CardSwap';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const location = useLocation();
  const [openChatbot, setOpenChatbot] = useState(false);

  // Reset chatbot state when it's closed
  useEffect(() => {
    if (openChatbot) {
      const timer = setTimeout(() => {
        setOpenChatbot(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [openChatbot]);

  useEffect(() => {
    // Handle anchor links for smooth scrolling
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location]);

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
                {/* Hero Section - Professional Design with White Background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100/20 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="container-wide relative z-15 pt-[1500px] pb-10">
            <div className="max-w-10xl mx-auto text-center">
              {/* Main Content */}
              {/* Hero Text */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="text-center mt-40"
              >
                {/* Main Headline */}
                <div className="mb-8">
                  <div className="text-6xl lg:text-7xl font-black text-slate-900 leading-tight">
                    <SplitTextAnimation
                      text="Hire A+"
                      className="inline-block"
                      delay={0.2}
                      stagger={0.1}
                    />
                    <span className="inline-block mr-2"> </span>
                    <SplitTextAnimation
                      text="Operators"
                      className="inline-block"
                      delay={0.6}
                      stagger={0.1}
                      gradient={true}
                      gradientColors="from-blue-600 to-purple-600"
                    />
                  </div>
                  <SplitTextAnimation
                    text="— For 60% Less"
                    className="text-4xl lg:text-5xl font-bold text-slate-700 mt-4"
                    delay={0.8}
                    stagger={0.05}
                  />
                </div>

                {/* Subheadline */}
                <motion.p
                  variants={fadeInUp}
                  className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
                >
                  Get qualified <span className="text-slate-800 font-semibold">A+ VA profiles</span> in the palm of your hand by chatting with{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">Staffly AI</span>
                </motion.p>

                {/* AI Chatbot - Centered Input Field */}
                <motion.div
                  variants={fadeInUp}
                  className="mb-12"
                >
                  <div className="flex justify-center w-full">
                    <div className="w-full max-w-6xl">
                      <FullScreenChatbot autoOpen={openChatbot} />
                    </div>
                  </div>
                </motion.div>



                {/* Social Proof */}
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center justify-center space-x-8"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">500+</div>
                    <div className="text-sm text-slate-600">Companies Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">98%</div>
                    <div className="text-sm text-slate-600">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">24h</div>
                    <div className="text-sm text-slate-600">Response Time</div>
                  </div>
                </motion.div>

                
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Story Section - Professional Design */}
        <section id="our-story" className="section bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100/20 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="container relative z-10">
                <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100/50 text-blue-700 text-sm font-semibold rounded-full mb-6 border border-blue-200/50">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Our Mission
                    </div>
              
              <h2 className="text-6xl font-black text-slate-900 mb-8 leading-tight">
                Our <span className="gradient-text">Story</span>
              </h2>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-3xl font-bold text-slate-800 mb-8 leading-tight">
                  We wouldn't wait for culture to fix itself—<br />
                  <span className="gradient-text">so we built one that wins.</span>
                </p>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  Our founder left a stagnant, protection-first environment to create an agency that{' '}
                  <span className="font-semibold text-slate-800">demands excellence and rewards ownership</span>. 
                  We believe the 'people business' is the future—{' '}
                  <span className="gradient-text font-semibold">amplified by AI</span>, governed by clear frameworks, 
                  and delivered by operators who think like you.
                </p>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Principles */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                    <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"></div>
                    What guides us:
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      {
                        title: "Excellence over comfort",
                        description: "Top-grade talent and high standards."
                      },
                      {
                        title: "Frameworks over vibes",
                        description: "Delegation laws, trust principles (UATCI: Understanding, Ability, Track record, Character, Intention), and simple playbooks anyone can run."
                      },
                      {
                        title: "Communication over chaos",
                        description: "Predictable rhythms that build trust fast."
                      },
                      {
                        title: "Learning over ego",
                        description: "Coachability, feedback tolerance, and continuous improvement."
                      }
                    ].map((principle, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                          <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {principle.title}
                          </h4>
                          <p className="text-slate-600 leading-relaxed">
                            {principle.description}
                          </p>
                      </div>
                      </motion.div>
                    ))}
                    </div>
                  </div>
              </motion.div>

              {/* Right Column - Vision */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-10 text-white relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                      backgroundSize: '40px 40px'
                    }}></div>
                      </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-6 flex items-center">
                      <div className="w-12 h-1 bg-white/30 rounded-full mr-4"></div>
                      The vision:
                    </h3>
                    
                    <p className="text-xl leading-relaxed text-blue-50">
                      An <strong className="text-white">AI-assisted talent marketplace</strong> that lets founders filter by industry/role and instantly meet curated, prepped candidates—<strong className="text-white">quality first, resume dumps never</strong>.
                    </p>
                    
                    <div className="mt-8 flex items-center space-x-4">
                      <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                      </div>
                    </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce shadow-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '1s' }}></div>
              </motion.div>
                      </div>
                    </div>
        </section>

        {/* Services Section - Scroll Stack Effect */}
        <section id="services" className="section bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100/20 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100/50 text-blue-700 text-sm font-semibold rounded-full mb-6 border border-blue-200/50">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Our Services
                      </div>
              
              <h2 className="text-6xl font-black text-slate-900 mb-8 leading-tight">
                Comprehensive <span className="gradient-text">Solutions</span>
              </h2>
              
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Elite virtual assistants designed to scale your business with precision and expertise
              </p>
            </motion.div>

            <MagicBento
              services={[
                {
                  title: "Executive Assistants & Operator EAs",
                  outcome: "Founder leverage and calm execution",
                  description: "Professional support for founders and executives",
                  icon: "👔",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "from-blue-50 to-blue-100",
                  borderColor: "border-blue-200",
                  features: [
                    "Calendar, inbox, meeting prep, documentation",
                    "Install cadence (GM/EOD, weekly priorities)",
                    "Build light systems: Notion, ClickUp/Trello, SOPs"
                  ]
                },
                {
                  title: "Operations & Project Coordination",
                  outcome: "Work that ships on time",
                  description: "Streamlined project management and operations",
                  icon: "⚡",
                  color: "from-violet-500 to-violet-600",
                  bgColor: "from-violet-50 to-violet-100",
                  borderColor: "border-violet-200",
                  features: [
                    "Roadmaps, timelines, resource tracking",
                    "Cross-team comms, risk/issue tracking",
                    "Tooling setup and hygiene (CRM/PM stack)"
                  ]
                },
                {
                  title: "Sales & Growth Support",
                  outcome: "Clear pipeline and repeatable motion",
                  description: "Accelerate your sales and growth initiatives",
                  icon: "🚀",
                  color: "from-green-500 to-green-600",
                  bgColor: "from-green-50 to-green-100",
                  borderColor: "border-green-200",
                  features: [
                    "CRM hygiene, lead routing, meeting set",
                    "Enablement assets, call notes, reporting",
                    "Daily/weekly sales cadence and support"
                  ]
                },
                {
                  title: "Customer Experience & Reception",
                  outcome: "Responsive, consistent customer touchpoints",
                  description: "Professional front desk and customer support",
                  icon: "🎯",
                  color: "from-orange-500 to-orange-600",
                  bgColor: "from-orange-50 to-orange-100",
                  borderColor: "border-orange-200",
                  features: [
                    "Call handling/triage, appointment booking",
                    "Ticketing, FAQs, light upsell flows",
                    "Response-time SLAs, escalation rules"
                  ]
                },
                {
                  title: "Marketing Ops & Social",
                  outcome: "Consistent, on-brand presence",
                  description: "Strategic marketing operations and social media",
                  icon: "📱",
                  color: "from-purple-500 to-purple-600",
                  bgColor: "from-purple-50 to-purple-100",
                  borderColor: "border-purple-200",
                  features: [
                    "Content calendars, asset coordination",
                    "Creator/vendor wrangling, briefs",
                    "Basic analytics and iteration loops"
                  ]
                },
                {
                  title: "Advisory & Playbooks",
                  outcome: "Team that knows how to delegate and lead",
                  description: "Strategic guidance and operational frameworks",
                  icon: "📚",
                  color: "from-indigo-500 to-indigo-600",
                  bgColor: "from-indigo-50 to-indigo-100",
                  borderColor: "border-indigo-200",
                  features: [
                    "Delegation frameworks and launch plans",
                    "Scorecards and 1:1 templates with PCE",
                    "Manager coaching and QA reviews"
                  ]
                }
              ]}
            />
            </div>

            {/* What's Consistent Across Services */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-40 bg-gradient-to-r from-slate-100 to-blue-100 rounded-3xl p-10 border border-slate-200 shadow-xl"
            >
              <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">What's consistent across services</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Curated Shortlists</h4>
                      <p className="text-slate-600">2-4 finalists, pre-briefed on your context</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">PCE Scoring</h4>
                      <p className="text-slate-600">Preparation, Capability, Execution on every candidate</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Account Management</h4>
                      <p className="text-slate-600">Early micro-observations and monthly reviews</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Quality First</h4>
                      <p className="text-slate-600">No "cheapest wins" - we optimize for quality and reliability</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
        </section>

        {/* Pricing Section - Real Pricing */}
        <section id="pricing" className="section bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100/20 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-6xl font-black text-slate-900 mb-8 leading-tight">
                PRICING & <span className="gradient-text">SERVICES</span>
              </h2>
              
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Average A player placement at minimum wage monthly overhead.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Staffly Starter */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Staffly Starter</h3>
                  <div className="text-5xl font-black text-slate-900 mb-2">$1800</div>
                  <div className="text-slate-600 font-medium">USD/mo</div>
                  <p className="text-slate-500 text-sm mt-2">(Recruit, Team Lead & HR)</p>
                  <p className="text-slate-600 text-sm mt-2">Up to 120 hours monthly collective clock in time.</p>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:shadow-lg transition-all duration-300">
                  Get Started
                </button>
              </motion.div>

              {/* Staffly Growth */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-blue-400/40 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group relative"
              >
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">
                    Most Popular
                  </div>
                </div>
                
                <div className="text-center mb-8 pt-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Staffly Growth</h3>
                  <div className="text-5xl font-black text-slate-900 mb-2">$2500</div>
                  <div className="text-slate-600 font-medium">USD/mo</div>
                  <p className="text-slate-600 text-sm mt-2">Up to 160 hours monthly collective clock in time.</p>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:shadow-lg transition-all duration-300">
                  Get Started
                </button>
              </motion.div>

              {/* Staffly Executive */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Staffly Executive</h3>
                  <div className="text-slate-600 font-medium mb-4">Click here to learn more</div>
                  <p className="text-slate-500 text-sm">Click here to generate your scope and we'll send you candidates and their on target OTE expectations.</p>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:shadow-lg transition-all duration-300">
                  Learn More
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Card Swap Animation */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-800 to-blue-900 overflow-hidden">
          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content - Middle Left */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-left"
              >
                <h2 className="text-4xl font-bold text-white mb-6">
                  What Our Clients Say
                </h2>
                <p className="text-xl text-blue-100 max-w-3xl">
                  Don't just take our word for it - hear from businesses that have transformed their operations
                </p>
              </motion.div>

              {/* Card Swap Testimonials - Right Side */}
              <div className="relative" style={{ height: '600px' }}>
              <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={true}
                width={500}
                height={400}
                onCardClick={(index: number) => console.log('Card clicked:', index)}
              >
                {testimonials.map((testimonial, index) => (
                  <Card key={index} customClass="bg-white/90 backdrop-blur-xl p-8 shadow-2xl border border-white/30">
                    <div className="text-center">
                      <div className="text-6xl text-blue-500/20 mb-6">"</div>
                      <blockquote className="text-xl text-slate-700 leading-relaxed mb-8 italic">
                        {testimonial.content}
                      </blockquote>
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg">{testimonial.name}</h4>
                          <p className="text-slate-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center space-x-1 mt-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Booking Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Book a Consultation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to transform your business with virtual assistants? Schedule a free consultation to discuss your needs.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <iframe
                src="https://calendly.com/stafflyhq/consultation"
                width="100%"
                height="700"
                frameBorder="0"
                title="Book a Consultation"
                className="rounded-xl"
              ></iframe>
            </motion.div>
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
              <button 
                onClick={() => setOpenChatbot(true)}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Start scaling
              </button>
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

        {/* Disclaimer Section - Professional Design */}
        <section className="section bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100/20 to-transparent rounded-full blur-3xl"></div>
                </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100/50 text-blue-700 text-sm font-semibold rounded-full mb-6 border border-blue-200/50">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                Legal Information
              </div>
              
              <h2 className="text-6xl font-black text-slate-900 mb-8 leading-tight">
                Important <span className="gradient-text">Disclaimer</span>
              </h2>
              
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Please review our terms and understand the scope of our services
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-slate-200/50 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                
                <div className="relative z-10 space-y-8">
                  {/* Main Disclaimer */}
                  <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Service Scope & Limitations</h3>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
                      Staffly is a platform that connects businesses with virtual assistants. While we strive to provide high-quality services and carefully vet our virtual assistants, we cannot guarantee specific outcomes or results.
                    </p>
                  </div>

                  {/* Key Points Grid */}
                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-white/60 rounded-2xl p-6 border border-slate-200/50">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-2">What We Provide</h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            High-quality virtual assistant profiles, comprehensive vetting, and ongoing support for successful partnerships.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/60 rounded-2xl p-6 border border-slate-200/50">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-2">What We Don't Guarantee</h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            Specific outcomes, results, or performance levels as these depend on various factors beyond our control.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
                      <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Success Factors
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        The success of any virtual assistant relationship depends on clear communication, proper training, ongoing management, and collaborative effort between your business and the virtual assistant.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
                      <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Our Recommendations
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        We strongly recommend providing clear expectations, proper onboarding, and ongoing feedback to maximize the effectiveness of your virtual assistant partnerships.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/20">
                      <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                        </svg>
                        Independent Contractors
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        Virtual assistants are independent contractors. Staffly is not responsible for their actions, performance, or conduct, as they operate independently from our platform.
                      </p>
                    </div>
                  </div>

                  {/* Final Acknowledgment */}
                  <div className="text-center pt-6 border-t border-slate-200">
                    <p className="text-slate-700 leading-relaxed">
                      By using our services, you acknowledge that you understand these terms and agree to work collaboratively with your virtual assistant to achieve your business goals.
                    </p>
                    <div className="mt-6 flex items-center justify-center space-x-2 text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-sm font-medium">Your success is our priority</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer - Beautiful Design */}
        <footer className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100/20 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="container relative z-10">
            {/* Main Footer Content */}
            <div className="grid lg:grid-cols-4 gap-12 py-20">
              {/* Company Info */}
              <div className="lg:col-span-2">
                                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Staffly</h3>
                      <p className="text-blue-600 text-sm">Elite Virtual Assistants</p>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-6 max-w-md leading-relaxed">
                    Transform your business with A+ virtual assistants. We connect you with elite talent that thinks like you do.
                  </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li><Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">Home</Link></li>
                  <li><Link to="/#our-story" className="text-slate-600 hover:text-slate-900 transition-colors">Our Story</Link></li>
                  <li><Link to="/#services" className="text-slate-600 hover:text-slate-900 transition-colors">Services</Link></li>
                  <li><Link to="/#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link></li>
                  <li><Link to="/hire" className="text-slate-600 hover:text-slate-900 transition-colors">Hire VAs</Link></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-6">Services</h4>
                <ul className="space-y-3">
                  <li><span className="text-slate-600">Executive Assistants</span></li>
                  <li><span className="text-slate-600">Operations & Project Coordination</span></li>
                  <li><span className="text-slate-600">Sales & Growth Support</span></li>
                  <li><span className="text-slate-600">Customer Experience</span></li>
                  <li><span className="text-slate-600">Marketing Operations</span></li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-slate-200 pt-8 pb-12">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-6 text-sm">
                  <Link to="/terms" className="text-slate-500 hover:text-slate-700 transition-colors">
                  Terms of Service
                </Link>
                  <Link to="/privacy" className="text-slate-500 hover:text-slate-700 transition-colors">
                  Privacy Policy
                </Link>
                  <span className="text-slate-500">Cookie Policy</span>
              </div>
                
                <div className="text-center md:text-right">
                  <p className="text-slate-500 text-sm mb-2">
                    &copy; 2025 Staffly. All rights reserved.
                  </p>
                  <p className="text-slate-400 text-xs">
                    Made with ❤️ for scaling businesses
                  </p>
            </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;