import { CancelToken } from 'axios';
import { instance } from './index'
import { ITableOrderById, ITableOrderItem, ITableOrderItemDto } from '../store/models/ITableOrderItem';




const getTableOrderItem = (sourceToken?: CancelToken) =>
    instance.get<ITableOrderItem[]>(`/table_orders_item`, { cancelToken: sourceToken });

const getTableOrderById = (id: number, sourceToken?: CancelToken) =>
    instance.get<ITableOrderById>(`/table_order/${id}/`, {
        headers: {
            "Sessionkey": localStorage.getItem('session_key'),
        },
        cancelToken: sourceToken
    });

const createTableOrderItem = (data: ITableOrderItemDto, sourceToken?: CancelToken) =>
    instance.post('/table_order_item/', { ...data }, {
        headers: {
            "Sessionkey": localStorage.getItem('session_key'),
        },
        cancelToken: sourceToken
    });

const updateTableOrderItem = (id: number, data: ITableOrderItemDto, sourceToken?: CancelToken) =>
    instance.put(`/table_orders_item/${id}`, { ...data }, { cancelToken: sourceToken });

const patchTableOrderItem = (id: number, data: ITableOrderItemDto, sourceToken?: CancelToken) =>
    instance.patch(`/table_orders_item/${id}`, { ...data }, { cancelToken: sourceToken });

const deleteTableOrderItemById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/table_orders_item/${id}`, { cancelToken: sourceToken });

const endpoints = {
    getTableOrderItem,
    getTableOrderById,
    createTableOrderItem,
    updateTableOrderItem,
    patchTableOrderItem,
    deleteTableOrderItemById
};
export default endpoints;
