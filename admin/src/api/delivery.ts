
import { instance } from "./index";
import { CancelToken } from "axios";
import { IDelivary, IDelivaryDto } from "../store/models/IDelivary";

const createDelivary = (data: IDelivaryDto, sourceToken?: CancelToken) =>
    instance.post('/delivery/', { ...data }, { cancelToken: sourceToken });

const getDelivaryById = (id: number, sourceToken?: CancelToken) =>
    instance.get<IDelivary>(`/delivery/${id}`, { cancelToken: sourceToken });
const endpoints = {
    getDelivaryById,
    createDelivary
};
export default endpoints;
