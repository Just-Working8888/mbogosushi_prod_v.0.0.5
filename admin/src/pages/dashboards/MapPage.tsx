import {
    Col,
    Descriptions,
    Flex,
    Row,
    Tabs,
    TabsProps,
} from 'antd';
import {
    Card
} from '../../components';

import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import Map from '../../components/Map/Map';
import React from 'react';
import DelivaryList from '../../components/DelivaryList/DElivaryList';
const MapMemo = React.memo(Map);

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Карты',
        children:
            <div>
                <Flex gap={10}>
                    <Card style={{ width: '300px', height: '550px', overflow: 'auto' }}>
                        <DelivaryList />
                    </Card>
                    <Card style={{ width: '100%' }}>
                        <MapMemo />
                    </Card>

                </Flex>
            </div>,
    },
    {
        key: '2',
        label: 'Курьеры',
        children:
            <Flex gap={10}>
                <Card style={{ width: '500px', height: '80vh', overflow: 'auto' }}>
                    <DelivaryList />
                </Card>
                <Card style={{ width: '100%' }}>
                    <Descriptions column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}>
                        {
                            Object.entries({
                                "ID": 2,
                                "Тип биллинга": "Биллинг",
                                "Вид получения товара": "Доставка",
                                "Статус заказа": "Возврат",
                                "Статус оплаты": "Оплачен",
                                "Способы оплаты": "Наличными в магазине",
                                "Почта": null,
                                "Имя": "Курманбек",
                                "Фамилия": "Токторов",
                                "Телефонный номер": "0772343206",
                                "Код оплаты биллинга": "5265753299",
                                "Страна": "Кыргызстан",
                                "Регион": null,
                                "Улица": "Аалы Токомбаева 21/3",
                                "Квартира": "178",
                                "Индекс": null,
                                "Примечание": "",
                                "Цена доставки": "300",
                                "Цена доставки в числовом виде": 300,
                                "Скидка": 0,
                                "Дата время доставки": null,
                                "Клиент дал денег": 0,
                                "Сдача клиенту": 0,
                                "Итоговая сумма": 2000,
                                "Дата создания биллинга": "2024-07-10T13:23:42.551818+06:00",
                                "Пользователь": 1
                            }).map(([key, value]) => (
                                <Descriptions.Item key={key} label={key}>
                                    {value ? value : '' as any}
                                </Descriptions.Item>
                            ))
                        }
                    </Descriptions>

                </Card>
            </Flex >

        ,
    },

];

export const MapPage = () => {
    const stylesContext = useStylesContext();



    return (
        <div>
            <Helmet>
                <title>Главная | BigBee Админ панель</title>
            </Helmet>

            <Row {...stylesContext?.rowProps}>


                <Col span={24}>
                    <Card>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
