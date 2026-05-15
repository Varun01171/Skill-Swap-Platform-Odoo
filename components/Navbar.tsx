import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Search, MessageSquare, LogOut, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/browse" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900 dark:text-white font-semibold text-lg">SkillSwap</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/browse"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive('/browse')
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Browse</span>
            </Link>

            <Link
              to="/requests"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive('/requests')
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Requests</span>
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive('/profile')
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Profile</span>
            </Link>

            <ThemeToggle />

            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-xl border border-gray-200 dark:border-gray-700"
              />
              <button
                onClick={logout}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}