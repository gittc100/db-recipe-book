const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const server = express();
server.use(express.json());
const db = knex(knexConfig.development);

const getDishes = tbl => (req, res) => {
  db(tbl)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

const getRecipes = tbl => (req, res) => {
  db(tbl)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

const getDish = tbl => (req, res) => {
  db.select(
    `${tbl}.id as Dish ID`,
    `${tbl}.name as Dish Name`,
    "recipes.id as Recipe ID",
    "recipes.name as Recipe Name",
    "recipes.instructions as Instructions"
  )
    .from(tbl)
    .innerJoin("recipes", "recipes.dish_id", "=", `${tbl}.id`)
    .where({ "dishes.id": req.params.id })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Dish not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

const addDish = tbl => (req, res) => {
  if (!req.body.name) {
    res.status(500).json({ Error_Message: "Provide Name" });
  } else {
    db(tbl)
      .insert(req.body)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};

const addRecipe = tbl => (req, res) => {
    const {name, dish_id, instructions} = req.body
  if (!name || !dish_id || !instructions) {
    res.status(500).json({ Error_Message: "Provide Name || Dish ID || Instructions" });
  } else {
    db(tbl)
      .insert(req.body)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};

server.get(`/api/dishes`, getDishes("dishes"));
server.get(`/api/recipes`, getRecipes("recipes"));
server.get(`/api/dishes/:id`, getDish("dishes"));
server.post(`/api/dishes`, addDish("dishes"));
server.post(`/api/recipes`, addRecipe("recipes"));

const PORT = 5110;
server.listen(PORT, () => {
  console.log(`sever connected to port: ${PORT}`);
});
