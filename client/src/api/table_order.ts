import { CancelToken } from 'axios';
import { instance } from './index'
import { ITableOrder, ITableOrderDto } from '../store/models/ITableOrder';




const getTableOrder = (sourceToken?: CancelToken) =>
    instance.get<ITableOrder[]>(`/tables/table_order/`, { cancelToken: sourceToken });

const getTableOrderById = (id: number, sourceToken?: CancelToken) =>
    instance.get<ITableOrder>(`/tables/table_order/${id}`, { cancelToken: sourceToken });

const createTableOrder = (data: ITableOrderDto, sourceToken?: CancelToken) =>
    instance.post('/tables/table_order/', { ...data }, { cancelToken: sourceToken });

const updateTableOrder = (id: number, data: ITableOrderDto, sourceToken?: CancelToken) =>
    instance.put(`/tables/table_order/${id}`, { ...data }, { cancelToken: sourceToken });

const patchTableOrder = (id: number, data: ITableOrderDto, sourceToken?: CancelToken) =>
    instance.patch(`/tables/table_order/${id}`, { ...data }, { cancelToken: sourceToken });

const deleteTableOrderById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/tables/table_order/${id}/`, { cancelToken: sourceToken });

const endpoints = {
    getTableOrder,
    getTableOrderById,
    createTableOrder,
    updateTableOrder,
    patchTableOrder,
    deleteTableOrderById
};
export default endpoints;
