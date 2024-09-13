import { Avatar, Button, message, Table, TableProps } from 'antd';
import Counter from '../../../Counter/Counter';
import { useState } from 'react';

type Props = {
    data: any[];
    setData: Function;
    selecetedData: any[];
} & TableProps<any>;

export const ShoosProductTable = ({ data, setData, selecetedData, ...others }: Props) => {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const handleQuantityChange = (id: number, quantity: number) => {
        setQuantities(prev => ({ ...prev, [id]: quantity }));
    };

    const COLUMNS = [
        {
            title: 'Товар',
            dataIndex: 'iiko_image',
            key: 'c_name',
            render: (iiko_image: string) => (
                <Avatar size={64} shape="square" src={iiko_image} />
            ),
        },
        {
            title: '',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Количество',
            dataIndex: 'id',
            key: 'quantity',
            render: (id: number) => (
                <Counter
                    initialCount={quantities[id] || 0}
                    onChange={(value) => handleQuantityChange(id, value)}
                />
            ),
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Total',
            dataIndex: 'id',
            key: 'total',
            render: (id: number, record: any) => (
                <span>{record.price * (quantities[id] || 0)}</span>
            ),
        },
        {
            title: 'Добавить',
            dataIndex: 'id',
            key: 'id',
            render: (id: number) => (
                <Button
                    onClick={() => {
                        if (!selecetedData.find((item: any) => item.id === id)) {
                            const selectedProduct = data.find((item: any) => item.id === id);
                            if (selectedProduct) {
                                setData((prevData: any[]) => [...prevData, { ...selectedProduct, quantity: quantities[id] || 1 }])
                                message.success(`${selectedProduct.title} добавлен в список`);
                            }
                        }
                    }}
                >
                    Добавить
                </Button>
            ),
        },
    ];

    return (
        <Table
            dataSource={data}
            columns={COLUMNS}
            key="client_table"
            size="middle"
            className="overflow-scroll"
            scroll={{ y: '57vh' }}
            {...others}
        />
    );
};
