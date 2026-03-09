import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Wishlist = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleQuickAdd = (product) => {
    const defaultSize = product.sizes[0];
    addToCart(product, defaultSize);
    addToast(`${product.name} (${defaultSize}) added to cart`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Heart className="w-20 h-20 text-gray-700 mb-6" strokeWidth={1} />
        <h2 className="text-3xl font-extrabold text-white mb-3">Your Wishlist is Empty</h2>
        <p className="text-gray-400 mb-8 max-w-md">Browse our collections and tap the heart icon to save items you love.</p>
        <Link 
          to="/category/ALL" 
          className="bg-white text-black px-8 py-3 font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-gray-200 transition-colors"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="relative bg-gray-900 py-20 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-extrabold text-white tracking-tight">My Wishlist</h2>
          <p className="mt-4 text-xl text-gray-400 italic">{wishlistItems.length} item{wishlistItems.length !== 1 && 's'} saved</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map(product => (
            <div key={product.id} className="group relative flex flex-col">
              <Link to={`/product/${product.id}`} className="block">
                <div className="w-full bg-gray-800 mb-4 rounded overflow-hidden relative shadow-md">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-[350px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              
              {/* Remove from wishlist */}
              <button 
                onClick={() => {
                  toggleWishlist(product);
                  addToast(`${product.name} removed from wishlist`, 'error');
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-gray-700 hover:bg-red-600/80 transition-all z-10"
              >
                <Heart className="w-5 h-5 text-red-400 fill-red-400" />
              </button>

              <div className="text-center w-full mt-2 flex-1 flex flex-col">
                <h4 className="text-lg font-bold text-gray-100 mb-1 truncate px-2">{product.name}</h4>
                <p className="text-gray-400 font-medium mb-4">₦{product.price.toLocaleString()}</p>
                <button
                  onClick={() => handleQuickAdd(product)}
                  className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-bold text-sm uppercase tracking-wider rounded hover:bg-gray-200 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
