import React, { useState } from 'react';
import './Wishlist.css';

const Wishlist: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="wishlist-page">
      <h1>Wishlist</h1>
      <div className="wishlist-dropdown" onClick={toggleDropdown}>
        <span>Wishlist Items</span>
        <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
        {isDropdownOpen && (
          <div className="wishlist-dropdown-content">
            <p>
              Here will be the list of wishlist items in future
              implementations...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
