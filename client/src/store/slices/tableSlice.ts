import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITable } from '../../store/models/ITable';
import { fetchTable, fetchTableById } from '../../store/reducers/tableReduser';



interface tableState {
    data: ITable[];
    table: ITable,
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: tableState = {
    data: [],
    table: {
        id: 0,
        title: "",
        number: 0,
        qr_code_image: "",
        count_visit: "",
        daily_visits: {} as any,
        created: ""
    },
    status: 'idle',
    error: null,
    laoding: false
};


const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTable.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchTable.fulfilled, (state, action: PayloadAction<ITable[]>) => {
                state.status = 'succeeded';
                state.data = [...state.data, ...action.payload]
                state.laoding = false
            })
            .addCase(fetchTable.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })

            .addCase(fetchTableById.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchTableById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.table = action.payload;
                state.laoding = false
            })
            .addCase(fetchTableById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })

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

// export const { } = tableSlice.actions;
export const selectCart = (state: { products: tableState }) => state.products;

export default tableSlice.reducer;
