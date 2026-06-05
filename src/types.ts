export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  flavors: string[];
  sizes: string[];
  isBestseller?: boolean;
  isSeasonal?: boolean;
  inStock: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  selectedFlavor: string;
  selectedSize: string;
  customMessage: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  deliveryDate: string;
  deliveryTime: string;
  items: CartItem[];
  notes: string;
  totalAmount: number;
  status: 'pending' | 'baking' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  approved: boolean;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  active: boolean;
  link?: string;
}

export interface GalleryImage {
  id: string;
  image: string;
  caption: string;
}
