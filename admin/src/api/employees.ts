import { instance } from "./index";
import { CancelToken } from "axios";
import { IEmployesGet } from "../store/models/IEmployees";

const getEmployes = (sourceToken?: CancelToken) =>
    instance.get<IEmployesGet>(`/employees/`, { cancelToken: sourceToken });



const endpoints = {
    getEmployes,
};
export default endpoints;
