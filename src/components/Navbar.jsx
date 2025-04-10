import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // If you implement AuthContext

function Navbar() {
  const { user, logout } = useContext(AuthContext) || {}; // Use context if available

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              NEUShop
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className={({ isActive }) => 'px-3 py-2 rounded-md text-sm font-medium ' + (isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-700 hover:text-white')}>
                  Home
                </NavLink>
                <NavLink to="/products" className={({ isActive }) => 'px-3 py-2 rounded-md text-sm font-medium ' + (isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-700 hover:text-white')}>
                  Products
                </NavLink>
                {user?.role === 'seller' && (
                  <NavLink to="/seller-dashboard" className={({ isActive }) => 'px-3 py-2 rounded-md text-sm font-medium ' + (isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-700 hover:text-white')}>
                    Seller Dashboard
                  </NavLink>
                )}
                {user?.role === 'admin' && (
                  <NavLink to="/admin-dashboard" className={({ isActive }) => 'px-3 py-2 rounded-md text-sm font-medium ' + (isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-700 hover:text-white')}>
                    Admin Dashboard
                  </NavLink>
                )}
                <NavLink to="/cart" className={({ isActive }) => 'px-3 py-2 rounded-md text-sm font-medium ' + (isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-700 hover:text-white')}>
                  Cart
                </NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://via.placeholder.com/48" // Replace with user avatar if available
                        alt=""
                      />
                    </button>
                  </div>
                  {/* Profile dropdown (implement later) */}
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link to="/login" className="text-gray-600 hover:text-gray-900">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-600 hover:text-gray-900">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button (implement later) */}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on mobile menu state (implement later) */}
    </nav>
  );
}

export default Navbar;