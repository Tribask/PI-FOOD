const { Router } = require("express");
const router = Router();
const { Diet } = require("../db");
const diets = require("../controllers/types");

router.get("/", async (req, res) => {
  try {
    diets.forEach((t) => {
      Diet.findOrCreate({
        where: { name: t },
      });
    });

    const types = await Diet.findAll();
    res.status(200).send(types);
  } catch (error) {
    res.status(400).send("Tipo Dieta no Encontrada");
  }
});

module.exports=router;
