import { addMonths, subDays, isSameDay } from 'date-fns';
import { UserSubscription } from '../types/user';
import { subscriptions } from '../data/subscriptions';

export function checkRenewalNotifications(userSubscriptions: UserSubscription[]): UserSubscription[] {
  const today = new Date();
  return userSubscriptions.filter(subscription => {
    const startDate = new Date(subscription.startDate);
    const nextRenewalDate = addMonths(startDate, 1); // Varsayılan olarak aylık yenileme
    const notificationDate = subDays(nextRenewalDate, 3); // 3 gün önce bildirim
    
    return isSameDay(today, notificationDate);
  });
}