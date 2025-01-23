import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, User } from '@contexts/AuthContext';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            console.log('Sending login data:', { username, password });
            const response = await axios.post('/api/login', { username, password });
            setUser(response.data.user);
            localStorage.setItem('authToken', response.data.token);
            navigate('/profile');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data.message || 'Login failed. Please check your credentials.');
                    console.error('Login Error Response:', error.response.data);
                } else {
                    setError('An error occurred while trying to login. Please try again later.');
                    console.error('Login Error:', error.message);
                }
            } else {
                setError('An unexpected error occurred.');
                console.error('Login Error:', error);
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="login-button">
                Login
            </button>
            <p>
                Don't have an account?{' '}
                <Link to="/signup" className="link">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;