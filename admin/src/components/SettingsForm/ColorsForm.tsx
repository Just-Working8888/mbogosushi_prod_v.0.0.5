import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import axios from 'axios';
import { getCookie } from '../../helpers/cookies';

const apiUrl = 'https://docker.mnogosushi.kg/api/v1/admin/setting/1/';

interface ColorFormData {
    primary100: string;
    primary50: string;
    bgColor: string;
}

const ColorsForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get<ColorFormData>(apiUrl, {
            headers: {
                Authorization: `Bearer ${getCookie('access_token')}`
            }
        })
            .then(response => {
                form.setFieldsValue(response.data);
            })
            .catch(error => {
                message.error('Не удалось загрузить данные настроек');
                console.error(error);
            });
    }, [form]);

    const onFinish = (values: ColorFormData) => {
        setLoading(true);
        axios.patch(apiUrl, values, {
            headers: {
                Authorization: `Bearer ${getCookie('access_token')}`
            }
        })
            .then(() => {
                message.success('Настройки успешно обновлены');
            })
            .catch(error => {
                message.error('Не удалось обновить настройки');
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Card style={{ background: 'white' }}>
            <Form
                form={form}
                name="colorsForm"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="primary100"
                    label="Primary 100"
                    rules={[{ required: true, message: 'Пожалуйста, введите значение Primary 100!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="primary50"
                    label="Primary 50"
                    rules={[{ required: true, message: 'Пожалуйста, введите значение Primary 50!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="bgColor"
                    label="Background Color"
                    rules={[{ required: true, message: 'Пожалуйста, введите значение Background Color!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ColorsForm;
