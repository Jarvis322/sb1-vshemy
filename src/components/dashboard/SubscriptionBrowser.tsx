import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { CategoryFilter } from '../CategoryFilter';
import { SubscriptionCard } from '../SubscriptionCard';
import { subscriptions } from '../../data/subscriptions';
import { useAuthStore } from '../../store/authStore';
import { AddSubscriptionModal } from '../subscription/AddSubscriptionModal';
import { Subscription } from '../../types/subscription';

interface SubscriptionBrowserProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionBrowser({ isOpen, onClose }: SubscriptionBrowserProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const { user } = useAuthStore();

  const filteredSubscriptions = activeCategory === 'all'
    ? subscriptions
    : subscriptions.filter(sub => sub.category === activeCategory);

  const handleVariantChange = (subscriptionId: number, variantId: string) => {
    setSelectedSubscription(prev => {
      if (prev?.id === subscriptionId) {
        return { ...prev, selectedVariantId: variantId };
      }
      const subscription = subscriptions.find(s => s.id === subscriptionId);
      return subscription ? { ...subscription, selectedVariantId: variantId } : null;
    });
  };

  const handleToggleSelect = (subscriptionId: number) => {
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    if (!subscription) return;

    if (subscription.variants && !subscription.selectedVariantId) {
      // Variant seçilmemişse uyarı göster
      return;
    }

    setSelectedSubscription(subscription);
    setShowAddModal(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Abonelik Ekle</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredSubscriptions.map(subscription => (
              <SubscriptionCard
                key={subscription.id}
                subscription={{
                  ...subscription,
                  selectedVariantId: selectedSubscription?.id === subscription.id 
                    ? selectedSubscription.selectedVariantId 
                    : undefined,
                  isSelected: selectedSubscription?.id === subscription.id
                }}
                onVariantChange={handleVariantChange}
                onToggleSelect={handleToggleSelect}
              />
            ))}
          </div>
        </div>
      </div>

      {showAddModal && selectedSubscription && user && (
        <AddSubscriptionModal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setSelectedSubscription(null);
            onClose();
          }}
          subscription={selectedSubscription}
          userId={user.id}
        />
      )}
    </div>
  );
}