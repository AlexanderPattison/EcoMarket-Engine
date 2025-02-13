import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../../models/product';
import './ProductListing.css';

const ProductListing: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchProducts();
    }, [currentPage, searchTerm]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/products`, {
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                    search: searchTerm
                }
            });
            setProducts(response.data.products);
            setTotalPages(Math.ceil(response.data.count / itemsPerPage));
            // Clear any previous error or success message when fetching new data
            setError(null);
            setSuccessMessage(null);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setError('Failed to load products. Please try again later.');
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct({ ...product });
        // Clear any error or success message when starting to edit
        setError(null);
        setSuccessMessage(null);
    };

    const handleSave = async (product: Product) => {
        try {
            await axios.put(`/api/products/${product._id}`, product);
            setSuccessMessage('Product updated successfully!');
            // Delay the fetchProducts call to ensure the success message is visible
            setTimeout(() => {
                fetchProducts();
                setEditingProduct(null);
                setError(null);
            }, 3000); // A small delay, adjust as necessary
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle specific axios errors
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setError(`Server Error: ${error.response.data.message || 'An error occurred while updating the product.'}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    setError('No response from server. Please check your connection.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setError('Error setting up the request: ' + error.message);
                }
            } else {
                // Non-axios error
                setError('An unexpected error occurred: ' + (error as Error).message);
            }
            console.error('Failed to update product:', error);
        }
    };

    const handleCancel = () => {
        setEditingProduct(null);
        // Clear any error or success message when cancelling edit
        setError(null);
        setSuccessMessage(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Product) => {
        if (editingProduct) {
            setEditingProduct({
                ...editingProduct,
                [field]: field === 'price' || field === 'stock' ? parseFloat(e.target.value) : e.target.value
            });
        }
    };

    return (
        <div className="product-listing">
            <h2>Product Listing</h2>
            <div className="creator-search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="search-input"
                />
            </div>
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="product-table">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Affiliate Link</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td><img src={product.imageUrl} alt={product.name} className="product-image" /></td>
                                <td>
                                    {editingProduct && editingProduct._id === product._id ? (
                                        <input
                                            type="text"
                                            value={editingProduct.name}
                                            onChange={(e) => handleInputChange(e, 'name')}
                                        />
                                    ) : (
                                        product.name
                                    )}
                                </td>
                                <td>
                                    {editingProduct && editingProduct._id === product._id ? (
                                        <input
                                            type="text"
                                            value={editingProduct.description}
                                            onChange={(e) => handleInputChange(e, 'description')}
                                        />
                                    ) : (
                                        product.description.length > 50 ? product.description.slice(0, 50) + '...' : product.description
                                    )}
                                </td>
                                <td>
                                    {editingProduct && editingProduct._id === product._id ? (
                                        <input
                                            type="number"
                                            value={editingProduct.price}
                                            onChange={(e) => handleInputChange(e, 'price')}
                                            step="0.01"
                                        />
                                    ) : (
                                        `$${product.price.toFixed(2)}`
                                    )}
                                </td>
                                <td>
                                    {editingProduct && editingProduct._id === product._id ? (
                                        <input
                                            type="number"
                                            value={editingProduct.stock}
                                            onChange={(e) => handleInputChange(e, 'stock')}
                                        />
                                    ) : (
                                        product.stock
                                    )}
                                </td>
                                <td>
                                    {editingProduct && editingProduct._id === product._id ? (
                                        <input
                                            type="text"
                                            value={editingProduct.category}
                                            onChange={(e) => handleInputChange(e, 'category')}
                                        />
                                    ) : (
                                        product.category
                                    )}
                                </td>
                                <td>
                                    {editingProduct && editingProduct._id === product._id ? (
                                        <input
                                            type="text"
                                            value={editingProduct.affiliateLink || ''}
                                            onChange={(e) => handleInputChange(e, 'affiliateLink')}
                                        />
                                    ) : (
                                        product.affiliateLink ? (
                                            <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="affiliate-link">
                                                {product.affiliateLink}
                                            </a>
                                        ) : (
                                            'N/A'
                                        )
                                    )}
                                </td>
                                <td>
                                    {editingProduct && editingProduct._id === product._id ? (
                                        <>
                                            <button onClick={() => handleSave(editingProduct)}>Save</button>
                                            <button onClick={handleCancel}>Cancel</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEdit(product)}>Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default ProductListing;