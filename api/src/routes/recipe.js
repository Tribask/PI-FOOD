const { Router } = require("express");

const { Recipe, Diet } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
  const { name, image, summary, health_score, steps, dietTypes, dishTypes } = req.body;
  try {
    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      health_score,
      steps,
      dietTypes,
      dishTypes
    });

    

    const dietDb = await Diet.findAll({ where: { name: dietTypes } });

 
    newRecipe.addDiet(dietDb); 

    res.status(200).send("Successfull");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
