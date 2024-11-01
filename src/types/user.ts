export interface UserSubscription {
  id: string;
  subscriptionId: number;
  userId: string;
  startDate: string;
  variantId?: string;
  cardLastFour?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  userSubscriptions?: UserSubscription[];
}