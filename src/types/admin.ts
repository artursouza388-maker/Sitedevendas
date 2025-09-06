export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  registeredAt: Date;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface AdminOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
}

export interface StockProduct {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  price: number;
  cost: number;
  supplier: string;
  lastRestocked: Date;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  validFrom: Date;
  validUntil: Date;
  createdAt: Date;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  pendingOrders: number;
  lowStockItems: number;
  activeCoupons: number;
  revenueGrowth: number;
  ordersGrowth: number;
}
