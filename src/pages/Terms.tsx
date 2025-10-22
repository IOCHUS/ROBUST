import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-gray-400 mb-12">Last updated: January 2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p className="leading-relaxed">
              By accessing and enrolling in ROBUST MasterClass, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. License & Access</h2>
            <p className="leading-relaxed mb-4">
              Upon payment of $297, you receive:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Lifetime access to the ROBUST web portal</li>
              <li>Access to all 12+ core modules and materials</li>
              <li>Community membership and participation rights</li>
              <li>30-day free access to AI assistant (optional $49/month thereafter)</li>
              <li>All tools and calculators included in the platform</li>
            </ul>
            <p className="leading-relaxed mt-4">
              This license is for personal, non-commercial use only. You may not share, resell, or distribute course materials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Payment Terms</h2>
            <p className="leading-relaxed">
              ROBUST MasterClass is a one-time payment of $297 USD. Payment is processed securely through our payment provider. You will receive immediate access upon successful payment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. 3X Money-Back Guarantee</h2>
            <p className="leading-relaxed mb-4">
              We offer a unique 3X money-back guarantee ($891 refund) if you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Complete all 12+ modules in the masterclass</li>
              <li>Actively participate in the community</li>
              <li>Implement the systems taught in the course</li>
              <li>Track your progress through the platform</li>
              <li>Do not see significant progress toward your last chapter setup</li>
            </ul>
            <p className="leading-relaxed mt-4">
              To request a refund, you must provide proof of completion and implementation efforts. Refunds are processed within 30 days of approved requests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. User Responsibilities</h2>
            <p className="leading-relaxed mb-4">You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Take personal responsibility for your results</li>
              <li>Act honestly and with integrity in the community</li>
              <li>Not share login credentials with others</li>
              <li>Not reproduce or distribute course materials</li>
              <li>Respect other community members</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Disclaimer</h2>
            <p className="leading-relaxed">
              ROBUST provides education and tools. Your results depend on YOUR effort, commitment, and action. We make no guarantees of specific financial outcomes. Success requires consistent work and honest self-assessment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
            <p className="leading-relaxed">
              ROBUST MasterClass and IOCHUS shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform or materials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Contact</h2>
            <p className="leading-relaxed">
              For questions about these terms, please contact us through the community platform or our LinkedIn page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
