import { Form, Input, DatePicker, Button, Tag, Divider, Modal, Select, message, Flex, InputNumber } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { formatParams } from '../../helpers/convertProps';
import { fetchProduct } from '../../store/reducers/productReduser';
import { PageHeader, SelectedProductTable, ShoosProductTable } from '../../components';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';

const { Option } = Select;

interface BillingFormProps {
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
    billing_products: { product_id: number; quantity: number }[];
}

export const CreateBiling = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any[]>([]);
    const { data } = useAppSelector((state) => state.product);
    const { menuprops } = useAppSelector((state) => state.window);



    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
    const [deliveryPriceString, setDeliveryPriceString] = useState<string>('');
    const [discountPrice, setDiscountPrice] = useState<number>(0);
    const [clientGaveMoney, setClientGaveMoney] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [changePrice, setChangePrice] = useState<number>(0);


    const calculateTotal = () => {
        const productTotal = selectedProduct.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
        const total = productTotal + deliveryPrice - discountPrice;
        setTotalPrice(total);
        setChangePrice(clientGaveMoney - total);
    };

    const handleDeliveryPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        setDeliveryPrice(value);
        setDeliveryPriceString(e.target.value);
    };

    const handleDiscountPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        setDiscountPrice(value);
    };

    const handleClientGaveMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        setClientGaveMoney(value);
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProduct({ filters: formatParams({ menuprops }) }));
    }, [menuprops, dispatch]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values: BillingFormProps) => {
        const billing_products = selectedProduct.map(product => ({
            product_id: product.id,
            quantity: product.quantity || 1,
        }));

        const payload = {
            ...values,
            delivery_price: deliveryPriceString,
            delivery_price_numeric: deliveryPrice,
            discount_price: discountPrice,
            client_gave_money: clientGaveMoney,
            change_price: changePrice,
            total_price: totalPrice,
            billing_products,
            delivery_date_time: values.delivery_date_time,
            user: localStorage.getItem('user_id')
        };

        try {
            const response = await fetch('https://docker.mnogosushi.kg/api/v1/admin/billing/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                message.success('Биллинг успешно создан');
                // Дополнительные действия после успешного создания
            } else {
                message.error('Ошибка при создании биллинга');
            }
        } catch (error) {
            message.error('Ошибка при создании биллинга');
        }
    };


    useEffect(() => {
        calculateTotal();
    }, [selectedProduct, deliveryPrice, discountPrice, clientGaveMoney]);


    return (
        <>
            <PageHeader
                title="BigBee Админ панель"
                breadcrumbs={[
                    {
                        title: (
                            <>
                                <HomeOutlined />
                                <span>Главная</span>
                            </>
                        ),
                        path: '/',
                    },
                    {
                        title: (
                            <>
                                <PieChartOutlined />
                                <span>Админ панель</span>
                            </>
                        ),
                        menu: {
                            items: DASHBOARD_ITEMS.map((d) => ({
                                key: d.title,
                                title: <Link to={d.path}>{d.title}</Link>,
                            })),
                        },
                    },
                    {
                        title: 'Создать Билинг',
                    },
                ]}
            />
            <div className='CreateBiling'>

                <Tag style={{ width: "100%", padding: '1rem' }} color="white">

                    <Form

                        name="billingForm"
                        layout="vertical"
                        onFinish={onFinish}
                        style={{ width: '100%' }}
                        initialValues={{
                            billing_type: "Лидогенерация",
                            billing_receipt_type: "Самовывоз",
                            billing_status: "В корзине",
                            billing_payment_status: "Оплачен",
                            billing_payment: "Наличными в магазине",
                            email: "user@example.com",
                            first_name: "string",
                            last_name: "string",
                            phone: "string",
                            payment_code: "string",
                            country: "string",
                            region: "string",
                            street: "string",
                            apartment: "string",
                            zip_code: "string",
                            note: "string",
                            delivery_price: "string",
                            delivery_price_numeric: 2147483647,
                            discount_price: 2147483647,
                            delivery_date_time: moment('2024-07-17T11:38:01.851Z'),
                            client_gave_money: 2147483647,
                            change_price: 2147483647,
                            total_price: 2147483647,
                            user: 0,
                        }}
                    >
                        <Flex gap={16}>
                            <Form.Item style={{ width: '100%' }} name="billing_type" label="Тип биллинга">
                                <Select>
                                    <Option value="Лидогенерация">Лидогенерация</Option>
                                    <Option value="Биллинг">Биллинг</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item style={{ width: '100%' }} name="billing_receipt_type" label="Вид получения товара">
                                <Select>
                                    <Option value="Самовывоз">Самовывоз</Option>
                                    <Option value="Доставка">Доставка</Option>
                                    <Option value="Неизвестно">Неизвестно</Option>
                                </Select>
                            </Form.Item>
                        </Flex>
                        <Flex gap={16}>
                            <Form.Item style={{ width: '100%' }} name="billing_status" label="Статус заказа">
                                <Select>
                                    <Option value="В корзине">В корзине</Option>
                                    <Option value="Оформлен">Оформлен</Option>
                                    <Option value="Оплачен">Оплачен</Option>
                                    <Option value="Доставлен">Доставлен</Option>
                                    <Option value="Возврат">Возврат</Option>
                                    <Option value="Неизвестно">Неизвестно</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item style={{ width: '100%' }} name="billing_payment_status" label="Статус оплаты">
                                <Select>
                                    <Option value="Оплачен">Оплачен</Option>
                                    <Option value="Не оплачен">Не оплачен</Option>
                                    <Option value="Ошибка">Ошибка</Option>
                                    <Option value="В исполнении">В исполнении</Option>
                                </Select>
                            </Form.Item>
                        </Flex>
                        <Flex gap={16}>
                            <Form.Item style={{ width: '100%' }} name="billing_payment" label="Способы оплаты">
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
                            <Form.Item style={{ width: '100%' }} name="email" label="Email">
                                <Input />
                            </Form.Item>
                        </Flex>
                        <Flex gap={16}>
                            <Form.Item style={{ width: '100%' }} name="first_name" label="Имя">
                                <Input />
                            </Form.Item>
                            <Form.Item style={{ width: '100%' }} name="last_name" label="Фамилия">
                                <Input />
                            </Form.Item>
                        </Flex>
                        <Flex gap={16}>
                            <Form.Item style={{ width: '100%' }} name="phone" label="Телефон">
                                <Input />
                            </Form.Item>
                            <Form.Item style={{ width: '100%' }} name="payment_code" label="Код оплаты">
                                <Input />
                            </Form.Item>
                        </Flex>
                        <Flex gap={16}>
                            <Form.Item style={{ width: '100%' }} name="country" label="Страна">
                                <Input />
                            </Form.Item>
                            <Form.Item style={{ width: '100%' }} name="region" label="Регион">
                                <Input />
                            </Form.Item>
                        </Flex>
                        <Flex gap={16}>
                            <Form.Item style={{ width: '100%' }} name="street" label="Улица">
                                <Input />
                            </Form.Item>
                            <Form.Item style={{ width: '100%' }} name="apartment" label="Квартира">
                                <Input />
                            </Form.Item>
                        </Flex>
                        <Flex gap={16}>
                            <Form.Item style={{ width: '100%' }} name="zip_code" label="Почтовый индекс">
                                <Input />
                            </Form.Item>
                            <Form.Item style={{ width: '100%' }} name="note" label="Примечание">
                                <Input />
                            </Form.Item>
                        </Flex>


                        <Flex gap={16}>
                            <Form.Item style={{ width: '100%' }} name="delivery_date_time" label="Дата и время доставки">
                                <DatePicker />
                            </Form.Item>
                            <Form.Item style={{ width: '100%' }} name="user" label="Пользователь">
                                <Input />
                            </Form.Item>
                        </Flex>

                        <Tag className='sex' style={{ width: '100%', padding: '2rem' }}>


                            <Flex gap={16}>
                                <Form.Item style={{ width: '100%' }} label="Цена доставки">
                                    <Input value={deliveryPriceString} onChange={handleDeliveryPriceChange} />
                                </Form.Item>
                                <Form.Item style={{ width: '100%' }} label="Цена доставки (число)">
                                    <InputNumber style={{ width: '100%' }} value={deliveryPrice} onChange={value => setDeliveryPrice(value || 0)} />
                                </Form.Item>
                            </Flex>
                            <Flex gap={16}>
                                <Form.Item style={{ width: '100%' }} label="Скидка">
                                    <Input value={discountPrice} onChange={handleDiscountPriceChange} />
                                </Form.Item>
                                <Form.Item style={{ width: '100%' }} label="Общая сумма">
                                    <Input value={totalPrice} readOnly />
                                </Form.Item>
                            </Flex>

                            <Flex gap={16}>
                                <Form.Item style={{ width: '100%' }} label="Деньги от клиента">
                                    <Input value={clientGaveMoney} onChange={handleClientGaveMoneyChange} />
                                </Form.Item>
                                <Form.Item style={{ width: '100%' }} label="Сдача">
                                    <Input value={changePrice} readOnly />
                                </Form.Item>
                            </Flex>


                        </Tag>




                        <br /><br />

                        <Button onClick={showModal} type='primary' style={{ width: "100%" }}>Добавить продукт</Button>
                        <Divider>Продукты</Divider>
                        <SelectedProductTable data={selectedProduct} setData={setSelectedProduct} />
                        <Form.Item>
                            <Button style={{ width: "100%", height: '60px' }} disabled={clientGaveMoney < totalPrice ? true : false} type="primary" htmlType="submit">
                                Создать Билинг
                            </Button>
                        </Form.Item>
                    </Form>
                </Tag>
            </div>
            <Modal title="Basic Modal" width={'90%'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ShoosProductTable selecetedData={selectedProduct} setData={setSelectedProduct} data={data.results} />
            </Modal>
        </>
    );
};
