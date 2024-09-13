import React, { useEffect, useState } from 'react';
import { Drawer, Button, List, Avatar, message, Badge } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import './CartDrawer.scss';
import { fetchCartItemById } from '../../store/reducers/cartReduser';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import Counter from './Counter/Counter';
import { api } from '../../api';
import { removeItem } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';





const CartDrawer: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.cart);

    const navigate = useNavigate()

    useEffect(() => {
        const cartId = localStorage.getItem('cart_id');
        if (cartId) {
            dispatch(fetchCartItemById({ id: Number(cartId) }));
        }
    }, [dispatch]);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    async function delte(id: number) {

        try {

            await api.deleteCartItemById(id).then(() => {
                dispatch(removeItem(id))
                message.success('товар успешно удален из корзины')
            })

        } catch (error) {
            console.log(error);

        }
    }

    const totalPrice = data.items?.reduce(
        (acc: number, item: any) =>
            acc + parseFloat(item.product.price) * item.quantity, 0) || 0;

    return (
        <div>
            <Badge count={data?.items?.length}>  <div onClick={showDrawer} className="button">

                <ShoppingCartOutlined />


            </div>       </Badge>
            <Drawer
                title={`В корзине ${data.items?.length || 0} товара`}
                placement="right"
                onClose={onClose}
                visible={visible}
                width={500}
            >
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
                <div className="cart-summary">
                    <div className="cart-summary-item">
                        <span>Итого:</span>
                        <span>{totalPrice} c</span>
                    </div>
                    {/* <div className="cart-summary-item">
                        <span>Налог 5%:</span>
                        <span>{ } ₽</span>
                    </div> */}
                    {/* <div className="cart-summary-item">
                        <span>Скидка:</span>
                        <span>-{data.discount_amount} ₽</span>
                    </div> */}
                    <div className="cart-summary-item total">
                        <span>К оплате:</span>
                        <span>{totalPrice} c</span>
                    </div>

                    <Button onClick={() => {
                        navigate('/order')
                        onClose()
                    }} type="primary" block>
                        Оформить заказ
                    </Button>

                </div>
            </Drawer>
        </div>
    );
};

export default CartDrawer;
