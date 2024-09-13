import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../../store/hook'
import { Button } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { fetchOrderItemById, updateTableOrder } from '../../../store/reducers/TableOrderReduser'

const Counter: FC<any> = ({ record }) => {
    const dispatch = useAppDispatch()
    const [quantity, setQuantity] = useState<number>(1)
    const selectedTableProduct = record
    useEffect(() => {
        setQuantity(record.quantity)
    }, [])
    function changeQuantity(action: string) {

        setQuantity(prev => {
            const newQuantity = action === '-' ? Math.max(0, prev - 1) : prev + 1;
            if (selectedTableProduct && newQuantity >= 0) {
                dispatch(updateTableOrder({
                    id: record.id,
                    data: {
                        quantity: newQuantity,
                        table: Number(localStorage.getItem('table_key')),
                        product: record.product,
                        total: +record.product.price * newQuantity
                    }
                })).then(() => {
                    dispatch(fetchOrderItemById({ id: Number(localStorage.getItem('table_key')) }));

                })
            }
            return newQuantity;
        });


    }

    return (
        <div className='quantity-controls'>
            <Button

                disabled={quantity === 1 ? true : false}
                icon={<MinusOutlined />}
                onClick={() => changeQuantity('-')}
            />
            <div className="quantity-value">{quantity}</div>
            <Button

                icon={<PlusOutlined />}
                onClick={() => changeQuantity('+')}
            />
        </div>
    )

}

export default Counter
