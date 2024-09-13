import React, { useState, useEffect } from 'react';
import { Badge, Button, Image, Table, Tag } from 'antd';
import { formatDateToRussian } from '../../utils';
import { TableRowSelection } from 'antd/es/table/interface';
import { LinkOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface DataType {
    [key: string]: any;
}

interface DynamicTableProps {
    data: DataType[] | null;
    setState?: Function;
    state?: any;
    onEdit?: (id: string) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ data, setState, state, onEdit }) => {
    // Проверка на пустой массив данных
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }
    const navigate = useNavigate();

    // Получение всех уникальных ключей из объектов массива
    const columns = Object.keys(data[0] || {}).map((key) => ({
        title: key,
        dataIndex: key,
        key,
        render: (text: any, record: DataType) => {
            console.log(record);

            if (key === 'ID' || key === 'id') {
                return <Button onClick={() => navigate(`/dashboards/biling/${text}`)} icon={<LinkOutlined />}>подробнее</Button>;
            }
            if (
                key === 'iiko_image'
                || key === 'qr_code_image'
                || key === 'profile_image'
                || key === 'image'
            ) {
                return <Image width={80} height={80} style={{ objectFit: 'cover', borderRadius: '8px', overflow: 'hidden' }} src={text ? text : 'https://www.landuse-ca.org/wp-content/uploads/2019/04/no-photo-available.png'} />;
            }
            if (key === 'created'
                || key === 'date_joined'
                || key === 'last_login'
                || key.includes('Дата')
                || key.includes('Срок')
                || key.includes('date')
            ) {
                return <Tag color="red">{formatDateToRussian(text)}</Tag>;
            }
            if (typeof text === 'boolean') {
                return text ? <Badge status="success" text="есть" /> : <Badge status="error" text="нет" />;
            }

            return text;
        },
    }));

    // Добавление колонки с кнопками редактирования, если передана функция onEdit
    if (onEdit) {
        columns.push({
            title: 'Действия',
            key: 'actions',
            render: (_: any, record: DataType) => (
                <Button type="primary" onClick={() => onEdit(record.ID || record.id)}>
                    Редактировать
                </Button>
            ),
            dataIndex: ''
        });
    }

    // Перемещение колонки с изображением в начало
    const imageColumnIndex = columns.findIndex(column => column.key === 'iiko_image');
    const imageColumnIndex3 = columns.findIndex(column => column.key === 'profile_image');
    if (imageColumnIndex > -1 || imageColumnIndex3 > -1) {
        if (imageColumnIndex > -1) {
            const [imageColumn] = columns.splice(imageColumnIndex, 1);
            columns.unshift(imageColumn);
        }
        if (imageColumnIndex3 > -1) {
            const [imageColumn3] = columns.splice(imageColumnIndex3, 1);
            columns.unshift(imageColumn3);
        }
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        if (state && state.length === 0) {
            setSelectedRowKeys([]);
        }
    }, [state]);

    const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRows: DataType[]) => {
        console.log('onSelectChange', newSelectedRowKeys, newSelectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
        if (setState) {
            setState(newSelectedRows);
        }
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        onSelect: (record, selected) => {
            if (state && setState) {
                const newSelectedRows = selected
                    ? [...state, record]
                    : state.filter((row: any) => (row.ID || row.id) !== (record.ID || record.id));
                onSelectChange(newSelectedRows.map((row: any) => row.ID || row.id), newSelectedRows);
            } else {
                const newSelectedRows = selected
                    ? [...selectedRowKeys, record.ID || record.id]
                    : selectedRowKeys.filter(key => key !== (record.ID || record.id));
                setSelectedRowKeys(newSelectedRows);
            }
        },
        onSelectAll: (selected, allSelectedRows) => {
            const newSelectedRows = selected ? allSelectedRows.map(row => row.ID || row.id) : [];
            setSelectedRowKeys(newSelectedRows);
            if (setState) {
                setState(selected ? allSelectedRows : []);
            }
        },
    };

    return (
        <Table
            columns={columns}
            dataSource={data.map((item, index) => ({ ...item, key: index }))}
            pagination={false}
            rowSelection={rowSelection}
            scroll={{ x: 'max-content' }}
        />
    );
};

export default DynamicTable;
