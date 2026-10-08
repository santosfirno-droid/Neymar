import React, { useState, useEffect, useMemo } from 'react';
import { X, Plus, Minus, Check, Sparkles, MessageSquare } from 'lucide-react';
import { Product, ProductSize, AdditionalItem, CartItem } from '../types';
import { ALL_ADDITIONALS, formatCurrency } from '../data/menuData';

interface CustomizationModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  // Selected size: default to isDefault or first
  const [selectedSize, setSelectedSize] = useState<ProductSize>(() => {
    const defaultSz = product.sizes.find(s => s.isDefault);
    return defaultSz || product.sizes[0];
  });

  // Selected additionals list
  const [selectedAdditionals, setSelectedAdditionals] = useState<AdditionalItem[]>([]);

  // Item quantity
  const [quantity, setQuantity] = useState<number>(1);

  // Item custom note
  const [notes, setNotes] = useState<string>('');

  // Lock body scroll while modal is open
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const toggleAdditional = (item: AdditionalItem) => {
    setSelectedAdditionals(prev => {
      const exists = prev.some(a => a.id === item.id);
      if (exists) {
        return prev.filter(a => a.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  // Unit price calculation
  const unitPrice = useMemo(() => {
    const sizePrice = selectedSize ? selectedSize.price : product.basePrice;
    const additionsTotal = selectedAdditionals.reduce((acc, curr) => acc + curr.price, 0);
    return sizePrice + additionsTotal;
  }, [selectedSize, selectedAdditionals, product.basePrice]);

  const itemTotal = unitPrice * quantity;

  const handleAdd = () => {
    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      product,
      size: selectedSize,
      additionals: selectedAdditionals,
      quantity,
      notes: notes.trim() || undefined,
      unitPrice,
      itemTotal,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[92vh] sm:max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-800 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image & close button */}
        <div className="relative h-44 sm:h-48 w-full bg-purple-900 shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 bg-purple-950/80 px-2.5 py-0.5 rounded-full inline-block mb-1">
              Personalize seu açaí
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display leading-tight">
              {product.name}
            </h2>
            <p className="text-xs text-purple-100 line-clamp-1 mt-0.5 opacity-90">
              {product.description}
            </p>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: Tamanho */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="font-extrabold text-sm sm:text-base text-neutral-900 flex items-center gap-1.5 font-display">
                <span>1. Escolha o tamanho</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Obrigatório
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {product.sizes.map((sz) => {
                const isSelected = selectedSize.id === sz.id;
                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#3b0764] bg-purple-50/70 ring-2 ring-[#3b0764]/20 shadow-xs'
                        : 'border-neutral-200 hover:border-purple-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-neutral-900">
                        {sz.name}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#3b0764] bg-[#3b0764] text-white'
                            : 'border-neutral-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <span className="mt-2 text-xs font-black text-[#3b0764]">
                      {formatCurrency(sz.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Adicionais */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="font-extrabold text-sm sm:text-base text-neutral-900 flex items-center gap-1.5 font-display">
                <span>2. Turbinar com adicionais</span>
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                  Opcional
                </span>
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mb-3">
              Selecione quantos adicionais quiser para deixar o seu pedido perfeito:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ALL_ADDITIONALS.map((add) => {
                const isChecked = selectedAdditionals.some(a => a.id === add.id);
                return (
                  <button
                    key={add.id}
                    type="button"
                    onClick={() => toggleAdditional(add)}
                    className={`flex items-center justify-between p-2.5 px-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isChecked
                        ? 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500/30'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs transition-colors ${
                          isChecked
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-neutral-300 bg-white text-transparent'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-base">{add.icon}</span>
                      <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                        {add.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-neutral-600">
                      +{formatCurrency(add.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Observações */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-purple-700" />
              <span>Observações para este item (opcional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: sem calda, granola em potinho separado, caprichar no morango..."
              rows={2}
              className="w-full p-3 rounded-2xl border border-neutral-200 text-xs sm:text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3b0764] focus:border-transparent resize-none bg-neutral-50/50"
            />
          </div>
        </div>

        {/* Modal Footer with quantity & add button */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 bg-[#faf7f2] flex flex-col sm:flex-row items-center gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center justify-between w-full sm:w-auto bg-white border border-neutral-200 rounded-2xl p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-9 text-center font-extrabold text-sm text-neutral-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(q => q + 1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className="w-full flex-1 py-3.5 px-5 rounded-2xl bg-[#3b0764] hover:bg-[#2e054f] text-white font-extrabold text-sm sm:text-base flex items-center justify-between shadow-lg shadow-purple-950/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Adicionar ao Carrinho</span>
            </span>
            <span className="text-emerald-300 font-black font-display">
              {formatCurrency(itemTotal)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
