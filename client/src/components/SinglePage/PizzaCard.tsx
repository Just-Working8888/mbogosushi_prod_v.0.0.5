import React from "react";
import styles from "./PizzaCard.module.scss";
import PizzaImage from "./PizzaImage";
import CrustSelector from "./CrustSelector";
import IngredientsList from "./IngredientsList";
import AddToCartButton from "./AddToCartButton";
import { useAppSelector } from "../../store/hook";

const PizzaCard: React.FC = () => {

    const { product } = useAppSelector((state) => state.product)


    return (
        <div className={styles.pizzaCard}>
            <div className={styles.pizzaCard__image}>
                <PizzaImage />
            </div>
            <div className={styles.pizzaCard__details}>
                <h1 className={styles.pizzaTitle}>{product.title}</h1>
                <p className={styles.pizzaDescription}>{product.description}</p>

                <CrustSelector />
                <IngredientsList />

                <AddToCartButton price={product.price} />
            </div>
        </div>
    );
};

export default PizzaCard;
