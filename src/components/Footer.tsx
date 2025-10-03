import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50 bg-black">
      <div className="max-w-7xl mx-auto text-center">
        <div className="text-3xl font-bold mb-4">
          ROBUST<span className="text-amber-400">.</span>
        </div>

        <p className="text-gray-400 mb-4 text-base font-light tracking-wide">
          Transform your reality with the most comprehensive wealth and life optimization masterclass
        </p>

        <p className="text-gray-500 text-sm font-light">
          © 2024 ROBUST MasterClass. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;