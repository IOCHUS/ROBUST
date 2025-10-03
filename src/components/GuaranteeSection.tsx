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
    <section id="guarantee" className="relative py-32 overflow-hidden">
      {/* Premium Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.15) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Guarantee Badge */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-full mb-8 transform hover:scale-110 transition-transform duration-300 border-2 border-amber-500/30">
            <div className="text-center text-white">
              <Shield size={32} className="mx-auto mb-1 text-amber-500" />
              <div className="text-xs font-medium text-amber-400">MONEY BACK</div>
              <div className="text-2xl font-bold text-amber-500">3X</div>
            </div>
          </div>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Triple Money-Back Guarantee
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            We're so confident in ROBUST that we offer a 3x money-back guarantee. Your success is our commitment.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/5 p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">MasterClass ROBUST</h3>
            <p className="text-lg text-gray-400 leading-relaxed max-w-4xl mx-auto font-light">
              The MasterClass focuses on self-action and responsibility. It offers a curated selection of the best tools and
              systematic self-behavior strategies, empowering individuals to reach their full potential. Your future is in your hands.
            </p>
          </div>

          {/* FAQ */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-amber-500/5 rounded-xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-colors duration-300">
                <div className="flex items-start">
                  <CheckCircle className="text-amber-500 mt-1 mr-4 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{faq.question}</h4>
                    <p className="text-gray-400 leading-relaxed font-light">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-4 px-12 rounded-full text-xl shadow-2xl shadow-amber-500/20 transform hover:scale-105 transition-all duration-300">
            START YOUR JOURNEY
          </button>
          <p className="text-gray-500 text-sm mt-4 font-light">Join thousands who have already transformed their lives</p>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;