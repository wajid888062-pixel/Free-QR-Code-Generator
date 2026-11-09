import React, { useEffect, useRef, useState } from 'react';
import { QRDesignOptions } from '../../types/qr';
import { renderQRToCanvas, getContrastRatio } from '../../utils/qrRenderer';
import {
  downloadCanvasAsImage,
  downloadSVG,
  downloadPDF,
  copyCanvasToClipboard,
  printQRCode,
} from '../../utils/exportUtils';
import {
  Download,
  Copy,
  Printer,
  Sliders,
  RotateCcw,
  Check,
  FileCode,
  FileImage,
  FileText,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QRPreviewProps {
  payload: string;
  title: string;
  category: string;
  options: QRDesignOptions;
  showCustomizer: boolean;
  onToggleCustomizer: () => void;
  onResetOptions: () => void;
  onSaveToHistory: (previewDataUrl: string) => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({
  payload,
  title,
  category,
  options,
  showCustomizer,
  onToggleCustomizer,
  onResetOptions,
  onSaveToHistory,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'jpg' | 'svg' | 'pdf'>('png');
  const [isExporting, setIsExporting] = useState(false);

  // Re-render canvas whenever payload or options change
  useEffect(() => {
    let active = true;
    const render = async () => {
      if (!canvasRef.current) return;
      await renderQRToCanvas(canvasRef.current, payload, options);
      if (active && canvasRef.current) {
        try {
          const dataUrl = canvasRef.current.toDataURL('image/png');
          onSaveToHistory(dataUrl);
        } catch {
          // ignore potential canvas taint if cross-origin image
        }
      }
    };
    render();
    return () => {
      active = false;
    };
  }, [payload, options]);

  const contrast = getContrastRatio(options.fgColor, options.bgColor);
  const isContrastSafe = contrast >= 3.0;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    const safeName = (title || 'qrcode')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 30);

    try {
      if (downloadFormat === 'png' || downloadFormat === 'jpg') {
        downloadCanvasAsImage(canvasRef.current, downloadFormat, safeName);
      } else if (downloadFormat === 'svg') {
        downloadSVG(payload, options, safeName);
      } else if (downloadFormat === 'pdf') {
        downloadPDF(canvasRef.current, title, payload, safeName);
      }

      // Trigger celebratory micro-confetti
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563EB', '#38BDF8', '#0F172A', '#10B981'],
      });
    } finally {
      setTimeout(() => setIsExporting(false), 400);
    }
  };

  const handleCopy = async () => {
    if (!canvasRef.current) return;
    const ok = await copyCanvasToClipboard(canvasRef.current);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (!canvasRef.current) return;
    printQRCode(canvasRef.current, title, 'Scan with your smartphone camera');
  };

  return (
    <div className="sticky top-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-blue-950/20 p-5 sm:p-6 space-y-5">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Live QR Preview
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {isContrastSafe ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Scannable</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Low Contrast</span>
            </span>
          )}
        </div>
      </div>

      {/* Canvas QR Code Display Area */}
      <div className="relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-800/80 dark:to-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 min-h-[280px]">
        {/* Elevated QR Canvas Card */}
        <div className="relative z-10 p-3 bg-white rounded-2xl shadow-md border border-slate-200/50 dark:border-transparent flex items-center justify-center max-w-full">
          <canvas
            ref={canvasRef}
            className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-lg"
          />
        </div>

        {/* Short Payload Snippet */}
        <div className="relative z-10 mt-3.5 text-center max-w-xs">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
            {title || 'QR Code'}
          </p>
          <p className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
            {payload}
          </p>
        </div>
      </div>

      {/* Format Selector Pills (PNG, JPG, SVG, PDF) */}
      <div>
        <label className="block text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-2">
          Step 5: Select Format &amp; Download
        </label>
        <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
          {[
            { id: 'png', label: 'PNG', icon: FileImage },
            { id: 'jpg', label: 'JPG', icon: FileImage },
            { id: 'svg', label: 'SVG', icon: FileCode },
            { id: 'pdf', label: 'PDF', icon: FileText },
          ].map((fmt) => {
            const isSel = downloadFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                type="button"
                onClick={() => setDownloadFormat(fmt.id as any)}
                className={`py-2 px-1 text-xs font-bold rounded-lg text-center transition-all ${
                  isSel
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {fmt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Download Button */}
      <button
        type="button"
        onClick={handleDownload}
        disabled={isExporting}
        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
      >
        <Download className="w-4 h-4" />
        <span>Download QR Code ({downloadFormat.toUpperCase()})</span>
      </button>

      {/* Action Row: Copy, Print, Customize, Reset */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 transition-colors"
          title="Copy image to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 transition-colors"
          title="Print QR code sheet"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span>Print</span>
        </button>

        <button
          type="button"
          onClick={onToggleCustomizer}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
            showCustomizer
              ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-500'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Style</span>
        </button>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
        <span>Res: {options.size}×{options.size}px</span>
        <button
          type="button"
          onClick={onResetOptions}
          className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Styling</span>
        </button>
      </div>
    </div>
  );
};
