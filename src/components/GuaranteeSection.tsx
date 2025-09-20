import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const GuaranteeSection = () => {
  const faqs = [
    {
      question: "Is It A Scam?",
      answer: "Your evolution depends solely on you. Vulpin vision provides the tools, network, and knowledge to support your growth. The rest is up to you, think, act, think act and take consistent action."
    },
    {
      question: "Money Back Return",
      answer: "If you don't make significant progress by the end of the MasterClass, we will refund three times the total cost of the MasterClass. Guaranteed!"
    },
    {
      question: "Do I Need a Math Degree or Finance Expertise?",
      answer: "Absolutely not! This MasterClass is designed for everyone, regardless of educational background or prior experience. Anyone can succeed with commitment."
    }
  ];

  return (
    <section id="guarantee" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Guarantee Badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl mb-8 transform hover:scale-110 transition-transform duration-300">
            <div className="text-center text-white">
              <Shield size={32} className="mx-auto mb-1" />
              <div className="text-xs font-semibold">MONEY BACK</div>
              <div className="text-2xl font-bold">3X</div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Triple Money-Back Guarantee
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're so confident in ROBUST that we offer a 3x money-back guarantee. Your success is our commitment.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">MasterClass ROBUST</h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              The MasterClass focuses on self-action and responsibility. It offers a curated selection of the best tools and 
              systematic self-behavior strategies, empowering individuals to reach their full potential. Your future is in your hands.
            </p>
          </div>

          {/* FAQ */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
                <div className="flex items-start">
                  <CheckCircle className="text-amber-500 mt-1 mr-4 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h4>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-12 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
            START YOUR TRANSFORMATION
          </button>
          <p className="text-gray-500 text-sm mt-4">Join thousands who have already transformed their lives</p>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;