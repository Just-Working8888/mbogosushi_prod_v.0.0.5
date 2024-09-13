import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios, { CancelToken } from "axios";
import { IPeviewsGet, IReviewsDto } from "../../store/models/IReviews";
import { api } from "../../api";

export const fetchReviews = createAsyncThunk<IPeviewsGet, { cancelToken?: CancelToken, }, { rejectValue?: string }>(
    'reviews/fetchReviews',
    async ({ cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getReviews(cancelToken);
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

