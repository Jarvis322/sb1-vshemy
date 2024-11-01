import React from 'react';
import { X, Sparkles, Play, Film, Tv } from 'lucide-react';
import { motion } from 'framer-motion';
import { streamingContent } from '../../data/streamingContent';
import { ContentRecommendation } from '../../types/content';

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  answers: string[];
}

const getMoodEmoji = (mood: string): string => {
  const moodMap: { [key: string]: string } = {
    "Enerjik ve heyecanlı": "🎮",
    "Sakin ve düşünceli": "🧘‍♂️",
    "Yorgun ve stresli": "😴",
    "Mutlu ve neşeli": "🎉"
  };
  return moodMap[mood] || "🎬";
};

const getMoodDescription = (mood: string): string => {
  const descriptions: { [key: string]: string } = {
    "Enerjik ve heyecanlı": "Enerjik ruh haliniz macera dolu içeriklerle harika uyuşacak!",
    "Sakin ve düşünceli": "Düşünceli ruh halinize uygun, derinlikli içerikler seçtik.",
    "Yorgun ve stresli": "Rahatlamanıza yardımcı olacak, hafif içerikler önerdik.",
    "Mutlu ve neşeli": "Pozitif enerjinizi koruyacak, eğlenceli içerikler seçtik!"
  };
  return descriptions[mood] || "Size özel içerikler seçtik!";
};

const getContentRecommendations = (answers: string[]): ContentRecommendation[] => {
  const [mood, experience, preference] = answers;
  let recommendations: ContentRecommendation[] = [];

  // Ruh haline göre mood eşleştirmeleri
  const moodMappings: { [key: string]: string[] } = {
    "Enerjik ve heyecanlı": ["heyecanlı", "aksiyon", "macera"],
    "Sakin ve düşünceli": ["sakin", "düşündürücü", "dramatik"],
    "Yorgun ve stresli": ["hafif", "komedi", "rahatlatıcı"],
    "Mutlu ve neşeli": ["eğlenceli", "komedi", "neşeli"]
  };

  // Deneyim tercihine göre eşleştirmeler
  const experienceMappings: { [key: string]: string[] } = {
    "Macera ve heyecan": ["aksiyon", "gerilim", "macera"],
    "Rahatlama ve huzur": ["sakin", "doğa", "romantik"],
    "Eğlence ve kahkaha": ["komedi", "eğlenceli", "hafif"],
    "Düşünme ve öğrenme": ["belgesel", "düşündürücü", "bilgilendirici"]
  };

  const desiredMoods = [
    ...(moodMappings[mood] || []),
    ...(experienceMappings[experience] || [])
  ];

  // İçerikleri tara ve eşleşenleri bul
  streamingContent.forEach(platform => {
    platform.contents.forEach(content => {
      const matchingMoods = content.mood.filter(m => desiredMoods.includes(m));
      if (matchingMoods.length > 0) {
        recommendations.push({
          title: content.title,
          type: content.type,
          genre: content.genre,
          mood: matchingMoods,
          platform: platform.platform,
          reason: getReason(matchingMoods, mood, experience)
        });
      }
    });
  });

  // En iyi eşleşmeleri seç
  recommendations.sort((a, b) => b.mood.length - a.mood.length);
  return recommendations.slice(0, 3);
};

const getReason = (moods: string[], userMood: string, experience: string): string => {
  if (moods.includes("heyecanlı") && userMood.includes("Enerjik")) {
    return "Enerjik ruh halinize uygun, tempolu bir içerik";
  }
  if (moods.includes("sakin") && experience.includes("Rahatlama")) {
    return "Rahatlamanıza yardımcı olacak sakin bir seçim";
  }
  if (moods.includes("komedi") && userMood.includes("Mutlu")) {
    return "Pozitif enerjinizi destekleyecek eğlenceli bir içerik";
  }
  if (moods.includes("düşündürücü") && experience.includes("Düşünme")) {
    return "Sizi düşünmeye sevk edecek etkileyici bir yapım";
  }
  return "Tercihlerinize uygun özel bir seçim";
};

export function RecommendationModal({ isOpen, onClose, answers }: RecommendationModalProps) {
  if (!isOpen) return null;

  const recommendations = getContentRecommendations(answers);
  const moodEmoji = getMoodEmoji(answers[0]);
  const moodDescription = getMoodDescription(answers[0]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-pink-400" />
          <h2 className="text-2xl font-bold text-white">Size Özel Öneriler</h2>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{moodEmoji}</div>
            <p className="text-pink-300">{moodDescription}</p>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-pink-400 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  {rec.type === 'movie' ? (
                    <Film className="w-6 h-6 text-white" />
                  ) : (
                    <Tv className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{rec.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
                      {rec.type === 'movie' ? 'Film' : 'Dizi'}
                    </span>
                  </div>
                  <p className="text-pink-300 text-sm mt-1">
                    {rec.platform} • {rec.genre}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">{rec.reason}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {rec.mood.map((mood, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30"
                      >
                        {mood}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            Bu öneriler ruh haliniz ve tercihleriniz doğrultusunda seçilmiştir.
          </p>
        </div>
      </motion.div>
    </div>
  );
}