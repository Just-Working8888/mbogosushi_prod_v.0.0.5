import { CancelToken } from "axios";
import { IAbout, IAboutFucts, } from "../store/models/IAbout";
import { instance } from ".";

const getAbout = (sourceToken?: CancelToken) =>
    instance.get<IAbout[]>(`/settings/about_us/`, { cancelToken: sourceToken });

const getAboutFucts = (sourceToken?: CancelToken) =>
    instance.get<IAboutFucts[]>(`/settings/about_us_facts/`, { cancelToken: sourceToken });


const endpoints = {
    getAbout,
    getAboutFucts,
};
export default endpoints;
