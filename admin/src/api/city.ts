import { instance } from "./index";
import { CancelToken } from "axios";
import { ICity } from "../store/models/ICity";

const getCity = (sourceToken?: CancelToken) =>
    instance.get<ICity[]>(`/city`, { cancelToken: sourceToken });


const endpoints = {
    getCity,
};
export default endpoints;
