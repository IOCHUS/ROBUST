import React from 'react';

const GrowthSection = () => {
  return (
    <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/10 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        {/* Geometric diamond shape */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 transform rotate-45 rounded-lg shadow-2xl">
              <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 to-green-500 rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Growth path"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
          "Hacking Your Growth In The Right
          <br />
          <span className="text-cyan-400">Direction"</span>
        </h2>
      </div>
    </section>
  );
};

export default GrowthSection;