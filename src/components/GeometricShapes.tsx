import React from 'react';

const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[15] overflow-visible">

      {/* Hero Section - Top Area */}
      <div className="absolute top-20 right-12 w-[500px] h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/50 to-transparent rounded-full blur-[100px] animate-pulse"
             style={{ animationDuration: '4s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/40 to-transparent rounded-full blur-[80px] animate-pulse"
             style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
      </div>

      <div className="absolute top-40 left-8 w-80 h-80 opacity-70">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <line x1="0" y1="100" x2="200" y2="100" stroke="url(#gradient1)" strokeWidth="2.5">
            <animate attributeName="x2" values="0;200;0" dur="8s" repeatCount="indefinite" />
          </line>
          <line x1="100" y1="0" x2="100" y2="200" stroke="url(#gradient1)" strokeWidth="2.5">
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

      <div className="absolute top-[120px] left-16 w-40 h-40 opacity-60">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 0 50 Q 25 25 50 0" fill="none" stroke="#fbbf24" strokeWidth="3">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
          </path>
          <path d="M 0 80 Q 40 40 80 0" fill="none" stroke="#a855f7" strokeWidth="2.5" opacity="0.7">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="5s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <div className="absolute top-[600px] right-1/4 opacity-90">
        <div className="w-5 h-5 bg-amber-400 rounded-full animate-pulse shadow-xl shadow-amber-400/60" style={{ animationDuration: '3s' }}></div>
      </div>

      <div className="absolute top-[750px] left-20 opacity-80">
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-xl shadow-purple-400/60" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
      </div>

      {/* Mid Section 1 - Core Pillars Area */}
      <div className="absolute top-[1100px] left-12 w-56 h-56 opacity-60">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#fbbf24" strokeWidth="3" opacity="0.6">
            <animate attributeName="r" values="60;95;60" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="100" r="60" fill="none" stroke="#a855f7" strokeWidth="2.5" opacity="0.5">
            <animate attributeName="r" values="50;75;50" dur="8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="absolute top-[1350px] right-16 w-[400px] h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/35 via-purple-500/25 to-transparent rounded-full blur-[90px] animate-pulse"
             style={{ animationDuration: '5s' }}></div>
      </div>

      <div className="absolute top-[1600px] left-1/3 opacity-85">
        <div className="w-5 h-5 bg-amber-300 rounded-full animate-pulse shadow-xl shadow-amber-300/60" style={{ animationDuration: '3.2s' }}></div>
      </div>

      <div className="absolute top-[1800px] right-1/4 w-48 h-48 opacity-55">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 20 80 L 80 20" stroke="url(#gradient4)" strokeWidth="2.5" strokeDasharray="4,4">
            <animate attributeName="stroke-dashoffset" from="0" to="100" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M 80 80 L 20 20" stroke="url(#gradient4)" strokeWidth="2.5" strokeDasharray="4,4">
            <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="3s" repeatCount="indefinite" />
          </path>
          <defs>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Mid Section 2 - Modules Area */}
      <div className="absolute top-[2300px] right-24 w-52 h-52 opacity-55">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 0 100 L 100 0" stroke="url(#gradient2)" strokeWidth="3" strokeDasharray="6,6">
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

      <div className="absolute top-[2100px] left-1/4 opacity-75">
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-xl shadow-purple-400/60" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
      </div>

      <div className="absolute top-[2550px] left-16 w-72 h-72 opacity-65">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <line x1="0" y1="100" x2="200" y2="100" stroke="url(#gradient3)" strokeWidth="2.5">
            <animate attributeName="x2" values="0;200;0" dur="7s" repeatCount="indefinite" />
          </line>
          <defs>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-[2800px] right-1/3 w-[350px] h-[350px]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-transparent rounded-full blur-[85px] animate-pulse"
             style={{ animationDuration: '5.5s' }}></div>
      </div>

      <div className="absolute top-[3000px] left-1/3 opacity-80">
        <div className="w-5 h-5 bg-amber-400 rounded-full animate-pulse shadow-xl shadow-amber-400/60" style={{ animationDuration: '3.8s' }}></div>
      </div>

      {/* Lower Section - Transformation Area */}
      <div className="absolute top-[3500px] right-20 w-64 h-64 opacity-60">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="70" fill="none" stroke="#fbbf24" strokeWidth="2.5" opacity="0.5">
            <animate attributeName="r" values="55;90;55" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="100" r="50" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.4">
            <animate attributeName="r" values="40;65;40" dur="6s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="absolute top-[3300px] right-1/4 w-[420px] h-[420px]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/35 to-transparent rounded-full blur-[95px] animate-pulse"
             style={{ animationDuration: '6s' }}></div>
      </div>

      <div className="absolute top-[3750px] left-1/4 opacity-70">
        <div className="w-4 h-4 bg-amber-300 rounded-full animate-pulse shadow-xl shadow-amber-300/60" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
      </div>

      <div className="absolute top-[4000px] left-24 w-56 h-56 opacity-60">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 10 90 Q 50 10 90 90" fill="none" stroke="#fbbf24" strokeWidth="2.5">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4.5s" repeatCount="indefinite" />
          </path>
          <path d="M 20 90 Q 50 30 80 90" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.6">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="5s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* Bottom Section - Guarantee Area */}
      <div className="absolute top-[4600px] left-16 w-60 h-60 opacity-55">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="75" fill="none" stroke="#a855f7" strokeWidth="3" opacity="0.6">
            <animate attributeName="r" values="60;95;60" dur="7s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="absolute top-[4900px] right-16 w-52 h-52 opacity-55">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 0 50 Q 50 0 100 50" fill="none" stroke="#fbbf24" strokeWidth="2.5">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="5s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <div className="absolute top-[4400px] right-1/3 opacity-75">
        <div className="w-5 h-5 bg-purple-400 rounded-full animate-pulse shadow-xl shadow-purple-400/60" style={{ animationDuration: '4s' }}></div>
      </div>

      <div className="absolute top-[5100px] left-1/3 w-[380px] h-[380px]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/40 to-transparent rounded-full blur-[90px] animate-pulse"
             style={{ animationDuration: '5.2s' }}></div>
      </div>

      <div className="absolute top-[5300px] right-1/4 opacity-80">
        <div className="w-4 h-4 bg-amber-400 rounded-full animate-pulse shadow-xl shadow-amber-400/60" style={{ animationDuration: '3.5s' }}></div>
      </div>

    </div>
  );
};

export default GeometricShapes;
