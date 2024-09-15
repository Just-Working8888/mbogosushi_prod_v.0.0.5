import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../models/IUser";
import { CancelToken } from "axios";
import { api } from "../../api";

export const fetchUserByID = createAsyncThunk<IUser, { id: number, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'product/fetchUserByID',
    async ({ id, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getUserById(id, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);