import React from 'react';
import { Coffee, ShoppingCart, User, Menu as MenuIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onMenuToggle?: () => void;
  showCart?: boolean;
  onCartClick?: () => void;
  showAdmin?: boolean;
  onAdminClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  showCart = true,
  onCartClick,
  showAdmin = true,
  onAdminClick
}) => {
  const { state } = useApp();

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg">
              <Coffee className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Brew & Bite</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Artisan Coffee & Fresh Pastries</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu toggle */}
            {onMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <MenuIcon className="w-5 h-5" />
              </button>
            )}

            {/* Cart */}
            {showCart && onCartClick && (
              <button
                onClick={onCartClick}
                className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            )}

            {/* Admin */}
            {showAdmin && onAdminClick && (
              <button
                onClick={onAdminClick}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};