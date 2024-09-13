import {
  Button,
  Col,
  Flex,
  Row,
  RowProps,
  Select,
  Typography,
} from 'antd';
import {
  PageHeader,
  ProductForm
} from '../../components';
import {
  HomeOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CardItem } from '../../components/dashboard/bidding/AuctionCarousel/AuctionCarousel';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCategories } from '../../store/reducers/Categories';
import { fetchProduct } from '../../store/reducers/productReduser';
import { formatParams } from '../../helpers/convertProps';
import { setCategory, setOffcet } from '../../store/slices/windowSlice';
import { clearData } from '../../store/slices/productSlice';

const ROW_PROPS: RowProps = {
  gutter: [
    { xs: 8, sm: 16, md: 24, lg: 32 },
    { xs: 8, sm: 16, md: 24, lg: 32 },
  ],
};

export const BiddingDashboardPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.categories);
  const { menuprops } = useAppSelector((state) => state.window);

  useEffect(() => {
    dispatch(fetchCategories({ pagination: '?limit=40' }));
    dispatch(fetchProduct({ filters: formatParams({ menuprops }) }));
  }, [menuprops]);

  const products = useAppSelector((state) => state.product.data.results);
  const hasNext = useAppSelector((state) => state.product.data.next);

  function next() {
    dispatch(setOffcet(menuprops.offset + 20));
  }

  const onChangeCategory = (id: string) => {
    dispatch(setOffcet(1));
    dispatch(clearData());
    dispatch(setCategory(Number(id)));
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Торги | Панель управления Antd</title>
        </Helmet>
        <PageHeader
          title="Панель управления торгами"
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
              title: 'Торги',
            },
          ]}
        />
        <Row {...ROW_PROPS}>
          <Col span={24}>
            <Flex align="center" justify="space-between">
              <Typography.Title level={4}>Товары</Typography.Title>
              <Button onClick={showModal}>Добавить товар</Button>
              <Select
                defaultValue="Популярные"
                size="large"
                style={{ width: 220 }}
                onChange={(e) => onChangeCategory(e)}
                options={data.results.map((item) => {
                  return { value: item.id, label: item.title };
                })}
              />
            </Flex>
            <InfiniteScroll
              dataLength={products.length}
              next={next}
              hasMore={hasNext as any}
              loader={<h4>Загрузка...</h4>}
              endMessage={<p style={{ textAlign: 'center' }}>
                <b>Вы видели всё</b>
              </p>}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}
            >
              {products.map((_, index) => (
                <div key={index} style={{ width: 'calc(25% - 5px)' }}>
                  <Link to={`/dashboards/product/${_.id}`}>
                    <CardItem key={index} item={_} />
                  </Link>
                </div>
              ))}
            </InfiniteScroll>
          </Col>
        </Row>
      </div>
      <ProductForm visible={isModalVisible} onClose={handleClose} />
    </>
  );
};
