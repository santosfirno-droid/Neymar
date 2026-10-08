import React from 'react';
import { Sparkles, ArrowDown, ShieldCheck, Heart, Zap } from 'lucide-react';
import heroAcaiImg from '../assets/images/hero_acai_bowl_1791467953656.jpg';

interface HeroProps {
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#3b0764] via-[#4c107e] to-[#260541] text-white pt-6 pb-12 px-4 shadow-lg">
      {/* Background aesthetic glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Mobile/Desktop Hero Card */}
        <div className="relative rounded-3xl overflow-hidden bg-purple-950/40 border border-purple-500/30 backdrop-blur-sm p-5 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left space-y-4 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Açaíteria Artesanal em São Luís</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Vita<span className="text-emerald-400">Açaí</span>
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-purple-100 max-w-lg leading-snug">
              Monte seu pedido do seu jeito
            </p>

            <p className="text-xs sm:text-sm text-purple-200/90 max-w-md mx-auto md:mx-0 leading-relaxed">
              Escolha seu tamanho, selecione seus adicionais favoritos e envie o pedido diretamente para o nosso WhatsApp com total agilidade.
            </p>

            {/* CTA Button as explicitly requested */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <button
                onClick={onScrollToMenu}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-purple-950 font-extrabold text-base tracking-wide shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <span>VER CARDÁPIO</span>
                <ArrowDown className="w-4 h-4 text-purple-950 animate-bounce" />
              </button>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-purple-800/40 text-left">
              <div className="flex items-center gap-2 text-[11px] text-purple-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Puro</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-purple-200">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zap Rápido</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-purple-200">
                <Heart className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Seu Jeito</span>
              </div>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="w-full md:w-5/12 max-w-xs md:max-w-none relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-400/30 aspect-4/3 group">
              <img
                src={heroAcaiImg}
                alt="VitaAçaí tigela com frutas frescas e granola"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-purple-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-purple-400/30">
                <span className="font-bold flex items-center gap-1">
                  🍇 Cremoso & Geladinho
                </span>
                <span className="text-emerald-400 font-extrabold">A partir de R$ 16</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
