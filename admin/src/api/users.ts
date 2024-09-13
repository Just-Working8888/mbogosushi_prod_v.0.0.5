import { CancelToken } from 'axios';
import { instance } from './index'
import { IUser, IUserDto, IUserUpdate } from '../store/models/IUser';




const getUser = (pagination: string, sourceToken?: CancelToken) =>
    instance.get<any>(`/admin/user/${pagination}`, { cancelToken: sourceToken });

const getUserById = (id: number, sourceToken?: CancelToken) =>
    instance.get<IUser>(`/admin/user/${id}/`, { cancelToken: sourceToken });

const createUser = (data: IUserDto, sourceToken?: CancelToken) =>
    instance.post('/admin/user/', { ...data }, { cancelToken: sourceToken });

const updateUser = (id: number, data: IUserUpdate, sourceToken?: CancelToken) =>
    instance.put(`/admin/user/${id}/`, { ...data }, { cancelToken: sourceToken });

const patchUser = (id: number, data: IUserDto, sourceToken?: CancelToken) =>
    instance.patch(`/admin/user/${id}/`, { ...data }, { cancelToken: sourceToken });

const deleteUserById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/admin/user/${id}/`, { cancelToken: sourceToken });

const endpoints = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUserById
};
export default endpoints;
