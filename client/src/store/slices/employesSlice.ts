import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployesGet } from '../../store/models/IEmployees';
import { fetchEmployes } from '../../store/reducers/employeesReduser';



interface employesState {
    data: IEmployesGet;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: employesState = {
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


const employeSlice = createSlice({
    name: 'employes',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployes.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchEmployes.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(fetchEmployes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});

export const selectCart = (state: { products: employesState }) => state.products;

export default employeSlice.reducer;
