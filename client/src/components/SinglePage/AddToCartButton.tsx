import React from "react";
import { Button, Flex, message } from "antd";
import Counter from "../CartBar/Counter/Counter";
import { DeleteOutlined } from "@ant-design/icons";
import {  useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addCartItem } from "../../store/reducers/cartReduser";
import { api } from "../../api";
import { removeItem } from "../../store/slices/cartSlice";

interface AddToCartButtonProps {
    price: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ price }) => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    function add() {
        const data = {
            quantity: 1,
            total: +price,
            cart: Number(localStorage.getItem('cart_id')) as any,
            product: Number(id)
        }
        dispatch(addCartItem({ data: data })).then(() => message.success(`Товар ${name} успешно добвлен `))
    }
    const { data } = useAppSelector((state) => state.cart)
    const isHaveInCard = data.items.find((item) => item.product.id === Number(id))
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
        <Flex gap={5} justify='space-between' align='center'>
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
                : <Button className="select-button" onClick={add} type="primary">Добавить в корзину</Button>}
            {/* <button className="select-button inCart">Удалить</button>  */}
        </Flex>
    );
};

export default AddToCartButton;
