import React from 'react';
import { MessageCircle, MapPin, Clock, Heart } from 'lucide-react';
import { STORE_INFO, STORE_LOGO } from '../data/menuData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#260541] text-purple-200 pt-12 pb-24 sm:pb-12 border-t border-purple-900/60 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-purple-900/40">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={STORE_LOGO}
                alt="VitaAçaí Logo"
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400 bg-purple-950 shadow-md"
              />
              <span className="font-black text-xl text-white font-display">
                Vita<span className="text-emerald-400">Açaí</span>
              </span>
            </div>
            <p className="text-xs text-purple-300 leading-relaxed">
              O açaí mais cremoso e refrescante, preparado com ingredientes selecionados e muito carinho. Monte sua combinação perfeita!
            </p>
          </div>

          {/* Contact and Orders */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-sm text-white font-display">
              Pedidos & WhatsApp
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>{STORE_INFO.whatsappFormatted}</span>
              </a>
              <div className="flex items-center gap-2 text-purple-300">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{STORE_INFO.openingHours}</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{STORE_INFO.city}</span>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-white font-display">
              Como funciona o cardápio
            </h4>
            <ul className="text-xs text-purple-300 space-y-1.5 list-disc list-inside">
              <li>Escolha seu açaí, creme, sorvete ou milk-shake</li>
              <li>Personalize tamanho e adicionais</li>
              <li>Revise seu pedido no carrinho</li>
              <li>Envie direto pelo WhatsApp com 1 clique!</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-purple-400 gap-3">
          <p>© {new Date().getFullYear()} VitaAçaí. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1 text-purple-300">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>para apaixonados por açaí</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
