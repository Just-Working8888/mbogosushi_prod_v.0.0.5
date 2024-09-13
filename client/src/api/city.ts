import { CancelToken } from "axios";
import { ICity } from "../store/models/ICity";
import { instance } from ".";

const getCity = (sourceToken?: CancelToken) =>
    instance.get<ICity[]>(`/city`, { cancelToken: sourceToken });


const endpoints = {
    getCity,
};
export default endpoints;
