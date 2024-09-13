import { CancelToken } from 'axios';
import { instance } from './index'
import { IPeviewsGet, IReviews, IReviewsDto } from '../store/models/IReviews';




const getReviews = (sourceToken?: CancelToken) =>
    instance.get<IPeviewsGet>(`/products/reviews/`, { cancelToken: sourceToken });

const getReviewsById = (id: number, sourceToken?: CancelToken) =>
    instance.get<IReviews>(`/products/reviews/${id}`, { cancelToken: sourceToken });

const createReviews = (data: IReviewsDto, sourceToken?: CancelToken) =>
    instance.post('/products/reviews/', { ...data }, { cancelToken: sourceToken });

const updateReviews = (id: number, data: IReviewsDto, sourceToken?: CancelToken) =>
    instance.put(`/products/reviews/${id}`, { ...data }, { cancelToken: sourceToken });

const patchReviews = (id: number, data: IReviewsDto, sourceToken?: CancelToken) =>
    instance.patch(`/products/reviews/${id}`, { ...data }, { cancelToken: sourceToken });

const deleteReviewsById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/products/reviews/${id}`, { cancelToken: sourceToken });

const applyPromoCode = (data: any, sourceToken?: CancelToken) =>
    instance.post(`/carts/promocode/`, {
        ...data
    }, { cancelToken: sourceToken });

const endpoints = {
    getReviews,
    getReviewsById,
    createReviews,
    updateReviews,
    patchReviews,
    deleteReviewsById,
    applyPromoCode
};
export default endpoints;
