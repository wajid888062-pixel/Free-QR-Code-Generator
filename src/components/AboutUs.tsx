import React from 'react';
import { Target, Eye, Award, HeartHandshake, CheckCircle } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
            Our Purpose &amp; Values
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About QRcraft Studio
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Empowering businesses, developers, educators, and creators worldwide with truly free, private, and unlimited QR code generation.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Our Mission
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To make QR code technology straightforward, beautiful, and completely free for anyone in the world. We believe connecting physical items to digital information shouldn’t require expensive recurring subscriptions, artificial download limits, or predatory paywalls.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Our Vision
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              An open web ecosystem where individuals, non-profits, small family restaurants, and enterprises can instantly share contact information, Wi-Fi networks, and URLs with total privacy, zero trackers, and complete peace of mind.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Why Choose Us
            </h3>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>No Expiration Dates:</strong> Generated static QR codes contain direct data and work permanently.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Zero-Cost Architecture:</strong> Pure client-side generation that costs you nothing.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>True Vector Quality:</strong> Scalable vector SVG and PDF exports ready for print.</span>
              </li>
            </ul>
          </div>

          {/* Our Commitment to Free QR Generation */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Our Commitment to Free QR Generation
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We pledge that core static QR code generation will always remain 100% free with no account requirements, watermark injections, or surprise fees. Every QR code created with our platform belongs completely to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
