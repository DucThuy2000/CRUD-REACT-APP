export interface IUser {
    id: string;
    name: string;
    birthday: string;
    email: string;
    gender: string;
}

export type UserFormFieldsType = 'name' | 'email' | 'birthday' | 'gender';

export interface IUserFormGroup {
    fieldMount: number;
    spacing: number | string;
    
}
