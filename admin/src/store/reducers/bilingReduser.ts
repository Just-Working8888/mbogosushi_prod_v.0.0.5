import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { api } from "../../api/index";
import axios, { CancelToken } from "axios";
import { IBiling, IBilingGet } from "../models/IBiling";

export const createBiling = createAsyncThunk(
    'biling/createBiling',
    async ({ data }: { data: IBiling; }, { signal }) => {

        try {
            const source = axios.CancelToken.source();
            signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
            const response = await api.createBilingItem(data, source.token);
            message.success('Successfully created')

            return response.data;
        } catch (error) {
            message.error('Ошибка сервера')
        } finally {
            localStorage.removeItem('cart_id')
            localStorage.removeItem('table_key')
            localStorage.removeItem('session_key')
        }

    }
);

export const fetchBiling = createAsyncThunk<IBilingGet, { pagination: string, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'biling/fetchBiling',
    async ({ cancelToken, pagination }, { rejectWithValue }) => {
        try {
            const response = await api.getBilingItem(pagination, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);

