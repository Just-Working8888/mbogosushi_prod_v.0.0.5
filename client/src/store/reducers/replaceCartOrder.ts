// orderActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICartDto } from '../../store/models/ICart';
import { ITableOrderDto } from '../../store/models/ITableOrder';
import { createCart } from './cartReduser';
import { createTableOrder } from './TableOrderReduser';

// Асинхронное действие, принимающее два объекта в качестве аргументов
export const replaceCreateOrder = createAsyncThunk(
    'order/replaceCreateOrder',
    async ({ cart, tableOrder }: { cart: ICartDto, tableOrder?: ITableOrderDto }, { dispatch }) => {
        localStorage.removeItem('cart_id');
        localStorage.removeItem('table_key');
        localStorage.removeItem('session_key');

        dispatch(createCart({ data: cart }))
        if (tableOrder) {
            dispatch(createTableOrder({ data: tableOrder }))
        }


        return;
    }
);
