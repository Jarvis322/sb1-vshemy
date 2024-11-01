export interface VPNRegion {
  id: string;
  name: string;
  flag: string;
  currency: string;
  exchangeRate: number;
}

export interface PriceTier {
  [key: string]: number;
}

export interface RegionPrices {
  [region: string]: PriceTier;
}

export interface ServicePrices {
  [service: string]: RegionPrices;
}

export interface PriceComparison {
  region: VPNRegion;
  originalPrice: number;
  localPrice: number;
  savings: number;
  savingsPercentage: number;
}