import { VPNRegion, ServicePrices } from '../types/vpn';

export const vpnRegions: VPNRegion[] = [
  {
    id: 'tr',
    name: 'Türkiye',
    flag: '🇹🇷',
    currency: 'TRY',
    exchangeRate: 1
  },
  {
    id: 'ar',
    name: 'Arjantin',
    flag: '🇦🇷',
    currency: 'ARS',
    exchangeRate: 0.12
  },
  {
    id: 'in',
    name: 'Hindistan',
    flag: '🇮🇳',
    currency: 'INR',
    exchangeRate: 0.45
  },
  {
    id: 'br',
    name: 'Brezilya',
    flag: '🇧🇷',
    currency: 'BRL',
    exchangeRate: 0.65
  },
  {
    id: 'us',
    name: 'ABD',
    flag: '🇺🇸',
    currency: 'USD',
    exchangeRate: 31.5
  }
];

export const servicePrices: ServicePrices = {
  netflix: {
    tr: { basic: 149.99, standard: 229.99, premium: 299.99 },
    ar: { basic: 89.99, standard: 149.99, premium: 219.99 },
    in: { basic: 99.99, standard: 179.99, premium: 249.99 },
    br: { basic: 119.99, standard: 199.99, premium: 279.99 },
    us: { basic: 159.99, standard: 239.99, premium: 319.99 }
  },
  spotify: {
    tr: { individual: 59.99, student: 32.99, duo: 79.99, family: 99.99 },
    ar: { individual: 39.99, student: 19.99, duo: 59.99, family: 79.99 },
    in: { individual: 44.99, student: 24.99, duo: 64.99, family: 84.99 },
    br: { individual: 49.99, student: 29.99, duo: 69.99, family: 89.99 },
    us: { individual: 69.99, student: 39.99, duo: 89.99, family: 109.99 }
  }
};