import { Button, Col, Form, Input, message, Radio, Row, Select, Spin } from 'antd';
import { Card } from '../../components';
import { SaveOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useEffect } from 'react';
import { fetchUserById, updateUser } from '../../store/reducers/userReduser';

type FieldType = {
  id: number;
  username?: string;
  password?: string;
  last_login?: string;
  is_superuser?: boolean;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_staff?: boolean;
  is_active?: boolean;
  date_joined?: string;
  phone?: string;
  groups?: any[];
  user_permissions?: any[];
};

export const UserProfileDetailsPage = () => {
  const { data, laoding } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserById({ id: Number(localStorage.getItem('user_id')) }));
  }, [dispatch]);

  const onFinish = (values: any) => {
    dispatch(updateUser({ id: Number(localStorage.getItem('user_id')), data: values })).then(() => {
      dispatch(fetchUserById({ id: Number(localStorage.getItem('user_id')) }));
    })

  };

  const onFinishFailed = (errorInfo: any) => {
    message.error('Failed:', errorInfo);
  };

  return (
    <Card>
      {laoding ? (
        <Spin />
      ) : (
        <Form
          name="user-profile-details-form"
          layout="vertical"
          initialValues={{
            id: data.id,
            password: data.password,
            last_login: data.last_login,
            is_superuser: data.is_superuser,
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            is_staff: data.is_staff,
            is_active: data.is_active,
            date_joined: data.date_joined,
            phone: data.phone,
            groups: data.groups,
            user_permissions: data.user_permissions,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          requiredMark={false}
        >
          <Row gutter={[16, 0]}>
            <Col sm={24} lg={24}>
              <Form.Item<FieldType>
                label="ID пользователя"
                name="id"
                rules={[{ required: true, message: 'Пожалуйста, введите ваш ID!' }]}
              >
                <Input readOnly={true} />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Имя"
                name="first_name"
                rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Фамилия"
                name="last_name"
                rules={[{ required: true, message: 'Пожалуйста, введите вашу фамилию!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Пожалуйста, введите ваш email!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Имя пользователя"
                name="username"
                rules={[{ required: true, message: 'Пожалуйста, введите ваше имя пользователя!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Последний вход"
                name="last_login"
              >
                <Input readOnly={true} />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Статус суперпользователя"
                name="is_superuser"
              >
                <Radio.Group>
                  <Radio value={true}>Да</Radio>
                  <Radio value={false}>Нет</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Статус сотрудника"
                name="is_staff"
              >
                <Radio.Group>
                  <Radio value={true}>Да</Radio>
                  <Radio value={false}>Нет</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Дата регистрации"
                name="date_joined"
              >
                <Input readOnly={true} />
              </Form.Item>
            </Col>

            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Телефон"
                name="phone"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Группы"
                name="groups"
              >
                <Select mode="tags" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item<FieldType>
                label="Пользовательские разрешения"
                name="user_permissions"
              >
                <Select mode="tags" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<FieldType>
                label="Статус активности"
                name="is_active"
                rules={[{ required: true, message: 'Пожалуйста, выберите ваш статус!' }]}
              >
                <Radio.Group>
                  <Radio value={true}>Активен</Radio>
                  <Radio value={false}>Неактивен</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Сохранить изменения
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};
