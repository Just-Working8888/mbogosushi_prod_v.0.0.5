import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/index";
import { CancelToken } from "axios";
import { IPromotionResponse, ISettingGet } from "../models/ISetting";

export const fetchSetting = createAsyncThunk<ISettingGet, { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'setting/fetchSetting',
    async ({ cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getSettings(cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);

export const fetchSettingPromotion = createAsyncThunk<IPromotionResponse, { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'setting/fetchSettingPromotion',
    async ({ cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getSettingsPromotions(cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
