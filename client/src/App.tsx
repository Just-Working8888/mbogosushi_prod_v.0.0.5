
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Main from './Layout/Main/Main'
import { lazy, Suspense } from 'react'
import { Flex, Spin } from 'antd'
const MainPage = lazy(() => import('./routes/MainPage/MainPage'))
const ProductSelectedPage = lazy(() => import('./routes/ProductSelectedPage/ProductSelectedPage'))
const OrderPage = lazy(() => import('./routes/OrderPage/OrderPage'))
const Categories = lazy(() => import('./routes/Categories/Categories'))
const Code = lazy(() => import('./routes/Code/Code'))

function App() {

  return (

    <Routes>
      <Route path='/' element={<Main />}>
        <Route path='/' element={<Suspense fallback={<Spin spinning={true} fullscreen />}><MainPage /></Suspense>} />
        <Route path='product/:id' element={<Suspense fallback={<Spin fullscreen spinning={true} />}><ProductSelectedPage /></Suspense>} />
        <Route path='code/:id' element={<Suspense fallback={<Spin fullscreen spinning={true} />}><Code /></Suspense>} />
        <Route path='order' element={<Suspense fallback={<Spin fullscreen spinning={true} />} ><OrderPage /></Suspense>} />
        <Route path='categories' element={<Suspense fallback={<Spin fullscreen spinning={true} />} ><Categories /></Suspense>} />
        <Route path='*' element={<Flex align='center' justify='center' style={{height:'70vh'}}><img width={570} style={{ margin: 'auto' }} src="https://res.cloudinary.com/codefusiontech/image/upload/v1582791158/general/404Hero.png" alt="" /></Flex>} />

      </Route>
    </Routes>
  )
}

export default App
