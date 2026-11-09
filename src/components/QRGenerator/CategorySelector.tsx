import React from 'react';
import { QRCategory } from '../../types/qr';
import {
  Link as LinkIcon,
  FileText,
  Wifi,
  Phone,
  MessageSquare,
  Mail,
  MessageCircle,
  Contact,
  MapPin,
  Share2,
  Calendar,
  Coins,
} from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: QRCategory;
  onSelectCategory: (category: QRCategory) => void;
}

interface CategoryItem {
  id: QRCategory;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description: string;
}

export const QR_CATEGORIES: CategoryItem[] = [
  {
    id: 'url',
    name: 'Website URL',
    icon: LinkIcon,
    badge: 'Popular',
    description: 'Link to any website or landing page',
  },
  {
    id: 'wifi',
    name: 'Wi-Fi Network',
    icon: Wifi,
    badge: 'Instant',
    description: 'Connect to Wi-Fi without typing passwords',
  },
  {
    id: 'vcard',
    name: 'vCard Contact',
    icon: Contact,
    badge: 'Business',
    description: 'Save contact details directly to smartphone',
  },
  {
    id: 'text',
    name: 'Plain Text',
    icon: FileText,
    description: 'Display simple text notes or messages',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageCircle,
    badge: 'Direct',
    description: 'Open a chat with prefilled text',
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    description: 'Compose an email with subject & body',
  },
  {
    id: 'phone',
    name: 'Phone Call',
    icon: Phone,
    description: 'Directly dial a phone number',
  },
  {
    id: 'sms',
    name: 'SMS Message',
    icon: MessageSquare,
    description: 'Send text message with pre-written text',
  },
  {
    id: 'location',
    name: 'Google Maps',
    icon: MapPin,
    description: 'Open location coordinates or address',
  },
  {
    id: 'social',
    name: 'Social Media',
    icon: Share2,
    description: 'Instagram, YouTube, TikTok, LinkedIn & more',
  },
  {
    id: 'event',
    name: 'Calendar Event',
    icon: Calendar,
    description: 'Add event with date, time & location',
  },
  {
    id: 'crypto',
    name: 'Crypto / Pay',
    icon: Coins,
    description: 'Bitcoin, Ethereum, Solana & wallet address',
  },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
          Step 1: Choose QR Code Type
        </label>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          12 Scannable Types
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {QR_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`relative flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-blue-50/90 dark:bg-blue-950/70 border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                  : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat.badge && (
                <span
                  className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {cat.badge}
                </span>
              )}

              <div
                className={`p-2 rounded-lg mb-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
                {cat.name}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {cat.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
