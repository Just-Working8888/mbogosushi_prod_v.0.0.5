import React from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { useAppDispatch } from '../../store/hook';
import { fetchPromoCode } from '../../store/reducers/promoCode';
import { getCookie } from '../../helpers/cookies';

interface ItemFormProps {
    visible: boolean;
    onCancel: () => void;
}

export const PromoForm: React.FC<ItemFormProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const onFinish = async (values: any) => {
        try {
            const response = await fetch('https://docker.mnogosushi.kg/api/v1/admin/promocode/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('access_token')}`
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('Элемент успешно создан');
                form.resetFields();
                onCancel();
                dispatch(fetchPromoCode({ pagination: '' }));
            } else {
                message.error('Ошибка при создании элемента');
            }
        } catch (error) {
            message.error('Ошибка при создании элемента');
        }
    };

    return (
        <Modal
            visible={visible}
            title="Создать промокод"
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
                initialValues={{ title: '', code: '', quantity: 0, amount: 0 }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="title"
                    label="Название"
                    rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="Код"
                    rules={[{ required: true, message: 'Пожалуйста, введите код!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Количество"
                    rules={[{ required: true, message: 'Пожалуйста, введите количество!' }]}
                >
                    <InputNumber min={0} max={32767} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Сумма"
                    rules={[{ required: true, message: 'Пожалуйста, введите сумму!' }]}
                >
                    <InputNumber min={0} max={2147483647} style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
