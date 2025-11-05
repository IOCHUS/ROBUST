import React from 'react';

const FEULogo = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 hover:scale-110"
    >
      <path
        d="M14 2L3 8v8c0 6.627 4.925 12.13 11.35 13 6.425-.87 11.35-6.373 11.35-13V8L14 2z"
        fill="url(#feu-gradient)"
        className="drop-shadow-lg"
      />
      <path
        d="M14 10v8m0-8l-3 3m3-3l3 3"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="feu-gradient" x1="3" y1="2" x2="25.7" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default FEULogo;
