import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleWishlist = () => {
        setIsWishlistOpen(!isWishlistOpen);
        setIsCartOpen(false);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
        setIsWishlistOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">EcoMarket</Link>

                <div className="search-container">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button type="submit" className="search-button">Search</button>
                </div>

                <div className="nav-right-section">
                    <div className="wishlist-dropdown">
                        <div onClick={toggleWishlist} className="nav-button">
                            <i className="fas fa-heart"></i> Wishlist
                        </div>
                        {isWishlistOpen && (
                            <div className="dropdown-content">
                                <NavLink to="/wishlist" className="nav-button">View Wishlist</NavLink>
                            </div>
                        )}
                    </div>

                    <div className="cart-dropdown">
                        <div onClick={toggleCart} className="nav-button">
                            <i className="fas fa-shopping-cart"></i> Cart
                        </div>
                        {isCartOpen && (
                            <div className="dropdown-content">
                                <NavLink to="/cart" className="nav-button">View Cart</NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink to="/profile" className="nav-button">
                        <i className="fas fa-user"></i> Profile
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;