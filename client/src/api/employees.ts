import { CancelToken } from "axios";
import { IEmployesGet } from "../store/models/IEmployees";
import { instance } from ".";

const getEmployes = (sourceToken?: CancelToken) =>
    instance.get<IEmployesGet>(`/settings/employees/`, { cancelToken: sourceToken });



const endpoints = {
    getEmployes,
};
export default endpoints;
