export interface IUser {
    id: string
    username: string
    profile_image: string
    phone: string,
    loyalty_points: number
}
export interface IUserDto {
    username: string
    password: string
    password2: string
}
