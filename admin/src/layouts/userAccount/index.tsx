import { AppLayout } from '../app';
import {
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Image,
  Row,
  Spin,
  Tabs,
  TabsProps,
  Tag,
  theme,
  Typography,
} from 'antd';
import { Card } from '../../components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { USER_PROFILE_ITEMS } from '../../constants';
import { useStylesContext } from '../../context';

const { Link } = Typography;

import './styles.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchUserById } from '../../store/reducers/userReduser';

const TAB_ITEMS: TabsProps['items'] = USER_PROFILE_ITEMS.map((u) => ({
  key: u.path,
  label: u.title,
}));

export const UserAccountLayout = () => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const navigate = useNavigate();
  const stylesContext = useStylesContext();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(TAB_ITEMS[0].key);

  const dispatch = useAppDispatch();
  const { data, laoding } = useAppSelector((state) => state.user);

  useEffect(() => {
    const userId = Number(localStorage.getItem('user_id'));
    dispatch(fetchUserById({ id: userId }));
  }, [dispatch]);

  const onChange = (key: string) => {
    navigate(key);
  };

  useEffect(() => {
    const k = TAB_ITEMS.find((d) => location.pathname.includes(d.key))?.key || '';
    setActiveKey(k);
  }, [location]);

  const DESCRIPTION_ITEMS: DescriptionsProps['items'] = [
    {
      key: 'full-name',
      label: 'Имя',
      children: <span>{data.first_name} {data.last_name}</span>,
    },
    {
      key: 'job-title',
      label: 'Должность',
      children: <span>Software Engineer</span>,
    },
    {
      key: 'email',
      label: 'Email',
      children: (
        <Link href={`mailto:${data.email}`}>
          {data.email}
        </Link>
      ),
    },
    {
      key: 'telephone',
      label: 'Телефон',
      children: <Link href={`tel:${data.phone}`}>{data.phone}</Link>,
    },
    {
      key: 'date_joined',
      label: 'Дата регистрации',
      children: <Tag color='blue'>{laoding ? <Spin /> : data?.date_joined}</Tag>,
    },
  ];

  return (
    <>
      <AppLayout>
        <Card
          className="user-profile-card-nav card"
          actions={[
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    colorBorderSecondary: 'none',
                  },
                },
              }}
            >
              <Tabs
                defaultActiveKey={activeKey}
                activeKey={activeKey}
                items={TAB_ITEMS}
                onChange={onChange}
                style={{ textTransform: 'capitalize' }}
              />
            </ConfigProvider>,
          ]}
        >
          <Row {...stylesContext?.rowProps}>
            <Col xs={24} sm={8} lg={4}>
              <Image
                src={data?.profile_image}
                alt="user profile image"
                height="100%"
                width="100%"
                style={{ borderRadius }}
              />
            </Col>
            <Col xs={24} sm={16} lg={20}>
              <Descriptions
                title="Информация о пользователе"
                items={DESCRIPTION_ITEMS}
                column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
              />
            </Col>
          </Row>
        </Card>
        <div style={{ marginTop: '1.5rem' }}>
          <Outlet />
        </div>
      </AppLayout>
    </>
  );
};
