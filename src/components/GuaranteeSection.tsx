import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const GuaranteeSection = () => {
  const faqs = [
    {
      question: "Is It A Scam?",
      answer: "Your evolution depends solely on you. ROBUST provides the tools, network, and knowledge to support your growth. The rest is up to you: think, act, and take consistent action."
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
    <section id="guarantee" className="relative py-32 overflow-hidden">
      {/* Refined Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Guarantee Badge */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full blur-2xl opacity-30"></div>
            <div className="relative w-40 h-40 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex flex-col items-center justify-center shadow-2xl shadow-amber-500/40 transform hover:scale-105 transition-transform duration-300 border-4 border-amber-400/30">
              <div className="text-sm font-bold text-white tracking-wider">MONEY BACK</div>
              <div className="text-6xl font-black text-white leading-none">3X</div>
              <div className="text-xs text-amber-100 mt-1">GUARANTEE</div>
            </div>
          </div>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Triple Money-Back Guarantee
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're so confident in ROBUST that we offer a 3x money-back guarantee. Your success is our commitment.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-600/40 p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-6 tracking-tight">MasterClass ROBUST</h3>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              The MasterClass focuses on self-action and responsibility. It offers a curated selection of the best tools and
              systematic self-behavior strategies, empowering individuals to reach their full potential. Your future is in your hands.
            </p>
          </div>

          {/* FAQ */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-xl p-6 border border-amber-500/30 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
                <div className="flex items-start">
                  <CheckCircle className="text-amber-500 mt-1 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{faq.question}</h4>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="#pricing" className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-5 px-14 rounded-full text-xl shadow-2xl shadow-amber-500/30 transform hover:scale-105 transition-all duration-300">
            Get ROBUST Kit
          </a>
          <p className="text-gray-400 text-sm mt-4">Join thousands who have already transformed their lives</p>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;