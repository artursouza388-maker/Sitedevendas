import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Customer, AdminOrder, StockProduct, Coupon, DashboardStats } from '../types/admin';
import { customers as initialCustomers, orders as initialOrders, stockProducts as initialStockProducts, coupons as initialCoupons, dashboardStats } from '../data/adminData';

interface AdminContextType {
  customers: Customer[];
  orders: AdminOrder[];
  stockProducts: StockProduct[];
  coupons: Coupon[];
  stats: DashboardStats;
  updateOrderStatus: (orderId: string, status: AdminOrder['status']) => void;
  updateStock: (productId: string, newStock: number) => void;
  createCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount' | 'createdAt'>) => void;
  updateCoupon: (couponId: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (couponId: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [customers] = useState<Customer[]>(initialCustomers);
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [stockProducts, setStockProducts] = useState<StockProduct[]>(initialStockProducts);
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const updateOrderStatus = (orderId: string, status: AdminOrder['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const updateStock = (productId: string, newStock: number) => {
    setStockProducts(prev =>
      prev.map(product => {
        if (product.id === productId) {
          const status = newStock === 0 ? 'out_of_stock' : 
                        newStock <= product.minStock ? 'low_stock' : 'in_stock';
          return { 
            ...product, 
            currentStock: newStock, 
            status,
            lastRestocked: new Date()
          };
        }
        return product;
      })
    );
  };

  const createCoupon = (couponData: Omit<Coupon, 'id' | 'usedCount' | 'createdAt'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coupon-${Date.now()}`,
      usedCount: 0,
      createdAt: new Date()
    };
    setCoupons(prev => [...prev, newCoupon]);
  };

  const updateCoupon = (couponId: string, updates: Partial<Coupon>) => {
    setCoupons(prev =>
      prev.map(coupon =>
        coupon.id === couponId ? { ...coupon, ...updates } : coupon
      )
    );
  };

  const deleteCoupon = (couponId: string) => {
    setCoupons(prev => prev.filter(coupon => coupon.id !== couponId));
  };

  return (
    <AdminContext.Provider value={{
      customers,
      orders,
      stockProducts,
      coupons,
      stats: dashboardStats,
      updateOrderStatus,
      updateStock,
      createCoupon,
      updateCoupon,
      deleteCoupon
    }}>
      {children}
    </AdminContext.Provider>
  );
};
