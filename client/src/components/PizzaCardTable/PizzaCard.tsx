import { Button, Flex, message } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import Counter from '../CartBarTable/Counter/Counter';
import { DeleteOutlined } from '@ant-design/icons';
import { api } from '../../api';
import { removeItem } from '../../store/slices/cartSlice';
import { addTableOrderItem, fetchOrderItemById } from '../../store/reducers/TableOrderReduser';

type PizzaCardProps = {
    image: string;
    name: string;
    description: string;
    price: string;
    isNew?: boolean;
    id: number
};

const PizzaCardTable: React.FC<PizzaCardProps> = ({ image, name, description, price, isNew, id }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    function add() {
        const data = {
            quantity: 1,
            total: +price,
            table: Number(localStorage.getItem('table_key')) as any,
            product: +id
        }
        dispatch(addTableOrderItem({ data: data })).then(() => {
            message.success(`Товар ${name} успешно добвлен `)
        })
    }
    const { data } = useAppSelector((state) => state.tableCart)
    const isHaveInCard = data.items.find((item) => item.product.id === id)
    async function delte(id: number) {

        try {

            await api.deleteTableOrderItemById(id).then(() => {
                dispatch(removeItem(id))
                dispatch(fetchOrderItemById({ id: Number(localStorage.getItem('table_key')) }));

                message.success('товар успешно удален из корзины')
            })

        } catch (error) {
            console.log(error);

        }
    }
    const { tableid } = useParams()
    return (
        <div className="pizza-card">
            <div onClick={() => navigate(`/table/${tableid}/tablefood/${id}`)} className="image-wrapper">
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

export default PizzaCardTable;
