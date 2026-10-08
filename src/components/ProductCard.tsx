import React from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../data/menuData';

interface ProductCardProps {
  product: Product;
  onOpenCustomization: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenCustomization }) => {
  const lowestPrice = product.sizes && product.sizes.length > 0
    ? Math.min(...product.sizes.map(s => s.price))
    : product.basePrice;

  return (
    <div
      onClick={() => onOpenCustomization(product)}
      className="group bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-neutral-200/80 hover:border-purple-300 hover:shadow-lg transition-all duration-200 flex flex-row items-center justify-between gap-3 sm:gap-4 cursor-pointer active:scale-[0.99] text-left"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenCustomization(product);
        }
      }}
    >
      {/* Left content: Title, Description, Price */}
      <div className="flex-1 flex flex-col justify-between min-h-[96px] sm:min-h-[110px] space-y-1.5">
        <div>
          {/* Badge if present */}
          {product.badge && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md mb-1 border border-purple-100">
              <span>{product.emoji || '✨'}</span>
              <span>{product.badge}</span>
            </span>
          )}

          <h3 className="font-extrabold text-sm sm:text-base text-neutral-900 group-hover:text-[#3b0764] transition-colors leading-snug font-display line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mt-0.5">
            {product.description}
          </p>
        </div>

        {/* Price row */}
        <div className="pt-1 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">
              A partir de
            </span>
            <span className="text-sm sm:text-base font-black text-[#3b0764] font-display">
              {formatCurrency(lowestPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Right Content: Product Photo with quick action badge */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-purple-50 shadow-xs border border-purple-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Floating Quick Action Button */}
        <div className="absolute bottom-1.5 right-1.5 bg-[#3b0764] group-hover:bg-emerald-500 group-hover:text-purple-950 text-white rounded-xl p-1.5 shadow-md transition-all">
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};
