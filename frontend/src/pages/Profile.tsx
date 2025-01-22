import React from 'react';
import { useAuth } from '@contexts/AuthContext';
import './Profile.css';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {user ? (
                <>
                    <p className="welcome-message">Welcome, {user.name}!</p>
                    <button onClick={logout} className="logout-button">Logout</button>
                </>
            ) : (
                <p className="login-message">Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;