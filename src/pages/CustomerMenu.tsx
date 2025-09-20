import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { CategoryFilter } from '../components/Menu/CategoryFilter';
import { MenuCard } from '../components/Menu/MenuCard';
import { CartSidebar } from '../components/Cart/CartSidebar';
import { useApp } from '../context/AppContext';
import { mockMenuItems, categories } from '../data/mockData';
import { MenuItem } from '../types';

interface CustomerMenuProps {
  onCheckout: () => void;
  onAdminClick: () => void;
}

export const CustomerMenu: React.FC<CustomerMenuProps> = ({ onCheckout, onAdminClick }) => {
  const { state, dispatch } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Initialize menu
  useEffect(() => {
    dispatch({ type: 'SET_MENU', payload: mockMenuItems });
  }, [dispatch]);

  const filteredItems = state.menu.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: MenuItem, customizations: any) => {
    const cartItem = {
      ...item,
      quantity: customizations.quantity,
      selectedSize: customizations.selectedSize,
      selectedMilk: customizations.selectedMilk,
      selectedExtras: customizations.selectedExtras || [],
      totalPrice: customizations.totalPrice,
    };
    
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    onCheckout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        onAdminClick={onAdminClick}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Brew & Bite
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted coffee, premium teas, and freshly baked pastries. 
            Order now for pickup or table service.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fresh Daily, Served with Love
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              All our pastries are baked fresh every morning, and our coffee beans are 
              roasted weekly to ensure the perfect cup every time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">☕</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Premium Coffee</h3>
                <p className="text-sm text-gray-600">Ethically sourced, expertly roasted</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🥐</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Fresh Pastries</h3>
                <p className="text-sm text-gray-600">Baked daily with organic ingredients</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Quick Service</h3>
                <p className="text-sm text-gray-600">Order ahead for faster pickup</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
};