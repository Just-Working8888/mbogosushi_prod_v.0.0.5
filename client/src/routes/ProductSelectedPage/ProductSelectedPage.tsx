import { useEffect } from 'react'
import PizzaCard from '../../components/SinglePage/PizzaCard'
import { useAppDispatch, useAppSelector } from '../../store/hook'
import { useParams } from 'react-router-dom'
import { fetchProduct, fetchProductByID } from '../../store/reducers/productReduser'
import Reviews from '../../components/SinglePage/Rewue/Rewue'
import { Helmet } from 'react-helmet-async'

const ProductSelectedPage = () => {
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

export default ProductSelectedPage
