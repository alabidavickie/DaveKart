import React, { useState, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getProducts } from '../utils/db';
import ProductFilterSidebar from '../components/ProductFilterSidebar';

const Category = () => {
  const { type } = useParams();
  const location = useLocation();
  const allProducts = getProducts();
  
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  // Filter States — initialized from the URL param
  const [selectedCategories, setSelectedCategories] = useState(type !== 'ALL' ? [type] : []);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const products = useMemo(() => {
    let filtered = allProducts;
    
    if (type !== 'ALL') {
      filtered = filtered.filter(p => p.category === type);
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );
    }
    
    // Custom Filter: Categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Custom Filter: Price
    filtered = filtered.filter(p => p.price <= maxPrice);

    // Custom Filter: Sizes (Item must have AT LEAST ONE of the selected sizes)
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }
    
    return filtered;
  }, [allProducts, searchQuery, selectedCategories, maxPrice, selectedSizes, type]);

  return (
    <div className="bg-transparent">
      {/* Category Hero */}
      <div className="relative bg-gray-900 py-24 mb-16">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={`https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80`} 
            alt="Category Banner" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-extrabold text-white capitalize tracking-tight drop-shadow-md">
            {searchQuery ? `Search: "${searchQuery}"` : type === 'ALL' ? 'All Collections' : `${type}'s Collection`}
          </h2>
          <p className="mt-4 text-xl text-gray-300 italic max-w-2xl mx-auto">
            {searchQuery 
              ? `Showing results for your search query across our collections.` 
              : `Discover the latest fashion and trending styles exclusively for ${type.toLowerCase()}.`}
          </p>
        </div>
      </div>

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <ProductFilterSidebar 
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
          />
          
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="w-full text-center py-24 bg-gray-900 rounded-xl shadow border border-gray-800">
                <p className="text-gray-400 text-xl font-medium">No products found matching these filters.</p>
                <button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setMaxPrice(200000);
                    setSelectedSizes([]);
                  }}
                  className="mt-6 px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {products.map(product => (
                  <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col items-center">
                    <div className="w-full bg-gray-800 mb-4 rounded overflow-hidden relative shadow-md">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-[350px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-center font-medium">View Details</p>
                      </div>
                    </div>
                    <div className="text-center w-full mt-2">
                      <h4 className="text-lg font-bold text-gray-100 mb-1 group-hover:text-gray-400 transition-colors truncate px-2">{product.name}</h4>
                      <p className="text-gray-400 font-medium">₦{product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
