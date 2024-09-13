import { Col, Pagination, Row, Spin } from 'antd';
import {
  PageHeader
} from '../../components';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useEffect, useState } from 'react';
import { fetchPromoCode } from '../../store/reducers/promoCode';
import { TableForPromo } from '../../components/dashboard/marketing/CampaignsAdsCard/TableForPromo';

export const SocialDashboardPage = () => {
  const stylesContext = useStylesContext();

  const dispatch = useAppDispatch();
  const { data, laoding, error } = useAppSelector((state) => state.promo);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  function getPromos() {
    const offset = (current - 1) * pageSize;
    dispatch(fetchPromoCode({ pagination: `?offset=${offset}&limit=${pageSize}` }))
      .then((response: any) => {
        if (response.payload) {
          setTotal(response.payload.count);  // Ensure this field exists in your response
        }
      })
      .catch((err) => {
        console.error('Failed to fetch categories:', err);
      });
  }
  useEffect(() => {
    getPromos()
  }, [dispatch, current, pageSize]);
  return (
    <div>
      <Helmet>
        <title>Marketing | Antd Dashboard</title>
      </Helmet>
      <PageHeader
        title="marketing dashboard"
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
            title: 'промо коды',
          },
        ]}
      />
      <Row {...stylesContext?.rowProps}>
        <Col span={24}>
          <TableForPromo getPromo={getPromos} title={'Промо коды'} loading={laoding} error={error} data={data.results} />
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
        </Col>
      </Row>
    </div>
  );
};



