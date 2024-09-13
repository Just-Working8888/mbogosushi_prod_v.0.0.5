import { CancelToken } from 'axios';
import { instance } from './index'
import { ITable, ITableDto } from '../store/models/ITable';




const getTable = (sourceToken?: CancelToken) =>
    instance.get<ITable[]>(`/tables/table/`, { cancelToken: sourceToken });

const getTableById = (id: number, sourceToken?: CancelToken) =>
    instance.get<ITable>(`/tables/table/${id}/`, { cancelToken: sourceToken });

const createTable = (data: ITableDto, sourceToken?: CancelToken) =>
    instance.post('/tables/table', { ...data }, { cancelToken: sourceToken });

const updateTable = (id: number, data: ITableDto, sourceToken?: CancelToken) =>
    instance.put(`/tables/table/${id}`, { ...data }, { cancelToken: sourceToken });

const patchTable = (id: number, data: ITableDto, sourceToken?: CancelToken) =>
    instance.patch(`/tables/table/${id}`, { ...data }, { cancelToken: sourceToken });

const deleteTableById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/tables/table/${id}`, { cancelToken: sourceToken });

const endpoints = {
    getTable,
    getTableById,
    createTable,
    updateTable,
    patchTable,
    deleteTableById
};
export default endpoints;
