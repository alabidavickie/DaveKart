import React from 'react';
import { getCurrentUser, getOrders } from '../utils/db';

const UserDashboard = () => {
  const user = getCurrentUser();
  const allOrders = getOrders();
  const myOrders = allOrders.filter(o => o.userId === user?.email);

  return (
    <div className="min-h-screen bg-transparent py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">My Orders</h2>
          <p className="text-gray-400 mt-2 font-medium">Track and view your recent purchases</p>
        </div>
        <div className="mt-4 sm:mt-0 bg-gray-900 px-4 py-2 rounded shadow-sm border border-gray-700 font-bold text-gray-300">
          Total Orders: <span className="text-white">{myOrders.length}</span>
        </div>
      </div>

      <div className="space-y-6">
        {myOrders.length === 0 ? (
          <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">No orders found</h3>
            <p className="text-gray-400">You haven't placed any orders yet. Start exploring our collections!</p>
          </div>
        ) : (
          myOrders.map(order => (
             <div key={`${order.id}-${order.productId}-${order.size}`} className="bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-800 flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow">
               <img src={order.imageUrl} alt={order.productName} className="w-24 h-32 object-cover rounded border border-gray-700" />
               <div className="flex-1 w-full">
                 <div className="flex flex-col md:flex-row md:justify-between mb-2 gap-2">
                   <h4 className="text-xl font-bold text-gray-100 line-clamp-1">{order.productName}</h4>
                   <span className="self-start inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-green-900/40 text-green-400 border border-green-800">
                     {order.status}
                   </span>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mt-4 border-t border-gray-800 pt-4">
                   <div>
                     <p className="text-gray-500 font-medium uppercase text-xs mb-1">Size & Qty</p>
                     <p className="font-bold text-gray-200">{order.size} (x{order.quantity || 1})</p>
                   </div>
                   <div>
                     <p className="text-gray-500 font-medium uppercase text-xs mb-1">Price</p>
                     <p className="font-bold text-gray-200">₦{order.price.toLocaleString()}</p>
                   </div>
                   <div>
                     <p className="text-gray-500 font-medium uppercase text-xs mb-1">Total</p>
                     <p className="font-bold text-gray-200">₦{(order.itemTotal || order.price).toLocaleString()}</p>
                   </div>
                   <div>
                     <p className="text-gray-500 font-medium uppercase text-xs mb-1">Order ID</p>
                     <p className="font-bold text-gray-200">#{order.id}</p>
                   </div>
                   <div>
                     <p className="text-gray-500 font-medium uppercase text-xs mb-1">Date</p>
                     <p className="font-bold text-gray-200">{new Date(order.date).toLocaleDateString()}</p>
                   </div>
                 </div>
               </div>
             </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
