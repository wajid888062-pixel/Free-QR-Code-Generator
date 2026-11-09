import React from 'react';
import { QRHistoryItem } from '../types/qr';
import { X, Trash2, Download, Copy, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { downloadCanvasAsImage } from '../utils/exportUtils';

interface QRHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  items: QRHistoryItem[];
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const QRHistory: React.FC<QRHistoryProps> = ({
  isOpen,
  onClose,
  items,
  onDeleteItem,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const handleDownloadItem = (item: QRHistoryItem) => {
    const link = document.createElement('a');
    link.href = item.previewDataUrl;
    link.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'qrcode'}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Saved QR Code History
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Saved locally in this browser • {items.length} {items.length === 1 ? 'code' : 'codes'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Privacy notice banner */}
        <div className="my-3 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 flex items-start gap-2.5 text-xs text-blue-900 dark:text-blue-300">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
          <span>
            <strong>Local Privacy:</strong> Your QR codes are generated and stored exclusively within your browser's private local storage. No data is ever transmitted to an external server.
          </span>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 py-2 pr-1">
          {items.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Clock className="w-8 h-8 mx-auto opacity-40" />
              <p className="text-sm font-medium">No QR codes generated yet.</p>
              <p className="text-xs">Create your first QR code to see it listed here.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-xl bg-white p-1 border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center">
                    <img
                      src={item.previewDataUrl}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5 max-w-xs sm:max-w-md">
                      {item.encodedData}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    onClick={() => handleDownloadItem(item)}
                    title="Download PNG again"
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    title="Delete from history"
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
            >
              Clear All History
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
