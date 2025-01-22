import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { useUserAuth } from '@contexts/UserAuthContext';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming this is where you've put your styles

const Navbar: React.FC = () => {
    const { isLoggedIn } = useUserAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-search">
                    <input type="text" placeholder="Search EcoMarket..." />
                </div>
                <div className="navbar-icons">
                    <FontAwesomeIcon icon={faHeart} />  {/* Wishlist */}
                    <FontAwesomeIcon icon={faShoppingCart} />  {/* Shopping Cart */}
                    <Link to={isLoggedIn ? "/account" : "/login"}>
                        <FontAwesomeIcon icon={faUser} />  {/* Account */}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;