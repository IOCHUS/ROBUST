'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
            Freedom OS
          </h1>
          <p className="text-xl text-gray-400">Your life, in energy and satoshis.</p>
        </div>

        {/* Villa Map – Empty and beautiful */}
        <div className="relative w-full h-screen bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="w-24 h-24 text-amber-400 animate-pulse mx-auto mb-6" />
              <p className="text-3xl font-bold text-gray-300">Your Villa is Ready</p>
              <p className="text-lg text-gray-500 mt-4">Start building your freedom.</p>
            </div>
          </div>
        </div>

        {/* Optional small footer text */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          Hover over zones later to explore your stats.
        </div>
      </div>
    </div>
  );
}