export interface IAbout {
    id: number
    title: string
    description: string
    image: string
    iiko_image: string
    exp: string
    promo_title: string
    promo_desc: string
    promo_video: string
    promo_image: string
}
export interface IAboutFucts {
    id: number
    number: number
    title: string
    text: string
}
export interface IAboutGet {
    count: number
    next: string | null
    previous: string | null
    results: IAbout[]
}
export interface IAboutFuctsGet {
    count: number
    next: string | null
    previous: string | null
    results: IAboutFucts[]
}