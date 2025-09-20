import React from 'react';
import { Target, Zap, Users, Shield } from 'lucide-react';

const CorePillars = () => {
  const pillars = [
    {
      icon: Target,
      title: "Clarity",
      description: "Get a clear direction on what you REALLY desire and a plan ACTIONABLE to make it happen STARTING TODAY",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Capacity",
      description: "Become Rich Enough ROBUST Time to Significantly Increase Means",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Community",
      description: "Team Up with Fellow Mentorship & Q&A",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Commitment",
      description: "Co-Create Honest Approach Accountability Implementation",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Four Pillars of
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"> ROBUST</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven framework that has transformed thousands of lives and generated millions in wealth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100"
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${pillar.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-0.5`}>
                  <div className="bg-white rounded-2xl h-full w-full"></div>
                </div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${pillar.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white" size={28} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CorePillars;