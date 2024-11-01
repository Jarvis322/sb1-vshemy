import React, { useState } from 'react';
import { X, Sparkles, Rocket, Bell, Crown, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface OnboardingScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingScreen({ isOpen, onClose }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <Sparkles className="w-8 h-8 text-indigo-400" />,
      title: "Dijital Takipçi'ye Hoş Geldiniz!",
      description: "Dijital aboneliklerinizi akıllıca yönetin, yapay zeka destekli önerilerle içerik keşfedin.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    },
    {
      icon: <Rocket className="w-8 h-8 text-indigo-400" />,
      title: "Akıllı Abonelik Yönetimi",
      description: "Tüm dijital aboneliklerinizi tek yerden kontrol edin.",
      features: [
        "Güncel fiyat takibi ve karşılaştırma",
        "Kategori bazlı filtreleme",
        "Toplam maliyet hesaplama",
        "Yenileme tarihi hatırlatmaları"
      ]
    },
    {
      icon: <Crown className="w-8 h-8 text-yellow-400" />,
      title: "Premium Yapay Zeka Özellikleri",
      description: "Yapay zeka ile kişiselleştirilmiş içerik önerileri ve daha fazlası.",
      features: [
        "Duygu durumuna göre içerik önerileri",
        "Kişiselleştirilmiş izleme tavsiyeleri",
        "AI destekli bütçe optimizasyonu",
        "Öncelikli destek hizmeti"
      ],
      highlight: true
    }
  ];

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('onboardingSeen', 'true');
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-full h-full md:h-auto md:max-w-4xl md:rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 relative overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                  index <= currentStep ? 'bg-indigo-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <div className={`${step.highlight ? 'animate-bounce' : ''}`}>
              {step.icon}
            </div>
            
            <h2 className={`text-2xl md:text-3xl font-bold mt-6 mb-4 ${
              step.highlight 
                ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-transparent bg-clip-text'
                : 'text-white'
            }`}>
              {step.title}
              {step.highlight && (
                <span className="inline-flex items-center ml-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                </span>
              )}
            </h2>
            
            <p className="text-gray-300 mb-8 max-w-lg">
              {step.description}
            </p>

            {step.image && (
              <img
                src={step.image}
                alt="Welcome"
                className="w-full max-w-lg rounded-xl shadow-2xl mb-8"
              />
            )}

            {step.features && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                {step.features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-lg text-left border transition-all
                      ${step.highlight 
                        ? 'bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50' 
                        : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                  >
                    <Zap className={`w-4 h-4 flex-shrink-0 ${
                      step.highlight ? 'text-yellow-400' : 'text-indigo-400'
                    }`} />
                    <p className={`${
                      step.highlight ? 'text-yellow-100' : 'text-gray-200'
                    }`}>
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-700">
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Geri
                </button>
              )}
            </div>
            <button
              onClick={handleNext}
              className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                step.highlight
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium'
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              }`}
            >
              {currentStep === steps.length - 1 ? 'Başla' : 'İleri'}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}