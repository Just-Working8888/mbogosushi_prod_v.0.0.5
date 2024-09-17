import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { api } from "../../api";
import axios from "axios";
import { IBiling } from "../../store/models/IBiling";
import { createCart, fetchCartItemById } from "./cartReduser";
import { setSessionKey } from "../../helpers/session_key";

export const createBiling = createAsyncThunk(
    'biling/createBiling',
    async ({ data }: { data: IBiling; }, { signal, dispatch }) => {

        try {
            const source = axios.CancelToken.source();
            signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
            const response = await api.createBilingItem(data, source.token);

            message.success(response.data.payment_code + '   Сохраните код оплаты')
            localStorage.removeItem('cart_id')
            localStorage.removeItem('table_key')
            localStorage.removeItem('session_key')
            const storedSessionKey = localStorage.getItem('session_key');
            const cart_id = localStorage.getItem('cart_id');
            if (!storedSessionKey && !cart_id) {
                dispatch(createCart({
                    data: {
                        session_key: setSessionKey(),
                        discount_amount: 1,
                        promo_code: false
                    }
                })).then((res: any) => {
                    console.log(res);
                    dispatch(fetchCartItemById({ id: res.payload.id }))

                })
            }

            return response.data;
        } catch (error) {
            message.error('Ошибка сервера')
        } 

    }
);

