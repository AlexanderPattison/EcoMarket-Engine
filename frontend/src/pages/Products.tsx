import React, { useState, useEffect } from 'react';
import './Products.css';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    category: string;
    createdAt: Date;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 12;
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/products`, {
                    params: {
                        page: currentPage,
                        limit: itemsPerPage,
                        search: searchTerm,
                        sortBy: searchParams.get('sortBy') || 'name',
                        sortOrder: searchParams.get('sortOrder') || 'asc'
                    }
                });
                setProducts(response.data.products);
                setTotalProducts(response.data.count);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, searchTerm, searchParams]);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCurrentPage(1);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const sortBy = event.target.value.split('-')[0];
        const sortOrder = event.target.value.split('-')[1] || 'asc';
        setSearchParams({ sortBy, sortOrder });
        setCurrentPage(1);
    };

    if (loading) return <div>Loading...</div>;

    // Calculate the range of items being shown
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalProducts);

    return (
        <div className="products-page">
            <header className="products-header">
                <h1>All Products</h1>
                <form onSubmit={handleSearchSubmit} className="search-container">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </header>

            <div className="products-layout">
                <aside className="sidebar">
                    <div className="filter-group">
                        <h3>Sort by</h3>
                        <select className="sort-select" onChange={handleSortChange}>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                            <option value="createdAt-desc">Newest First</option>
                            <option value="createdAt-asc">Oldest First</option>
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

            <div className="pagination-container">
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
        </div>
    );
};

export default Products;