import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/index";
import { CancelToken } from "axios";
import { IFaq } from "../models/IFaq";

export const fetchFaq = createAsyncThunk<IFaq, { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'faq/fetchFaq',
    async ({ cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getFaq(cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
