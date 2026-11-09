import React, { useRef } from 'react';
import { DotStyle, ErrorCorrectionLevel, EyeCenterStyle, EyeCornerStyle, QRDesignOptions } from '../../types/qr';
import {
  Palette,
  Sparkles,
  Image as ImageIcon,
  Sliders,
  Check,
  Upload,
  Trash2,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import { getContrastRatio } from '../../utils/qrRenderer';

interface CustomizationDrawerProps {
  options: QRDesignOptions;
  onChange: (options: QRDesignOptions) => void;
  onReset: () => void;
}

const COLOR_PRESETS = [
  { name: 'Classic Dark', fg: '#0F172A', bg: '#FFFFFF' },
  { name: 'Royal Blue', fg: '#1E40AF', bg: '#F8FAFC' },
  { name: 'Electric Navy', fg: '#2563EB', bg: '#FFFFFF' },
  { name: 'Cyber Teal', fg: '#0D9488', bg: '#F0FDFA' },
  { name: 'Emerald', fg: '#059669', bg: '#F0FDF4' },
  { name: 'Deep Purple', fg: '#7C3AED', bg: '#FAF5FF' },
  { name: 'Crimson', fg: '#DC2626', bg: '#FEF2F2' },
  { name: 'Dark Mode Invert', fg: '#F8FAFC', bg: '#0F172A' },
];

// Quick popular sample center logos user can pick if they don't have an image ready
const POPULAR_LOGOS = [
  { id: 'none', label: 'None', icon: null },
  {
    id: 'official-logo',
    label: 'Official Brand Logo',
    url: '/assets/aistudio/file_00000000b4448211a3c0611cc76f6121_fce29dfa.png',
  },
  {
    id: 'link',
    label: 'Link',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%232563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  },
  {
    id: 'wifi',
    label: 'Wi-Fi',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%232563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%23059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>',
  },
  {
    id: 'star',
    label: 'Star',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%23EAB308" stroke="%23CA8A04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  },
];

export const CustomizationDrawer: React.FC<CustomizationDrawerProps> = ({
  options,
  onChange,
  onReset,
}) => {
  const [activeTab, setActiveTab] = React.useState<'colors' | 'design' | 'logo' | 'export'>('colors');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contrast = getContrastRatio(options.fgColor, options.bgColor);
  const isLowContrast = contrast < 3.0;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        ...options,
        logoUrl: reader.result as string,
        // Auto boost error correction to High for guaranteed scanning!
        errorCorrection: 'H',
      });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    onChange({
      ...options,
      logoUrl: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5">
      {/* Studio Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'colors', label: 'Colors', icon: Palette },
            { id: 'design', label: 'Design & Shapes', icon: Sparkles },
            { id: 'logo', label: 'Center Logo', icon: ImageIcon },
            { id: 'export', label: 'Size & Specs', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-[11px] font-medium text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors pl-2"
        >
          Reset Defaults
        </button>
      </div>

      {/* Scannability Contrast Warning */}
      {isLowContrast && (
        <div className="mb-4 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>
            Low contrast detected ({contrast.toFixed(1)}:1). Smartphone cameras require high contrast between foreground and background to scan easily.
          </span>
        </div>
      )}

      {/* TAB 1: COLORS */}
      {activeTab === 'colors' && (
        <div className="space-y-4">
          {/* Preset Color Themes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Color Presets
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COLOR_PRESETS.map((preset) => {
                const isCurrent =
                  options.fgColor.toLowerCase() === preset.fg.toLowerCase() &&
                  options.bgColor.toLowerCase() === preset.bg.toLowerCase();
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...options,
                        fgColor: preset.fg,
                        bgColor: preset.bg,
                        transparentBg: false,
                      })
                    }
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left text-xs transition-all ${
                      isCurrent
                        ? 'border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/50 dark:bg-blue-950/40'
                        : 'border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex -space-x-1 shrink-0">
                      <div
                        className="w-4 h-4 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: preset.fg }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                        style={{ backgroundColor: preset.bg }}
                      />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                      {preset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Foreground & Background Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Foreground Color (QR Modules)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={options.fgColor}
                  onChange={(e) => onChange({ ...options, fgColor: e.target.value })}
                  className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer p-0.5 bg-transparent"
                />
                <input
                  type="text"
                  value={options.fgColor}
                  onChange={(e) => onChange({ ...options, fgColor: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Background Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  disabled={options.transparentBg}
                  value={options.bgColor}
                  onChange={(e) => onChange({ ...options, bgColor: e.target.value })}
                  className={`w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer p-0.5 bg-transparent ${
                    options.transparentBg ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                />
                <input
                  type="text"
                  disabled={options.transparentBg}
                  value={options.transparentBg ? 'Transparent' : options.bgColor}
                  onChange={(e) => onChange({ ...options, bgColor: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Transparent Background Toggle */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="transparentBg"
              checked={options.transparentBg}
              onChange={(e) => onChange({ ...options, transparentBg: e.target.checked })}
              className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="transparentBg" className="text-xs text-slate-700 dark:text-slate-300 select-none">
              Transparent Background (Ideal for PNG overlays on colored packaging)
            </label>
          </div>
        </div>
      )}

      {/* TAB 2: DESIGN & SHAPES */}
      {activeTab === 'design' && (
        <div className="space-y-4">
          {/* Module Body Dots Style */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Body Pattern Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'square', label: 'Crisp Square', desc: 'Standard sharp' },
                { id: 'rounded', label: 'Smooth Rounded', desc: 'Soft corners' },
                { id: 'dots', label: 'Modern Dots', desc: 'Circular dots' },
                { id: 'squircle', label: 'Squircle', desc: 'Subtle curve' },
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => onChange({ ...options, dotStyle: style.id as DotStyle })}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    options.dotStyle === style.id
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/50 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-800 dark:text-white">
                    {style.label}
                  </div>
                  <div className="text-[10px] text-slate-500">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Corner Eyes Outer Style */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Corner Eye Outer Frame
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'square', label: 'Classic Square' },
                { id: 'rounded', label: 'Rounded Edge' },
                { id: 'circle', label: 'Smooth Circle' },
                { id: 'leaf', label: 'Leaf / Organic' },
              ].map((eye) => (
                <button
                  key={eye.id}
                  type="button"
                  onClick={() => onChange({ ...options, eyeCornerStyle: eye.id as EyeCornerStyle })}
                  className={`p-2 rounded-xl border text-center text-xs font-medium transition-all ${
                    options.eyeCornerStyle === eye.id
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {eye.label}
                </button>
              ))}
            </div>
          </div>

          {/* Eye Center Pupil Style */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Corner Eye Pupil (Center Dot)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'square', label: 'Square Dot' },
                { id: 'circle', label: 'Round Dot' },
                { id: 'diamond', label: 'Diamond' },
              ].map((pupil) => (
                <button
                  key={pupil.id}
                  type="button"
                  onClick={() => onChange({ ...options, eyeCenterStyle: pupil.id as EyeCenterStyle })}
                  className={`p-2 rounded-xl border text-center text-xs font-medium transition-all ${
                    options.eyeCenterStyle === pupil.id
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {pupil.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CENTER LOGO */}
      {activeTab === 'logo' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Upload Your Brand Logo or Icon
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
                onChange={handleLogoUpload}
                className="hidden"
                id="logoFileInput"
              />
              <label
                htmlFor="logoFileInput"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-blue-400 dark:border-blue-600 bg-blue-50/40 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 text-xs font-semibold cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Custom Logo (PNG / SVG)</span>
              </label>

              {options.logoUrl && (
                <button
                  type="button"
                  onClick={removeLogo}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 text-xs font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove Logo</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Preset Icons */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Or Choose a Quick Icon:
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_LOGOS.map((pl) => (
                <button
                  key={pl.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...options,
                      logoUrl: pl.url || null,
                      errorCorrection: pl.url ? 'H' : options.errorCorrection,
                    })
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    options.logoUrl === pl.url
                      ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {pl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Logo Size and Padding options if logo is present */}
          {options.logoUrl && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Logo Size</span>
                  <span>{options.logoSize}%</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="28"
                  value={options.logoSize}
                  onChange={(e) => onChange({ ...options, logoSize: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Safe range: 14% to 28% ensures high scannability without obscuring error correction blocks.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="logoPadding"
                  checked={options.logoPadding}
                  onChange={(e) => onChange({ ...options, logoPadding: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <label htmlFor="logoPadding" className="text-xs text-slate-700 dark:text-slate-300 select-none">
                  Protective White Badge (Prevents dark QR dots from touching logo border)
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: EXPORT SIZE & TECHNICAL SPECS */}
      {activeTab === 'export' && (
        <div className="space-y-4">
          {/* Resolution / Image Size */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Export Resolution
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { size: 256, label: '256 × 256', desc: 'Web / Email' },
                { size: 512, label: '512 × 512', desc: 'Standard HD' },
                { size: 1024, label: '1024 × 1024', desc: 'Flyers & Menus' },
                { size: 2048, label: '2048 × 2048', desc: 'Billboards / Ultra' },
              ].map((res) => (
                <button
                  key={res.size}
                  type="button"
                  onClick={() => onChange({ ...options, size: res.size })}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    options.size === res.size
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/50 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-800 dark:text-white">
                    {res.label}
                  </div>
                  <div className="text-[10px] text-slate-500">{res.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Error Correction Level */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Error Correction Level
              </label>
              {options.logoUrl && (
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Locked to H for Center Logo
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { level: 'L', label: 'Low (7%)', desc: 'Cleanest code' },
                { level: 'M', label: 'Medium (15%)', desc: 'Standard' },
                { level: 'Q', label: 'Quartile (25%)', desc: 'High durability' },
                { level: 'H', label: 'High (30%)', desc: 'Best for logo/print' },
              ].map((ec) => (
                <button
                  key={ec.level}
                  type="button"
                  disabled={Boolean(options.logoUrl && ec.level !== 'H')}
                  onClick={() => onChange({ ...options, errorCorrection: ec.level as ErrorCorrectionLevel })}
                  className={`p-2 rounded-xl border text-left text-xs transition-all ${
                    options.errorCorrection === ec.level
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 dark:border-blue-500 text-blue-700 dark:text-blue-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 disabled:opacity-40'
                  }`}
                >
                  <div className="font-semibold">{ec.label}</div>
                  <div className="text-[9px] text-slate-400">{ec.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quiet Zone Margin */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Quiet Zone / Padding Margin</span>
              <span>{options.margin} blocks</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={options.margin}
              onChange={(e) => onChange({ ...options, margin: Number(e.target.value) })}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400 mt-0.5">
              Standard 2-3 blocks margin prevents outer shadows or borders from confusing barcode scanners.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
