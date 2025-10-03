import React from 'react';

const GeometricShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">

      {/* Elegant floating orbs - top right */}
      <div className="absolute top-32 right-20 w-96 h-96">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/40 to-transparent rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '4s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/30 to-transparent rounded-full blur-2xl animate-pulse"
             style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
      </div>

      {/* Subtle geometric lines - left side */}
      <div className="absolute top-1/4 left-0 w-64 h-64 opacity-60">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <line x1="0" y1="100" x2="200" y2="100" stroke="url(#gradient1)" strokeWidth="2">
            <animate attributeName="x2" values="0;200;0" dur="8s" repeatCount="indefinite" />
          </line>
          <line x1="100" y1="0" x2="100" y2="200" stroke="url(#gradient1)" strokeWidth="2">
            <animate attributeName="y2" values="0;200;0" dur="10s" repeatCount="indefinite" />
          </line>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Minimal circle accent - bottom left */}
      <div className="absolute bottom-32 left-16 w-48 h-48 opacity-50">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#fbbf24" strokeWidth="3" opacity="0.6">
            <animate attributeName="r" values="60;90;60" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="100" r="60" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.5">
            <animate attributeName="r" values="50;70;50" dur="8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Luxury gradient sphere - right middle */}
      <div className="absolute top-1/2 right-24 w-72 h-72">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-purple-500/20 to-transparent rounded-full blur-2xl animate-pulse"
             style={{ animationDuration: '5s' }}></div>
      </div>

      {/* Minimalist corner accent - top left */}
      <div className="absolute top-24 left-12 w-32 h-32 opacity-50">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 0 50 Q 25 25 50 0" fill="none" stroke="#fbbf24" strokeWidth="3">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
          </path>
          <path d="M 0 80 Q 40 40 80 0" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.7">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="5s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* Glowing dot pattern - scattered */}
      <div className="absolute top-1/3 right-1/3 opacity-80">
        <div className="w-4 h-4 bg-amber-400 rounded-full animate-pulse shadow-lg shadow-amber-400/50" style={{ animationDuration: '3s' }}></div>
      </div>
      <div className="absolute bottom-1/3 left-1/3 opacity-70">
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
      </div>
      <div className="absolute top-2/3 right-1/4 opacity-60">
        <div className="w-3 h-3 bg-amber-300 rounded-full animate-pulse shadow-lg shadow-amber-300/50" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
      </div>

      {/* Elegant ascending line - bottom right */}
      <div className="absolute bottom-40 right-32 w-40 h-40 opacity-50">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 0 100 L 100 0" stroke="url(#gradient2)" strokeWidth="3" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="100" dur="3s" repeatCount="indefinite" />
          </path>
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

    </div>
  );
};

export default GeometricShapes;
