import { IProduct } from "./IProduct"

export interface ICartItem {
    id: number
    product: IProduct
    quantity: number
    total: number
    cart: number
}
export interface ICartItemDto {
    quantity: number
    total: number
    cart: number
    product: any
}
