// src/pages/Signup.tsx
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';
import axios from 'axios';
import { User } from '../types/user';
import './Signup.css';

// Define the structure of the signup response
interface SignupResponse {
    user: User;
    token: string;
}

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Use useCallback to memoize the handleSignup function
    const handleSignup = useCallback(async () => {
        try {
            const response = await axios.post<SignupResponse>('/api/signup', { username, password });
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
            navigate('/profile');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data.message || 'Signup failed. Please try again.');
                } else {
                    setError('An error occurred while trying to sign up. Please try again later.');
                }
            } else {
                setError('An unexpected error occurred.');
            }
        }
    }, [username, password, dispatch, navigate]);

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
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
            <button onClick={handleSignup} className="signup-button">
                Sign Up
            </button>
            <p>
                Already have an account?{' '}
                <Link to="/login" className="link">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Signup;