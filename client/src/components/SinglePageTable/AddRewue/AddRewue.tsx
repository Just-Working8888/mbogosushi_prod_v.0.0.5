import { FC, useState } from 'react'
import classes from './AddRewue.module.scss'
import { Button, Card, Form, Rate } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { useParams } from 'react-router-dom';
import { createRewue } from '../../../store/reducers/reviewsReduser';
import { useAppDispatch } from '../../../store/hook';
import { fetchProductByID } from '../../../store/reducers/productReduser';

type FieldType = {
    term_of_use?: string;
    text?: string;
    disadvantages?: string;
    advantages?: string
};

const AddRewue: FC = () => {
    const [form] = Form.useForm();
    const [star, setStar] = useState(0)
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const onFinish = (values: any) => {
        console.log('Success:', values);
        dispatch(createRewue({
            data: {
                text: values.text,
                stars: star,
                user: localStorage.getItem('user_id') as any,
                product: Number(id)
            }
        })).then(() => {
            dispatch(fetchProductByID({ id: Number(id) }))
        })
    };

    return (
        <Card className={classes.form}>
            <Form
                name="basic"
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >


                <Rate onChange={setStar} value={star} />
                <p>Оцените товар:</p>



                <Form.Item<FieldType>

                    name="text"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <TextArea style={{ padding: '10px' }} placeholder="Отзыв" />
                </Form.Item>

                {/* <Form.Item
                    name="advantages"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input style={{ padding: '10px' }} placeholder="Достоинства" />
                </Form.Item>

                <Form.Item<FieldType>

                    name="disadvantages"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input style={{ padding: '10px' }} placeholder="Недостатки" />
                </Form.Item>
                <Form.Item name="term_of_use" rules={[{ required: true, message: 'Please select your agreement with the terms of use' }]}>
                    <Select style={{ height: '50px' }} placeholder="Select your agreement">
                        <Select.Option value="день">день</Select.Option>
                        <Select.Option value="неделю">неделю</Select.Option>
                        <Select.Option value="месяц">месяц</Select.Option>
                    </Select>
                </Form.Item> */}
                <Form.Item colon={false}>
                    <Button className={classes.button} type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default AddRewue
