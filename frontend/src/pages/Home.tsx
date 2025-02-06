// frontend/src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5; // Number of products per page

    useEffect(() => {
        axios.get(`/api/products?page=${page}&limit=${limit}`).then(response => {
            const { products, count } = response.data;
            setProducts(products);
            setTotalPages(Math.ceil(count / limit));
        }).catch(error => {
            console.error("Failed to fetch products", error);
        });
    }, [page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="home-page">
            <h1>Welcome to EcoMarket</h1>
            <div className="product-list">
                {products.map(product => (
                    <div key={product._id} className="product-item">
                        <img src={product.imageUrl} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
    stock: number;
}

export default Home;