import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orders, cartTotal, orderId } = location.state || {};

  if (!orders || orders.length === 0) return <div className="min-h-screen flex items-center justify-center text-xl text-gray-400">No order details found.</div>;

  return (
    <div className="min-h-screen bg-transparent py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-900 rounded-xl shadow-lg border border-gray-700 p-8 text-center relative overflow-hidden">
        {/* Success Icon Badge */}
        <div className="absolute top-0 inset-x-0 h-2 bg-green-500"></div>
        
        <div className="w-20 h-20 bg-green-900/30 border border-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        
        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Order Confirmed!</h2>
        <p className="text-gray-400 mb-8">Thank you for shopping with DaveKart. Your order has been placed successfully.</p>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8 text-left border border-gray-700">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">Order Summary</h3>
          
          <div className="max-h-48 overflow-y-auto mb-4 space-y-3">
            {orders.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img src={item.imageUrl} alt={item.productName} className="w-12 h-16 object-cover rounded shadow-sm" />
                <div className="flex-1">
                  <p className="font-bold text-gray-100 text-sm">{item.productName}</p>
                  <p className="text-xs text-gray-400 font-medium">Size: {item.size} | Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-gray-300">₦{item.itemTotal.toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm border-t border-gray-700 pt-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Order Ref:</span>
              <span className="font-medium text-gray-200">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Items:</span>
              <span className="font-medium text-gray-200">{orders.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="font-bold text-green-400 uppercase tracking-wider">{orders[0].status}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-gray-100 font-bold">Total Paid:</span>
              <span className="font-bold text-gray-100 text-lg">₦{cartTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Link to="/dashboard" className="block w-full bg-gray-800 border-2 border-gray-700 text-white font-bold py-4 px-6 rounded hover:bg-gray-700 transition-colors tracking-wide uppercase shadow-sm">
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
