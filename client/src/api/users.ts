import { CancelToken } from 'axios';
import { instance } from './index'
import { IUser, IUserDto } from '../store/models/IUser';




const getUser = (sourceToken?: CancelToken) =>
    instance.get<IUser[]>(`/users`, { cancelToken: sourceToken });

const getUserById = (id: number, sourceToken?: CancelToken) =>
    instance.get<IUser>(`/users/${id}`, { cancelToken: sourceToken });

const createUser = (data: IUserDto, sourceToken?: CancelToken) =>
    instance.post('/users', { ...data }, { cancelToken: sourceToken });

const updateUser = (id: number, data: IUserDto, sourceToken?: CancelToken) =>
    instance.put(`/users/${id}`, { ...data }, { cancelToken: sourceToken });

const patchUser = (id: number, data: IUserDto, sourceToken?: CancelToken) =>
    instance.patch(`/users/${id}`, { ...data }, { cancelToken: sourceToken });

const deleteUserById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/users/${id}`, { cancelToken: sourceToken });

const endpoints = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUserById
};
export default endpoints;
