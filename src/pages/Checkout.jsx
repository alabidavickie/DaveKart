import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getOrders, setOrders } from '../utils/db';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, shippingCost, taxAmount, clearCart } = useCart();
  const [amount, setAmount] = useState('');

  if (cartItems.length === 0) return <div className="min-h-screen flex items-center justify-center text-xl text-gray-400">Your cart is empty.</div>;

  const handlePayment = (e) => {
    e.preventDefault();
    if (Number(amount) !== cartTotal) {
      alert(`Invalid amount. Please enter exactly ₦${cartTotal.toLocaleString()}`);
      return;
    }
    
    const user = getCurrentUser();
    const orderId = 'ORD' + Date.now().toString().slice(-6);
    
    const newOrders = cartItems.map(item => ({
      id: orderId, // Group items under same order ID
      userId: user.email,
      productId: item.id,
      productName: item.name,
      imageUrl: item.imageUrl,
      size: item.selectedSize,
      quantity: item.quantity,
      price: item.price,
      itemTotal: item.price * item.quantity,
      date: new Date().toISOString(),
      status: 'Confirmed'
    }));
    
    const orders = getOrders();
    setOrders([...orders, ...newOrders]);
    clearCart(); // Empty the cart context!
    
    // Pass the grouped orders and totals to confirmation
    navigate('/confirmation', { state: { orders: newOrders, cartTotal, orderId } });
  };

  return (
    <div className="min-h-screen bg-transparent py-16 px-4">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
        <div className="border-b border-gray-800 bg-gray-950 p-6 text-center">
          <h2 className="text-2xl font-bold tracking-widest uppercase text-white">Secure Checkout</h2>
        </div>
        
        <div className="p-8 md:p-12">
          {/* Order Summary */}
          <div className="border-b border-gray-800 pb-8 mb-8">
            <h3 className="text-xl font-bold text-gray-100 mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex gap-4 items-center bg-gray-950 p-4 rounded border border-gray-800">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{item.name}</h4>
                    <p className="text-sm text-gray-400">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-gray-400 text-right">
              <p>Shipping: <span className="text-white ml-4">{shippingCost === 0 ? 'Free' : `₦${shippingCost.toLocaleString()}`}</span></p>
              <p>Tax (7.5%): <span className="text-white ml-4">₦{taxAmount.toLocaleString()}</span></p>
              <div className="pt-4 mt-4 border-t border-gray-800">
                <p className="text-xl text-gray-300">Total to Pay: <span className="text-3xl font-extrabold text-white ml-4">₦{cartTotal.toLocaleString()}</span></p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handlePayment} className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-100 mb-2">Dummy Payment System</h3>
              <p className="text-sm text-gray-400">Please enter exactly <strong className="text-white">₦{cartTotal.toLocaleString()}</strong> to complete the order successfully.</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">Enter Amount (₦)</label>
              <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                required
                className="w-full px-5 py-4 border-2 border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:border-white transition-colors text-lg"
                placeholder="e.g. 15000"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-white text-black font-bold py-4 px-6 rounded hover:bg-gray-200 transition-colors tracking-wide uppercase shadow-md"
            >
              Pay Securely
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
