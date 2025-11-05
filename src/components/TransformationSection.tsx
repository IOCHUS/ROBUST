import React from 'react';

const TransformationSection = () => {
  const beforeData = [
    { label: "Clarity", value: 15 },
    { label: "Capacity", value: 20 },
    { label: "Community", value: 10 },
    { label: "Commitment", value: 18 },
    { label: "System", value: 12 }
  ];

  const afterData = [
    { label: "Clarity", value: 95 },
    { label: "Capacity", value: 88 },
    { label: "Community", value: 92 },
    { label: "Commitment", value: 85 },
    { label: "System", value: 98 }
  ];

  return (
    <section id="results" className="relative py-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Your Transformation Journey
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            See the dramatic difference between where you start and where you'll be after completing ROBUST
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/40 transition-colors duration-300 shadow-xl shadow-orange-500/10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-orange-500/20 rounded-full px-5 py-2 mb-4 border border-orange-500/30">
                <span className="text-orange-400 font-semibold text-sm">DAY 1</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Starting Point</h3>
            </div>

            <div className="space-y-5">
              {beforeData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-36 text-sm font-medium text-gray-300 mr-4">
                    {item.label}
                  </div>
                  <div className="flex-1 bg-slate-700/50 rounded-full h-7 relative overflow-hidden border border-slate-600">
                    <div
                      className="bg-gradient-to-r from-orange-600 to-orange-500 h-full rounded-full transition-all duration-1000 ease-out shadow-lg shadow-orange-500/30"
                      style={{ width: `${item.value}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-lg">
                      {item.value}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/30 hover:border-emerald-500/40 transition-colors duration-300 shadow-xl shadow-emerald-500/10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-emerald-500/20 rounded-full px-5 py-2 mb-4 border border-emerald-500/30">
                <span className="text-emerald-400 font-semibold text-sm">COMPLETE</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Your New Reality</h3>
            </div>

            <div className="space-y-5">
              {afterData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-36 text-sm font-medium text-gray-300 mr-4">
                    {item.label}
                  </div>
                  <div className="flex-1 bg-slate-700/50 rounded-full h-7 relative overflow-hidden border border-slate-600">
                    <div
                      className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out shadow-lg shadow-emerald-500/30"
                      style={{ width: `${item.value}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-lg">
                      {item.value}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Section with Visual */}
        <div className="text-center mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"></div>

            {/* Growth Arrow Visual */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-2 border-orange-500/40 flex items-center justify-center">
                    <span className="text-orange-400 text-xl font-bold">15%</span>
                  </div>

                  <div className="flex items-center">
                    <div className="h-1 w-32 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-emerald-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 border-2 border-emerald-500/60 flex items-center justify-center shadow-lg shadow-emerald-500/40">
                    <span className="text-emerald-400 text-2xl font-bold">95%</span>
                  </div>
                </div>
              </div>
            </div>

            <blockquote className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
              "Build Your System.
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 bg-clip-text text-transparent"> Follow It Blindly."</span>
            </blockquote>
            <p className="text-gray-400 text-lg">Your direction is crystal clear</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;