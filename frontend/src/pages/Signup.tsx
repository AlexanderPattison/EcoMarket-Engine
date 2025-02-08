import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';
import axios from 'axios';
import { User } from '../models/user';
import './Signup.css';

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

    const handleSignup = useCallback(async () => {
        try {
            const response = await axios.post<SignupResponse>('/api/signup', { username, password });
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
            navigate('/profile');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Here you can check for specific status codes or messages from the backend
                    switch (error.response.status) {
                        case 409: // Assuming conflict for username already exists
                            setError("Username already exists. Please choose another one.");
                            break;
                        case 400:
                            setError("Invalid input. Please check your credentials.");
                            break;
                        default:
                            setError(error.response.data.message || 'Signup failed. Please try again.');
                    }
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>
                Sign Up
            </button>
            <p>
                Already have an account?{' '}
                <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;