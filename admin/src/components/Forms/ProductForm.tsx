// MyModalForm.tsx
import React, { useState } from 'react';
import { Modal, Form, Input, Button, Alert, InputNumber, message } from 'antd';
import { api } from '../../api';
import { IProductDto } from '../../store/models/IProduct';



interface MyModalFormProps {
    visible: boolean;
    onClose: () => void;
}

export const ProductForm: React.FC<MyModalFormProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: IProductDto) => {



        try {
            setLoading(true);
            api.createProduct(values)
            message.success('Данные успешно отправлены!');
            form.resetFields();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal
            title="Заполните форму"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
                    Отправить
                </Button>,
            ]}
        >
            {error && <Alert message="Ошибка" description={error} type="error" showIcon />}

            <Form
                form={form}
                name="myForm"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    title: '',
                    description: '',
                    price: '',
                    sku: '',
                    category: 0,
                }}
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
                    name="price"
                    label="Цена"
                    rules={[{ required: true, message: 'Пожалуйста, введите цену!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="iiko_image"
                    label="Изображение iiko"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="sku"
                    label="SKU"
                    rules={[{ required: true, message: 'Пожалуйста, введите SKU!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Категория"
                    rules={[{ required: true, message: 'Пожалуйста, введите категорию!' }]}
                >
                    <InputNumber min={0} />
                </Form.Item>
            </Form>
        </Modal>
    );
};









// // MyModalForm.tsx
// import React, { useState } from 'react';
// import { Modal, Form, Input, Button, Alert, InputNumber, Upload, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// interface FormData {
//     title: string;
//     description: string;
//     price: string;
//     iiko_image: File | null;
//     sku: string;
//     category: number;
// }

// interface MyModalFormProps {
//     visible: boolean;
//     onClose: () => void;
// }

// export const ProductForm: React.FC<MyModalFormProps> = ({ visible, onClose }) => {
//     const [form] = Form.useForm();
//     const [fileList, setFileList] = useState<File[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [data, setData] = useState<any>(null);
//     const accses_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwNzg0Nzg5LCJpYXQiOjE3MjA3ODQ0ODksImp0aSI6IjIwODJiMDVkODI2ODRkNGZiMTZjYzg2MGZmMTA3MzIwIiwidXNlcl9pZCI6MX0.m0shPg6h3G1-na7_9tKGW2-OY-KUJAC6pLngV6B49aA';

//     const onFinish = async (values: Omit<FormData, 'iiko_image'>) => {
//         if (fileList.length === 0) {
//             message.error('Пожалуйста, загрузите изображение iiko!');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('title', values.title);
//         formData.append('description', values.description);
//         formData.append('price', values.price);
//         formData.append('iiko_image', fileList[0]);
//         formData.append('sku', values.sku);
//         formData.append('category', values.category.toString());

//         try {
//             setLoading(true);
//             const response = await fetch('https://backend.mnogosushi.kg/api/v1/admin/product/', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${accses_token}`,
//                 },
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error(`Ошибка: ${response.statusText}`);
//             }

//             const result = await response.json();
//             setData(result);
//             message.success('Данные успешно отправлены!');
//             form.resetFields();
//             setFileList([]);
//         } catch (err) {
//             setError((err as Error).message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const beforeUpload = (file: File) => {
//         setFileList([file]);
//         return false;
//     };

//     return (
//         <Modal
//             title="Заполните форму"
//             visible={visible}
//             onCancel={onClose}
//             footer={[
//                 <Button key="back" onClick={onClose}>
//                     Отмена
//                 </Button>,
//                 <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
//                     Отправить
//                 </Button>,
//             ]}
//         >
//             {error && <Alert message="Ошибка" description={error} type="error" showIcon />}
//             {data && <Alert message="Успех" description="Данные успешно отправлены!" type="success" showIcon />}

//             <Form
//                 form={form}
//                 name="myForm"
//                 layout="vertical"
//                 onFinish={onFinish}
//                 initialValues={{
//                     title: '',
//                     description: '',
//                     price: '',
//                     sku: '',
//                     category: 0,
//                 }}
//             >
//                 <Form.Item
//                     name="title"
//                     label="Название"
//                     rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
//                 >
//                     <Input />
//                 </Form.Item>

//                 <Form.Item
//                     name="description"
//                     label="Описание"
//                     rules={[{ required: true, message: 'Пожалуйста, введите описание!' }]}
//                 >
//                     <Input />
//                 </Form.Item>

//                 <Form.Item
//                     name="price"
//                     label="Цена"
//                     rules={[{ required: true, message: 'Пожалуйста, введите цену!' }]}
//                 >
//                     <Input />
//                 </Form.Item>

//                 <Form.Item
//                     name="iiko_image"
//                     label="Изображение iiko"
//                     rules={[{ required: true, message: 'Пожалуйста, загрузите изображение iiko!' }]}
//                 >
//                     <Upload
//                         beforeUpload={beforeUpload}
//                         maxCount={1}
//                         fileList={fileList as any}
//                     >
//                         <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
//                     </Upload>
//                 </Form.Item>

//                 <Form.Item
//                     name="sku"
//                     label="SKU"
//                     rules={[{ required: true, message: 'Пожалуйста, введите SKU!' }]}
//                 >
//                     <Input />
//                 </Form.Item>

//                 <Form.Item
//                     name="category"
//                     label="Категория"
//                     rules={[{ required: true, message: 'Пожалуйста, введите категорию!' }]}
//                 >
//                     <InputNumber min={0} />
//                 </Form.Item>
//             </Form>
//         </Modal>
//     );
// };
