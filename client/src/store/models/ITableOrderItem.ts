export interface ITableOrderItem {
    id: number
    quantity: number
    total: number
    table: number
    product: number
}
export interface ITableOrderItemDto {
    quantity: number
    total?: number
    table: number
    product: any
}


export interface ITableOrderById {
    id: number,
    menu_table: number,
    items: {
        id: number,
        product: {
            id: number
            ingredients: []
            title: string
            description: string
            price: number
            image: string
            iiko_image: string
            sku: number
            created: string
            category: number
        }
        quantity: number
        total: number
        table: number
    }[],
    discount_amount: number,
    promo_code: boolean,
    created: string
}