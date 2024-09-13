import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategories } from '../../store/models/Categories';
import { fetchCategories } from '../../store/reducers/Categories';



interface categoryState {
    data: {
        count: number
        next: null | string
        previous: null | string
        results: ICategories[]
    };
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


const Cagtegories = createSlice({
    name: 'categories',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload
                state.laoding = false
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});

export const selectCart = (state: { products: categoryState }) => state.products;

export default Cagtegories.reducer;
