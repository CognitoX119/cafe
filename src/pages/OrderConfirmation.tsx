import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, Coffee } from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { Order, OrderStatus } from '../types';

interface OrderConfirmationProps {
  order: Order;
  onBackToMenu: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onBackToMenu }) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);
  const [estimatedTime, setEstimatedTime] = useState(order.estimatedTime || 15);

  useEffect(() => {
    // Simulate status updates for demo
    const intervals: NodeJS.Timeout[] = [];

    if (currentStatus === 'pending') {
      intervals.push(setTimeout(() => {
        setCurrentStatus('preparing');
      }, 3000));
    }

    if (currentStatus === 'preparing') {
      intervals.push(setTimeout(() => {
        setCurrentStatus('ready');
        setEstimatedTime(0);
      }, estimatedTime * 60 * 1000 * 0.8)); // 80% of estimated time
    }

    // Countdown timer
    if (estimatedTime > 0 && currentStatus !== 'ready' && currentStatus !== 'completed') {
      const countdownInterval = setInterval(() => {
        setEstimatedTime(prev => Math.max(0, prev - 1));
      }, 60000); // Update every minute
      intervals.push(countdownInterval);
    }

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [currentStatus, estimatedTime]);

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="w-8 h-8 text-yellow-600" />,
          title: 'Order Received',
          description: 'We\'ve received your order and will start preparing it shortly.',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 'preparing':
        return {
          icon: <Coffee className="w-8 h-8 text-blue-600" />,
          title: 'Preparing Your Order',
          description: 'Our baristas are carefully crafting your order.',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 'ready':
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-600" />,
          title: 'Order Ready!',
          description: order.orderType === 'pickup' 
            ? 'Your order is ready for pickup at the counter.' 
            : `Your order is ready and will be delivered to table ${order.tableNumber}.`,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'completed':
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-600" />,
          title: 'Order Completed',
          description: 'Thank you for your order! We hope you enjoyed it.',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      default:
        return {
          icon: <Clock className="w-8 h-8 text-gray-600" />,
          title: 'Processing',
          description: 'Processing your order...',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const statusInfo = getStatusInfo(currentStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showCart={false} showAdmin={false} />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${statusInfo.bgColor} ${statusInfo.borderColor} border-2 mb-4`}>
            {statusInfo.icon}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{statusInfo.title}</h1>
          <p className="text-lg text-gray-600">{statusInfo.description}</p>
        </div>

        {/* Order Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Order Progress</h2>
            <span className="text-sm text-gray-500">#{order.id.slice(-6)}</span>
          </div>

          <div className="space-y-4">
            {['pending', 'preparing', 'ready'].map((status, index) => {
              const isActive = currentStatus === status;
              const isCompleted = ['preparing', 'ready', 'completed'].includes(currentStatus) && status === 'pending' ||
                                ['ready', 'completed'].includes(currentStatus) && status === 'preparing' ||
                                currentStatus === 'completed' && status === 'ready';
              
              return (
                <div key={status} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    isActive ? 'border-amber-500 bg-amber-500 text-white' :
                    isCompleted ? 'border-green-500 bg-green-500 text-white' :
                    'border-gray-300 bg-white text-gray-400'
                  }`}>
                    {isCompleted || isActive ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className={`text-sm font-medium ${
                      isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {status === 'pending' && 'Order Received'}
                      {status === 'preparing' && 'Preparing'}
                      {status === 'ready' && 'Ready for Pickup/Delivery'}
                    </p>
                    {isActive && estimatedTime > 0 && (
                      <p className="text-sm text-gray-500">
                        Estimated time: {estimatedTime} minutes
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Customer Name:</span>
              <span className="font-medium">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Type:</span>
              <span className="font-medium capitalize">
                {order.orderType} {order.tableNumber && `(Table ${order.tableNumber})`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Time:</span>
              <span className="font-medium">
                {order.createdAt.toLocaleTimeString()} 
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-900 mb-3">Items Ordered</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {item.quantity}x {item.name}
                    </div>
                    {(item.selectedSize || item.selectedMilk || (item.selectedExtras && item.selectedExtras.length > 0)) && (
                      <div className="text-sm text-gray-600 mt-1">
                        {item.selectedSize && `${item.selectedSize.name}`}
                        {item.selectedMilk && `, ${item.selectedMilk.name}`}
                        {item.selectedExtras && item.selectedExtras.length > 0 && 
                          `, ${item.selectedExtras.map(e => e.name).join(', ')}`}
                      </div>
                    )}
                  </div>
                  <div className="font-medium text-gray-900">
                    ${item.totalPrice.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-amber-600">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <button
            onClick={onBackToMenu}
            className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Order More Items
          </button>
          
          <p className="text-sm text-gray-500">
            Need help? Contact us at (555) 123-4567 or visit our counter.
          </p>
        </div>
      </main>
    </div>
  );
};