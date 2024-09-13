import { CancelToken } from "axios";
import { instance } from "./index";
import { IPromoCodeREsponce } from "../store/models/IPromo";

const getPromo = (pagination: string, sourceToken?: CancelToken) =>
    instance.get<IPromoCodeREsponce>(`/admin/promocode/${pagination}`, { cancelToken: sourceToken });
const deletePromo = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/admin/promocode/${id}/`, { cancelToken: sourceToken });
const endpoints = {
    getPromo,
    deletePromo
};
export default endpoints;
