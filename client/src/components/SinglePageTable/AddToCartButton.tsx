import React from "react";
import { Button, Flex, message } from "antd";
import Counter from "../CartBarTable/Counter/Counter";
import { DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { api } from "../../api";
import { removeItem } from "../../store/slices/cartSlice";
import { addTableOrderItem, fetchOrderItemById } from "../../store/reducers/TableOrderReduser";
import { fetchProductByID } from "../../store/reducers/productReduser";

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
            table: Number(localStorage.getItem('table_key')) as any,
            product: Number(id)
        }
        dispatch(addTableOrderItem({ data: data })).then(() => {
            message.success(`Товар ${name} успешно добвлен `)
            
        })
    }
    const { data } = useAppSelector((state) => state.tableCart)
    const isHaveInCard = data.items.find((item) => item.product.id === Number(id))
    async function delte(id: number) {

        try {

            await api.deleteTableOrderItemById(id).then(() => {
                dispatch(removeItem(id))
                dispatch(fetchOrderItemById({ id: Number(localStorage.getItem('table_key')) }));
                dispatch(fetchProductByID({ id: Number(id) }))

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
