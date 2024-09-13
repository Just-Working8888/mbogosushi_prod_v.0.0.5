import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/index";
import { CancelToken } from "axios";
import { ICategories } from "../models/Categories";

export const fetchCategories = createAsyncThunk<ICategories[], { pagination: string, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'category/fetchCategories',
    async ({ cancelToken, pagination }, { rejectWithValue }) => {
        try {
            const response = await api.getCategories(pagination, cancelToken);
            return response.data 
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
