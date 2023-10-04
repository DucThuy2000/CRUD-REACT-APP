import { AxiosHeaders } from "axios";

export enum ResponseStatus {
    CREATED = 201,
    OK = 200,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
}