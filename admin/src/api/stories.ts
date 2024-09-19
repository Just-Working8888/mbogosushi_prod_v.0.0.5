import { CancelToken } from 'axios';
import { instance } from './index'
import { ApiResponseSories } from '../store/models/IStories';

const getStories = (sourceToken?: CancelToken) =>
    instance.get<ApiResponseSories>(`/settings/promotion/`, { cancelToken: sourceToken });

const endpoints = {
    getStories,

};
export default endpoints;
