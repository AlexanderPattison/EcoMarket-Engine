import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/authSlice';
import axios from 'axios';

const AuthChecker: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/api/user', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const userWithUsername = { ...response.data.user, username: response.data.user.name };
                    dispatch(setUser(userWithUsername));
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
        };

        checkAuth();
    }, [dispatch]);

    return null;
};

export default AuthChecker;