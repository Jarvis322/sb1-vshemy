import { ReactNode } from 'react';

export type Category = {
  id: string;
  name: string;
  icon: ReactNode;
};

export type SubscriptionVariant = {
  id: string;
  name: string;
  price: number;
  description?: string;
};

export type Subscription = {
  id: number;
  name: string;
  price: number;
  yearlyPrice?: number;
  category: string;
  icon: ReactNode;
  color: string;
  description: string;
  variants?: SubscriptionVariant[];
  selectedVariantId?: string;
  isSelected?: boolean;
};