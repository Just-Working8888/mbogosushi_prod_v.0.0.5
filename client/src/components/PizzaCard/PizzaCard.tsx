import { Button, Flex, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { addCartItem } from '../../store/reducers/cartReduser';
import Counter from '../CartBar/Counter/Counter';
import { DeleteOutlined } from '@ant-design/icons';
import { api } from '../../api';
import { removeItem } from '../../store/slices/cartSlice';

type PizzaCardProps = {
    image: string;
    name: string;
    description: string;
    price: string;
    isNew?: boolean;
    id: number
};

const PizzaCard: React.FC<PizzaCardProps> = ({ image, name, description, price, isNew, id }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    function add() {
        const data = {
            quantity: 1,
            total: +price,
            cart: Number(localStorage.getItem('cart_id')) as any,
            product: +id
        }
        dispatch(addCartItem({ data: data })).then(() => message.success(`Товар ${name} успешно добвлен `))
    }
    const { data } = useAppSelector((state) => state.cart)
    const isHaveInCard = data.items.find((item) => item.product.id === id)
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
    return (
        <div className="pizza-card">
            <div onClick={() => navigate(`product/${id}`)} className="image-wrapper">
                <img src={image} alt={name} className="pizza-image" />
                {isNew && <span className="new-label">Новинка</span>}
            </div>
            <div className="pizza-info">
                <h3 className="pizza-name">{name}</h3>
                <p className="pizza-description">{description}</p>
                <br />
                <Flex gap={5} justify='space-between' align='center'>
                    <div className="pizza-price">от {isHaveInCard ? (isHaveInCard.quantity * isHaveInCard.product.price) : price} сом</div>
                    {isHaveInCard ?
                        <Flex>
                            <Counter record={isHaveInCard} />
                            <Button
                                onClick={() => delte(isHaveInCard.id)}
                                danger
                                style={
                                    {
                                        width: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // padding: '0px 0px 0px 7px',
                                        marginLeft: '5px'
                                    }}

                                icon={<DeleteOutlined style={{ color: 'red' }} />}>
                            </Button>
                        </Flex>
                        : <button className="select-button" onClick={add}>Выбрать</button>}
                    {/* <button className="select-button inCart">Удалить</button>  */}
                </Flex>

            </div>
        </div>
    );
};

export default PizzaCard;
