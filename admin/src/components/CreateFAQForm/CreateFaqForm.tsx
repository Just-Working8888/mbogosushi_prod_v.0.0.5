import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { api } from '../../api';

interface QAFormValues {
    question: string;
    answer: string;
}

export const QAFormModal: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then((values: QAFormValues) => {
                console.log('Form values:', values);
                setVisible(false);
                api.createFaq(values)
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Открыть форму вопроса и ответа
            </Button>
            <Modal
                title="Форма вопроса и ответа"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="qaForm"
                    initialValues={{ question: '', answer: '' }}
                >
                    <Form.Item
                        name="question"
                        label="Вопрос"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваш вопрос!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="answer"
                        label="Ответ"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваш ответ!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default QAFormModal;
