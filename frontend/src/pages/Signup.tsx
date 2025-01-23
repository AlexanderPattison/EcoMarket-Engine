// Signup.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import axios from 'axios';
import './Signup.css';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Type annotation for clarity
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('/api/signup', { username, password });
      setUser(response.data.user);
      localStorage.setItem('authToken', response.data.token);
      navigate('/profile');
    } catch (error) {
      // Use the error here
      setError('Signup failed. Please try again.');
      // If you want to show an alert as well
      alert(error);
    }
  };

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
