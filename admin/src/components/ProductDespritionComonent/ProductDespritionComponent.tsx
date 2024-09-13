import React from 'react';
import { Descriptions } from 'antd';
import { DescriptionsProps } from 'antd/lib/descriptions';

interface ProductReview {
    id: number;
    text: string;
    stars: number;
    created: string;
    user: number;
    product: number;
}

interface ProductData {
    id: number;
    product_reviews: ProductReview[];
    sold_quantity: number;
    review_count: number;
    sales_analysis: string;
    average_rating: number;
    title: string;
    description: string;
    price: string;
    image: string | null;
    iiko_image: string;
    sku: string;
    created: string;
    category: number;
}

interface ProductDescriptionsProps extends DescriptionsProps {
    product: ProductData;
}

export const ProductDescriptions: React.FC<ProductDescriptionsProps> = ({ product, ...restProps }) => {
    return (
        <Descriptions title="Детали продукта" {...restProps}>
            <Descriptions.Item label="Название">{product.title}</Descriptions.Item>
            <Descriptions.Item label="Описание">{product.description}</Descriptions.Item>
            <Descriptions.Item label="Цена">{product.price}</Descriptions.Item>
            <Descriptions.Item label="Артикул">{product.sku}</Descriptions.Item>
            <Descriptions.Item label="Проданное количество">{product.sold_quantity}</Descriptions.Item>
            <Descriptions.Item label="Количество отзывов">{product.review_count}</Descriptions.Item>
            <Descriptions.Item label="Анализ продаж">{product.sales_analysis}</Descriptions.Item>
            <Descriptions.Item label="Средний рейтинг">{product.average_rating}</Descriptions.Item>
            <Descriptions.Item label="Создан">{new Date(product.created).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Категория">{product.category}</Descriptions.Item>
        </Descriptions>
    );
};
