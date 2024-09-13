import { CancelToken } from "axios";
import { IFaq } from "../store/models/IFaq";
import { instance } from ".";


const getFaq = (sourceToken?: CancelToken) =>
    instance.get<IFaq>(`/settings/faq/`, { cancelToken: sourceToken });


const endpoints = {
    getFaq,
};
export default endpoints;
