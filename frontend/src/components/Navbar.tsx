// frontend/src/components/Navbar.tsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);

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
                <Link to="/" className="navbar-logo">
                    EcoMarket
                </Link>

                <div className="nav-right-section">
                    <NavLink to="/products" className="nav-button">
                        Products
                    </NavLink>

                    <div className="wishlist-dropdown">
                        <div onClick={toggleWishlist} className="nav-button">
                            <i className="fas fa-heart"></i> Wishlist
                        </div>
                        {isWishlistOpen && (
                            <div className="dropdown-content">
                                <NavLink to="/wishlist" className="nav-button">
                                    View Wishlist
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <div className="cart-dropdown">
                        <div onClick={toggleCart} className="nav-button">
                            <i className="fas fa-shopping-cart"></i> Cart
                        </div>
                        {isCartOpen && (
                            <div className="dropdown-content">
                                <NavLink to="/cart" className="nav-button">
                                    View Cart
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink to={user ? '/profile' : '/login'} className="nav-button">
                        <i className="fas fa-user"></i> {user ? 'Profile' : 'Login'}
                    </NavLink>

                    {user && user.role === 'admin' && (
                        <NavLink to="/admin/dashboard" className="nav-button admin-dashboard-button">
                            Admin Dashboard
                        </NavLink>
                    )}

                    {user && (user.role === 'contentCreator' || user.role === 'admin') && (
                        <NavLink to="/content-dashboard" className="nav-button">
                            Content Creator Dashboard
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;