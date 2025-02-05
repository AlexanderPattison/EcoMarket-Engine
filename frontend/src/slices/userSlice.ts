import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UserRole } from '@models/user';

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

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUserRole: (state, action: PayloadAction<{ userId: string; role: UserRole }>) => {
            const { userId, role } = action.payload;
            state.users = state.users.map(user => user._id === userId ? { ...user, role } : user);
        },
    },
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
            });
    },
});

export const { updateUserRole } = userSlice.actions;
export default userSlice.reducer;