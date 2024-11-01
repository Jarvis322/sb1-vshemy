import React, { useState, useEffect } from 'react';
import { X, Sparkles, Film, Tv } from 'lucide-react';
import { streamingContent } from '../data/streamingContent';
import { LuckyPickResult } from '../types/content';
import { motion, AnimatePresence } from 'framer-motion';

interface LuckyPickProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LuckyPick({ isOpen, onClose }: LuckyPickProps) {
  const [countdown, setCountdown] = useState(5);
  const [result, setResult] = useState<LuckyPickResult | null>(null);
  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setIsSpinning(true);
      setResult(null);
      return;
    }

    // Rastgele içerik seçimi
    const selectRandomContent = () => {
      const platformIndex = Math.floor(Math.random() * streamingContent.length);
      const platform = streamingContent[platformIndex];
      const contentIndex = Math.floor(Math.random() * platform.contents.length);
      const content = platform.contents[contentIndex];
      return { content, platform: platform.platform };
    };

    // Geri sayım
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSpinning(false);
          setResult(selectRandomContent());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Şans Topu</h2>
        </div>

        {isSpinning ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-6xl font-bold text-yellow-400 mb-4"
            >
              {countdown}
            </motion.div>
            <p className="text-gray-300">Size özel içerik seçiliyor...</p>
          </div>
        ) : result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-12 h-12 rounded-xl flex items-center justify-center">
                {result.content.type === 'movie' ? (
                  <Film className="w-6 h-6 text-white" />
                ) : (
                  <Tv className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{result.content.title}</h3>
                  <span className="px-2 py-1 rounded-full bg-white/10 text-xs text-gray-300">
                    {result.content.type === 'movie' ? 'Film' : 'Dizi'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  {result.platform} • {result.content.genre}
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.content.mood.map((mood, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    >
                      {mood}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            {isSpinning
              ? 'Sizin için en iyi içeriği seçiyoruz...'
              : 'İşte bugün sizin için seçtiğimiz içerik!'}
          </p>
        </div>
      </motion.div>
    </div>
  );
}