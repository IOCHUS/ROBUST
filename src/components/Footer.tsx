import React from 'react';
import { ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50 bg-black/50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-12 fade-in">
          <div className="flex flex-col items-center space-y-5">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-full blur opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:duration-300 animate-pulse"></div>
              <button
                onClick={() => window.open('https://www.linkedin.com/in/iochus-automation-25a855383/', '_blank')}
                className="relative w-28 h-28 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white font-bold hover:scale-105 transition-all duration-500 shadow-xl border border-gray-700 group-hover:border-blue-400/50 overflow-hidden"
              >
                <img
                  src="/src/img/IOCHUS.jpg"
                  alt="IOCHUS"
                  className="w-24 h-24 rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md border border-blue-400/30">
                  <ExternalLink className="w-3 h-3 text-white" />
                </div>
              </button>
            </div>
            <div className="text-center">
              <div className="text-xl font-medium text-gray-200 mb-1 tracking-wide">IOCHUS</div>
              <div className="text-sm text-gray-400 font-light">AI Growth Technologist</div>
            </div>
          </div>
        </div>

        <p className="text-gray-400 mb-4 text-base font-light tracking-wide">
          Empowering businesses with intelligent AI automation solutions
        </p>
        <p className="text-gray-500 text-sm font-light">
          © 2025 Automagically. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;