import { instance } from "./index";
import { CancelToken } from "axios";
import { IFaq, IFaqDto } from "../store/models/IFaq";


const getFaq = (sourceToken?: CancelToken) =>
    instance.get<IFaq>(`/settings/faq/`, { cancelToken: sourceToken });

const createFaq = (data: IFaqDto, sourceToken?: CancelToken) =>
    instance.post(`/admin/faq/`, { ...data }, { cancelToken: sourceToken });



const endpoints = {
    getFaq,
    createFaq
};
export default endpoints;
