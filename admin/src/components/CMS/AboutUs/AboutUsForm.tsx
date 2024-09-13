import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getCookie } from '../../../helpers/cookies';

const apiUrl = 'https://docker.mnogosushi.kg/api/v1/settings/about_us/4/';

interface AboutUsData {
    title: string;
    description: string;
    image: string;
    exp: string;
    promo_title: string;
    promo_desc: string;
    promo_video: string;
    promo_image: string;
}

const AboutUsForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageFileList, setImageFileList] = useState<any[]>([]);
    const [promoImageFileList, setPromoImageFileList] = useState<any[]>([]);

    useEffect(() => {
        axios.get<AboutUsData>(apiUrl, {
            headers: {
                Authorization: `Bearer ${getCookie('access_token')}`
            }
        })
            .then(response => {
                form.setFieldsValue(response.data);
                setImageFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: response.data.image,
                    }
                ]);
                setPromoImageFileList([
                    {
                        uid: '-2',
                        name: 'promo_image.png',
                        status: 'done',
                        url: response.data.promo_image,
                    }
                ]);
            })
            .catch(error => {
                message.error('Не удалось загрузить данные о компании');
                console.error(error);
            });
    }, [form]);

    const onFinish = async (values: AboutUsData) => {
        const formData = new FormData();

        // Добавляем только измененные поля
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('exp', values.exp);
        formData.append('promo_title', values.promo_title);
        formData.append('promo_desc', values.promo_desc);

        // Если файлы были изменены, добавляем их в formData
        if (imageFileList.length > 0 && imageFileList[0].originFileObj) {
            formData.append('image', imageFileList[0].originFileObj);
        }
        if (promoImageFileList.length > 0 && promoImageFileList[0].originFileObj) {
            formData.append('promo_image', promoImageFileList[0].originFileObj);
        }

        setLoading(true);

        try {
            const response = await axios.patch(apiUrl, formData, {
                headers: {
                    Authorization: `Bearer ${getCookie('access_token')}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            message.success('Информация о компании успешно обновлена');

            // Обновляем URL изображений после успешного сохранения
            if (response.data.image) {
                setImageFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: response.data.image,
                    }
                ]);
            }
            if (response.data.promo_image) {
                setPromoImageFileList([
                    {
                        uid: '-2',
                        name: 'promo_image.png',
                        status: 'done',
                        url: response.data.promo_image,
                    }
                ]);
            }
        } catch (error) {
            message.error('Не удалось обновить информацию о компании');
            console.error('Error uploading files:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (info: any, type: 'image' | 'promo_image') => {
        const fileList = info.fileList;

        if (type === 'image') {
            setImageFileList(fileList);
        } else if (type === 'promo_image') {
            setPromoImageFileList(fileList);
        }
    };

    return (
        <Card style={{ background: 'white' }}>
            <Form
                form={form}
                name="aboutUsForm"
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
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Изображение"
                >
                    <Upload
                        listType="picture-card"
                        fileList={imageFileList}
                        beforeUpload={() => false}
                        onChange={(info) => handleImageChange(info, 'image')}
                    >
                        {imageFileList.length === 0 && (
                            <div>
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Загрузить изображение</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="exp"
                    label="Опыт (в годах)"
                    rules={[{ required: true, message: 'Пожалуйста, введите количество лет опыта!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="promo_title"
                    label="Заголовок промо"
                    rules={[{ required: true, message: 'Пожалуйста, введите заголовок промо!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="promo_desc"
                    label="Описание промо"
                    rules={[{ required: true, message: 'Пожалуйста, введите описание промо!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="promo_image"
                    label="Изображение промо"
                >
                    <Upload
                        listType="picture-card"
                        fileList={promoImageFileList}
                        beforeUpload={() => false}
                        onChange={(info) => handleImageChange(info, 'promo_image')}
                    >
                        {promoImageFileList.length === 0 && (
                            <div>
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Загрузить промо изображение</div>
                            </div>
                        )}
                    </Upload>
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

export default AboutUsForm;
