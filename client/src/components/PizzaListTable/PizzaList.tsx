import React, { useEffect } from 'react';
import PizzaCardTable from '../PizzaCardTable/PizzaCard';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setOffcet } from '../../store/slices/windowSlice';
import CardSceleton from '../Sceletons/CardSceleton/CardSceleton';
import { Divider, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchProduct } from '../../store/reducers/productReduser';
import { formatParams } from '../../helpers/convertProps';
import { setTargetId } from '../../store/slices/scroolSlice';

const PizzaListTable: React.FC = () => {

    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.product.data.results)
    const sex = useAppSelector((state) => state.table.table)
    const hasNext = useAppSelector((state) => state.product.data.next)
    const { menuprops } = useAppSelector((state) => state.window)
    const { laoding } = useAppSelector((state) => state.product)

    function next() {
        dispatch(setOffcet((menuprops.offset + 20)))
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
            <Tag color='red'>
                <h3> {sex.title}</h3>
                <h4><strong>стол номер:</strong>{sex.number}</h4>
            </Tag>
            <br />
            <br />
            <div id={targetId} className="pizza-list" >

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
                            <PizzaCardTable
                                key={index}
                                id={pizza.id}
                                image={pizza.iiko_image}
                                name={pizza.title}
                                loyalty_points={pizza?.loyalty_points}

                                description={pizza.description}
                                price={pizza.price}
                                isNew={true}
                            />
                        ))}
                    </InfiniteScroll>}

            </div>
        </div>
    );
};

export default PizzaListTable;
