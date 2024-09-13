import { CancelToken } from "axios";
import { IPromotion } from "../store/models/IPromotion";
import { instance } from ".";

const getPromotion = (sourceToken?: CancelToken) =>
    instance.get<IPromotion[]>(`/promotions`, { cancelToken: sourceToken });


const endpoints = {
    getPromotion,
};
export default endpoints;
