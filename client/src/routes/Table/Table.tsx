import { Helmet } from 'react-helmet-async'
import PizzaListTable from '../../components/PizzaListTable/PizzaList'

const Table = () => {
    return (
        <>
            <Helmet>
                <title>Mnogosushi | Главная</title>
            </Helmet>

            <div className="container">
                <PizzaListTable />
            </div>



        </>
    )
}

export default Table
