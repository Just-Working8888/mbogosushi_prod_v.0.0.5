import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { IMessege } from "../../store/models/IMessege";
import { api } from "../../api";

export const createMessege = createAsyncThunk(
    'message/createMessege',
    async ({ data }: { data: IMessege; }, { signal }) => {

        try {
            const source = axios.CancelToken.source();
            signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
            const response = await api.createMessge(data, source.token);
            message.success('Successfully created')

            return response.data;
        } catch (error) {
            message.error('Ошибка сервера')
        }

    }
);

