import React, { useState } from 'react';
import { X, Sparkles, Rocket, Bell, CreditCard, Lock } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('welcomeModalSeen', 'true');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-2xl relative shadow-xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Dijital Takipçi'ye Hoş Geldiniz!</h2>
        </div>

        <div className="space-y-6 text-gray-300">
          <p className="leading-relaxed">
            Dijital Takipçi, dijital aboneliklerinizi kolayca takip etmenizi sağlayan bir platformdur. 
            Popüler streaming servisleri, oyun platformları ve diğer dijital aboneliklerin güncel 
            fiyatlarını görüntüleyebilir ve kendi aboneliklerinizi yönetebilirsiniz.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Rocket className="w-5 h-5" />
                <h3 className="font-semibold">Beta Sürüm Özellikleri</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Güncel abonelik fiyatları</li>
                <li>• Paket karşılaştırma</li>
                <li>• Kategori bazlı filtreleme</li>
                <li>• Toplam maliyet hesaplama</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Bell className="w-5 h-5" />
                <h3 className="font-semibold">Yakında Gelecek</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Ödeme tarihi hatırlatmaları</li>
                <li>• Fiyat değişikliği bildirimleri</li>
                <li>• Abonelik önerileri</li>
                <li>• Bütçe analizi</li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-500/10 rounded-xl p-4 border border-indigo-500/20">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <Lock className="w-5 h-5" />
              <h3 className="font-semibold">Güvenli Kullanım</h3>
            </div>
            <p className="text-sm">
              Kart bilgilerinizin güvenliği için sadece son 4 haneyi kaydediyoruz. 
              Tam kart numarası, son kullanma tarihi veya güvenlik kodu gibi hassas 
              bilgiler asla saklanmaz.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4">
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="rounded border-gray-600 text-indigo-500 focus:ring-indigo-500 bg-gray-700"
              />
              Bir daha gösterme
            </label>

            <button
              onClick={handleClose}
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Anladım
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}