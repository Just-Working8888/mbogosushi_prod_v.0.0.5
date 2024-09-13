import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/index";
import axios, { CancelToken } from "axios";
import { IUser, IUserDto, IUserUpdate } from "../models/IUser";
import { message } from "antd";

export const fetchTelegramUserById = createAsyncThunk<IUser, { id: number, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'users/fetchTelegramUserById',
    async ({ id, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getTelegramUserById(id, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);

export const fetchTelegramUsers = createAsyncThunk<any, { pagination: string, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'users/fetchTelegramUsers',
    async ({ pagination, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getTelegramUser(pagination, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
export const createTelegramUser = createAsyncThunk(
    'delivary/createTelegramUser',
    async ({ data }: { data: IUserDto; }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.createTelegramUser(data, source.token);
        return response.data;
    }
);
export const updateTelegramUser = createAsyncThunk(
    'delivary/updateTelegramUser',
    async ({ id, data }: { id: number, data: IUserUpdate; }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.updateTelegramUser(id, data, source.token);
        if (response) {
            message.success('Обновлено успешно')
        }
        return response.data;
    }
);
