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
    <section id="results" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Transformation Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the dramatic difference between where you start and where you'll be after completing ROBUST
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Before */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-red-100 rounded-full px-4 py-2 mb-4">
                <span className="text-red-600 font-semibold">BEFORE ROBUST</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">First Day of MasterClass</h3>
            </div>
            
            <div className="space-y-4">
              {beforeData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-700 mr-4">
                    {item.label}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {item.value}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-2 mb-4">
                <span className="text-green-600 font-semibold">AFTER ROBUST</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Last Day of MasterClass</h3>
            </div>
            
            <div className="space-y-4">
              {afterData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-700 mr-4">
                    {item.label}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                      {item.value}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="text-center mt-16">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              "Hacking Your Growth In The Right
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"> Direction"</span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;