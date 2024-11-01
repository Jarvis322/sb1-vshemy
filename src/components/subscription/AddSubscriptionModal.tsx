import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { Subscription } from '../../types/subscription';
import toast from 'react-hot-toast';

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription;
  userId: string;
}

export function AddSubscriptionModal({ isOpen, onClose, subscription, userId }: AddSubscriptionModalProps) {
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [cardLastFour, setCardLastFour] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addSubscription } = useSubscriptionStore();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addSubscription({
        subscriptionId: subscription.id,
        userId,
        startDate,
        variantId: subscription.selectedVariantId,
        cardLastFour: cardLastFour.length === 4 ? cardLastFour : undefined,
      });
      onClose();
    } catch (error) {
      console.error('Abonelik eklenirken hata:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
          disabled={isSubmitting}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {subscription.name} Aboneliği Ekle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Başlangıç Tarihi
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Kart Son 4 Hanesi (İsteğe bağlı)
            </label>
            <input
              type="text"
              value={cardLastFour}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 4) setCardLastFour(value);
              }}
              placeholder="1234"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500"
              maxLength={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Ekleniyor...' : 'Aboneliği Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}