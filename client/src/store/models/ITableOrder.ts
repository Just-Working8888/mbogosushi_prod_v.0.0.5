export interface ITableOrder {
    id: string
    session_key: string
    discount_amount: string
    promo_code: boolean
    created: string
    menu_table: number
    items: number[]
}
export interface ITableOrderDto {
    session_key: string
    discount_amount: number
    promo_code: boolean
    menu_table: number
}