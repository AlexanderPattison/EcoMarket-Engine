// frontend/src/pages/Products.tsx
import React, { useState, useEffect } from 'react';
import './Products.css';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/ProductCard';

// Add the heart icon to the library once
library.add(faHeart);

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    category: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 12; // or however many you want per page

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/products?page=${currentPage}&limit=${itemsPerPage}`);
                setProducts(response.data.products);
                setTotalProducts(response.data.count); // Assuming your API returns the total count
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) return <div>Loading...</div>;

    // Calculate the range of items being shown
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalProducts);

    return (
        <div className="products-page">
            <header className="products-header">
                <h1>All Products</h1>
            </header>

            <div className="products-layout">
                <aside className="sidebar">
                    <div className="filter-group">
                        <h3>Sort by</h3>
                        <select className="sort-select">
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                            <option value="best-selling">Best Selling</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <h3>Categories</h3>
                        <select className="category-select">
                            <option value="">All Categories</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="home">Home & Garden</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <h3>Price</h3>
                        <div className="price-ranges">
                            <label>
                                <input type="checkbox" /> Under $20
                            </label>
                            <label>
                                <input type="checkbox" /> $20 - $50
                            </label>
                            <label>
                                <input type="checkbox" /> $50+
                            </label>
                        </div>
                    </div>
                </aside>

                <main className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </main>
            </div>

            <footer className="pagination">
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <div className="items-info">
                    Showing {startIndex} - {endIndex} of {totalProducts} items
                </div>
            </footer>
        </div>
    );
};

export default Products;