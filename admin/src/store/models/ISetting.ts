export interface ISettings {
    id: number;
    title: string;
    description: string;
    logo: string | null;
    mobile_logo: string | null;
    email: string;
    phone: string;
    address: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    telegram: string;
    whatsapp: string;
    telegram_group_chat_id: number;
    menu_telegram_group_chat_id: number;
    city_modal: boolean;
    main_city: string;
}
export interface ISettingGet {
    count: number;
    next: string | null;
    previous: string | null;
    results: ISettings[];
}
export interface IPromotionItem {
    id: number;
    title: string;
    sub_title: string;
    text: string;
    image: string;
    url: string;
}

export interface IPromotionResponse {
    count: number;
    next: null | string;
    previous: null | string;
    results: IPromotionItem[];
}
