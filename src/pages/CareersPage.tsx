import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight, Users, Zap, Heart, TrendingUp, Award, Globe, Sparkles } from 'lucide-react';
import { Footer } from '../components/footer-1';
import Header from '../components/header-1';

const CareersPage = () => {
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

  const jobOpenings = [
    {
      id: 1,
      title: 'Executive Assistant',
      department: 'Operations',
      location: 'Remote (Philippines)',
      type: 'Full-time',
      salary: '$1,200 - $1,500/month',
      description: 'Support founders and executives with calendar management, inbox organization, meeting prep, and documentation. Build light systems and install communication cadences.',
      requirements: [
        '3+ years of executive assistant experience',
        'Excellent communication and organizational skills',
        'Proficiency in Notion, ClickUp, or similar tools',
        'Strong attention to detail and proactive mindset'
      ],
      responsibilities: [
        'Manage executive calendars and schedule meetings',
        'Prepare meeting agendas and take detailed notes',
        'Handle email correspondence and prioritization',
        'Create and maintain SOPs and documentation'
      ]
    },
    {
      id: 2,
      title: 'Project Coordinator',
      department: 'Operations',
      location: 'Remote (Philippines)',
      type: 'Full-time',
      salary: '$1,500 - $2,000/month',
      description: 'Coordinate projects across teams, manage roadmaps and timelines, track resources, and ensure work ships on time with quality.',
      requirements: [
        '2+ years of project coordination experience',
        'Experience with project management tools (Asana, Trello, ClickUp)',
        'Strong organizational and communication skills',
        'Ability to manage multiple projects simultaneously'
      ],
      responsibilities: [
        'Create and maintain project roadmaps and timelines',
        'Coordinate cross-team communications',
        'Track project resources and budgets',
        'Identify and manage project risks and issues'
      ]
    },
    {
      id: 3,
      title: 'Sales Support Specialist',
      department: 'Sales & Growth',
      location: 'Remote (Philippines)',
      type: 'Full-time',
      salary: '$1,800 - $2,200/month',
      description: 'Support sales operations with CRM management, lead routing, meeting scheduling, and sales enablement. Help maintain a clear pipeline and repeatable sales motion.',
      requirements: [
        '2+ years of sales support or operations experience',
        'CRM experience (HubSpot, Salesforce, or similar)',
        'Strong data management and reporting skills',
        'Excellent communication and follow-up abilities'
      ],
      responsibilities: [
        'Maintain CRM hygiene and data accuracy',
        'Route and qualify leads for sales team',
        'Schedule and coordinate sales meetings',
        'Create sales enablement materials and reports'
      ]
    },
    {
      id: 4,
      title: 'Customer Experience Specialist',
      department: 'Customer Success',
      location: 'Remote (Philippines)',
      type: 'Full-time',
      salary: '$1,200 - $1,600/month',
      description: 'Provide responsive and consistent customer support through call handling, appointment booking, ticketing, and maintaining response-time SLAs.',
      requirements: [
        '2+ years of customer service experience',
        'Excellent verbal and written communication',
        'Experience with helpdesk/ticketing systems',
        'Patient, empathetic, and solution-oriented'
      ],
      responsibilities: [
        'Handle customer calls and inquiries',
        'Book appointments and manage scheduling',
        'Manage support tickets and escalations',
        'Maintain response-time SLAs and quality standards'
      ]
    },
    {
      id: 5,
      title: 'Marketing Operations Coordinator',
      department: 'Marketing',
      location: 'Remote (Philippines)',
      type: 'Full-time',
      salary: '$1,500 - $1,900/month',
      description: 'Coordinate marketing operations including content calendars, asset management, creator/vendor coordination, and basic analytics.',
      requirements: [
        '2+ years of marketing operations experience',
        'Experience with content management systems',
        'Basic analytics and reporting skills',
        'Strong organizational and coordination abilities'
      ],
      responsibilities: [
        'Manage content calendars and publishing schedules',
        'Coordinate with creators and vendors',
        'Organize and maintain marketing assets',
        'Track and report on marketing metrics'
      ]
    },
    {
      id: 6,
      title: 'Operations Manager',
      department: 'Operations',
      location: 'Remote (Philippines)',
      type: 'Full-time',
      salary: '$2,500 - $3,500/month',
      description: 'Lead operations and manage teams as a proactive right-hand operator. Drive structure, reporting, and accountability across departments.',
      requirements: [
        '5+ years of operations management experience',
        'Proven track record of team leadership',
        'Strong systems thinking and process optimization',
        'Excellent strategic planning and execution skills'
      ],
      responsibilities: [
        'Lead and manage operational teams',
        'Develop and implement operational strategies',
        'Create reporting frameworks and dashboards',
        'Drive accountability and performance metrics'
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health coverage for you and your family'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Continuous learning opportunities and clear career paths'
    },
    {
      icon: Globe,
      title: 'Remote First',
      description: 'Work from anywhere with flexible schedules'
    },
    {
      icon: Award,
      title: 'Performance Bonuses',
      description: 'Recognition and rewards for exceptional work'
    },
    {
      icon: Users,
      title: 'Great Culture',
      description: 'Join a team that values excellence and ownership'
    },
    {
      icon: Zap,
      title: 'Modern Tools',
      description: 'Access to the best tools and technologies'
    }
  ];

  const values = [
    {
      title: 'Excellence over comfort',
      description: 'We hire top-grade talent and maintain high standards in everything we do.'
    },
    {
      title: 'Frameworks over vibes',
      description: 'We use proven delegation laws, trust principles, and simple playbooks.'
    },
    {
      title: 'Communication over chaos',
      description: 'We maintain predictable rhythms that build trust fast.'
    },
    {
      title: 'Learning over ego',
      description: 'We value coachability, feedback tolerance, and continuous improvement.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Job Postings Focus */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 pt-24 pb-16">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

        <div className="container relative z-10 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 border border-white/30"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {jobOpenings.length} Open Positions
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
            >
              Join the Future of{' '}
              <span className="relative inline-block">
                <span className="relative z-10">AI-Powered Work</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-yellow-400/30 -rotate-1"></span>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Build your career with a team that values excellence, innovation, and growth. Help us empower businesses with world-class Filipino talent.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
            >
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-black text-white">50+</div>
                <div className="text-sm text-blue-100 mt-1">Team Members</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-black text-white">100%</div>
                <div className="text-sm text-blue-100 mt-1">Remote</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-black text-white">4.8/5</div>
                <div className="text-sm text-blue-100 mt-1">Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-slate-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These principles guide everything we do and everyone we hire
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-gradient-to-br from-blue-800 to-blue-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-white mb-6">
              Why Join Staffly?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We invest in our team's success and well-being
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <benefit.icon className="w-12 h-12 text-blue-300 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-blue-100 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="section bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-slate-900 mb-6">
              Open <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Positions</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Find your perfect role and start making an impact
            </p>
          </motion.div>

          <div className="space-y-6 max-w-6xl mx-auto">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-slate-600">
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span className="text-sm">{job.department}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{job.type}</span>
                      </div>
                      <div className="flex items-center text-blue-600 font-semibold">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span className="text-sm">{job.salary}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-6">{job.description}</p>
                  </div>
                  <div className="lg:ml-8">
                    <Link to="/apply">
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2 whitespace-nowrap">
                        <span>Apply Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start text-slate-600">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Responsibilities</h4>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start text-slate-600">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          <span className="text-sm">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-blue-800 to-blue-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold text-white mb-8">
              Don't See Your Role?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We're always looking for talented individuals. Send us your resume and let us know how you can contribute to our mission.
            </p>
            <Link to="/apply">
              <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto">
                <span>Submit General Application</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;

