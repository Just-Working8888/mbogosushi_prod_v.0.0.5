import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../../store/hook'
import { fetchCartItemById, updateCartItem } from '../../../store/reducers/cartReduser'
import { Button } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

const Counter: FC<any> = ({ record }) => {
    const dispatch = useAppDispatch()
    const [quantity, setQuantity] = useState<number>(1)
    const selectedProduct = record
    useEffect(() => {
        setQuantity(record.quantity)
    }, [])
    function changeQuantity(action: string) {
        setQuantity(prev => {

            const newQuantity = action === '-' ? prev - 1 : prev + 1;
            dispatch(updateCartItem({ id: selectedProduct.id, data: { ...selectedProduct, quantity: newQuantity } })).then(() => {
                dispatch(fetchCartItemById({ id: localStorage.getItem('cart_id') as any }))
            });


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
