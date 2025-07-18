import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, LogOut, Home, Plus, MapPin, Bell, User as UserIcon, History, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout, notifications, markNotificationAsRead } = useAuth();
  const location = useLocation();

  const donorLinks = [
    { to: '/donor/dashboard', icon: Home, label: 'Dashboard', emoji: '🏠' },
    { to: '/donor/create-post', icon: Plus, label: 'Create Post', emoji: '➕' },
    { to: '/donor/history', icon: History, label: 'My History', emoji: '📊' },
  ];

  const volunteerLinks = [
    { to: '/volunteer/dashboard', icon: MapPin, label: 'Find Food', emoji: '🔍' },
    { to: '/volunteer/history', icon: History, label: 'My Claims', emoji: '📊' },
    { to: '/volunteer/badges', icon: Award, label: 'My Badges', emoji: '🏆' },
  ];

  const links = user?.role === 'donor' ? donorLinks : volunteerLinks;

  const isActive = (path: string) => location.pathname === path;
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-2xl group-hover:from-green-600 group-hover:to-emerald-700 transition-all duration-300 shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
              FoodLoop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {links.map(({ to, icon: Icon, label, emoji }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                  isActive(to)
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <span className="text-lg">{emoji}</span>
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full hover:bg-green-50 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                      <Bell className="w-5 h-5" />
                      <span>Notifications</span>
                    </h3>
                  </div>
                  
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="text-4xl mb-2">🔔</div>
                      <p className="text-gray-500">No notifications yet</p>
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.slice(0, 10).map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => markNotificationAsRead(notification.id)}
                          className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="text-2xl">
                              {notification.type === 'new_post' ? '🍽️' : 
                               notification.type === 'post_claimed' ? '🤝' : '🏆'}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm">
                                {notification.title}
                              </h4>
                              <p className="text-gray-600 text-xs mt-1">
                                {notification.message}
                              </p>
                              <p className="text-gray-400 text-xs mt-1">
                                {new Date(notification.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Food Saved Counter */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl px-4 py-2 border border-green-200">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🌱</span>
                <div>
                  <p className="text-xs text-green-700 font-medium">Food Saved</p>
                  <p className="text-sm font-bold text-green-800">
                    {user?.totalFoodSaved || 0}kg
                  </p>
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-3 border border-green-200">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">{user?.name}</div>
                <div className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full">
                  {user?.role === 'donor' ? '🏪 Donor' : '🤝 Volunteer'}
                </div>
                {user?.role === 'volunteer' && user.totalClaims !== undefined && (
                  <div className="text-xs text-orange-600 font-medium">
                    {user.totalClaims} claims
                  </div>
                )}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-2xl hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-2xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-green-100 m-4 p-4">
            <div className="space-y-2">
              {links.map(({ to, icon: Icon, label, emoji }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                    isActive(to)
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl">{emoji}</span>
                  <span>{label}</span>
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                {/* Food Saved Counter Mobile */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 mb-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🌱</span>
                      <div>
                        <p className="text-sm text-green-700 font-medium">Food Saved</p>
                        <p className="text-lg font-bold text-green-800">
                          {user?.totalFoodSaved || 0}kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile User Profile */}
                <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{user?.name}</div>
                    <div className="text-xs text-green-600 font-medium">
                      {user?.role === 'donor' ? '🏪 Donor' : '🤝 Volunteer'}
                    </div>
                    {user?.role === 'volunteer' && user.totalClaims !== undefined && (
                      <div className="text-xs text-orange-600 font-medium">
                        {user.totalClaims} claims
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Logout */}
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50 mt-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Click outside to close notifications */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowNotifications(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;