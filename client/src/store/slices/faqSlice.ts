import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFaq } from '../../store/models/IFaq';
import { fetchFaq } from '../../store/reducers/FAQREduser';


interface faqState {
    data: IFaq;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: faqState = {
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


const faqSlice = createSlice({
    name: 'faq',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFaq.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchFaq.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(fetchFaq.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});

export default faqSlice.reducer;
