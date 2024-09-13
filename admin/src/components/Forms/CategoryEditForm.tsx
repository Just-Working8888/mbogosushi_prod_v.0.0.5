import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Alert } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { getCookie } from '../../helpers/cookies';
import axios from 'axios';

interface FormData {
  title: string;
  iiko_image: string;
  slug: string;
  external_id: string;
  priority: number;
//   image: File | null;
}

interface EditCategoryFormProps {
  visible: boolean;
  onClose: () => void;
  categoryId: number;
}

export const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ visible, onClose, categoryId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (visible) {
      fetchCategoryData();
    }
  }, [visible]);

  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://docker.mnogosushi.kg/api/v1/admin/category/${categoryId}/`, {
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`
        }
      });

      const categoryData = response.data;
      setData(categoryData);
      form.setFieldsValue({
        title: categoryData.title,
        iiko_image: categoryData.iiko_image,
        slug: categoryData.slug,
        external_id: categoryData.external_id,
        priority: categoryData.priority,
        image: categoryData.image ? [{ url: categoryData.image }] : []
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  const putRequest = async (formData: FormData) => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('iiko_image', formData.iiko_image);
    data.append('slug', formData.slug);
    data.append('external_id', formData.external_id);
    data.append('priority', formData.priority.toString());

    // if (formData.image) {
    //   data.append('image', formData.image);
    // }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`https://docker.mnogosushi.kg/api/v1/admin/category/${categoryId}/`, data, {
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при сохранении данных');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values: Omit<FormData, 'image'> & { image: UploadFile[] }) => {
    const formattedValues = {
      ...values,
      priority: Number(values.priority),
    //   image: values.image?.[0]?.originFileObj || null,
    };
    putRequest(formattedValues);
  };

  return (
    <Modal
      title="Редактировать категорию"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
          Сохранить
        </Button>,
      ]}
    >
      {error && <Alert message="Ошибка" description={error} type="error" showIcon />}
      {data && <Alert message="Успех" description="Данные успешно сохранены!" type="success" showIcon />}

      <Form
        form={form}
        name="editCategoryForm"
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

        {/* <Form.Item
          name="image"
          label="Изображение (файл)"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
        >
          <Upload name="image" listType="picture" maxCount={1} beforeUpload={() => false}>
            <Button>Загрузить изображение</Button>
          </Upload>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};
