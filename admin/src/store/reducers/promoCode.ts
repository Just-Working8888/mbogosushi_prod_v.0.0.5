import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/index";
import { CancelToken } from "axios";
import { IPromoCodeREsponce } from "../models/IPromo";

export const fetchPromoCode = createAsyncThunk<IPromoCodeREsponce, { pagination: string, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'promo/fetchPromoCode',
    async ({ cancelToken, pagination }, { rejectWithValue }) => {
        try {
            const response = await api.getPromo(pagination, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
