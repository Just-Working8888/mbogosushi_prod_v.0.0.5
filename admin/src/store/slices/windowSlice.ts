import { PayloadAction, createSlice } from '@reduxjs/toolkit';



export interface windowState {
    menuprops: {
        category: number | null
        offset: number
        limit: number
        search?: string
    }
}

const initialState: windowState = {
    menuprops: {
        category: 0,
        offset: 1,
        limit: 20,
        search: ''
    }
};


const windowSlice = createSlice({
    name: 'window',
    initialState,
    reducers: {
        setOffcet: (state, action: PayloadAction<number>) => {
            state.menuprops.offset = action.payload
        },
        setCategory: (state, action: PayloadAction<number>) => {
            state.menuprops.category = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {

            state.menuprops.search = action.payload
        },
    }
});

export const { setOffcet, setCategory, setSearch } = windowSlice.actions;

export default windowSlice.reducer;
