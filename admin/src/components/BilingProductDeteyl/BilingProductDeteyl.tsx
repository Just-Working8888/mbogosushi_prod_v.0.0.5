import { FC } from 'react';
import { Table, Image } from 'antd';


const columns = [

    {
        title: 'Изображение продукта',
        dataIndex: ['product', 'iiko_image'],
        key: 'product.iiko_image',
        render: (image: any) => image ? <Image src={image} width={80} height={80} style={{ objectFit: "cover", borderRadius: "8px" }} alt="Изображение продукта" /> : <Image src={'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} width={80} height={80} style={{ objectFit: "cover", borderRadius: "8px" }} alt="Изображение продукта" />
    },
    {
        title: 'Название продукта',
        dataIndex: ['product', 'title'],
        key: 'product.title',
    },
    {
        title: 'Артикул продукта',
        dataIndex: ['product', 'sku'],
        key: 'product.sku',
    },
    {
        title: 'Цена продукта',
        dataIndex: ['product', 'price'],
        key: 'product.price',
    },
    {
        title: 'Количество',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Итоговая цена',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        render: (status: any) => status ? "Активен" : "Неактивен",
    },
    // {
    //     title: 'Дата создания',
    //     dataIndex: 'created',
    //     key: 'created',
    //     render: (created: any) => <Tag color='red'> {formatDateToRussian(created)}</Tag>,
    // },
    {
        title: 'Описание',
        dataIndex: ['product', 'description'],
        key: 'product.description',
    }
];

const BilingProductDeteyl: FC<any> = ({ data }) => {
    return <Table dataSource={data} columns={columns} scroll={{ x: 'max-content' }} />;
};

export default BilingProductDeteyl;
