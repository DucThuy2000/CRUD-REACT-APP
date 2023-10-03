export interface IUser {
    name: string;
    birthday: string;
    email: string;
    gender: string;
}

export type UserFormFieldsType = 'name' | 'email' | 'birthday' | 'gender';
