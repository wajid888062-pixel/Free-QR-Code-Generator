export type QRCategory =
  | 'url'
  | 'text'
  | 'wifi'
  | 'phone'
  | 'sms'
  | 'email'
  | 'whatsapp'
  | 'vcard'
  | 'location'
  | 'social'
  | 'event'
  | 'crypto';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type DotStyle = 'square' | 'rounded' | 'dots' | 'squircle';
export type EyeCornerStyle = 'square' | 'rounded' | 'circle' | 'leaf';
export type EyeCenterStyle = 'square' | 'circle' | 'diamond';

export interface QRDesignOptions {
  fgColor: string;
  bgColor: string;
  transparentBg: boolean;
  dotStyle: DotStyle;
  eyeCornerStyle: EyeCornerStyle;
  eyeCenterStyle: EyeCenterStyle;
  eyeColor?: string; // Optional custom color for eye corners
  errorCorrection: ErrorCorrectionLevel;
  size: number; // in pixels, e.g. 256, 512, 1024, 2048
  margin: number; // Quiet zone blocks (1-5)
  // Center logo options
  logoUrl: string | null;
  logoSize: number; // percentage of QR size, e.g. 20 (20%)
  logoPadding: boolean; // draw white background behind logo
}

export interface QRHistoryItem {
  id: string;
  timestamp: number;
  category: QRCategory;
  title: string;
  encodedData: string;
  previewDataUrl: string;
  options: QRDesignOptions;
}

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface EventData {
  title: string;
  location: string;
  startDate: string; // YYYY-MM-DDTHH:mm
  endDate: string;
  description: string;
}

export interface SocialData {
  platform: 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'linkedin' | 'x' | 'pinterest' | 'github' | 'telegram';
  usernameOrUrl: string;
}

export interface CryptoData {
  coin: 'BTC' | 'ETH' | 'SOL' | 'USDT';
  address: string;
  amount: string;
}

export interface LocationData {
  query: string;
  latitude: string;
  longitude: string;
  mode: 'query' | 'coordinates';
}
