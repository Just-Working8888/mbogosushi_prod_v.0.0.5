
export interface IFaq {
    count: number
    next: string | null
    previous: string | null
    results: {
        id: number
        question: string
        answer: string
    }[]
}
export interface IFaqDto {
    question: string
    answer: string
}