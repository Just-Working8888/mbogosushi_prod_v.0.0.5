import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IProductGet } from '../../store/models/IProduct';
import { fetchProduct, fetchProductByID, fetchProductPromo } from '../../store/reducers/productReduser';



interface productState {
    data: IProductGet
    promo: IProductGet
    product: IProduct
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: productState = {
    data: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    promo: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    product: {
        id: 0,
        title: "Loaing....",
        description: "Loaing....",
        price: "Loaing....",
        image: "Loaing....",
        iiko_image: "Loaing....",
        sku: "Loaing....",
        created: "Loaing....",
        category: 0,
        ingredients: []
    },
    status: 'idle',
    error: null,
    laoding: true
};


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addData: (state, action: PayloadAction<any>) => {
            state.data.results = [...state.data.results, ...action.payload.results]
        },
        clearData: (state) => {
            state.data.results = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data.count = action.payload.count
                state.data.next = action.payload.next
                state.data.results = [...state.data.results, ...action.payload.results]
                state.laoding = false
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })

            .addCase(fetchProductPromo.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchProductPromo.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data.count = action.payload.count
                state.data.next = action.payload.next
                state.promo = action.payload
                state.laoding = false
            })
            .addCase(fetchProductPromo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
            .addCase(fetchProductByID.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchProductByID.fulfilled, (state, action: PayloadAction<IProduct>) => {
                state.status = 'succeeded';
                state.product = action.payload
                state.laoding = false
            })
            .addCase(fetchProductByID.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })

    },
});

export const { addData, clearData } = productSlice.actions;
export default productSlice.reducer;
