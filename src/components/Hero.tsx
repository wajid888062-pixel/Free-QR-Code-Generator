import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Download } from 'lucide-react';

interface HeroProps {
  onGenerateClick: () => void;
  onExploreFeaturesClick: () => void;
  onOpenQuickType: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onGenerateClick,
  onExploreFeaturesClick,
  onOpenQuickType,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 -z-10 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-sky-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle, Trust badge, CTA buttons */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Free Professional All-in-One QR Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Create QR Codes{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                in Seconds
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Generate, customize and download professional QR codes for websites, Wi-Fi, contact information, social media and more. Simple, fast and free.
            </p>

            {/* Trust Statement */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>100% Free QR Generation</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>No Registration Required</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-blue-500" />
                <span>Vector &amp; Print Ready</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                type="button"
                onClick={onGenerateClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5" />
                <span>Generate QR Code</span>
              </button>

              <button
                type="button"
                onClick={onExploreFeaturesClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
              >
                <span>Explore Features</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Quick Format Shortcuts */}
            <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/80">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                Popular Scannable Formats:
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {[
                  { id: 'url', label: '🔗 Website URL' },
                  { id: 'wifi', label: '📶 Wi-Fi Access' },
                  { id: 'vcard', label: '📇 vCard Contact' },
                  { id: 'whatsapp', label: '💬 WhatsApp' },
                  { id: 'event', label: '📅 Calendar Event' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onOpenQuickType(item.id);
                      onGenerateClick();
                    }}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800/80 dark:hover:bg-blue-950/60 dark:hover:text-blue-300 text-slate-600 dark:text-slate-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Instant Creation Card (Replacing Demo QR Code) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md">
              <div className="relative rounded-3xl p-7 sm:p-9 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-blue-950/20 flex flex-col justify-between text-left">
                {/* Header Badge */}
                <div className="flex items-center pb-5 border-b border-slate-100 dark:border-slate-800 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Instant Creation</span>
                  </div>
                </div>

                {/* Required Heading & Text */}
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                    Create Your QR Code Instantly
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    Choose your QR type, enter your information and generate your QR code in seconds.
                  </p>
                </div>

                {/* 3 Step Features List */}
                <div className="my-6 space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </div>
                    <span>Select from 12+ scannable formats (URL, Wi-Fi, vCard)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </div>
                    <span>Customize colors, dot patterns &amp; center logo</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                      3
                    </div>
                    <span>Download in PNG, JPG, vector SVG or print PDF</span>
                  </div>
                </div>

                {/* Required "Start Creating QR Code" Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onGenerateClick}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Start Creating QR Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
