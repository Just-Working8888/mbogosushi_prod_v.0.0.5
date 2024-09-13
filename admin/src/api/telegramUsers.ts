import { CancelToken } from 'axios';
import { instance } from './index'
import { IUser, IUserDto, IUserUpdate } from '../store/models/IUser';




const getTelegramUser = (pagination: string, sourceToken?: CancelToken) =>
    instance.get<any>(`/admin/telegramuser/${pagination}`, { cancelToken: sourceToken });

const getTelegramUserById = (id: number, sourceToken?: CancelToken) =>
    instance.get<IUser>(`/admin/telegramuser/${id}/`, { cancelToken: sourceToken });

const createTelegramUser = (data: IUserDto, sourceToken?: CancelToken) =>
    instance.post('/admin/telegramuser/', { ...data }, { cancelToken: sourceToken });

const updateTelegramUser = (id: number, data: IUserUpdate, sourceToken?: CancelToken) =>
    instance.patch(`/admin/telegramuser/${id}/`, { ...data }, { cancelToken: sourceToken });

const patchTelegramUser = (id: number, data: IUserDto, sourceToken?: CancelToken) =>
    instance.patch(`/admin/telegramuser/${id}/`, { ...data }, { cancelToken: sourceToken });

const deleteTelegramUserById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/admin/telegramuser/${id}/`, { cancelToken: sourceToken });

const endpoints = {
    getTelegramUser,
    getTelegramUserById,
    createTelegramUser,
    updateTelegramUser,
    patchTelegramUser,
    deleteTelegramUserById
};
export default endpoints;
