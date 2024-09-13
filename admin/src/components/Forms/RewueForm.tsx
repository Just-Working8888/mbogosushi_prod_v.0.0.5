import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Rate, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchProduct } from '../../store/reducers/productReduser';
import { formatParams } from '../../helpers/convertProps';
import { setSearch } from '../../store/slices/windowSlice';
import { clearData } from '../../store/slices/productSlice';
import { fetchReviews } from '../../store/reducers/reviewsReduser';
import { getCookie } from '../../helpers/cookies';

const { Option } = Select;

interface ReviewFormProps {
    visible: boolean;
    onCancel: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.product.data.results);
    const { menuprops } = useAppSelector((state) => state.window);
    const [selectedProduct, serSelectedProduct] = useState(1)

    useEffect(() => {
        dispatch(fetchProduct({ filters: formatParams({ menuprops }) }));
    }, [menuprops, dispatch]);

    const onFinish = async (values: any) => {
        try {
            const response = await fetch('https://docker.mnogosushi.kg/api/v1/admin/review/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                    Authorization: `Bearer ${getCookie('access_token')}`

                },
                body: JSON.stringify({ ...values, product: selectedProduct }),
            });

            if (response.ok) {
                message.success('Отзыв успешно создан');
                form.resetFields();
                onCancel();
                dispatch(fetchReviews({ pagination: '' }))
            } else {
                message.error('Ошибка при создании отзыва');
            }
        } catch (error) {
            message.error('Ошибка при создании отзыва');
        }
    };

    const onChange = (value: number) => {
        serSelectedProduct(value)
    };

    const onSearch = (value: string) => {
        dispatch(clearData())
        dispatch(setSearch(value));
    };

    return (
        <Modal
            visible={visible}
            title="Создать отзыв"
            okText="Создать"
            cancelText="Отмена"
            onCancel={onCancel}
            onOk={() => {
                form.submit();
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ stars: 0, user: 0, product: 0 }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="text"
                    label="Текст"
                    rules={[{ required: true, message: 'Пожалуйста, введите текст отзыва!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="stars"
                    label="Звезды"
                    rules={[{ required: true, message: 'Пожалуйста, выберите количество звезд!' }]}
                >
                    <Rate />
                </Form.Item>
                <Form.Item
                    name="user"
                    label="Пользователь"
                    rules={[{ required: true, message: 'Пожалуйста, введите ID пользователя!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="product"
                    label="Продукт"
                    rules={[{ required: true, message: 'Пожалуйста, выберите продукт!' }]}
                >
                    <Select
                        onChange={onChange}
                        onSearch={onSearch}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {products.map((item) => (
                            <Option key={item.id} value={item.id} label={item.title}>
                                {item.title}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
