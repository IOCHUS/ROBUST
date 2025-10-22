import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition > windowHeight * 1.5 && !isDismissed) {
        setIsVisible(true);
      } else if (scrollPosition <= windowHeight * 1.5) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-out">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-amber-500/30 shadow-2xl backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div>
                  <div className="text-white font-bold text-lg">Ready to Build Your Last Chapter?</div>
                  <div className="text-gray-400 text-sm hidden sm:block">$297 one-time • Lifetime access • 3X Money-Back Guarantee</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#pricing"
                className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center whitespace-nowrap"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={handleDismiss}
                className="w-8 h-8 rounded-full bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
