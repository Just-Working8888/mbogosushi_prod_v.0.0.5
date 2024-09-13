export interface IReviews {
    id: number
    text: string
    stars: number
    created: string
    user: number
    product: number
    user_img: string
    user_username: string
}
export interface IPeviewsGet {
    count: number
    next: string | null
    previous: string | null
    results: IReviews[]

}
export interface IReviewsDto {
    text: string
    stars: number
    user: number
    product: number
}