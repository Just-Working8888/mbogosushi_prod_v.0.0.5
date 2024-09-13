import { createAsyncThunk } from "@reduxjs/toolkit";
import { CancelToken } from "axios";
import { IProduct, IProductGet } from "../../store/models/IProduct";
import { api } from "../../api";

export const fetchProduct = createAsyncThunk<IProduct[], { filters: string, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'product/fetchProducts',
    async ({ filters, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getProduct(filters, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
export const fetchLoadProduct = createAsyncThunk<IProduct[], { filters: string, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'product/fetchLoadProduct',
    async ({ filters, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getProduct(filters, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);

export const fetchProductPromo = createAsyncThunk<IProductGet, { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'product/fetchProductPromo',
    async ({ cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getProductPromo(cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);
export const fetchProductByID = createAsyncThunk<IProduct, { id: number, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'product/fetchProductByID',
    async ({ id, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getProductById(id, cancelToken);
            return response.data
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);