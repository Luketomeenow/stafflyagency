import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import JobsPage from './pages/JobsPage';
import HirePage from './pages/HirePage';
import PartnerPage from './pages/PartnerPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import PlaybooksPage from './pages/PlaybooksPage';
import CareersPage from './pages/CareersPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AIAgentPage from './pages/AIAgentPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import CandidateApplicationPage from './pages/CandidateApplicationPage';
import CandidateSignupPage from './pages/CandidateSignupPage';
import CandidateLoginPage from './pages/CandidateLoginPage';
import CandidateDashboardPage from './pages/CandidateDashboardPage';
import CandidateProfileViewPage from './pages/CandidateProfileViewPage';
import SiteLayout from './components/SiteLayout';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isApply = location.pathname.startsWith('/apply');
  const isCandidate = location.pathname.startsWith('/candidate');

  const content = (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Routes>
        <Route path="/" element={<AIAgentPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/hire" element={<HirePage />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/playbooks" element={<PlaybooksPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/agent" element={<AIAgentPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/apply" element={<CandidateApplicationPage />} />
        <Route path="/candidate/signup" element={<CandidateSignupPage />} />
        <Route path="/candidate/login" element={<CandidateLoginPage />} />
        <Route path="/candidate/dashboard" element={<CandidateDashboardPage />} />
        <Route path="/profile/:id" element={<CandidateProfileViewPage />} />
      </Routes>
    </motion.div>
  );

  // Use SiteLayout (sticky landing header) for all non-admin, non-apply, and non-candidate routes
  if (!isAdmin && !isApply && !isCandidate) {
    return <SiteLayout>{content}</SiteLayout>;
  }

  return <div className="min-h-screen bg-white">{content}</div>;
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;