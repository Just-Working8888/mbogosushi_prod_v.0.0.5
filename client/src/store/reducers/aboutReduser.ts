import { createAsyncThunk } from "@reduxjs/toolkit";
import { CancelToken } from "axios";
import { IAbout, IAboutFucts } from "../../store/models/IAbout";
import { api } from "../../api";

export const fetchAboutUs = createAsyncThunk<IAbout[], { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'about/fetchAboutUs',
    async ({ cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getAbout(cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);



export const fetchAboutUsFucts = createAsyncThunk<IAboutFucts[], { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'about/fetchAboutUsFucts',
    async ({ cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getAboutFucts(cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);