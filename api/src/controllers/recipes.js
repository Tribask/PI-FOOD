const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

const getUrlInfo = async () => {
  const url = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
  );

  const infoUrl = url.data.results.map((f) => {
    return {
      id: f.id,
      name: f.title,
      image: f.image,
      summary: f.summary,
      health_score: f.healthScore,
      dietTypes: f.diets,
      steps:
        f.analyzedInstructions[0]?.steps.map((s) => {
              return {
                numer: s.number,
                step: s.step
              }
            }),
      dishTypes: f.dishTypes,
      created: false,
    };
  });
  return infoUrl;
};

const getDbInfo = async () => {
  const result = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  const recipe = result.map((r) => {
    return {
      id: r.id,
      name: r.name,
      summary: r.summary,
      health_score: r.health_score,
      steps: r.steps,
      image: r.image,
      dietTypes: r.diets.map((d) => d.name),
    };
  });
  return recipe;
};

const getAllRecipes = async () => {
  const apiInfo = await getUrlInfo();
  const dbInfo = await getDbInfo();
  return [...dbInfo, ...apiInfo];
};

const searchRecipeByName = async (name) => {
  const allRecipes = await getAllRecipes();
  const recipesName = await allRecipes.filter((f) =>
    f.name.toLowerCase().includes(name.toString().toLowerCase())
  ); // filtro para encontrar el nombre, asegurando que la comparación se haga correctamente.
  if (recipesName.length) {
    return recipesName;
  } else {
    // res.status(400).send('No se encuentra receta con ese nombre')
    throw new Error("No se encuentra receta con ese nombre");
  }
};

const getIdRecipe = async (id, source) => {
  if (source === "api") {
    const recipe = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    console.log(recipe);

    const data = recipe.data;
    let recipeDetails = {
      // creo un objeto nuevo con las propiedades que me interesa mostrar
      image: data.image,
      name: data.title,
      dishTypes: data.dishTypes,
      dietTypes: data.diets,
      summary: data.summary,
      health_score: data.healthScore,
      steps: data.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
    };

    return recipeDetails;
  } else {
    return await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
  }
};

module.exports = {
  getUrlInfo,
  getDbInfo,
  getAllRecipes,
  getIdRecipe,
  searchRecipeByName,
};
