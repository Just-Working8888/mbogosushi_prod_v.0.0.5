
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Main from './Layout/Main/Main'
import { lazy, Suspense } from 'react'
import { Spin } from 'antd'
import TableLayout from './Layout/TableLayout/TableLayout'
import ProductSelectedPageTable from './routes/Table/ProductSelectedPage/ProductSelectedPage'
const MainPage = lazy(() => import('./routes/MainPage/MainPage'))
const ProductSelectedPage = lazy(() => import('./routes/ProductSelectedPage/ProductSelectedPage'))
const OrderPage = lazy(() => import('./routes/OrderPage/OrderPage'))
const Categories = lazy(() => import('./routes/Categories/Categories'))
const Table = lazy(() => import('./routes/Table/Table'))
const TableBiling = lazy(() => import('./routes/Table/TableOrder/TableOrder'))

function App() {

  return (

    <Routes>
      <Route path='/' element={<Main />}>
        <Route path='/' element={<Suspense fallback={<Spin spinning={true} fullscreen />}><MainPage /></Suspense>} />
        <Route path='product/:id' element={<Suspense fallback={<Spin fullscreen spinning={true} />}><ProductSelectedPage /></Suspense>} />
        <Route path='order' element={<Suspense fallback={<Spin fullscreen spinning={true} />} ><OrderPage /></Suspense>} />
        <Route path='categories' element={<Suspense fallback={<Spin fullscreen spinning={true} />} ><Categories /></Suspense>} />
      </Route>
      <Route path='/table/:tableid' element={<TableLayout />}>
        <Route path='menu' element={<Suspense fallback={<Spin spinning={true} fullscreen />}><Table /></Suspense>} />
        <Route path='tablebiling' element={<Suspense fallback={<Spin spinning={true} fullscreen />}><TableBiling /></Suspense>} />
        <Route path='tablefood/:id' element={<Suspense fallback={<Spin spinning={true} fullscreen />}><ProductSelectedPageTable /></Suspense>} />

      </Route>
    </Routes>




  )
}

export default App
