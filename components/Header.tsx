import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { useUserAuth } from '../context/UserAuthContext';

const Header: React.FC = () => {
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-brand-dark font-serif">
          Yassin Home
        </Link>
        <nav className="hidden md:flex flex-grow justify-center space-x-8">
          {CATEGORIES.map(category => (
            <NavLink
              key={category}
              to={`/category/${encodeURIComponent(category)}`}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-300 ${
                  isActive ? 'text-brand-primary' : 'text-gray-600 hover:text-brand-primary'
                }`
              }
            >
              {category}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {!isHomePage && (
            <button
              onClick={handleBackClick}
              className="flex items-center text-sm text-gray-500 hover:text-brand-primary transition-colors"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
          {user ? (
            <>
              <Link
                to="/admin/dashboard"
                className="text-sm font-semibold text-brand-primary hover:underline transition-colors"
              >
                Admin Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                {user.picture && <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />}
                <span className="text-sm text-gray-700 hidden lg:inline">{user.name || 'Admin'}</span>
              </div>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-brand-primary transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
             <Link to="/admin/login" className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition-colors">
                Admin Login
             </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;