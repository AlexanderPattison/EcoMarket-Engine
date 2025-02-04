// src/pages/AdminDashboard.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import axios from 'axios';
import { logout } from '@slices/authSlice';
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure, updateUserRole } from '@slices/userSlice';
import { RootState } from '@store';
import { User, UserRole } from '@models/user';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const { users, loading, error } = useSelector((state: RootState) => state.users);

    const fetchUsersQuery = useQuery('users', fetchUsers, {
        enabled: isAuthenticated,
        onSuccess: (data) => dispatch(fetchUsersSuccess(data)),
        onError: (error: Error) => dispatch(fetchUsersFailure(error.message)),
        staleTime: 60000,
        cacheTime: 300000,
    });

    async function fetchUsers() {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found. Please log in again.');
        const response = await axios.get<User[]>('/admin/users', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }

    const handleChangeRoleClick = (userId: string, currentRole: string) => {
        const handleRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
            const newRole = event.target.value as UserRole;
            if (newRole !== currentRole) {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) throw new Error('No token found. Please log in again.');

                    await axios.put(`/admin/users/${userId}/role`, { role: newRole }, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    dispatch(updateUserRole({ userId, role: newRole }));
                } catch (error) {
                    console.error('Failed to update user role:', error);
                }
            }
        };

        return (
            <select value={currentRole} onChange={handleRoleChange}>
                {Object.keys(UserRole).map((key) => (
                    <option key={key} value={UserRole[key as keyof typeof UserRole]}>{UserRole[key as keyof typeof UserRole]}</option>
                ))}
            </select>
        );
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!isAuthenticated) return <p>Please log in to access the admin dashboard.</p>;

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {users.map((user: User) => (
                    <li key={user._id} style={{ margin: '10px 0', border: '1px solid black', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <>
                            <span>{user.username} - {user.role}</span>
                            {handleChangeRoleClick(user._id, user.role.toString())}
                        </>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;