import React, { useState } from 'react';
import { Subscription } from '../types/subscription';
import { Check, AlertCircle } from 'lucide-react';

interface SubscriptionCardProps {
  subscription: Subscription;
  onVariantChange: (subscriptionId: number, variantId: string) => void;
  onToggleSelect: (subscriptionId: number) => void;
  onDelete?: (subscriptionId: number) => void;
  showDelete?: boolean;
}

export function SubscriptionCard({ 
  subscription, 
  onVariantChange, 
  onToggleSelect,
  onDelete,
  showDelete = false 
}: SubscriptionCardProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const selectedVariant = subscription.variants?.find(v => v.id === subscription.selectedVariantId);
  const currentPrice = selectedVariant?.price ?? subscription.price;

  const handleSelect = () => {
    if (subscription.variants && !subscription.selectedVariantId) {
      setIsShaking(true);
      setShowWarning(true);
      setTimeout(() => setIsShaking(false), 500);
      setTimeout(() => setShowWarning(false), 2000);
      return;
    }
    onToggleSelect(subscription.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(subscription.id);
    }
  };

  return (
    <div 
      className={`subscription-card rounded-xl p-4 sm:p-6 shadow-lg transition-all relative hover-scale h-full
        ${subscription.isSelected ? 'ring-2 ring-indigo-500 shadow-indigo-500/20' : ''}
        ${isShaking ? 'shake-warning' : ''}`}
    >
      {showWarning && subscription.variants && !subscription.selectedVariantId && (
        <div className={`warning-tooltip ${showWarning ? 'show' : ''} flex items-center gap-1`}>
          <AlertCircle className="w-3 h-3" />
          <span>Lütfen bir paket seçin</span>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className={`${subscription.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-lg`}>
          {subscription.icon}
        </div>

        <div className="flex gap-2">
          {!showDelete && (
            <button
              onClick={handleSelect}
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center
                transition-all duration-300
                ${subscription.isSelected 
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-400 border-indigo-500' 
                  : 'border-gray-400 dark:border-gray-600 hover:border-indigo-400'}`}
            >
              {subscription.isSelected && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
            </button>
          )}

          {showDelete && onDelete && (
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-600 transition-colors p-1"
              title="Aboneliği Sil"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-white">{subscription.name}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">{subscription.description}</p>
      
      {subscription.variants ? (
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col gap-2">
            {subscription.variants.map((variant) => (
              <label
                key={variant.id}
                className={`flex items-center justify-between p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-300
                  ${variant.id === subscription.selectedVariantId 
                    ? 'bg-indigo-500/20 ring-1 ring-indigo-500' 
                    : 'hover:bg-gray-100 dark:hover:bg-white/5'}`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name={`variant-${subscription.id}`}
                    value={variant.id}
                    checked={variant.id === subscription.selectedVariantId}
                    onChange={() => onVariantChange(subscription.id, variant.id)}
                    className="mr-2 sm:mr-3 accent-indigo-500"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{variant.name}</div>
                    {variant.description && (
                      <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">{variant.description}</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400">₺{variant.price.toFixed(2)}</div>
                  {variant.id.includes('yearly') && (
                    <div className="text-[10px] sm:text-xs text-indigo-500 dark:text-indigo-300">Yıllık fatura</div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center mt-3 sm:mt-4">
          <div>
            <span className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">₺{subscription.price.toFixed(2)}</span>
            {subscription.yearlyPrice && (
              <div className="text-xs sm:text-sm text-indigo-500 dark:text-indigo-300 mt-0.5 sm:mt-1">
                Yıllık: ₺{subscription.yearlyPrice.toFixed(2)}
              </div>
            )}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
            {subscription.yearlyPrice ? 'aylık / yıllık' : 'aylık'}
          </span>
        </div>
      )}
    </div>
  );
}