import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '../../types';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, customizations: any) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(item.customizations?.sizes?.[0]);
  const [selectedMilk, setSelectedMilk] = useState(item.customizations?.milkTypes?.[0]);
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showCustomizations, setShowCustomizations] = useState(false);

  const calculatePrice = () => {
    let price = item.price;
    if (selectedSize) price += selectedSize.price;
    if (selectedMilk) price += selectedMilk.price;
    selectedExtras.forEach(extra => price += extra.price);
    return price * quantity;
  };

  const handleExtraToggle = (extra: { name: string; price: number }) => {
    setSelectedExtras(prev => {
      const exists = prev.find(e => e.name === extra.name);
      if (exists) {
        return prev.filter(e => e.name !== extra.name);
      } else {
        return [...prev, extra];
      }
    });
  };

  const handleAddToCart = () => {
    onAddToCart(item, {
      quantity,
      selectedSize,
      selectedMilk,
      selectedExtras,
      totalPrice: calculatePrice()
    });
    setQuantity(1);
    setShowCustomizations(false);
  };

  const hasCustomizations = item.customizations && (
    item.customizations.sizes ||
    item.customizations.milkTypes ||
    item.customizations.extras
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Unavailable</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">{item.name}</h3>
          <span className="text-lg font-bold text-amber-600 ml-2">
            ${calculatePrice().toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

        {/* Customizations */}
        {hasCustomizations && (
          <div className="mb-4">
            {!showCustomizations ? (
              <button
                onClick={() => setShowCustomizations(true)}
                className="text-amber-600 text-sm font-medium hover:text-amber-700 transition-colors"
              >
                Customize
              </button>
            ) : (
              <div className="space-y-3">
                {/* Sizes */}
                {item.customizations?.sizes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {item.customizations.sizes.map((size) => (
                        <button
                          key={size.name}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            selectedSize?.name === size.name
                              ? 'bg-amber-100 text-amber-700 border border-amber-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {size.name} {size.price > 0 && `+$${size.price.toFixed(2)}`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Milk Types */}
                {item.customizations?.milkTypes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Milk</label>
                    <div className="flex flex-wrap gap-2">
                      {item.customizations.milkTypes.map((milk) => (
                        <button
                          key={milk.name}
                          onClick={() => setSelectedMilk(milk)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            selectedMilk?.name === milk.name
                              ? 'bg-amber-100 text-amber-700 border border-amber-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {milk.name} {milk.price > 0 && `+$${milk.price.toFixed(2)}`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extras */}
                {item.customizations?.extras && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Extras</label>
                    <div className="flex flex-wrap gap-2">
                      {item.customizations.extras.map((extra) => (
                        <button
                          key={extra.name}
                          onClick={() => handleExtraToggle(extra)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            selectedExtras.find(e => e.name === extra.name)
                              ? 'bg-amber-100 text-amber-700 border border-amber-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {extra.name} +${extra.price.toFixed(2)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Quantity and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!item.available}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};