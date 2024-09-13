import React, { useState } from 'react';
import { Modal, Form, Input, Button, Alert, Upload } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { getCookie } from '../../helpers/cookies';
import axios from 'axios';

interface FormData {
  title: string;
  iiko_image: string;
  slug: string;
  external_id: string;
  priority: number;
  image: File | null;
}

interface MyModalFormProps {
  visible: boolean;
  onClose: () => void;
}

export const CategoryForm: React.FC<MyModalFormProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const postRequest = async (formData: FormData) => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('iiko_image', formData.iiko_image);
    data.append('slug', formData.slug);
    data.append('external_id', formData.external_id);
    data.append('priority', formData.priority.toString());

    if (formData.image) {
      data.append('image', formData.image);
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://docker.mnogosushi.kg/api/v1/admin/category/', data, {
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при отправке данных');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values: Omit<FormData, 'image'> & { image: UploadFile[] }) => {
    const formattedValues = {
      ...values,
      priority: Number(values.priority),
      image: values.image?.[0]?.originFileObj || null,
    };
    postRequest(formattedValues);
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
      {data && <Alert message="Успех" description="Данные успешно отправлены!" type="success" showIcon />}

      <Form
        form={form}
        name="myForm"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          title: '',
          iiko_image: '',
          slug: '',
          external_id: '',
          priority: 0,
          image: null,
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
          name="iiko_image"
          label="Изображение iiko (URL)"
          rules={[{ required: true, message: 'Пожалуйста, введите URL изображения iiko!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="slug"
          label="Слаг"
          rules={[{ required: true, message: 'Пожалуйста, введите слаг!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="external_id"
          label="Внешний ID"
          rules={[{ required: true, message: 'Пожалуйста, введите внешний ID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Приоритет"
          rules={[{ required: true, message: 'Пожалуйста, введите приоритет!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Изображение (файл)"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
          rules={[{ required: true, message: 'Пожалуйста, загрузите изображение!' }]}
        >
          <Upload name="image" listType="picture" maxCount={1} beforeUpload={() => false}>
            <Button>Загрузить изображение</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
