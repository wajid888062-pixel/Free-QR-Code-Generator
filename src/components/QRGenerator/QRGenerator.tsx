import React, { useState } from 'react';
import { QRCategory, QRDesignOptions, QRHistoryItem } from '../../types/qr';
import { CategorySelector } from './CategorySelector';
import { CategoryForm } from './CategoryForm';
import { QRPreview } from './QRPreview';
import { CustomizationDrawer } from './CustomizationDrawer';
import { encodeQRData } from '../../utils/qrEncoder';
import { Sparkles, CheckCircle2, History } from 'lucide-react';

interface QRGeneratorProps {
  initialCategory?: QRCategory;
  onOpenHistory: () => void;
  historyCount: number;
  onAddToHistory: (item: QRHistoryItem) => void;
}

const DEFAULT_OPTIONS: QRDesignOptions = {
  fgColor: '#0F172A',
  bgColor: '#FFFFFF',
  transparentBg: false,
  dotStyle: 'square',
  eyeCornerStyle: 'square',
  eyeCenterStyle: 'square',
  errorCorrection: 'M',
  size: 512,
  margin: 2,
  logoUrl: null,
  logoSize: 22,
  logoPadding: true,
};

export const QRGenerator: React.FC<QRGeneratorProps> = ({
  initialCategory = 'url',
  onOpenHistory,
  historyCount,
  onAddToHistory,
}) => {
  const [category, setCategory] = useState<QRCategory>(initialCategory);
  const [formData, setFormData] = useState<Record<string, any>>({
    url: 'https://google.com',
  });
  const [options, setOptions] = useState<QRDesignOptions>(DEFAULT_OPTIONS);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [generatedFlash, setGeneratedFlash] = useState(false);

  // Compute live payload and title based on current form
  const { payload, title } = encodeQRData(category, formData);

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCategoryChange = (newCat: QRCategory) => {
    setCategory(newCat);
    // Provide sensible default inputs for seamless beginner experience
    if (newCat === 'url' && !formData.url) {
      setFormData((prev) => ({ ...prev, url: 'https://google.com' }));
    } else if (newCat === 'wifi' && !formData.ssid) {
      setFormData((prev) => ({
        ...prev,
        ssid: 'MyHome_WiFi',
        password: 'SecurePassword123',
        encryption: 'WPA',
        hidden: false,
      }));
    } else if (newCat === 'whatsapp' && !formData.phoneNumber) {
      setFormData((prev) => ({
        ...prev,
        countryCode: '1',
        phoneNumber: '5550199',
        message: 'Hello! I scanned your QR code.',
      }));
    } else if (newCat === 'vcard' && !formData.firstName) {
      setFormData((prev) => ({
        ...prev,
        firstName: 'Alex',
        lastName: 'Morgan',
        organization: 'Innovate Studio',
        jobTitle: 'Founder',
        phone: '+1 555-0144',
        email: 'alex@innovate.com',
        website: 'https://innovate.com',
      }));
    }
  };

  const handleClear = () => {
    setFormData({});
  };

  const handleGenerateClick = () => {
    setGeneratedFlash(true);
    setTimeout(() => setGeneratedFlash(false), 800);
  };

  const handleSaveToHistory = (previewDataUrl: string) => {
    onAddToHistory({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      category,
      title: title || 'QR Code',
      encodedData: payload,
      previewDataUrl,
      options,
    });
  };

  return (
    <section id="generator" className="py-12 sm:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>5-Step Intuitive Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Advanced QR Code Generator
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Select a format, enter your details, customize colors and logo, and download your high-resolution QR code instantly.
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Categories & Inputs Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 sm:p-7 space-y-6">
              {/* Step 1: Category Selector */}
              <CategorySelector
                selectedCategory={category}
                onSelectCategory={handleCategoryChange}
              />

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* Step 2: Category Form */}
              <CategoryForm
                category={category}
                formData={formData}
                onChange={handleFieldChange}
                onClear={handleClear}
              />

              {/* Step 3: Explicit Generate Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGenerateClick}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  {generatedFlash ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>QR Code Updated!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Step 3: Generate QR Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Customization Drawer (Accordion or Toggleable) */}
            {showCustomizer && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-200">
                <CustomizationDrawer
                  options={options}
                  onChange={setOptions}
                  onReset={() => setOptions(DEFAULT_OPTIONS)}
                />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Live QR Code Preview, Formats & Download */}
          <div className="lg:col-span-5">
            <QRPreview
              payload={payload}
              title={title}
              category={category}
              options={options}
              showCustomizer={showCustomizer}
              onToggleCustomizer={() => setShowCustomizer(!showCustomizer)}
              onResetOptions={() => setOptions(DEFAULT_OPTIONS)}
              onSaveToHistory={handleSaveToHistory}
            />

            {/* Quick Helper Banner */}
            <div className="mt-4 p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300">
                <History className="w-4 h-4 text-blue-600" />
                <span>Codes are saved in your local history</span>
              </div>
              <button
                type="button"
                onClick={onOpenHistory}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View History ({historyCount})
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
