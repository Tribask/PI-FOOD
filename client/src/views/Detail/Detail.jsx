import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cleanDetail, getRecipeById } from "../../redux/actions";
import back from "../../images/back.gif";
import back2 from "../../images/back2.png";
import styles from "./Detail.module.css";
import Loading from "../../components/Loading/Loading";

const Detail = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch]);

  const detail = useSelector((state) => state.details);
  const { id } = useParams();

  // const newDietTypes = detail.dietTypes.map((e) => (e.name ? e.name : e));
  // const newSteps = detail.steps.map((e) => (e.step ? e.step : e));
  console.log(detail);

  const handlerDetail = () => {
    dispatch(cleanDetail());
  };

  if (detail.length === 0) {
    return <Loading />;
  } else
    return (
      <div className={styles.container}>
        <Link to="/home" onClick={handlerDetail}>
          <img src={back2} alt="back" />
        </Link>

        <h1>{detail.name}</h1>

        <h2>Health Score: {detail.health_score}</h2>

        <div className={styles.img}>
          <img src={detail.image} alt="Image Not Found" />
        </div>

        <div className={styles.ddcontainer}>
          <div className={styles.dish}>
            <h3>Dish Types:</h3>
            {detail.dishTypes?.map((t) => (
              <span>{t}</span>
            ))}
          </div>

          <div className={styles.diets}>
            <h3> Diets: </h3>
            {detail.dietTypes?.map((t) => (
              <span>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles.summary}>
          <p>Summary</p>
          <span dangerouslySetInnerHTML={{ __html: detail.summary }}></span>
        </div>

        <div className={styles.steps}>
          <h3>Steps</h3>
          {detail.steps?.map((s) => (
            <p>➡{s}</p>
          ))}
        </div>
      </div>
    );
};

export default Detail;
