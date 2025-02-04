import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, logout } from '@store';
import { User } from '@models/user';
import './Profile.css';

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const [isLoading, setIsLoading] = useState(true);

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {user ? (
                <>
                    <p className="welcome-message">Welcome, {user.username}!</p>
                    <button onClick={() => dispatch(logout())} className="logout-button">
                        Logout
                    </button>
                </>
            ) : (
                <p className="login-message">Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;