import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/index";
import { CancelToken } from "axios";
import { IAboutFuctsGet, IAboutGet } from "../models/IAbout";

export const fetchAboutUs = createAsyncThunk<IAboutGet, { cancelToken?: CancelToken }, { rejectValue?: string }>(
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



export const fetchAboutUsFucts = createAsyncThunk<IAboutFuctsGet, { cancelToken?: CancelToken }, { rejectValue?: string }>(
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