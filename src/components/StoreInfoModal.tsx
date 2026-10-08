import React from 'react';
import { X, Clock, MapPin, CreditCard, MessageCircle, Star, ShieldCheck, Bike } from 'lucide-react';
import { STORE_INFO, STORE_LOGO, formatCurrency } from '../data/menuData';

interface StoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreInfoModal: React.FC<StoreInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-neutral-800 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Store Logo */}
        <div className="bg-[#260541] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={STORE_LOGO}
              alt="Logo VitaAçaí"
              className="w-12 h-12 rounded-full border-2 border-emerald-400 shadow-md object-cover bg-purple-900"
            />
            <div>
              <h3 className="font-black text-lg font-display">VitaAçaí</h3>
              <p className="text-xs text-purple-200">Informações da Loja</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-purple-900/80 hover:bg-purple-800 text-purple-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          {/* Rating */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200/80">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
              <div>
                <span className="font-black text-sm text-neutral-900">{STORE_INFO.rating}</span>
                <span className="text-neutral-500 text-xs ml-1">({STORE_INFO.ratingCount})</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Super Loja
            </span>
          </div>

          {/* Delivery & Time */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-neutral-400">
              Entrega & Prazos
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-neutral-700">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tempo estimado: <strong>{STORE_INFO.deliveryTime}</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-700">
                <Bike className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Taxa de entrega: <strong>{formatCurrency(STORE_INFO.deliveryFee)}</strong> (Grátis a partir de {formatCurrency(STORE_INFO.freeDeliveryThreshold)})</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-700">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{STORE_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-neutral-400">
              Horário de Funcionamento
            </h4>
            <div className="flex items-center justify-between text-neutral-700 bg-neutral-50 p-2.5 rounded-xl">
              <span>Segunda a Domingo</span>
              <span className="font-bold text-emerald-700">13h00 às 23h30</span>
            </div>
          </div>

          {/* Payment */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-neutral-400">
              Formas de Pagamento Aceitas
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-900 font-bold border border-purple-100">
                ⚡ Pix
              </div>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-900 font-bold border border-purple-100">
                💳 Cartões
              </div>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-900 font-bold border border-purple-100">
                💵 Dinheiro
              </div>
            </div>
          </div>

          {/* Direct WhatsApp */}
          <div className="pt-2">
            <a
              href={`https://wa.me/${STORE_INFO.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp ({STORE_INFO.phoneDisplay})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
