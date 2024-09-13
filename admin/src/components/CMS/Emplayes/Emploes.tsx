import React, { useEffect, useState } from 'react';
import { List, Avatar, Button, message, Modal, Form, Input, Upload, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getCookie } from '../../../helpers/cookies';

const apiUrl = 'https://docker.mnogosushi.kg/api/v1/admin/employees/';

interface Employee {
    id: number;
    name: string;
    job_title: string;
    image: string;
    tweeter: string;
    instagram: string;
    facebook: string;
    telegram: string;
}

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [fileList, setFileList] = useState<any[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        axios.get<{ count: number, results: Employee[] }>(apiUrl, {
            headers: {
                "Authorization": `Bearer ${getCookie('access_token')}`
            }
        })
            .then(response => {
                setEmployees(response.data.results);
            })
            .catch(error => {
                message.error('Не удалось получить данные сотрудников');
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const showModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        form.setFieldsValue(employee);
        setImageUrl(employee.image);
        setFileList([
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: employee.image,
            }
        ]); // Заполняем список файлов текущим изображением
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedEmployee(null);
        setImageUrl(null);
        setFileList([]); // Очищаем список файлов при закрытии модального окна
    };

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                const formData = new FormData();
                for (const key in values) {
                    formData.append(key, values[key]);
                }
                if (fileList.length > 0 && fileList[0].originFileObj) {
                    formData.append('image', fileList[0].originFileObj);
                }
                if (selectedEmployee) {
                    axios.put(`${apiUrl}${selectedEmployee.id}/`, formData, {
                        headers: {
                            "Authorization": `Bearer ${getCookie('access_token')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(() => {
                            message.success('Сотрудник успешно обновлен');
                            setEmployees(prevEmployees =>
                                prevEmployees.map(emp =>
                                    emp.id === selectedEmployee.id ? { ...emp, ...values, image: imageUrl! } : emp
                                )
                            );
                            setIsModalVisible(false);
                        })
                        .catch(error => {
                            message.error('Не удалось обновить сотрудника');
                            console.error(error);
                        });
                }
            })
            .catch(error => {
                console.error('Ошибка валидации:', error);
            });
    };

    const handleImageChange = (info: any) => {
        setFileList(info.fileList); // Обновляем список файлов

        if (info.file.status === 'done' || info.file.status === 'uploading') {
            // Если файл загружен или загружается, показываем превью
            const imgURL = URL.createObjectURL(info.file.originFileObj);
            setImageUrl(imgURL);
        }
    };

    return (
        <>
            <Card style={{ background: 'white' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={employees}
                    renderItem={employee => (
                        <List.Item
                            actions={[
                                <Button type="link" onClick={() => showModal(employee)}>Редактировать</Button>,
                                <Button type="link" href={employee.tweeter} target="_blank">Twitter</Button>,
                                <Button type="link" href={employee.instagram} target="_blank">Instagram</Button>,
                                <Button type="link" href={employee.facebook} target="_blank">Facebook</Button>,
                                <Button type="link" href={employee.telegram} target="_blank">Telegram</Button>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={employee.image} />}
                                title={employee.name}
                                description={employee.job_title}
                            />
                        </List.Item>
                    )}
                    loading={loading}
                />
            </Card>

            <Modal
                title="Редактировать Сотрудника"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleOk}
                okText="Сохранить"
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={selectedEmployee as any}
                >
                    <Form.Item
                        name="name"
                        label="Имя"
                        rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="job_title"
                        label="Позиция"
                        rules={[{ required: true, message: 'Пожалуйста, введите должность!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Загрузить изображение"
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            showUploadList={true}
                            beforeUpload={() => false}
                            onChange={handleImageChange}
                        >
                            {fileList.length === 0 && (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Загрузить изображение</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="tweeter"
                        label="Twitter"
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
                        name="facebook"
                        label="Facebook"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="telegram"
                        label="Telegram"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EmployeeList;
