import { Alert, Button, Col, Modal, Row } from 'antd';
import { Card, Loader, PageHeader } from '../../components';
import { useStylesContext } from '../../context';
import { useFetchData } from '../../hooks';
import { useParams } from 'react-router-dom';
import OrderDetails from '../../components/BilingDeteilComponent/BilingDeteilComponet';
import BillingProductDetails from '../../components/BilingProductDeteyl/BilingProductDeteyl';
import { useState } from 'react';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';


export const BilingDeteilPage = () => {
    const stylesContext = useStylesContext();
    const { id } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const {
        data: biling,
        error: bilingError,
        loading: bilingLoading,
    } = useFetchData(`https://backend.mnogosushi.kg/api/v1/admin/billing/${id}/`);

    return (
        <>

            <div>
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
                            path: '/dashboards/main',
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
                            path: 'biling'
                        },
                    ]}
                />
                <Row {...stylesContext?.rowProps}>
                    <Col xs={24} sm={12} xl={16} >
                        <Card title="Детали чека">


                            <OrderDetails orderData={biling} />



                        </Card>
                    </Col>
                    <Col xs={24} sm={12} xl={8} >
                        <Card title="проданные товаровы" extra={<><Button onClick={showModal} type='primary'>открыть</Button></>}>
                            {bilingError ? (
                                <Alert
                                    message="Error"
                                    description={bilingError.toString()}
                                    type="error"
                                    showIcon
                                />
                            ) : bilingLoading ? (
                                <Loader />
                            ) : (
                                <div>
                                    <BillingProductDetails data={biling.billing_products} />
                                </div>
                            )}
                        </Card>
                    </Col>

                </Row>
            </div >
            <Modal title="Проданные товары" width={'100%'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <br /><br /><br />
                {bilingError ? (
                    <Alert
                        message="Error"
                        description={bilingError.toString()}
                        type="error"
                        showIcon
                    />
                ) : bilingLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <BillingProductDetails data={biling.billing_products} />
                    </div>
                )}
            </Modal>
        </>
    );
};
