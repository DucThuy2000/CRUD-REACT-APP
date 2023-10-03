import axios from "axios";
import user from "../../api/user";

const instance = axios.create();

export default {
    user: user(instance),
}