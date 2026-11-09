import React from 'react';
import { Quote, Sparkles, Target, Compass, Heart, Code2, Globe } from 'lucide-react';

export const AboutFounder: React.FC = () => {
  return (
    <section
      id="founder"
      className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/80 to-white dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 scroll-mt-20 border-t border-slate-200/70 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900 shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Leadership &amp; Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Meet the Founder
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            The story, vision, and dedication behind this free international QR Code platform.
          </p>
        </div>

        {/* Founder Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Photograph & Identity Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-blue-950/20 overflow-hidden group">
              {/* Actual Uploaded Photograph Frame */}
              <div className="relative overflow-hidden bg-slate-900 aspect-[4/3] rounded-t-3xl">
                <img
                  src="/assets/aistudio/file_00000000abac8211bf0b29a57acf7cf6_c2ce16ce.png"
                  alt="Wajid Malik - Founder & Creator of QR Code Generator"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Name Badge Overlay */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                        Wajid Malik
                      </h3>
                      <p className="text-xs text-blue-300 font-medium mt-0.5">
                        Founder &amp; Creator
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600/90 text-white backdrop-blur-xs border border-blue-400/30">
                      Creator
                    </span>
                  </div>
                </div>
              </div>

              {/* Founder Meta Details */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">
                      Platform
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 mt-0.5 block truncate">
                      QR Code Generator
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">
                      Role
                    </span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 mt-0.5 block truncate">
                      Founder &amp; Creator
                    </span>
                  </div>
                </div>

                {/* Focus Areas */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Focus &amp; Interests
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60">
                      <Code2 className="w-3.5 h-3.5 text-blue-500" />
                      <span>Web Development</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200/60 dark:border-sky-900/60">
                      <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                      <span>Digital Innovation</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/60">
                      <Globe className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Accessible Tools</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Introduction, Message & Mission */}
          <div className="lg:col-span-7 space-y-6">
            {/* Founder Introduction */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                About Wajid Malik
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Wajid Malik is an enthusiastic creator interested in technology, digital innovation, web development, and creating useful digital tools. With a strong belief that modern software should serve people rather than create barriers, his goal is to make modern technology simple, accessible, and genuinely useful for everyone around the world.
              </p>
            </div>

            {/* A Message from the Founder Card */}
            <div className="relative bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800/50 overflow-hidden">
              {/* Decorative Quote Icon Background */}
              <div className="absolute top-4 right-4 text-blue-500/10 pointer-events-none">
                <Quote className="w-24 h-24" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Quote className="w-5 h-5 text-blue-400 shrink-0" />
                  <h4 className="text-base sm:text-lg font-bold tracking-tight text-white uppercase tracking-wider">
                    A Message from the Founder
                  </h4>
                </div>

                <div className="space-y-3.5 text-slate-200 text-sm sm:text-base leading-relaxed italic border-l-2 border-blue-500/60 pl-4 py-1">
                  <p>
                    &ldquo;Technology should not be complicated or expensive. I believe useful digital tools should be accessible to everyone. That is why I created this QR Code Generator — to make QR code creation simple, fast and free for people around the world.&rdquo;
                  </p>
                  <p>
                    &ldquo;My vision is to continue improving this platform and provide useful digital solutions that make everyday tasks easier.&rdquo;
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">Wajid Malik</span>
                    <span className="text-xs text-blue-300">• Founder &amp; Creator</span>
                  </div>
                  <span className="text-[11px] text-slate-400">QR Code Generator</span>
                </div>
              </div>
            </div>

            {/* My Mission Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    My Mission
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    &ldquo;To make technology accessible to everyone by building simple, useful and reliable digital tools.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
