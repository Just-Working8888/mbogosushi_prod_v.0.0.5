import React from "react";
import styles from "./PizzaCard.module.scss";
import { useAppSelector } from "../../store/hook";


const SizeSelector: React.FC = () => {
  const { product } = useAppSelector((state) => state.product)

  return (
    <div className={styles.sizeSelector}>
      <p>{product.description}</p>
    </div>
  );
};

export default SizeSelector;
