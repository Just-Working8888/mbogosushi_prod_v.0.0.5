import { Helmet } from 'react-helmet-async'
import { PageHeader } from '../../components'
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons'
import { DASHBOARD_ITEMS } from '../../constants'
import { Link } from 'react-router-dom'
import IslandComponent from '../../components/SettingIlaend/SettingIlend'

const EditSite = () => {
    return (
        <>

            <div>
                <Helmet>
                    <title>Главная | BigBee Админ панель</title>
                </Helmet>
                <PageHeader
                    title="BigBee Админ панель"
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
                <IslandComponent />
                <iframe src="https://editmenu.vercel.app/" style={{ width: '100%', height: '70vh', borderRadius: '10px' }} frameBorder="0"></iframe>
                
            </div>

        </>
    )
}

export default EditSite
