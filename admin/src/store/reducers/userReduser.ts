import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/index";
import axios, { CancelToken } from "axios";
import { IUser, IUserDto, IUserUpdate } from "../models/IUser";
import { message } from "antd";

export const fetchUserById = createAsyncThunk<IUser, { id: number, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'users/fetchUserById',
    async ({ id, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getUserById(id, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);

export const fetchUsers = createAsyncThunk<any, { pagination: string, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'users/fetchUsers',
    async ({pagination, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getUser(pagination,cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
export const createUser = createAsyncThunk(
    'delivary/createUser',
    async ({ data }: { data: IUserDto; }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.createUser(data, source.token);
        return response.data;
    }
);
export const updateUser = createAsyncThunk(
    'delivary/updateUser',
    async ({ id, data }: { id: number, data: IUserUpdate; }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.updateUser(id, data, source.token);
        if (response) {
            message.success('Обновлено успешно')
        }
        return response.data;
    }
);
