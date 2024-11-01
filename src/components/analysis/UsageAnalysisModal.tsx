import React from 'react';
import { X, AlertCircle, CheckCircle2, HelpCircle, TrendingDown, TrendingUp, Calendar } from 'lucide-react';
import { format, differenceInMonths } from 'date-fns';
import { tr } from 'date-fns/locale';
import { UserSubscription } from '../../types/user';
import { subscriptions } from '../../data/subscriptions';
import { motion } from 'framer-motion';

interface UsageAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptions: UserSubscription[];
}

interface UsageAnalysis {
  subscriptionId: number;
  status: 'active' | 'warning' | 'danger';
  message: string;
  suggestion: string;
  monthlyCost: number;
  monthsSubscribed: number;
}

export function UsageAnalysisModal({ isOpen, onClose, subscriptions: userSubscriptions }: UsageAnalysisModalProps) {
  const analyzeUsage = (): UsageAnalysis[] => {
    return userSubscriptions.map(sub => {
      const subscription = subscriptions.find(s => s.id === sub.subscriptionId);
      if (!subscription) return null;

      const variant = subscription.variants?.find(v => v.id === sub.variantId);
      const price = variant?.price || subscription.price;
      const monthsSubscribed = differenceInMonths(new Date(), new Date(sub.startDate));

      // Analiz kriterleri
      const isNewSubscription = monthsSubscribed < 1;
      const isPremiumPlan = variant?.name?.toLowerCase().includes('premium') || 
                           variant?.name?.toLowerCase().includes('aile');
      const isExpensive = price > 200;

      let status: 'active' | 'warning' | 'danger' = 'active';
      let message = 'Aktif kullanım';
      let suggestion = 'Bu aboneliği aktif olarak kullanıyorsunuz.';

      if (isNewSubscription) {
        status = 'active';
        message = 'Yeni abonelik';
        suggestion = 'Aboneliğiniz yeni. Kullanımınızı değerlendirmek için biraz daha zaman gerekiyor.';
      } else if (isPremiumPlan && isExpensive) {
        status = 'warning';
        message = 'Premium plan kullanımı';
        suggestion = 'Daha uygun fiyatlı bir plana geçiş yapabilirsiniz.';
      } else if (isExpensive) {
        status = 'danger';
        message = 'Yüksek maliyet';
        suggestion = 'Bu abonelik bütçenizde önemli bir yer tutuyor. Alternatif seçenekleri değerlendirebilirsiniz.';
      }

      return {
        subscriptionId: sub.subscriptionId,
        status,
        message,
        suggestion,
        monthlyCost: price,
        monthsSubscribed
      };
    }).filter(Boolean) as UsageAnalysis[];
  };

  if (!isOpen) return null;

  const analyses = analyzeUsage();
  const totalMonthlyCost = analyses.reduce((sum, analysis) => sum + analysis.monthlyCost, 0);
  const potentialSavings = analyses
    .filter(a => a.status !== 'active')
    .reduce((sum, analysis) => sum + analysis.monthlyCost, 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Abonelik Kullanım Analizi</h2>
        </div>

        {/* Özet Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Toplam Abonelik</span>
            </div>
            <div className="text-2xl font-bold text-white">{analyses.length}</div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Aylık Maliyet</span>
            </div>
            <div className="text-2xl font-bold text-white">₺{totalMonthlyCost.toFixed(2)}</div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm">Potansiyel Tasarruf</span>
            </div>
            <div className="text-2xl font-bold text-green-400">₺{potentialSavings.toFixed(2)}</div>
          </div>
        </div>

        {/* Abonelik Analizleri */}
        <div className="space-y-4">
          {analyses.map(analysis => {
            const subscription = subscriptions.find(s => s.id === analysis.subscriptionId);
            if (!subscription) return null;

            return (
              <div
                key={analysis.subscriptionId}
                className="p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className={`${subscription.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    {subscription.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">{subscription.name}</h3>
                      {analysis.status === 'active' && (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      )}
                      {analysis.status === 'warning' && (
                        <HelpCircle className="w-5 h-5 text-yellow-400" />
                      )}
                      {analysis.status === 'danger' && (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {analysis.monthsSubscribed} aydır abonesiniz • ₺{analysis.monthlyCost.toFixed(2)}/ay
                    </p>
                    <div className={`mt-3 text-sm rounded-lg p-3 ${
                      analysis.status === 'active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                      analysis.status === 'warning' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                      'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      <p className="font-medium mb-1">{analysis.message}</p>
                      <p>{analysis.suggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            Bu analiz abonelik süreniz, kullanım maliyeti ve plan türüne göre yapılmıştır.
          </p>
        </div>
      </motion.div>
    </div>
  );
}