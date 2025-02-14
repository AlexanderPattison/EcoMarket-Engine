import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchUsers, updateUserRole } from '../../slices/userSlice';
import { User, UserRole } from '../../models/user';
import { RootState } from '../../store';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
    const { users, loading, error } = useAppSelector((state: RootState) => state.users);

    React.useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUsers());
        }
    }, [dispatch, isAuthenticated]);

    const handleRoleChange = (userId: string, newRole: UserRole) => {
        dispatch(updateUserRole({ userId, role: newRole }));
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!isAuthenticated) return <p>Please log in to access the admin panel.</p>;

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <ul>
                {users.map((user: User) => (
                    <li key={user._id}>
                        <span>{user.username} - {user.role}</span>
                        <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id, e.target.value as UserRole)}
                        >
                            {Object.values(UserRole).map((role) => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;