import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/90 backdrop-blur-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">
          ROBUST<span className="text-amber-400">.</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
          <a href="#modules" className="text-white/80 hover:text-white transition-colors">Modules</a>
          <a href="#results" className="text-white/80 hover:text-white transition-colors">Results</a>
          <a href="#guarantee" className="text-white/80 hover:text-white transition-colors">Guarantee</a>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
            <img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-4 h-3" />
            <span className="text-white text-sm">EN</span>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <div className="px-6 py-4 space-y-4">
            <a href="#about" className="block text-white/80 hover:text-white transition-colors">About</a>
            <a href="#modules" className="block text-white/80 hover:text-white transition-colors">Modules</a>
            <a href="#results" className="block text-white/80 hover:text-white transition-colors">Results</a>
            <a href="#guarantee" className="block text-white/80 hover:text-white transition-colors">Guarantee</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;