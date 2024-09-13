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
import { PATH_AUTH, PATH_DASHBOARD } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const { Title, Text, Link } = Typography;

type FieldType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  cPassword?: string;
  terms?: boolean;
};

export const SignUpPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    console.log('Успех:', values);
    setLoading(true);

    message.open({
      type: 'success',
      content: 'Регистрация аккаунта успешна',
    });

    setTimeout(() => {
      navigate(PATH_DASHBOARD.default);
    }, 5000);
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
            Добро пожаловать в Antd Admin
          </Title>
          <Text className="text-white" style={{ fontSize: 18 }}>
            Динамичная и универсальная многофункциональная панель управления, использующая Ant Design,
            React, TypeScript и Vite.
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
          <Title className="m-0">Создать аккаунт</Title>
          <Flex gap={4}>
            <Text>Уже есть аккаунт?</Text>
            <Link href={PATH_AUTH.signin}>Войти здесь</Link>
          </Flex>
          <Flex
            vertical={isMobile}
            gap="small"
            wrap="wrap"
            style={{ width: '100%' }}
          >
            <Button icon={<GoogleOutlined />}>Зарегистрироваться через Google</Button>
            <Button icon={<FacebookFilled />}>Зарегистрироваться через Facebook</Button>
            <Button icon={<TwitterOutlined />}>Зарегистрироваться через Twitter</Button>
          </Flex>
          <Divider className="m-0">или</Divider>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24} lg={12}>
                <Form.Item<FieldType>
                  label="Имя"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: 'Пожалуйста, введите ваше имя!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item<FieldType>
                  label="Фамилия"
                  name="lastName"
                  rules={[
                    { required: true, message: 'Пожалуйста, введите вашу фамилию!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Электронная почта"
                  name="email"
                  rules={[
                    { required: true, message: 'Пожалуйста, введите вашу электронную почту' },
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
                    { required: true, message: 'Пожалуйста, введите ваш пароль!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Подтвердите пароль"
                  name="cPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Пожалуйста, убедитесь, что пароли совпадают!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType> name="terms" valuePropName="checked">
                  <Flex>
                    <Checkbox>Я согласен с</Checkbox>
                    <Link>условиями и положениями</Link>
                  </Flex>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="middle"
                loading={loading}
              >
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
};
