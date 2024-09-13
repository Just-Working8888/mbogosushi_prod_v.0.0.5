// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { loginAsync } from '../../store/reducers/authRedusers';


interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state) => {
            state.isAuthenticated = true;
        });
    },
});

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
