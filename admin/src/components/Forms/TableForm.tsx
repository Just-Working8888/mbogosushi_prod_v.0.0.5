import React from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';

interface VisitFormProps {
    visible: boolean;
    onCancel: () => void;
}

export const VisitForm: React.FC<VisitFormProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const response = await fetch('https://docker.mnogosushi.kg/api/v1/tables/table/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('Данные успешно отправлены');
                form.resetFields();
                onCancel();
            } else {
                message.error('Ошибка при отправке данных');
            }
        } catch (error) {
            message.error('Ошибка при отправке данных');
        }
    };

    return (
        <Modal
            visible={visible}
            title="Создать запись"
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
                initialValues={{ title: '', number: 0, count_visit: 0, daily_visits: {} }}
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
                    name="number"
                    label="Номер"
                    rules={[{ required: true, message: 'Пожалуйста, введите номер!' }]}
                >
                    <InputNumber style={{ width: '100%' }} min={0} max={2147483647} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
