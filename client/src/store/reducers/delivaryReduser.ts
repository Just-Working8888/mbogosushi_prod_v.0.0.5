import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { CancelToken } from "axios";
import { IDelivary, IDelivaryDto } from "../../store/models/IDelivary";
import { api } from "../../api";

export const fetchDelivaryById = createAsyncThunk<IDelivary, { id: number, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'delivary/fetchDelivaryById',
    async ({ id, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getDelivaryById(id, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);


export const createDelivary = createAsyncThunk(
    'delivary/createDelivary',
    async ({ data }: { data: IDelivaryDto; }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.createDelivary(data, source.token);
        return response.data;
    }
);
