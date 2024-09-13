export type PromotionStory = {
    id: number;
    title: string;
    image: string;
    active: boolean;
    created: string; // ISO 8601 date string
    promotion: number;
};

export type Promotion = {
    id: number;
    promotion_stories: PromotionStory[];
    title: string;
    image: string;
    url: string;
    active: boolean;
    created: string; // ISO 8601 date string
};

export type ApiResponseSories = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Promotion[];
};
