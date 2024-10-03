import React, { useEffect, useState } from 'react';
import PizzaCard from '../PizzaCard/PizzaCard';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setLimit, setOffcet } from '../../store/slices/windowSlice';
import CardSceleton from '../Sceletons/CardSceleton/CardSceleton';
import { Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchProduct } from '../../store/reducers/productReduser';
import { formatParams } from '../../helpers/convertProps';
import { setTargetId } from '../../store/slices/scroolSlice';

const PizzaList: React.FC = () => {

    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.product.data.results)
    const hasNext = useAppSelector((state) => state.product.data.next)
    const { menuprops } = useAppSelector((state) => state.window)
    const { laoding } = useAppSelector((state) => state.product)
    const [limit, setLimitt] = useState<number>(8); // Начальный лимит для десктопа

    useEffect(() => {
        const updateLimit = () => {
            const isMobile = window.innerWidth <= 768; // Определение мобильного устройства
            setLimitt(isMobile ? 6 : 8); // 6 для мобильных, 8 для десктопа
        };

        // Вызов функции при монтировании компонента и при изменении размера окна
        updateLimit();
        window.addEventListener('resize', updateLimit);

        // Удаляем слушатель при размонтировании компонента
        return () => {
            window.removeEventListener('resize', updateLimit);
        };
    }, []);
    function next() {
        dispatch(setOffcet((menuprops.offset + 8)))
        dispatch(setLimit((limit)))

    }



    const targetId = 'scrollTarget'; // Уникальный ID для целевого элемента

    useEffect(() => {
        dispatch(setTargetId(targetId)); // Сохраняем ID элемента в Redux
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchProduct({ filters: formatParams({ menuprops }) }))
    }, [menuprops])
    return (
        <div className='sushilistsex'>
            <h1>Популярные продукты</h1>

            <div id={targetId} className="pizza-list" style={{ paddingTop: '8rem' }}>

                {laoding ?
                    <>
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                    </>
                    :
                    <InfiniteScroll
                        style={{ width: '100%' }}
                        dataLength={data.length}
                        next={next}
                        className="pizza-list"
                        hasMore={hasNext !== null}
                        loader={<>
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                        </>}
                        endMessage={<Divider plain>Это все, ничего больше. 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
                        {data.map((pizza: any, index) => (
                            <PizzaCard
                                key={index}
                                id={pizza.id}
                                image={pizza.image ? pizza.image : pizza.iiko_image}
                                name={pizza.title}
                                description={pizza.description}
                                price={pizza.price}

                                loyalty_points={pizza?.loyalty_points}
                                isNew={true}
                            />
                        ))}
                    </InfiniteScroll>}

            </div>
        </div>
    );
};

export default PizzaList;
