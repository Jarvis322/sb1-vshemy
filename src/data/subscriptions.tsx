import { Film, Music, Gamepad2, BookOpen, ShoppingBag, Tv } from 'lucide-react';
import { Subscription } from '../types/subscription';

export const subscriptions: Subscription[] = [
  { 
    id: 10, 
    name: 'Amazon Prime', 
    price: 39.00, 
    category: 'shopping', 
    icon: <ShoppingBag className="w-6 h-6 text-white" />, 
    color: 'bg-[#00A8E1]', 
    description: 'Alışveriş ve streaming' 
  },
  {
    id: 11,
    name: 'Apple Music',
    price: 39.99,
    category: 'music',
    icon: <Music className="w-6 h-6 text-white" />,
    color: 'bg-[#FA243C]',
    description: 'Apple müzik streaming servisi',
    variants: [
      { id: 'student', name: 'Öğrenci', price: 19.99, description: 'Öğrenciler için indirimli plan' },
      { id: 'individual', name: 'Bireysel', price: 39.99, description: 'Tek kullanıcı için' },
      { id: 'family', name: 'Aile', price: 59.99, description: '6 kişiye kadar aile üyeleri için' }
    ]
  },
  { 
    id: 3, 
    name: 'BluTV', 
    price: 99.99, 
    category: 'content', 
    icon: <Film className="w-6 h-6 text-white" />, 
    color: 'bg-blue-500', 
    description: 'Yerli içerik platformu' 
  },
  { 
    id: 2, 
    name: 'Disney+', 
    price: 164.90,
    yearlyPrice: 1649.00,
    category: 'content', 
    icon: <Film className="w-6 h-6 text-white" />, 
    color: 'bg-blue-600', 
    description: 'Disney, Marvel, Star Wars içerikleri' 
  },
  { 
    id: 6, 
    name: 'EXXEN', 
    price: 129.00, 
    category: 'content', 
    icon: <Film className="w-6 h-6 text-white" />, 
    color: 'bg-yellow-500', 
    description: 'Spor ve eğlence platformu',
    variants: [
      { id: 'ads', name: 'Reklamlı', price: 129.00 },
      { id: 'no-ads', name: 'Reklamsız', price: 179.00 },
      { id: 'sports-ads', name: 'Reklamlı Spor', price: 289.00 },
      { id: 'sports-no-ads', name: 'Reklamsız Spor', price: 339.00 }
    ]
  },
  { 
    id: 5, 
    name: 'GAIN', 
    price: 149.00, 
    category: 'content', 
    icon: <Film className="w-6 h-6 text-white" />, 
    color: 'bg-green-500', 
    description: 'Özel yapım içerikler' 
  },
  {
    id: 15,
    name: 'Hepsiburada Premium',
    price: 39.99,
    category: 'shopping',
    icon: <ShoppingBag className="w-6 h-6 text-white" />,
    color: 'bg-orange-500',
    description: 'Ücretsiz kargo ve özel indirimler'
  },
  { 
    id: 4, 
    name: 'MUBI', 
    price: 169.00,
    yearlyPrice: 1500.00,
    category: 'content', 
    icon: <Film className="w-6 h-6 text-white" />, 
    color: 'bg-purple-600', 
    description: 'Seçkin film koleksiyonu' 
  },
  { 
    id: 1, 
    name: 'Netflix', 
    price: 149.99,
    category: 'content', 
    icon: <Film className="w-6 h-6 text-white" />, 
    color: 'bg-red-500', 
    description: 'Film ve dizi içerik platformu',
    variants: [
      { id: 'basic', name: 'Temel', price: 149.99, description: '1080p, tekli ekran' },
      { id: 'standard', name: 'Standart', price: 229.99, description: '1080p, 2 ekran' },
      { id: 'premium', name: 'Özel', price: 299.99, description: '4K+HDR, 4 ekran' }
    ]
  },
  {
    id: 12,
    name: 'PlayStation Plus',
    price: 228.00,
    category: 'gaming',
    icon: <Gamepad2 className="w-6 h-6 text-white" />,
    color: 'bg-blue-500',
    description: 'PlayStation oyun ve içerik servisi',
    variants: [
      { id: 'essential', name: 'Essential', price: 116.00, description: 'Temel çevrimiçi özellikler ve oyunlar' },
      { id: 'extra', name: 'Extra', price: 195.00, description: 'Ek oyun kataloğu ve içerikler' },
      { id: 'deluxe', name: 'Deluxe', price: 228.00, description: 'Tam katalog ve özel içerikler' }
    ]
  },
  { 
    id: 7, 
    name: 'Spotify Premium', 
    price: 59.99, 
    category: 'music', 
    icon: <Music className="w-6 h-6 text-white" />, 
    color: 'bg-green-500', 
    description: 'Müzik streaming servisi',
    variants: [
      { id: 'individual', name: 'Bireysel', price: 59.99, description: 'Tek hesap' },
      { id: 'student', name: 'Öğrenci', price: 32.99, description: 'Öğrenciler için' },
      { id: 'duo', name: 'Duo', price: 79.99, description: '2 Premium hesap' },
      { id: 'family', name: 'Aile', price: 99.99, description: '6 Premium hesap' }
    ]
  },
  { 
    id: 13, 
    name: 'Tabii', 
    price: 99.00, 
    category: 'content', 
    icon: <Film className="w-6 h-6 text-white" />, 
    color: 'bg-purple-500', 
    description: 'Yerli içerik platformu' 
  },
  { 
    id: 14, 
    name: 'TOD', 
    price: 89.00, 
    category: 'content', 
    icon: <Tv className="w-6 h-6 text-white" />, 
    color: 'bg-orange-500', 
    description: 'Spor ve eğlence platformu',
    variants: [
      { id: 'eglence', name: 'Eğlence', price: 89.00, description: 'Sadece eğlence içerikleri' },
      { id: 'sezonluk-taraftar', name: 'Sezonluk Taraftar', price: 189.00, description: 'Temel spor paketi' },
      { id: 'sezonluk-super-lig', name: 'Sezonluk Süper Lig', price: 289.00, description: 'Süper Lig maçları' },
      { id: 'sezonluk-super-dolu', name: 'Sezonluk Süper Dolu', price: 329.00, description: 'Tüm spor içerikleri' },
      { id: 'super-lig', name: 'Süper Lig', price: 690.00, description: 'Süper Lig tüm sezon paketi' }
    ]
  },
  { 
    id: 9, 
    name: 'Xbox Game Pass', 
    price: 309.00,
    category: 'gaming', 
    icon: <Gamepad2 className="w-6 h-6 text-white" />, 
    color: 'bg-green-600', 
    description: 'Xbox ve PC oyun aboneliği',
    variants: [
      { id: 'pc', name: 'PC', price: 209.00, description: 'Sadece PC oyunları için' },
      { id: 'console-core', name: 'Console Core', price: 175.00, description: 'Xbox Series X|S için temel üyelik' },
      { id: 'console-standard', name: 'Console Standard', price: 249.00, description: 'Xbox Series X|S için standart üyelik' },
      { id: 'ultimate', name: 'Ultimate', price: 309.00, description: 'PC ve Xbox Series X|S için tam erişim' }
    ]
  },
  { 
    id: 8, 
    name: 'YouTube Premium', 
    price: 57.99,
    category: 'content', 
    icon: <Film className="w-6 h-6 text-white" />, 
    color: 'bg-red-600', 
    description: 'Reklamsız video izleme',
    variants: [
      { id: 'individual-monthly', name: 'Bireysel Aylık', price: 57.99, description: 'Tek hesap' },
      { id: 'individual-yearly', name: 'Bireysel Yıllık', price: 579.99, description: 'Tek hesap, yıllık ödeme' },
      { id: 'student', name: 'Öğrenci', price: 37.99, description: 'Öğrenciler için' },
      { id: 'family', name: 'Aile', price: 115.99, description: '5 aile üyesi için' }
    ]
  }
];