import { Col, Pagination, Row, Spin } from 'antd';
import {
  CampaignsAdsCard,
  PageHeader
} from '../../components';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useEffect, useState } from 'react';
import { fetchReviews } from '../../store/reducers/reviewsReduser';

export const MarketingDashboardPage = () => {
  const stylesContext = useStylesContext();
  const dispatch = useAppDispatch();
  const { data, laoding, error } = useAppSelector((state) => state.reviews);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  function getRewue() {
    const offset = (current - 1) * pageSize;
    dispatch(fetchReviews({ pagination: `?offset=${offset}&limit=${pageSize}` }))
      .then((response: any) => {
        if (response.payload) {
          setTotal(response.payload.count);  // Убедитесь, что это поле существует в вашем ответе
        }
      })
      .catch((err) => {
        console.error('Не удалось загрузить категории:', err);
      });
  }
  useEffect(() => {
    getRewue()
  }, [dispatch, current, pageSize]);

  return (
    <div>
      <Helmet>
        <title>Маркетинг | Панель управления BigBee</title>
      </Helmet>
      <PageHeader
        title="Панель управления отзвами"
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
                <span>Панели управления</span>
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
            title: 'Отзывы',
          },
        ]}
      />
      <Row {...stylesContext?.rowProps}>
        <Col span={24}>
          <CampaignsAdsCard getRewue={getRewue} title={'Отзывы'} loading={laoding} error={error} data={data.results} />
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
