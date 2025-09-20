export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  customizations?: {
    sizes?: { name: string; price: number }[];
    milkTypes?: { name: string; price: number }[];
    extras?: { name: string; price: number }[];
  };
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedSize?: { name: string; price: number };
  selectedMilk?: { name: string; price: number };
  selectedExtras?: { name: string; price: number }[];
  totalPrice: number;
  customizationNote?: string;
}

export interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  totalAmount: number;
  orderType: 'pickup' | 'table';
  tableNumber?: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: Date;
  estimatedTime?: number;
}

export interface User {
  id: string;
  name: string;
  role: 'customer' | 'admin';
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed';