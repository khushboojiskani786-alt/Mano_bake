import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Package,
  Layers,
  ShoppingBag,
  Star,
  Check,
  Trash2,
  Plus,
  Image,
  RefreshCw,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import * as db from '../db';
import { Product, Category, Banner, GalleryImage, Order, Review } from '../types';

export const AdminPanel: React.FC = () => {
  const {
    products,
    categories,
    orders,
    reviews,
    banners,
    gallery,
    refreshData,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'orders' | 'reviews' | 'slider' | 'gallery'>('overview');

  // Products CRUD form states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [pId, setPId] = useState('');
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState('cakes');
  const [pPrice, setPPrice] = useState(2500);
  const [pDesc, setPDesc] = useState('');
  const [pImages, setPImages] = useState('');
  const [pFlavors, setPFlavors] = useState('');
  const [pSizes, setPSizes] = useState('');
  const [pBestseller, setPBestseller] = useState(false);
  const [pSeasonal, setPSeasonal] = useState(false);
  const [pStock, setPStock] = useState(true);

  // Categories form states
  const [cName, setCName] = useState('');
  const [cSlug, setCSlug] = useState('');
  const [cImage, setCImage] = useState('');
  const [cDesc, setCDesc] = useState('');

  // Slider banner states
  const [bImage, setBImage] = useState('');
  const [bTitle, setBTitle] = useState('');
  const [bSubtitle, setBSubtitle] = useState('');
  const [bLink, setBLink] = useState('cakes');

  // Gallery form states
  const [gImage, setGImage] = useState('');
  const [gCaption, setGCaption] = useState('');

  // Total sales count
  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const resetProductForm = () => {
    setEditingProduct(null);
    setPId('');
    setPName('');
    setPCategory('cakes');
    setPPrice(2500);
    setPDesc('');
    setPImages('');
    setPFlavors('Classic Vanilla, Double Chocolate, Cream Cheese');
    setPSizes('2 Lbs, 3 Lbs');
    setPBestseller(false);
    setPSeasonal(false);
    setPStock(true);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName) return;

    const urls = pImages.split(',').map(s => s.trim()).filter(Boolean);
    const flavorArr = pFlavors.split(',').map(s => s.trim()).filter(Boolean);
    const sizeArr = pSizes.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: pName,
        category: pCategory,
        price: pPrice,
        description: pDesc,
        images: urls.length ? urls : editingProduct.images,
        flavors: flavorArr.length ? flavorArr : editingProduct.flavors,
        sizes: sizeArr.length ? sizeArr : editingProduct.sizes,
        isBestseller: pBestseller,
        isSeasonal: pSeasonal,
        inStock: pStock
      };
      db.updateProduct(updated);
      showToast('Product file updated successfully.', 'success');
    } else {
      const created: Product = {
        id: `prod_${Date.now()}`,
        name: pName,
        category: pCategory,
        price: pPrice,
        description: pDesc,
        images: urls.length ? urls : ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'],
        flavors: flavorArr,
        sizes: sizeArr,
        rating: 5.0,
        reviewsCount: 0,
        isBestseller: pBestseller,
        isSeasonal: pSeasonal,
        inStock: pStock,
        createdAt: new Date().toISOString()
      };
      db.addProduct(created);
      showToast('New premium product added to display.', 'success');
    }
    refreshData();
    resetProductForm();
  };

  const handleEditProduct = (p: Product) => {
    setEditingProduct(p);
    setPName(p.name);
    setPCategory(p.category);
    setPPrice(p.price);
    setPDesc(p.description);
    setPImages(p.images.join(', '));
    setPFlavors(p.flavors.join(', '));
    setPSizes(p.sizes.join(', '));
    setPBestseller(!!p.isBestseller);
    setPSeasonal(!!p.isSeasonal);
    setPStock(p.inStock);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you indeed sure you want to delete this elite product?')) {
      db.deleteProduct(id);
      refreshData();
      showToast('Product deleted from inventory catalog.', 'info');
    }
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName || !cSlug) return;

    const newCat: Category = {
      id: `cat_${Date.now()}`,
      name: cName,
      slug: cSlug.toLowerCase(),
      image: cImage || 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=600',
      description: cDesc
    };
    db.addCategory(newCat);
    refreshData();
    showToast(`Category "${cName}" added successfully.`, 'success');
    setCName(''); setCSlug(''); setCImage(''); setCDesc('');
  };

  const handleCategoryDelete = (id: string) => {
    if (confirm('Delete this collection filter?')) {
      db.deleteCategory(id);
      refreshData();
      showToast('Category wiped.', 'info');
    }
  };

  const handleReviewApprove = (id: string) => {
    db.approveReview(id);
    refreshData();
    showToast('Customer review approved and published.', 'success');
  };

  const handleReviewDelete = (id: string) => {
    db.deleteReview(id);
    refreshData();
    showToast('Review message declined and deleted.', 'info');
  };

  const handleBannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bImage || !bTitle) return;

    const newBanner: Banner = {
      id: `banner_${Date.now()}`,
      image: bImage,
      title: bTitle,
      subtitle: bSubtitle || 'FRESHLY BAKED HAPPINESS',
      active: true,
      link: bLink
    };

    db.addBanner(newBanner);
    refreshData();
    showToast('Homepage slider banner appended.', 'success');
    setBImage(''); setBTitle(''); setBSubtitle('');
  };

  const handleDeleteBanner = (id: string) => {
    db.deleteBanner(id);
    refreshData();
    showToast('Banner deleted.', 'info');
  };

  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gImage) return;

    const newGallery: GalleryImage = {
      id: `gal_${Date.now()}`,
      image: gImage,
      caption: gCaption || 'Freshly Baked Happiness'
    };
    db.addGalleryImage(newGallery);
    refreshData();
    showToast('Gallery showcase photo added.', 'success');
    setGImage(''); setGCaption('');
  };

  const handleDeleteGallery = (id: string) => {
    db.deleteGalleryImage(id);
    refreshData();
    showToast('Inspiration photo deleted.', 'info');
  };

  return (
    <div id="admin-dashboard-container" className="max-w-7xl mx-auto px-4 md:px-6 py-28 bg-secondary min-h-screen">
      
      {/* Head section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-primary/20 pb-6 mb-10 gap-4 select-none">
        <div>
          <span className="text-[10px] tracking-widest font-bold text-accent uppercase block">Bespoke Portal</span>
          <h1 className="font-serif italic text-2xl sm:text-3xl text-text-dark font-medium leading-tight flex items-center gap-2">
            Mano Bakes Admin Suite
          </h1>
          <p className="text-xs text-text-light italic mt-1.5 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
            Syncing Status: <span className="font-bold text-text-dark">Cloud Ready / Local Engine Sandbox</span>
          </p>
        </div>

        <button
          onClick={() => {
            refreshData();
            showToast('Pulled latest database changes.', 'success');
          }}
          className="bg-white border border-primary/30 text-text-dark p-2 rounded hover:border-accent duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
        >
          <RefreshCw className="h-4 w-4" /> Refresh Lists
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Tab Navigation Column */}
        <div id="admin-navigation-list" className="lg:col-span-3 flex flex-col gap-1.5 bg-white border border-primary/10 rounded-lg p-4 shadow-sm self-start">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-2.5 rounded text-xs tracking-wider uppercase font-bold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#B9896A]/20 text-[#B9896A]' : 'text-text-dark hover:bg-luxury-beige'
            }`}
          >
            <TrendingUp className="h-4 w-4" /> Overview Metrics
          </button>
          
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-2.5 rounded text-xs tracking-wider uppercase font-bold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'products' ? 'bg-[#B9896A]/20 text-[#B9896A]' : 'text-text-dark hover:bg-luxury-beige'
            }`}
          >
            <Package className="h-4 w-4" /> Stock Products
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full text-left px-4 py-2.5 rounded text-xs tracking-wider uppercase font-bold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'categories' ? 'bg-[#B9896A]/20 text-[#B9896A]' : 'text-text-dark hover:bg-luxury-beige'
            }`}
          >
            <Layers className="h-4 w-4" /> Shop Categories
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-2.5 rounded text-xs tracking-wider uppercase font-bold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'bg-[#B9896A]/20 text-[#B9896A]' : 'text-text-dark hover:bg-luxury-beige'
            }`}
          >
            <ShoppingBag className="h-4 w-4" /> Customer Orders
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`w-full text-left px-4 py-2.5 rounded text-xs tracking-wider uppercase font-bold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'reviews' ? 'bg-[#B9896A]/20 text-[#B9896A]' : 'text-text-dark hover:bg-luxury-beige'
            }`}
          >
            <Star className="h-4 w-4" /> Client Reviews
          </button>

          <button
            onClick={() => setActiveTab('slider')}
            className={`w-full text-left px-4 py-2.5 rounded text-xs tracking-wider uppercase font-bold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'slider' ? 'bg-[#B9896A]/20 text-[#B9896A]' : 'text-text-dark hover:bg-luxury-beige'
            }`}
          >
            <Image className="h-4 w-4" /> Slider Banners
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full text-left px-4 py-2.5 rounded text-xs tracking-wider uppercase font-bold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'gallery' ? 'bg-[#B9896A]/20 text-[#B9896A]' : 'text-text-dark hover:bg-luxury-beige'
            }`}
          >
            <Sparkles className="h-4 w-4" /> Inspiration Gallery
          </button>
        </div>

        {/* Right Active Dashboard Section Panel (9 cols) */}
        <div id="admin-content-pannel" className="lg:col-span-9 space-y-6">
          
          {/* A. Tab: OVERVIEW STATS METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-primary/20 rounded p-5 shadow-xs text-center select-none">
                  <span className="text-[10px] uppercase tracking-wider text-text-light font-bold block mb-1">Gross Billing Volume</span>
                  <p className="text-xl font-bold text-[#B9896A] font-mono">Rs. {totalSales.toLocaleString()}</p>
                </div>
                <div className="bg-white border border-primary/20 rounded p-5 shadow-xs text-center select-none">
                  <span className="text-[10px] uppercase tracking-wider text-text-light font-bold block mb-1">Total Orders</span>
                  <p className="text-xl font-bold text-text-dark font-mono">{orders.length}</p>
                </div>
                <div className="bg-white border border-primary/20 rounded p-5 shadow-xs text-center select-none">
                  <span className="text-[10px] uppercase tracking-wider text-text-light font-bold block mb-1">Pending Deliveries</span>
                  <p className="text-xl font-bold text-text-dark font-mono">
                    {orders.filter(o => o.status !== 'delivered').length}
                  </p>
                </div>
                <div className="bg-white border border-primary/20 rounded p-5 shadow-xs text-center select-none">
                  <span className="text-[10px] uppercase tracking-wider text-text-light font-bold block mb-1">Reviews Modulating</span>
                  <p className="text-xl font-bold text-text-dark font-mono">
                    {reviews.filter(r => !r.approved).length} pending
                  </p>
                </div>
              </div>

              {/* System summary briefing */}
              <div className="bg-white border border-primary/15 rounded-lg p-6 shadow-sm">
                <h3 className="font-serif italic text-md text-text-dark font-semibold mb-3">Boutique Database Operations Briefing</h3>
                <p className="text-xs text-text-light leading-relaxed mb-4 italic">
                  Welcome to your cake store control room. This dashboard bypasses complicated Firestore setups in sandbox environment and writes straight into the browser’s reliable Local Storage. Once you proceed with deep production integrations (Fibre cloud networks), these exact JSON schemas map natively to your Firebase Firestore rules and tables automatically.
                </p>
                <div className="flex gap-4">
                  <div className="text-xs bg-[#FFF8F6] rounded p-4 border border-[#EBCFC8] flex-1">
                    <span className="font-bold text-text-dark">Products Active:</span> {products.length} catalog items
                  </div>
                  <div className="text-xs bg-[#FFF8F6] rounded p-4 border border-[#EBCFC8] flex-1">
                    <span className="font-bold text-text-dark">Interactive Slider Banners:</span> {banners.length} slides
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* B. Tab: MANAGE PRODUCTS CATALOG (Table of cakes, Edit/Delete, Add Product Form) */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Product form creator */}
              <div className="bg-white border border-primary/20 rounded-lg p-6 shadow-sm">
                <h3 className="font-serif italic text-md text-text-dark font-semibold mb-4 border-b border-primary/10 pb-2">
                  {editingProduct ? 'Edit Catalog Product' : 'Add New Premium Baked Product'}
                </h3>
                
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Product Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Red Velvet Valentine cake"
                        value={pName}
                        onChange={(e) => setPName(e.target.value)}
                        className="w-full border border-primary/45 rounded px-3 py-1.8 text-xs focus:outline-none focus:border-accent italic bg-white text-text-dark"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Catalog Division</label>
                      <select
                        value={pCategory}
                        onChange={(e) => setPCategory(e.target.value)}
                        className="w-full border border-primary/45 bg-white rounded px-3 py-1.8 text-xs focus:outline-none focus:border-accent capitalize"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Base Price (Rs.)</label>
                      <input
                        type="number"
                        required
                        value={pPrice}
                        onChange={(e) => setPPrice(parseInt(e.target.value) || 0)}
                        className="w-full border border-primary/45 bg-white rounded px-3 py-1.8 text-xs font-mono focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">
                        Image URLs (Comma separated lists)
                      </label>
                      <input
                        type="text"
                        placeholder="http://example.com/slide.jpg, http://example.com/detail.jpg"
                        value={pImages}
                        onChange={(e) => setPImages(e.target.value)}
                        className="w-full border border-primary/45 bg-white rounded px-3 py-1.8 text-xs focus:outline-none focus:border-accent italic"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Flavor Options list (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Vanilla Velvet, Fudge core, Lotus crunch"
                      value={pFlavors}
                      onChange={(e) => setPFlavors(e.target.value)}
                      className="w-full border border-primary/45 bg-white rounded px-3 py-1.8 text-xs focus:outline-none focus:border-accent italic"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Cake Sizes/Weights list (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. 2 Lbs, 3 Lbs, 4 Lbs"
                      value={pSizes}
                      onChange={(e) => setPSizes(e.target.value)}
                      className="w-full border border-primary/45 bg-white rounded px-3 py-1.8 text-xs focus:outline-none focus:border-accent italic"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Product Long Editorial Description</label>
                    <textarea
                      rows={3}
                      value={pDesc}
                      required
                      placeholder="Tell patrons about Sponge richness, premium cream cheese, and chocolate origins..."
                      onChange={(e) => setPDesc(e.target.value)}
                      className="w-full border border-primary/45 bg-white rounded px-3 py-2 text-xs focus:outline-none focus:border-accent italic leading-relaxed text-text-dark"
                    />
                  </div>

                  {/* Status switches checkbox */}
                  <div className="flex flex-wrap gap-4 border-t border-primary/10 pt-3 select-none">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-text-dark">
                      <input
                        type="checkbox"
                        checked={pBestseller}
                        onChange={(e) => setPBestseller(e.target.checked)}
                        className="rounded border-primary/40 text-accent focus:ring-accent"
                      />
                      Is Shop Bestseller
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-text-dark">
                      <input
                        type="checkbox"
                        checked={pSeasonal}
                        onChange={(e) => setPSeasonal(e.target.checked)}
                        className="rounded border-primary/40 text-accent focus:ring-accent"
                      />
                      Is Seasonal Delight
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-text-dark">
                      <input
                        type="checkbox"
                        checked={pStock}
                        onChange={(e) => setPStock(e.target.checked)}
                        className="rounded border-primary/40 text-accent focus:ring-accent"
                      />
                      Is In Stock
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 border-t border-primary/15 pt-4">
                    {editingProduct && (
                      <button
                        type="button"
                        onClick={resetProductForm}
                        className="px-5 py-2 hover:bg-neutral-100 rounded text-xs font-bold uppercase border border-neutral-300"
                      >
                        Cancel Edits
                      </button>
                    )}
                    <button
                      type="submit"
                      className="bg-[#B9896A] hover:bg-[#B9896A]/95 text-white text-xs font-bold uppercase tracking-wider px-6 py-2 rounded shadow"
                    >
                      {editingProduct ? 'Save Modifications' : 'Add Item to Showcases'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Table of products */}
              <div className="bg-white border border-primary/15 rounded-lg overflow-hidden shadow-sm">
                <h4 className="font-serif italic text-md text-text-dark font-semibold p-4 border-b border-primary/15">
                  Stock Registry Table
                </h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-luxury-beige/40 text-text-light font-bold border-b border-primary/15 uppercase tracking-wider">
                        <th className="p-4">Visual</th>
                        <th className="p-4">Dessert Title</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Pricing</th>
                        <th className="p-4 text-center">Settings</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5 text-text-dark">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-luxury-beige/10">
                          <td className="p-4">
                            <img src={p.images[0]} alt="" className="h-10 w-10 object-cover rounded bg-neutral-100 border border-neutral-200" referrerPolicy="no-referrer" />
                          </td>
                          <td className="p-4 font-bold max-w-xs">{p.name}</td>
                          <td className="p-4 uppercase font-semibold text-text-light">{p.category}</td>
                          <td className="p-4 font-mono font-bold">Rs. {p.price.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleEditProduct(p)}
                                className="px-3 py-1 rounded bg-[#B9896A]/10 text-accent hover:bg-[#B9896A]/20 transition-colors uppercase font-bold text-[10px]"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 text-text-light hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* C. Tab: MANAGE CATEGORIES (Table of collections, Add/Edit form) */}
          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fadeIn">
              {/* Form panel */}
              <div className="md:col-span-4 bg-white border border-primary/20 rounded-lg p-6 shadow-sm self-start">
                <h3 className="font-serif italic text-md text-text-dark font-semibold mb-4 border-b border-primary/10 pb-2">
                  Add Fresh Category
                </h3>

                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Category Label</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sourdough Breads"
                      value={cName}
                      onChange={(e) => setCName(e.target.value)}
                      className="w-full border border-primary/45 rounded px-3 py-1.8 text-xs bg-white text-text-dark"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">URL Navigation Slug</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. sourdough-breads"
                      value={cSlug}
                      onChange={(e) => setCSlug(e.target.value)}
                      className="w-full border border-primary/45 rounded px-3 py-1.8 text-xs font-mono bg-white text-text-dark"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Grid Wallpaper URL</label>
                    <input
                      type="text"
                      placeholder="Image URL link"
                      value={cImage}
                      onChange={(e) => setCImage(e.target.value)}
                      className="w-full border border-primary/45 rounded px-3 py-1.8 text-xs bg-white text-text-dark"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Brief Description</label>
                    <textarea
                      rows={2}
                      placeholder="Category highlights..."
                      value={cDesc}
                      onChange={(e) => setCDesc(e.target.value)}
                      className="w-full border border-primary/45 rounded px-3 py-1.8 text-xs italic bg-white text-text-dark leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#B9896A] hover:bg-[#B9896A]/95 text-white text-xs font-[600] uppercase tracking-wider py-2 rounded shadow"
                  >
                    Append Category
                  </button>
                </form>
              </div>

              {/* Table side (8 cols) */}
              <div className="md:col-span-8 bg-white border border-primary/15 rounded-lg overflow-hidden shadow-sm">
                <h4 className="font-serif italic text-md text-text-dark font-semibold p-4 border-b border-primary/15">
                  Category list Registry
                </h4>
                
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-luxury-beige/40 text-text-light font-bold border-b border-primary/15 uppercase tracking-wider">
                      <th className="p-4">Visual</th>
                      <th className="p-4">Collection Title</th>
                      <th className="p-4">Slug path</th>
                      <th className="p-4 text-center">Settings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5 text-text-dark text-xs">
                    {categories.map((cat) => (
                      <tr key={cat.id}>
                        <td className="p-4">
                          <img src={cat.image} alt="" className="h-10 w-10 object-cover rounded bg-neutral-100 border border-neutral-200" referrerPolicy="no-referrer" />
                        </td>
                        <td className="p-4 font-bold">{cat.name}</td>
                        <td className="p-4 font-mono text-text-light">{cat.slug}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleCategoryDelete(cat.id)}
                            className="p-1.5 text-text-light hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* D. Tab: CLIENT ORDERS LIST LOGISTICS */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              {orders.length === 0 ? (
                <p className="text-xs text-text-light bg-white border border-primary/15 p-12 text-center rounded italic">
                  No customer orders have been completed in this sandbox session yet. Place some test order at checkout first!
                </p>
              ) : (
                orders.map((or) => (
                  <div key={or.id} className="bg-white border border-primary/15 rounded-lg p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between border-b border-primary/5 pb-3 gap-2.5">
                      <div>
                        <span className="text-[10px] font-mono font-semibold bg-[#F4D3CD]/60 text-text-dark px-2 py-0.5 rounded">
                          Reference ID: #{or.id}
                        </span>
                        <h4 className="font-serif italic text-md text-text-dark font-semibold mt-1">Recipient: {or.customerName}</h4>
                      </div>

                      {/* Controls rows to quickly adjust baking status! */}
                      <div className="flex items-center gap-1.5 self-start">
                        <span className="text-[10px] text-text-light font-bold uppercase tracking-wider">Kitchen Action:</span>
                        <select
                          value={or.status}
                          onChange={(e: any) => {
                            db.updateOrderStatus(or.id, e.target.value);
                            refreshData();
                            showToast(`Updated reference #${or.id} to status ${e.target.value.toUpperCase()}`, 'info');
                          }}
                          className="border border-primary/40 rounded px-2.5 py-1 text-xs bg-[#FFF8F6] focus:outline-none focus:border-accent capitalize"
                        >
                          <option value="pending">Confirmed</option>
                          <option value="baking">Oven/Baking</option>
                          <option value="shipped">On Rider/Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-text-light"><span className="font-bold text-text-dark">Email:</span> {or.customerEmail}</p>
                        <p className="text-text-light"><span className="font-bold text-text-dark">Landline:</span> {or.customerPhone}</p>
                        <p className="text-text-light"><span className="font-bold text-text-dark">Address Landmark:</span> {or.address}</p>
                      </div>
                      <div>
                        <p className="text-text-light"><span className="font-bold text-text-dark">Date Select:</span> {or.deliveryDate}</p>
                        <p className="text-text-light"><span className="font-bold text-text-dark">Hourly Slot:</span> {or.deliveryTime}</p>
                        <p className="text-[#B9896A] font-bold mt-1">Settled Net Amount: Rs. {or.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Order items lists */}
                    <div className="bg-luxury-beige/35 border border-primary/10 rounded p-4 text-[11px] text-text-dark last:border-0 leading-relaxed italic">
                      <span className="font-bold uppercase tracking-wider text-[9px] block mb-1">Recipes List:</span>
                      <ul className="space-y-1">
                        {or.items.map((it, idx) => (
                          <li key={idx}>
                            • <span className="font-bold">{it.product.name}</span> ({it.selectedFlavor} | {it.selectedSize}) x{it.quantity}
                          </li>
                        ))}
                      </ul>
                      {or.notes && (
                        <div className="mt-3 text-red-800 bg-white/70 rounded p-2 border border-primary/10">
                          <span className="font-bold text-[9px] uppercase tracking-wider block mb-0.5">Special chef Notes:</span>
                          "{or.notes}"
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* E. Tab: MANAGE REVIEWS (Approvals table) */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-fadeIn">
              {reviews.length === 0 ? (
                <p className="text-xs text-text-light bg-white border border-primary/15 p-12 text-center rounded italic">No review records found.</p>
              ) : (
                <div className="bg-white border border-primary/15 rounded-lg overflow-hidden shadow-sm">
                  <h4 className="font-serif italic text-md text-text-dark font-semibold p-4 border-b border-primary/15 pb-3">
                    Customer Reviews Moderation Panel
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-text-dark">
                      <thead>
                        <tr className="bg-luxury-beige/40 text-text-light font-bold border-b border-primary/15 uppercase tracking-wider select-none">
                          <th className="p-4">Customer Name</th>
                          <th className="p-4">Product Name</th>
                          <th className="p-4">Comment Notes</th>
                          <th className="p-4 text-center">Score</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-primary/5">
                        {reviews.map((rev) => (
                          <tr key={rev.id} className={rev.approved ? '' : 'bg-[#F4D3CD]/10'}>
                            <td className="p-4 font-bold">{rev.customerName}</td>
                            <td className="p-4 max-w-xs">{rev.productName}</td>
                            <td className="p-4 italic pr-6 max-w-xs block leading-relaxed line-clamp-2">"{rev.comment}"</td>
                            <td className="p-4 text-center font-bold text-[#B9896A] font-mono">{rev.rating}★</td>
                            <td className="p-4 text-center">
                              <div className="flex gap-2.5 justify-center">
                                {!rev.approved ? (
                                  <button
                                    onClick={() => handleReviewApprove(rev.id)}
                                    className="px-2 py-1 rounded bg-green-100 text-green-800 hover:bg-green-200 transition-colors uppercase font-bold text-[10px] flex items-center gap-0.5"
                                  >
                                    <Check className="h-3.5 w-3.5" /> Approve
                                  </button>
                                ) : (
                                  <span className="text-green-700 font-bold block text-[10px] uppercase tracking-wide">Approved</span>
                                )}
                                <button
                                  onClick={() => handleReviewDelete(rev.id)}
                                  className="text-text-light hover:text-red-700 transition"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* F. Tab: MANAGE SLIDER BANNERS */}
          {activeTab === 'slider' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fadeIn">
              {/* Form to add */}
              <div className="md:col-span-5 bg-white border border-primary/20 rounded-lg p-6 shadow-sm self-start">
                <h3 className="font-serif italic text-md text-text-dark font-semibold mb-4 border-b border-primary/10 pb-2">
                  Append Hero Banner Slide
                </h3>

                <form onSubmit={handleBannerSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Slide Image Link</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Unsplash URL"
                      value={bImage}
                      onChange={(e) => setBImage(e.target.value)}
                      className="w-full border border-primary/45 rounded px-3 py-1.8 text-xs bg-white text-text-dark"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Display Large Header Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Artisanal Confections"
                      value={bTitle}
                      onChange={(e) => setBTitle(e.target.value)}
                      className="w-full border border-primary/45 rounded px-3 py-1.8 text-xs bg-white text-text-dark italic"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Subtitle Ribbon</label>
                    <input
                      type="text"
                      placeholder="e.g. FRESHLY BAKED ENJOYMENTS"
                      value={bSubtitle}
                      onChange={(e) => setBSubtitle(e.target.value)}
                      className="w-full border border-primary/45 rounded px-3 py-1.8 text-xs bg-white text-text-dark uppercase tracking-wider"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Redirect category Slug Link</label>
                    <select
                      value={bLink}
                      onChange={(e) => setBLink(e.target.value)}
                      className="w-full border border-primary/45 bg-white rounded px-3 py-1.8 text-xs focus:outline-none focus:border-accent"
                    >
                      <option value="all">All Products</option>
                      <option value="cakes">Luxury Cakes</option>
                      <option value="cupcakes font-semibold">Cupcakes</option>
                      <option value="macarons">Macarons</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#B9896A] hover:bg-[#B9896A]/95 text-white text-xs font-bold uppercase py-2.5 rounded shadow"
                  >
                    Append Banner
                  </button>
                </form>
              </div>

              {/* Grid lists (7 cols) */}
              <div className="md:col-span-7 bg-white border border-primary/15 rounded-lg p-6 shadow-sm space-y-4">
                <h4 className="font-serif italic text-md text-text-dark font-semibold border-b border-primary/10 pb-2">
                  Active Homepage Slides
                </h4>
                
                <div className="grid grid-cols-1 gap-4">
                  {banners.map((slide) => (
                    <div key={slide.id} className="relative aspect-video rounded-lg overflow-hidden border border-primary/20 bg-neutral-200">
                      <img src={slide.image} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end text-white">
                        <span className="text-[8px] uppercase tracking-wider text-primary">{slide.subtitle}</span>
                        <h5 className="font-serif text-sm font-semibold mt-0.5 leading-tight">{slide.title}</h5>
                      </div>
                      <button
                        onClick={() => handleDeleteBanner(slide.id)}
                        className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-800 p-1.5 rounded transition shadow cursor-pointer"
                        aria-label="Delete slide banner"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* G. Tab: MANAGE GALLERY IMAGES */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fadeIn">
              {/* Form card */}
              <div className="md:col-span-4 bg-white border border-primary/20 rounded-lg p-6 shadow-sm self-start">
                <h3 className="font-serif italic text-md text-text-dark font-semibold mb-4 border-b border-primary/10 pb-2">
                  Append Inspiration Photo
                </h3>

                <form onSubmit={handleGallerySubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Showcase Photo URL</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Unsplash image details link"
                      value={gImage}
                      onChange={(e) => setGImage(e.target.value)}
                      className="w-full border border-primary/45 rounded px-3 py-1.8 text-xs bg-white text-text-dark"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Image Captions</label>
                    <input
                      type="text"
                      placeholder="e.g. Summer catering detail"
                      value={gCaption}
                      onChange={(e) => setGCaption(e.target.value)}
                      className="w-full border border-primary/45 rounded px-3 py-1.8 text-xs bg-white text-text-dark"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#B9896A] hover:bg-[#B9896A]/95 text-white text-xs font-[600] uppercase tracking-wider py-2 rounded shadow"
                  >
                    Append Showcase
                  </button>
                </form>
              </div>

              {/* Photo registry list (8 cols) */}
              <div className="md:col-span-8 bg-white border border-primary/15 rounded-lg p-6 shadow-sm">
                <h4 className="font-serif italic text-md text-text-dark font-semibold border-b border-primary/10 pb-3">
                  Gallery Showcase Registry
                </h4>
                
                <div className="grid grid-cols-3 gap-3">
                  {gallery.map((g) => (
                    <div key={g.id} className="relative aspect-square group border border-primary/20 rounded overflow-hidden">
                      <img src={g.image} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200">
                        <button
                          onClick={() => handleDeleteGallery(g.id)}
                          className="p-1.5 bg-red-100 text-red-800 rounded hover:bg-red-200 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
