import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl"></div>
      </div>


      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center bg-amber-400/10 border border-amber-400/20 rounded-full px-6 py-2 mb-8 mt-20">
          <span className="text-amber-400 text-sm font-medium">EXCLUSIVE MASTERCLASS</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Build Your
          <br />
          <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Last Chapter
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
          The foundation for a life designed by YOU
        </p>

        <p className="text-3xl md:text-4xl font-bold text-white mb-12">
          <span className="text-amber-400">ROBUST</span> - Your Reality Awaits Action
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a href="#pricing" className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center">
            Get ROBUST Kit
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">4</div>
            <div className="text-gray-400 text-sm">Core Pillars</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">12+</div>
            <div className="text-gray-400 text-sm">Modules</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">3X</div>
            <div className="text-gray-400 text-sm">Money Back Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;