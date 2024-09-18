import { BillingData } from "../../components/HistoryList/HistoryList"

export interface IUser {
    id: string
    username: string
    profile_image: string
    phone: string,
    loyalty_points: number,
    billing_user: BillingData
}
export interface IUserDto {
    username: string
    password: string
    password2: string
}
