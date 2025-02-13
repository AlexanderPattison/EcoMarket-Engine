import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UserRole } from '../models/user';

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found. Please log in again.');
            const response = await axios.get<User[]>('/admin/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || 'An error occurred');
            } else {
                return rejectWithValue('An unexpected error occurred');
            }
        }
    }
);

// New Async Thunk for updating user role
export const updateUserRole = createAsyncThunk(
    'users/updateUserRole',
    async ({ userId, role }: { userId: string; role: UserRole }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found. Please log in again.');
            const response = await axios.put(`/admin/users/${userId}/role`, { role }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data; // Assuming the backend returns the updated user or at least confirms the update
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || 'Failed to update user role');
            } else {
                return rejectWithValue('An unexpected error occurred while updating user role');
            }
        }
    }
);

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Handle the new updateUserRole thunk
            .addCase(updateUserRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.loading = false;
                // Assuming action.payload contains the updated user or confirmation of update
                const updatedUser = action.payload;
                if (updatedUser) {
                    // Update the user in the state array
                    state.users = state.users.map(user =>
                        user._id === updatedUser._id ? updatedUser : user
                    );
                }
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { } = userSlice.actions;
export default userSlice.reducer;