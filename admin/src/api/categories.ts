import { CancelToken } from 'axios';
import { instance } from './index'
import { ICategories, ICategoriesDto } from '../store/models/Categories';



const getCategories = (pagination: string, sourceToken?: CancelToken) =>
    instance.get<ICategories[]>(`/admin/category/${pagination}`, { cancelToken: sourceToken });

const getCategoriesById = (id: number, sourceToken?: CancelToken) =>
    instance.get<ICategories>(`/admin/category/${id}`, { cancelToken: sourceToken });

const createCategory = (id: number, data: ICategoriesDto, sourceToken?: CancelToken) =>
    instance.post<ICategoriesDto>(`/admin/category/${id}`, { ...data }, { cancelToken: sourceToken })

const updateCategory = (id: number, data: ICategoriesDto, sourceToken?: CancelToken) =>
    instance.put<ICategoriesDto>(`/admin/category/${id}`, { ...data }, { cancelToken: sourceToken })

const patchCategory = (id: number, data: ICategoriesDto, sourceToken?: CancelToken) =>
    instance.patch<ICategoriesDto>(`/admin/category/${id}`, { ...data }, { cancelToken: sourceToken })

const deleteCategoryById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/admin/category/${id}/`, { cancelToken: sourceToken });


const endpoints = {
    getCategories,
    getCategoriesById,
    createCategory,
    updateCategory,
    patchCategory,
    deleteCategoryById
};
export default endpoints;
