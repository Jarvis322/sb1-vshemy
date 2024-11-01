import { StreamingContent } from '../types/content';

export const streamingContent: StreamingContent[] = [
  // Netflix
  {
    platform: 'Netflix',
    contents: [
      { title: 'Stranger Things', type: 'series', genre: 'Bilim Kurgu', mood: ['heyecanlı', 'nostaljik'] },
      { title: 'Wednesday', type: 'series', genre: 'Fantastik', mood: ['karanlık', 'komedi'] },
      { title: 'Squid Game', type: 'series', genre: 'Gerilim', mood: ['yoğun', 'dramatik'] },
      { title: 'The Crown', type: 'series', genre: 'Drama', mood: ['tarihi', 'dramatik'] },
      { title: 'Red Notice', type: 'movie', genre: 'Aksiyon', mood: ['eğlenceli', 'macera'] }
    ]
  },
  // Amazon Prime
  {
    platform: 'Amazon Prime',
    contents: [
      { title: 'The Boys', type: 'series', genre: 'Süper Kahraman', mood: ['karanlık', 'komedi'] },
      { title: 'The Lord of the Rings: The Rings of Power', type: 'series', genre: 'Fantastik', mood: ['epik', 'macera'] },
      { title: 'Fleabag', type: 'series', genre: 'Komedi', mood: ['komedi', 'dramatik'] },
      { title: 'The Terminal List', type: 'series', genre: 'Aksiyon', mood: ['gerilim', 'yoğun'] },
      { title: 'The Tomorrow War', type: 'movie', genre: 'Bilim Kurgu', mood: ['aksiyon', 'gerilim'] }
    ]
  },
  // BluTV
  {
    platform: 'BluTV',
    contents: [
      { title: 'Yeşilçam', type: 'series', genre: 'Drama', mood: ['nostaljik', 'dramatik'] },
      { title: 'Yakamoz S-245', type: 'series', genre: 'Bilim Kurgu', mood: ['gerilim', 'macera'] },
      { title: 'Saygı', type: 'series', genre: 'Suç', mood: ['karanlık', 'yoğun'] },
      { title: 'Bozkır', type: 'series', genre: 'Suç', mood: ['gerilim', 'dramatik'] },
      { title: '7 Yüz', type: 'series', genre: 'Drama', mood: ['düşündürücü', 'dramatik'] }
    ]
  }
];