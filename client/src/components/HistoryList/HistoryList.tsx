import React, { useState } from 'react';
import { List, Modal, Button, Tag, Space, Row, Col, Card, Grid, Flex } from 'antd';
import { InfoCircleOutlined, DollarCircleOutlined, CalendarOutlined, ShopOutlined, CarOutlined, HomeOutlined } from '@ant-design/icons';

interface Item {
    date: string;
    price: number;
    description: string;
    details: string;
    type: 'delivery' | 'pickup' | 'dined_in';
}

const data: Item[] = [
    {
        date: '2024-09-01',
        price: 1000,
        description: 'Покупка в ресторане',
        details: 'Подробная информация о покупке в ресторане на сумму 1000₽',
        type: 'delivery', // Доставка
    },
    {
        date: '2024-09-02',
        price: 2000,
        description: 'Заказ самовывозом',
        details: 'Подробная информация о заказе на самовывоз на сумму 2000₽',
        type: 'pickup', // Самовывоз
    },
    {
        date: '2024-09-03',
        price: 1500,
        description: 'Обед в ресторане',
        details: 'Подробная информация об обеде в ресторане на сумму 1500₽',
        type: 'dined_in', // В заведении
    },
];

const getTypeTag = (type: string) => {
    switch (type) {
        case 'delivery':
            return (
                <Tag icon={<HomeOutlined />} color="volcano" style={{ height: "fit-content", borderRadius: 6, fontSize: 14 }}>
                    Доставка
                </Tag>
            );
        case 'pickup':
            return (
                <Tag icon={<CarOutlined />} color="gold" style={{ height: "fit-content", borderRadius: 6, fontSize: 14 }}>
                    Самовывоз
                </Tag>
            );
        case 'dined_in':
            return (
                <Tag icon={<ShopOutlined />} color="cyan" style={{ height: "fit-content", borderRadius: 6, fontSize: 14 }}>
                    В заведении
                </Tag>
            );
        default:
            return null;
    }
};

const HistoryList: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const showModal = (item: Item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    return (
        <>
            <List
                itemLayout="vertical"
                dataSource={data}
                renderItem={item => (
                    <Card
                        onClick={() => showModal(item)}

                        title={<span style={{ fontSize: 16, fontWeight: 500 }}>
                            {item.description}
                        </span>}
                        hoverable
                        style={{ marginBottom: 16, borderRadius: 10 }}
                        bodyStyle={{ padding: 16 }}
                    >
                        <Row justify="space-between" >
                            <Col span={12}>
                                <Space direction="vertical" size={screens.xs ? 'small' : 'middle'}>
                                    <Tag
                                        icon={<CalendarOutlined />}
                                        color="blue"
                                        style={{ borderRadius: 6, fontSize: 14 }}
                                    >
                                        {item.date}
                                    </Tag>

                                    <Flex align='cemter' justify='space-between'>
                                        {getTypeTag(item.type)}
                                        <Button
                                            type="link"
                                            icon={<InfoCircleOutlined />}
                                            style={{ fontSize: 14 }}
                                            onClick={() => showModal(item)}
                                        >
                                            Подробнее
                                        </Button></Flex>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Space direction="vertical" align="end" size={screens.xs ? 'small' : 'middle'}>
                                    <Tag
                                        icon={<DollarCircleOutlined />}
                                        color="green"
                                        style={{ borderRadius: 6, fontSize: 14 }}
                                    >
                                        {item.price} сом
                                    </Tag>



                                </Space>
                            </Col>
                        </Row>
                    </Card>
                )}
            />
            <Modal
                title="Подробная информация"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel} style={{ width: '100%' }}>
                        Закрыть
                    </Button>,
                ]}
            >
                {selectedItem && (
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Tag icon={<CalendarOutlined />} color="blue" style={{ width: '100%', textAlign: 'center' }}>
                            {selectedItem.date}
                        </Tag>
                        <Tag icon={<DollarCircleOutlined />} color="green" style={{ width: '100%', textAlign: 'center' }}>
                            {selectedItem.price} сом
                        </Tag>
                        {getTypeTag(selectedItem.type)}
                        <p><strong>Описание:</strong> {selectedItem.description}</p>
                        <p><strong>Детали:</strong> {selectedItem.details}</p>
                    </Space>
                )}
            </Modal>
        </>
    );
};

export default HistoryList;
