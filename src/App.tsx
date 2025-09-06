import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import Stock from './pages/admin/Stock';
import Coupons from './pages/admin/Coupons';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AdminProvider>
          <Router>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="pedidos" element={<Orders />} />
                <Route path="clientes" element={<Customers />} />
                <Route path="estoque" element={<Stock />} />
                <Route path="cupons" element={<Coupons />} />
              </Route>

              {/* Public Routes */}
              <Route path="/*" element={
                <div className="min-h-screen bg-gray-50 flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/produtos" element={<Products />} />
                      <Route path="/carrinho" element={<Cart />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />
            </Routes>
          </Router>
        </AdminProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
