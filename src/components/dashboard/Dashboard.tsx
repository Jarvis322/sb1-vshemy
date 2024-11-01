import React, { useState, useEffect } from 'react';
import { Plus, Brain, Sparkles } from 'lucide-react';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { useAuthStore } from '../../store/authStore';
import { SubscriptionBrowser } from './SubscriptionBrowser';
import { MoodTest } from '../recommendation/MoodTest';
import { LuckyPicker } from '../recommendation/LuckyPicker';
import { SubscriptionAnalytics } from './SubscriptionAnalytics';
import { SubscriptionCard } from '../SubscriptionCard';
import { subscriptions } from '../../data/subscriptions';
import toast from 'react-hot-toast';

export function Dashboard() {
  const [showBrowser, setShowBrowser] = useState(false);
  const [showMoodTest, setShowMoodTest] = useState(false);
  const [showLuckyPick, setShowLuckyPick] = useState(false);
  const { userSubscriptions, fetchUserSubscriptions, removeSubscription, error } = useSubscriptionStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      fetchUserSubscriptions(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDeleteSubscription = async (id: string) => {
    try {
      await removeSubscription(id);
    } catch (error) {
      console.error('Abonelik silme hatası:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 w-full sm:w-auto">
        <button
          onClick={() => setShowBrowser(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Abonelik Ekle</span>
        </button>

        <button
          onClick={() => setShowMoodTest(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 transition-colors border border-pink-500/30"
        >
          <Brain className="w-4 h-4" />
          <span>Ne İzleyelim?</span>
        </button>

        <button
          onClick={() => setShowLuckyPick(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 transition-colors border border-yellow-500/30"
        >
          <Sparkles className="w-4 h-4" />
          <span>Şans Topu</span>
        </button>
      </div>

      {userSubscriptions.length > 0 && (
        <>
          <SubscriptionAnalytics userSubscriptions={userSubscriptions} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {userSubscriptions.map((userSub) => {
              const subscription = subscriptions.find(s => s.id === userSub.subscriptionId);
              if (!subscription) return null;

              return (
                <SubscriptionCard
                  key={userSub.id}
                  subscription={{
                    ...subscription,
                    selectedVariantId: userSub.variantId
                  }}
                  showDelete
                  onDelete={() => handleDeleteSubscription(userSub.id)}
                  onVariantChange={() => {}}
                  onToggleSelect={() => {}}
                />
              );
            })}
          </div>
        </>
      )}

      {showBrowser && (
        <SubscriptionBrowser
          isOpen={showBrowser}
          onClose={() => setShowBrowser(false)}
        />
      )}

      {showMoodTest && (
        <MoodTest
          isOpen={showMoodTest}
          onClose={() => setShowMoodTest(false)}
        />
      )}

      {showLuckyPick && (
        <LuckyPicker
          isOpen={showLuckyPick}
          onClose={() => setShowLuckyPick(false)}
        />
      )}
    </div>
  );
}