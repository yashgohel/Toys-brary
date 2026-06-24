import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import User from './pages/User';
import Wishlist from './pages/Wishlist';
import OrderHistory from './pages/OrderHistory';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken') || null);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Show dynamic toast alert
    setToast({
      visible: true,
      message: `Added "${product.name}" to cart! 🧸`
    });

    // Auto hide toast
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3000);
  };

  // Compute total items count in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navigation Bar */}
        <Navbar cartCount={cartCount} authToken={authToken} />

        {/* Dynamic Route Pages */}
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} authToken={authToken} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} authToken={authToken} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} authToken={authToken} />} />
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} authToken={authToken} />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/user" element={<User authToken={authToken} setAuthToken={setAuthToken} />} />
            <Route path="/wishlist" element={<Wishlist authToken={authToken} onAddToCart={handleAddToCart} />} />
            <Route path="/orders" element={<OrderHistory authToken={authToken} />} />
            <Route path="/admin/login" element={<AdminLogin setAuthToken={setAuthToken} />} />
            <Route path="/admin/dashboard" element={<AdminDashboard authToken={authToken} />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Premium Toast Notification Popups */}
        {toast.visible && (
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              backgroundColor: 'var(--primary-coral)',
              color: 'white',
              padding: '16px 28px',
              borderRadius: '50px',
              boxShadow: '0 10px 30px rgba(255, 112, 82, 0.35)',
              zIndex: 9999,
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: '700',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeIn 0.3s ease forwards'
            }}
          >
            {toast.message}
          </div>
        )}
      </div>
    </Router>
  );
}
