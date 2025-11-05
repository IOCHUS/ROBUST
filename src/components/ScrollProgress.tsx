import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = (scrollTop / trackLength) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', calculateScrollProgress);
    calculateScrollProgress();

    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-900/50 z-50 backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 transition-all duration-150 ease-out shadow-lg shadow-amber-500/50"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
};

export default ScrollProgress;
