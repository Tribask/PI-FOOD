const { Router } = require("express");
const axios = require("axios");
const {
  getAllRecipes,
  getIdRecipe,
  searchRecipeByName,
} = require("../controllers/recipes");
require("dotenv").config();
const { API_KEY } = process.env;

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    const results = name ? await searchRecipeByName(name) : await getAllRecipes();
    // si hay name ejecuto la función buscar por nombre, sino la de buscar todo
    return res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(400).json({error: error.message});
    // send("No se encuentra receta con ese nombre")
    // json({error: error.message});
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    let infoRecipe = await getIdRecipe(id, source);
    if (infoRecipe === null) throw new Error("Receta no Encontrada");
    

    res.status(200).send(infoRecipe);
  } catch (error) {
    res.status(400).send("{ error: error.message }");
  }
});

module.exports = router;
