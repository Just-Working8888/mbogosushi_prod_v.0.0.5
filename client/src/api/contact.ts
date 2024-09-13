import { CancelToken } from 'axios';
import { instance } from './index'
import { IContact, IContactDto } from '../store/models/IContact';




const getContact = (sourceToken?: CancelToken) =>
    instance.get<IContact[]>(`/contacts`, { cancelToken: sourceToken });

const getContactById = (id: number, sourceToken?: CancelToken) =>
    instance.get<IContact>(`/contacts/${id}`, { cancelToken: sourceToken });

const createContact = (data: IContactDto, sourceToken?: CancelToken) =>
    instance.post('/contacts', { ...data }, { cancelToken: sourceToken });

const updateContact = (id: number, data: IContactDto, sourceToken?: CancelToken) =>
    instance.put(`/contacts/${id}`, { ...data }, { cancelToken: sourceToken });

const patchContact = (id: number, data: IContactDto, sourceToken?: CancelToken) =>
    instance.patch(`/contacts/${id}`, { ...data }, { cancelToken: sourceToken });

const deleteContactById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/contacts/${id}`, { cancelToken: sourceToken });

const endpoints = {
    getContact,
    getContactById,
    createContact,
    updateContact,
    patchContact,
    deleteContactById
};
export default endpoints;
