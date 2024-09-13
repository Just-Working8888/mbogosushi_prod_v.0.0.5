


import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import { createCart, fetchCartItemById } from "../../store/reducers/cartReduser";
import { setSessionKey } from "../../helpers/session_key";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/BreadCrumps/BreadCrumps";
export default function Main() {
    const dispatch = useAppDispatch()
    const storedSessionKey = localStorage.getItem('session_key');
    const cart_id = localStorage.getItem('cart_id');
    useEffect(() => {

        if (!storedSessionKey && !cart_id) {
            dispatch(createCart({
                data: {
                    session_key: setSessionKey(),
                    discount_amount: 1,
                    promo_code: false
                }
            })).then((res: any) => {
                console.log(res);
                dispatch(fetchCartItemById({ id: res.payload.id }))

            })
        }



    }, [])
    return (
        <>

            <Header />
            <div className="container"><Breadcrumbs /></div>
            <Outlet />


            <Footer /></>

    );
}
