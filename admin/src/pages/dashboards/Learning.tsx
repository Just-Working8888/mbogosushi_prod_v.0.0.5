import { Card, Collapse, Flex, Spin } from 'antd';
import {
  HomeOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import {
  PageHeader
} from '../../components';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';
import QAFormModal from '../../components/CreateFAQForm/CreateFaqForm';
const { Panel } = Collapse;
export const LearningDashboardPage = () => {
  const {
    data: mainData,
    error: mainError,
    loading: mainLoading,
  } = useFetchData('https://docker.mnogosushi.kg/api/v1/admin/faq/');
  console.log(mainData, mainError, mainLoading);

  return (
    <div>
      <Helmet>
        <title>Big bee | Админ</title>
      </Helmet>
      <PageHeader
        title="learning dashboard"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <PieChartOutlined />
                <span>dashboards</span>
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
            title: 'faq',
          },
        ]}
      />
      <Card extra={<Flex> <QAFormModal /></Flex>}>
        {
          mainLoading ? <Spin /> : <Collapse accordion>
            {mainData?.results?.map((item: any) => (
              <Panel header={item.question} key={item.id}>
                <p>{item.answer}</p>
              </Panel>
            ))}
          </Collapse>
        }
      </Card>


    </div>
  );
};
