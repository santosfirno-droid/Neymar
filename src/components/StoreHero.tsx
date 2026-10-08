import React from 'react';
import { Star, Clock, Bike, Info, ChevronDown, CheckCircle2, MessageCircle } from 'lucide-react';
import { STORE_INFO, STORE_LOGO, formatCurrency } from '../data/menuData';
import heroAcaiImg from '../assets/images/hero_acai_bowl_1791467953656.jpg';

interface StoreHeroProps {
  onScrollToMenu: () => void;
  onOpenStoreInfo: () => void;
}

export const StoreHero: React.FC<StoreHeroProps> = ({ onScrollToMenu, onOpenStoreInfo }) => {
  return (
    <section className="bg-white border-b border-neutral-200/80 shadow-xs">
      {/* Cover Banner */}
      <div className="relative h-36 sm:h-52 md:h-64 w-full overflow-hidden bg-purple-950">
        <img
          src={heroAcaiImg}
          alt="VitaAçaí - Açaíteria em São Luís"
          className="w-full h-full object-cover object-center brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Profile info container with overlapping logo */}
      <div className="max-w-6xl mx-auto px-4 pb-5 sm:pb-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-4">
          {/* Logo & Store Names */}
          <div className="flex items-end gap-3.5 sm:gap-5">
            {/* Big Circular Logo (Exact user asset!) */}
            <div className="relative shrink-0">
              <img
                src={STORE_LOGO}
                alt="VitaAçaí Logo Oficial"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl object-cover bg-purple-950 ring-2 ring-purple-100"
              />
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs" title="Loja Verificada">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </span>
            </div>

            {/* Name and Categories */}
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 font-display tracking-tight leading-tight">
                  Vita<span className="text-[#6b21a8]">Açaí</span>
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                {STORE_INFO.subcategories}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-emerald-700 mt-0.5">
                "{STORE_INFO.tagline}"
              </p>
            </div>
          </div>

          {/* Action Button: VER CARDÁPIO as required */}
          <div className="flex items-center gap-2.5 pt-1 sm:pt-0">
            <button
              onClick={onScrollToMenu}
              className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-[#3b0764] hover:bg-[#2b054a] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-950/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>VER CARDÁPIO</span>
              <ChevronDown className="w-4 h-4 text-emerald-400 animate-bounce" />
            </button>

            <button
              onClick={onOpenStoreInfo}
              className="p-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
              title="Informações da Loja"
              aria-label="Ver informações da loja"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* iFood-Style Store Badges Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
          {/* Rating */}
          <button
            onClick={onOpenStoreInfo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200/70 text-neutral-800 font-bold cursor-pointer transition-colors"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{STORE_INFO.rating}</span>
            <span className="text-neutral-400 font-normal">({STORE_INFO.ratingCount})</span>
          </button>

          {/* Delivery Time */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{STORE_INFO.deliveryTime}</span>
          </div>

          {/* Delivery Fee */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
            <Bike className="w-3.5 h-3.5 text-emerald-600" />
            <span>Entrega {formatCurrency(STORE_INFO.deliveryFee)} · Grátis &gt; {formatCurrency(STORE_INFO.freeDeliveryThreshold)}</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Aberto agora</span>
          </div>
        </div>
      </div>
    </section>
  );
};
