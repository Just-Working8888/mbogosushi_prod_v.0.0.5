export interface IUser {
    id: string
    username: string
    profile_image: string
    phone: string
}
export interface IUserDto {
    username: string
    password: string
    password2: string
}