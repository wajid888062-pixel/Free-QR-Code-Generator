import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <Shield className="w-5 h-5 text-blue-600" />
            ) : (
              <FileText className="w-5 h-5 text-blue-600" />
            )}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pr-2">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Last Updated: November 2026</strong>
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                1. Client-Side Generation Architecture
              </h4>
              <p>
                QRcraft Studio is architected so that all barcode payload encoding, mathematical matrix calculation, styling, and file export (PNG, JPG, SVG, PDF) take place entirely within your device’s local browser JavaScript runtime.
              </p>
              <p>
                We do not collect, transmit, intercept, or log the content you encode in your QR codes (such as Wi-Fi network passwords, email drafts, private vCard contact records, or phone numbers).
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                2. Browser Local Storage
              </h4>
              <p>
                The “QR Code History” feature stores your recently generated codes solely inside your web browser’s <code>localStorage</code> database. This data is private to your local computer or phone. Clearing your browser cache or pressing “Clear All History” inside the app permanently removes this information.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                3. Third-Party Analytics &amp; Cookies
              </h4>
              <p>
                We do not sell user data, utilize intrusive third-party behavioral trackers, or require account logins. Standard anonymous server hosting logs (such as IP address and user-agent) may be recorded by the hosting infrastructure solely for security and denial-of-service prevention.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                4. Data Protection Inquiries
              </h4>
              <p>
                Because we do not maintain a centralized user database of your generated barcodes, we do not store personal profiles to modify or delete.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Last Updated: November 2026</strong>
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                1. Acceptance of Terms
              </h4>
              <p>
                By accessing and using QRcraft Studio, you agree to these Terms and Conditions. This service is provided free of charge for both commercial and personal use.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                2. Permitted Use
              </h4>
              <p>
                You may generate, customize, download, print, and distribute unlimited QR codes for any lawful purpose, including product packaging, menus, marketing campaigns, Wi-Fi sharing, and educational materials.
              </p>
              <p>
                You agree not to use the generator to produce barcodes pointing to malicious software, phishing schemes, illegal content, or fraudulent destinations.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                3. Scanning Reliability &amp; Testing Disclaimer
              </h4>
              <p>
                While our application incorporates standard error correction algorithms and contrast testing, the final scannability of any printed or displayed barcode depends on external variables (such as printing surface, lighting, camera sensor quality, and color contrast). We strongly recommend performing a real-world test scan with an iOS or Android smartphone camera prior to mass printing.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                4. Disclaimer of Warranties
              </h4>
              <p>
                QRcraft Studio is provided on an "as is" and "as available" basis without warranties of any kind. To the maximum extent permitted by applicable law, we disclaim all liability for damages resulting from the use or inability to use the service.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
