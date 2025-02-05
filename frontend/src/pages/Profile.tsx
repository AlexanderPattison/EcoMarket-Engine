// frontend/src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, logout } from '@store';
import axios from 'axios';
import { User } from '@models/user';
import { useNavigate } from 'react-router-dom'; // Import this if not already done
import './Profile.css';

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const [isLoading, setIsLoading] = useState(true);
    const [logoutError, setLogoutError] = useState<string | null>(null);
    const navigate = useNavigate(); // Use this for navigation

    useEffect(() => {
        if (user) {
            setIsLoading(false);
        } else {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            dispatch(logout());
            navigate('/login'); // Redirect to login page after logout
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setLogoutError(error.response?.data.message || 'Logout failed');
            } else {
                setLogoutError('An error occurred while logging out');
            }
            // Still clear local state even if the API call fails
            dispatch(logout());
            navigate('/login'); // Redirect even if there's an error with the logout API call
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {user ? (
                <>
                    <p className="welcome-message">Welcome, {user.username}!</p>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                    {logoutError && <p className="error-message">{logoutError}</p>}
                </>
            ) : (
                <p className="login-message">Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;