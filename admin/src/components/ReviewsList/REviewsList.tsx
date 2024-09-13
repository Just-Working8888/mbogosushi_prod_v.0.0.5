import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, List, Popover, Rate, Space } from 'antd';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

interface ProductReview {
    id: number;
    text: string;
    stars: number;
    created: string;
    user: number;
    product: number;
}

interface Props {
    data: ProductReview[];
}

export const ReviewsListForDeteil: React.FC<Props> = ({ data }) => (
    <List
        itemLayout="vertical"
        size="large"
        pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
            <List.Item
                key={item.id}
                actions={[
                    <Popover title="скоро">
                        <Button type="text">
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />
                        </Button>
                    </Popover>,
                    <Popover title="скоро">
                        <Button type="text">
                            <IconText icon={StarOutlined} text={item.stars.toString()} key="list-vertical-star-o" />
                        </Button>
                    </Popover>,
                    <Popover title="скоро">
                        <Button type="text">
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />
                        </Button>
                    </Popover>,


                ]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={'https://api.dicebear.com/7.x/miniavs/svg?seed=1'} />} // Если у вас есть аватар, вы можете раскомментировать эту строку
                    title={`Отзыв от пользователя ${item.user}`}
                    description={`Создан: ${new Date(item.created).toLocaleString()}`}
                />
                <Flex justify='space-between' align='center'>
                    {item.text}
                    <Rate value={item.stars} />
                </Flex>

            </List.Item>
        )}
    />
);
