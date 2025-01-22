import React, { useState } from 'react';
import './Cart.css';

const Cart: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="cart-page">
            <h1>Cart</h1>
            <div className="cart-dropdown" onClick={toggleDropdown}>
                <span>Cart Items</span>
                <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
                {isDropdownOpen && (
                    <div className="cart-dropdown-content">
                        <p>Here will be the list of cart items in future implementations...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;