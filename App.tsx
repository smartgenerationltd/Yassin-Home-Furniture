import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProductProvider } from './context/ProductContext';
import { UserAuthProvider } from './context/UserAuthContext';

import HomePage from './pages/user/HomePage';
import CategoryPage from './pages/user/CategoryPage';
import ProductDetailPage from './pages/user/ProductDetailPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

// The Google Client ID is expected to be available as an environment variable.
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ProductProvider>
        <UserAuthProvider>
          <HashRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </HashRouter>
        </UserAuthProvider>
      </ProductProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
