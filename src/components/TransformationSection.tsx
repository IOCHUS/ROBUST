import React from 'react';

const TransformationSection = () => {
  const beforeData = [
    { label: "Goal", value: 15, color: "bg-red-500" },
    { label: "Routine", value: 20, color: "bg-red-500" },
    { label: "Portfolio", value: 10, color: "bg-red-500" },
    { label: "Monitor", value: 18, color: "bg-red-500" },
    { label: "Profile", value: 12, color: "bg-red-500" }
  ];

  const afterData = [
    { label: "Goal Reached", value: 95, color: "bg-green-500" },
    { label: "Daily Improved", value: 88, color: "bg-green-500" },
    { label: "Capital Increased", value: 92, color: "bg-green-500" },
    { label: "Capital Maximized", value: 85, color: "bg-green-500" },
    { label: "Personal Improved", value: 98, color: "bg-green-500" }
  ];

  return (
    <section id="results" className="relative py-32 overflow-hidden">
      {/* Elegant Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
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
          {/* Before */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-red-500/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-red-500/10 rounded-full px-4 py-2 mb-4 border border-red-500/20">
                <span className="text-red-400 font-medium text-sm">BEFORE ROBUST</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">First Day of MasterClass</h3>
            </div>

            <div className="space-y-4">
              {beforeData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-32 text-sm font-light text-gray-400 mr-4">
                    {item.label}
                  </div>
                  <div className="flex-1 bg-white/5 rounded-full h-6 relative overflow-hidden border border-white/10">
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${item.value}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-300">
                      {item.value}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-amber-500/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-amber-500/10 rounded-full px-4 py-2 mb-4 border border-amber-500/20">
                <span className="text-amber-400 font-medium text-sm">AFTER ROBUST</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Last Day of MasterClass</h3>
            </div>

            <div className="space-y-4">
              {afterData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-32 text-sm font-light text-gray-400 mr-4">
                    {item.label}
                  </div>
                  <div className="flex-1 bg-white/5 rounded-full h-6 relative overflow-hidden border border-white/10">
                    <div
                      className="bg-gradient-to-r from-amber-600 to-amber-500 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${item.value}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                      {item.value}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="text-center mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"></div>
            <blockquote className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              "Hacking Your Growth In The Right
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"> Direction"</span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;