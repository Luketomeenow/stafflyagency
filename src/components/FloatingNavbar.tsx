import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Briefcase, Rocket, Menu, X, Phone, Settings, BookOpen } from 'lucide-react';

const FloatingNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/jobs', label: 'Find Jobs', icon: Users },
    { path: '/hire', label: 'Hire VAs', icon: Briefcase },
    { path: '/partner', label: 'Partner', icon: Rocket },
    { path: '/playbooks', label: 'Playbooks', icon: BookOpen },
    { path: '/services', label: 'Services', icon: Settings },
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: isVisible ? 0 : -100, x: '-50%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-4 z-50 px-3 sm:px-4 py-3 bg-white/90 backdrop-blur-xl rounded-full shadow-xl border border-white/30 hover:bg-white/95 transition-all duration-300 max-w-[95vw]"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-gray-800 text-sm leading-tight">Staffly</span>
              <br />
              <span className="font-bold text-gray-800 text-sm leading-tight">Agency</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-full transition-all duration-300 min-w-[60px] ${
                  isActive(item.path)
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-500 hover:bg-purple-50'
                }`}
              >
                <item.icon size={16} className="flex-shrink-0" />
                <span className="text-xs font-medium leading-tight text-center">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Tablet Navigation (Icons Only) */}
          <div className="hidden md:flex lg:hidden items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-500 hover:bg-purple-50'
                }`}
                title={item.label}
              >
                <item.icon size={18} />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, x: '-50%' }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 z-40 w-72 sm:w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-4 sm:p-6 md:hidden"
            style={{ left: '50%' }}
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-purple-500 hover:bg-purple-50'
                  }`}
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNavbar;