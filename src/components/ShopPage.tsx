import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, HelpCircle } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [sortBy, setSortBy] = useState<'bestselling' | 'lowToHigh' | 'highToLow' | 'rating'>('bestselling');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [showFilters, setShowFilters] = useState(false);

  const processedProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);
    if (sortBy === 'bestselling') result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    else if (sortBy === 'lowToHigh') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'highToLow') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, selectedCategory, searchQuery, minPrice, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMinPrice(0);
    setMaxPrice(10000);
    setSortBy('bestselling');
  };

  return (
    <div id="shop-container" className="max-w-7xl mx-auto px-4 py-8 bg-secondary min-h-screen">

      {/* 1. Header Section */}
      <div className="text-center mb-8 select-none">
        <h1 className="font-serif italic text-2xl text-text-dark font-normal">The Dessert Display</h1>
      </div>

      {/* 2. Control Panel - Mobile Optimized */}
      <div className="bg-white border border-primary/20 rounded-xl p-4 mb-6 shadow-sm">

        {/* Horizontal Category Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-3 no-scrollbar border-b border-primary/10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-1.5 text-[11px] font-bold uppercase rounded-full whitespace-nowrap transition-colors ${selectedCategory === 'all' ? 'bg-[#9d2e5a] text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            All Treats
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-1.5 text-[11px] font-bold uppercase rounded-full whitespace-nowrap transition-colors ${selectedCategory === cat.slug ? 'bg-[#9d2e5a] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search and Sort Row */}
        <div className="flex gap-2 items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-[#9d2e5a]"
            />
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
          </div>
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1.5 bg-white">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-[10px] font-bold uppercase focus:outline-none bg-transparent cursor-pointer"
            >
              <option value="bestselling">Sort: Bestsellers</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {processedProducts.length > 0 ? (
          processedProducts.map((prod) => <ProductCard key={prod.id} product={prod} />)
        ) : (
          <div className="text-center py-10 col-span-full text-xs text-gray-400 italic">No treats found in this category.</div>
        )}
      </div>
    </div>
  );
};