import React from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    cartTotalItems,
    cartSubtotal,
    shippingCost,
    taxAmount,
    cartTotal
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className={`fixed inset-y-0 right-0 z-[70] w-full md:w-[400px] bg-gray-950 shadow-xl border-l border-gray-800 transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2 text-white">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-lg font-bold">Your Cart ({cartTotalItems})</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Your cart is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 p-3 bg-gray-900 rounded-lg border border-gray-800">
                <div className="w-20 h-24 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-medium text-sm leading-tight">{item.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">Size: {item.selectedSize}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-gray-950 rounded border border-gray-800">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="p-1 px-2 text-gray-400 hover:text-white transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium text-white w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="p-1 px-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-white font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-800 p-4 bg-gray-900 space-y-3">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Subtotal</span>
              <span>₦{cartSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : `₦${shippingCost.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Estimated Tax (7.5%)</span>
              <span>₦{taxAmount.toLocaleString()}</span>
            </div>
            <div className="pt-3 border-t border-gray-800 flex justify-between text-lg font-bold text-white">
              <span>Total</span>
              <span>₦{cartTotal.toLocaleString()}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full mt-4 bg-white text-black py-3 rounded font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group"
            >
              Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
