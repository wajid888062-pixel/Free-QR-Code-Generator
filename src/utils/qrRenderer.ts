import QRCode from 'qrcode';
import { DotStyle, EyeCenterStyle, EyeCornerStyle, QRDesignOptions } from '../types/qr';

/**
 * Checks if a coordinate (r, c) falls within the 7x7 finder patterns
 * (top-left, top-right, bottom-left)
 */
export function isFinderPattern(r: number, c: number, moduleCount: number): boolean {
  // Top-left: [0..6][0..6]
  if (r <= 6 && c <= 6) return true;
  // Top-right: [0..6][moduleCount - 7..moduleCount - 1]
  if (r <= 6 && c >= moduleCount - 7) return true;
  // Bottom-left: [moduleCount - 7..moduleCount - 1][0..6]
  if (r >= moduleCount - 7 && c <= 6) return true;
  return false;
}

/**
 * Renders custom QR code onto an HTML Canvas element
 */
export async function renderQRToCanvas(
  canvas: HTMLCanvasElement,
  payload: string,
  options: QRDesignOptions
): Promise<void> {
  // Ensure error correction is at least Q or H if logo is enabled
  const ecLevel = options.logoUrl ? (options.errorCorrection === 'L' || options.errorCorrection === 'M' ? 'H' : options.errorCorrection) : options.errorCorrection;

  const qr = QRCode.create(payload, {
    errorCorrectionLevel: ecLevel,
  });

  const moduleCount = qr.modules.size;
  const marginBlocks = Math.max(1, options.margin ?? 2);
  const totalBlocks = moduleCount + marginBlocks * 2;
  const size = options.size || 512;
  const blockSize = size / totalBlocks;

  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Clear & Background
  ctx.clearRect(0, 0, size, size);
  if (!options.transparentBg) {
    ctx.fillStyle = options.bgColor || '#ffffff';
    ctx.fillRect(0, 0, size, size);
  }

  const offset = marginBlocks * blockSize;
  const fg = options.fgColor || '#000000';
  const eyeColor = options.eyeColor || fg;

  // 2. Identify Center Logo Area in block coordinates if logo is enabled
  const logoBlocks = options.logoUrl
    ? Math.round((options.logoSize / 100) * moduleCount)
    : 0;
  const logoStartBlock = Math.floor((moduleCount - logoBlocks) / 2);
  const logoEndBlock = logoStartBlock + logoBlocks;

  // 3. Draw Data Modules (excluding finder patterns and logo area)
  ctx.fillStyle = fg;

  for (let r = 0; r < moduleCount; r++) {
    for (let c = 0; c < moduleCount; c++) {
      if (isFinderPattern(r, c, moduleCount)) continue;

      // Skip modules under the center logo
      if (
        options.logoUrl &&
        r >= logoStartBlock &&
        r < logoEndBlock &&
        c >= logoStartBlock &&
        c < logoEndBlock
      ) {
        continue;
      }

      const isDark = qr.modules.get(r, c);
      if (!isDark) continue;

      const x = offset + c * blockSize;
      const y = offset + r * blockSize;

      drawModule(ctx, x, y, blockSize, options.dotStyle, fg);
    }
  }

  // 4. Draw the 3 Eye Finder Patterns with custom corner and center dot style
  const finderPositions = [
    { r: 0, c: 0 }, // top-left
    { r: 0, c: moduleCount - 7 }, // top-right
    { r: moduleCount - 7, c: 0 }, // bottom-left
  ];

  for (const pos of finderPositions) {
    const eyeX = offset + pos.c * blockSize;
    const eyeY = offset + pos.r * blockSize;
    const eyeSize = 7 * blockSize;

    drawFinderPattern(
      ctx,
      eyeX,
      eyeY,
      eyeSize,
      blockSize,
      options.eyeCornerStyle,
      options.eyeCenterStyle,
      eyeColor,
      options.transparentBg ? '#ffffff' : options.bgColor
    );
  }

  // 5. Draw Center Logo if provided
  if (options.logoUrl) {
    await drawCenterLogo(ctx, size, options.logoUrl, options.logoSize, options.logoPadding, options.bgColor);
  }
}

/**
 * Draw single data module according to dotStyle
 */
