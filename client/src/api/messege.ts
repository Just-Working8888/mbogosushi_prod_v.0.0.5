import { CancelToken } from "axios";
import { IMessege } from "../store/models/IMessege";
import { instance } from ".";

const createMessge = (data: IMessege, sourceToken?: CancelToken) =>
    instance.post('/messages/', { ...data }, { cancelToken: sourceToken });



const endpoints = {
    createMessge
};
export default endpoints;
