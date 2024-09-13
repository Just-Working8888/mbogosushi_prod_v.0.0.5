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
  Select,
  Space,
  Spin,
  Tag,
  Typography,
} from 'antd';
import {
  Card,
  CategoryForm,
  PageHeader,
} from '../../components';
import { Area } from '@ant-design/charts';
import {
  ArrowUpOutlined,
  HomeOutlined,
  PieChartOutlined,
  QuestionOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { CSSProperties, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import DynamicTable from '../../components/TestTable/TestTable';
import ExportExcel from '../../components/ImportTable/ImportTable';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCategories } from '../../store/reducers/Categories';
import { api } from '../../api';
import { EditCategoryForm } from '../../components/Forms/CategoryEditForm';

const { Title } = Typography;




const POPOVER_BUTTON_PROPS: ButtonProps = {
  type: 'text',
};

const cardStyles: CSSProperties = {
  height: '100%',
};

export const DefaultDashboardPage = () => {
  const stylesContext = useStylesContext();
  const dispatch = useAppDispatch();
  const { data, error, laoding } = useAppSelector((state) => state.categories);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const offset = (current - 1) * pageSize;
    dispatch(fetchCategories({ pagination: `?offset=${offset}&limit=${pageSize}` }))
      .then((response: any) => {
        if (response.payload) {
          setTotal(response.payload.count);  // Ensure this field exists in your response
        }
      })
      .catch((err) => {
        console.error('Failed to fetch categories:', err);
      });
  }, [dispatch, current, pageSize]);

  const [state, setState] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };
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

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };


  function handleDelete() {
    const offset = (current - 1) * pageSize;
    selectedItems.forEach((item: any) => {
      try {
        api.deleteCategoryById(item.id).then(() => {
          message.success('выбранные элементы удалены')
        }).then(() => {
          dispatch(fetchCategories({ pagination: `?offset=${offset}&limit=${pageSize}` }))
            .then((response: any) => {
              if (response.payload) {
                setTotal(response.payload.count);  // Ensure this field exists in your response
              }
            })
            .catch((err) => {
              console.error('Failed to fetch categories:', err);
            });
        }).then(() => {
          setSelectedItems([])
        })


      } catch (error) {
        message.error('Ошибка при удалении ')
      }
    })
  }


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [changedItemId, setChanchedItemId] = useState(0);
  function setItemCategory(id: string) {
    setChanchedItemId(+id)
    setIsModalVisible(true)

  }
  return (
    <>
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
              title: 'Категории',
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
                  </Popover>
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="label"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                      {
                        value: 'jack',
                        label: 'Jack',
                      },
                      {
                        value: 'lucy',
                        label: 'Lucy',
                      },
                      {
                        value: 'tom',
                        label: 'Tom',
                      },
                    ]}
                  />
                </>
              }
              style={cardStyles}
            >
              {state && (
                <Flex vertical gap="middle">
                  <Space>
                    <Title level={3} style={{ margin: 0 }}>
                      $ <CountUp end={24485.67} />
                    </Title>
                    <Tag color="green-inverse" icon={<ArrowUpOutlined />}>
                      8.7%
                    </Tag>
                  </Space>
                  <SalesChart />
                </Flex>
              )}
            </Card>
          </Col>
          <Col span={24}>
            <Card
              extra={
                <Space>
                  <Button onClick={showModal}>Добавить категорию</Button>
                  <Button
                    disabled={selectedItems.length === 0}
                    danger
                    onClick={handleDelete}
                  >
                    удалить
                  </Button>
                  <ExportExcel icon={<UploadOutlined />} data={selectedItems} />
                </Space>
              }
              title="Категории"
            >
              {error ? (
                <Alert
                  message="Error"
                  description={error.toString()}
                  type="error"
                  showIcon
                />
              ) : (
                <>
                  <DynamicTable onEdit={setItemCategory} setState={setSelectedItems} state={selectedItems} data={data?.results} />
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
                </>
              )}
            </Card>
          </Col>
        </Row>
      </div>

      <CategoryForm visible={isModalOpen} onClose={handleCancel} />
      <EditCategoryForm
        categoryId={changedItemId} // Здесь можно динамически передавать id
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};
