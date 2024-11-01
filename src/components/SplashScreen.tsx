import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onFinish, 500); // Fade out animasyonu tamamlandıktan sonra kaldır
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
      flex items-center justify-center z-50 ${isExiting ? 'fade-out' : ''}`}
    >
      <div className="text-center scale-up-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-indigo-300 to-indigo-500 text-transparent bg-clip-text">
            Dijital Takipçi
          </h1>
          <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
        </div>
        <div className="relative w-48 mx-auto">
          <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-indigo-300 loading-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
}