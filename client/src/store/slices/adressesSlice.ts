import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAdresses } from '../../store/reducers/adressesReduser';



interface adressesState {
    data: any;
    adressPoint: [number, number],
    adressTitle: string
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: adressesState = {
    data: {},
    adressTitle: '',
    adressPoint: [0, 0],
    status: 'idle',
    error: null,
    laoding: false
};


const adressesSlice = createSlice({
    name: 'adress',
    initialState,
    reducers: {
        setAdressTitle: (state, action: PayloadAction<string>) => {
            state.adressTitle = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdresses.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchAdresses.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(fetchAdresses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
        // .addCase(fetchAdressesById.pending, (state) => {
        //     state.status = 'pending';
        //     state.laoding = true
        // })
        // .addCase(fetchAdressesById.fulfilled, (state, action: PayloadAction<any>) => {
        //     state.status = 'succeeded';
        //     state.adressPoint = action.payload;
        //     state.laoding = false
        // })
        // .addCase(fetchAdressesById.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
        //     state.laoding = false
        // })
    },
});


export const { setAdressTitle } = adressesSlice.actions;
export default adressesSlice.reducer;
