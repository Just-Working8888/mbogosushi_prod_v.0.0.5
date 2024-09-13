import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/index";
import axios, { CancelToken } from "axios";
import { ITableOrderDto } from "../models/ITableOrder";
import { ITableOrderById, ITableOrderItemDto } from "../models/ITableOrderItem";

export const createTableOrder = createAsyncThunk(
    'Table/createTableOrder',
    async ({ data }: { data: ITableOrderDto; }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.createTableOrder(data, source.token);
        return response.data;
    }
);


export const addTableOrderItem = createAsyncThunk(
    'table/addTableOrderItem',
    async ({ data }: { data: ITableOrderItemDto; }, { signal, dispatch }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.createTableOrderItem(data, source.token);
        dispatch(fetchOrderItemById({ id: localStorage.getItem('table_key') as any }))
        return response.data;
    }
);




export const fetchOrderItemById = createAsyncThunk<ITableOrderById, { cancelToken?: CancelToken, id: number }, { rejectValue?: string }>(
    'cart/fetchOrderItemById',
    async ({ cancelToken, id }, { rejectWithValue }) => {
        try {
            const response = await api.getTableOrderById(id, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);