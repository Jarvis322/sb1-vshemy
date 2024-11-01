import { create } from 'zustand';
import { UserSubscription } from '../types/user';
import { supabase, simulateApiDelay, handleApiError, TEST_USER } from '../lib/supabase';
import { checkRenewalNotifications } from '../utils/notifications';
import { subscriptions } from '../data/subscriptions';
import toast from 'react-hot-toast';

interface SubscriptionState {
  userSubscriptions: UserSubscription[];
  loading: boolean;
  error: string | null;
  addSubscription: (subscription: Omit<UserSubscription, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  removeSubscription: (id: string) => Promise<void>;
  fetchUserSubscriptions: (userId: string) => Promise<void>;
  checkNotifications: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  userSubscriptions: [],
  loading: false,
  error: null,

  addSubscription: async (subscription) => {
    set({ loading: true, error: null });
    try {
      // For demo/test user, simulate API call
      if (subscription.userId === TEST_USER.id) {
        await simulateApiDelay();
        const newSubscription = {
          ...subscription,
          id: `test-sub-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        set(state => ({
          userSubscriptions: [...state.userSubscriptions, newSubscription],
          error: null
        }));
        
        toast.success('Abonelik başarıyla eklendi');
        return;
      }

      const { data, error } = await supabase
        .from('user_subscriptions')
        .insert([subscription])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        userSubscriptions: [...state.userSubscriptions, data],
        error: null
      }));

      toast.success('Abonelik başarıyla eklendi');
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  removeSubscription: async (id) => {
    set({ loading: true, error: null });
    try {
      // For demo/test user, simulate API call
      if (get().userSubscriptions.find(sub => sub.userId === TEST_USER.id)) {
        await simulateApiDelay();
        set(state => ({
          userSubscriptions: state.userSubscriptions.filter(sub => sub.id !== id),
          error: null
        }));
        
        toast.success('Abonelik başarıyla silindi');
        return;
      }

      const { error } = await supabase
        .from('user_subscriptions')
        .delete()
        .match({ id });

      if (error) throw error;

      set(state => ({
        userSubscriptions: state.userSubscriptions.filter(sub => sub.id !== id),
        error: null
      }));

      toast.success('Abonelik başarıyla silindi');
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  fetchUserSubscriptions: async (userId) => {
    set({ loading: true, error: null });
    try {
      // For demo/test user, return mock data
      if (userId === TEST_USER.id) {
        await simulateApiDelay();
        set({ 
          userSubscriptions: TEST_USER.userSubscriptions,
          error: null
        });
        return;
      }

      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('userId', userId);

      if (error) throw error;

      set({ 
        userSubscriptions: data || [],
        error: null
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({ error: errorMessage });
      console.error('Abonelik yükleme hatası:', error);
      toast.error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  checkNotifications: () => {
    const { userSubscriptions } = get();
    const renewalNotifications = checkRenewalNotifications(userSubscriptions);
    
    renewalNotifications.forEach(subscription => {
      const sub = subscriptions.find(s => s.id === subscription.subscriptionId);
      if (sub) {
        toast(
          `${sub.name} aboneliğiniz 3 gün içinde yenilenecek.${
            subscription.cardLastFour ? ` (Kart: *${subscription.cardLastFour})` : ''
          }`,
          {
            duration: 5000,
            icon: '🔔',
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }
        );
      }
    });
  },
}));