import React from 'react';
import { useUserAuth } from '../contexts/UserAuthContext';

const Account: React.FC = () => {
    const { logout } = useUserAuth();

    return (
        <div>
            <h1>Account Page</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Account;