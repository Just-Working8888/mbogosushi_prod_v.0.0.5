import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { CancelToken } from "axios";
import { ITable, ITableDto } from "../../store/models/ITable";
import { api } from "../../api";


export const fetchTable = createAsyncThunk<ITable[], { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'Table/fetchTable',
    async ({ cancelToken, }, { rejectWithValue }) => {
        try {
            const response = await api.getTable(cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch Table items');
        }
    }
);



export const fetchTableById = createAsyncThunk<ITable, { cancelToken?: CancelToken, id: number }, { rejectValue?: string }>(
    'table/fetchTableById',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.getTableById(id);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch Table items');
        }
    }
);


export const createTable = createAsyncThunk(
    'Table/createTable',
    async ({ data }: { data: ITableDto; }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.createTable(data, source.token);
        return response.data;
    }
);


export const updateTable = createAsyncThunk(
    'Table/updateTable',
    async ({ data, id }: { data: ITableDto; id: number }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.updateTable(id, data, source.token);
        return response.data;
    }
);



export const patchTable = createAsyncThunk(
    'Table/createTable',
    async ({ data, id }: { data: ITableDto; id: number }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.patchTable(id, data, source.token);
        return response.data;
    }
);