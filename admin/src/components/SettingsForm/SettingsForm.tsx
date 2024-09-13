import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, message, Card } from 'antd';
import axios from 'axios';
import { getCookie } from '../../helpers/cookies';

const apiUrl = 'https://docker.mnogosushi.kg/api/v1/admin/setting/1/';

interface FormData {
    title: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    telegram: string;
    whatsapp: string;
    telegram_group_chat_id: number;
    menu_telegram_group_chat_id: number;
    city_modal: boolean;
    main_city: string;
}

const SettingsForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get<FormData>(apiUrl, {
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

    const onFinish = (values: FormData) => {
        setLoading(true);
        axios.put(apiUrl, values, {
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
                name="settingsForm"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="title"
                    label="Название"
                    rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Описание"
                    rules={[{ required: true, message: 'Пожалуйста, введите описание!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Электронная почта"
                    rules={[{ required: true, message: 'Пожалуйста, введите электронную почту!', type: 'email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Телефон"
                    rules={[{ required: true, message: 'Пожалуйста, введите номер телефона!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Адрес"
                    rules={[{ required: true, message: 'Пожалуйста, введите адрес!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="facebook"
                    label="Facebook"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="instagram"
                    label="Instagram"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="tiktok"
                    label="TikTok"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="telegram"
                    label="Telegram"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="whatsapp"
                    label="WhatsApp"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="telegram_group_chat_id"
                    label="ID группы в Telegram"
                    rules={[{ required: true, message: 'Пожалуйста, введите ID группы в Telegram!' }]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    name="menu_telegram_group_chat_id"
                    label="ID группы меню в Telegram"
                    rules={[{ required: true, message: 'Пожалуйста, введите ID группы меню в Telegram!' }]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    name="city_modal"
                    valuePropName="checked"
                >
                    <Checkbox>Городской модуль</Checkbox>
                </Form.Item>

                <Form.Item
                    name="main_city"
                    label="Главный город"
                    rules={[{ required: true, message: 'Пожалуйста, введите главный город!' }]}
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

export default SettingsForm;
