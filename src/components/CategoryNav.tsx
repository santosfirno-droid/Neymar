import React from 'react';
import { Search, X, Flame } from 'lucide-react';
import { CATEGORIES } from '../data/menuData';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalResults: number;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalResults,
}) => {
  return (
    <div className="sticky top-[86px] sm:top-[90px] z-30 bg-white/95 backdrop-blur-md pt-2.5 pb-2.5 border-b border-neutral-200/90 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 space-y-2.5">
        {/* Search bar styled like modern delivery app */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar no cardápio da VitaAçaí (ex: Nutella, morango, ninho...)"
            className="w-full pl-10 pr-9 py-2 sm:py-2.5 rounded-xl bg-neutral-100 border border-neutral-200/80 text-xs sm:text-sm text-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#3b0764] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600 rounded-full cursor-pointer"
              aria-label="Limpar busca"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Categories sliding pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#3b0764] text-white shadow-sm ring-2 ring-emerald-400'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-purple-900 text-emerald-300' : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
