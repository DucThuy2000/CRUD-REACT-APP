import { environment } from './../env';
import { AxiosInstance } from "axios";
import { IUser } from '../model';

const URL = environment.API_ENPOINT;

export default (axios: AxiosInstance) => ({
    createUser: (data: Omit<IUser, 'id'>) => {
        return axios.post(URL, data);
    },
    getUser: () => {
        return axios.get<IUser[]>(URL);
    },
    getUserByID: (id: string) => {
        return axios.get<IUser>(`${URL}/${id}`);
    },
    updateUserByID: (data: IUser) => {
        return axios.put(`${URL}/${data.id}`, data);
    },
    deleteUserByID: (id: string) => {
        return axios.delete(`${URL}/${id}`);
    }
})