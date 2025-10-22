// Removed FloatingNavbar in favor of Magic UI Header
import FullScreenChatbot from '../components/FullScreenChatbot';
import { Hero } from '../components/hero-1';
import { Pricing } from '../components/pricing-1';
import { Component as FAQ } from '../components/faq-4';
import { Footer } from '../components/footer-1';
import { Companies as CompaniesMarquee } from '../components/social-proof-companies-3';
import { SocialProofTestimonials as TestimonialsMarquee } from '../components/social-proof-testimonials-3';
import { FeatureSection } from '../components/feature-2';
import { Component as EmpowerSection } from '../components/feature-6';
import { CallToAction } from '../components/call-to-action-1';
import CalComEmbed from '../components/CalComEmbed';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const AIAgentPage = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  // Smooth scroll behavior
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98] as any
      }
    }
  };

  return (
    <div ref={containerRef as any} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="pt-0">
        <Hero />
        <CompaniesMarquee />
        <TestimonialsMarquee />
        {/* Our Story */}
        <section id="our-story" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100/20 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Our Mission Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto mb-24"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-6 border border-blue-100">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  Our Mission
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                  Redefining <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Outsourcing</span>
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Building the world's first platform of <span className="font-semibold text-slate-900">AI Enhanced Operators</span> — Filipino talent trained to become long-term Executive Assistants and future Chiefs of Staff.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* For Founders Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">For Founders</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      We give you leverage, buy back your time, and help you scale your business with trusted operators who grow with you.
                    </p>
                  </div>
                </motion.div>

                {/* For Operators Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl hover:border-purple-300 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">For Operators</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      We nurture talent to master AI, grow in responsibility, and evolve into trusted executives who support companies for years.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Our Story - Evolution Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-purple-100/50 text-purple-700 text-sm font-semibold rounded-full mb-6 border border-purple-200/50">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                  Our Story
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                  The Evolution of <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Outsourcing</span>
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Outsourcing in the Philippines has gone through phases. Here's how we're changing the game.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 transform md:-translate-x-1/2"></div>

                {/* Phase 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="relative mb-16 md:mb-24"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <div className="md:w-1/2 md:text-right md:pr-12">
                      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-300">
                        <div className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-full mb-4">
                          Phase 1
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">The Early BPO Years</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          Runners, customer service agents, and admins handling repetitive, low-value tasks.
                        </p>
                        <p className="text-slate-500 italic">
                          Businesses got cheap labor, but no real leverage.
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                </motion.div>

                {/* Phase 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative mb-16 md:mb-24"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <div className="md:w-1/2"></div>
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <div className="md:w-1/2 md:pl-12">
                      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-blue-200/50 hover:shadow-2xl transition-all duration-300">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-bold rounded-full mb-4">
                          Phase 2
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">The Digital Footprint Era</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          Businesses started needing websites, content and social media management to build their online presence.
                        </p>
                        <p className="text-slate-500 italic">
                          Creative roles entered the picture, but most providers delivered execution without frameworks, consistency, or ROI. Talent was still treated as task-doers, not long-term operators.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Phase 3 - StafflyAI Movement */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <div className="md:w-1/2 md:text-right md:pr-12">
                      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl border-4 border-white relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                            backgroundSize: '30px 30px'
                          }}></div>
                        </div>
                        
                        <div className="relative z-10">
                          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-full mb-4 border border-white/30">
                            Phase 3 - NOW
                          </div>
                          <h3 className="text-4xl font-black text-white mb-4 flex items-center gap-3">
                            <span>⚡</span>
                            The StafflyAI Movement
                          </h3>
                          <p className="text-white text-lg leading-relaxed mb-6">
                            We created <strong className="text-yellow-300">AI Enhanced Operators</strong>.
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3 text-white">
                              <span className="text-yellow-300 text-xl">✓</span>
                              <p className="text-blue-50">Full-time operators equipped with AI workflows</p>
                            </div>
                            <div className="flex items-start gap-3 text-white">
                              <span className="text-yellow-300 text-xl">✓</span>
                              <p className="text-blue-50">Proven frameworks and success managers</p>
                            </div>
                            <div className="flex items-start gap-3 text-white">
                              <span className="text-yellow-300 text-xl">✓</span>
                              <p className="text-blue-50">Designed to multiply business output</p>
                            </div>
                            <div className="flex items-start gap-3 text-white">
                              <span className="text-yellow-300 text-xl">✓</span>
                              <p className="text-blue-50">Career stability and growth for Filipino talent</p>
                            </div>
                          </div>
                        </div>

                        {/* Glow Effect */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full blur-3xl opacity-30"></div>
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-pink-400 rounded-full blur-3xl opacity-30"></div>
                      </div>
                    </div>
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white animate-pulse">
                      <span className="text-white font-bold text-2xl">3</span>
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        <FeatureSection />
        <EmpowerSection />
        <Pricing />
        <motion.section 
          id="cal" 
          className="container mx-auto px-4 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="max-w-6xl mx-auto">
            <CalComEmbed />
          </div>
        </motion.section>
        <CallToAction />
        <div className="py-12">
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIAgentPage;


