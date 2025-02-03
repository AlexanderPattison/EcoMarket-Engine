import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';
import axios from 'axios';
import { User } from '../types/user';
import './Login.css';

interface LoginResponse {
    user: User;
    token: string;
}

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = useCallback(async () => {
        try {
            const response = await axios.post<LoginResponse>('/api/login', { username, password });
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
            navigate('/profile');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(
                        error.response.data.message ||
                        'Login failed. Please check your credentials.',
                    );
                } else {
                    setError(
                        'An error occurred while trying to login. Please try again later.',
                    );
                }
            } else {
                setError('An unexpected error occurred.');
            }
        }
    }, [username, password, dispatch, navigate]);

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