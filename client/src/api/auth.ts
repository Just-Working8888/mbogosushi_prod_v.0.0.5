import { CancelToken } from 'axios';
import { instance } from './index'


const login = (username: string, password: string, sourceToken?: CancelToken) =>
    instance.post('/users/login/', { username, password }, { cancelToken: sourceToken });

const register = (username: string, password: string, password2: string, sourceToken?: CancelToken) =>
    instance.post('/users/users/', { username, password, password2 }, { cancelToken: sourceToken });

const endpoints = {
    login,
    register
};
export default endpoints;
