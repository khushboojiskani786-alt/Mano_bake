import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, Order, Review, Banner, GalleryImage } from '../types';
import * as db from '../db';

export type ActivePage = 
  | 'home'
  | 'shop'
  | 'product-details'
  | 'checkout'
  | 'about'
  | 'contact'
  | 'account'
  | 'order-tracking'
  | 'customize'
  | 'admin-dashboard';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Navigation & Router
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  trackingOrderId: string | null;
  setTrackingOrderId: (id: string | null) => void;

  // DB Sync State
  products: Product[];
  categories: Category[];
  orders: Order[];
  reviews: Review[];
  banners: Banner[];
  gallery: GalleryImage[];
  refreshData: () => void;

  // Cart Management
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  updateCartQuantity: (index: number, q: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  cartInstructions: string;
  setCartInstructions: (notes: string) => void;

  // User/Admin Management
  isAdminMode: boolean;
  setAdminMode: (mode: boolean) => void;
  currentUser: { name: string; email: string; phone: string; address: string } | null;
  setCurrentUser: (user: any) => void;

  // Notifications
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Filters for Shop
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  // DB states loaded from db.ts
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);

  // Cart state stored in session state + persistent local
  const [cart, setCart] = useState<CartItem[]>(() => {
    const localCart = localStorage.getItem('manobakes_cart');
    return localCart ? JSON.parse(localCart) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [cartInstructions, setCartInstructions] = useState('');

  // Admin and user flags
  const [isAdminMode, setAdminMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('manobakes_current_user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'Khushboo Jiskani',
      email: 'khushboojiskani786@gmail.com',
      phone: '0300-1234567',
      address: 'Sector F-7, Islamabad, Pakistan'
    };
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Shop states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load and refresh DB references
  const refreshData = () => {
    setProducts(db.getProducts());
    setCategories(db.getCategories());
    setOrders(db.getOrders());
    setReviews(db.getReviews());
    setBanners(db.getBanners());
    setGallery(db.getGalleryImages());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Save cart modifications
  useEffect(() => {
    localStorage.setItem('manobakes_cart', JSON.stringify(cart));
  }, [cart]);

  // Save current user edits
  useEffect(() => {
    localStorage.setItem('manobakes_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Toast handlers
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === item.product.id && 
             i.selectedFlavor === item.selectedFlavor && 
             i.selectedSize === item.selectedSize
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
    showToast(`${item.product.name} successfully added to cart.`, 'success');
  };

  const updateCartQuantity = (index: number, q: number) => {
    setCart(prev => {
      const updated = [...prev];
      if (q <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = q;
      }
      return updated;
    });
  };

  const removeFromCart = (index: number) => {
    const item = cart[index];
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast(`${item.product.name} removed from your cart.`, 'info');
  };

  const clearCart = () => {
    setCart([]);
    setCartInstructions('');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage: (p) => {
          setActivePage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        selectedProductId,
        setSelectedProductId,
        trackingOrderId,
        setTrackingOrderId,
        products,
        categories,
        orders,
        reviews,
        banners,
        gallery,
        refreshData,
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartInstructions,
        setCartInstructions,
        isAdminMode,
        setAdminMode,
        currentUser,
        setCurrentUser,
        toasts,
        showToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
};
