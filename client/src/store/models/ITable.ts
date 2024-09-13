export interface ITable {
    id: number
    title: string
    number: number
    qr_code_image: string
    count_visit: string
    daily_visits: string
    created: string
}
export interface ITableDto {
    title: string
    number: number
    count_visit: number
    daily_visits: number
}