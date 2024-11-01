import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

export function NotificationPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // iOS cihaz kontrolü
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    // Daha önce gösterilip gösterilmediğini kontrol et
    const hasShown = localStorage.getItem('notificationPromptShown');
    
    if (isIOS && !hasShown) {
      // 2 saniye gecikme ile göster
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllow = () => {
    // iOS ayarlarına yönlendir
    window.location.href = 'app-settings:';
    localStorage.setItem('notificationPromptShown', 'true');
    setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('notificationPromptShown', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-sm mx-4 z-50">
      <div className="bg-gradient-to-r from-indigo-500/90 to-purple-500/90 backdrop-blur-lg rounded-xl p-4 shadow-xl border border-white/10">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 rounded-lg p-2">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">Bildirimleri Aç</h3>
            <p className="text-white/80 text-sm mb-3">
              Abonelik yenileme hatırlatmaları için bildirimlere izin verin.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDismiss}
                className="flex-1 py-2 px-3 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
              >
                Daha Sonra
              </button>
              <button
                onClick={handleAllow}
                className="flex-1 py-2 px-3 rounded-lg bg-white text-indigo-600 text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Ayarlara Git
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}