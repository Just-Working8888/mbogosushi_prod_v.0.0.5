import React, { useEffect, useRef, useState } from 'react';
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from 'antd';
import {
  BarChartOutlined,
  ExportOutlined,
  FilterOutlined,
  FormOutlined,
  FundViewOutlined,
  GoldOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  SettingOutlined,
  ShopOutlined,
  SnippetsOutlined,
  TagOutlined,
  UsergroupDeleteOutlined,
  UserOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Logo } from '../../components';
import { Link, useLocation } from 'react-router-dom';
import {

  PATH_DASHBOARD,
  PATH_LANDING,
  PATH_USER_PROFILE,
} from '../../constants';
import { COLOR } from '../../App.tsx';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group' | undefined,
  disabled?: boolean
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
    disabled,
  } as MenuItem;
};

const items: MenuProps['items'] = [
  getItem('Админ панель', 'dashboards', <PieChartOutlined />, [
    getItem(
      <Link to={PATH_DASHBOARD.projects}>Главная</Link>,
      'main',
      <RocketOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.ecommerce}>Биллинги</Link>,
      'biling',
      <FormOutlined />
    ),
    getItem(<Link to={PATH_DASHBOARD.default}>Категории</Link>, 'category', <TagOutlined />),
    getItem(<Link to={PATH_DASHBOARD.bidding}>Товары</Link>, 'products', <GoldOutlined />),
    getItem(
      <Link to={PATH_DASHBOARD.marketing}>Отзывы</Link>,
      'revues',
      <WechatOutlined />
    ),
    getItem(<Link to={PATH_DASHBOARD.social}>Промо коды</Link>, 'promo', <SettingOutlined />),
    getItem(
      <Link to={PATH_DASHBOARD.learning}>Вопросы - ответы (FAQ)</Link>,
      'faq',
      <FilterOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.logistics}>Столы (QR меню)</Link>,
      'tables',
      <ExportOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.users}>Пользователи</Link>,
      'users',
      <UsergroupDeleteOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.telegramusers}>Телеграм Пользователи</Link>,
      'telegramusers',
      <QuestionCircleOutlined />
    ),

    getItem(
      <Link to={PATH_DASHBOARD.map}>Карта</Link>,
      'map',
      <FundViewOutlined />
    ),
  ]),


  getItem('Профиль', 'user-profile', <UserOutlined />, [
    getItem(
      <Link to={PATH_USER_PROFILE.details}>Детали</Link>,
      'details',
      null,
      undefined,
      undefined,
      false // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.preferences}>Предпочтения</Link>,
      'preferences',
      null,
      undefined,
      undefined,
      false // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.personalInformation}>Информация</Link>,
      'information',
      null,
      undefined,
      undefined,
      false // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.security}>Безопасность</Link>,
      'security',
      null,
      undefined,
      undefined,
      false // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.activity}>Активность</Link>,
      'activity',
      null,
      undefined,
      undefined,
      false // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.action}>Действия</Link>,
      'actions',
      null,
      undefined,
      undefined,
      false // Добавляем disabled здесь
    ),
    getItem(<Link to={PATH_USER_PROFILE.help}>Помощь</Link>, 'help', null, undefined, undefined, false), // Добавляем disabled здесь
    getItem(
      <Link to={PATH_USER_PROFILE.feedback}>Обратная связь</Link>,
      'feedback',
      null,
      undefined,
      undefined,
      false // Добавляем disabled здесь
    ),
  ], undefined, false),
  getItem('Контен сайта', 'content', <ShopOutlined />, [
    getItem(
      <Link to={'/content/mainpage'}>О нас</Link>,
      'mainpage',
      null,
      undefined,
      undefined,
      false // Добавляем disabled здесь
    ),
    getItem(
      <Link to={'/content/edit'}>Редактировать сайт</Link>,
      'edit',
      null,
      undefined,
      undefined,
      false // Добавляем disabled здесь
    ),

  ]),

  getItem('скоро', 'pages', null, [], 'group'),
  getItem('Задачи', 'user-profile', <BarChartOutlined />, [], undefined, true),

  // getItem('Ежедневные операции в магазине', 'operations', null, [], 'group'),
  getItem('Ежедневные операции в магазине', 'operations', <SnippetsOutlined />, [
    getItem(
      <Link to={PATH_USER_PROFILE.details}>Детали</Link>,
      'details',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.preferences}>Предпочтения</Link>,
      'preferences',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.personalInformation}>Информация</Link>,
      'personal-information',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.security}>Безопасность</Link>,
      'security',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.activity}>Активность</Link>,
      'activity',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.action}>Действия</Link>,
      'actions',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(<Link to={PATH_USER_PROFILE.help}>Помощь</Link>, 'help', null, undefined, undefined, true), // Добавляем disabled здесь
    getItem(
      <Link to={PATH_USER_PROFILE.feedback}>Обратная связь</Link>,
      'feedback',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
  ], undefined, true),

  getItem('Настройки и обслуживание системы', 'operations', <SettingOutlined />, [
    getItem(
      <Link to={PATH_USER_PROFILE.details}>Детали</Link>,
      'details',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.preferences}>Предпочтения</Link>,
      'preferences',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.personalInformation}>Информация</Link>,
      'personal-information',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.security}>Безопасность</Link>,
      'security',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.activity}>Активность</Link>,
      'activity',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.action}>Действия</Link>,
      'actions',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(<Link to={PATH_USER_PROFILE.help}>Помощь</Link>, 'help', null, undefined, undefined, true), // Добавляем disabled здесь
    getItem(
      <Link to={PATH_USER_PROFILE.feedback}>Обратная связь</Link>,
      'feedback',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
  ], undefined, true),
  getItem(' Поддержка', 'operations', <QuestionCircleOutlined />, [
    getItem(
      <Link to={PATH_USER_PROFILE.details}>Детали</Link>,
      'details',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.preferences}>Предпочтения</Link>,
      'preferences',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.personalInformation}>Информация</Link>,
      'personal-information',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.security}>Безопасность</Link>,
      'security',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.activity}>Активность</Link>,
      'activity',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.action}>Действия</Link>,
      'actions',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
    getItem(<Link to={PATH_USER_PROFILE.help}>Помощь</Link>, 'help', null, undefined, undefined, true), // Добавляем disabled здесь
    getItem(
      <Link to={PATH_USER_PROFILE.feedback}>Обратная связь</Link>,
      'feedback',
      null,
      undefined,
      undefined,
      true // Добавляем disabled здесь
    ),
  ], undefined, true),

];

const rootSubmenuKeys = ['dashboards', 'corporate', 'user-profile'];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState(['']);
  const [current, setCurrent] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split('/');
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Logo
        color="black"
        asLink
        href={PATH_LANDING.root}
        justify="center"
        gap="small"
        imgSize={{ h: 28, w: 28 }}
        style={{ padding: '1rem 0' }}
      />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: 'none',
              itemSelectedBg: COLOR['100'],
              itemHoverBg: COLOR['50'],
              itemSelectedColor: COLOR['600'],
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={items}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={{ border: 'none' }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
