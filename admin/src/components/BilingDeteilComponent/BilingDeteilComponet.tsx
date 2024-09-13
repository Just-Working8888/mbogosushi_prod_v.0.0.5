import React from 'react';
import { Descriptions, Badge } from 'antd';

interface OrderData {
  id: number;
  billing_products: any[];
  billing_type: string;
  billing_receipt_type: string;
  billing_status: string;
  billing_payment_status: string;
  billing_payment: string;
  email: string | null;
  first_name: string;
  last_name: string;
  phone: string;
  payment_code: string;
  country: string;
  region: string | null;
  street: string;
  apartment: string;
  zip_code: string | null;
  note: string;
  delivery_price: string;
  delivery_price_numeric: number;
  discount_price: number;
  delivery_date_time: string | null;
  client_gave_money: number;
  change_price: number;
  total_price: number;
  created: string;
  user: number;
}

const OrderDetailsWithDescriptions: React.FC<{ orderData: OrderData }> = ({ orderData }) => {
  const translateKey = (key: string) => {
    const translations: { [key: string]: string } = {
      id: "Идентификатор",
      billing_type: "Тип биллинга",
      billing_receipt_type: "Тип квитанции",
      billing_status: "Статус заказа",
      billing_payment_status: "Статус оплаты",
      billing_payment: "Способ оплаты",
      email: "Электронная почта",
      first_name: "Имя",
      last_name: "Фамилия",
      phone: "Телефон",
      payment_code: "Код оплаты",
      country: "Страна",
      region: "Регион",
      street: "Улица",
      apartment: "Квартира",
      zip_code: "Почтовый код",
      note: "Примечание",
      delivery_price: "Цена доставки",
      delivery_price_numeric: "Цена доставки (числовое значение)",
      discount_price: "Цена со скидкой",
      delivery_date_time: "Время доставки",
      client_gave_money: "Клиент передал деньги",
      change_price: "Сдача",
      total_price: "Общая цена",
      created: "Дата создания",
      user: "Пользователь"
    };
    return translations[key] || key;
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [status: string]: { text: string; status: 'success' | 'error' | 'default' | 'processing' | 'warning' } } = {
      "В корзине": { text: "В корзине", status: 'default' },
      "Оформлен": { text: "Оформлен", status: 'processing' },
      "Оплачен": { text: "Оплачен", status: 'success' },
      "Доставлен": { text: "Доставлен", status: 'success' },
      "Возврат": { text: "Возврат", status: 'warning' },
      "Неизвестно": { text: "Неизвестно", status: 'error' }
    };

    const badgeInfo = statusMap[status] || statusMap["Неизвестно"];
    return <Badge status={badgeInfo.status} text={badgeInfo.text} />;
  };

  return (
    <Descriptions  column={2}>
      {Object.keys(orderData)
        .filter(key => key !== 'billing_products') // Исключаем 'billing_products'
        .map(key => (
          <Descriptions.Item label={translateKey(key)} key={key}>
            {key === 'billing_status' ? 
              getStatusBadge(orderData.billing_status) : 
              (typeof orderData[key as keyof OrderData] === 'object' ?
                JSON.stringify(orderData[key as keyof OrderData], null, 2) :
                orderData[key as keyof OrderData])
            }
          </Descriptions.Item>
        ))}
    </Descriptions>
  );
};

export default OrderDetailsWithDescriptions;
