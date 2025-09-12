import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Mail, Phone, MapPin } from 'lucide-react';
import { GlassCard, MagneticCard } from '../components/AdvancedComponents';

const PrivacyPolicyPage = () => {
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
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-600">Updated: April 1, 2025</p>
          </motion.div>

          {/* Privacy Policy Content */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Who We Are</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Staffly HQ AI is a Canadian-based B2B consulting agency. Our mailing address is PO Box 80528, Scarborough RPO White Shields, ON, M1P 4Z5. (Our legal business address is available upon request.)
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">We specialize in:</p>
                <ul className="space-y-3 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Remote staffing solutions (Virtual Assistants and Offshore Staffing)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    AutoCaller AI voice cloning & outbound SDR outreach
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Systems and automations auditing & buildout
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Strategic business development services
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We provide our services to clients across North America and globally, utilizing modern technology, artificial intelligence, and human expertise.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Your Consent</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By accessing our website or using our services, you agree to our Terms of Service and accept this Privacy Policy. If you are under the age of 16, a parent or legal guardian must provide consent.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You may withdraw consent at any time by contacting <strong>admin@stafflyhq.ai</strong>. Please note that withdrawing consent may limit our ability to provide services to you.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Personal Information We Collect</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect information directly from you, automatically through digital technologies, and via third-party services. The categories of data we may collect include:
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Database className="w-5 h-5 mr-2 text-blue-500" />
                      A. Voluntarily Submitted Information
                    </h3>
                    <ul className="space-y-2 text-gray-700 ml-7">
                      <li>• Full name</li>
                      <li>• Company information</li>
                      <li>• Email and physical addresses</li>
                      <li>• Phone number</li>
                      <li>• Login credentials</li>
                      <li>• Billing and payment details (processed via Stripe or PayPal)</li>
                      <li>• Survey responses and form submissions</li>
                      <li>• Feedback, support inquiries, and communication history</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-green-500" />
                      B. Automatically Collected Information
                    </h3>
                    <ul className="space-y-2 text-gray-700 ml-7">
                      <li>• IP address and location data</li>
                      <li>• Device type, OS, browser type</li>
                      <li>• Referral sources and behavior on our website</li>
                      <li>• Cookies and web beacons for analytics (e.g., Google Analytics)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Lock className="w-5 h-5 mr-2 text-purple-500" />
                      C. Content Uploaded or Shared
                    </h3>
                    <p className="text-gray-700 ml-7">
                      User content submitted during service delivery (e.g., documents, call scripts, automation data)
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-red-500" />
                      D. Sensitive Personal Information
                    </h3>
                    <p className="text-gray-700 ml-7">
                      We do <strong>not</strong> knowingly collect or request sensitive personal information (e.g., racial or ethnic origin, religious beliefs, medical or biometric data).
                    </p>
                  </div>
                </div>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Your information is used in the following ways:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To provide, manage, and deliver our services
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To process transactions and recurring payments
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To communicate project updates, service notifications, and offers
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To respond to support tickets or inquiries
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To analyze behavior and improve our website and services
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To comply with legal requirements
                  </li>
                </ul>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Communication Preferences</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may send you <strong>emails</strong> and <strong>SMS</strong>:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-blue-500" />
                      Emails may include:
                    </h3>
                    <ul className="space-y-2 text-gray-700 ml-7">
                      <li>• Onboarding messages</li>
                      <li>• Service and feature updates</li>
                      <li>• Offers and newsletters</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-green-500" />
                      SMS are service-related only (no marketing or promotional SMS):
                    </h3>
                    <p className="text-gray-700 ml-7 mb-2">Examples include onboarding notices, project/status updates, appointment/reminder notifications, and support messages.</p>
                    <p className="text-gray-700 ml-7 text-sm">
                      You can opt out at any time by using the unsubscribe link (email) or emailing us at <strong>admin@stafflyhq.ai</strong>.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-6">
                  <h4 className="font-semibold text-yellow-800 mb-3">SMS Terms & Conditions (A2P Messaging)</h4>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    Upon messaging opt-in, you agree to receive <strong>SMS messages from Staffly HQ AI strictly related to your account and use of our services</strong>. <strong>Message frequency varies. Message and data rates may apply.</strong> You can <strong>opt out by replying "STOP."</strong> To request more information, <strong>reply "HELP."</strong> If you need assistance or have questions about our SMS service, reply "HELP" to any SMS message you receive, or contact our customer support team at <strong>226-241-4547</strong> or <strong>admin@stafflyhq.ai</strong>.
                  </p>
                </div>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Sharing and Disclosure of Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell your personal data. Your data may be shared with:
                </p>
                <ul className="space-y-3 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Trusted service providers (Stripe, CRM tools, hosting platforms)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Legal and regulatory authorities (as required by law)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Affiliate partners supporting service delivery
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All third parties are under contractual obligation to safeguard data in accordance with industry standards.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <p className="text-blue-800 text-sm font-semibold">
                    <strong>No Mobile Information Sharing for Marketing/Promotional Purposes.</strong> No mobile information will be shared with third parties or affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
                  </p>
                </div>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Storage and International Transfers</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your data may be stored on secure servers located in Canada or the United States. Where applicable, we ensure appropriate safeguards under PIPEDA, CCPA, and GDPR using:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Data Processing Agreements (DPAs)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Standard Contractual Clauses
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Encryption protocols
                  </li>
                </ul>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement a comprehensive <strong>Security Program</strong> that includes:
                </p>
                <ul className="space-y-3 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    SSL/TLS encryption for transmission
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Access-controlled environments
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Secure data storage and routine audits
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Incident response plans in case of data breaches
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  While we do our best, no system can guarantee 100% security. You are encouraged to practice secure password use and limit unnecessary data sharing.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Retention of Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain personal data only as long as necessary to fulfill the purposes outlined in this policy unless a longer retention period is required by law.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Depending on your jurisdiction (Canada, U.S., EU, UK), you may be entitled to:
                </p>
                <ul className="space-y-3 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Access your personal data
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Request correction or deletion
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Object to or restrict processing
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Withdraw consent for data use
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  To exercise your rights, email <strong>admin@stafflyhq.ai</strong> with your request.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Cookies & Tracking Technologies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="space-y-3 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Authenticate sessions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Remember preferences
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Track engagement and performance
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  You can manage your cookie preferences through your browser settings. Disabling cookies may impact user experience.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. External Platforms & Links</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website may link to third-party platforms (e.g., LinkedIn, YouTube, Stripe). We are not responsible for their privacy practices. Please review their privacy policies before interacting with them.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our services are not directed at children under 13. We do not knowingly collect personal data from minors. If we discover such data has been collected, it will be deleted.
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to update this Privacy Policy periodically. Any material changes will be communicated on our website or via email with an updated "Effective Date."
                </p>
              </GlassCard>
            </MagneticCard>

            <MagneticCard>
              <GlassCard className="p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">For questions, feedback, or privacy requests:</p>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex items-start space-x-4 mb-4">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Staffly HQ AI</p>
                      <p className="text-gray-700">PO Box 80528</p>
                      <p className="text-gray-700">Scarborough RPO White Shields, ON, M1P 4Z5</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <p className="text-gray-700"><strong>Email:</strong> admin@stafflyhq.ai</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mt-4 font-semibold">
                  <strong>By continuing to use our services, you acknowledge that you have read and accepted this Privacy Policy.</strong>
                </p>
              </GlassCard>
            </MagneticCard>
          </motion.div>

          {/* Footer CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <GlassCard className="p-8 rounded-3xl bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
              <p className="text-green-100 mb-6">
                Our team is here to help with any privacy-related questions or concerns you may have.
              </p>
              <Link to="/contact">
                <button className="bg-white text-green-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors">
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

export default PrivacyPolicyPage;
