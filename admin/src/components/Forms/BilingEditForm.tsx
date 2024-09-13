import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { getCookie } from '../../helpers/cookies';

const { Option } = Select;

interface BillingProduct {
    product_id: number;
    quantity: number;
}

interface BillingData {
    billing_type: string;
    billing_receipt_type: string;
    billing_status: string;
    billing_payment_status: string;
    billing_payment: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    payment_code: string;
    country: string;
    region: string;
    street: string;
    apartment: string;
    zip_code: string;
    note: string;
    delivery_price: string;
    delivery_price_numeric: number;
    discount_price: number;
    delivery_date_time: string;
    client_gave_money: number;
    change_price: number;
    total_price: number;
    user: number;
    billing_products: BillingProduct[];
}

interface BillingModalProps {
    id: number;
    visible: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

const BillingModal: React.FC<BillingModalProps> = ({ id, visible, onClose, onUpdate }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [initialData, setInitialData] = useState<BillingData | null>(null);

    useEffect(() => {
        if (visible) {
            fetchData();
        }
    }, [visible]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get<BillingData>(`https://docker.mnogosushi.kg/api/v1/admin/billing/${id}/`, {
                headers: {
                    Authorization: `Bearer ${getCookie('access_token')}`
                }
            });
            setInitialData(response.data);
            form.setFieldsValue({
                ...response.data,
                delivery_date_time: moment(response.data.delivery_date_time),
            });
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            await axios.put(`https://docker.mnogosushi.kg/api/v1/admin/billing/${id}/`, {
                ...values,
                delivery_date_time: values.delivery_date_time.toISOString(),

            }, {
                headers: {
                    Authorization: `Bearer ${getCookie('access_token')}`
                }
            });
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Failed to save data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            width={'80%'}
            title="Редактировать счет"
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    Сохранить
                </Button>,
            ]}
        >
            <Form style={{ display: 'grid', gridTemplateColumns: "repeat(3, 1fr)", gridColumnGap: '1rem' }} form={form} layout="vertical" initialValues={initialData as any}>
                <Form.Item label="Тип биллинга" name="billing_type">
                    <Select>
                        <Option value="Лидогенерация">Лидогенерация</Option>
                        <Option value="Биллинг">Биллинг</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Тип чека" name="billing_receipt_type">
                    <Select>
                        <Option value="Самовывоз">Самовывоз</Option>
                        <Option value="Доставка">Доставка</Option>
                        <Option value="Неизвестно">Неизвестно</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Статус биллинга" name="billing_status">
                    <Select>
                        <Option value="В корзине">В корзине</Option>
                        <Option value="Оформлен">Оформлен</Option>
                        <Option value="Оплачен">Оплачен</Option>
                        <Option value="Доставлен">Доставлен</Option>
                        <Option value="Возврат">Возврат</Option>
                        <Option value="Неизвестно">Неизвестно</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Статус оплаты" name="billing_payment_status">
                    <Select>
                        <Option value="Оплачен">Оплачен</Option>
                        <Option value="Не оплачен">Не оплачен</Option>
                        <Option value="Ошибка">Ошибка</Option>
                        <Option value="В исполнении">В исполнении</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Способ оплаты" name="billing_payment">
                    <Select>
                        <Option value="Наличными в магазине">Наличными в магазине</Option>
                        <Option value="Наличными курьеру">Наличными курьеру</Option>
                        <Option value="Оплата картой курьеру">Оплата картой курьеру</Option>
                        <Option value="Оплата переводом">Оплата переводом</Option>
                        <Option value="Оплата в рассрочку">Оплата в рассрочку</Option>
                        <Option value="Картой Visa">Картой Visa</Option>
                        <Option value="Мбанк">Мбанк</Option>
                        <Option value="Optima 24">Optima 24</Option>
                        <Option value="О! Деньги">О! Деньги</Option>
                        <Option value="Bakai 24">Bakai 24</Option>
                        <Option value="Ошибка">Ошибка</Option>
                        <Option value="Неизвестно">Неизвестно</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="Имя" name="first_name">
                    <Input />
                </Form.Item>
                <Form.Item label="Фамилия" name="last_name">
                    <Input />
                </Form.Item>
                <Form.Item label="Телефон" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label="Код платежа" name="payment_code">
                    <Input />
                </Form.Item>
                <Form.Item label="Страна" name="country">
                    <Input />
                </Form.Item>
                <Form.Item label="Регион" name="region">
                    <Input />
                </Form.Item>
                <Form.Item label="Улица" name="street">
                    <Input />
                </Form.Item>
                <Form.Item label="Квартира" name="apartment">
                    <Input />
                </Form.Item>
                <Form.Item label="Почтовый индекс" name="zip_code">
                    <Input />
                </Form.Item>
                <Form.Item label="Заметка" name="note">
                    <Input />
                </Form.Item>
                <Form.Item label="Цена доставки" name="delivery_price">
                    <Input />
                </Form.Item>
                <Form.Item label="Цена доставки (число)" name="delivery_price_numeric">
                    <Input />
                </Form.Item>
                <Form.Item label="Скидка" name="discount_price">
                    <Input />
                </Form.Item>
                <Form.Item label="Дата и время доставки" name="delivery_date_time">
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item label="Сумма, полученная от клиента" name="client_gave_money">
                    <Input />
                </Form.Item>
                <Form.Item label="Сдача" name="change_price">
                    <Input />
                </Form.Item>
                <Form.Item label="Итоговая цена" name="total_price">
                    <Input />
                </Form.Item>
                <Form.Item label="Пользователь" name="user">
                    <Input type="number" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BillingModal;
