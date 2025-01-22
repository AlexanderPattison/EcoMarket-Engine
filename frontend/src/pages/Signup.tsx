import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, User } from '@contexts/AuthContext';
import './Signup.css';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            // Simulate API call for signup
            const response = await fakeApiSignup(username, password);
            setUser(response.user);
            localStorage.setItem('authToken', response.token);
            navigate('/profile');
        } catch (error) {
            alert('Signup failed. Please try again.');
        }
    };

    // Fake API function for demonstration
    const fakeApiSignup = (username: string, password: string) => {
        return new Promise<{ user: User; token: string }>((resolve) => {
            setTimeout(() => {
                resolve({
                    user: { id: '1', name: username },
                    token: 'fake-jwt-token'
                });
            }, 1000);
        });
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
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
            <button onClick={handleSignup} className="signup-button">Sign Up</button>
            <p>Already have an account? <Link to="/login" className="link">Login</Link></p>
        </div>
    );
};

export default Signup;