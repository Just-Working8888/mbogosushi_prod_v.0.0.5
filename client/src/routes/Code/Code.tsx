import { FC, useState } from 'react';
import classes from './Shop.module.scss';
import { Button, Card, List, message } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Code: FC = () => {
    const [billingData, setBillingData] = useState<any>(null);
    const { id } = useParams();

    const handleCheckPayment = async () => {
        try {
            const response = await axios.post('https://dockersushiworld.luxort.kg/api/v1/billing/track/', {
                payment_code: id
            });
            setBillingData(response.data);
            message.success('Данные успешно получены');
        } catch (error) {
            message.error('Ошибка при получении данных');
        }
    };

    return (
        <div className={`${classes.shop} container`}>
            <Button onClick={handleCheckPayment} type="primary">
                Проверить оплату
            </Button>
            <br /><br />
            {billingData && (
                <Card title="Информация по оплате" className={classes.billingCard}>
                    <p><strong>ID заказа:</strong> {billingData.id}</p>
                    <p><strong>Тип оплаты:</strong> {billingData.billing_receipt_type}</p>
                    <p><strong>Код оплаты:</strong> {billingData.payment_code}</p>
                    <p><strong>Комментарий:</strong> {billingData.note}</p>
                    <p><strong>Дата создания:</strong> {new Date(billingData.created).toLocaleString()}</p>

                    <h3>Товары:</h3>
                    <List
                        bordered
                        dataSource={billingData.billing_products}
                        renderItem={(product: any) => (
                            <List.Item key={product.id}>
                                <p><strong>Продукт ID:</strong> {product.product}</p>
                                <p><strong>Количество:</strong> {product.quantity}</p>
                                <p><strong>Цена:</strong> {product.price} сом</p>
                                <p><strong>Статус:</strong> {product.status ? 'Оплачен' : 'Не оплачен'}</p>
                                <p><strong>Дата добавления:</strong> {new Date(product.created).toLocaleString()}</p>
                            </List.Item>
                        )}
                    />
                </Card>
            )}
        </div>
    );
};

export default Code;
