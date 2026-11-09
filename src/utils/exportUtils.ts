import { jsPDF } from 'jspdf';
import { generateQRSVG } from './qrRenderer';
import { QRDesignOptions } from '../types/qr';

export function downloadCanvasAsImage(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpg',
  fileName = 'qrcode'
): void {
  let dataUrl: string;

  if (format === 'jpg') {
    // For JPG, draw onto a white background canvas if it had transparency
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      ctx.drawImage(canvas, 0, 0);
    }
    dataUrl = tempCanvas.toDataURL('image/jpeg', 0.95);
  } else {
    dataUrl = canvas.toDataURL('image/png');
  }

  const link = document.createElement('a');
  link.download = `${fileName}.${format === 'jpg' ? 'jpg' : 'png'}`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadSVG(payload: string, options: QRDesignOptions, fileName = 'qrcode'): void {
  const svgString = generateQRSVG(payload, options);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${fileName}.svg`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadPDF(
  canvas: HTMLCanvasElement,
  title: string,
  payload: string,
  fileName = 'qrcode'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header Branding
  doc.setFillColor(15, 23, 42); // Navy #0F172A
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('QRcraft Studio', 15, 14);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(147, 197, 253);
  doc.text('Free Professional High-Resolution QR Code', 15, 21);

  // Content Title
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  const safeTitle = doc.splitTextToSize(title || 'Scan to Connect', pageWidth - 30);
  doc.text(safeTitle, 15, 45);

  // QR Code Image
  const qrSize = 110; // 110mm x 110mm
  const qrX = (pageWidth - qrSize) / 2;
  const qrY = 56;

  // Draw light card frame behind QR
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 6, 6, 'FD');

  const imgData = canvas.toDataURL('image/png');
  doc.addImage(imgData, 'PNG', qrX, qrY, qrSize, qrSize);

  // Scanning Instruction Banner
  const bannerY = qrY + qrSize + 18;
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(15, bannerY, pageWidth - 30, 24, 4, 4, 'FD');

  doc.setTextColor(30, 64, 175);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('How to scan:', 22, bannerY + 8);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Open the default Camera app on your smartphone, point it directly at the QR code, and tap the notification link to open.',
    22,
    bannerY + 16,
    { maxWidth: pageWidth - 45 }
  );

  // Encoded Data preview
  const dataY = bannerY + 32;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('Encoded Content:', 15, dataY);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);
  const truncatedPayload =
    payload.length > 180 ? payload.substring(0, 180) + '...' : payload;
  const splitPayload = doc.splitTextToSize(truncatedPayload, pageWidth - 30);
  doc.text(splitPayload, 15, dataY + 6);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `Generated on ${new Date().toLocaleDateString()} with QRcraft Studio • 100% Free & Unlimited`,
    pageWidth / 2,
    pageHeight - 12,
    { align: 'center' }
  );

  doc.save(`${fileName}.pdf`);
}

export async function copyCanvasToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        resolve(false);
        return;
      }
      try {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        resolve(true);
      } catch {
        resolve(false);
      }
    }, 'image/png');
  });
}

export function printQRCode(canvas: HTMLCanvasElement, title: string, subtitle?: string): void {
  const printArea = document.getElementById('printable-qr-area');
  if (!printArea) {
    window.print();
    return;
  }

  const imgData = canvas.toDataURL('image/png');
  printArea.innerHTML = `
    <div style="font-family: sans-serif; text-align: center; max-width: 480px; margin: 0 auto; padding: 2rem; border: 2px dashed #cbd5e1; border-radius: 1rem;">
      <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 8px; color: #0f172a;">${title || 'Scan to Connect'}</h2>
      ${subtitle ? `<p style="font-size: 14px; color: #64748b; margin-bottom: 24px;">${subtitle}</p>` : ''}
      <div style="margin: 0 auto; display: inline-block; padding: 16px; background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        <img src="${imgData}" style="width: 280px; height: 280px; display: block;" alt="Printable QR Code" />
      </div>
      <p style="margin-top: 24px; font-size: 13px; color: #334155; font-weight: 500;">
        Point your phone's camera at this QR code to access.
      </p>
      <div style="margin-top: 16px; font-size: 11px; color: #94a3b8;">
        Generated by QRcraft Studio • Free &amp; Scannable
      </div>
    </div>
  `;

  window.print();
}
