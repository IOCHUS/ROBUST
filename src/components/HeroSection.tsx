import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center bg-amber-400/10 border border-amber-400/20 rounded-full px-6 py-2 mb-8">
          <span className="text-amber-400 text-sm font-medium">EXCLUSIVE MASTERCLASS</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          BEND YOUR
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            REALITY
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
          The Only MasterClass That Teaches You the Foundation of a Life
        </p>
        
        <p className="text-3xl md:text-4xl font-bold text-white mb-12">
          <span className="text-amber-400">ROBUST</span> - Hurry Up or Stay Where You Are
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center">
            START YOUR TRANSFORMATION
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>
          
          <button className="group flex items-center text-white hover:text-amber-400 transition-colors">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-400/20 transition-colors">
              <Play size={16} className="ml-0.5" />
            </div>
            Watch Preview
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">10K+</div>
            <div className="text-gray-400 text-sm">Students Transformed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">$2M+</div>
            <div className="text-gray-400 text-sm">Generated Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">98%</div>
            <div className="text-gray-400 text-sm">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;