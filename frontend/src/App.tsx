import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from '@components/Navbar';
import Home from '@pages/Home';
import Wishlist from '@pages/Wishlist';
import Cart from '@pages/Cart';
import Profile from '@pages/Profile';
import Login from '@pages/Login';
import Signup from '@pages/Signup';
import AdminDashboard from '@pages/AdminDashboard';
import AuthChecker from './AuthChecker';
import './App.css';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
    const AdminRoute = ({ children }: { children: React.ReactNode }) => {
        const user = store.getState().auth.user;

        if (user && user.role === 'admin') {
            return <>{children}</>;
        } else {
            return <Navigate to="/" replace />;
        }
    };

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <AuthChecker />
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/admin/dashboard"
                            element={
                                <AdminRoute>
                                    <AdminDashboard />
                                </AdminRoute>
                            }
                        />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </Provider>
    );
};

const App: React.FC = () => {
    return <AppContent />;
};

export default App;