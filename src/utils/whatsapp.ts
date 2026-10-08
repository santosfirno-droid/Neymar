import { CartItem, OrderCheckoutData } from '../types';
import { STORE_INFO, formatCurrency } from '../data/menuData';

function formatAdditionalsList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} e ${items[1]}`;
  const allButLast = items.slice(0, -1).join(', ');
  const last = items[items.length - 1];
  return `${allButLast} e ${last}`;
}

export function generateWhatsAppMessage(
  cartItems: CartItem[],
  checkoutData: OrderCheckoutData,
  totalAmount: number
): string {
  const customerName = checkoutData.customerName.trim() || 'Cliente';
  
  const header = `Olá! Sou ${customerName} e gostaria de fazer o seguinte pedido na ${STORE_INFO.name}:`;

  const itemsText = cartItems
    .map((item) => {
      const emoji = item.product.emoji || '🍇';
      // If product name already ends with size or has specific format
      const sizeLabel = item.size ? ` ${item.size.name}` : '';
      const line1 = `${emoji} ${item.quantity}x ${item.product.name}${sizeLabel}`;
      
      const additionsNames = item.additionals.map((a) => a.name);
      const additionsText = additionsNames.length > 0 
        ? `Adicionais: ${formatAdditionalsList(additionsNames)}`
        : '';
        
      const itemNotesText = item.notes?.trim()
        ? `Obs do item: ${item.notes.trim()}`
        : '';

      return [line1, additionsText, itemNotesText].filter(Boolean).join('\n');
    })
    .join('\n\n');

  // Observations
  const generalObs = checkoutData.observation.trim()
    ? `Observação: ${checkoutData.observation.trim()}`
    : `Observação: Nenhuma`;

  // Delivery info
  let deliverySection = '';
  if (checkoutData.deliveryMethod === 'delivery') {
    const address = checkoutData.address?.trim() || 'A combinar';
    const neighborhood = checkoutData.neighborhood?.trim() ? `, ${checkoutData.neighborhood.trim()}` : '';
    deliverySection = `📍 Entrega: ${address}${neighborhood}`;
  } else {
    deliverySection = `🏬 Retirada no balcão`;
  }

  // Payment info
  const paymentLabels: Record<string, string> = {
    pix: 'Pix',
    cartao: 'Cartão na entrega/balcão',
    dinheiro: checkoutData.changeFor ? `Dinheiro (Troco para R$ ${checkoutData.changeFor})` : 'Dinheiro',
  };
  const paymentText = `💳 Pagamento: ${paymentLabels[checkoutData.paymentMethod] || 'A combinar'}`;

  const totalText = `Total: ${formatCurrency(totalAmount)}`;
  const footer = `Aguardo a confirmação do meu pedido!`;

  return [
    header,
    '',
    itemsText,
    '',
    generalObs,
    deliverySection,
    paymentText,
    '',
    totalText,
    '',
    footer,
  ].join('\n');
}

export function openWhatsAppOrder(
  cartItems: CartItem[],
  checkoutData: OrderCheckoutData,
  totalAmount: number
): { message: string; url: string } {
  const message = generateWhatsAppMessage(cartItems, checkoutData, totalAmount);
  const encodedText = encodeURIComponent(message);
  const url = `https://wa.me/${STORE_INFO.whatsappRaw}?text=${encodedText}`;
  
  // Safe redirect in browser
  window.open(url, '_blank', 'noopener,noreferrer');
  
  return { message, url };
}
