import { Alert, Button, Col, Flex, Pagination, Row, Segmented, Space, Spin } from 'antd';
import {
  Card,
  ClientsTable,
  Loader,
  PageHeader,

  ProjectsCard,

  RevenueCard,
} from '../../components';
import { Column } from '@ant-design/charts';
import { useEffect, useState } from 'react';
import {
  CloudUploadOutlined,
  HomeOutlined,
  PieChartOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';
import DynamicTable from '../../components/TestTable/TestTable';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchBiling } from '../../store/reducers/bilingReduser';


const PROJECT_TABS = [
  {
    key: 'all',
    label: 'Все',
  },
  // {
  //   key: 'inProgress',
  //   label: 'В оброботке',
  // },
  // {
  //   key: 'onHold',
  //   label: 'Доставлено',
  // },
];

export const ProjectsDashboardPage = () => {

  const {
    data: clientsData,
    error: clientsDataError,
    loading: clientsDataLoading,
  } = useFetchData('../mocks/Clients.json');
  const {
    data: mainData,
    error: mainError,
    loading: mainLoading,
  } = useFetchData('https://docker.mnogosushi.kg/api/v1/admin/index/');
  console.log(mainData, mainError, mainLoading, clientsData);

  const [projectTabsKey, setProjectsTabKey] = useState<string>('all');


  const dispatch = useAppDispatch();
  const { data, laoding } = useAppSelector((state) => state.biling);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const offset = (current - 1) * pageSize;
    dispatch(fetchBiling({ pagination: `?offset=${offset}&limit=${pageSize}` }))
      .then((response: any) => {
        if (response.payload) {
          setTotal(response.payload.count);  // Ensure this field exists in your response
        }
      })
      .catch((err) => {
        console.error('Failed to fetch categories:', err);
      });
  }, [dispatch, current, pageSize]);

  const onProjectsTabChange = (key: string) => {
    setProjectsTabKey(key);
  };
  const RevenueColumnChart = () => {
    const data = mainData?.revenue_by_day ? mainData?.revenue_by_day : []
    const config = {
      data,
      isGroup: true,
      xField: 'date',
      yField: 'revenue',
      seriesField: 'name',

      /** Set black and yellow alternating colors */
      color: ['#1a1a1a', '#F5C423', '#F5C423', '#1a1a1a'], // Black and yellow alternating colors

      /** Set column style with border radius */
      columnStyle: {
        radius: [5, 5, 0, 0], // Rounded top corners
      },

      /** Add space between grouped columns */
      marginRatio: 0.1, // Adjust the spacing between columns (higher value = more space)

      label: {
        // Label data label position can be manually configured
        position: 'middle',
        layout: [
          { type: 'interval-adjust-position' },
          { type: 'interval-hide-overlap' },
          { type: 'adjust-color' },
        ],
      },
    };
    // @ts-ignore
    return <Column {...config} />;
};


  return (
    <div>
      <Helmet>
        <title>Главная | BigBee Админ панель</title>
      </Helmet>
      <PageHeader
        title="BigBee Админ панель"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>Главная</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <PieChartOutlined />
                <span>Админ панель</span>
              </>
            ),
            menu: {
              items: DASHBOARD_ITEMS.map((d) => ({
                key: d.title,
                title: <Link to={d.path}>{d.title}</Link>,
              })),
            },
          },
          {
            title: 'Главная',
          },
        ]}
      />
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={12} lg={6}>
          <RevenueCard title="Посещаемость сайта
" value={mainLoading ? <Spin /> : mainData?.main_page_visits[mainData?.main_page_visits?.length - 1]?.visits_display} diff={280} />
        </Col>
        {/* <Col xs={24} sm={12} lg={6}>
          <RevenueCard title="Меню по QR
" value={mainLoading ? <Spin /> : mainData?.menu_visits[mainData?.menu_visits?.length - 1]?.visits_display} diff={180} />
        </Col> */}
        <Col xs={24} sm={12} lg={6}>
          <RevenueCard title="Меню по QR
" value={90} diff={180} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <RevenueCard title="Новые биллинги
" value={mainLoading ? <Spin /> : mainData?.new_billings?.length} diff={-10.0} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <RevenueCard title="Количество столов" value={mainLoading ? <Spin /> : mainData?.table_count} diff={-20.1} />
        </Col>

        <Col xs={24} sm={12} xl={16}>
          <Card
            title="Доход"
            extra={
              <Segmented
                options={['День', 'Неделю', 'Месяц', 'Сезон', 'Год']}
              />
            }
          >
            <RevenueColumnChart />
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={8}>
          <Card title="Большинство проданных товаров
">
            {clientsDataError ? (
              <Alert
                message="Error"
                description={clientsDataError.toString()}
                type="error"
                showIcon
              />
            ) : clientsDataLoading ? (
              <Loader />
            ) : (
              <ClientsTable data={mainData?.top_sold_products} />
            )}
          </Card>
        </Col>
        <Col span={24}>
          <Card
            title="Продажи"
            extra={
              <Space>
                <Button  type="primary" icon={<CloudUploadOutlined />}>Импорт</Button>
                <Button  type="primary" icon={<PlusOutlined />}>Новый Билинг</Button>
              </Space>
            }
            tabList={PROJECT_TABS}
            activeTabKey={projectTabsKey}
            onTabChange={onProjectsTabChange}
          >

            <DynamicTable data={laoding ? null : data.results} />
            <br />
            {laoding ? (
              <Spin />
            ) : (
              <Pagination
                current={current}
                pageSize={pageSize}
                total={total}
                onChange={(page, pageSize) => {
                  setCurrent(page);
                  setPageSize(pageSize);
                }}
                showSizeChanger
              />
            )}
          </Card>
        </Col>
        <Col span={24}>
          <Card
            title="Билинги"
            extra={<Button>Скоро</Button>}
          >
            {mainError ? (
              <Alert
                message="Error"
                description={mainError.toString()}
                type="error"
                showIcon
              />
            ) : mainLoading ? (
              <Loader />
            ) : (

              <Flex gap={16} wrap='wrap'>
                {mainData?.new_billings.slice(0, 4).map((o: any) => {
                  return (

                    <ProjectsCard

                      billing={o}
                    />

                  );
                })}</Flex>

            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
