import { CancelToken } from 'axios';
import { instance } from './index'
import { IPeviewsGet, IReviews, IReviewsDto } from '../store/models/IReviews';




const getReviews = (pagination: string, sourceToken?: CancelToken) =>
    instance.get<IPeviewsGet>(`/admin/review/${pagination}`, { cancelToken: sourceToken });

const getReviewsById = (id: number, sourceToken?: CancelToken) =>
    instance.get<IReviews>(`/reviews/${id}`, { cancelToken: sourceToken });

const createReviews = (data: IReviewsDto, sourceToken?: CancelToken) =>
    instance.post('/reviews/', { ...data }, { cancelToken: sourceToken });

const updateReviews = (id: number, data: IReviewsDto, sourceToken?: CancelToken) =>
    instance.put(`/reviews/${id}`, { ...data }, { cancelToken: sourceToken });

const patchReviews = (id: number, data: IReviewsDto, sourceToken?: CancelToken) =>
    instance.patch(`/reviews/${id}`, { ...data }, { cancelToken: sourceToken });

const deleteReviewsById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/admin/review/${id}/`, { cancelToken: sourceToken });

const endpoints = {
    getReviews,
    getReviewsById,
    createReviews,
    updateReviews,
    patchReviews,
    deleteReviewsById
};
export default endpoints;
