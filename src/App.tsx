import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { CustomerMenu } from './pages/CustomerMenu';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { AdminPage } from './pages/AdminPage';
import { mockOrders } from './data/mockData';
import { Order } from './types';

type AppView = 'menu' | 'checkout' | 'confirmation' | 'admin';

function AppContent() {
  const [currentView, setCurrentView] = useState<AppView>('menu');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleCheckout = () => {
    setCurrentView('checkout');
  };

  const handleOrderComplete = (order: Order) => {
    setCompletedOrder(order);
    setCurrentView('confirmation');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
    setCompletedOrder(null);
  };

  const handleAdminClick = () => {
    setCurrentView('admin');
  };

  const handleBackFromCheckout = () => {
    setCurrentView('menu');
  };

  return (
    <div className="App">
      {currentView === 'menu' && (
        <CustomerMenu 
          onCheckout={handleCheckout}
          onAdminClick={handleAdminClick}
        />
      )}
      
      {currentView === 'checkout' && (
        <CheckoutPage 
          onBack={handleBackFromCheckout}
          onOrderComplete={handleOrderComplete}
        />
      )}
      
      {currentView === 'confirmation' && completedOrder && (
        <OrderConfirmation 
          order={completedOrder}
          onBackToMenu={handleBackToMenu}
        />
      )}
      
      {currentView === 'admin' && (
        <AdminPage onBackToMenu={handleBackToMenu} />
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;