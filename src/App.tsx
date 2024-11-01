import React, { useState, useEffect } from 'react';
import { CategoryFilter } from './components/CategoryFilter';
import { SubscriptionCard } from './components/SubscriptionCard';
import { AuthModal } from './components/auth/AuthModal';
import { AddSubscriptionModal } from './components/subscription/AddSubscriptionModal';
import { OnboardingScreen } from './components/onboarding/OnboardingScreen';
import { SplashScreen } from './components/SplashScreen';
import { Dashboard } from './components/dashboard/Dashboard';
import { NotificationPrompt } from './components/notification/NotificationPrompt';
import { ThemeToggle } from './components/ThemeToggle';
import { subscriptions as initialSubscriptions } from './data/subscriptions';
import { Subscription } from './types/subscription';
import { Calculator, Sparkles, LogIn, LogOut } from 'lucide-react';
import { useAuthStore } from './store/authStore';
import { useSubscriptionStore } from './store/subscriptionStore';
import toast, { Toaster } from 'react-hot-toast';

// Reset onboarding state for testing
localStorage.removeItem('onboardingSeen');

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(
    initialSubscriptions.map(sub => ({ ...sub, isSelected: false }))
  );
  const [showTotal, setShowTotal] = useState(false);

  const { user, signOut } = useAuthStore();
  const { userSubscriptions, fetchUserSubscriptions, checkNotifications } = useSubscriptionStore();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('onboardingSeen');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserSubscriptions(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      checkNotifications();
      const interval = setInterval(checkNotifications, 1000 * 60 * 60);
      return () => clearInterval(interval);
    }
  }, [user, userSubscriptions]);

  const handleAuthClick = async () => {
    if (user) {
      try {
        await signOut();
        toast.success('Başarıyla çıkış yapıldı');
      } catch (error) {
        toast.error('Çıkış yapılırken bir hata oluştu');
      }
    } else {
      setShowAuthModal(true);
    }
  };

  const filteredSubscriptions = activeCategory === 'all' 
    ? subscriptions 
    : subscriptions.filter(sub => sub.category === activeCategory);

  const selectedSubscriptions = subscriptions.filter(sub => sub.isSelected);
  
  const totalPrice = selectedSubscriptions.reduce((sum, sub) => {
    if (sub.variants && sub.selectedVariantId) {
      const selectedVariant = sub.variants.find(v => v.id === sub.selectedVariantId);
      return sum + (selectedVariant?.price ?? sub.price);
    }
    return sum + sub.price;
  }, 0);

  const handleVariantChange = (subscriptionId: number, variantId: string) => {
    setSubscriptions(subs => 
      subs.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, selectedVariantId: variantId }
          : sub
      )
    );
  };

  const handleToggleSelect = (subscriptionId: number) => {
    setSubscriptions(subs =>
      subs.map(sub =>
        sub.id === subscriptionId
          ? { ...sub, isSelected: !sub.isSelected }
          : sub
      )
    );
    setShowTotal(true);
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 text-gray-900 dark:text-white">
      <Toaster position="top-right" />
      <NotificationPrompt />
      
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 dark:from-white dark:via-indigo-300 dark:to-indigo-500 text-transparent bg-clip-text">
              Dijital Takipçi
            </h1>
            <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={handleAuthClick}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>Çıkış Yap</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Giriş Yap</span>
                </>
              )}
            </button>
          </div>
        </header>

        {user ? (
          <Dashboard />
        ) : (
          <>
            <CategoryFilter 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {filteredSubscriptions.map(subscription => (
                <SubscriptionCard 
                  key={subscription.id} 
                  subscription={subscription}
                  onVariantChange={handleVariantChange}
                  onToggleSelect={handleToggleSelect}
                />
              ))}
            </div>

            {showTotal && selectedSubscriptions.length > 0 && (
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-lg">
                <div className="glass-effect rounded-xl p-6 text-center mx-4 shadow-lg border border-white/10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <p className="text-lg text-gray-900 dark:text-white">Seçili Abonelikler Toplam Maliyeti</p>
                  </div>
                  <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
                    ₺{totalPrice.toFixed(2)}
                  </p>
                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                    {selectedSubscriptions.length} abonelik seçildi
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {showOnboarding && (
        <OnboardingScreen
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {showAddModal && selectedSubscription && (
        <AddSubscriptionModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          subscription={selectedSubscription}
          userId={user?.id || ''}
        />
      )}
    </div>
  );
}