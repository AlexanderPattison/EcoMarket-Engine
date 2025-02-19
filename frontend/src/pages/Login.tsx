import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';
import axios from 'axios';
import { User } from '../models/user';
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
                    // Here you can check for specific status codes or messages
                    switch (error.response.status) {
                        case 401:
                            setError("Invalid username or password. Please try again.");
                            break;
                        case 400:
                            setError("Invalid input. Please check your username and password.");
                            break;
                        default:
                            setError(error.response.data.message || 'Login failed. Please try again.');
                    }
                } else {
                    setError('An error occurred while trying to login. Please try again later.');
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>
                Login
            </button>
            <p>
                Don't have an account?{' '}
                <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;