//Este componente debe mostrar la info de cada usuario mapeado, pero además darnos un link para ir al detalle del usuario en cuestión
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  console.log(props);
  return (
    <div className={styles.card}>
      <img src={props.image} alt="imagen" />
      <div className={styles.name}>
        <span>{props.name}</span>
      </div>
      <div className={styles.health}>
        <span><b>Health Score:</b> {props.health_score}</span>
      </div>
      <div className={styles.diets}>
        {props.dietTypes?.map(e=>
          <div className={styles.oneDiet}>{e}</div>)
          }
      </div>
      <Link className={styles.button} to={`/recipes/${props.id}`}>👉Recipe Details</Link>
      
    </div>
  );
};

export default Card;
