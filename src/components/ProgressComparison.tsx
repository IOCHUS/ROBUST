import React from 'react';

const ProgressComparison = () => {
  const firstDayData = [
    { label: "Goal", progress: 10, color: "bg-orange-500" },
    { label: "Routine", progress: 15, color: "bg-orange-500" },
    { label: "Portfolio", progress: 8, color: "bg-orange-500" },
    { label: "Monitor", progress: 12, color: "bg-orange-500" },
    { label: "Profile", progress: 5, color: "bg-orange-500" }
  ];

  const lastDayData = [
    { label: "Goal Reached", progress: 85, color: "bg-green-500" },
    { label: "Daily Improved", progress: 92, color: "bg-green-500" },
    { label: "Capital Increased", progress: 78, color: "bg-green-500" },
    { label: "Capital Maximized", progress: 88, color: "bg-green-500" },
    { label: "Personal Improved", progress: 95, color: "bg-green-500" }
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* First Day */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
              First Day of MasterClass
            </h3>
            <div className="space-y-4">
              {firstDayData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-20 text-sm font-medium text-gray-600 mr-4">
                    {item.label}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {item.progress}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Last Day */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Last Day of MasterClass
            </h3>
            <div className="space-y-4">
              {lastDayData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-20 text-sm font-medium text-gray-600 mr-4">
                    {item.label}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                      {item.progress}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressComparison;