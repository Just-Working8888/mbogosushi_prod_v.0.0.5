import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBilingGet } from '../models/IBiling';
import { fetchBiling } from '../reducers/bilingReduser';



interface bilingState {
    data: IBilingGet
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: bilingState = {
    data: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    status: 'idle',
    error: null,
    laoding: false
};


const biling = createSlice({
    name: 'biling',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBiling.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchBiling.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload
                state.laoding = false
            })
            .addCase(fetchBiling.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});


export default biling.reducer;
