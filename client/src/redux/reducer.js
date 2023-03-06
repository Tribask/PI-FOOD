import {
  CLEAN_DETAIL,
  GET_DIET_TYPES,
  GET_RECIPES,
  GET_RECIPE_ID,
  GET_RECIPE_NAME,
  ORDER_ALPHABETIC,
  ORDER_SCORE,
  ORDER_TYPES,
  PAGINADO,
  SET_ERROR,

} from "./actions";

const initialState = {
  recipes: [],
  recipe: [],
  details: [],
  dietTypes: [],
  page: 1,
  error: undefined,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_DETAIL:
      return{ ...state , details: []}

    case GET_RECIPES:
      return { ...state, recipes: action.payload, recipe: action.payload };
    // return { ...state, recipes: action.payload, recipe: action.payload };

    case GET_RECIPE_NAME:
      return { ...state, recipes: action.payload, error: undefined, page:1 };

    case GET_RECIPE_ID:
      console.log(action.payload);
      if(action.payload.dietTypes){
      let newDietTypes = {
        name: action.payload.name,
        dishTypes: action.payload.dishTypes/*?action.payload.dishTypes:["none"]*/,
        summary:action.payload.summary,
        health_score: action.payload.health_score,
        image:action.payload.image,
        steps: action.payload.steps?.map((e) => (e.step ? e.step : e)),
        dietTypes: action.payload.dietTypes?.map((e) => (e.name ? e.name : e))
      }
      return { ...state, details: newDietTypes };
    } else{
      let newDietTypes = {
        name: action.payload.name,
        dishTypes: action.payload.dishTypes?action.payload.dishTypes:"none",
        summary:action.payload.summary,
        health_score: action.payload.health_score,
        image:action.payload.image,
        steps: action.payload.steps?.map((e) => (e.step ? e.step : e)),
        dietTypes: action.payload.diets?.map((e) => (e.name ? e.name : e))
      }
      return { ...state, details: newDietTypes };
    }
      // return { ...state, details: newDietTypes };

    case GET_DIET_TYPES:
      return { ...state, dietTypes: action.payload };

    case ORDER_ALPHABETIC:
      // console.log(`ESTOY con ${action.payload}`);
      const orderRecipe = state.recipes.sort((a, b) => {
        if (action.payload === "asc") {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        } else {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        }
      });
      return { ...state, recipes: [...orderRecipe] };

    case ORDER_TYPES:
      const allRecipes = state.recipe;
      const filter =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter((el) => {
              let names = el.dietTypes.map((d) => d);
              if (names.includes(action.payload)) return el;
            });
      return { ...state, recipes: filter, page:1 };

    case ORDER_SCORE:
      const orderScore = state.recipes.sort((a, b) => {
        if (action.payload === "low") {
          if (a.health_score < b.health_score) return -1;
          if (a.health_score > b.health_score) return 1;
          return 0;
        } else {
          if (a.health_score < b.health_score) return 1;
          if (a.health_score > b.health_score) return -1;
          return 0;
        }
      });
      return { ...state, recipes: [...orderScore] };

    case PAGINADO:
      return { ...state, page: action.payload } ;

      case SET_ERROR:
        return{ ...state, error: action.payload, recipes: [], recipe: [] }

    default:
      return { ...state};
  }
};

export default rootReducer;
