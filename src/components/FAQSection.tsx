import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What exactly is ROBUST?",
          answer: "ROBUST is a comprehensive masterclass that helps you design your last chapter. It's not about templates or generic advice—it's a systematic approach to discovering YOUR true needs, building energy sovereignty, and creating sustainable prosperity through the 4 Core Pillars: Clarity, Capacity, Community, and Commitment."
        },
        {
          question: "How is this different from other courses?",
          answer: "Most courses teach you to chase money. ROBUST teaches you to produce energy and meet your actual needs. We focus on food production, solar power, Soul Hustles (work you'd do forever), and anti-fragile systems—not wage slavery. You answer ONE question: 'How would you live your final chapter?' Everything builds from YOUR answer."
        },
        {
          question: "Do I need any prior experience or technical skills?",
          answer: "No. ROBUST is designed for anyone committed to change. You don't need a degree, finance expertise, or technical background. You need honesty about what you want and the willingness to take consistent action."
        }
      ]
    },
    {
      category: "The Program",
      questions: [
        {
          question: "How long does it take to complete?",
          answer: "The masterclass includes 12+ modules you can work through at your own pace. Most members see significant clarity within the first week and measurable results within 30 days. Your lifetime portal access means you can revisit and deepen your practice forever."
        },
        {
          question: "What's included in my $297 investment?",
          answer: "You get: 12+ core modules, F.E.U. Energy Tracker system, Desire Locker tool, 30-day FREE AI assistant, budget efficiency framework, digital & local hustling strategies, infinite energy flow systems, yield optimizer guidance, 5-year prosperity roadmap, interactive calculators, and lifetime community access."
        },
        {
          question: "Is this a one-time payment or subscription?",
          answer: "One-time payment of $297 gives you lifetime access to the web portal and all core features. The AI assistant is free for 30 days, then optional at $49/month (cancel anytime). No hidden fees."
        }
      ]
    },
    {
      category: "Results & Guarantee",
      questions: [
        {
          question: "What results can I realistically expect?",
          answer: "You'll gain crystal clear direction on your desires, actionable systems to build energy sovereignty, income strategies ($500-$1K+/month), and a 5-year custom roadmap. Most importantly, you'll know exactly what YOU need—not what society told you to want."
        },
        {
          question: "What's the 3X Money-Back Guarantee?",
          answer: "If you complete the masterclass and don't make significant progress toward your last chapter setup, we refund THREE TIMES your investment ($891). No questions asked. We're that confident in the system."
        },
        {
          question: "How do I qualify for the 3X refund?",
          answer: "Complete all 12+ modules, actively participate in the community, implement the systems we teach, and track your progress. If you do the work and see no meaningful results, you get 3X back. Your commitment is the only requirement."
        }
      ]
    },
    {
      category: "Technical & Access",
      questions: [
        {
          question: "How do I access the masterclass after purchase?",
          answer: "Instant login after purchase. You'll receive your credentials immediately via email. Access the web portal from any device—no downloads required. Start learning within 60 seconds of payment."
        },
        {
          question: "Can I access this on mobile?",
          answer: "Yes. The portal is fully responsive and works on all devices—desktop, tablet, and mobile. Learn anywhere, anytime."
        },
        {
          question: "What if I have questions during the course?",
          answer: "You have lifetime community access where you can ask questions, connect with members on similar paths, and receive peer mentorship. Track others with similar profiles and learn from their progress."
        }
      ]
    },
    {
      category: "Philosophy & Approach",
      questions: [
        {
          question: "Is this about getting rich quick?",
          answer: "No. This is about energy sovereignty and meeting YOUR actual needs—not chasing arbitrary wealth. We teach production (farming, solar, skills) and Soul Hustles (work you love) to fund the life you designed. Sustainable, not flashy."
        },
        {
          question: "Do I need to quit my job to do this?",
          answer: "Not at all. Start where you are. Many members keep their jobs while building their systems. The goal is to increase your capacity and options—not force immediate drastic changes."
        }
      ]
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Questions? Answers.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about ROBUST and your last chapter setup
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl font-bold text-amber-400 mb-6 tracking-tight">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={questionIndex}
                      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-xl"
                      >
                        <span className="text-lg font-semibold text-white pr-8">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`flex-shrink-0 w-5 h-5 text-amber-400 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <div className="px-6 pb-5">
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-gray-400 mb-6">
              The ROBUST community is here to help. Join and connect with members on similar journeys.
            </p>
            <a
              href="#pricing"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
