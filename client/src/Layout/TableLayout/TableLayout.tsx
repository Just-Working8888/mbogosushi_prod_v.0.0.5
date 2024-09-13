


import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import { setSessionKey } from "../../helpers/session_key";
import Footer from "../../components/Footer/Footer";
import { createTableOrder } from "../../store/reducers/TableOrderReduser";
import HeaderTable from "./Header/Header";
export default function TableLayout() {
    const dispatch = useAppDispatch()
    const table_key = localStorage.getItem('table_key');
    const { tableid } = useParams()
    useEffect(() => {
        const key = setSessionKey()

        if (!table_key) {
            dispatch(createTableOrder({
                data: {
                    session_key: key,
                    menu_table: Number(tableid),
                    promo_code: true,
                    discount_amount: 0,
                }
            }))
        }



    }, [])
    return (
        <>

            <HeaderTable />
            {/* <div className="container"><Breadcrumbs /></div> */}
            <Outlet />


            <Footer /></>

    );
}
