import React from 'react';
import { Header } from '../components/Layout/Header';
import { CheckoutForm } from '../components/Checkout/CheckoutForm';
import { Order } from '../types';

interface CheckoutPageProps {
  onBack: () => void;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBack, onOrderComplete }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showCart={false} showAdmin={false} />
      <main className="py-8">
        <CheckoutForm onBack={onBack} onOrderComplete={onOrderComplete} />
      </main>
    </div>
  );
};