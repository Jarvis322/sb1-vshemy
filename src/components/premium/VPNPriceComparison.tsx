import React, { useState } from 'react';
import { Globe, TrendingDown, ArrowRight } from 'lucide-react';
import { vpnRegions, servicePrices } from '../../data/vpnPrices';
import { PriceComparison } from '../../types/vpn';
import { motion, AnimatePresence } from 'framer-motion';

interface VPNPriceComparisonProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VPNPriceComparison({ isOpen, onClose }: VPNPriceComparisonProps) {
  const [selectedService, setSelectedService] = useState('netflix');
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const calculateComparisons = (): PriceComparison[] => {
    const turkeyPrice = servicePrices[selectedService].tr[selectedPlan];
    
    return vpnRegions
      .filter(region => region.id !== 'tr')
      .map(region => {
        const localPrice = servicePrices[selectedService][region.id][selectedPlan];
        const convertedPrice = localPrice * region.exchangeRate;
        const savings = turkeyPrice - convertedPrice;
        const savingsPercentage = (savings / turkeyPrice) * 100;

        return {
          region,
          originalPrice: turkeyPrice,
          localPrice: convertedPrice,
          savings,
          savingsPercentage
        };
      })
      .sort((a, b) => b.savings - a.savings);
  };

  if (!isOpen) return null;

  const comparisons = calculateComparisons();
  const bestDeal = comparisons[0];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-2xl relative"
      >
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">VPN Fiyat Karşılaştırması</h2>
          <span className="ml-auto px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs border border-yellow-500/30">
            Premium
          </span>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2"
            >
              <option value="netflix">Netflix</option>
              <option value="spotify">Spotify</option>
            </select>

            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2"
            >
              {Object.keys(servicePrices[selectedService].tr).map(plan => (
                <option key={plan} value={plan}>
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {bestDeal && bestDeal.savings > 0 && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-green-300 mb-2">
                <TrendingDown className="w-5 h-5" />
                <span className="font-semibold">En İyi Fırsat!</span>
              </div>
              <p className="text-white">
                {bestDeal.region.flag} {bestDeal.region.name} üzerinden alışveriş yaparak ayda{' '}
                <span className="font-bold text-green-400">
                  ₺{Math.round(bestDeal.savings)}
                </span>{' '}
                tasarruf edebilirsiniz! ({Math.round(bestDeal.savingsPercentage)}% indirim)
              </p>
            </div>
          )}

          <div className="space-y-3">
            {comparisons.map((comparison, index) => (
              <div
                key={comparison.region.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{comparison.region.flag}</span>
                  <div>
                    <p className="font-medium text-white">{comparison.region.name}</p>
                    <p className="text-sm text-gray-400">
                      {comparison.region.currency} Bölgesi
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-white font-medium">
                      ₺{Math.round(comparison.localPrice)}
                    </p>
                    {comparison.savings > 0 && (
                      <p className="text-sm text-green-400">
                        ₺{Math.round(comparison.savings)} tasarruf
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            * Fiyatlar yaklaşık değerlerdir ve döviz kurlarına göre değişiklik gösterebilir.
          </p>
        </div>
      </motion.div>
    </div>
  );
}