import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-30 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50 bg-black text-white">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full blur opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:duration-300 animate-pulse"></div>
              <button
                onClick={() => window.open('https://www.linkedin.com/in/iochus-automation-25a855383/', '_blank')}
                aria-label="Visit IOCHUS on LinkedIn"
                className="relative w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white font-bold hover:scale-105 transition-all duration-300 shadow-xl border border-gray-700 group-hover:border-amber-400/50 overflow-hidden"
              >
                <img
                  src="/img/IOCHUS.jpg"
                  alt="IOCHUS"
                  loading="lazy"
                  className="w-20 h-20 rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-md border border-amber-400/30">
                  <ExternalLink className="w-3 h-3 text-white" />
                </div>
              </button>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-200 tracking-wide">ROBUST<span className="text-amber-400">.</span></div>
            </div>
          </div>
        </div>

        <p className="text-gray-400 mb-8 text-base font-light tracking-wide">
          Transform your reality with the most comprehensive wealth and life optimization masterclass
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <Link to="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-gray-400 hover:text-amber-400 transition-colors">
            Terms & Conditions
          </Link>
          <Link to="/refund" className="text-gray-400 hover:text-amber-400 transition-colors">
            Refund Policy
          </Link>
          <Link to="/blog" className="text-gray-400 hover:text-amber-400 transition-colors">
            Blog
          </Link>
        </div>

        <p className="text-gray-500 text-sm font-light">
          © 2025 ROBUST MasterClass. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;