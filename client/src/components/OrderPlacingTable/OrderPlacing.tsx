import React, { useEffect, useState } from 'react';
import { Input, Button, List, Avatar, Form, message, Select, Flex } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './OrderForm.scss'; // Стилизация компонента
import { api } from '../../api';
import { removeItem } from '../../store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import Counter from '../CartBarTable/Counter/Counter';
import { useParams } from 'react-router-dom';
import { createTableOrder, fetchOrderItemById } from '../../store/reducers/TableOrderReduser';
import { fetchTableById } from '../../store/reducers/tableReduser';

const { Option } = Select;

const OrderFormTable: React.FC = () => {
    const [promoCode, setPromoCode] = useState<string>(''); // Добавляем состояние для промо-кода
    const [discount, setDiscount] = useState<number>(0); // Состояние для хранения примененной скидки
    const { tableid } = useParams()

    const [paymentMethod, setPaymentMethod] = useState<string>('bankCard');
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.tableCart.data)


    useEffect(() => {
        dispatch(fetchOrderItemById({ id: Number(localStorage.getItem('table_key')) }));
        dispatch(fetchTableById({ id: Number(tableid) }))
    }, [dispatch]);



    const handlePaymentMethodChange = (value: string) => {
        setPaymentMethod(value);
    };

    const delte = async (id: number) => {
        try {
            await api.deleteTableOrderItemById(id).then(() => {
                dispatch(removeItem(id));
                dispatch(fetchOrderItemById({ id: Number(localStorage.getItem('table_key')) }));

                message.success('Товар успешно удалён из корзины');
            });
        } catch (error) {
            console.log(error);
        }
    };

    const totalPrice = (data.items?.reduce(
        (acc: number, item: any) => acc + parseFloat(item.product.price) * item.quantity, 0
    ) || 0) - discount; // 


    const onFinish = async (values: any) => {
        const data = {
            session_key: localStorage.getItem('session_key') as any,
            menu_table: Number(tableid),
            promo_code: true,
            discount_amount: 0,
            ...values
        }

        dispatch(createTableOrder({
            data: data
        })).then(() => {
            dispatch(fetchOrderItemById({ id: Number(localStorage.getItem('table_key')) }));
        })

    };

    const applyPromoCode = async () => {
        try {
            const table_key = localStorage.getItem('table_key')
            const response = await api.applyPromoCode({ cart_id: table_key, promo_code: promoCode });
            setDiscount(response.data.discount_amount);
            message.success(response.data.success);
        } catch (error) {
            message.error('Не удалось применить промо-код');
        }
    };
    return (
        <div className="order-container">
            <div className="he">
             
                <div className="personal-info-section">
                    <Form onFinish={onFinish} layout="vertical">
                        <Form.Item initialValue="bankCard" label="Метод оплаты" name="payment_method">
                            <Select defaultValue="bankCard" onChange={handlePaymentMethodChange}>
                                <Option value="bankCard">Банковская карта</Option>
                                <Option value="cash">Наличные</Option>
                                <Option value="eWallet">Электронный кошелек</Option>
                            </Select>
                        </Form.Item>
                        {paymentMethod === 'cash' && (
                            <Form.Item label="Сдача с" name="change">
                                <Input placeholder="Введите сумму для сдачи" />
                            </Form.Item>
                        )}
                        <Form.Item label="Комментарий к заказу" name="comment">
                            <Input.TextArea rows={3} placeholder="Укажите тут дополнительную информацию для курьера" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Оформить заказ
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            <div className="order-summary-section he">
                <div className="">
                    <h2><Flex justify='space-between'> Корзина <Button icon={<DeleteOutlined />} className="clear-cart-btn">
                        Очистить корзину
                    </Button></Flex></h2>

                    <List
                        itemLayout="horizontal"
                        dataSource={data.items}
                        renderItem={(item: any) => (
                            <List.Item

                                actions={[
                                    <div className='rightBar'>
                                        <Button onClick={() => delte(item.id)} style={{ width: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px 0px 0px 7px' }} type='text' icon={<DeleteOutlined style={{ color: 'red' }} />}>      </Button>

                                        <Counter record={item} />

                                    </div>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" size="large" style={{ height: '100px', width: '100px' }} src={item.product.iiko_image} />}
                                    title={item.product.title}
                                    description={
                                        <div>
                                            <p>{item.product.description}</p>
                                            <span style={{ color: 'red' }}>{parseFloat(item.product.price) * item.quantity} c</span>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
                <br />
                <div className="promo-code-section">
                    <h3>Введите промо-код:</h3>
                    <Input
                        placeholder="Введите промо-код"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Button type="primary" onClick={applyPromoCode} block>
                        Применить промо-код
                    </Button>
                </div>
                <br />
                <h3>Итого: {totalPrice} c</h3>
                <div className="order-details">
                    <p>Стоимость товаров: {totalPrice} c</p>
                </div>

                <Button type="primary" size="large" block>
                    Перейти к оплате
                </Button>
            </div>
        </div >
    );
};

export default OrderFormTable;
