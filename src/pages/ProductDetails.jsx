import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { getProducts } from '../utils/db';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const allProducts = getProducts();
  const product = allProducts.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) return <div className="min-h-screen flex items-center justify-center text-xl text-gray-400">Loading...</div>;

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast('Please select a size first', 'error');
      return;
    }
    addToCart(product, selectedSize);
    addToast(`${product.name} (${selectedSize}) added to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (wishlisted) {
      addToast(`${product.name} removed from wishlist`, 'error');
    } else {
      addToast(`${product.name} added to wishlist`);
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-gray-800 rounded p-8 w-full max-w-lg shadow-md border border-gray-700 relative">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded hover:scale-105 transition-transform duration-500"
            />
            <button
              onClick={handleToggleWishlist}
              className={`absolute top-4 right-4 p-3 rounded-full border transition-all shadow-lg ${
                wishlisted 
                  ? 'bg-red-500/20 border-red-500 text-red-400'
                  : 'bg-black/50 backdrop-blur-sm border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-400'
              }`}
            >
              <Heart className={`w-6 h-6 ${wishlisted ? 'fill-red-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-gray-100 mb-4">{product.name}</h2>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-3xl font-bold text-gray-300">₦{product.price.toLocaleString()}</h3>
            <span className="text-sm font-medium text-green-400 bg-green-900/40 px-3 py-1 rounded-full border border-green-800">In Stock</span>
          </div>
          
          <p className="text-gray-400 mb-8 leading-relaxed">
            Experience premium quality with our {product.name}. Designed to offer maximum comfort and a standout look, this is a must-have piece for your wardrobe collection. Part of our exclusive {product.category} selection.
          </p>

          <div className="mb-10">
            <h4 className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-4">Select Size</h4>
            <div className="flex flex-wrap gap-4">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 flex items-center justify-center rounded border-2 font-medium transition-all duration-200 ${
                    selectedSize === size 
                      ? 'border-white bg-white text-black shadow-md transform scale-105' 
                      : 'border-gray-600 text-gray-300 bg-gray-900 hover:border-gray-400 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-white text-black px-10 py-4 font-bold tracking-wide uppercase hover:bg-gray-200 transition-colors rounded disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Add to Cart
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`px-5 py-4 rounded border-2 transition-all ${
                wishlisted
                  ? 'border-red-500 text-red-400 bg-red-500/10'
                  : 'border-gray-600 text-gray-400 hover:border-red-400 hover:text-red-400'
              }`}
            >
              <Heart className={`w-6 h-6 ${wishlisted ? 'fill-red-400' : ''}`} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-gray-800 grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-400">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Authentic Product</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-gray-400">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-gray-400">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              <span>Returns Policy</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-gray-400">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
              <span>Free Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-16 border-t border-gray-800">
          <h3 className="text-3xl font-bold text-gray-100 border-b-2 border-gray-500 inline-block pb-2 mb-10">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map(related => (
              <Link to={`/product/${related.id}`} key={related.id} className="group block">
                <div className="relative overflow-hidden bg-gray-800 mb-4 rounded shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={related.imageUrl} 
                    alt={related.name} 
                    className="w-full h-[350px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex justify-between items-center px-1">
                  <div>
                    <h4 className="text-lg font-bold text-gray-100 group-hover:text-gray-400 transition-colors">{related.name}</h4>
                    <p className="text-gray-400 mt-1 font-semibold">₦{related.price.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
