import { AdditionalItem, Product, ProductSize } from '../types';

import heroAcaiImg from '../assets/images/hero_acai_bowl_1791467953656.jpg';
import cupLayeredImg from '../assets/images/acai_cup_layered_1791467964005.jpg';
import creamsImg from '../assets/images/creme_cupuacu_morango_1791467973109.jpg';
import shakeImg from '../assets/images/acai_milkshake_1791467981218.jpg';
import storeLogoImg from '../assets/images/vita_acai_logo_1791468949499.jpg';

export const STORE_LOGO = storeLogoImg;

export const STORE_INFO = {
  name: 'VitaAçaí',
  tagline: 'Monte seu pedido do seu jeito',
  subcategories: 'Açaí · Sorvetes · Cremes',
  rating: 4.9,
  ratingCount: '540+ avaliações',
  deliveryTime: '25-40 min',
  deliveryFee: 5.0,
  minOrder: 15.0,
  whatsappRaw: '559892177138',
  whatsappFormatted: '+55 98 92177-138',
  phoneDisplay: '(98) 92177-138',
  openingHours: 'Todos os dias das 13h00 às 23h30',
  city: 'São Luís - MA',
  freeDeliveryThreshold: 45.0,
  defaultDeliveryFee: 5.0,
  address: 'Av. dos Holandeses, São Luís - MA',
};

export const STANDARD_SIZES: ProductSize[] = [
  { id: '300ml', name: '300ml', volume: '300ml', price: 16.0 },
  { id: '500ml', name: '500ml', volume: '500ml', price: 22.0, isDefault: true },
  { id: '700ml', name: '700ml', volume: '700ml', price: 28.0 },
  { id: '1000ml', name: '1 Litro', volume: '1000ml', price: 38.0 },
];

export const SHAKE_SIZES: ProductSize[] = [
  { id: '400ml', name: '400ml', volume: '400ml', price: 18.0, isDefault: true },
  { id: '600ml', name: '600ml', volume: '600ml', price: 24.0 },
];

export const ICE_CREAM_SIZES: ProductSize[] = [
  { id: '1bola', name: '1 Bola', volume: '120g', price: 8.5 },
  { id: '2bolas', name: '2 Bolas', volume: '240g', price: 15.0, isDefault: true },
  { id: 'pote500', name: 'Pote 500ml', volume: '500ml', price: 27.0 },
];

export const BOTTLE_SIZES: ProductSize[] = [
  { id: '500ml', name: '500ml', volume: '500ml', price: 20.0, isDefault: true },
  { id: '1000ml', name: '1 Litro', volume: '1000ml', price: 36.0 },
];

export const POTE_SIZES: ProductSize[] = [
  { id: '500ml', name: 'Pote 500ml', volume: '500ml', price: 24.0, isDefault: true },
  { id: '1000ml', name: 'Pote 1 Litro', volume: '1000ml', price: 42.0 },
];

export const ALL_ADDITIONALS: AdditionalItem[] = [
  { id: 'granola', name: 'Granola', price: 2.5, category: 'complementos', icon: '🌾' },
  { id: 'banana', name: 'Banana', price: 2.0, category: 'frutas', icon: '🍌' },
  { id: 'morango', name: 'Morango', price: 3.5, category: 'frutas', icon: '🍓' },
  { id: 'kiwi', name: 'Kiwi', price: 3.5, category: 'frutas', icon: '🥝' },
  { id: 'coco_ralado', name: 'Coco ralado', price: 2.0, category: 'complementos', icon: '🥥' },
  { id: 'pacoca', name: 'Paçoca', price: 2.0, category: 'complementos', icon: '🥜' },
  { id: 'confetes', name: 'Confetes', price: 2.5, category: 'complementos', icon: '🍬' },
  { id: 'leite_po', name: 'Leite em pó', price: 2.5, category: 'complementos', icon: '🥛' },
  { id: 'leite_condensado', name: 'Leite condensado', price: 2.0, category: 'caldas', icon: '🍯' },
  { id: 'calda_chocolate', name: 'Calda de chocolate', price: 2.0, category: 'caldas', icon: '🍫' },
  { id: 'nutella', name: 'Nutella', price: 5.0, category: 'caldas', icon: '🌰' },
];

