import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/index";
import { CancelToken } from "axios";
import { IEmployesGet } from "../models/IEmployees";



export const fetchEmployes = createAsyncThunk<IEmployesGet, { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'about/fetchEmployes',
    async ({ cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getEmployes(cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
