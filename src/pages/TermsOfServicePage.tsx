import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { GlassCard, MagneticCard } from '../components/AdvancedComponents';

const TermsOfServicePage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div variants={fadeInUp} className="mb-8">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Terms of Use</h1>
            <p className="text-xl text-gray-600">Last Updated: April 1, 2025</p>
          </motion.div>

          {/* Terms Content */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms of Use ("Terms") govern your use of the services and website provided by Staffly HQ AI ("Company," "we," "us," or "our"). By accessing our website (www.stafflyhq.ai) or engaging our services, you ("User," "Client," or "you") agree to comply with these Terms and our Privacy Policy (if applicable). If you disagree, please discontinue use immediately.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-2xl mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Company Details:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Name:</strong> Staffly HQ AI</li>
                    <li><strong>Mailing Address:</strong> PO Box 80528, Scarborough RPO White Shields, ON, M1P 4Z5</li>
                    <li><strong>Email:</strong> admin@stafflyhq.ai</li>
                    <li><strong>Website:</strong> www.stafflyhq.ai</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3 italic">
                    Note: This is our official business mailing address used for communication and correspondence purposes. Legal business address is available upon request or when required by law.
                  </p>
                </div>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Offered</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We provide the following <strong>B2B consulting and implementation services</strong>:
                </p>
                <ul className="space-y-3 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Remote Staffing (Virtual & Executive Assistants)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    AutoCaller AI Voice-Cloning Outreach
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Systems and Automations Buildouts
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Strategic Business Development and Sales Advisory
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Each service may require a separate <strong>scope of work, onboarding agreement, or contract</strong>.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility</h2>
                <p className="text-gray-700 leading-relaxed mb-4">You must:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Be at least <strong>18 years old</strong>.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Have legal authority to enter binding contracts.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    If representing a business, warrant you're authorized to act on its behalf.
                  </li>
                </ul>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Fees are outlined in your <strong>proposal, onboarding docs, or email communications</strong>.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Payments are processed via <strong>Stripe</strong> (subject to Stripe's Terms and Privacy Policy).
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    All prices are in <strong>USD ($)</strong> unless specified otherwise.
                  </li>
                </ul>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Policy</h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    All payments are <strong>non-refundable</strong>.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Refunds may be issued <strong>only at the Company's discretion</strong> under mutually agreed circumstances.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    No guarantees apply once services are initiated or delivered.
                  </li>
                </ul>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Acceptable Use</h2>
                <p className="text-gray-700 leading-relaxed mb-4">You agree <strong>not</strong> to:</p>
                <ul className="space-y-3 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Use our services for unlawful purposes.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Infringe on intellectual property rights.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Disrupt website security/functionality.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Distribute malware or misrepresent your identity.
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We may <strong>suspend or terminate access</strong> for violations.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed">
                  All website/content materials (designs, text, software, SOPs, branding, etc.) are <strong>owned by Staffly HQ AI</strong>. Unauthorized reproduction or distribution is prohibited.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">We are <strong>not liable</strong> for:</p>
                <ul className="space-y-3 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Lost data, profits, or business interruptions.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Third-party service failures (e.g., Stripe, hosting platforms).
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Indirect or consequential damages.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Unachieved results from consulting/services.
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Maximum liability:</strong> Fees paid to us in the <strong>90 days prior to a claim</strong>.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimer</h2>
                <p className="text-gray-700 leading-relaxed">
                  No guarantees are made regarding <strong>business outcomes, revenue, or growth</strong>. Results depend on client implementation and external factors.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Third-Party Links</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website may link to external tools/platforms. We don't control or endorse these services.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may <strong>terminate or suspend access</strong> without notice for violations of these Terms or applicable laws.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Modifications</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update these Terms at any time. Changes take effect upon posting. Continued use = acceptance.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms are governed by <strong>Ontario, Canada law</strong>. Disputes will be resolved in <strong>Toronto, ON</strong>.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">For questions:</p>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> admin@stafflyhq.ai</p>
                  <p className="text-gray-700"><strong>Mail:</strong> PO Box 80528, Scarborough RPO White Shields, ON, M1P 4Z5</p>
                </div>
                <p className="text-gray-700 leading-relaxed mt-4 font-semibold">
                  <strong>By using our services, you agree to these Terms.</strong>
                </p>
              </GlassCard>
            </MagneticCard>
          </motion.div>

          {/* Footer CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <GlassCard className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
              <p className="text-blue-100 mb-6">
                Our team is here to help clarify any questions you may have about our terms of service.
              </p>
              <Link to="/contact">
                <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors">
                  Contact Us
                </button>
              </Link>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
