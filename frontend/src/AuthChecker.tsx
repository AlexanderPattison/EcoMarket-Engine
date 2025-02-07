import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { setUser } from './slices/authSlice';
import axios from 'axios';
import { RootState } from './store';

const AuthChecker: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated) {
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
                        dispatch(setUser(null));
                    }
                }
            }
        };

        checkAuth();
    }, [dispatch, isAuthenticated]);

    return null;
};

export default AuthChecker;