import React, { useState, useId } from 'react';
import { 
  X, 
  MessageCircle, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  MapPin, 
  CreditCard, 
  Bike, 
  Store,
  Copy,
  Check
} from 'lucide-react';
import { CartItem, OrderCheckoutData } from '../types';
import { STORE_INFO, formatCurrency } from '../data/menuData';
import { generateWhatsAppMessage, openWhatsAppOrder } from '../utils/whatsapp';

interface CheckoutModalProps {
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSent: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  onClose,
  cartItems,
  onOrderSent,
}) => {
  const nameInputId = useId();
  const obsInputId = useId();
  const addressInputId = useId();
  const neighborhoodInputId = useId();

  const [customerName, setCustomerName] = useState('');
  const [observation, setObservation] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'dinheiro'>('pix');
  const [changeFor, setChangeFor] = useState('');
  
  const [nameError, setNameError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Lock body scroll while modal is open
  React.useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
  const deliveryFee = deliveryMethod === 'delivery' ? (subtotal >= STORE_INFO.freeDeliveryThreshold ? 0 : STORE_INFO.defaultDeliveryFee) : 0;
  const grandTotal = subtotal + deliveryFee;

  const checkoutData: OrderCheckoutData = {
    customerName,
    observation,
    deliveryMethod,
    address,
    neighborhood,
    paymentMethod,
    changeFor: paymentMethod === 'dinheiro' ? changeFor : undefined,
  };

  const previewMessage = generateWhatsAppMessage(cartItems, checkoutData, grandTotal);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customerName.trim()) {
      setNameError(true);
      const element = document.getElementById(nameInputId);
      if (element) element.focus();
      return;
    }
    setNameError(false);
    openWhatsAppOrder(cartItems, checkoutData, grandTotal);
    onOrderSent();
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(previewMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-800 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#3b0764] to-[#4c107e] text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 transition-colors cursor-pointer"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl font-display">
                Finalizar Pedido
              </h2>
              <p className="text-xs text-purple-200">
                Quase lá! Só precisamos do seu nome para o WhatsApp
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Section 1: Customer Details */}
          <div className="space-y-4 bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
            <div>
              <label 
                htmlFor={nameInputId} 
                className="block text-xs sm:text-sm font-black text-neutral-900 mb-1.5 flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <span>Seu nome</span>
                  <span className="text-red-500 font-bold">*</span>
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                  Obrigatório
                </span>
              </label>
              <input
                id={nameInputId}
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (e.target.value.trim()) setNameError(false);
                }}
                placeholder="Como podemos te chamar? Ex: Maria Silva"
                className={`w-full px-3.5 py-3 rounded-xl bg-white border text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none transition-all ${
                  nameError
                    ? 'border-red-500 ring-2 ring-red-200 bg-red-50/20'
                    : 'border-neutral-300 focus:border-[#3b0764] focus:ring-2 focus:ring-[#3b0764]/20'
                }`}
              />
              {nameError && (
                <p className="mt-1 text-xs text-red-600 font-bold flex items-center gap-1 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Por favor, digite seu nome antes de enviar para o WhatsApp.</span>
                </p>
              )}
            </div>

            {/* Delivery or Pickup */}
            <div>
              <span className="block text-xs font-black text-neutral-800 mb-2">
                Como deseja receber?
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`p-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    deliveryMethod === 'delivery'
                      ? 'border-[#3b0764] bg-[#3b0764] text-white shadow-xs'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  <span>Entrega Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#3b0764] bg-[#3b0764] text-white shadow-xs'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>Retirada no Balcão</span>
                </button>
              </div>

              {deliveryMethod === 'delivery' && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in">
                  <div>
                    <label htmlFor={addressInputId} className="block text-[11px] font-bold text-neutral-600 mb-1">
                      Endereço e Número
                    </label>
                    <input
                      id={addressInputId}
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, Número, Apto/Casa"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#3b0764]"
                    />
                  </div>
                  <div>
                    <label htmlFor={neighborhoodInputId} className="block text-[11px] font-bold text-neutral-600 mb-1">
                      Bairro
                    </label>
                    <input
                      id={neighborhoodInputId}
                      type="text"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="Ex: Renascença, Cohab..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#3b0764]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <span className="block text-xs font-black text-neutral-800 mb-1.5">
                Forma de pagamento preferida:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'pix', label: 'Pix', icon: '⚡' },
                  { id: 'cartao', label: 'Cartão', icon: '💳' },
                  { id: 'dinheiro', label: 'Dinheiro', icon: '💵' },
                ].map((pay) => (
                  <button
                    key={pay.id}
                    type="button"
                    onClick={() => setPaymentMethod(pay.id as any)}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === pay.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                        : 'border-neutral-200 bg-white text-neutral-600'
                    }`}
                  >
                    <span>{pay.icon}</span>
                    <span>{pay.label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === 'dinheiro' && (
                <div className="mt-2.5">
                  <input
                    type="text"
                    value={changeFor}
                    onChange={(e) => setChangeFor(e.target.value)}
                    placeholder="Precisa de troco para quanto? (Ex: 50)"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#3b0764]"
                  />
                </div>
              )}
            </div>

            {/* General Observation (Requested) */}
            <div>
              <label 
                htmlFor={obsInputId}
                className="block text-xs font-bold text-neutral-800 mb-1 flex items-center justify-between"
              >
                <span>Observação (opcional)</span>
                <span className="text-[10px] text-neutral-400 font-normal">Ex: campainha, talher extra...</span>
              </label>
              <textarea
                id={obsInputId}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Algum detalhe especial para o seu pedido?"
                rows={2}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-neutral-300 text-xs sm:text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3b0764] resize-none"
              />
            </div>
          </div>

          {/* Section 2: Order Summary Review */}
          <div className="border border-neutral-200 rounded-2xl p-4 bg-white space-y-3">
            <h3 className="font-extrabold text-sm text-neutral-900 font-display flex items-center justify-between border-b border-neutral-100 pb-2">
              <span>Resumo do Pedido</span>
              <span className="text-xs font-bold text-purple-700">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
              </span>
            </h3>

            <div className="space-y-2 text-xs">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <span className="font-bold text-neutral-900">
                      {item.quantity}x {item.product.name} ({item.size.name})
                    </span>
                    {item.additionals.length > 0 && (
                      <p className="text-[11px] text-neutral-500">
                        + {item.additionals.map(a => a.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="font-extrabold text-neutral-800">
                    {formatCurrency(item.itemTotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-100 space-y-1 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {deliveryMethod === 'delivery' && (
                <div className="flex justify-between text-neutral-600">
                  <span>Taxa de entrega:</span>
                  <span>{deliveryFee === 0 ? 'Grátis' : formatCurrency(deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm sm:text-base font-black text-[#3b0764] pt-1 border-t border-neutral-200">
                <span className="font-display">Total a pagar:</span>
                <span className="font-display">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Section 3: WhatsApp Preview Accordion */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Mensagem que será enviada para {STORE_INFO.phoneDisplay}:</span>
              </div>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer bg-emerald-100/80 px-2 py-0.5 rounded-md"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copiado!' : 'Copiar texto'}</span>
              </button>
            </div>

            <pre className="text-[11px] sm:text-xs font-mono text-emerald-950 bg-white/90 p-3 rounded-xl border border-emerald-100 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
              {previewMessage}
            </pre>
          </div>
        </div>

        {/* Modal Footer with the prominent CTA */}
        <div className="p-4 sm:p-5 bg-[#faf7f2] border-t border-neutral-200 space-y-2">
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-purple-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/30 active:scale-[0.98] transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-purple-950" />
            <span>ENVIAR PEDIDO PELO WHATSAPP</span>
          </button>
          
          <p className="text-[11px] text-center text-neutral-500">
            Você será redirecionado para o WhatsApp com a mensagem pronta. Não precisa digitar nada!
          </p>
        </div>
      </div>
    </div>
  );
};
