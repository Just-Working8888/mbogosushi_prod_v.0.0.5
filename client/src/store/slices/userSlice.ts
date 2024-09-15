import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import { fetchUserByID } from '../reducers/userReduser';



interface userState {
    data: IUser | null
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: userState = {
    data: null,
    status: 'idle',
    error: null,
    laoding: false
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.data = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserByID.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchUserByID.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload
                state.laoding = false
            })
            .addCase(fetchUserByID.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});
export const { setUser } = userSlice.actions;


export default userSlice.reducer;
