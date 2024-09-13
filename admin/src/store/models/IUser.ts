export interface IUser {
    id: number
    username?: string;
    password?: string;
    last_login?: string;
    is_superuser?: boolean;
    first_name?: string;
    last_name?: string;
    email?: string;
    is_staff?: boolean;
    is_active?: boolean;
    date_joined?: string;
    profile_image?: string;
    phone?: string;
    groups?: any[];
    user_permissions?: any[];
}
export interface IUserDto {
    username: string
    password: string
    password2: string
}
export interface IUserUpdate {
    password: string;
    last_login: string; // ISO 8601 date string
    is_superuser: boolean;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string; // ISO 8601 date string
    phone: string;
    groups: number[];
    user_permissions: number[];
}
