import { faker } from '@faker-js/faker';
import { Customer, AdminOrder, StockProduct, Coupon, DashboardStats } from '../types/admin';
import { products } from './products';

// Generate mock customers
export const customers: Customer[] = Array.from({ length: 50 }, (_, i) => ({
  id: `customer-${i + 1}`,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  registeredAt: faker.date.recent({ days: 90 }),
  totalOrders: faker.number.int({ min: 0, max: 15 }),
  totalSpent: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
  status: Math.random() > 0.1 ? 'active' : 'inactive'
}));

// Generate mock orders
export const orders: AdminOrder[] = Array.from({ length: 100 }, (_, i) => {
  const customer = customers[Math.floor(Math.random() * customers.length)];
  const orderItems = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => {
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = faker.number.int({ min: 1, max: 3 });
    return {
      productId: product.id,
      productName: product.name,
      quantity,
      price: product.price
    };
  });
  
  const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return {
    id: `order-${i + 1}`,
    customerId: customer.id,
    customerName: customer.name,
    customerEmail: customer.email,
    items: orderItems,
    total: Number(total.toFixed(2)),
    status: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'][Math.floor(Math.random() * 5)] as any,
    createdAt: faker.date.recent({ days: 30 }),
    shippingAddress: {
      street: faker.location.street(),
      number: faker.location.buildingNumber(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode()
    },
    paymentMethod: ['Cartão de Crédito', 'PIX', 'Boleto'][Math.floor(Math.random() * 3)]
  };
});

// Generate stock data
export const stockProducts: StockProduct[] = products.map(product => {
  const currentStock = faker.number.int({ min: 0, max: 100 });
  const minStock = 10;
  
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    currentStock,
    minStock,
    price: product.price,
    cost: Number((product.price * 0.6).toFixed(2)),
    supplier: faker.company.name(),
    lastRestocked: faker.date.recent({ days: 30 }),
    status: currentStock === 0 ? 'out_of_stock' : currentStock <= minStock ? 'low_stock' : 'in_stock'
  };
});

// Generate coupons
export const coupons: Coupon[] = [
  {
    id: 'coupon-1',
    code: 'BEMVINDO10',
    type: 'percentage',
    value: 10,
    minOrderValue: 200,
    usageLimit: 100,
    usedCount: 23,
    isActive: true,
    validFrom: new Date('2025-01-01'),
    validUntil: new Date('2025-12-31'),
    createdAt: new Date('2025-01-01')
  },
  {
    id: 'coupon-2',
    code: 'FRETE50',
    type: 'fixed',
    value: 50,
    minOrderValue: 300,
    usageLimit: 50,
    usedCount: 12,
    isActive: true,
    validFrom: new Date('2025-01-15'),
    validUntil: new Date('2025-02-15'),
    createdAt: new Date('2025-01-15')
  },
  {
    id: 'coupon-3',
    code: 'NATAL2024',
    type: 'percentage',
    value: 20,
    maxDiscount: 200,
    usageLimit: 200,
    usedCount: 189,
    isActive: false,
    validFrom: new Date('2024-12-01'),
    validUntil: new Date('2024-12-31'),
    createdAt: new Date('2024-12-01')
  }
];

// Dashboard stats
export const dashboardStats: DashboardStats = {
  totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
  totalOrders: orders.length,
  totalCustomers: customers.length,
  pendingOrders: orders.filter(order => order.status === 'pending').length,
  lowStockItems: stockProducts.filter(product => product.status === 'low_stock' || product.status === 'out_of_stock').length,
  activeCoupons: coupons.filter(coupon => coupon.isActive).length,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3
};
