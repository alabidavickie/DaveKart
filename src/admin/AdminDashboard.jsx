import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getOrders, getUsers } from '../utils/db';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-transparent flex flex-col md:flex-row">
      <div className="w-full md:w-64 bg-gray-950 shadow-md border-r border-gray-800 md:h-screen md:sticky top-0 p-6 flex flex-col">
        <h2 className="text-xl font-bold tracking-tight text-white mb-8 border-b-2 border-white pb-4 inline-block self-start">DaveKart Admin</h2>
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
          <Link to="/admin" className={`px-4 py-3 rounded whitespace-nowrap font-medium transition-colors ${isActive('/admin') ? 'bg-white text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            Dashboard
          </Link>
          <Link to="/admin/products" className={`px-4 py-3 rounded whitespace-nowrap font-medium transition-colors ${isActive('/admin/products') ? 'bg-white text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            Products
          </Link>
          <Link to="/admin/orders" className={`px-4 py-3 rounded whitespace-nowrap font-medium transition-colors ${isActive('/admin/orders') ? 'bg-white text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            Orders
          </Link>
        </nav>
      </div>
      <div className="flex-1 p-4 sm:p-8 lg:p-12 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const orders = getOrders();
  const users = getUsers();
  const sales = orders.reduce((sum, o) => sum + o.price, 0);
  const stats = { users: users.length, orders: orders.length, sales };

  return (
    <AdminLayout>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Overview Dashboard</h2>
        <p className="text-gray-400 mt-2">Metrics and statistics for DaveKart</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-900 p-8 rounded-xl shadow-md border border-gray-700 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 bg-gray-800 text-gray-300 rounded-full flex items-center justify-center mb-4">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Users</h3>
          <p className="text-4xl font-extrabold text-white">{stats.users}</p>
        </div>
        
        <div className="bg-gray-900 p-8 rounded-xl shadow-md border border-gray-700 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 bg-gray-800 text-gray-300 rounded-full flex items-center justify-center mb-4">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Orders</h3>
          <p className="text-4xl font-extrabold text-white">{stats.orders}</p>
        </div>
        
        <div className="bg-gray-900 p-8 rounded-xl shadow-md border border-gray-700 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 bg-gray-800 text-gray-300 rounded-full flex items-center justify-center mb-4">
             <span className="text-xl font-bold">₦</span>
          </div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Revenue</h3>
          <p className="text-4xl font-extrabold text-white">₦{stats.sales.toLocaleString()}</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
export { AdminLayout };
