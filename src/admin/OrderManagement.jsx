import React from 'react';
import { getOrders } from '../utils/db';
import { AdminLayout } from './AdminDashboard';

const OrderManagement = () => {
  const orders = getOrders().sort((a,b) => new Date(b.date) - new Date(a.date));

  const userOrderCounts = orders.reduce((acc, order) => {
    acc[order.userId] = (acc[order.userId] || 0) + 1;
    return acc;
  }, {});

  return (
    <AdminLayout>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Order Management</h2>
        <p className="text-gray-400 mt-2">View all customer orders and trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
        <div className="lg:col-span-1 bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 self-start">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 border-b border-gray-800 pb-2">Orders Per User</h3>
          {Object.keys(userOrderCounts).length === 0 ? (
            <p className="text-gray-500 text-sm italic">No user data yet.</p>
          ) : (
            <ul className="space-y-4">
              {Object.entries(userOrderCounts).map(([email, count]) => (
                <li key={email} className="flex flex-col">
                  <span className="font-medium text-gray-100 truncate text-sm">{email}</span>
                  <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">{count} {count === 1 ? 'Order' : 'Orders'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-3 bg-gray-900 rounded-xl shadow-md border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">All Recent Orders ({orders.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950 border-b border-gray-800">
                  <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">Order ID / Date</th>
                  <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">Customer</th>
                  <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Item Details</th>
                  <th className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-800 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-100">#{o.id}</div>
                      <div className="text-xs text-gray-400 mt-1">{new Date(o.date).toLocaleDateString()}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-100 font-medium truncate">{o.userId}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-100 truncate">{o.productName}</div>
                      <div className="text-xs text-gray-400 mt-1">Size: <span className="font-bold text-gray-300">{o.size}</span> | Qty: <span className="font-bold text-gray-300">{o.quantity || 1}</span> • ₦{(o.itemTotal || o.price).toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-green-900/40 text-green-400 border border-green-800">
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-gray-500 text-sm">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderManagement;
