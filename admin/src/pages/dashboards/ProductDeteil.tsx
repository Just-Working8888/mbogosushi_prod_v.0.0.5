import {
    Card as AntdCard,
    Col,
    Flex,
    Image,
    Rate,
    Row,
    Typography,
} from 'antd';
import { Card, ProductDescriptions, ReviewsListForDeteil } from '../../components';
import { useStylesContext } from '../../context';
import CountUp from 'react-countup';
import { useFetchData } from '../../hooks';
import { useParams } from 'react-router-dom';
import { CSSProperties } from 'react';
import { Pie } from '@ant-design/charts';

const extractPercentage = (input: string): number => {
    const percentageMatch = input.match(/([\d.]+)%/);
    if (percentageMatch) {
        return parseFloat(percentageMatch[1]);
    }
    throw new Error('Invalid input string');
};

const { Title, Text } = Typography;
const cardStyles: CSSProperties = {
    height: '100%',
};


export const ProductDeteil = () => {
    const stylesContext = useStylesContext();
    const { id } = useParams()
    const {
        data: dataa,
    } = useFetchData(`https://docker.mnogosushi.kg/api/v1/admin/product/${id}/`);

    let salesPercentage: any;

    if (dataa.sales_analysis && typeof dataa.sales_analysis === 'string') {
        try {
            salesPercentage = extractPercentage(dataa.sales_analysis);
        } catch (error) {
            console.error(error);
        }
    }

    const CategoriesChart = () => {
        const data = [
            {
                type: 'Хорошие отзвы',
                value: salesPercentage,
            },
            {
                type: 'Плохие отзвы',
                value: (100 - salesPercentage),
            }
        ];

        const config = {
            appendPadding: 10,
            data,
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            innerRadius: 0.5,
            label: {
                type: 'inner',
                offset: '-50%',
                content: '{value}%',
                style: {
                    textAlign: 'center',
                    fontSize: 16,
                },
            },
            interactions: [
                {
                    type: 'element-selected',
                },
                {
                    type: 'element-active',
                },
            ],
            statistic: {
                title: false,
                content: {
                    style: {
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: 18,
                    },
                    content: `Количество отзывов: ${dataa?.review_count} `,
                },
            },
        };

        // @ts-ignore
        return <Pie {...config} />;
    };

    return (
        <div>
            <Row {...stylesContext?.rowProps}>
                <Col span={24}>
                    <Flex gap={35}>
                        <Card style={{ width: "50%" }} title={<Title level={3}>{dataa?.title}</Title>}>
                            <Flex gap="small" vertical>
                                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Text>
                                <Image
                                    src={dataa?.iiko_image}
                                    alt="about us hero image"
                                    width="100%"
                                    height={500}
                                    style={{ borderRadius: '10px', overflow: 'hidden', objectFit: 'cover' }}
                                />
                            </Flex>
                        </Card>
                        <Card style={{ width: "50%" }}>
                            <ProductDescriptions column={2} product={dataa} />
                        </Card>
                    </Flex>

                </Col>
                <Col xs={24} lg={12}>
                    <Card
                        title="Анализ продаж"

                        style={cardStyles}
                    >
                        <CategoriesChart />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card
                        title="Отзывы"

                        style={cardStyles}
                    >
                        <ReviewsListForDeteil data={dataa.product_reviews} />
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title="Our statistics">
                        <Row gutter={[8, 8]}>
                            <Col lg={8}>
                                <AntdCard hoverable={false} className="text-center">
                                    <Title className="m-0">
                                        <CountUp end={dataa.sold_quantity} />
                                    </Title>
                                    <Text>
                                        Проданное количество
                                    </Text>
                                </AntdCard>
                            </Col>
                            <Col lg={8}>
                                <AntdCard hoverable={false} className="text-center">
                                    <Title className="m-0">
                                        <CountUp end={dataa.average_rating} />
                                        <br />
                                        <Rate value={dataa.average_rating} />
                                    </Title>
                                    <Text>Средний рейтинг                                    </Text>
                                </AntdCard>
                            </Col>
                            <Col lg={8}>
                                <AntdCard hoverable={false} className="text-center">
                                    <Title className="m-0">
                                        <CountUp end={dataa.review_count} />
                                    </Title>
                                    <Text>Количество отзывов
                                    </Text>
                                </AntdCard>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
