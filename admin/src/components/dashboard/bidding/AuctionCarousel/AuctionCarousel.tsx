import { ReactNode } from 'react';
import {
  Alert,
  Button,
  CardProps,
  Flex,
  message,
  Tag,
  theme,
  Typography,
} from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Bidding } from '../../../../types';
import { Card, Loader } from '../../../index.ts';

import './styles.css';
import { formatDateToRussian } from '../../../../utils/index.ts';

type CardItemProps = {
  item: any;
} & CardProps;

export const CardItem = ({ item, ...others }: CardItemProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();


  return (
    <article style={{ marginRight: 16 }}>
      <Card
        cover={
          <div
            className="auction-card-header"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(75, 75, 75, .8) 0%, rgba(72, 85, 99, 0) 50%), url(${item.iiko_image})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
            }}
          >
            <Flex
              justify="space-between"
              align="flex-start"
              style={{ margin: `0 1rem`, padding: `1rem 0` }}
            >
              <Tag
                color={
                  status === 'active' ? 'green-inverse' : 'volcano-inverse'
                }
                className="text-capitalize m-0"
              >
                {item.price}
              </Tag>
              <Tag
                icon={<ClockCircleOutlined />}
                color="magenta-inverse"
                className="m-0"
              >
                {formatDateToRussian(item.created)}
                {/* {String(new Date(item.created).getDate()).padStart(2, '0')} */}
              </Tag>
            </Flex>
          </div>
        }
        className="auction-card card"
        {...others}
      >
        <Flex vertical gap="middle" style={{ padding: '16px' }}>
          <Typography.Title level={5} className="text-capitalize m-0">
            {item.title.split(' ')[0]} {item.title.split(' ')[1]}
            {/* {item.category.slice(0, 4)}/ */}

          </Typography.Title>

          <div>
            <Typography.Text>
              {item.description}
            </Typography.Text>
            {/* <Typography.Text>c{item.price}</Typography.Text> */}
          </div>
          <Button
            block
            type="primary"
            // disabled={is_highest_bid_mine}
            onClick={() => message.success('You placed your bid')}
          >
          Смотреть
          </Button>
        </Flex>
      </Card>
    </article>
  );
};

type Props = {
  data: Bidding[];
  loading: boolean;
  error: ReactNode;
};

export const AuctionCarousel = ({ data, error, loading }: Props) => {


  return error ? (
    <Alert
      message="Error"
      description={error.toString()}
      type="error"
      showIcon
    />
  ) : loading ? (
    <Loader />
  ) : (
    <Flex wrap='wrap' gap={5}>

      {data.map((_) => (
        <div style={{ width: 'calc(25% - 5px)' }}>
          <CardItem key={_.auction_id} item={_} />
        </div>
      ))}</Flex>

  );
};
