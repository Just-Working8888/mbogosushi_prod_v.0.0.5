export interface ICategories {
    id: number
    title: string
    image: string
    iiko_image: string
    slug: string
    external_id: string
    priority: any[]
}

export interface ICategoriesDto {
    title: string
    iiko_image: string
    slug: string
    external_id: string
    priority: number
}