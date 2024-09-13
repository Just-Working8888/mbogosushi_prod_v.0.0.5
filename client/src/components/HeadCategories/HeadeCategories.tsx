import React, { useState } from 'react';
import { Button, Flex } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { setCategory, setOffcet } from '../../store/slices/windowSlice';
import { clearData } from '../../store/slices/productSlice';
import { useNavigate } from 'react-router-dom';


const CategoryList: React.FC = () => {
    const dispatch = useAppDispatch()
    const { data } = useAppSelector((state) => state.categories)
    const { menuprops } = useAppSelector((state) => state.window)
    const [all, setALl] = useState(false)
    const navigate = useNavigate()
    console.log(setALl);

    const targetId = useAppSelector((state) => state.scroll.targetId);

    const handleScroll = () => {
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    return (
        <Flex className='categoriesSex'>
            <Button
                onClick={() => {
                    dispatch(setOffcet(1))
                    dispatch(clearData())
                    dispatch(setCategory(0))
                    handleScroll()
                }}

                type={
                    menuprops.category === 0
                        ? 'primary'
                        : 'text'}>
                Все
            </Button>
            {data.results
                .slice(0, all === false ? 6 : data.results.length)
                .map((category) =>
                    <Button
                        onClick={() => {
                            dispatch(setOffcet(1))
                            dispatch(clearData())
                            dispatch(setCategory(category.id))
                            handleScroll()
                        }}
                        type={
                            menuprops.category === category.id
                                ? 'primary'
                                : 'text'}>
                        {category.title}
                    </Button>
                )}

            <Button
                type="dashed"

                icon={all ? <CaretUpOutlined /> : <CaretDownOutlined />}

                onClick={() => navigate('/categories')}>
                {all
                    ? 'Скрыть'
                    : "Показать все"}
            </Button>
        </Flex>
    );
};

export default CategoryList;