function drawModule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  style: DotStyle,
  color: string
) {
  ctx.fillStyle = color;

  switch (style) {
    case 'dots': {
      const radius = size * 0.44;
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, radius, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'rounded': {
      const r = size * 0.38;
      roundRect(ctx, x + 0.5, y + 0.5, size - 1, size - 1, r);
      ctx.fill();
      break;
    }
    case 'squircle': {
      const r = size * 0.22;
      roundRect(ctx, x, y, size, size, r);
      ctx.fill();
      break;
    }
    case 'square':
    default: {
      ctx.fillRect(x, y, size, size);
      break;
    }
  }
}

/**
 * Draw 7x7 Finder Pattern with custom outer eye and inner pupil
 */
function drawFinderPattern(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  blockSize: number,
  cornerStyle: EyeCornerStyle,
  centerStyle: EyeCenterStyle,
  color: string,
  bgColor: string
) {
  ctx.save();

  // Outer frame: 7x7 blocks
  // Inner hollow: 5x5 blocks
  // Center pupil: 3x3 blocks

  // Draw outer ring
  ctx.fillStyle = color;
  if (cornerStyle === 'circle') {
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Hollow out inner 5x5
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, (5 * blockSize) / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (cornerStyle === 'rounded') {
    roundRect(ctx, x, y, size, size, blockSize * 1.8);
    ctx.fill();

    // Hollow out
    ctx.fillStyle = bgColor;
    roundRect(ctx, x + blockSize, y + blockSize, 5 * blockSize, 5 * blockSize, blockSize * 1.2);
    ctx.fill();
  } else if (cornerStyle === 'leaf') {
    // Top-left and bottom-right rounded, others sharp
    leafRect(ctx, x, y, size, size, blockSize * 2.2);
    ctx.fill();

    // Hollow out
    ctx.fillStyle = bgColor;
    leafRect(ctx, x + blockSize, y + blockSize, 5 * blockSize, 5 * blockSize, blockSize * 1.4);
    ctx.fill();
  } else {
    // Square
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = bgColor;
    ctx.fillRect(x + blockSize, y + blockSize, 5 * blockSize, 5 * blockSize);
  }

  // Draw Center Pupil: 3x3 at offset (2*blockSize, 2*blockSize)
  const pupilX = x + 2 * blockSize;
  const pupilY = y + 2 * blockSize;
  const pupilSize = 3 * blockSize;

  ctx.fillStyle = color;
  if (centerStyle === 'circle') {
    ctx.beginPath();
    ctx.arc(pupilX + pupilSize / 2, pupilY + pupilSize / 2, pupilSize / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (centerStyle === 'diamond') {
    ctx.beginPath();
    ctx.moveTo(pupilX + pupilSize / 2, pupilY);
    ctx.lineTo(pupilX + pupilSize, pupilY + pupilSize / 2);
    ctx.lineTo(pupilX + pupilSize / 2, pupilY + pupilSize);
    ctx.lineTo(pupilX, pupilY + pupilSize / 2);
    ctx.closePath();
    ctx.fill();
  } else {
    // Square pupil (slightly rounded if cornerStyle is rounded)
    const pr = cornerStyle === 'rounded' || cornerStyle === 'circle' ? blockSize * 0.7 : 0;
    if (pr > 0) {
      roundRect(ctx, pupilX, pupilY, pupilSize, pupilSize, pr);
      ctx.fill();
    } else {
      ctx.fillRect(pupilX, pupilY, pupilSize, pupilSize);
    }
  }

  ctx.restore();
}

/**
 * Loads image and renders it centered on canvas
 */
function drawCenterLogo(
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  logoUrl: string,
  logoPercent: number,
  withPadding: boolean,
  bgColor: string
): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const logoW = (logoPercent / 100) * canvasSize;
      const logoH = logoW * (img.height / img.width);
      const x = (canvasSize - logoW) / 2;
      const y = (canvasSize - logoH) / 2;

      ctx.save();

      // Draw background badge / cushion so dark QR dots don't bleed into logo
      if (withPadding) {
        const padding = Math.max(6, logoW * 0.12);
        const padX = x - padding;
        const padY = y - padding;
        const padW = logoW + padding * 2;
        const padH = logoH + padding * 2;
        const r = Math.min(16, padW * 0.2);

        ctx.fillStyle = bgColor === '#ffffff' || !bgColor ? '#ffffff' : bgColor;
        ctx.shadowColor = 'rgba(0,0,0,0.15)';
        ctx.shadowBlur = 10;
        roundRect(ctx, padX, padY, padW, padH, r);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Clip logo if rounded
      ctx.drawImage(img, x, y, logoW, logoH);
      ctx.restore();
      resolve();
    };
    img.onerror = () => {
      resolve(); // ignore on error
    };
    img.src = logoUrl;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function leafRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w, y);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x, y + h);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/**
 * Generates standalone clean SVG string for vector downloads
 */
export function generateQRSVG(payload: string, options: QRDesignOptions): string {
  const ecLevel = options.logoUrl ? 'H' : options.errorCorrection;
  const qr = QRCode.create(payload, { errorCorrectionLevel: ecLevel });
  const moduleCount = qr.modules.size;
  const margin = Math.max(1, options.margin ?? 2);
  const total = moduleCount + margin * 2;
  const size = options.size || 512;
  const scale = size / total;

  const fg = options.fgColor || '#000000';
  const bg = options.transparentBg ? 'none' : options.bgColor || '#ffffff';

  let rects = '';
  for (let r = 0; r < moduleCount; r++) {
    for (let c = 0; c < moduleCount; c++) {
      if (qr.modules.get(r, c)) {
        const x = (c + margin) * scale;
        const y = (r + margin) * scale;
        rects += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${scale.toFixed(2)}" height="${scale.toFixed(2)}" fill="${fg}" />\n`;
      }
    }
  }

  const bgRect = options.transparentBg
    ? ''
    : `<rect width="${size}" height="${size}" fill="${bg}" />\n`;

  return `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  ${bgRect}
  ${rects}
</svg>`;
}

/**
 * Computes contrast ratio between fg and bg to guide user for optimal scannability
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 21; // fallback
  const l1 = relativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = relativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (brighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    };
  }
  if (clean.length === 6) {
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16),
    };
  }
  return null;
}

function relativeLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
