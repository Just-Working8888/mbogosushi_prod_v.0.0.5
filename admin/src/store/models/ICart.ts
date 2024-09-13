export interface ICart {
    id: number
    created: string
    discount_amount: number
    items: {
        id: number
        product: {
            id: number
            title: string
            description: string
            price: number
            image: string
            iiko_image: string
            sku: string
            created: string
            category: number
        }
        quantity: number
        total: number
        cart: number
    }[]
}
export interface ICartItemPR {
    id: number
    product: {
        id: number
        title: string
        description: string
        price: number
        image: string
        iiko_image: string
        sku: string
        created: string
        category: number
    }
    quantity: number
    total: number
    cart: number

}
export interface ICartDto {
    session_key: string
    discount_amount: number
    promo_code: boolean
}

export interface ICartGet {
    count: number
    next: string | null
    previous: string | null
    results: ICart[]

}