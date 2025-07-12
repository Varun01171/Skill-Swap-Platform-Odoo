import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Browse from './pages/Browse';
import UserDetail from './pages/UserDetail';
import Requests from './pages/Requests';
import CreateSwap from './pages/CreateSwap';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <AppContent />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/browse" /> : <Landing />} />
        <Route path="/login" element={user ? <Navigate to="/browse" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/browse" /> : <Register />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/browse" element={user ? <Browse /> : <Navigate to="/login" />} />
        <Route path="/user/:id" element={user ? <UserDetail /> : <Navigate to="/login" />} />
        <Route path="/requests" element={user ? <Requests /> : <Navigate to="/login" />} />
        <Route path="/create-swap/:userId" element={user ? <CreateSwap /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;