import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <a href="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-white">
              ROBUST<span className="text-amber-400">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => window.location.href = '#enroll'}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 text-white font-medium"
            >
              Enroll Now
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
            <button
              onClick={() => {
                window.location.href = '#enroll';
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-6 py-3 rounded-full transition-all duration-300 text-white font-medium"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;