import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { ITableBilingDto } from "../../store/models/ITableBiling";
import { api } from "../../api";

export const createTableBiling = createAsyncThunk(
    'biling/createTableBiling',
    async ({ data }: { data: ITableBilingDto; }, { signal }) => {

        try {
            const source = axios.CancelToken.source();
            signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
            const response = await api.createTableBiling(data, source.token);
            message.success('Successfully created')

            return response.data;
        } catch (error) {
            message.error('Ошибка сервера')
        } finally {
            localStorage.removeItem('table_key')
        }

    }
);

