import React from "react";
import styles from "./PizzaCard.module.scss";
import { useAppSelector } from "../../store/hook";

const PizzaImage: React.FC = () => {
    const { product } = useAppSelector((state) => state.product)

    return <img src={product.image ? product.image : product.iiko_image} width={'100%'} style={{ borderRadius: '30px' }} alt="Пепперони фреш" className={styles.pizzaImage} />;
};

export default PizzaImage;
