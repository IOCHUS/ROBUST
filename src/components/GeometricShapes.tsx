import React from 'react';

const GeometricShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">

      {/* ANIMATED TRIBAL GROWTH PATH - Left Side */}
      <div className="absolute top-20 left-8 w-80 h-screen opacity-70">
        <svg viewBox="0 0 200 800" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="growth-path" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(239, 68, 68)" />
              <stop offset="30%" stopColor="rgb(251, 146, 60)" />
              <stop offset="60%" stopColor="rgb(251, 191, 36)" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Main ascending tribal path */}
          <path d="M100,750 Q80,700 100,650 Q120,600 100,550 Q80,500 100,450 Q120,400 100,350 Q80,300 100,250 Q120,200 100,150 Q80,100 100,50"
                stroke="url(#growth-path)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                className="animate-pulse"
                style={{ animationDuration: '3s' }}/>

          {/* Animated milestone nodes */}
          <circle cx="100" cy="750" r="8" fill="rgb(239, 68, 68)">
            <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>

          <circle cx="100" cy="550" r="8" fill="rgb(251, 146, 60)">
            <animate attributeName="r" values="8;12;8" dur="2s" begin="0.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.5s" repeatCount="indefinite"/>
          </circle>

          <circle cx="100" cy="350" r="8" fill="rgb(251, 191, 36)">
            <animate attributeName="r" values="8;12;8" dur="2s" begin="1s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="1s" repeatCount="indefinite"/>
          </circle>

          <circle cx="100" cy="150" r="10" fill="rgb(16, 185, 129)">
            <animate attributeName="r" values="10;15;10" dur="2s" begin="1.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="1.5s" repeatCount="indefinite"/>
          </circle>

          {/* Tribal connection lines radiating from nodes */}
          <g opacity="0.5">
            <line x1="100" y1="750" x2="60" y2="760" stroke="rgb(239, 68, 68)" strokeWidth="2">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
            </line>
            <line x1="100" y1="750" x2="140" y2="760" stroke="rgb(239, 68, 68)" strokeWidth="2">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" begin="0.5s" repeatCount="indefinite"/>
            </line>

            <line x1="100" y1="350" x2="60" y2="360" stroke="rgb(251, 191, 36)" strokeWidth="2">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" begin="1s" repeatCount="indefinite"/>
            </line>
            <line x1="100" y1="350" x2="140" y2="360" stroke="rgb(251, 191, 36)" strokeWidth="2">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" begin="1.5s" repeatCount="indefinite"/>
            </line>
          </g>
        </svg>
      </div>

      {/* TRIBAL STRENGTH MANDALA - Top Right */}
      <div className="absolute top-32 right-12 w-96 h-96 opacity-60">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <linearGradient id="mandala-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(251, 191, 36)" />
              <stop offset="50%" stopColor="rgb(251, 146, 60)" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" />
            </linearGradient>
            <filter id="mandala-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Rotating outer ring */}
          <g className="animate-spin origin-center" style={{ animationDuration: '30s', transformOrigin: '150px 150px' }}>
            <circle cx="150" cy="150" r="120" stroke="url(#mandala-gradient)" strokeWidth="2" fill="none" opacity="0.6" filter="url(#mandala-glow)"/>
            <circle cx="150" cy="30" r="6" fill="rgb(251, 191, 36)"/>
            <circle cx="270" cy="150" r="6" fill="rgb(251, 146, 60)"/>
            <circle cx="150" cy="270" r="6" fill="rgb(16, 185, 129)"/>
            <circle cx="30" cy="150" r="6" fill="rgb(251, 191, 36)"/>
          </g>

          {/* Counter-rotating middle ring */}
          <g className="animate-spin origin-center" style={{ animationDuration: '20s', animationDirection: 'reverse', transformOrigin: '150px 150px' }}>
            <circle cx="150" cy="150" r="80" stroke="url(#mandala-gradient)" strokeWidth="2" fill="none" opacity="0.7" filter="url(#mandala-glow)"/>
            <circle cx="150" cy="70" r="5" fill="rgb(251, 146, 60)"/>
            <circle cx="230" cy="150" r="5" fill="rgb(16, 185, 129)"/>
            <circle cx="150" cy="230" r="5" fill="rgb(251, 191, 36)"/>
            <circle cx="70" cy="150" r="5" fill="rgb(251, 146, 60)"/>
          </g>

          {/* Pulsing center */}
          <circle cx="150" cy="150" r="30" stroke="rgb(16, 185, 129)" strokeWidth="3" fill="none" filter="url(#mandala-glow)">
            <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="150" cy="150" r="15" fill="rgb(16, 185, 129)" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      {/* TRIBAL MOUNTAIN ASCENT - Right Side Middle */}
      <div className="absolute top-1/2 right-16 w-64 h-80 opacity-65">
        <svg viewBox="0 0 200 250" className="w-full h-full">
          <defs>
            <linearGradient id="mountain-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgb(239, 68, 68)" />
              <stop offset="50%" stopColor="rgb(251, 191, 36)" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" />
            </linearGradient>
          </defs>

          {/* Mountain peaks */}
          <path d="M20,220 L50,180 L80,200 L100,140 L120,160 L150,100 L180,120 L180,220 Z"
                stroke="url(#mountain-gradient)"
                strokeWidth="3"
                fill="url(#mountain-gradient)"
                fillOpacity="0.1"
                strokeLinejoin="round"/>

          {/* Ascending path with animation */}
          <path d="M30,215 L60,190 L90,195 L110,145 L140,165 L170,105"
                stroke="rgb(251, 191, 36)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
                strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" values="0;-10;0" dur="2s" repeatCount="indefinite"/>
          </path>

          {/* Sun at peak */}
          <circle cx="150" cy="80" r="20" stroke="rgb(251, 191, 36)" strokeWidth="2" fill="rgb(251, 191, 36)" fillOpacity="0.3">
            <animate attributeName="r" values="20;24;20" dur="3s" repeatCount="indefinite"/>
          </circle>

          {/* Sun rays */}
          <g stroke="rgb(251, 191, 36)" strokeWidth="2" opacity="0.6">
            <line x1="150" y1="50" x2="150" y2="35">
              <animate attributeName="y2" values="35;30;35" dur="2s" repeatCount="indefinite"/>
            </line>
            <line x1="180" y1="65" x2="190" y2="55">
              <animate attributeName="x2" values="190;195;190" dur="2s" begin="0.3s" repeatCount="indefinite"/>
            </line>
            <line x1="185" y1="95" x2="200" y2="95">
              <animate attributeName="x2" values="200;205;200" dur="2s" begin="0.6s" repeatCount="indefinite"/>
            </line>
          </g>

          {/* Climber figure at different stages */}
          <circle cx="60" cy="190" r="4" fill="rgb(239, 68, 68)">
            <animate attributeName="cy" values="190;185;190" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="110" cy="145" r="4" fill="rgb(251, 146, 60)">
            <animate attributeName="cy" values="145;140;145" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="170" cy="105" r="5" fill="rgb(16, 185, 129)">
            <animate attributeName="cy" values="105;100;105" dur="1.5s" begin="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      {/* TRIBAL ENERGY SPIRAL - Bottom Left */}
      <div className="absolute bottom-20 left-12 w-72 h-72 opacity-60">
        <svg viewBox="0 0 250 250" className="w-full h-full">
          <defs>
            <linearGradient id="spiral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(16, 185, 129)" />
              <stop offset="100%" stopColor="rgb(251, 191, 36)" />
            </linearGradient>
          </defs>

          {/* Animated spiral */}
          <g className="animate-spin origin-center" style={{ animationDuration: '25s', transformOrigin: '125px 125px' }}>
            <path d="M125,125 Q125,75 150,75 Q200,75 200,125 Q200,200 125,200 Q25,200 25,100 Q25,25 125,25"
                  stroke="url(#spiral-gradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.8"/>

            {/* Energy nodes along spiral */}
            <circle cx="125" cy="125" r="6" fill="rgb(16, 185, 129)">
              <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="150" cy="75" r="5" fill="rgb(251, 191, 36)">
              <animate attributeName="r" values="5;8;5" dur="2s" begin="0.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="200" cy="125" r="5" fill="rgb(251, 146, 60)">
              <animate attributeName="r" values="5;8;5" dur="2s" begin="1s" repeatCount="indefinite"/>
            </circle>
            <circle cx="125" cy="25" r="6" fill="rgb(16, 185, 129)">
              <animate attributeName="r" values="6;10;6" dur="2s" begin="1.5s" repeatCount="indefinite"/>
            </circle>
          </g>
        </svg>
      </div>

      {/* TRIBAL TRANSFORMATION ARROWS - Scattered */}
      <div className="absolute top-1/3 left-1/4 w-32 h-32 opacity-50">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="arrow1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(251, 191, 36)" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" />
            </linearGradient>
          </defs>
          <path d="M20,80 L50,20 M50,20 L40,35 M50,20 L65,30"
                stroke="url(#arrow1)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="2s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>

      <div className="absolute bottom-1/3 right-1/3 w-32 h-32 opacity-50">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M80,80 L20,20 M20,20 L35,30 M20,20 L30,35"
                stroke="rgb(251, 191, 36)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" begin="0.5s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="translate" values="0,0; -5,-5; 0,0" dur="2s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>

      {/* Subtle Grid Lines - Foundation */}
      <div className="absolute bottom-0 left-0 right-0 h-96 opacity-5" style={{ perspective: '1000px' }}>
        <div className="w-full h-full" style={{ transform: 'rotateX(60deg)', transformStyle: 'preserve-3d' }}>
          <div className="grid grid-cols-12 gap-0 w-full h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`v-${i}`} className="border-l border-amber-500/30"></div>
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-12 gap-0 w-full h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`h-${i}`} className="border-t border-amber-500/30"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Ambient Gradient Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-emerald-500/5 animate-pulse" style={{ animationDuration: '8s' }}></div>
      </div>
    </div>
  );
};

export default GeometricShapes;
