import React from 'react';

const MoneyBackGuarantee = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Money Back Guarantee Badge */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <div className="text-center text-white font-bold">
                <div className="text-xs">MONEY BACK</div>
                <div className="text-2xl">3x</div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">✓</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            MasterClass ROBUST
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-gray-700 leading-relaxed">
                The MasterClass focuses on self-action and responsibility. It offers a curated selection of the best tools and 
                systematic self-behavior strategies, empowering individuals to reach their full potential. Your future is in your 
                hands.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-orange-600 mb-3 flex items-center">
                <span className="mr-2">❓</span>
                Is It A Scam ?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Your evolution depends solely on you. Vulpin vision provides the tools, network, and knowledge to support 
                your growth. The rest is up to you, think, act, think act and take consistent action.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-orange-600 mb-3">
                Money Back Return
              </h3>
              <p className="text-gray-700 leading-relaxed">
                If you don't make significant progress by the end of the MasterClass, we will refund three times the total cost of 
                the MasterClass. Guaranteed!
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-orange-600 mb-3">
                Do I Need a Math Degree or Finance Expertise?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Absolutely not! This MasterClass is designed for everyone, regardless of educational background or prior 
                experience. Anyone can succeed with commitment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoneyBackGuarantee;