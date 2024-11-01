import React, { useRef, useEffect } from 'react';
import { MoreHorizontal, Film, Music, Gamepad2, BookOpen, ShoppingBag } from 'lucide-react';
import { Category } from '../types/subscription';

const categories: Category[] = [
  { id: 'all', name: 'Tümü', icon: <MoreHorizontal className="w-5 h-5" /> },
  { id: 'content', name: 'İçerik', icon: <Film className="w-5 h-5" /> },
  { id: 'music', name: 'Müzik', icon: <Music className="w-5 h-5" /> },
  { id: 'gaming', name: 'Oyun', icon: <Gamepad2 className="w-5 h-5" /> },
  { id: 'books', name: 'Kitap', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'shopping', name: 'Alışveriş', icon: <ShoppingBag className="w-5 h-5" /> },
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToActiveCategory = () => {
      const activeElement = document.querySelector(`[data-category="${activeCategory}"]`);
      if (activeElement && scrollRef.current) {
        const containerRect = scrollRef.current.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();
        const scrollLeft = elementRect.left - containerRect.left - (containerRect.width - elementRect.width) / 2;
        scrollRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    };
    scrollToActiveCategory();
  }, [activeCategory]);

  return (
    <>
      {/* Mobile Categories */}
      <div 
        ref={scrollRef}
        className="lg:hidden flex gap-3 mb-8 overflow-x-auto pb-4 px-4 snap-x snap-mandatory hide-scrollbar"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {categories.map(category => (
          <button
            key={category.id}
            data-category={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 flex-shrink-0 snap-center
              ${activeCategory === category.id 
                ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 text-white shadow-lg shadow-indigo-500/30 scale-105' 
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'}
              hover:scale-105 text-sm sm:text-base sm:px-6 sm:py-3 backdrop-blur-sm`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>

      {/* Desktop Categories */}
      <div className="hidden lg:flex flex-wrap gap-4 justify-center mb-12">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300
              ${activeCategory === category.id 
                ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 text-white shadow-lg shadow-indigo-500/30 scale-105' 
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'}
              hover:scale-105 backdrop-blur-sm`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>
    </>
  );
}