import React, { useState } from 'react';
import { getProducts, setProducts } from '../utils/db';
import { AdminLayout } from './AdminDashboard';

const ProductManagement = () => {
  const [products, setProductList] = useState(() => getProducts());
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'MEN', price: '', imageUrl: '', sizes: 'S,M,L' });

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    setProductList(updated);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const added = {
      ...newProduct,
      id: 'p' + Date.now().toString(),
      price: Number(newProduct.price),
      sizes: newProduct.sizes.split(',').map(s => s.trim())
    };
    const updated = [...products, added];
    setProducts(updated);
    setProductList(updated);
    setIsAdding(false);
    setNewProduct({ name: '', category: 'MEN', price: '', imageUrl: '', sizes: 'S,M,L' });
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Product Management</h2>
          <p className="text-gray-400 mt-1">Manage DaveKart inventory and catalog.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)} 
            className="bg-white text-black px-5 py-2.5 rounded font-bold hover:bg-gray-200 transition-colors shadow-sm self-start sm:self-auto"
          >
            + Add Product
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-gray-900 p-8 rounded-xl shadow-md border border-gray-700 mb-10 max-w-3xl">
          <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-4">Add New Product</h3>
          <form onSubmit={handleAdd} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm font-bold text-gray-300 mb-2">Product Name</label>
                 <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-white transition-colors" placeholder="e.g. Classic Spring Jacket" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-300 mb-2">Category</label>
                 <select required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-white transition-colors">
                   <option value="MEN">MEN</option>
                   <option value="WOMEN">WOMEN</option>
                   <option value="KID">KID</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-300 mb-2">Price (₦)</label>
                 <input type="number" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-white transition-colors" placeholder="e.g. 15000" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-300 mb-2">Sizes (comma separated)</label>
                 <input type="text" required value={newProduct.sizes} onChange={e => setNewProduct({...newProduct, sizes: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-white transition-colors" placeholder="e.g. S,M,L,XL" />
              </div>
            </div>
            <div>
               <label className="block text-sm font-bold text-gray-300 mb-2">Image URL</label>
               <input type="url" required value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-white transition-colors" placeholder="https://images.unsplash.com/..." />
            </div>
            
            <div className="flex gap-4 pt-4 border-t border-gray-800">
              <button type="submit" className="bg-white text-black px-6 py-2.5 rounded font-bold hover:bg-gray-200 transition-colors">Save Product</button>
              <button type="button" onClick={() => setIsAdding(false)} className="bg-transparent text-gray-300 border border-gray-600 px-6 py-2.5 rounded font-medium hover:bg-gray-800 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-gray-900 text-white rounded-xl shadow-md border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950 border-b border-gray-800">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Image</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Product Name</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Price (₦)</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-800 transition-colors">
                  <td className="py-4 px-6">
                    <img src={p.imageUrl} alt={p.name} className="w-12 h-16 object-cover rounded border border-gray-700" />
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-100">{p.name}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-bold tracking-wider">{p.category}</span>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-100">₦{p.price.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="text-red-400 font-medium hover:text-red-300 hover:underline transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500">No products found. Add some!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductManagement;
