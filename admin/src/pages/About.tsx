import { Flex, Row, Typography } from 'antd';
import { useStylesContext } from '../context';
import {
  HomeOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Card, PageHeader } from '../components';
import { DASHBOARD_ITEMS } from '../constants';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;


export const AboutPage = () => {
  const context = useStylesContext();

  return (
    <div>
      <Flex vertical gap="middle">
        <PageHeader
          title="About"
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
              title: 'about',
            },
          ]}
        />
        <Card>
          <Flex vertical gap="small">
            <Title level={3} className="m-0">
              Big Bee
            </Title>
            <Text>
              A dynamic and versatile multipurpose dashboard template built
              using React, Vite, Ant Design, and Storybook
            </Text>
          </Flex>
        </Card>

        <Row {...context?.rowProps}>

        </Row>
      </Flex>
    </div>
  );
};
