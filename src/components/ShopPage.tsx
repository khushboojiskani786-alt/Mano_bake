import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { PromoDeal } from './PromoDeal';
import { Search, SlidersHorizontal, ArrowUpDown, Grid, List, HelpCircle } from 'lucide-react';

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

  // Filter and sort products reactively
  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by category slug
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Filter by search text query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || 
             p.description.toLowerCase().includes(q)
      );
    }

    // 3. Filter by price slider
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

    // 4. Handle Sorting
    if (sortBy === 'bestselling') {
      result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    } else if (sortBy === 'lowToHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'highToLow') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

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
    <div id="shop-container" className="max-w-7xl mx-auto px-4 md:px-6 py-28 bg-secondary min-h-screen">
      {/* 1. Header Hero section */}
      <div className="text-center max-w-xl mx-auto mb-12 select-none">
        <span className="text-[10px] tracking-[0.25em] font-semibold text-accent uppercase block mb-1">Mano Bakes Boutique</span>
        <h1 className="font-serif italic text-3xl sm:text-4xl text-text-dark font-normal">
          The Dessert Display
        </h1>
        <p className="text-xs text-text-light mt-2 italic">
          Indulge in fresh luxury. Freshly baked and customized directly for your Islamabad events.
        </p>
        <div className="h-px w-20 bg-accent/30 mx-auto mt-4" />
      </div>

      {/* Special Limited Offer Deal Section */}
      <PromoDeal />

      {/* 2. Advanced filters and searches control panel wrapper */}
      <div className="bg-[#F5EAE6]/50 border border-primary/20 rounded-lg p-4 sm:p-6 mb-8 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* A. Category pills row */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar pb-1.5 lg:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 text-[10px] tracking-wider uppercase font-bold rounded transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-white border border-primary/30 text-text-dark hover:border-accent'
              }`}
            >
              All Treats
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-2 text-[10px] tracking-wider uppercase font-bold rounded transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-white border border-primary/30 text-text-dark hover:border-accent'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* B. Sort and toggle button block */}
          <div className="flex items-center gap-2 justify-between w-full lg:w-auto border-t lg:border-t-0 pt-3 lg:pt-0">
            {/* Search filter text input */}
            <div className="relative flex-grow sm:flex-grow-0 max-w-xs">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-52 border border-primary/40 rounded bg-white pl-8 pr-3 py-1.8 text-xs italic text-text-dark focus:outline-none focus:border-accent"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-light" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded border transition-all cursor-pointer text-xs uppercase tracking-wide font-bold flex items-center gap-1.5 ${
                showFilters
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white border-primary/30 text-text-dark hover:border-accent'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Price Slider</span>
            </button>

            {/* Price sort pulldown */}
            <div className="flex items-center gap-1 bg-white border border-primary/30 rounded px-2 py-1.5 shadow-xs">
              <ArrowUpDown className="h-4 w-4 text-[#B9896A]" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-text-dark focus:outline-none font-bold uppercase tracking-wider pr-1 cursor-pointer"
              >
                <option value="bestselling">Sort: Bestsellers</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="rating">Rating: Top Picks</option>
              </select>
            </div>
          </div>
        </div>

        {/* C. Expandable Drawer Filter Slider */}
        {showFilters && (
          <div className="border-t border-primary/20 pt-4 mt-1 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded p-4 animate-fadeIn">
            {/* Limit prices inputs */}
            <div>
              <span className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-2">Price Caps</span>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-[9px] text-[#A2877C] uppercase block mb-0.5">Min (Rs.)</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full border border-primary/30 rounded px-3 py-1.5 text-xs text-text-dark"
                  />
                </div>
                <div className="font-bold text-text-light text-xs self-end pb-2">-</div>
                <div className="flex-1">
                  <label className="text-[9px] text-[#A2877C] uppercase block mb-0.5">Max (Rs.)</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full border border-primary/30 rounded px-3 py-1.5 text-xs text-text-dark"
                  />
                </div>
              </div>
            </div>

            {/* Helpful guidelines summary */}
            <div className="flex flex-col justify-end text-right sm:text-left md:text-right">
              <p className="text-[10px] text-text-light leading-relaxed mb-3 italic">
                Active categories: <span className="font-bold text-text-dark capitalize">{selectedCategory}</span>. 
                Showing <span className="font-bold text-text-dark">{processedProducts.length}</span> luxury baked goods.
              </p>
              <button
                onClick={handleResetFilters}
                className="self-end border border-accent hover:bg-accent hover:text-white transition-colors text-[10px] tracking-widest font-bold uppercase px-4 py-1.5 rounded bg-white pr-4 text-accent"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Products List grid and result notices */}
      {processedProducts.length === 0 ? (
        <div className="text-center py-24 bg-[#FFF8F6] rounded-xl border border-primary/20 flex flex-col items-center">
          <HelpCircle className="h-10 w-10 text-accent/50 mb-3" />
          <h3 className="font-serif italic text-lg text-text-dark font-medium">No luxury slices found</h3>
          <p className="text-xs text-text-light mt-1.5 max-w-sm leading-relaxed">
            We couldn't locate are indeed matching that combination of filters. Try raising the price ceiling or searching for a simpler key recipe keyword!
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-6 bg-[#EBCFC8] text-text-dark text-xs tracking-widest uppercase font-bold px-6 py-2.5 rounded shadow hover:bg-white border border-[#EBCFC8]"
          >
            Clear Active Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
          {processedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}

      {/* 4. Simple Pagination blocks */}
      {processedProducts.length > 0 && (
        <div className="flex items-center justify-center gap-3 mt-16 select-none">
          <button className="h-8 w-8 rounded border border-primary/30 text-text-light bg-white text-xs font-semibold cursor-not-allowed uppercase flex items-center justify-center">
            ‹
          </button>
          <button className="h-8 w-8 rounded bg-[#B9896A] text-[#FFF8F6] text-xs font-bold leading-none flex items-center justify-center shadow-xs">
            1
          </button>
          <button className="h-8 w-8 rounded border border-primary/30 text-text-dark bg-white hover:border-accent text-xs font-semibold leading-none flex items-center justify-center transition-colors">
            2
          </button>
          <button className="h-8 w-8 rounded border border-primary/30 text-text-dark bg-white hover:border-accent text-xs font-semibold leading-none flex items-center justify-center transition-colors">
            ›
          </button>
        </div>
      )}
    </div>
  );
};
