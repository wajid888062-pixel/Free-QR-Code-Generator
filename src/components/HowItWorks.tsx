import React from 'react';
import { MousePointerClick, Edit3, DownloadCloud, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartNow: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartNow }) => {
  const steps = [
    {
      num: '01',
      title: 'CHOOSE QR TYPE',
      description:
        'Select a URL, Wi-Fi, text, contact, WhatsApp, or another category that suits your purpose.',
      icon: MousePointerClick,
      color: 'bg-blue-600',
    },
    {
      num: '02',
      title: 'ENTER INFORMATION',
      description:
        'Enter the information you want to share with live preview and automatic payload formatting.',
      icon: Edit3,
      color: 'bg-sky-500',
    },
    {
      num: '03',
      title: 'DOWNLOAD QR CODE',
      description:
        'Generate and download your QR code instantly in PNG, JPG, vector SVG, or print-ready PDF.',
      icon: DownloadCloud,
      color: 'bg-emerald-600',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
            Fast &amp; Frictionless
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How It Works in 3 Simple Steps
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            No technical knowledge or setup required. From idea to scannable barcode in under 10 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-xs hover:shadow-lg transition-all text-center flex flex-col items-center"
              >
                {/* Step badge */}
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 font-bold text-lg">
                  <Icon className="w-7 h-7" />
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-2">
                  STEP {step.num}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onStartNow}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-transform hover:-translate-y-0.5"
          >
            <span>Create Your First QR Code</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
