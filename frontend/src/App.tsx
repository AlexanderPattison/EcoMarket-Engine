import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from '@pages/Home';
import Wishlist from '@pages/Wishlist';
import Cart from '@pages/Cart';
import Profile from '@pages/Profile';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;