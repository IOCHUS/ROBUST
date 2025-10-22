import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const Refund = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="flex items-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-2">3X Money-Back Guarantee</h1>
            <p className="text-gray-400">Your investment is protected</p>
          </div>
        </div>

        <div className="space-y-8 text-gray-300">
          <section className="bg-gradient-to-br from-emerald-900/20 to-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">Our Guarantee</h2>
            <p className="text-xl leading-relaxed text-gray-200">
              We're so confident in ROBUST that we offer a <span className="text-emerald-400 font-bold">3X money-back guarantee</span>. If you complete the masterclass and don't make significant progress toward your last chapter setup, we'll refund <span className="text-emerald-400 font-bold">THREE TIMES</span> your investment—that's <span className="text-emerald-400 font-bold">$891</span> back.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Qualification Requirements</h2>
            <p className="leading-relaxed mb-4">
              To qualify for the 3X refund, you must demonstrate that you:
            </p>
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">✓ Complete All Modules</h3>
                <p>Finish all 12+ core modules and review all educational materials provided in the masterclass.</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">✓ Participate Actively</h3>
                <p>Engage with the community, ask questions, and connect with members on similar journeys.</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">✓ Implement Systems</h3>
                <p>Take action on the strategies taught. Use the tools provided (F.E.U. Tracker, Desire Locker, calculators).</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">✓ Track Progress</h3>
                <p>Document your journey through the platform's tracking tools and show evidence of your efforts.</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">✓ No Significant Progress</h3>
                <p>After completing the above, if you still haven't made meaningful progress toward your last chapter, you qualify.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How to Request a Refund</h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li className="leading-relaxed">Contact us through the community platform or LinkedIn with "3X Refund Request" in the subject line</li>
              <li className="leading-relaxed">Provide proof of module completion (available in your portal dashboard)</li>
              <li className="leading-relaxed">Share evidence of your implementation efforts (tracker data, community participation)</li>
              <li className="leading-relaxed">Explain what progress you expected vs. what you achieved</li>
              <li className="leading-relaxed">Our team will review within 7 business days</li>
              <li className="leading-relaxed">If approved, you'll receive $891 within 30 days via your original payment method</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Important Notes</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>The 3X guarantee is valid for the lifetime of your membership</li>
              <li>You must have completed the masterclass to qualify (no partial completion refunds)</li>
              <li>Refund decisions are final and at our discretion based on evidence provided</li>
              <li>The AI assistant subscription (if purchased separately) is not included in the refund</li>
              <li>Your results depend on YOUR effort—we can only guarantee the quality of education and tools</li>
            </ul>
          </section>

          <section className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Why We Offer This</h2>
            <p className="leading-relaxed mb-4">
              We're not here to take your money if ROBUST doesn't work for you. We genuinely believe in the system and know that if you do the work with honesty and commitment, you'll see results.
            </p>
            <p className="leading-relaxed">
              The 3X guarantee removes your risk entirely. Either ROBUST helps you build your last chapter, or you get THREE TIMES your money back. You can't lose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Questions?</h2>
            <p className="leading-relaxed">
              If you have questions about our refund policy, reach out through the community platform or contact IOCHUS directly on LinkedIn before enrolling.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Refund;
