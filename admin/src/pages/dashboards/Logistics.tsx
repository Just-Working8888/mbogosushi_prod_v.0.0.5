import { Col, Row } from 'antd';
import {
  DeliveryTableCard,
  PageHeader
} from '../../components';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { useFetchData } from '../../hooks';

export const LogisticsDashboardPage = () => {
  const stylesContext = useStylesContext();
  const {
    data: mainData,
    error: mainError,
    loading: mainLoading,
  } = useFetchData('https://docker.mnogosushi.kg/api/v1/tables/table/');


  


  return (
    <div>
      <Helmet>
        <title>Столы | BigBee Dashboard</title>
      </Helmet>
      <PageHeader
        title="Столы"
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
                <span>админ панель</span>
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
            title: 'столы',
          },
        ]}
      />
      <Row {...stylesContext?.rowProps}>
        <Col span={24}>
          <DeliveryTableCard loading={mainLoading} error={mainError} data={mainData.results} />
        </Col>
      </Row>
    </div>
  );
};






