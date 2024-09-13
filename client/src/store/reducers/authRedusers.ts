import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { api } from "../../api";

export const loginAsync = createAsyncThunk(
    'auth/login',
    async ({ username, password }: { username: string; password: string }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.login(username, password, source.token);

        return response.data;
    }
);

export const registerAsync = createAsyncThunk(
    'auth/register',
    async ({ username, password, password2 }: { username: string; password: string, password2: string }) => {
        const response = await api.register(username, password, password2);
      

        return response.data;
    }
);