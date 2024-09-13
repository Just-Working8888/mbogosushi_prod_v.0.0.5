import { Helmet } from 'react-helmet-async'
import OrderFormTable from '../../../components/OrderPlacingTable/OrderPlacing'

const OrderPage = () => {
    return (
        <div>
            <Helmet>
                <title>Mnogosushi | Оформление</title>
            </Helmet>
            <OrderFormTable />
        </div>
    )
}

export default OrderPage
