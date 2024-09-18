import React, { useState } from 'react';
import { List, Modal, Button, Tag, Space, Row, Col, Card, DatePicker, Select, Empty } from 'antd';
import { InfoCircleOutlined, DollarCircleOutlined, CalendarOutlined, HomeOutlined, CreditCardOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/hook';

interface BillingProduct {
    id: number;
    quantity: number;
    configurator: any[];
    price: number;
    status: boolean;
    created: string;
    billing: number;
    product: number;
}

export interface BillingData {
    id: number;
    billing_products: BillingProduct[];
    billing_type: string;
    billing_receipt_type: string;
    billing_status: string;
    billing_payment_status: string;
    billing_payment: string;
    total_price: number;
    created: string;
    street: string;
    note: string;
    phone: string;
}

const { RangePicker } = DatePicker;
const { Option } = Select;

const getPaymentTag = (payment: string) => {
    switch (payment) {
        case 'cash':
            return <Tag icon={<HomeOutlined />} color="green">Наличные</Tag>;
        case 'bankCard':
            return <Tag icon={<CreditCardOutlined />} color="blue">Банковская карта</Tag>;
        default:
            return <Tag>Неизвестный тип оплаты</Tag>;
    }
};

const HistoryList: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<BillingData | null>(null);
    const { data } = useAppSelector((state) => state.user);
    const [filteredData, setFilteredData] = useState<BillingData[]>([...data?.billing_user || [] as any]);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null] | null>(null);

    // Обновление фильтрации данных по типу заказа и дате
    const applyFilters = (dates: [Date | null, Date | null] | null, type: string | null) => {
        let filtered = [...data?.billing_user || [] as any];

        // Фильтрация по типу заказа
        if (type) {
            filtered = filtered.filter((item: BillingData) => {
                if (type === 'restaurant') {
                    return item.street.includes('Меню');
                } else if (type === 'delivery') {
                    return item.billing_receipt_type.includes('Доставка');
                } else if (type === 'pickup') {
                    return item.billing_receipt_type.includes('Самовывоз');
                }
                return true;
            });
        }

        // Фильтрация по дате
        if (dates && dates[0] && dates[1]) {
            const [start, end] = dates;
            filtered = filtered.filter((item: BillingData) => {
                const itemDate = new Date(item.created).getTime(); // Преобразуем дату в миллисекунды
                return itemDate >= start.getTime() && itemDate <= end.getTime();
            });
        }

        setFilteredData(filtered);
    };

    // Фильтрация по дате
    const onDateChange = (dates: [Date | null, Date | null]) => {
        setSelectedDates(dates);
        applyFilters(dates, selectedType);
    };

    // Фильтрация по типу заказа
    const onTypeChange = (type: string) => {
        setSelectedType(type);
        applyFilters(selectedDates, type);
    };

    const showModal = (item: BillingData) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            {/* Компоненты для фильтрации */}
            <Space style={{ marginBottom: 16 }}>
                <RangePicker
                    onChange={(dates, dateStrings) => {
                        const [start, end] = dates || [];
                        console.log(dateStrings);

                        onDateChange([start?.toDate() || null, end?.toDate() || null]);
                    }}
                />
                <Select
                    placeholder="Тип заказа"
                    style={{ width: 200 }}
                    onChange={onTypeChange}
                    allowClear
                >
                    <Option value="restaurant">Обед в ресторане</Option>
                    <Option value="delivery">Доставка</Option>
                    <Option value="pickup">Самовывоз</Option>
                </Select>
            </Space>

            {/* Список заказов */}
            {filteredData.length > 0 ? (
                <List
                    itemLayout="vertical"
                    dataSource={filteredData}
                    renderItem={(item: BillingData) => (
                        <Card
                            hoverable
                            className={
                                item.street.includes('Меню') ? 'rest' :
                                    item.billing_receipt_type.includes('Доставка') ? 'dost' :
                                        item.billing_receipt_type.includes('Самовывоз') ? 'samv' : ''
                            }
                            title={
                                item.street.includes('Меню') ? 'Обед в ресторане' :
                                    item.billing_receipt_type.includes('Доставка') ? `Доставка: ${item.street}` :
                                        item.billing_receipt_type.includes('Самовывоз') ? 'Самовывоз' : ''
                            }
                            style={{
                                marginBottom: 16,
                                borderRadius: 10,
                                background: item.street.includes('Меню') ? '#d1ffc5c7' : undefined,
                                color: item.street.includes('Меню') ? 'green' : undefined
                            }}
                            bodyStyle={{ padding: 16 }}
                        >
                            <Row justify="space-between" align="middle">
                                <Col>
                                    <Space direction="vertical">
                                        <Tag
                                            icon={<CalendarOutlined />}
                                            color="blue"
                                            style={{ borderRadius: 6, fontSize: 14 }}
                                        >
                                            {new Date(item.created).toLocaleDateString()}
                                        </Tag>
                                        {getPaymentTag(item.billing_payment)}
                                    </Space>
                                </Col>
                                <Col>
                                    <Space direction="vertical" align="end">
                                        <Tag
                                            icon={<DollarCircleOutlined />}
                                            color="green"
                                            style={{ borderRadius: 6, fontSize: 14 }}
                                        >
                                            {item.total_price} сом
                                        </Tag>
                                        <Button
                                            type="link"
                                            icon={<InfoCircleOutlined />}
                                            style={{ fontSize: 14 }}
                                            onClick={() => showModal(item)}
                                        >
                                            Подробнее
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>
                    )}
                />
            ) : (
                <Empty description="Нет данных по выбранным фильтрам" />
            )}

            {/* Модальное окно с деталями заказа */}
            <Modal
                title="Детали заказа"
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
                        <p><strong>Улица:</strong> {selectedItem.street}</p>
                        <p><strong>Примечание:</strong> {selectedItem.note}</p>
                        <p><strong>Товары:</strong></p>
                        <ul>
                            {selectedItem.billing_products.map(product => (
                                <li key={product.id}>Товар {product.product}: {product.quantity} шт, цена: {product.price} сом</li>
                            ))}
                        </ul>
                        <p><strong>Общая сумма:</strong> {selectedItem.total_price} сом</p>
                        <p><strong>Телефон:</strong> {selectedItem.phone}</p>
                        <p><strong>Тип оплаты:</strong> {getPaymentTag(selectedItem.billing_payment)}</p>
                    </Space>
                )}
            </Modal>
        </>
    );
};

export default HistoryList;
