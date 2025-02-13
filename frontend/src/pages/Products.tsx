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
    const [categories, setCategories] = useState<string[]>([]);
    const [priceRanges, setPriceRanges] = useState<string[]>([]);
    const itemsPerPage = 12;
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<string[]>('/api/products/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const sortParams = searchParams.get('sort')?.split('-') || ['name', 'asc'];
                const [sortBy, sortOrder] = sortParams;

                const response = await axios.get(`/api/products`, {
                    params: {
                        page: currentPage,
                        limit: itemsPerPage,
                        search: searchTerm,
                        sortBy,
                        sortOrder,
                        category: searchParams.get('category') || undefined,
                        priceRanges: searchParams.get('priceRanges')?.split(',') || undefined
                    }
                });
                setProducts(response.data.products);
                setTotalProducts(response.data.count);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
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
        const sortValue = event.target.value;
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), sort: sortValue });
        setCurrentPage(1);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = event.target.value === '' ? null : event.target.value;
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), category: newCategory || '' });
        setCurrentPage(1);
    };

    const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>, range: string) => {
        let newRanges = [...priceRanges];
        if (event.target.checked) {
            newRanges.push(range);
        } else {
            newRanges = newRanges.filter(r => r !== range);
        }
        setPriceRanges(newRanges);
        const newParams = { ...Object.fromEntries(searchParams.entries()) };
        if (newRanges.length === 0) {
            delete newParams.priceRanges;
        } else {
            newParams.priceRanges = newRanges.join(',');
        }
        setSearchParams(newParams);
        setCurrentPage(1);
    };

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
                        <select className="sort-select" onChange={handleSortChange} value={searchParams.get('sort') || 'name-asc'}>
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
                        <select className="category-select" onChange={handleCategoryChange} value={searchParams.get('category') || ''}>
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <h3>Price</h3>
                        <div className="price-ranges">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handlePriceRangeChange(e, 'under20')}
                                    checked={priceRanges.includes('under20')}
                                /> Under $20
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handlePriceRangeChange(e, '20to50')}
                                    checked={priceRanges.includes('20to50')}
                                /> $20 - $50
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handlePriceRangeChange(e, 'above50')}
                                    checked={priceRanges.includes('above50')}
                                /> $50+
                            </label>
                        </div>
                    </div>
                </aside>

                <main className="product-grid">
                    {loading ?
                        <div>Loading...</div>
                        :
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    }
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