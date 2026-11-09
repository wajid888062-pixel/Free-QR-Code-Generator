import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Heart, Sparkles, QrCode } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Logo sizeClass="h-[60px]" />
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              A modern, high-precision, 100% free QR code generator with vector SVG, high-res PNG, PDF exports, and center logo embedding.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-800 text-blue-400 border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Cost • Privacy First</span>
            </div>
          </div>

          {/* Column 2: Generator Types */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              QR Code Types
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('generator')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Website &amp; URL
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('generator')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Wi-Fi Network Access
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('generator')}
                  className="hover:text-blue-400 transition-colors"
                >
                  vCard Digital Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('generator')}
                  className="hover:text-blue-400 transition-colors"
                >
                  WhatsApp &amp; Direct SMS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('generator')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Google Maps Coordinates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('generator')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Calendar Events (iCal)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Features Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-blue-400 transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tools')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Free QR Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('founder')}
                  className="hover:text-blue-400 transition-colors"
                >
                  About the Founder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Contact Support
                </button>
              </li>
            </ul>

            <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400 leading-relaxed">
              Permanent static barcodes. Generated client-side in ISO/IEC 18004 compliance.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} QRcraft Studio. Built for global free use.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacy} className="hover:text-slate-300">
              Privacy
            </button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:text-slate-300">
              Terms
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
