import { Avatar, Button, Table, TableProps } from 'antd';
import Counter from '../../../Counter/Counter';
import { useState } from 'react';

type Props = {
    data: any[];
    setData: Function
} & TableProps<any>;

export const SelectedProductTable = ({ data, setData, ...others }: Props) => {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    console.log(quantities);


    const handleQuantityChange = (id: number, quantity: number) => {
        setQuantities(prev => ({ ...prev, [id]: quantity }));
        const newData = data.map(item => item.id === id ? { ...item, quantity } : item);
        setData(newData);
    };

    const handleDelete = (id: number) => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
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
            render: (id: number, record: any) => (
                <Counter
                    initialCount={record.quantity || 1}
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
            render: (text: any, record: any) => {
                console.log(text);

                return <span>{record.price * (record.quantity || 1)}</span>

            }
        },
        {
            title: 'Действия',
            dataIndex: 'id',
            key: 'actions',
            render: (id: number) => (
                <Button type='primary' onClick={() => handleDelete(id)}>
                    Удалить
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
