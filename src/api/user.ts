import { environment } from './../env';
import { AxiosInstance } from "axios";
import { IUser } from '../model';

const URL = environment.API_ENPOINT;

export default (axios: AxiosInstance) => ({
    createUser: (data: IUser) => {
        axios.post(URL, data);
    }
})