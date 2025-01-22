import React from 'react';
import { useUserAuth } from '../contexts/UserAuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { login } = useUserAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login();
        navigate("/account"); // Redirect to account after login
    };

    return (
        <button onClick={handleLogin}>Login</button>
    );
};

export default Login;