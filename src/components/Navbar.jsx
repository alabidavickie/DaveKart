import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ShoppingBag, Search, Heart, Menu, X } from 'lucide-react';
import { getCurrentUser, setCurrentUser } from '../utils/db';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { setIsCartOpen, cartTotalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/ALL?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-white text-black text-xs font-bold tracking-widest uppercase py-2 text-center border-b border-gray-200 hidden sm:block">
        Free express delivery on orders over ₦100,000 &bull; Easy Returns
      </div>
      
      {/* Main Navbar */}
      <nav className="backdrop-blur-xl bg-gray-950/85 shadow-lg border-b border-gray-800 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 group" onClick={closeMobile}>
                <ShoppingBag className="h-8 w-8 text-white group-hover:text-gray-300 transition-colors" strokeWidth={1.5} />
                <span className="font-extrabold text-2xl tracking-widest text-white uppercase">DaveKart<span className="text-gray-500">.</span></span>
              </Link>
            </div>

            {/* Main Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-10">
              <Link to="/" className="text-gray-300 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors relative group">
                Home
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/category/MEN" className="text-gray-300 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors relative group">
                Men
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/category/WOMEN" className="text-gray-300 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors relative group">
                Women
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/category/KID" className="text-gray-300 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors relative group">
                Kids
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </Link>
            </div>

            {/* Search (Desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative mx-4 flex-1 max-w-sm">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-11 pr-4 py-2.5 border border-gray-800 rounded-full leading-5 bg-gray-900/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-900 focus:border-gray-600 focus:ring-0 sm:text-sm transition-all duration-300"
                  placeholder="Search for products..."
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-gray-800/50 transition-colors group">
                <Heart className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
                {wishlistItems.length > 0 && (
                  <span className="absolute right-0 top-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-gray-950">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-gray-800/50 transition-colors group cursor-pointer"
              >
                <ShoppingBag className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
                {cartTotalItems > 0 && (
                  <span className="absolute right-0 top-0 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-gray-950">
                    {cartTotalItems}
                  </span>
                )}
              </button>

              <div className="h-6 w-px bg-gray-800 hidden sm:block"></div>

              {user ? (
                <>
                  <div className="hidden lg:block text-right">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Welcome</p>
                    <p className="text-xs text-gray-300 font-bold truncate max-w-[100px]">{user.email.split('@')[0]}</p>
                  </div>
                  {user.email === 'admin@davekart.com' ? (
                    <Link to="/admin" className="hidden sm:block text-gray-300 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">Admin</Link>
                  ) : (
                    <Link to="/dashboard" className="hidden sm:block text-gray-300 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">Orders</Link>
                  )}
                  <button onClick={handleLogout} className="flex items-center p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-colors" title="Logout">
                    <LogOut size={20} strokeWidth={1.5} />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hidden sm:block text-gray-300 text-xs uppercase tracking-widest font-bold hover:text-white transition-colors">Log In</Link>
                  <Link to="/signup" className="hidden sm:block bg-white text-black px-5 py-2.5 rounded-sm text-xs font-bold hover:bg-gray-200 transition-colors uppercase tracking-wider">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[500px] border-t border-gray-800' : 'max-h-0'}`}>
          <div className="px-4 py-6 space-y-4 bg-gray-950">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative md:hidden">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 border border-gray-800 rounded-full bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-600 text-sm"
                placeholder="Search for products..."
              />
            </form>

            {/* Mobile Nav Links */}
            <Link to="/" onClick={closeMobile} className="block text-gray-300 hover:text-white font-bold text-sm uppercase tracking-widest py-3 border-b border-gray-800">Home</Link>
            <Link to="/category/MEN" onClick={closeMobile} className="block text-gray-300 hover:text-white font-bold text-sm uppercase tracking-widest py-3 border-b border-gray-800">Men</Link>
            <Link to="/category/WOMEN" onClick={closeMobile} className="block text-gray-300 hover:text-white font-bold text-sm uppercase tracking-widest py-3 border-b border-gray-800">Women</Link>
            <Link to="/category/KID" onClick={closeMobile} className="block text-gray-300 hover:text-white font-bold text-sm uppercase tracking-widest py-3 border-b border-gray-800">Kids</Link>
            <Link to="/wishlist" onClick={closeMobile} className="block text-gray-300 hover:text-white font-bold text-sm uppercase tracking-widest py-3 border-b border-gray-800">Wishlist</Link>
            
            {/* Mobile Auth */}
            {user ? (
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-400">{user.email}</span>
                {user.email === 'admin@davekart.com' ? (
                  <Link to="/admin" onClick={closeMobile} className="text-white font-bold text-xs uppercase tracking-widest">Admin</Link>
                ) : (
                  <Link to="/dashboard" onClick={closeMobile} className="text-white font-bold text-xs uppercase tracking-widest">My Orders</Link>
                )}
              </div>
            ) : (
              <div className="flex gap-4 pt-2">
                <Link to="/login" onClick={closeMobile} className="flex-1 text-center py-3 border border-gray-700 text-gray-300 font-bold text-xs uppercase tracking-widest rounded hover:bg-gray-900 transition-colors">Log In</Link>
                <Link to="/signup" onClick={closeMobile} className="flex-1 text-center py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-gray-200 transition-colors">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
