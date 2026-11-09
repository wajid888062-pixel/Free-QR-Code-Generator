import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: '1. What is a QR code?',
      a: 'A QR (Quick Response) code is a two-dimensional barcode capable of storing digital data such as website links, plain text, contact details, Wi-Fi passwords, or coordinates. It can be read in milliseconds using any smartphone camera or QR scanning application.',
    },
    {
      q: '2. How do I create a QR code?',
      a: 'Creating a QR code takes three steps: 1) Select your QR type (URL, Wi-Fi, vCard, etc.), 2) Type your information in the input field, and 3) Customize colors or add a logo if desired and click Download to save your PNG, JPG, SVG, or PDF file.',
    },
    {
      q: '3. Is this QR generator free?',
      a: 'Yes, 100% free with no hidden charges, trial periods, subscription fees, or limits on how many QR codes you can create and download.',
    },
    {
      q: '4. Do QR codes expire?',
      a: 'No, static QR codes generated here never expire. The encoded data (e.g. your website URL or Wi-Fi key) is encoded directly into the barcode pattern itself, so it works indefinitely as long as your destination website or network remains active.',
    },
    {
      q: '5. Can I generate Wi-Fi QR codes?',
      a: 'Yes! Select the "Wi-Fi Network" tab, enter your network name (SSID), choose your security protocol (WPA/WPA2/WPA3 or WEP), and enter your password. When guests scan the code, their phones connect automatically without typing the password.',
    },
    {
      q: '6. Can I add my own logo?',
      a: 'Yes. In the Customize Studio, click the "Center Logo" tab to upload your brand logo (PNG, JPG, or SVG). Our tool automatically optimizes the Error Correction Level to High (30% recovery) so the code remains 100% scannable even with your logo in the middle.',
    },
    {
      q: '7. Can I customize QR code colors?',
      a: 'Yes. You can customize both the foreground and background colors using our color presets or custom color pickers. Our system includes a real-time contrast checker to alert you if chosen colors might hinder camera readability.',
    },
    {
      q: '8. Can I download QR codes in SVG?',
      a: 'Yes. You can download crisp vector SVG files that scale to any size without pixelation, making them ideal for billboards, signage, business cards, and commercial merchandise.',
    },
    {
      q: '9. Do I need to create an account?',
      a: 'No registration or login is required. You can immediately generate, style, and download your QR codes anonymously.',
    },
    {
      q: '10. Does the QR code work on Android and iPhone?',
      a: 'Yes. Our generated codes adhere strictly to international ISO/IEC 18004 standards and work natively on the built-in Camera app of iOS (iPhone/iPad) and Android devices without needing any special third-party app.',
    },
    {
      q: '11. Are my QR codes stored online?',
      a: 'No. All QR code generation is performed locally inside your web browser. Your confidential information (like private Wi-Fi passwords or personal phone numbers) is never sent to our servers or saved to a cloud database.',
    },
    {
      q: '12. What is the difference between static and dynamic QR codes?',
      a: 'A static QR code encodes the actual data directly into the pattern: it is permanent, private, never expires, and works without an internet intermediary. A dynamic QR code redirects through an external hosting server so the destination URL can be changed later; however, dynamic codes usually stop working if the provider changes their fees or goes out of business. We generate reliable, permanent static QR codes.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-900/60 scroll-mt-16 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Clear, honest answers about QR technology, formats, and best practices.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
