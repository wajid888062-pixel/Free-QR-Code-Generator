import React from 'react';
import {
  ShieldCheck,
  Zap,
  Palette,
  Download,
  Layers,
  UserX,
  Smartphone,
  Lock,
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: '100% Free QR Generation',
      description:
        'Zero hidden subscriptions or paywalls. Generate unlimited commercial or personal QR codes forever at no cost.',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/60',
    },
    {
      icon: Zap,
      title: 'Instant QR Creation',
      description:
        'Lightning-fast rendering in your browser. Real-time updates as you type with zero server latency.',
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-950/60',
    },
    {
      icon: Palette,
      title: 'Custom QR Designs',
      description:
        'Personalize foreground & background colors, choose rounded dots or square modules, and embed your center logo.',
      color: 'text-sky-500',
      bg: 'bg-sky-50 dark:bg-sky-950/60',
    },
    {
      icon: Download,
      title: 'High-Resolution Downloads',
      description:
        'Export crisp vector SVG for billboards, print-ready PDF sheets, and high-definition PNG & JPG images up to 2048px.',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      icon: Layers,
      title: 'Multiple QR Categories',
      description:
        'Support for 12+ standard formats: Web URLs, Wi-Fi networks, vCard business cards, WhatsApp, SMS, emails, and events.',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-950/60',
    },
    {
      icon: UserX,
      title: 'No Registration Required',
      description:
        'No signup, passwords, or credit cards required. Start generating and downloading immediately with one click.',
      color: 'text-violet-500',
      bg: 'bg-violet-50 dark:bg-violet-950/60',
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description:
        'Tested and optimized for all iOS camera scanners and Android lens apps. Touch-friendly interface on all devices.',
      color: 'text-teal-500',
      bg: 'bg-teal-50 dark:bg-teal-950/60',
    },
    {
      icon: Lock,
      title: 'Privacy-Friendly Generation',
      description:
        'All barcode generation is processed entirely client-side inside your browser. Your sensitive Wi-Fi or contact data never leaves your device.',
      color: 'text-slate-700 dark:text-slate-300',
      bg: 'bg-slate-100 dark:bg-slate-800',
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-slate-50/60 dark:bg-slate-900/50 scroll-mt-16 border-y border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
            Engineered For Simplicity &amp; Power
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Need in a Free QR Tool
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Professional features designed for businesses, creators, events, and everyday users.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/70 p-6 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bg} ${item.color} group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
