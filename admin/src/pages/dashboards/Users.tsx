import {
    Alert,
    Button,
    ButtonProps,
    Col,
    Flex,
    message,
    Pagination,
    Popover,
    Row,
    Space,
    Spin,
    Tag,
    Typography,
} from 'antd';
import {
    Card,
    PageHeader
} from '../../components';
import { Area } from '@ant-design/charts';
import {
    ArrowUpOutlined,
    HomeOutlined,
    PieChartOutlined,
    QuestionOutlined
} from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { CSSProperties, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import DynamicTable from '../../components/TestTable/TestTable';
import ExportExcel from '../../components/ImportTable/ImportTable';
import UserFormModal from '../../components/CreateUSerForm/CreateUserForm';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchUsers } from '../../store/reducers/userReduser';
// import { api } from '../../api';

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



const POPOVER_BUTTON_PROPS: ButtonProps = {
    type: 'text',
};

const cardStyles: CSSProperties = {
    height: '100%',
};

export const UsersDashboardPage = () => {
    const stylesContext = useStylesContext();
    const dispatch = useAppDispatch()
    const [total, setTotal] = useState(0);
    console.log(setTotal);
    
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { users: mainData,
        error: mainError,
        laoding: mainLoading } = useAppSelector((state) => state.user)
    useEffect(() => {
        const offset = (current - 1) * pageSize;
        dispatch(fetchUsers({ pagination: `?offset=${offset}&limit=${pageSize}` }))
    }, [])
    // function getRewue() {
    //     const offset = (current - 1) * pageSize;
    //     dispatch(fetchUsers({ pagination: `?offset=${offset}&limit=${pageSize}` }))

    // }
    // function handleDelete() {

    //     selectedItems.forEach((item: any) => {
    //         try {
    //             api.deleteUserById(item.id).then(() => {
    //                 message.success('выбранные элементы удалены')
    //             }).then(() => {
    //                 getRewue()
    //             })
    //         } catch (error) {
    //             message.error('Ошибка при удалении ')
    //         }
    //     })
    // }



    const [state, setState] = useState(false)
    const [selectedItems, setSelectItems] = useState([])
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
                        title: 'Билинги',
                    },
                ]}
            />
            <Row {...stylesContext?.rowProps}>

                <Col span={24}>
                    <Card
                        extra={<>
                            <Button onClick={() => setState(!state)}>{!state ? "Открыть" : 'Закрыть'}</Button>
                            <Popover content="Total sales over period x" title="Total sales">
                                <Button icon={<QuestionOutlined />} {...POPOVER_BUTTON_PROPS} />

                            </Popover></>}
                        title="Общий объем продаж"

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
                {/* <TestParceExel /> */}

                <Col span={24}>
                    <Card title="Пользователи" extra={<Space><UserFormModal /><Button disabled={selectedItems.length > 0 ? false : true} danger onClick={() => message.success('элемент удален')}>удалить</Button><ExportExcel data={selectedItems} />  </Space>} >
                        {mainError ? (
                            <Alert
                                message="Error"
                                description={mainError.toString()}
                                type="error"
                                showIcon
                            />
                        ) : (
                            <>
                                {
                                    mainLoading ? <Spin /> : <DynamicTable setState={setSelectItems} state={selectedItems} data={mainData?.results} />
                                }
                            </>
                        )}
                        <br />
                        {mainLoading ? (
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
            </Row>
        </div >
    );
};

