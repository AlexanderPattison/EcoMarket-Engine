import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserAuth = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
};

const UserAuthContext = createContext<UserAuth | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <UserAuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuth = (): UserAuth => {
    const context = useContext(UserAuthContext);
    if (context === undefined) {
        throw new Error('useUserAuth must be used within a UserAuthProvider');
    }
    return context;
};