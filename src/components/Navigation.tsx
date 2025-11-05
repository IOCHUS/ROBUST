import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import FEULogo from './FEULogo';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnrollClick = () => {
    const isLoggedIn = localStorage.getItem('fk_logged_in') === 'true';
    if (isLoggedIn) {
      window.location.href = '/portal/dashboard';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="flex items-center space-x-3 group">
            <FEULogo />
            <span className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-amber-400">
              ROBUST
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/blog"
              className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
            >
              Blog
            </Link>
            <button
              onClick={handleEnrollClick}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 text-white font-medium"
            >
              ENTER DASHBOARD
            </button>
          </div>

          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800/50">
          <div className="px-4 py-6 space-y-4">
            <Link
              to="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-amber-400 transition-colors font-medium py-2"
            >
              Blog
            </Link>
            <button
              onClick={() => {
                handleEnrollClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-6 py-3 rounded-full transition-all duration-300 text-white font-medium"
            >
              ENTER DASHBOARD
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;