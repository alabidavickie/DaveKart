import React from 'react';

const ProductFilterSidebar = ({ 
  selectedCategories, 
  setSelectedCategories, 
  maxPrice, 
  setMaxPrice, 
  selectedSizes, 
  setSelectedSizes 
}) => {
  const categories = ['MEN', 'WOMEN', 'KID'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(200000);
    setSelectedSizes([]);
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-md border border-gray-700 p-6 lg:sticky lg:top-28 h-fit w-full lg:w-64 flex-shrink-0">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-white">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-xs font-semibold text-gray-400 hover:text-white uppercase tracking-wider transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Categories Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-white focus:ring-0 focus:ring-offset-0 cursor-pointer"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors capitalize">
                {category.toLowerCase()}'s
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Max Price</h4>
        <div className="flex justify-between text-xs text-gray-500 font-bold mb-2">
          <span>₦0</span>
          <span className="text-white">₦{maxPrice.toLocaleString()}</span>
        </div>
        <input 
          type="range" 
          min="5000" 
          max="200000" 
          step="5000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-white"
        />
      </div>

      {/* Size Filter */}
      <div>
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Sizes</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`w-10 h-10 flex items-center justify-center rounded text-sm font-bold border transition-colors ${
                selectedSizes.includes(size)
                  ? 'bg-white text-black border-white'
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilterSidebar;
