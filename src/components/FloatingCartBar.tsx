import React from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../data/menuData';

interface FloatingCartBarProps {
  itemCount: number;
  total: number;
  onOpenCart: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  itemCount,
  total,
  onOpenCart,
}) => {
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 px-3 sm:px-4 pointer-events-none sm:max-w-lg sm:mx-auto">
      <div className="pointer-events-auto">
        <button
          onClick={onOpenCart}
          className="w-full py-3.5 px-4.5 rounded-2xl bg-[#3b0764] hover:bg-[#2c054b] text-white shadow-2xl shadow-purple-950/50 border border-purple-400/40 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer group"
          aria-label="Ver sacola"
        >
          {/* Left badge & count */}
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-emerald-500 rounded-xl text-purple-950 shadow-xs">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-[#3b0764] text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#3b0764] shadow-xs">
                {itemCount}
              </span>
            </div>

            <div className="text-left">
              <span className="text-[11px] text-purple-200 block uppercase font-bold tracking-wider">
                Ver Sacola
              </span>
              <span className="text-sm font-semibold text-white">
                {itemCount} {itemCount === 1 ? 'item' : 'itens'}
              </span>
            </div>
          </div>

          {/* Right total and action */}
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-black text-emerald-300 font-display">
              {formatCurrency(total)}
            </span>
            <div className="p-1 rounded-lg bg-purple-900/80 group-hover:bg-purple-800 text-emerald-300">
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
