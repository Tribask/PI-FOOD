import React from "react";
import styles from "./Paginado.module.css";
import { useDispatch, useSelector } from "react-redux";
import { paginado } from "../../redux/actions";

const Paginado = ({ size, recipesPerPage }) => {
  //
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.page);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(size / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  /*
  Página 1 -> [1 - 9]
  Página 2 -> [10 - 18]
  Página 3 -> [19 - 27]
  .
  const total_no_of_items = elementos.length;
  const items_per_page = 6;
  let no_of_pages = total_no_of_items / items_per_page;
  let page_number = 2;
 
  const items_to_skip = (page_number - 1) * items_per_page;
  const items = elementos.slice(items_to_skip, items_per_page + items_to_skip);
  console.log(items) 
  .
   */
  const handlerClick = (e) => {
    dispatch(paginado(e.target.value));
  };

  const handlerBack = (e) => {
    if (currentPage > 1) {
      dispatch(paginado(parseInt(currentPage) - 1));
    } else {
      alert("You are in the first page");
    }
  };

  const handlerNext = (e) => {
    if (currentPage < pageNumbers.length) {
      dispatch(paginado(parseInt(currentPage) + 1));
    } else {
      alert("You are in the last page");
    }
  };

  

  return (
    <div className={styles.container}>
      <button className={styles.pag_button} onClick={handlerBack}>
        {" "}
        -back{" "}
      </button>

      {pageNumbers.map((page) => {
        return (
          <button
          className={`${parseInt(page)===parseInt(currentPage)? styles.active_button:styles.pag_button}`}
            onClick={handlerClick}
            value={page}
            key={page}
          >
            {page}
          </button>
        );
      })}

      <button className={styles.pag_button} onClick={handlerNext}>
        {" "}
        next-{" "}
      </button>
    </div>
  );
};

export default Paginado;
