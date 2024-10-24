import React, { useEffect, useState } from 'react';
import { Input, Button, List, Avatar, Form, message, Radio, Select, Flex, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './OrderForm.scss'; // Стилизация компонента
import { api } from '../../api';
import { removeItem } from '../../store/slices/cartSlice';
import { fetchCartItemById } from '../../store/reducers/cartReduser';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import Counter from '../CartBar/Counter/Counter';
// import MapTest from '../Map/Map';
// import SearchComponent from '../TestLocationSerch/TestLocationSearch';
import { createBiling } from '../../store/reducers/bilingReduser';
import { createDelivary } from '../../store/reducers/delivaryReduser';
import { useNavigate } from 'react-router-dom';
import Protected from '../Protected/Protected';

const { Option } = Select;

const OrderForm: React.FC = () => {
    const [receiptType, setReceiptType] = useState<string>('Самовывоз');
    const [promoCode, setPromoCode] = useState<string>('');
    const [discount, setDiscount] = useState<number>(0);
    const [adres, setAdres] = useState('')
    console.log(discount);

    const [usePoints, setUsePoints] = useState<boolean>(false); // Состояние для чекбокса
    const [pointsToUse, setPointsToUse] = useState<number>(0); // Состояние для баллов
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState<string>('bankCard');
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.cart);
    const discounts = data.discount_amount
    const points = useAppSelector((state) => state.point);
    const poooint = data?.points_used
    const AdressTitle = useAppSelector((state) => state.adresses.adressTitle);
    const loyaltyPoints = useAppSelector((state) => state.user.data?.loyalty_points || 0); // Баллы клиента

    useEffect(() => {
        const cartId = localStorage.getItem('cart_id');
        if (cartId) {
            dispatch(fetchCartItemById({ id: Number(cartId) }));
        }
    }, [dispatch]);

    const handleReceiptTypeChange = (e: any) => {
        setReceiptType(e.target.value);
    };

    const handlePaymentMethodChange = (value: string) => {
        setPaymentMethod(value);
    };

    const handleUsePointsChange = (e: any) => {
        setUsePoints(e.target.checked);
        if (!e.target.checked) {
            setPointsToUse(0);
        }
    };

    const handlePointsInputChange = (e: any) => {
        const inputPoints = Number(e.target.value);
        if (inputPoints > loyaltyPoints) {
            message.error(`Вы не можете использовать больше чем ${loyaltyPoints} баллов`);
            setPointsToUse(loyaltyPoints);
        } else {
            setPointsToUse(inputPoints);
        }
    };

    const delte = async (id: number) => {
        try {
            await api.deleteCartItemById(id).then(() => {
                dispatch(removeItem(id));
                message.success('Товар успешно удалён из корзины');
            });
        } catch (error) {
            console.log(error);
        }
    };
    const totalPricePRODUCT = (data.items?.reduce(
        (acc: number, item: any) => acc + parseFloat(item.product.price) * item.quantity, 0
    ) || 0)
    const totalPrice = (data.items?.reduce(
        (acc: number, item: any) => acc + parseFloat(item.product.price) * item.quantity, 0
    ) || 0) - data.discount_amount - pointsToUse;

    useEffect(() => {
        if (receiptType === 'Доставка') {
            dispatch(createDelivary({ data: { lon: `${points.adressPoint[0]}`, lat: `${points.adressPoint[1]}` } }));
        }
    }, [points, AdressTitle, receiptType]);

    const onFinish = async (values: any) => {
        console.log(values);

        const data = localStorage.getItem('user_id') ? {
            billing_receipt_type: values.billing_receipt_type,
            user_id: localStorage.getItem('user_id'),
            delivery_price: "320",
            // delivery_price: delivery.data.price,
            street: adres,
            phone: values.phone,
            payment_method: values.payment_method,
            note: values.note,
            status: true,
            parent: 0,
            change_price: values.change_price,
            promocode_used: discounts,
            points_used: Number(poooint) // Добавляем количество использованных баллов
        } : {
            billing_receipt_type: values.billing_receipt_type,
            delivery_price: "320",
            // delivery_price: delivery.data.price,
            street: adres,
            phone: values.phone,
            payment_method: values.payment_method,
            note: values.note,
            status: true,
            promocode_used: discounts,
            parent: 0,
            change_price: values.change_price,
        }

        dispatch(createBiling({
            data: data
        })).then((res) => {
            navigate(`/code/${res?.payload?.payment_code}`);
        });
    };

    const applyPromoCode = async () => {
        try {
            const cartId = localStorage.getItem('cart_id');
            const response = await api.applyPromoCode({ cart_id: cartId, promo_code: promoCode });
            setDiscount(response.data.discount_amount);
            dispatch(fetchCartItemById({ id: Number(cartId) }));

            message.success(response.data.success);
        } catch (error) {
            message.error('Не удалось применить промо-код');
        }
    };


    const applyPoints = async () => {
        try {
            const cartId = localStorage.getItem('cart_id');
            const response = await api.applyPoints({
                "user_id": localStorage.getItem('user_id'),
                "points_used": Number(pointsToUse),
                "cart_id": localStorage.getItem('cart_id')
            });
            setDiscount(response.data.discount_amount);
            dispatch(fetchCartItemById({ id: Number(cartId) }));

            message.success(response.data.success);
        } catch (error) {
            message.error('Не удалось применить промо-код');
        }
    };

    return (
        <div className="order-container">
            <div className="he">

                <div className="personal-info-section">
                    <h2> Информация</h2>

                    <Form onFinish={onFinish} layout="vertical">
                        <Form.Item initialValue="Самовывоз" label="Тип получения" name="billing_receipt_type">
                            <Radio.Group onChange={handleReceiptTypeChange} value={receiptType}>
                                <Radio value="Доставка">Доставка</Radio>
                                <Radio value="Самовывоз">Самовывоз</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {receiptType === 'Доставка' && (
                                              <>
                                    <Input onChange={(e) => setAdres(e.target.value)} placeholder='Адрес' />
                                    {/* <MapTest />
                            <SearchComponent /> */}
                                    <br />
                                    <br />
                                </>
              
                        )}
                        <Form.Item initialValue="cash" label="Метод оплаты" name="payment_method">
                            <Select defaultValue="cash" onChange={handlePaymentMethodChange}>
                                {/* <Option value="bankCard">Банковская карта</Option> */}
                                <Option value="cash">Наличные</Option>
                                <Option value="eWallet">Электронный кошелек</Option>
                            </Select>
                        </Form.Item>

                        {paymentMethod === 'cash' && (
                            <Form.Item label="Сдача с" name="change_price">
                                <Input placeholder="Введите сумму для сдачи" />
                            </Form.Item>
                        )}

                        <Form.Item label="Телефон" name="phone" initialValue="+996 ">
                            <Input placeholder="Введите номер телефона" />
                        </Form.Item>

                        <Form.Item label="Комментарий к заказу" name="note">
                            <Input.TextArea rows={3} placeholder="Укажите тут дополнительную информацию для курьера" />
                        </Form.Item>
                        <Protected fallback={<></>}>
                            <>
                                {/* Чекбокс для использования баллов */}
                                <Form.Item>
                                    <Checkbox checked={usePoints} onChange={handleUsePointsChange}>
                                        Потратить баллы
                                    </Checkbox>
                                </Form.Item>

                                {/* Инпут для ввода баллов */}
                                {usePoints && (
                                    <Form.Item name={'points'} label={`Доступно баллов: ${loyaltyPoints}`}>
                                        <Input
                                            type="number"
                                            value={pointsToUse}
                                            onChange={handlePointsInputChange}
                                            max={loyaltyPoints} // Ограничение
                                            placeholder="Количество баллов"
                                        />
                                        <Button onClick={applyPoints}>Использовать баллы</Button>
                                    </Form.Item>
                                )}</>
                        </Protected>


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
                {!data.promo_code &&
                    <Protected fallback={<p>Авторизуйтесь чтобы использовать промокод</p>}>
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
                    </Protected>
                }
                <br />
                <h3>Итого: {totalPrice} c <p>без учета доставки</p></h3>


                <div className="order-details">
                    <p>Стоимость товаров: {totalPricePRODUCT} c</p>
                    <p>Скидка: {data.discount_amount}</p>
                    <p>Потрачено баллов:{data.points_used}</p>

                    {
                        receiptType === 'Доставка' && <>
                            <p>Адресc: {adres} </p>
                            <p>Доставка: 320 </p>

                        </>
                    }
                </div>

            </div>

        </div>
    );
};

export default OrderForm;
