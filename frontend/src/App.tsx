import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserAuthProvider } from '@contexts/UserAuthContext';
import Navbar from '@components/Navbar';
import Login from '@pages/Login';
import Account from '@pages/Account';
import Home from '@pages/Home';

function App() {
    return (
        <UserAuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/account" element={<Account />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </UserAuthProvider>
    );
}

export default App;