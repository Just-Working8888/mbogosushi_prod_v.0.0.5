import {
    Alert,
    Button,
    ButtonProps,
    Col,
    Flex,
    Popover,
    Progress,
    Row,
    Space,
    Table,
    Tag,
    Typography,
} from 'antd';
import {
    Card,
    PageHeader,
    UserAvatar,
} from '../../components';
import { Area } from '@ant-design/charts';
import {
    ArrowUpOutlined,
    HomeOutlined,
    PieChartOutlined,
    QuestionOutlined,
} from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { CSSProperties, useState } from 'react';
import { useFetchData } from '../../hooks';
import { blue, green, red, yellow } from '@ant-design/colors';
import CountUp from 'react-countup';
import { numberWithCommas } from '../../utils';

const { Title } = Typography;

const SalesChart = () => {
    const data = [
        {
            country: 'Online Store',
            date: 'Jan',
            value: 1390.5,
        },
        {
            country: 'Online Store',
            date: 'Feb',
            value: 1469.5,
        },
        {
            country: 'Online Store',
            date: 'Mar',
            value: 1521.7,
        },
        {
            country: 'Online Store',
            date: 'Apr',
            value: 1615.9,
        },
        {
            country: 'Online Store',
            date: 'May',
            value: 1703.7,
        },
        {
            country: 'Online Store',
            date: 'Jun',
            value: 1767.8,
        },
        {
            country: 'Online Store',
            date: 'Jul',
            value: 1806.2,
        },
        {
            country: 'Online Store',
            date: 'Aug',
            value: 1903.5,
        },
        {
            country: 'Online Store',
            date: 'Sept',
            value: 1986.6,
        },
        {
            country: 'Online Store',
            date: 'Oct',
            value: 1952,
        },
        {
            country: 'Online Store',
            date: 'Nov',
            value: 1910.4,
        },
        {
            country: 'Online Store',
            date: 'Dec',
            value: 2015.8,
        },
        {
            country: 'Facebook',
            date: 'Jan',
            value: 109.2,
        },
        {
            country: 'Facebook',
            date: 'Feb',
            value: 115.7,
        },
        {
            country: 'Facebook',
            date: 'Mar',
            value: 120.5,
        },
        {
            country: 'Facebook',
            date: 'Apr',
            value: 128,
        },
        {
            country: 'Facebook',
            date: 'May',
            value: 134.4,
        },
        {
            country: 'Facebook',
            date: 'Jun',
            value: 142.2,
        },
        {
            country: 'Facebook',
            date: 'Jul',
            value: 157.5,
        },
        {
            country: 'Facebook',
            date: 'Aug',
            value: 169.5,
        },
        {
            country: 'Facebook',
            date: 'Sept',
            value: 186.3,
        },
        {
            country: 'Facebook',
            date: 'Oct',
            value: 195.5,
        },
        {
            country: 'Facebook',
            date: 'Nov',
            value: 198,
        },
        {
            country: 'Facebook',
            date: 'Dec',
            value: 211.7,
        },
    ];

    const config = {
        data,
        xField: 'date',
        yField: 'value',
        seriesField: 'country',
        slider: {
            start: 0.1,
            end: 0.9,
        },
    };

    return <Area {...config} />;
};

const SELLER_COLUMNS = [
    {
        title: 'Name',
        dataIndex: 'first_name',
        key: 'first_name',
        render: (_: any, { first_name, last_name }: any) => (
            <UserAvatar fullName={`${first_name} ${last_name}`} />
        ),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (_: any) => <Link to={`mailto:${_}`}>{_}</Link>,
    },
    {
        title: 'Region',
        dataIndex: 'sales_region',
        key: 'sales_region',
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Volume',
        dataIndex: 'sales_volume',
        key: 'sales_volume',
        render: (_: any) => <span>{numberWithCommas(Number(_))}</span>,
    },
    {
        title: 'Amount',
        dataIndex: 'total_sales',
        key: 'total_sales',
        render: (_: any) => <span>${numberWithCommas(Number(_))}</span>,
    },
    {
        title: 'Satisfaction rate',
        dataIndex: 'customer_satisfaction',
        key: 'customer_satisfaction',
        render: (_: any) => {
            let color;

            if (_ < 20) {
                color = red[5];
            } else if (_ > 21 && _ < 50) {
                color = yellow[6];
            } else if (_ > 51 && _ < 70) {
                color = blue[5];
            } else {
                color = green[6];
            }

            return <Progress percent={_} strokeColor={color} />;
        },
    },
];

const POPOVER_BUTTON_PROPS: ButtonProps = {
    type: 'text',
};

const cardStyles: CSSProperties = {
    height: '100%',
};

export const TusksDashboardPage = () => {
    const stylesContext = useStylesContext();

    const {
        data: topSellers,
        error: topSellersError,
        loading: topSellersLoading,
    } = useFetchData('../mocks/TopSeller.json');


    const [state, setState] = useState(false)
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
                        title: '',
                    },
                ]}
            />
            <Row {...stylesContext?.rowProps}>

                <Col span={24}>
                    <Card
                        title="Общий объем продаж"
                        extra={
                            <>
                                <Button onClick={() => setState(!state)}>{!state ? "Открыть" : 'Закрыть'}</Button>
                                <Popover content="Total sales over period x" title="Total sales">
                                    <Button icon={<QuestionOutlined />} {...POPOVER_BUTTON_PROPS} />

                                </Popover></>
                        }
                        style={cardStyles}
                    >
                        {state && <Flex vertical gap="middle">
                            <Space>
                                <Title level={3} style={{ margin: 0 }}>
                                    $ <CountUp end={24485.67} />
                                </Title>
                                <Tag color="green-inverse" icon={<ArrowUpOutlined />}>
                                    8.7%
                                </Tag>
                            </Space>
                            <SalesChart />
                        </Flex>}

                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Top sellers">
                        {topSellersError ? (
                            <Alert
                                message="Error"
                                description={topSellersError.toString()}
                                type="error"
                                showIcon
                            />
                        ) : (
                            <Table
                                columns={SELLER_COLUMNS}
                                dataSource={topSellers}
                                loading={topSellersLoading}
                                className="overflow-scroll"
                            />
                        )}
                    </Card>
                </Col>
         
            </Row>

        </div>
    );
};

