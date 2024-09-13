export interface IEmployes {
    id: number;
    name: string;
    job_title: string;
    image: string
    tweeter: string;
    instagram: string;
    facebook: string;
    telegram: string;
}
export interface IEmployesGet {
    count: number
    next: string | null
    previous: string | null
    results: IEmployes[]
}