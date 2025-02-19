import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    category: string;
    affiliateLink?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const isAmazonProduct = !!product.affiliateLink;

    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description.length > 50 ? product.description.slice(0, 50) + '...' : product.description}</p>
            <div className="product-info">
                <span className="price">${product.price.toFixed(2)}</span>
                {product.stock <= 0 ? (
                    <span className="stock-info out-of-stock">Out of Stock</span>
                ) : (
                    product.stock < 5 ? (
                        <span className="stock-info low-stock">Only {product.stock} Left!</span>
                    ) : (
                        <span className="stock-info">In Stock: {product.stock}</span>
                    )
                )}
            </div>
            <div className="action-buttons">
                {isAmazonProduct ? (
                    <button
                        className="buy-on-amazon"
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
                        }}
                    >
                        Buy on Amazon
                    </button>
                ) : (
                    <button
                        className="add-to-cart"
                        disabled={product.stock <= 0}
                    >
                        {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                )}
                <FontAwesomeIcon icon={faHeart} className="wishlist-icon" />
            </div>
        </div>
    );
};

export default ProductCard;