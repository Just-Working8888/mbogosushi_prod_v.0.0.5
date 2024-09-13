import { CancelToken } from "axios";
import { IDelivary, IDelivaryDto } from "../store/models/IDelivary";
import { instance } from ".";

const createDelivary = (data: IDelivaryDto, sourceToken?: CancelToken) =>
    instance.post('/billing/delivery/', { ...data }, { cancelToken: sourceToken });

const getDelivaryById = (id: number, sourceToken?: CancelToken) =>
    instance.get<IDelivary>(`/billing/delivery/${id}`, { cancelToken: sourceToken });
const endpoints = {
    getDelivaryById,
    createDelivary
};
export default endpoints;
