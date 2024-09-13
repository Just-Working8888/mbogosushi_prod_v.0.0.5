import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { api } from "../../api/index";
import axios, { CancelToken } from "axios";
import { IPeviewsGet, IReviewsDto } from "../models/IReviews";

export const fetchReviews = createAsyncThunk<IPeviewsGet, { pagination: string, cancelToken?: CancelToken, }, { rejectValue?: string }>(
    'reviews/fetchReviews',
    async ({ pagination, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getReviews(pagination, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch categories');
        }
    }
);


export const createRewue = createAsyncThunk(
    'revue/createRewue',
    async ({ data }: { data: IReviewsDto; }, { signal }) => {

        try {
            const source = axios.CancelToken.source();
            signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
            const response = await api.createReviews(data, source.token);
            message.success('Successfully created')

            return response.data;
        } catch (error) {
            message.error('Ошибка сервера')
        }

    }
);

