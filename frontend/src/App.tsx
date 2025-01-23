import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@contexts/AuthContext';
import Navbar from '@components/Navbar';
import Home from '@pages/Home';
import Wishlist from '@pages/Wishlist';
import Cart from '@pages/Cart';
import Profile from '@pages/Profile';
import Login from '@pages/Login';
import Signup from '@pages/Signup';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
