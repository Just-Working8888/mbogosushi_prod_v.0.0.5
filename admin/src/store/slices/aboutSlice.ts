import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAboutFuctsGet, IAboutGet } from '../models/IAbout';
import { fetchAboutUs, fetchAboutUsFucts } from '../reducers/aboutReduser';



interface aboutState {
    data: IAboutGet;
    facts: IAboutFuctsGet
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: aboutState = {
    data: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    facts: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },

    status: 'idle',
    error: null,
    laoding: false
};


const aboutSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAboutUs.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchAboutUs.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(fetchAboutUs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
            .addCase(fetchAboutUsFucts.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchAboutUsFucts.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.facts = action.payload;
                state.laoding = false
            })
            .addCase(fetchAboutUsFucts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});

export const selectCart = (state: { products: aboutState }) => state.products;

export default aboutSlice.reducer;
