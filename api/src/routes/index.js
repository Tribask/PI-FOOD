const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRoute = require("./recipes");
const recipeRoute = require("./recipe");
const typesRoute = require("./types");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", recipesRoute);

router.use("/recipe", recipeRoute);

router.use("/types", typesRoute);

module.exports = router;
