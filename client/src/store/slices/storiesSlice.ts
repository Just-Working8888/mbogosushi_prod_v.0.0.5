import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchStories } from '../reducers/storiesReduser';
import { ApiResponseSories } from '../models/IStories';



interface categoryState {
    data: ApiResponseSories
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: categoryState = {
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


const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStories.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchStories.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload
                state.laoding = false
            })
            .addCase(fetchStories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});


export default storiesSlice.reducer;
