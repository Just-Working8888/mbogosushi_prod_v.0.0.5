import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPromoCode } from '../reducers/promoCode';
import { IPromoCodeREsponce } from '../models/IPromo';



interface promoCodeState {
    data: IPromoCodeREsponce
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: promoCodeState = {
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


const promo = createSlice({
    name: 'promo',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPromoCode.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchPromoCode.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload
                state.laoding = false
            })
            .addCase(fetchPromoCode.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});


export default promo.reducer;
