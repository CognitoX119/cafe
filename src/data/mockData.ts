import { MenuItem, Order } from '../types';

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Espresso',
    description: 'Rich and bold single shot of espresso',
    price: 2.50,
    category: 'Coffee',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    available: true,
    customizations: {
      sizes: [
        { name: 'Single', price: 0 },
        { name: 'Double', price: 1.50 }
      ]
    }
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'Perfect balance of espresso, steamed milk, and foam',
    price: 4.25,
    category: 'Coffee',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    available: true,
    customizations: {
      sizes: [
        { name: 'Small', price: 0 },
        { name: 'Medium', price: 0.75 },
        { name: 'Large', price: 1.50 }
      ],
      milkTypes: [
        { name: 'Whole Milk', price: 0 },
        { name: 'Almond Milk', price: 0.60 },
        { name: 'Oat Milk', price: 0.60 },
        { name: 'Coconut Milk', price: 0.50 }
      ],
      extras: [
        { name: 'Extra Shot', price: 1.50 },
        { name: 'Vanilla Syrup', price: 0.50 },
        { name: 'Caramel Syrup', price: 0.50 }
      ]
    }
  },
  {
    id: '3',
    name: 'Latte',
    description: 'Smooth espresso with steamed milk and light foam',
    price: 4.75,
    category: 'Coffee',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg',
    available: true,
    customizations: {
      sizes: [
        { name: 'Small', price: 0 },
        { name: 'Medium', price: 0.75 },
        { name: 'Large', price: 1.50 }
      ],
      milkTypes: [
        { name: 'Whole Milk', price: 0 },
        { name: 'Almond Milk', price: 0.60 },
        { name: 'Oat Milk', price: 0.60 },
        { name: 'Coconut Milk', price: 0.50 }
      ],
      extras: [
        { name: 'Extra Shot', price: 1.50 },
        { name: 'Vanilla Syrup', price: 0.50 },
        { name: 'Hazelnut Syrup', price: 0.50 }
      ]
    }
  },
  {
    id: '4',
    name: 'Earl Grey Tea',
    description: 'Classic black tea with bergamot essence',
    price: 3.25,
    category: 'Tea',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
    available: true,
    customizations: {
      sizes: [
        { name: 'Cup', price: 0 },
        { name: 'Pot', price: 1.50 }
      ],
      extras: [
        { name: 'Honey', price: 0.25 },
        { name: 'Lemon', price: 0.25 }
      ]
    }
  },
  {
    id: '5',
    name: 'Green Tea',
    description: 'Light and refreshing premium green tea',
    price: 3.00,
    category: 'Tea',
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    available: true,
    customizations: {
      sizes: [
        { name: 'Cup', price: 0 },
        { name: 'Pot', price: 1.50 }
      ],
      extras: [
        { name: 'Honey', price: 0.25 },
        { name: 'Mint', price: 0.25 }
      ]
    }
  },
  {
    id: '6',
    name: 'Croissant',
    description: 'Buttery, flaky pastry baked fresh daily',
    price: 3.50,
    category: 'Pastries',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
    available: true
  },
  {
    id: '7',
    name: 'Chocolate Muffin',
    description: 'Rich chocolate muffin with chocolate chips',
    price: 4.25,
    category: 'Pastries',
    image: 'https://images.pexels.com/photos/2067436/pexels-photo-2067436.jpeg',
    available: true
  },
  {
    id: '8',
    name: 'Avocado Toast',
    description: 'Smashed avocado on artisan sourdough with lime',
    price: 8.50,
    category: 'Food',
    image: 'https://images.pexels.com/photos/1209029/pexels-photo-1209029.jpeg',
    available: true,
    customizations: {
      extras: [
        { name: 'Poached Egg', price: 2.00 },
        { name: 'Cherry Tomatoes', price: 1.50 },
        { name: 'Feta Cheese', price: 1.00 }
      ]
    }
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ord-1',
    customerName: 'John Doe',
    items: [
      {
        ...mockMenuItems[1],
        quantity: 2,
        selectedSize: { name: 'Medium', price: 0.75 },
        selectedMilk: { name: 'Oat Milk', price: 0.60 },
        totalPrice: 11.70
      }
    ],
    totalAmount: 11.70,
    orderType: 'table',
    tableNumber: '5',
    status: 'preparing',
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
    estimatedTime: 8
  },
  {
    id: 'ord-2',
    customerName: 'Jane Smith',
    items: [
      {
        ...mockMenuItems[0],
        quantity: 1,
        selectedSize: { name: 'Double', price: 1.50 },
        totalPrice: 4.00
      },
      {
        ...mockMenuItems[6],
        quantity: 1,
        totalPrice: 4.25
      }
    ],
    totalAmount: 8.25,
    orderType: 'pickup',
    status: 'ready',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    estimatedTime: 2
  }
];

export const categories = ['All', 'Coffee', 'Tea', 'Pastries', 'Food'];