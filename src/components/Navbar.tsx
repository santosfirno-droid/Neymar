import React from 'react';
import { ShoppingBag, MessageCircle, MapPin, ChevronRight, Info } from 'lucide-react';
import { STORE_INFO, STORE_LOGO, formatCurrency } from '../data/menuData';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenStoreInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenStoreInfo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#260541] text-white shadow-md border-b border-purple-900/60">
      {/* Top Address & Delivery Banner (like iFood) */}
      <div className="bg-[#1b0330] text-purple-200 text-xs py-1.5 px-4 flex items-center justify-between border-b border-purple-950/40">
        <div className="flex items-center gap-1.5 truncate max-w-xs sm:max-w-md">
          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[11px] text-purple-300">Entrega em:</span>
          <span className="text-[11px] font-bold text-white truncate">{STORE_INFO.city}</span>
        </div>

        <button
          onClick={onOpenStoreInfo}
          className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Aberto até 23h30</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Bar */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand identity with Logo */}
        <div className="flex items-center gap-3">
          <img
            src={STORE_LOGO}
            alt="VitaAçaí Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-emerald-400 shadow-md bg-purple-950"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white font-display">
                Vita<span className="text-emerald-400">Açaí</span>
              </span>
              <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.2 rounded-md">
                OFICIAL
              </span>
            </div>
            <p className="text-[11px] text-purple-200 hidden sm:block font-medium">
              {STORE_INFO.tagline}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Info button */}
          <button
            onClick={onOpenStoreInfo}
            className="p-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white transition-colors cursor-pointer"
            title="Informações da Loja"
            aria-label="Informações da Loja"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* WhatsApp direct button */}
          <a
            href={`https://wa.me/${STORE_INFO.whatsappRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs"
            title="Atendimento WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span>(98) 92177-138</span>
          </a>

          {/* Cart / Sacola button */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir sacola de compras"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 border border-purple-500/40 text-white font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-purple-950 text-[10px] sm:text-[11px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#260541] shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-extrabold text-white">
              {cartCount === 0 ? 'Sacola' : formatCurrency(cartTotal)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
