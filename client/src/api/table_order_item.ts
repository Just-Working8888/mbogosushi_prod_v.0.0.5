import { CancelToken } from 'axios';
import { instance } from './index'
import { ITableOrderById, ITableOrderItem, ITableOrderItemDto } from '../store/models/ITableOrderItem';




const getTableOrderItem = (sourceToken?: CancelToken) =>
    instance.get<ITableOrderItem[]>(`/tables/table_orders_item`, { cancelToken: sourceToken });

const getTableOrderById = (id: number, sourceToken?: CancelToken) =>
    instance.get<ITableOrderById>(`/tables/table_order/${id}/`, {
        headers: {
            "Sessionkey": localStorage.getItem('session_key'),
        },
        cancelToken: sourceToken
    });

const createTableOrderItem = (data: ITableOrderItemDto, sourceToken?: CancelToken) =>
    instance.post('/tables/table_order_item/', { ...data }, {
        headers: {
            "Sessionkey": localStorage.getItem('session_key'),
        },
        cancelToken: sourceToken
    });

const updateTableOrderItem = (id: number, data: ITableOrderItemDto, sourceToken?: CancelToken) =>
    instance.put(`/tables/table_order_item/${id}/`, { ...data }, {
        cancelToken: sourceToken,
        headers: {
            "Sessionkey": localStorage.getItem('session_key'),
        },
    });

const patchTableOrderItem = (id: number, data: ITableOrderItemDto, sourceToken?: CancelToken) =>
    instance.patch(`/tables/table_orders_item/${id}`, { ...data }, { cancelToken: sourceToken });

const deleteTableOrderItemById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/tables/table_order_item/${id}/`, { cancelToken: sourceToken });

const endpoints = {
    getTableOrderItem,
    getTableOrderById,
    createTableOrderItem,
    updateTableOrderItem,
    patchTableOrderItem,
    deleteTableOrderItemById
};
export default endpoints;
