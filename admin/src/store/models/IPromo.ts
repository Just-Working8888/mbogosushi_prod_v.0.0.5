export interface IPromoCode {
    id: number;
    title: string;
    code: string;
    quantity: number;
    amount: number;
    created: string;
}

export interface IPromoCodeREsponce {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPromoCode[];
}