// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store['dispatch'];

// Export actions from slices
export { setUser, logout } from './slices/authSlice';
export { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure, updateUserRole } from './slices/userSlice';