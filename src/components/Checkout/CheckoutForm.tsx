import React, { useState } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';

interface CheckoutFormProps {
  onBack: () => void;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onBack, onOrderComplete }) => {
  const { state, dispatch } = useApp();
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'pickup' | 'table'>('pickup');
  const [tableNumber, setTableNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = state.cart.reduce((total, item) => total + item.totalPrice, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    setIsSubmitting(true);

    const order: Order = {
      id: `ord-${Date.now()}`,
      customerName: customerName.trim(),
      items: [...state.cart],
      totalAmount,
      orderType,
      tableNumber: orderType === 'table' ? tableNumber : undefined,
      status: 'pending',
      createdAt: new Date(),
      estimatedTime: Math.ceil(state.cart.length * 3 + Math.random() * 5) // Mock estimation
    };

    // Simulate API call
    setTimeout(() => {
      dispatch({ type: 'ADD_ORDER', payload: order });
      dispatch({ type: 'CLEAR_CART' });
      onOrderComplete(order);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Order Type *
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="orderType"
                    value="pickup"
                    checked={orderType === 'pickup'}
                    onChange={(e) => setOrderType(e.target.value as 'pickup')}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Pickup at Counter</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="orderType"
                    value="table"
                    checked={orderType === 'table'}
                    onChange={(e) => setOrderType(e.target.value as 'table')}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Deliver to Table</span>
                </label>
              </div>
            </div>

            {orderType === 'table' && (
              <div>
                <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Table Number *
                </label>
                <input
                  type="text"
                  id="tableNumber"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="e.g., 5, A3"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !customerName.trim() || (orderType === 'table' && !tableNumber.trim())}
              className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Placing Order...</span>
                </>
              ) : (
                <span>Place Order - ${totalAmount.toFixed(2)}</span>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {state.cart.map((item) => (
                <div key={`${item.id}-${JSON.stringify(item.selectedSize)}`} className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {item.quantity}x {item.name}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {item.selectedSize && `${item.selectedSize.name}`}
                      {item.selectedMilk && `, ${item.selectedMilk.name}`}
                      {item.selectedExtras && item.selectedExtras.length > 0 && 
                        `, ${item.selectedExtras.map(e => e.name).join(', ')}`}
                    </div>
                  </div>
                  <div className="text-gray-900 font-medium">
                    ${item.totalPrice.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-amber-600">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-50 rounded-lg flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-700">
                Estimated preparation time: {Math.ceil(state.cart.length * 3 + 5)} minutes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};