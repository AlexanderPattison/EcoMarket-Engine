import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, User } from '@contexts/AuthContext';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Simulate API call for login
            const response = await fakeApiLogin(username, password);
            setUser(response.user);
            localStorage.setItem('authToken', response.token);
            navigate('/profile');
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    // Fake API function for demonstration
    const fakeApiLogin = (username: string, password: string) => {
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
        <div className="login-container">
            <h2>Login</h2>
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
            <button onClick={handleLogin} className="login-button">Login</button>
            <p>Don't have an account? <Link to="/signup" className="link">Sign Up</Link></p>
        </div>
    );
};

export default Login;