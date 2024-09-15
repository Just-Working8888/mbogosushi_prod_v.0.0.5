import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { ITableBilingDto } from "../../store/models/ITableBiling";
import { api } from "../../api";
import { createTableOrder, fetchOrderItemById } from "./TableOrderReduser";
import { setSessionKey } from "../../helpers/session_key";

export const createTableBiling = createAsyncThunk(
    'biling/createTableBiling',
    async ({ data, tableid }: { data: ITableBilingDto, tableid: number }, { signal, dispatch }) => {

        try {
            const source = axios.CancelToken.source();
            signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
            const response = await api.createTableBiling(data, source.token);
            message.success('Successfully created')
            console.log(response,'res');
            return response.data;
        } catch (error) {
            message.error('Ошибка сервера')
            console.log(error);
            
        } finally {
            localStorage.removeItem('table_key')
            localStorage.removeItem('session_key')
            const key = setSessionKey()
            const table_key = localStorage.getItem('table_key');
            if (!table_key) {
                dispatch(createTableOrder({
                    data: {
                        session_key: `${key}`,
                        menu_table: Number(tableid),
                        promo_code: true,
                        discount_amount: 0,
                    }
                })).then((res: any) => {
                    console.log(res);
                    dispatch(fetchOrderItemById({ id: Number(localStorage.getItem('table_key')) }));

                })
            }

        }


    }
);

