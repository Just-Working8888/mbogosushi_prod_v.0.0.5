import React, { useEffect, useState } from 'react';
import { List, Button, message, Modal, Form, Input, Card } from 'antd';
import axios from 'axios';
import { getCookie } from '../../../helpers/cookies';

const apiUrl = 'https://docker.mnogosushi.kg/api/v1/settings/about_us_facts/';

interface Fact {
    id: number;
    number: string;
    title: string;
    text: string;
}

const AboutUsFacts: React.FC = () => {
    const [facts, setFacts] = useState<Fact[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedFact, setSelectedFact] = useState<Fact | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        axios.get<Fact[]>(apiUrl, {
            headers: {
                "Authorization": `Bearer ${getCookie('access_token')}`
            }
        })
            .then(response => {
                setFacts(response.data);
            })
            .catch(error => {
                message.error('Failed to fetch facts data');
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const showModal = (fact: Fact) => {
        setSelectedFact(fact);
        form.setFieldsValue(fact);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedFact(null);
    };

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                if (selectedFact) {
                    axios.put(`${apiUrl}${selectedFact.id}/`, values, {
                        headers: {
                            "Authorization": `Bearer ${getCookie('access_token')}`
                        }
                    })
                        .then(() => {
                            message.success('Fact updated successfully');
                            setFacts(prevFacts =>
                                prevFacts.map(fact =>
                                    fact.id === selectedFact.id ? { ...fact, ...values } : fact
                                )
                            );
                            setIsModalVisible(false);
                        })
                        .catch(error => {
                            message.error('Failed to update fact');
                            console.error(error);
                        });
                }
            })
            .catch(error => {
                console.error('Validation Failed:', error);
            });
    };

    return (
        <>
            <Card style={{ background: 'white' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={facts}
                    renderItem={fact => (
                        <List.Item
                            actions={[
                                <Button type="link" onClick={() => showModal(fact)}>Edit</Button>,
                            ]}
                        >
                            <List.Item.Meta
                                title={`${fact.number}. ${fact.title}`}
                                description={fact.text}
                            />
                        </List.Item>
                    )}
                    loading={loading}
                />

            </Card>
            <Modal
                title="Редактировать факт"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleOk}
                okText="Сохранить"
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={selectedFact as any}
                >
                    <Form.Item
                        name="number"
                        label="Номер"
                        rules={[{ required: true, message: 'Please input the number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="Заголовок"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="text"
                        label="Описание"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AboutUsFacts;
