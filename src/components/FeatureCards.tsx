import React from 'react';
import { Eye, Zap, Users, Target } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      title: "Clarity",
      description: "Get a clear direction on what you REALLY desire and a plan ACTIONABLE to make it happen STARTING TODAY",
      icon: Eye,
      gradient: "from-orange-400 to-pink-500"
    },
    {
      title: "Capacity",
      description: "Become Rich Enough ROBUST Time to Significantly Increase Means",
      icon: Zap,
      gradient: "from-orange-400 to-pink-500"
    },
    {
      title: "Community",
      description: "Team Up with Fellow Mentorship & Q&A",
      icon: Users,
      gradient: "from-orange-400 to-pink-500"
    },
    {
      title: "Commitment",
      description: "Co-Create Honest Approach Accountability Implementation",
      icon: Target,
      gradient: "from-orange-400 to-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Gradient border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl p-0.5`}>
                  <div className="bg-white rounded-2xl h-full w-full"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mr-4`}>
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;