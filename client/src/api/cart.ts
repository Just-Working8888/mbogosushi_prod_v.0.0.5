import { CancelToken } from 'axios';
import { instance } from './index'
import { ICart, ICartDto } from '../store/models/ICart';




const getCart = (sourceToken?: CancelToken) =>
    instance.get<ICart[]>(`/carts/cart`, { cancelToken: sourceToken });

const getOwnCartItems = (id?: number, sourceToken?: CancelToken) =>
    instance.get(`/carts/cart/${id}`, { cancelToken: sourceToken });


const getCartById = (id: number, sourceToken?: CancelToken) =>
    instance.get<ICart>(`/carts/cart/${id}`, { cancelToken: sourceToken });

const createCart = (data: ICartDto, sourceToken?: CancelToken) =>
    instance.post('/carts/cart/', { ...data }, { cancelToken: sourceToken });

const updateCart = (id: number, data: ICartDto, sourceToken?: CancelToken) =>
    instance.put(`/carts/cart/${id}`, { ...data }, { cancelToken: sourceToken });

const patchCart = (id: number, data: ICartDto, sourceToken?: CancelToken) =>
    instance.patch(`/carts/cart/${id}`, { ...data }, { cancelToken: sourceToken });

const deleteCartById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/carts/cart/${id}`, { cancelToken: sourceToken });

const endpoints = {
    getCart,
    getCartById,
    createCart,
    updateCart,
    patchCart,
    deleteCartById,
    getOwnCartItems
};
export default endpoints;
