import { createAsyncThunk } from "@reduxjs/toolkit";
import { CancelToken } from "axios";
import { IEmployesGet } from "../../store/models/IEmployees";
import { api } from "../../api";



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
