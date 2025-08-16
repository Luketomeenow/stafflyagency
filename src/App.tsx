import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import JobsPage from './pages/JobsPage';
import HirePage from './pages/HirePage';
import PartnerPage from './pages/PartnerPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import PlaybooksPage from './pages/PlaybooksPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import FloatingNavbar from './components/FloatingNavbar';

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-white">
      {showNavbar && <FloatingNavbar />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/hire" element={<HirePage />} />
          <Route path="/partner" element={<PartnerPage />} />
                      <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/playbooks" element={<PlaybooksPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
        </Routes>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;