import React, { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from '../data/menuData';

interface CartDrawerProps {
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  // Lock body scroll
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.itemTotal, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[#faf7f2] shadow-2xl flex flex-col overflow-hidden text-neutral-800 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#3b0764] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-900 rounded-xl text-emerald-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-lg font-display tracking-tight">
                Seu Carrinho
              </h2>
              <p className="text-xs text-purple-200">
                {items.length === 0
                  ? 'Carrinho vazio'
                  : `${items.length} ${items.length === 1 ? 'item montado' : 'itens montados'}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        {items.length === 0 ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 text-3xl">
              🍇
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-neutral-800 font-display">
                Seu carrinho está vazio
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xs">
                Que tal escolher um açaí cremoso bem geladinho e personalizar com seus adicionais preferidos?
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-2xl bg-[#3b0764] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-purple-900 transition-colors cursor-pointer"
            >
              Ver opções do cardápio
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 divide-y divide-purple-100/60">
            {items.map((item) => (
              <div
                key={item.id}
                className="pt-3.5 first:pt-0 bg-white p-3.5 rounded-2xl border border-purple-100/80 shadow-xs flex flex-col gap-2.5"
              >
                {/* Top line: product title, size badge, unit price and remove */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-purple-50 shrink-0 border border-purple-100"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm text-neutral-900 font-display leading-tight">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md">
                          {item.size.name}
                        </span>
                        <span className="text-[11px] text-neutral-400">·</span>
                        <span className="text-[11px] font-semibold text-neutral-500">
                          Unit: {formatCurrency(item.unitPrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remover item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Additionals list */}
                {item.additionals.length > 0 && (
                  <div className="bg-[#faf7f2] p-2 rounded-xl text-xs text-neutral-700">
                    <span className="font-bold text-purple-900 block text-[10px] uppercase tracking-wider mb-1">
                      Adicionais:
                    </span>
                    <p className="leading-relaxed">
                      {item.additionals.map(a => `${a.name} (+${formatCurrency(a.price)})`).join(', ')}
                    </p>
                  </div>
                )}

                {/* Notes if any */}
                {item.notes && (
                  <p className="text-[11px] text-neutral-500 italic bg-neutral-50 px-2 py-1 rounded-md">
                    Obs: {item.notes}
                  </p>
                )}

                {/* Bottom row: Stepper and Item Total */}
                <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                  <div className="flex items-center gap-2 bg-neutral-100 rounded-xl p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
                      title="Diminuir"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-5 text-center text-neutral-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
                      title="Aumentar"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-neutral-500 block">Subtotal</span>
                    <span className="text-sm font-extrabold text-[#3b0764] font-display">
                      {formatCurrency(item.itemTotal)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {items.length > 0 && (
              <div className="pt-2 text-center">
                <button
                  onClick={onClearCart}
                  className="text-xs text-neutral-400 hover:text-red-500 font-semibold cursor-pointer underline underline-offset-2"
                >
                  Esvaziar todo o carrinho
                </button>
              </div>
            )}
          </div>
        )}

        {/* Drawer Footer / Checkout CTA */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-purple-100/80 shadow-lg space-y-3">
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between items-center text-sm font-bold text-neutral-700">
                <span>Subtotal dos produtos:</span>
                <span className="text-neutral-900 font-extrabold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-base font-black text-neutral-900 pt-1 border-t border-neutral-100">
                <span className="font-display">Total do pedido:</span>
                <span className="text-xl text-[#3b0764] font-display font-black">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-purple-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>FINALIZAR PEDIDO</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continuar escolhendo produtos</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
