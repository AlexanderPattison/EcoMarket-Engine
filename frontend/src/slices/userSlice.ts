// src/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole } from '../types/user';

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

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.users = action.payload;
        },
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserRole: (state, action: PayloadAction<{ userId: string; role: UserRole }>) => {
            const { userId, role } = action.payload;
            const userIndex = state.users.findIndex(user => user._id === userId);
            if (userIndex !== -1) {
                state.users[userIndex].role = role; // This should now work as role is of type UserRole
            }
        },
    },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure, updateUserRole } = userSlice.actions;
export default userSlice.reducer;