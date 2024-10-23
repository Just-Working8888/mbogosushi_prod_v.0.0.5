import React, { useState } from 'react';
import { Button } from 'antd';
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
    const handleNavigate = (path: string) => {
        navigate(path, { replace: true });
        handleScroll();
    };
    const handleScroll = () => {
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    return (
        <div className="navbar__pages">
            <div className="navbar__pages-wrapper">
                <Button
                    onClick={() => {
                        dispatch(setOffcet(1))
                        dispatch(clearData())
                        dispatch(setCategory(0))
                        handleNavigate('/')
                        handleScroll()
                    }}
                    type={
                        menuprops.category === 0
                            ? 'primary'
                            : 'text'}>
                    Все
                </Button>
                {data.results.map((category) =>
                    <Button
                        key={category.id}
                        onClick={() => {
                            dispatch(setOffcet(1))
                            dispatch(clearData())
                            dispatch(setCategory(category.id))
                            handleNavigate('/')
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
                    onClick={() => setALl(!all)}>
                    {all ? 'Скрыть' : "Показать все"}
                </Button>
            </div>
        </div>
    );
};

export default CategoryList;
