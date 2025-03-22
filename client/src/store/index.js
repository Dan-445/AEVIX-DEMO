import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import careersReducer from '../features/careers/careersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        careers: careersReducer
    }
}); 