import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch } from '../../store/hook';
import { createUser, fetchUsers } from '../../store/reducers/userReduser';

interface UserFormValues {
    username: string;
    password: string;
    password2: string;
}

export const UserFormModal: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then((values: UserFormValues) => {
                console.log('Form values:', values);
                setVisible(false);
                dispatch(createUser({ data: values })).then(() => {

                    dispatch(fetchUsers({ pagination: '' }))

                })
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
                Открыть форму пользователя
            </Button>
            <Modal
                title="Форма пользователя"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="userForm"
                    initialValues={{ username: '', password: '', password2: '' }}
                >
                    <Form.Item
                        name="username"
                        label="Имя пользователя"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваше имя пользователя!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="password2"
                        label="Подтвердите пароль"
                        rules={[
                            { required: true, message: 'Пожалуйста, подтвердите ваш пароль!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('Пароли не совпадают!')
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserFormModal;