export const PRODUCTS: Product[] = [
  // --- AÇAÍS ---
  {
    id: 'acai-tradicional',
    name: 'Açaí tradicional',
    category: 'acais',
    description: 'Polpa de açaí especial super cremosa, batida com xarope de guaraná de alta qualidade. O puro sabor amazônico.',
    basePrice: 16.0,
    sizes: STANDARD_SIZES,
    image: heroAcaiImg,
    popular: true,
    badge: 'O Tradicional',
    emoji: '🍇',
  },
  {
    id: 'acai-banana-granola',
    name: 'Açaí com banana e granola',
    category: 'acais',
    description: 'A combinação clássica mais amada: açaí aveludado coberto com banana fatiada na hora e granola crocante.',
    basePrice: 18.0,
    sizes: STANDARD_SIZES.map(s => ({ ...s, price: s.price + 2.0 })),
    image: heroAcaiImg,
    popular: true,
    badge: 'Mais Vendido',
    emoji: '🍌',
  },
  {
    id: 'acai-morango',
    name: 'Açaí com morango',
    category: 'acais',
    description: 'Açaí cremoso servido com morangos frescos fatiados, trazendo equilíbrio perfeito entre a doçura e a acidez.',
    basePrice: 19.5,
    sizes: STANDARD_SIZES.map(s => ({ ...s, price: s.price + 3.5 })),
    image: cupLayeredImg,
    popular: true,
    badge: 'Refrescante',
    emoji: '🍓',
  },
  {
    id: 'acai-leite-em-po',
    name: 'Açaí com leite em pó',
    category: 'acais',
    description: 'Generosa camada de leite Ninho em pó que derrete na boca com o açaí geladinho. Um dos favoritos da casa!',
    basePrice: 18.5,
    sizes: STANDARD_SIZES.map(s => ({ ...s, price: s.price + 2.5 })),
    image: cupLayeredImg,
    popular: true,
    badge: 'Queridinho',
    emoji: '🥛',
  },
  {
    id: 'acai-nutella',
    name: 'Açaí com Nutella',
    category: 'acais',
    description: 'Açaí cremoso com uma dose caprichada da autêntica Nutella e creme de avelã com cacau.',
    basePrice: 21.0,
    sizes: STANDARD_SIZES.map(s => ({ ...s, price: s.price + 5.0 })),
    image: heroAcaiImg,
    popular: true,
    badge: 'Sensação',
    emoji: '🍫',
  },
  {
    id: 'acai-pacoca',
    name: 'Açaí com paçoca',
    category: 'acais',
    description: 'Farofinha crocante de paçoca de amendoim artesanal misturada ao nosso açaí geladinho.',
    basePrice: 18.0,
    sizes: STANDARD_SIZES.map(s => ({ ...s, price: s.price + 2.0 })),
    image: cupLayeredImg,
    badge: 'Crocante',
    emoji: '🥜',
  },
  {
    id: 'acai-oreo',
    name: 'Açaí com Oreo',
    category: 'acais',
    description: 'Pedaços crocantes do biscoito Oreo original sobre açaí cremoso. Combinação irresistível!',
    basePrice: 19.0,
    sizes: STANDARD_SIZES.map(s => ({ ...s, price: s.price + 3.0 })),
    image: heroAcaiImg,
    badge: 'Crocante',
    emoji: '🍪',
  },
  {
    id: 'acai-frutas-vermelhas',
    name: 'Açaí com frutas vermelhas',
    category: 'acais',
    description: 'Seleção especial com morangos frescos, amoras e mirtilos, rica em antioxidantes e sabor natural.',
    basePrice: 20.0,
    sizes: STANDARD_SIZES.map(s => ({ ...s, price: s.price + 4.0 })),
    image: creamsImg,
    badge: 'Super Saudável',
    emoji: '🫐',
  },
  {
    id: 'acai-leite-condensado',
    name: 'Açaí com leite condensado',
    category: 'acais',
    description: 'Dose generosa do clássico leite condensado cremoso para quem ama aquele açaí bem docinho.',
    basePrice: 18.0,
    sizes: STANDARD_SIZES.map(s => ({ ...s, price: s.price + 2.0 })),
    image: cupLayeredImg,
    badge: 'Super Doce',
    emoji: '🍯',
  },
  {
    id: 'acai-na-garrafa',
    name: 'Açaí na garrafa',
    category: 'acais',
    description: 'Açaí batido na textura líquida perfeita para beber bem gelado em qualquer momento do dia.',
    basePrice: 20.0,
    sizes: BOTTLE_SIZES,
    image: shakeImg,
    badge: 'Prático',
    emoji: '🍶',
  },
  {
    id: 'acai-no-copo',
    name: 'Açaí no copo',
    category: 'acais',
    description: 'Montado em camadas intercaladas com o seu açaí preferido e complementos para comer em movimento.',
    basePrice: 16.0,
    sizes: STANDARD_SIZES,
    image: cupLayeredImg,
    popular: true,
    badge: 'Para Viagem',
    emoji: '🥤',
  },
  {
    id: 'acai-no-pote-para-viagem',
    name: 'Açaí no pote para viagem',
    category: 'acais',
    description: 'Embalagem térmica selada e reforçada para manter seu açaí na consistência ideal até sua casa.',
    basePrice: 24.0,
    sizes: POTE_SIZES,
    image: heroAcaiImg,
    badge: 'Embalagem Térmica',
    emoji: '📦',
  },

  // --- CREMES ---
  {
    id: 'creme-de-ninho',
    name: 'Creme de Ninho',
    category: 'cremes',
    description: 'Creme aveludado e artesanal feito com leite Ninho integral. Doçura equilibrada e textura ultra macia.',
    basePrice: 17.0,
    sizes: STANDARD_SIZES.map(s => ({ ...s, price: s.price + 1.0 })),
    image: creamsImg,
    popular: true,
    badge: 'Artesanal',
    emoji: '🥛',
  },
  {
    id: 'creme-de-morango',
    name: 'Creme de morango',
    category: 'cremes',
    description: 'Creme suave preparado com morangos naturais e calda suave. Textura cremosa e cor vibrante.',
    basePrice: 17.0,
    sizes: STANDARD_SIZES.map(s => ({ ...s, price: s.price + 1.0 })),
    image: creamsImg,
    badge: 'Frutado',
    emoji: '🍓',
  },
  {
    id: 'creme-de-cupuacu',
    name: 'Creme de cupuaçu',
    category: 'cremes',
    description: 'Legítimo creme de cupuaçu da Amazônia: toque cítrico marcante, textura incrivelmente cremosa.',
    basePrice: 18.0,
    sizes: STANDARD_SIZES.map(s => ({ ...s, price: s.price + 2.0 })),
    image: creamsImg,
    popular: true,
    badge: 'Típico Amazônico',
    emoji: '🥥',
  },
  {
    id: 'creme-de-ovomaltine',
    name: 'Creme de Ovomaltine',
    category: 'cremes',
    description: 'Creme de chocolate aveludado com flocos crocantes de Ovomaltine suíço.',
    basePrice: 18.5,
    sizes: STANDARD_SIZES.map(s => ({ ...s, price: s.price + 2.5 })),
    image: creamsImg,
    badge: 'Super Crocante',
    emoji: '🍫',
  },

  // --- SORVETES ---
  {
    id: 'sorvete-de-chocolate',
    name: 'Sorvete de chocolate',
    category: 'sorvetes',
    description: 'Sorvete artesanal de chocolate meio amargo, textura densa e sabor encorpado de cacau nobre.',
    basePrice: 8.5,
    sizes: ICE_CREAM_SIZES,
    image: creamsImg,
    badge: 'Gelado Nobre',
    emoji: '🍨',
  },
  {
    id: 'sorvete-de-morango',
    name: 'Sorvete de morango',
    category: 'sorvetes',
    description: 'Sorvete tradicional com pedacinhos de morangos selecionados, super refrescante e leve.',
    basePrice: 8.5,
    sizes: ICE_CREAM_SIZES,
    image: creamsImg,
    badge: 'Refrescante',
    emoji: '🍧',
  },
  {
    id: 'sorvete-de-creme',
    name: 'Sorvete de creme',
    category: 'sorvetes',
    description: 'Clássico sorvete de creme com fava de baunilha, suave, delicado e perfeito para combinar.',
    basePrice: 8.5,
    sizes: ICE_CREAM_SIZES,
    image: creamsImg,
    badge: 'Clássico',
    emoji: '🍦',
  },

  // --- MILK-SHAKES ---
  {
    id: 'milk-shake-de-acai',
    name: 'Milk-shake de açaí',
    category: 'milkshakes',
    description: 'Nosso famoso açaí especial batido com leite cremoso e sorvete artesanal. Servido com calda e muito sabor!',
    basePrice: 18.0,
    sizes: SHAKE_SIZES,
    image: shakeImg,
    popular: true,
    badge: 'Campeão da Casa',
    emoji: '🥤',
  },
];

export const CATEGORIES = [
  { id: 'all', label: 'Todos', emoji: '🌟', count: PRODUCTS.length },
  { id: 'acais', label: 'Açaís', emoji: '🍇', count: PRODUCTS.filter(p => p.category === 'acais').length },
  { id: 'cremes', label: 'Cremes', emoji: '🥣', count: PRODUCTS.filter(p => p.category === 'cremes').length },
  { id: 'sorvetes', label: 'Sorvetes', emoji: '🍨', count: PRODUCTS.filter(p => p.category === 'sorvetes').length },
  { id: 'milkshakes', label: 'Milk-shakes', emoji: '🥤', count: PRODUCTS.filter(p => p.category === 'milkshakes').length },
] as const;

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
