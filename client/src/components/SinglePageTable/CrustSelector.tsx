import React from "react";
import styles from "./PizzaCard.module.scss";
import { Flex, Rate } from "antd";
import { useAppSelector } from "../../store/hook";



const CrustSelector: React.FC = () => {
    const { product } = useAppSelector((state) => state.product)

    return (
        <div className={styles.crustSelector}>
            <Flex gap={16}>
                <Rate value={product.average_rating} />
            
                <p>Количество отзывов {product?.product_reviews?.length}</p>
            </Flex>
        </div>
    );
};

export default CrustSelector;
