import React from "react";
import styles from "./PizzaCard.module.scss";
import { useAppSelector } from "../../store/hook";

const IngredientsList: React.FC = () => {
  const { product }: any = useAppSelector((state) => state.product)

  return (
    <div className={styles.ingredients}>
      <h3>Пишевая ценность</h3>
      <div className={styles.ingredientsList}>

        <div className={styles.ingredient}>
          <span>Жиры</span>
          <span>{product.fats}</span>
        </div>
        <div className={styles.ingredient}>
          <span>Белки</span>
          <span>{product.proteins}</span>
        </div>
        <div className={styles.ingredient}>
          <span>Углеводы</span>
          <span>{product.carbs}</span>
        </div>
        <div className={styles.ingredient}>
          <span>Ккал</span>
          <span>{product.energy}</span>
        </div>
        <div className={styles.ingredient}>
          <span>Граммы</span>
          <span>{product.portionWeightGrams}</span>
        </div>
      </div>
    </div>
  );
};

export default IngredientsList;
