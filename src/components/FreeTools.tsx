import React from 'react';
import {
  QrCode,
  Palette,
  Download,
  Printer,
  ScanLine,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface FreeToolsProps {
  onActivateTool: (toolId: string) => void;
  onOpenScanner?: () => void;
}

export const FreeTools: React.FC<FreeToolsProps> = ({
  onActivateTool,
  onOpenScanner,
}) => {
  const tools = [
    {
      id: 'generator',
      title: 'QR Code Generator',
      description:
        'Create scannable barcodes for URLs, Wi-Fi, contacts, SMS, and WhatsApp with instant rendering.',
      icon: QrCode,
      action: 'Open Generator',
      badge: 'Core Tool',
    },
    {
      id: 'customizer',
      title: 'QR Code Color Customizer',
      description:
        'Tailor hex foreground and background colors, apply stylish rounded dots, and embed center logos.',
      icon: Palette,
      action: 'Customize Colors',
      badge: 'Styling',
    },
    {
      id: 'downloader',
      title: 'QR Code Image Downloader',
      description:
        'Download high-definition PNG, JPG, vector SVG, and PDF files with transparent background options.',
      icon: Download,
      action: 'Export Formats',
      badge: 'High-Res',
    },
    {
      id: 'printer',
      title: 'QR Code Print Tool',
      description:
        'Format clean, printable flyers, table tents, and cards with instructions ready for your local printer.',
      icon: Printer,
      action: 'Print Template',
      badge: 'Print Ready',
    },
  ];

  return (
    <section id="tools" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-900/60 scroll-mt-16 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
            100% Free &amp; Fully Functional
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Free QR Tools
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Dedicated utility workflows to generate, style, download, and print your QR codes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {t.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {t.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onActivateTool(t.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 transition-colors"
                >
                  <span>{t.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
