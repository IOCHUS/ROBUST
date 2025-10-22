import React from 'react';
import { Check, X } from 'lucide-react';

const WhoIsThisFor = () => {
  const forYou = [
    "You're tired of trading time for money and want true freedom",
    "You question the traditional retirement path and want something better",
    "You're ready to discover what YOU actually need (not what society says)",
    "You want to build energy sovereignty (food, power, income)",
    "You're willing to think differently and take consistent action",
    "You value community, mentorship, and collective wisdom",
    "You want a custom system designed for YOUR life, not a template",
    "You're committed to building something sustainable for your last chapter"
  ];

  const notForYou = [
    "You're looking for get-rich-quick schemes or magic pills",
    "You want someone else to do the work for you",
    "You're not willing to question your current beliefs about money and success",
    "You prefer complaints over action",
    "You need instant gratification and can't commit to a process",
    "You're looking for generic, cookie-cutter solutions",
    "You're not ready to be honest about what you truly desire"
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.08) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Is ROBUST For You?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Honesty first. This isn't for everyone—and that's okay.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/30 shadow-xl">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                <Check className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">ROBUST is for you if...</h3>
            </div>

            <div className="space-y-4">
              {forYou.map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 group-hover:bg-emerald-500/30 transition-colors">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-gray-300 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 shadow-xl">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mr-4">
                <X className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">ROBUST is NOT for you if...</h3>
            </div>

            <div className="space-y-4">
              {notForYou.map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className="w-6 h-6 rounded-full bg-slate-600/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 group-hover:bg-slate-600/30 transition-colors">
                    <X className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-gray-400 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              If this resonates with you...
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              You're exactly who we built ROBUST for. Join a community of people designing their last chapter on their own terms.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Last Chapter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsThisFor;
