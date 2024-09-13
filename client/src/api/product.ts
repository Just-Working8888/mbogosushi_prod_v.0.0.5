import { CancelToken } from 'axios';
import { instance } from './index'
import { IProduct, IProductDto, IProductGet } from '../store/models/IProduct';




const getProduct = (filters: string, sourceToken?: CancelToken) =>
    instance.get<IProduct[]>(`/products/product/?${filters}`, { cancelToken: sourceToken });

const getProductPromo = (sourceToken?: CancelToken) =>
    instance.get<IProductGet>(`/settings/settings_promotions/`, { cancelToken: sourceToken });


const getProductById = (id: number, sourceToken?: CancelToken) =>
    instance.get<IProduct>(`/products/product/${id}/`, { cancelToken: sourceToken });

const createProduct = (data: IProductDto, sourceToken?: CancelToken) =>
    instance.post('/admin/products', { ...data }, { cancelToken: sourceToken });

const updateProduct = (id: number, data: IProductDto, sourceToken?: CancelToken) =>
    instance.put(`/products/products/${id}`, { ...data }, { cancelToken: sourceToken });

const patchProduct = (id: number, data: IProductDto, sourceToken?: CancelToken) =>
    instance.patch(`/products/products/${id}`, { ...data }, { cancelToken: sourceToken });

const deleteProductById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/products/products/${id}`, { cancelToken: sourceToken });

const endpoints = {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProductById,
    getProductPromo
};
export default endpoints;
