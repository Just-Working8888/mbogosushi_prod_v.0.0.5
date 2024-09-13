import { CancelToken } from 'axios';
import { instance } from './index'
import { IBiling } from '../store/models/IBiling';





const getBilingItem = (sourceToken?: CancelToken) =>
    instance.get<IBiling[]>(`/billing//billing/`, { cancelToken: sourceToken });

const getBilingItemById = (id: number, sourceToken?: CancelToken) => {
    const sessionKey = localStorage.getItem('session_key');
    return instance.get<IBiling>(`/billing//billing//${id}/`, {
        headers: {
            "Sessionkey": sessionKey,
        },
        cancelToken: sourceToken
    },);
}
const createBilingItem = (data: IBiling, sourceToken?: CancelToken) =>
    instance.post('/billing/billing/', { ...data }, {
        headers: {
            "Sessionkey": localStorage.getItem('session_key'),
        },
        cancelToken: sourceToken
    });

const updateBilingItem = (id: number, data: IBiling, sourceToken?: CancelToken) =>
    instance.put(`/billing//billing//${id}/`, { ...data }, { cancelToken: sourceToken });

const patchBilingItem = (id: number, data: IBiling, sourceToken?: CancelToken) =>
    instance.patch(`/billing//billing//${id}`, { ...data }, { cancelToken: sourceToken });

const deleteBilingItemById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/billing//billing//${id}/`, {
        headers: {
            "Sessionkey": localStorage.getItem('session_key'),
        },
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
