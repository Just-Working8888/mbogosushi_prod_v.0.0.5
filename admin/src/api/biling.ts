import { CancelToken } from 'axios';
import { instance } from './index'
import { IBiling, IBilingGet } from '../store/models/IBiling';





const getBilingItem = (pagination: string, sourceToken?: CancelToken) =>
    instance.get<IBilingGet>(`/admin/billing/${pagination}`, { cancelToken: sourceToken });

const getBilingItemById = (id: number, sourceToken?: CancelToken) => {
    const sessionKey = localStorage.getItem('session_key');
    return instance.get<IBiling>(`/admin/billing/${id}/`, {
        headers: {
            "Sessionkey": sessionKey,
        },
        cancelToken: sourceToken
    },);
}
const createBilingItem = (data: IBiling, sourceToken?: CancelToken) =>
    instance.post('/admin/billing/', { ...data }, {
        headers: {
            "Sessionkey": localStorage.getItem('session_key'),
        },
        cancelToken: sourceToken
    });

const updateBilingItem = (id: number, data: IBiling, sourceToken?: CancelToken) =>
    instance.put(`/admin/billing/${id}/`, { ...data }, { cancelToken: sourceToken });

const patchBilingItem = (id: number, data: IBiling, sourceToken?: CancelToken) =>
    instance.patch(`/admin/billing/${id}`, { ...data }, { cancelToken: sourceToken });

const deleteBilingItemById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/admin/billing/${id}/`, {

        cancelToken: sourceToken
    });

const endpoints = {
    getBilingItem,
    getBilingItemById,
    createBilingItem,
    updateBilingItem,
    patchBilingItem,
    deleteBilingItemById
};
export default endpoints;
