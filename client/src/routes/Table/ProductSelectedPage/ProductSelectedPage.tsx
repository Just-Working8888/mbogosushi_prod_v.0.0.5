import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAppDispatch, useAppSelector } from '../../../store/hook'
import { fetchProduct, fetchProductByID } from '../../../store/reducers/productReduser'
import PizzaCard from '../../../components/SinglePageTable/PizzaCard'
import Reviews from '../../../components/SinglePage/Rewue/Rewue'

const ProductSelectedPageTable = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()

    const { product } = useAppSelector((state) => state.product)


    useEffect(() => {
        dispatch(fetchProduct({ filters: '' }))
        dispatch(fetchProductByID({ id: Number(id) }))
    }, [id])

    return (
        <div className='container'>
            <Helmet>
                <title>Mnogosushi | {product?.title ? product.title : 'Детальный просмотр'}</title>
            </Helmet>
            <PizzaCard />
            <Reviews />
        </div>
    )
}

export default ProductSelectedPageTable
