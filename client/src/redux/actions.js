import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_ID = "GET_RECIPE_ID";
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const GET_DIET_TYPES = "GET_DIET_TYPES";
export const ORDER_ALPHABETIC = "ORDER_ALPHABETIC";
export const ORDER_TYPES = "ORDER_TYPES";
export const ORDER_SCORE = "ORDER_SCORE";
export const PAGINADO = "PAGINADO";
export const CLEAN_DETAIL="CLEAN_DETAIL";
export const SET_ERROR = "SET_ERROR";

export const cleanDetail=()=>{
  return {
    type: CLEAN_DETAIL,
  }
}

export const getRecipes = () => {
  return async function (dispatch) {
    const recipesInfo = await axios.get("http://localhost:3001/recipes");
    const recipes = recipesInfo.data;
    dispatch({ type: GET_RECIPES, payload: recipes });
  };
};

export const getDietTypes = () => {
  return async function (dispatch) {
    const allDiets = await axios.get("http://localhost:3001/types");
    const dietTypes = allDiets.data;
    dispatch({ type: GET_DIET_TYPES, payload: dietTypes });
  };
};

export const getRecipeById = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/recipes/${id}`);
    const recipe = apiData.data;
    dispatch({ type: GET_RECIPE_ID, payload: recipe });
  };
};

export const getRecipeName = (info) => {
  return async function (dispatch) {

    try {
      const nameData = await axios.get(
        `http://localhost:3001/recipes?name=${info}`
      );
      const name = nameData.data;
      console.log(name);
      dispatch({ type: GET_RECIPE_NAME, payload: name });
     
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_ERROR, payload: error })
      
    }

  };
};

export const orderAZ = (info) => {
  return {
    type: ORDER_ALPHABETIC,
    payload: info,
  };
};

export const orderTypes = (info) => {
  return {
    type: ORDER_TYPES,
    payload: info,
  };
};

export const orderScore = (info) => {
  return {
    type: ORDER_SCORE,
    payload: info,
  };
};

export const paginado = (page) => {
  return {
      type: PAGINADO,
      payload: page,
    }
};
