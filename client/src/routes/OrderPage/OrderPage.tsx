import { Helmet } from 'react-helmet-async'
import OrderForm from '../../components/OrderPlacing/OrderPlacing'
import { useEffect } from 'react';

const OrderPage = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // для плавной прокрутки
        });
    };
    useEffect(() => {
        scrollToTop()
    }, [])
    return (
        <div>
            <Helmet>
                <title>Mnogosushi | Оформление</title>
            </Helmet>
            <OrderForm />
        </div>
    )
}

export default OrderPage
