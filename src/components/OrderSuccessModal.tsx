import React from 'react';
import { CheckCircle2, MessageCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

interface OrderSuccessModalProps {
  onClose: () => void;
  onNewOrder: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  onClose,
  onNewOrder,
}) => {
  React.useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-neutral-900 font-display">
            Pedido Enviado!
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
            Seu pedido foi formatado e direcionado para a equipe da <strong className="text-purple-900">VitaAçaí</strong> no WhatsApp:
          </p>
          <div className="mt-3 inline-block bg-purple-50 text-purple-900 font-extrabold px-3 py-1 rounded-xl text-xs sm:text-sm border border-purple-200">
            {STORE_INFO.phoneDisplay}
          </div>
        </div>

        <div className="bg-emerald-50 text-emerald-900 p-3 rounded-2xl text-xs text-left space-y-1 border border-emerald-100">
          <p className="font-bold flex items-center gap-1.5 text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Próximos passos:
          </p>
          <p className="text-emerald-700 leading-relaxed text-[11px]">
            1. Envie a mensagem gerada na conversa do WhatsApp.<br />
            2. Nossa equipe confirmará o tempo de preparo e envio imediatamente!
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <a
            href={`https://wa.me/${STORE_INFO.whatsappRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Reabrir WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onNewOrder}
            className="w-full py-3 px-4 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Iniciar um novo pedido</span>
          </button>
        </div>
      </div>
    </div>
  );
};
