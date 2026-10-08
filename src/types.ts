export type Category = 'acais' | 'cremes' | 'sorvetes' | 'milkshakes';

export interface ProductSize {
  id: string;
  name: string;
  volume?: string;
  price: number;
  isDefault?: boolean;
}

export interface AdditionalItem {
  id: string;
  name: string;
  price: number;
  category?: 'frutas' | 'complementos' | 'caldas';
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  basePrice: number;
  image: string;
  sizes: ProductSize[];
  popular?: boolean;
  badge?: string;
  emoji?: string;
}

export interface CartItem {
  id: string; // unique item uuid in cart
  product: Product;
  size: ProductSize;
  additionals: AdditionalItem[];
  quantity: number;
  notes?: string;
  unitPrice: number;
  itemTotal: number;
}

export interface OrderCheckoutData {
  customerName: string;
  observation: string;
  deliveryMethod: 'delivery' | 'pickup';
  address?: string;
  neighborhood?: string;
  paymentMethod: 'pix' | 'cartao' | 'dinheiro';
  changeFor?: string;
}
