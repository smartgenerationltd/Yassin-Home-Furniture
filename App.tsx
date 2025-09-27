import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { UserAuthProvider } from './context/UserAuthContext';
import { CartProvider } from './context/CartContext';

import HomePage from './pages/user/HomePage';
import CategoryPage from './pages/user/CategoryPage';
import ProductDetailPage from './pages/user/ProductDetailPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSignUp from './pages/admin/AdminSignUp';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ProductProvider>
      <UserAuthProvider>
        <CartProvider>
          <HashRouter>
            <Routes>
              {/* Public User Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/signup" element={<AdminSignUp />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </HashRouter>
        </CartProvider>
      </UserAuthProvider>
    </ProductProvider>
  );
}

export default App;
