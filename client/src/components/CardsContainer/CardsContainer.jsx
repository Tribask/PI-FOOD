// Este componente debe tomar un array de recetas, y por cada recera, renderizar un componente Card

import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = ({recipes}) => {

  return (
    <div className={styles.container}>
      {recipes.map((r) => {
        return (
          <Card
            id={r.id}
            name={r.name}
            summary={r.summary}
            image={r.image}
            health_score={r.health_score}
            dietTypes={r.dietTypes}
            dishTypes={r.dishTypes}
            key={r.id}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
