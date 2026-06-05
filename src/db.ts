import { Product, Category, Order, Review, Banner, GalleryImage } from './types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BANNERS, INITIAL_GALLERY } from './data';

// Local storage keys
const KEY_PRODUCTS = 'manobakes_products';
const KEY_CATEGORIES = 'manobakes_categories';
const KEY_ORDERS = 'manobakes_orders';
const KEY_REVIEWS = 'manobakes_reviews';
const KEY_BANNERS = 'manobakes_banners';
const KEY_GALLERY = 'manobakes_gallery';

// Helper to initialize database
export function initializeDB() {
  const currentProducts = localStorage.getItem(KEY_PRODUCTS);
  let shouldSetProducts = !currentProducts;
  if (currentProducts) {
    try {
      const parsed = JSON.parse(currentProducts);
      if (Array.isArray(parsed) && !parsed.some(p => p.id === 'prod_real_1')) {
        shouldSetProducts = true;
      }
    } catch (e) {
      shouldSetProducts = true;
    }
  }

  if (shouldSetProducts) {
    localStorage.setItem(KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem(KEY_CATEGORIES)) {
    localStorage.setItem(KEY_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
  const currentBanners = localStorage.getItem(KEY_BANNERS);
  let shouldSetBanners = !currentBanners;
  if (currentBanners) {
    try {
      const parsed = JSON.parse(currentBanners);
      if (Array.isArray(parsed) && !parsed.some(b => b.title === 'Cakes & Treats')) {
        shouldSetBanners = true;
      }
    } catch (e) {
      shouldSetBanners = true;
    }
  }

  if (shouldSetBanners) {
    localStorage.setItem(KEY_BANNERS, JSON.stringify(INITIAL_BANNERS));
  }
  if (!localStorage.getItem(KEY_GALLERY)) {
    localStorage.setItem(KEY_GALLERY, JSON.stringify(INITIAL_GALLERY));
  }
  if (!localStorage.getItem(KEY_ORDERS)) {
    // Empty orders to begin
    localStorage.setItem(KEY_ORDERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEY_REVIEWS)) {
    // Formulate a few starting reviews for realism
    const startingReviews: Review[] = [
      {
        id: 'rev_1',
        productId: 'prod_1',
        productName: 'Signature Belgian Chocolate Fudge Cake',
        customerName: 'Amina Khan',
        rating: 5,
        comment: 'Absolutely spectacular! The fudge is thick, moist, and extremely premium. Best chocolate cake in town!',
        createdAt: '2026-05-25T14:30:00Z',
        approved: true
      },
      {
        id: 'rev_2',
        productId: 'prod_3',
        productName: 'Lotus Biscoff Dream Cheesecake',
        customerName: 'Zainab J.',
        rating: 5,
        comment: 'So rich and creamy. Perfectly sweet and the crust is extremely buttery. 10/10 recommendation!',
        createdAt: '2026-05-26T10:15:00Z',
        approved: true
      }
    ];
    localStorage.setItem(KEY_REVIEWS, JSON.stringify(startingReviews));
  }
}

// Initial triggers
initializeDB();

// Dynamic Engine Getters and Setters
export function getProducts(): Product[] {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEY_PRODUCTS) || '[]');
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
}

export function addProduct(product: Product) {
  const products = getProducts();
  products.unshift(product);
  saveProducts(products);
}

export function updateProduct(updatedProduct: Product) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
    saveProducts(products);
  }
}

export function deleteProduct(id: string) {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
}

export function getCategories(): Category[] {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEY_CATEGORIES) || '[]');
}

export function saveCategories(categories: Category[]) {
  localStorage.setItem(KEY_CATEGORIES, JSON.stringify(categories));
}

export function addCategory(category: Category) {
  const categories = getCategories();
  categories.push(category);
  saveCategories(categories);
}

export function updateCategory(updated: Category) {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === updated.id);
  if (index !== -1) {
    categories[index] = updated;
    saveCategories(categories);
  }
}

export function deleteCategory(id: string) {
  const categories = getCategories();
  const filtered = categories.filter(c => c.id !== id);
  saveCategories(filtered);
}

export function getOrders(): Order[] {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEY_ORDERS) || '[]');
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(KEY_ORDERS, JSON.stringify(orders));
}

export function addOrder(order: Order) {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
}

export function updateOrderStatus(orderId: string, status: Order['status']) {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    orders[index].status = status;
    saveOrders(orders);
  }
}

export function deleteOrder(id: string) {
  const orders = getOrders();
  const filtered = orders.filter(o => o.id !== id);
  saveOrders(filtered);
}

export function getReviews(): Review[] {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEY_REVIEWS) || '[]');
}

export function saveReviews(reviews: Review[]) {
  localStorage.setItem(KEY_REVIEWS, JSON.stringify(reviews));
}

export function addReview(review: Review) {
  const reviews = getReviews();
  reviews.unshift(review);
  saveReviews(reviews);
}

export function approveReview(id: string) {
  const reviews = getReviews();
  const index = reviews.findIndex(r => r.id === id);
  if (index !== -1) {
    reviews[index].approved = true;
    saveReviews(reviews);
    
    // Recalculate references for products
    const reviewsArr = getReviews();
    const prodReviews = reviewsArr.filter(r => r.productId === reviews[index].productId && r.approved);
    const avgRating = prodReviews.reduce((sum, r) => sum + r.rating, 0) / (prodReviews.length || 1);
    
    const products = getProducts();
    const prodIndex = products.findIndex(p => p.id === reviews[index].productId);
    if (prodIndex !== -1) {
      products[prodIndex].rating = parseFloat(avgRating.toFixed(1));
      products[prodIndex].reviewsCount = prodReviews.length;
      saveProducts(products);
    }
  }
}

export function deleteReview(id: string) {
  const reviews = getReviews();
  const filtered = reviews.filter(r => r.id !== id);
  saveReviews(filtered);
}

export function getBanners(): Banner[] {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEY_BANNERS) || '[]');
}

export function saveBanners(banners: Banner[]) {
  localStorage.setItem(KEY_BANNERS, JSON.stringify(banners));
}

export function addBanner(banner: Banner) {
  const banners = getBanners();
  banners.push(banner);
  saveBanners(banners);
}

export function updateBanner(updated: Banner) {
  const banners = getBanners();
  const index = banners.findIndex(b => b.id === updated.id);
  if (index !== -1) {
    banners[index] = updated;
    saveBanners(banners);
  }
}

export function deleteBanner(id: string) {
  const banners = getBanners();
  const filtered = banners.filter(b => b.id !== id);
  saveBanners(filtered);
}

export function getGalleryImages(): GalleryImage[] {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEY_GALLERY) || '[]');
}

export function saveGalleryImages(images: GalleryImage[]) {
  localStorage.setItem(KEY_GALLERY, JSON.stringify(images));
}

export function addGalleryImage(img: GalleryImage) {
  const images = getGalleryImages();
  images.push(img);
  saveGalleryImages(images);
}

export function deleteGalleryImage(id: string) {
  const images = getGalleryImages();
  const filtered = images.filter(i => i.id !== id);
  saveGalleryImages(filtered);
}
