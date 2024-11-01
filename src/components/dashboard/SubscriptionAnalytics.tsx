import React, { useEffect, useRef } from 'react';
import { UserSubscription } from '../../types/user';
import { subscriptions } from '../../data/subscriptions';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import Chart from 'chart.js/auto';

interface SubscriptionAnalyticsProps {
  userSubscriptions: UserSubscription[];
}

export function SubscriptionAnalytics({ userSubscriptions }: SubscriptionAnalyticsProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const totalMonthlySpend = userSubscriptions.reduce((total, sub) => {
    const subscription = subscriptions.find(s => s.id === sub.subscriptionId);
    if (!subscription) return total;
    
    const variant = subscription.variants?.find(v => v.id === sub.variantId);
    return total + (variant?.price || subscription.price);
  }, 0);

  const categoryCosts = userSubscriptions.reduce((acc, sub) => {
    const subscription = subscriptions.find(s => s.id === sub.subscriptionId);
    if (!subscription) return acc;
    
    const variant = subscription.variants?.find(v => v.id === sub.variantId);
    const cost = variant?.price || subscription.price;
    
    acc[subscription.category] = (acc[subscription.category] || 0) + cost;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryCosts)
    .sort((a, b) => b[1] - a[1])
    .map(([category, cost]) => ({
      category,
      cost,
      percentage: (cost / totalMonthlySpend) * 100
    }));

  const categoryColors: Record<string, string> = {
    content: '#ef4444',
    music: '#22c55e',
    gaming: '#3b82f6',
    shopping: '#eab308',
    books: '#a855f7'
  };

  const categoryNames: Record<string, string> = {
    content: 'İçerik',
    music: 'Müzik',
    gaming: 'Oyun',
    shopping: 'Alışveriş',
    books: 'Kitap'
  };

  useEffect(() => {
    if (!chartRef.current) return;

    // Önceki chart instance'ı temizle
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedCategories.map(c => categoryNames[c.category]),
        datasets: [{
          label: 'Aylık Harcama (₺)',
          data: sortedCategories.map(c => c.cost),
          backgroundColor: sortedCategories.map(c => categoryColors[c.category] + '80'),
          borderColor: sortedCategories.map(c => categoryColors[c.category]),
          borderWidth: 2,
          borderRadius: 8,
          maxBarThickness: 50
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 12,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                return `₺${value.toFixed(2)}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#9ca3af'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(156, 163, 175, 0.1)'
            },
            ticks: {
              color: '#9ca3af',
              callback: (value) => `₺${value}`
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [sortedCategories]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
        <h2 className="text-xl font-bold">Abonelik Analizi</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Toplam Aylık:</span>
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              ₺{totalMonthlySpend.toFixed(2)}
            </span>
          </div>

          <div className="h-px bg-gray-200 dark:bg-gray-700" />

          <div className="space-y-3">
            {sortedCategories.map(({ category, cost, percentage }) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {categoryNames[category]}
                  </span>
                  <span className="font-medium">
                    ₺{cost.toFixed(2)}
                  </span>
                </div>
                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full transition-all duration-500"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: categoryColors[category]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[300px] relative">
          <canvas ref={chartRef} />
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-green-500">
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm font-medium">En Düşük Kategori</span>
            <span className="text-sm">
              {sortedCategories[sortedCategories.length - 1]?.category &&
                categoryNames[sortedCategories[sortedCategories.length - 1].category]}
            </span>
          </div>
          <div className="flex items-center gap-2 text-red-500">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">En Yüksek Kategori</span>
            <span className="text-sm">
              {sortedCategories[0]?.category && categoryNames[sortedCategories[0].category]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}