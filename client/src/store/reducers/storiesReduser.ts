import { createAsyncThunk } from "@reduxjs/toolkit";
import { CancelToken } from "axios";
import { api } from "../../api";
import { ApiResponseSories } from "../models/IStories";

export const fetchStories = createAsyncThunk<ApiResponseSories, { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'category/fetchStories',
    async ({ cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getStories(cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
