import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPeviewsGet } from '../../store/models/IReviews';
import { fetchReviews } from '../../store/reducers/reviewsReduser';



interface shopState {
    data: IPeviewsGet;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: shopState = {
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


const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<IPeviewsGet>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })

        // .addCase(fetchShops.pending, (state) => {
        //     state.status = 'pending';
        //     state.laoding = true
        // })
        // .addCase(fetchShops.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     state.data = action.payload;
        //     state.laoding = false
        // })
        // .addCase(fetchShops.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
        //     state.laoding = false
        // })

        // .addCase(fetchShopById.pending, (state) => {
        //     state.status = 'pending';
        //     state.laoding = true
        // })
        // .addCase(fetchShopById.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     state.selectedShop = action.payload;
        //     state.laoding = false
        // })
        // .addCase(fetchShopById.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.error ? action.error.message || 'Failed to fetch product' : 'Failed to fetch product';
        //     state.laoding = false
        // });
    },
});

// export const { } = reviewsSlice.actions;
export const selectReviews = (state: { products: shopState }) => state.products;

export default reviewsSlice.reducer;
