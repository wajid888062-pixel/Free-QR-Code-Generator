import {
  CryptoData,
  EventData,
  LocationData,
  QRCategory,
  SocialData,
  VCardData,
  WifiData,
} from '../types/qr';

/**
 * Encodes category inputs into standard smartphone-scannable QR payloads
 */
export function encodeQRData(
  category: QRCategory,
  data: Record<string, any>
): { payload: string; title: string } {
  switch (category) {
    case 'url': {
      let rawUrl = (data.url || '').trim();
      if (!rawUrl) return { payload: 'https://example.com', title: 'Example Website' };
      if (!/^https?:\/\//i.test(rawUrl)) {
        rawUrl = 'https://' + rawUrl;
      }
      return { payload: rawUrl, title: rawUrl.replace(/^https?:\/\//i, '') };
    }

    case 'text': {
      const text = (data.text || '').trim();
      return {
        payload: text || 'Welcome to QRcraft Studio!',
        title: text ? (text.length > 30 ? text.slice(0, 30) + '...' : text) : 'Text Message',
      };
    }

    case 'wifi': {
      const wifi: WifiData = data as WifiData;
      const ssid = (wifi.ssid || '').trim();
      const pass = wifi.password || '';
      const enc = wifi.encryption || 'WPA';
      const hidden = wifi.hidden ? 'true' : 'false';
      // Format: WIFI:T:WPA;S:MyNetwork;P:MyPassword;H:false;;
      // Escape special characters in SSID and password: \ ; , :
      const escapeWifi = (str: string) => str.replace(/([\\;,:"'])/g, '\\$1');
      const payload = `WIFI:T:${enc};S:${escapeWifi(ssid)};${enc !== 'nopass' ? `P:${escapeWifi(pass)};` : ''}H:${hidden};;`;
      return {
        payload,
        title: ssid ? `Wi-Fi: ${ssid}` : 'Wi-Fi Network',
      };
    }

    case 'phone': {
      const country = (data.countryCode || '+1').trim();
      const number = (data.phoneNumber || '').trim().replace(/[^0-9]/g, '');
      const full = country + number;
      return {
        payload: `tel:${full}`,
        title: `Call: ${country} ${number}`,
      };
    }

    case 'sms': {
      const country = (data.countryCode || '+1').trim();
      const number = (data.phoneNumber || '').trim().replace(/[^0-9]/g, '');
      const message = (data.message || '').trim();
      const full = country + number;
      // smsto format: smsto:+123456789:Hello
      return {
        payload: `smsto:${full}:${message}`,
        title: `SMS to ${country} ${number}`,
      };
    }

    case 'email': {
      const email = (data.email || '').trim();
      const subject = encodeURIComponent(data.subject || '');
      const body = encodeURIComponent(data.body || '');
      const params: string[] = [];
      if (subject) params.push(`subject=${subject}`);
      if (body) params.push(`body=${body}`);
      const query = params.length > 0 ? `?${params.join('&')}` : '';
      return {
        payload: `mailto:${email}${query}`,
        title: email ? `Email: ${email}` : 'Send Email',
      };
    }

    case 'whatsapp': {
      const country = (data.countryCode || '1').trim().replace(/[^0-9]/g, '');
      const number = (data.phoneNumber || '').trim().replace(/[^0-9]/g, '');
      const text = encodeURIComponent(data.message || '');
      const full = country + number;
      const payload = `https://wa.me/${full}${text ? `?text=${text}` : ''}`;
      return {
        payload,
        title: `WhatsApp: +${full}`,
      };
    }

    case 'vcard': {
      const v: VCardData = data as VCardData;
      const firstName = (v.firstName || '').trim();
      const lastName = (v.lastName || '').trim();
      const fullName = `${firstName} ${lastName}`.trim() || 'Contact Card';
      
      const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName};${firstName};;;`,
        `FN:${fullName}`,
        v.organization ? `ORG:${v.organization.trim()}` : '',
        v.jobTitle ? `TITLE:${v.jobTitle.trim()}` : '',
        v.phone ? `TEL;TYPE=CELL:${v.phone.trim()}` : '',
        v.email ? `EMAIL:${v.email.trim()}` : '',
        v.website ? `URL:${v.website.trim().startsWith('http') ? v.website.trim() : 'https://' + v.website.trim()}` : '',
        (v.street || v.city || v.country) ? `ADR;TYPE=WORK:;;${v.street || ''};${v.city || ''};${v.state || ''};${v.zip || ''};${v.country || ''}` : '',
        'END:VCARD'
      ].filter(Boolean).join('\n');

      return {
        payload: vcard,
        title: `vCard: ${fullName}`,
      };
    }

    case 'location': {
      const loc: LocationData = data as LocationData;
      if (loc.mode === 'coordinates' && loc.latitude && loc.longitude) {
        const lat = loc.latitude.trim();
        const lng = loc.longitude.trim();
        return {
          payload: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
          title: `Location: ${lat}, ${lng}`,
        };
      } else {
        const query = (loc.query || '').trim() || 'Times Square, New York';
        return {
          payload: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
          title: `Map: ${query}`,
        };
      }
    }

    case 'social': {
      const s: SocialData = data as SocialData;
      const platform = s.platform || 'instagram';
      let input = (s.usernameOrUrl || '').trim();
      
      // If full url provided, use it
      if (/^https?:\/\//i.test(input)) {
        return { payload: input, title: `${platform.toUpperCase()}: ${input}` };
      }

      // Strip leading @
      input = input.replace(/^@/, '');

      let url = '';
      switch (platform) {
        case 'instagram':
          url = `https://instagram.com/${input || 'explore'}`;
          break;
        case 'facebook':
          url = `https://facebook.com/${input || ''}`;
          break;
        case 'youtube':
          url = input.startsWith('UC') || input.startsWith('@')
            ? `https://youtube.com/${input}`
            : `https://youtube.com/@${input || ''}`;
          break;
        case 'tiktok':
          url = `https://tiktok.com/@${input || ''}`;
          break;
        case 'linkedin':
          url = `https://linkedin.com/in/${input || ''}`;
          break;
        case 'x':
          url = `https://x.com/${input || ''}`;
          break;
        case 'pinterest':
          url = `https://pinterest.com/${input || ''}`;
          break;
        case 'github':
          url = `https://github.com/${input || ''}`;
          break;
        case 'telegram':
          url = `https://t.me/${input || ''}`;
          break;
      }

      return {
        payload: url,
        title: `${platform.charAt(0).toUpperCase() + platform.slice(1)}: @${input}`,
      };
    }

    case 'event': {
      const ev: EventData = data as EventData;
      const title = (ev.title || '').trim() || 'New Event';
      const loc = (ev.location || '').trim();
      const desc = (ev.description || '').trim();
      
      const formatIcalDate = (dtStr: string) => {
        if (!dtStr) return '';
        const d = new Date(dtStr);
        if (isNaN(d.getTime())) return '';
        return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      const start = formatIcalDate(ev.startDate) || '20261108T180000Z';
      const end = formatIcalDate(ev.endDate) || '20261108T200000Z';

      const ical = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        loc ? `LOCATION:${loc}` : '',
        `DTSTART:${start}`,
        `DTEND:${end}`,
        desc ? `DESCRIPTION:${desc}` : '',
        'END:VEVENT',
        'END:VCALENDAR'
      ].filter(Boolean).join('\n');

      return {
        payload: ical,
        title: `Calendar Event: ${title}`,
      };
    }

    case 'crypto': {
      const c: CryptoData = data as CryptoData;
      const coin = c.coin || 'BTC';
      const addr = (c.address || '').trim() || '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
      const amt = (c.amount || '').trim();

      let payload = '';
      switch (coin) {
        case 'BTC':
          payload = `bitcoin:${addr}${amt ? `?amount=${amt}` : ''}`;
          break;
        case 'ETH':
          payload = `ethereum:${addr}${amt ? `?value=${amt}` : ''}`;
          break;
        case 'SOL':
          payload = `solana:${addr}${amt ? `?amount=${amt}` : ''}`;
          break;
        case 'USDT':
          payload = `ethereum:${addr}?contractAddress=0xdac17f958d2ee523a2206206994597c13d831ec7${amt ? `&amount=${amt}` : ''}`;
          break;
      }
      return {
        payload,
        title: `${coin} Wallet: ${addr.slice(0, 8)}...`,
      };
    }

    default:
      return { payload: 'https://example.com', title: 'Website' };
  }
}
