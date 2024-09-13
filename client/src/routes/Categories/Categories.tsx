import { useAppDispatch, useAppSelector } from '../../store/hook'
import {  Card, Flex } from 'antd'
import { setCategory, setOffcet } from '../../store/slices/windowSlice'
import { clearData } from '../../store/slices/productSlice'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const { data } = useAppSelector((state) => state.categories)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const targetId = useAppSelector((state) => state.scroll.targetId);

    const handleScroll = () => {
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    const handleNavigate = (path: any) => {
        navigate(path, { replace: true });
        handleScroll(); // Вызываем handleScroll после навигации
    };

    return (
        <Flex gap={10} className='container' wrap='wrap'>
            {
                data.results.map((item) =>
                    <Card
                        onClick={() => {
                            dispatch(setOffcet(1))
                            dispatch(clearData())
                            dispatch(setCategory(item.id))
                            handleNavigate('/')
                            handleScroll()
                        }}
                        className='sexcategoryclass'
                        cover={<img height={200} style={{objectFit:'contain'}} alt="example" src={item.iiko_image} />}>

                        <Flex justify='space-between'>
                            <h3>{item.title}</h3>

                        </Flex>

                    </Card>
                )
            }
        </Flex>
    )
}

export default Categories
