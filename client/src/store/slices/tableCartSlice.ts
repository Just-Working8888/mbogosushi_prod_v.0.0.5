import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITableOrderById } from '../../store/models/ITableOrderItem';
import { fetchOrderItemById } from '../../store/reducers/TableOrderReduser';



interface tableCartState {
    data: ITableOrderById;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: tableCartState = {
    data: {
        id: 0,
        menu_table: 0,
        items: [],
        discount_amount: 0,
        promo_code: true,
        created: 'loading'
    },
    status: 'idle',
    error: null,
    laoding: false
};


const TableCartSlice = createSlice({
    name: 'tableCart',
    initialState,
    reducers: {
        removeItem: (state, action: PayloadAction<number>) => {
            state.data.items = state.data.items.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderItemById.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchOrderItemById.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(fetchOrderItemById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});

export const { removeItem } = TableCartSlice.actions;

export default TableCartSlice.reducer;
