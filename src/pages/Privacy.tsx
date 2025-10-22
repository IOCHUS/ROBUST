import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-400 mb-12">Last updated: January 2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed mb-4">
              When you enroll in ROBUST MasterClass, we collect information necessary to provide you with access to the platform and deliver the educational content you purchased.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address and name for account creation</li>
              <li>Payment information processed securely through our payment provider</li>
              <li>Progress data within the masterclass modules</li>
              <li>Community interactions and profile information you choose to share</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide access to the ROBUST platform and all included materials</li>
              <li>Send important updates about your enrollment and course content</li>
              <li>Track your progress through the masterclass</li>
              <li>Facilitate community connections with other members</li>
              <li>Improve the ROBUST experience based on usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
            <p className="leading-relaxed">
              We implement industry-standard security measures to protect your personal information. Payment data is processed securely through encrypted connections and we never store complete payment card information on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing</h2>
            <p className="leading-relaxed mb-4">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment processors to complete transactions</li>
              <li>Service providers who help us operate the platform</li>
              <li>Other community members (only information you choose to make public)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
            <p className="leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
            <p className="leading-relaxed">
              We use essential cookies to maintain your session and remember your preferences. We do not use tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact</h2>
            <p className="leading-relaxed">
              For privacy-related questions or to exercise your rights, please contact us through our community platform or visit our LinkedIn page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
