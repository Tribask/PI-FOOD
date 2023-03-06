import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDietTypes, getRecipes } from "../../redux/actions";
import NavBar from "../../components/NavBar/NavBar";
// import Filters from "../../components/Filters/Filters";
import styles from "./Home.module.css";
import Paginado from "../../components/Paginado/Paginado";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  // cuando se monta home, que haga el dispatch
  // con useEffect() se maneja el ciclo de vida - useDispatch()
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const error = useSelector((state) => state.error);
  const page = useSelector((state) => state.page);

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDietTypes());
  }, [dispatch]);

  // creación de estados para paginados
  const size = allRecipes.length; //cantidad de info que tengo
  const recipesPerPage = 9; // cantidad de recetas que quiero mostrar por pagina
  const finalIndex = page * recipesPerPage; // inicialmente 9
  const initialIndex = finalIndex - recipesPerPage; // 0
  const currentRecipes = allRecipes.slice(initialIndex, finalIndex); //las 9 recetas correspondientes

  return (
    <div className={styles.home}>
      <div>
        <h1>Take a look for recipes</h1>
      </div>
      <NavBar />
      {/* <Filters /> */}
      <div className={styles.paginado}>
        <Paginado
          size={size}
          recipesPerPage={recipesPerPage}
          // currentPage={page}
        />
      </div>

      <div className={styles.cards}>
        {error ? (
          <Error />
        ) : currentRecipes.length === 0 ? (
          <Loading />
        ) : (
          <CardsContainer recipes={currentRecipes} />
        )}
      </div>

      
    </div>
  );
};

export default Home;
