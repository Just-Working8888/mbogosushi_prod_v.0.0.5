import { Helmet } from 'react-helmet-async'
import { PageHeader } from '../../components'
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons'
import { DASHBOARD_ITEMS } from '../../constants'
import { Link } from 'react-router-dom'
import IslandComponent from '../../components/SettingIlaend/SettingIlend'
import { useState } from 'react'
import ButtonGroup from 'antd/es/button/button-group'
import { Button, Flex } from 'antd'

const EditSite = () => {
    const [iframeWidth, setIframeWidth] = useState('100%'); // State for iframe width

    const handleButtonClick = (device: any) => {
        switch (device) {
            case 'laptop':
                setIframeWidth('100%'); // Width for laptops
                break;
            case 'tablet':
                setIframeWidth('800px'); // Width for tablets
                break;
            case 'phone':
                setIframeWidth('450px'); // Width for phones
                break;
            default:
                setIframeWidth('100%');
        }
    };
    return (
        <>

            <div>
                <Helmet>
                    <title>Главная | BigBee Админ панель</title>
                </Helmet>
                <PageHeader
                    title="BigBee редактирование"
                    breadcrumbs={[
                        {
                            title: (
                                <>
                                    <HomeOutlined />
                                    <span>Главная</span>
                                </>
                            ),
                            path: '/',
                        },
                        {
                            title: (
                                <>
                                    <PieChartOutlined />
                                    <span>Админ панель</span>
                                </>
                            ),
                            menu: {
                                items: DASHBOARD_ITEMS.map((d) => ({
                                    key: d.title,
                                    title: <Link to={d.path}>{d.title}</Link>,
                                })),
                            },
                        },
                        {
                            title: 'Билинги',
                        },
                    ]}
                />
                <Flex align='center' justify='center' vertical>
                    <ButtonGroup style={{ marginBottom: '16px' }}>
                        <Button type="primary" onClick={() => handleButtonClick('laptop')}>Для ноутов</Button>
                        <Button type="default" onClick={() => handleButtonClick('tablet')}>Для планшетов</Button>
                        <Button type="dashed" onClick={() => handleButtonClick('phone')}>Для телефонов</Button>
                    </ButtonGroup>
                    <br />
                    <IslandComponent />
                    <iframe
                        src="https://editmenu.vercel.app/"
                        style={{ width: iframeWidth, height: '70vh', borderRadius: '10px' }}
                        frameBorder="0">
                    </iframe>
                </Flex>
            </div>

        </>
    )
}

export default EditSite
