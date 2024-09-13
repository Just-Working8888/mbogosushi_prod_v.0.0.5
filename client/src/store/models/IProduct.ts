import { IReviews } from "./IReviews"

export interface IProduct {
    id: number
    title: string
    description: string
    price: string
    image: string
    iiko_image: string
    sku: string
    created: string
    category: number
    product_reviews?: IReviews[]
    average_rating?:number
    ingredients?: {
        id: number
        title: string
        desc: string
        product: number
    }[]
}
export interface IProductGet {
    count: number
    next: string | null
    previous: string | null
    results: {
        id: number
        title: string
        description: string
        price: string
        image: string
        iiko_image: string
        sku: string
        created: string
        category: number
    }[]
}
export interface IProductDto {
    title: string
    description: string
    price: number
    iiko_image: string
    sku: string
    category: number
}