import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAdressesById } from '../../store/reducers/adressesReduser';



interface PointState {
    adressPoint: [number, number]
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: PointState = {
    adressPoint: [74.593379, 42.878941],
    status: 'idle',
    error: null,
    laoding: false
};


const PointsSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdressesById.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchAdressesById.fulfilled, (state, action: PayloadAction<[number, number]>) => {
                state.status = 'succeeded';
                if (action.payload[0] && action.payload[1]) {
                    state.adressPoint = [action.payload[0], action.payload[1]];
                }
                state.laoding = false
            })
            .addCase(fetchAdressesById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});


export default PointsSlice.reducer;
