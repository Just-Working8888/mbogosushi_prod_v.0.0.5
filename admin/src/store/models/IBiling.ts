export interface IBiling {
    ID: number;
    "Тип биллинга": string;
    "Вид получения товара": string;
    "Статус заказа": string;
    "Статус оплаты": string;
    "Способы оплаты": string;
    Почта: string | null;
    Имя: string;
    Фамилия: string | null;
    "Телефонный номер": string | null;
    "Код оплаты биллинга": string;
    Страна: string;
    Регион: string | null;
    Улица: string | null;
    Квартира: string | null;
    Индекс: string | null;
    Примечание: string;
    "Цена доставки": string;
    "Цена доставки в числовом виде": number;
    Скидка: number;
    "Дата время доставки": string;
    "Клиент дал денег": number;
    "Сдача клиенту": number;
    "Итоговая сумма": number;
    "Дата создания биллинга": string;
    Пользователь: number;
}

export interface IBilingGet {
    "count": number,
    "next": string | null,
    "previous": string | null,
    "results": IBiling[]
}