import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDelivary } from '../../store/models/IDelivary';
import { createDelivary } from '../../store/reducers/delivaryReduser';



interface delivaryState {
    data: IDelivary;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: delivaryState = {
    data: {
        id: 0,
        price: 'loading',
        time: 'loading',
        distanse: 'loading',
    },
    status: 'idle',
    error: null,
    laoding: false
};


const delivarySlice = createSlice({
    name: 'delivary',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDelivary.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(createDelivary.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(createDelivary.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});


export default delivarySlice.reducer;
