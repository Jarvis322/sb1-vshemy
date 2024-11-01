import React, { useState } from 'react';
import { X, Brain, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecommendationModal } from './RecommendationModal';

interface MoodTestProps {
  isOpen: boolean;
  onClose: () => void;
}

const questions = [
  {
    id: 1,
    question: "Şu an kendinizi nasıl hissediyorsunuz?",
    options: [
      "Enerjik ve heyecanlı",
      "Sakin ve düşünceli",
      "Yorgun ve stresli",
      "Mutlu ve neşeli"
    ]
  },
  {
    id: 2,
    question: "Bu akşam ne tür bir deneyim arıyorsunuz?",
    options: [
      "Macera ve heyecan",
      "Rahatlama ve huzur",
      "Eğlence ve kahkaha",
      "Düşünme ve öğrenme"
    ]
  },
  {
    id: 3,
    question: "Hangi tür içerikler sizi daha çok etkiler?",
    options: [
      "Duygusal ve dramatik",
      "Komedi ve eğlence",
      "Aksiyon ve macera",
      "Belgesel ve eğitici"
    ]
  }
];

const moodEmojis: { [key: string]: string } = {
  "Enerjik": "🎮",
  "Sakin": "🧘‍♂️",
  "Yorgun": "😴",
  "Mutlu": "🎉",
};

export function MoodTest({ isOpen, onClose }: MoodTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleClose = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    onClose();
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-xl relative"
        >
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-6 h-6 text-pink-400" />
            <h2 className="text-2xl font-bold text-white">Mood Testi</h2>
          </div>

          <div className="mb-8 bg-gray-700 h-1 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl text-white font-medium">
                {questions[currentQuestion].question}
              </h3>

              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all text-left text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {showResults && (
        <RecommendationModal
          isOpen={showResults}
          onClose={handleClose}
          answers={answers}
        />
      )}
    </>
  );
}