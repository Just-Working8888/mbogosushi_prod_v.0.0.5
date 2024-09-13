import { instance } from "./index";
import { CancelToken } from "axios";
import { IAboutFuctsGet, IAboutGet } from "../store/models/IAbout";

const getAbout = (sourceToken?: CancelToken) =>
    instance.get<IAboutGet>(`/about_us/`, { cancelToken: sourceToken });

const getAboutFucts = (sourceToken?: CancelToken) =>
    instance.get<IAboutFuctsGet>(`/about_us_facts/`, { cancelToken: sourceToken });


const endpoints = {
    getAbout,
    getAboutFucts,
};
export default endpoints;
