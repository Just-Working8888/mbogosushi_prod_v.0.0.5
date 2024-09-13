import { Helmet } from 'react-helmet-async'
import OrderForm from '../../components/OrderPlacing/OrderPlacing'

const OrderPage = () => {
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
