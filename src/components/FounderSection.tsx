import React from 'react';
import { Linkedin } from 'lucide-react';

const FounderSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Meet IOCHUS
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The architect behind ROBUST
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-12 border border-slate-700/50 shadow-2xl">
              <div className="w-48 h-48 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full blur-xl opacity-40"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-full border-4 border-amber-500/30 flex items-center justify-center overflow-hidden">
                  <img
                    src="/img/IOCHUS.jpg"
                    alt="IOCHUS"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="text-6xl font-bold text-amber-400">IO</div>';
                    }}
                  />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">IOCHUS</h3>
                <p className="text-amber-400 font-semibold mb-6">Founder & Architect</p>
                <a
                  href="https://www.linkedin.com/in/iochus-automation-25a855383/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-slate-700/50 hover:bg-slate-600/50 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                  aria-label="Connect with IOCHUS on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">The Mission</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                ROBUST was born from a simple realization: the traditional path is broken. Trading time for money, chasing retirement, hoping pensions last—it's a system designed for dependency, not freedom.
              </p>
              <p className="text-gray-300 leading-relaxed">
                IOCHUS created ROBUST to offer a different way: energy sovereignty, Soul Hustles, and systems designed by YOU for YOUR last chapter. Not templates. Not generic advice. YOUR custom path.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">Why ROBUST?</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-300">To help people discover what they ACTUALLY need, not what society programmed</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-300">To build energy production systems that create true sovereignty</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-300">To empower individuals with anti-fragile income and asset stacking</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-300">To foster a community where members support each other's last chapter dreams</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/30">
              <blockquote className="text-xl text-white italic mb-4">
                "Your System is Key. Follow it blindly to protect yourself from any external mislead. Your direction is crystal clear."
              </blockquote>
              <p className="text-amber-400 font-semibold">— IOCHUS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
