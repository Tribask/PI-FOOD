import { useSelector, useDispatch } from "react-redux";
import { orderAZ, orderScore, orderTypes } from "../../redux/actions";
import styles from "./Filters.module.css";

const Filters = () => {
  const dietTypes = useSelector((state) => state.dietTypes);
  const dispatch = useDispatch();

  const handlerAlphabetic = (event) => {
    dispatch(orderAZ(event.target.value));
  };

  const handlerTypes = (event) => {
    dispatch(orderTypes(event.target.value));
  };

  const handleClick = (e) => {
    window.location.reload();
  };

  const handlerScore = (e) => {
    dispatch(orderScore(e.target.value));
  };

  const orderTypesAz = dietTypes.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return (
    <div className={styles.mainFilter}>
      <h3> FILTER </h3>
      {/* Ordenamiento ascendente o descendente */}
      <div className={styles.alph}>
        <label>ALPHABETIC ➡ </label>
        <select onChange={handlerAlphabetic} name="orderAlph">
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      {/* Ordenamiento por Tipo de Dieta */}
      <div className={styles.diets}>
        <label>DIETS ➡ </label>
        <select onChange={handlerTypes} name="orderTypes">
          <option value="all" defaultValue>
            All
          </option>
          {orderTypesAz?.map((el) => {
            return (
              <option value={el.name} key={el.id}>
                {el.name}
              </option>
            );
          })}
        </select>
      </div>

      {/* Ordenamiento por Health Score */}
      <div className={styles.health}>
        <label>HEALTH SCORE ➡ </label>
        <select onChange={handlerScore}>
          <option value="high">Higher</option>
          <option value="low">Lower</option>
        </select>
      </div>

      {/* Botón para reiniciar los filtros */}
      <button onClick={handleClick}>Reset all</button>
    </div>
  );
};

export default Filters;
