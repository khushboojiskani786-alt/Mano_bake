import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { ShoppingBag, Star, Calendar, MessageSquare, ArrowLeft, Send } from 'lucide-react';
import * as db from '../db';
import { Review } from '../types';

export const ProductDetails: React.FC = () => {
  const {
    selectedProductId,
    setSelectedProductId,
    setActivePage,
    products,
    addToCart,
    reviews,
    refreshData,
    showToast
  } = useApp();

  const product = products.find(p => p.id === selectedProductId);

  // If page is loaded with invalid product
  useEffect(() => {
    if (!product && products.length > 0) {
      setSelectedProductId(products[0].id);
    }
  }, [product, products, setSelectedProductId]);

  if (!product) return null;

  // Option states
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0] || 'Original');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [customMessage, setCustomMessage] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Review states
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Reset indices on product switch
  useEffect(() => {
    setActiveImgIdx(0);
    setSelectedFlavor(product.flavors[0] || 'Original');
    setSelectedSize(product.sizes[0] || 'Standard');
    setCustomMessage('');
    setQuantity(1);
  }, [product]);

  // Filters for relative category products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Get approved reviews of this product
  const productReviews = reviews.filter(r => r.productId === product.id && r.approved);

  const handleAddToCart = () => {
    addToCart({
      product,
      selectedFlavor,
      selectedSize,
      customMessage,
      quantity
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName) return;

    const newReview: Review = {
      id: `rev_${Date.now()}`,
      productId: product.id,
      productName: product.name,
      customerName: reviewerName,
      rating: reviewRating,
      comment: reviewComment,
      createdAt: new Date().toISOString(),
      approved: false // Requires admin approval!
    };

    db.addReview(newReview);
    refreshData();
    showToast('Thank you! Your luxury feedback has been submitted and is pending boutique approval.', 'info');

    // Reset reviewer inputs
    setReviewerName('');
    setReviewRating(5);
    setReviewComment('');
  };

  return (
    <div id="product-details-container" className="max-w-7xl mx-auto px-4 md:px-6 py-28 bg-secondary min-h-screen">
      
      {/* Back button */}
      <button
        onClick={() => setActivePage('shop')}
        className="mb-8 hover:text-accent font-bold uppercase tracking-widest text-xs text-text-dark flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Return to Selection
      </button>

      {/* Main Details Panel split columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        
        {/* Left Column: Image Zoom Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-luxury-beige rounded-lg overflow-hidden border border-primary/20 shadow-sm relative group">
            <img
              src={product.images[activeImgIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnail list selector */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`h-20 w-20 bg-luxury-beige rounded overflow-hidden border transition-all cursor-pointer ${
                    activeImgIdx === idx
                      ? 'border-accent shadow-sm ring-1 ring-accent'
                      : 'border-primary/20 hover:border-accent'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover object-center" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Custom Configuration attributes selectors */}
        <div className="flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.25em] font-bold text-accent uppercase block mb-1">Mano Bakes Craftsmanship</span>
              <h1 className="font-serif italic text-2xl sm:text-3xl text-text-dark font-medium leading-tight mb-2">
                {product.name}
              </h1>

              {/* Stars review indices */}
              <div className="flex items-center gap-1">
                <div className="flex items-center text-accent">
                  <Star className="h-4 w-4 fill-accent stroke-none" />
                  <span className="text-xs font-semibold text-text-dark ml-1">{product.rating}</span>
                </div>
                <div className="h-3 w-px bg-primary/30 mx-2" />
                <span className="text-xs text-text-light">{productReviews.length} Approved Reviews</span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-text-dark font-mono">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm line-through text-text-light/75 font-medium font-mono">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#B9896A] bg-[#FFF8F6] px-2 py-0.5 rounded border border-[#EBCFC8]/50 shadow-xs animate-pulse">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF CELEB SPECIAL
                  </span>
                </>
              )}
            </div>

            {/* Description info */}
            <p className="text-xs sm:text-sm text-text-light leading-relaxed italic border-l-2 border-primary/30 pl-4 bg-[#F5EAE6]/20 py-2 rounded-r">
              {product.description}
            </p>

            {/* Configuration Selectors */}
            <div className="space-y-4">
              {/* Flavor row */}
              {product.flavors.length > 0 && (
                <div>
                  <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-2_5">
                    Flavor Choice
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((fl) => (
                      <button
                        key={fl}
                        onClick={() => setSelectedFlavor(fl)}
                        className={`px-3 py-2 border rounded text-xs tracking-wider capitalize transition-all cursor-pointer ${
                          selectedFlavor === fl
                            ? 'border-accent bg-[#B9896A] text-[#FFF8F6] font-medium shadow-sm'
                            : 'border-primary/40 text-text-light bg-white hover:border-accent'
                        }`}
                      >
                        {fl}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes row */}
              {product.sizes.length > 0 && (
                <div>
                  <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-2_5">
                    Select Size or Yield Weight
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-2 border rounded text-xs tracking-wider capitalize transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'border-accent bg-[#B9896A] text-[#FFF8F6] font-medium shadow-sm'
                            : 'border-primary/40 text-text-light bg-white hover:border-accent'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Writings text message form */}
              <div>
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1.5">
                  Custom Writing/Message on Cake (e.g. "HBD Fatima!")
                </label>
                <input
                  type="text"
                  placeholder="Leave empty if none required. Max 35 letters..."
                  maxLength={35}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full border border-primary/40 bg-white px-3 py-2.5 rounded text-xs focus:outline-none focus:border-accent italic text-text-dark"
                />
              </div>
            </div>
          </div>

          {/* Cart Quantity and Activator actions */}
          <div className="border-t border-primary/20 pt-6 mt-8">
            <div className="flex items-center gap-4">
              {/* Increments */}
              <div className="flex items-center border border-primary/40 rounded bg-white overflow-hidden shadow-xs h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 text-text-light hover:text-text-dark font-semibold h-full hover:bg-primary/10 transition-colors"
                >
                  -
                </button>
                <span className="px-6 text-sm text-text-dark font-bold font-mono select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 text-text-light hover:text-text-dark font-semibold h-full hover:bg-primary/10 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Shopping bag submit */}
              <button
                id="btn-add-to-cart-details"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-accent hover:bg-accent/95 disabled:bg-primary/60 text-[#FFF8F6] font-bold tracking-widest uppercase text-xs h-12 rounded shadow transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="h-4.5 w-4.5 animate-pulse" />
                {product.inStock ? 'Add to Custom Order' : 'Sold Out for Day'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews, Ratings, and comments form */}
      <section id="product-feedback-panels" className="border-t border-primary/25 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        
        {/* A. Displays previous approved reviews */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-serif italic text-lg text-text-dark font-semibold flex items-center gap-2">
            <MessageSquare className="h-4.5 w-4.5 text-[#B9896A]" /> Patron Reviews ({productReviews.length})
          </h3>

          {productReviews.length === 0 ? (
            <p className="text-xs text-text-light italic leading-relaxed bg-[#FFF8F6] p-6 border border-primary/10 rounded">
              No authenticated customer reviews have been published for this item yet. Be the first to share your experience!
            </p>
          ) : (
            <div className="space-y-4">
              {productReviews.map((rev) => (
                <div key={rev.id} className="bg-white border border-primary/15 rounded p-5 shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-bold text-text-dark block">{rev.customerName}</span>
                      <span className="text-[9px] text-[#B9896A] font-semibold flex items-center gap-1 uppercase tracking-wide">
                        Verified Cake Order
                      </span>
                    </div>

                    <div className="flex gap-0.5 text-accent">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < rev.rating ? 'fill-accent stroke-none' : 'text-primary/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-text-dark italic leading-relaxed mt-1">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* B. Review Submission form */}
        <div className="bg-[#F5EAE6]/50 border border-primary/20 rounded-lg p-6">
          <h4 className="font-serif italic text-md text-text-dark font-semibold mb-4">Write a Custom Review</h4>
          
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Fatima Khan"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="w-full border border-primary/40 rounded bg-white px-3 py-2 text-xs italic focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Select Rating Score</label>
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(parseInt(e.target.value))}
                className="w-full border border-primary/40 rounded bg-white px-3 py-2 text-xs font-semibold focus:outline-none focus:border-accent"
              >
                <option value={5}>5 Stars - Exquisite perfection!</option>
                <option value={4}>4 Stars - Incredibly delicious!</option>
                <option value={3}>3 Stars - Quite decent dessert.</option>
                <option value={2}>2 Stars - Sub-par icing texture.</option>
                <option value={1}>1 Star - Dissatisfied with sponge.</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Your Honest Review Message</label>
              <textarea
                required
                rows={3}
                placeholder="Share your thoughts about this dessert's rich sponge, flavor, and piping design..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full border border-primary/40 rounded bg-white px-3 py-2 text-xs italic focus:outline-none focus:border-accent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/95 text-[#FFF8F6] font-[600] text-xs uppercase tracking-widest py-2.5 rounded shadow transition-colors block flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="h-3 w-3" /> Submit Review
            </button>
          </form>
        </div>
      </section>

      {/* Related Products slider */}
      {relatedProducts.length > 0 && (
        <section id="relative-confections-carousel" className="border-t border-primary/20 pt-16">
          <div className="text-center max-w-xl mx-auto mb-10 select-none">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-accent uppercase block mb-1">More Patisseries</span>
            <h2 className="font-serif italic text-2xl text-text-dark font-normal">Related Confectioneries</h2>
            <div className="h-px w-20 bg-accent/30 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
