import React, { useState } from 'react';
import { List, Avatar, Button, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Rewue.scss';
import { useAppSelector } from '../../../store/hook';
import AddRewue from '../AddRewue/AddRewue';
import Protected from '../../Protected/Protected';
import AuthModal from '../../Auth/Auth';

interface Review {
    id: number;
    user: {
        user_img: string;
        user_username: string;
    };
    product: string;
    text: string;
    stars: number;
    created: string;
}
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Использование
const date = '2024-09-11T11:20:46.804805+06:00';
console.log(formatDate(date));  // Output: 2024-09-11 11:20:46

const mockReviews: Review[] = [
    {
        id: 1,
        user: {
            user_img: '',
            user_username: 'Ivan Ivanov',
        },
        product: 'Set 20',
        text: 'Отличный набор, всем понравилось!',
        stars: 5,
        created: '2024-09-05',
    },
    {
        id: 2,
        user: {
            user_img: '',
            user_username: 'Petr Petrov',
        },
        product: 'Set 15',
        text: 'Хороший вкус, но хотелось бы больше.',
        stars: 4,
        created: '2024-09-03',
    },
    {
        id: 1,
        user: {
            user_img: '',
            user_username: 'Ivan Ivanov',
        },
        product: 'Set 20',
        text: 'Отличный набор, всем понравилось!',
        stars: 5,
        created: '2024-09-05',
    },
    {
        id: 2,
        user: {
            user_img: '',
            user_username: 'Petr Petrov',
        },
        product: 'Set 15',
        text: 'Хороший вкус, но хотелось бы больше.',
        stars: 4,
        created: '2024-09-03',
    },
    {
        id: 1,
        user: {
            user_img: '',
            user_username: 'Ivan Ivanov',
        },
        product: 'Set 20',
        text: 'Отличный набор, всем понравилось!',
        stars: 5,
        created: '2024-09-05',
    },
    {
        id: 2,
        user: {
            user_img: '',
            user_username: 'Petr Petrov',
        },
        product: 'Set 15',
        text: 'Хороший вкус, но хотелось бы больше.',
        stars: 4,
        created: '2024-09-03',
    },
];

const Reviews: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reviews, setReviews] = useState<Review[]>(mockReviews);
    console.log(setReviews);
    
    const [isAll, setIsAll] = useState(false)
    const { product } = useAppSelector((state) => state.product)


    const showModal = () => {
        setIsModalVisible(true);
    };

    // const onFinish = (values: any) => {
    //     const newReview: Review = {
    //         id: reviews.length + 1,
    //         user: {
    //             user_img: '',
    //             user_username: 'Новый пользователь', // Замените на авторизованного пользователя
    //         },
    //         product: values.product,
    //         text: values.text,
    //         stars: values.stars,
    //         created: new Date().toLocaleDateString(),
    //     };
    //     setReviews([...reviews, newReview]);
    //     setIsModalVisible(false);
    // };

    return (
        <div className="reviews-section">
            <List
                itemLayout="horizontal"
                dataSource={product?.product_reviews?.slice(0, isAll ? reviews.length : 3)}
                footer={<Button onClick={() => setIsAll((prev) => !prev)}>
                    {isAll ? 'скрыть' : 'показать все'}
                </Button>}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                item.user_img ? (
                                    <Avatar src={item.user_img} />
                                ) : (
                                    <Avatar icon={<UserOutlined />} />
                                )
                            }
                            title={item.user_username}
                            description={
                                <div>

                                    <Rate disabled defaultValue={item.stars} />
                                    <p>{item.text}</p>
                                    <p className="review-date">{item.created ? formatDate(item.created) : ''}</p>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
            <Protected fallback={<Button style={{ height: '40px', borderRadius: '10px' }} type="primary" onClick={showModal}>
                Войдите чтобы оставить отзыв
            </Button>}>
                <AddRewue />
            </Protected>
            <AuthModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />

            <br />
            <br />


        </div>
    );
};

export default Reviews;
