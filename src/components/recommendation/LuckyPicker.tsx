import React, { useState, useEffect } from 'react';
import { X, Sparkles, Film, Tv } from 'lucide-react';
import { netflixContent } from '../../data/netflixContent';
import { NetflixTitle } from '../../types/content';

interface LuckyPickerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LuckyPicker({ isOpen, onClose }: LuckyPickerProps) {
  const [countdown, setCountdown] = useState(5);
  const [isSpinning, setIsSpinning] = useState(true);
  const [selectedContent, setSelectedContent] = useState<NetflixTitle | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setIsSpinning(true);
      setSelectedContent(null);
      return;
    }

    // Rastgele içerik seçimi
    const allTitles = netflixContent.flatMap(category => category.titles);
    const randomIndex = Math.floor(Math.random() * allTitles.length);
    const selected = allTitles[randomIndex];

    // Hızlı başlık değiştirme efekti
    const titleInterval = setInterval(() => {
      const randomTitle = allTitles[Math.floor(Math.random() * allTitles.length)].name;
      setCurrentTitle(randomTitle);
    }, 100);

    // Geri sayım
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(titleInterval);
          clearInterval(countdownInterval);
          setIsSpinning(false);
          setSelectedContent(selected);
          setCurrentTitle(selected.name);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(titleInterval);
      clearInterval(countdownInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
          <h2 className="text-2xl font-bold text-white">Şans Topu</h2>
        </div>

        {isSpinning ? (
          <div className="text-center py-12">
            <div className="text-6xl font-bold text-yellow-400 mb-8 animate-pulse">
              {countdown}
            </div>
            <div className="text-2xl font-bold text-white overflow-hidden h-12">
              <div className="animate-bounce">
                {currentTitle}
              </div>
            </div>
          </div>
        ) : selectedContent && (
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-start gap-6">
              <div className="bg-red-500 w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0">
                {selectedContent.type === 'film' ? (
                  <Film className="w-8 h-8 text-white" />
                ) : (
                  <Tv className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">{selectedContent.name}</h3>
                  <span className="px-2 py-1 rounded-full bg-white/10 text-sm text-gray-300">
                    {selectedContent.type === 'film' ? 'Film' : 'Dizi'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedContent.mood.map((mood, index) => (
                    <span
                      key={index}
                      className="text-sm px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    >
                      {mood}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-gray-400">
                  Bu içeriği izlemeyen kör oldu! 🎯✨
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            {isSpinning ? 'Sizin için en iyi içeriği seçiyoruz...' : 'İşte karşınızda bugünün şanslı içeriği!'}
          </p>
        </div>
      </div>
    </div>
  );
}