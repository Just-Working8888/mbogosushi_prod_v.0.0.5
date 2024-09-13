import {
  Button,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Row,
  theme,
  Typography,
} from 'antd';
import {
  FacebookFilled,
  GoogleOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Logo } from '../../components';
import { useMediaQuery } from 'react-responsive';
import { PATH_AUTH } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hook';
import { loginAsync } from '../../store/reducers/authRedusers';
import { setCookie } from '../../helpers/cookies';
import axios from 'axios';

const { Title, Text, Link } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

export const SignInPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 })
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await dispatch(loginAsync({ username: values.username, password: values.password }));
      if (response.payload.access) {
        message.success('Вход выполнен успешно');
        navigate('/dashboards/main')
      }
      console.log(response);

      setCookie('access_token', response.payload.access, 30);
      localStorage.setItem('user_id', response.payload.user_id);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data.message || 'Ошибка авторизации.');
      } else {
        console.log('Ошибка соединения с сервером.');
      }
      message.error('Ошибка входа. Пожалуйста, проверьте свои данные.');
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Ошибка:', errorInfo);
  };

  return (
    <Row style={{ minHeight: isMobile ? 'auto' : '100vh', overflow: 'hidden' }}>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align="center"
          justify="center"
          className="text-center"
          style={{ background: colorPrimary, height: '100%', padding: '1rem' }}
        >
          <Logo color="white" />
          <Title level={2} className="text-white">
            Добро пожаловать обратно в администратор BigBee
          </Title>
          <Text className="text-white" style={{ fontSize: 18 }}>
            Динамичная и универсальная многофункциональная панель управления, использующая Ant Design, React, TypeScript и Vite.
          </Text>
        </Flex>
      </Col>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align={isMobile ? 'center' : 'flex-start'}
          justify="center"
          gap="middle"
          style={{ height: '100%', padding: '2rem' }}
        >
          <Title className="m-0">Войти</Title>
          <Flex gap={4}>
            <Text>У вас нет учетной записи?</Text>
            <Link href={PATH_AUTH.signup}>Создайте учетную запись здесь</Link>
          </Flex>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{
              email: 'demo@email.com',
              password: 'demo123',
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Имя пользователя"
                  name="username"
                  rules={[
                    { required: true, message: 'Пожалуйста, введите имя пользователя' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Пароль"
                  name="password"
                  rules={[
                    { required: true, message: 'Пожалуйста, введите пароль!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType> name="remember" valuePropName="checked">
                  <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Flex align="center" justify="space-between">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Продолжить
                </Button>
                <Link href={PATH_AUTH.passwordReset}>Забыли пароль?</Link>
              </Flex>
            </Form.Item>
          </Form>
          <Divider className="m-0">или</Divider>
          <Flex
            vertical={isMobile}
            gap="small"
            wrap="wrap"
            style={{ width: '100%' }}
          >
            <Button icon={<GoogleOutlined />}>Войти через Google</Button>
            <Button icon={<FacebookFilled />}>Войти через Facebook</Button>
            <Button icon={<TwitterOutlined />}>Войти через Twitter</Button>
          </Flex>
        </Flex>
      </Col>
    </Row>
  );
};
