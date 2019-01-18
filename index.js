const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const server = express();
server.use(express.json());
const db = knex(knexConfig.development);

const serverError = res => err => {
  res.status(500).json(err);
};
const getSuccess = res => data => {
  res.status(200).json(data);
};

const postSuccess = res => id => {
    res.status(201).json(id);
  };

const stdGet = tbl => (req, res) => {
  db(tbl)
    .then(getSuccess(res))
    .catch(serverError(res));
};

// const getRecipes = tbl => (req, res) => {
//   db(tbl)
//     .then(data => {
//       res.status(200).json(data);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// };

const getDish = () => (req, res) => {
  db.select(
    "dishes.id as Dish ID",
    "dishes.name as Dish Name",
    "recipes.id as Recipe ID",
    "recipes.name as Recipe Name",
    "recipes.instructions as Instructions"
  )
    .from("dishes")
    .innerJoin("recipes", "recipes.dish_id", "=", "dishes.id")
    .where({ "dishes.id": req.params.id })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Dish not found" });
      }
    })
    .catch(serverError(res));
};

const addDish = tbl => (req, res) => {
  if (!req.body.name) {
    res.status(500).json({ Error_Message: "Provide Name" });
  } else {
    db(tbl)
      .insert(req.body)
      .then(postSuccess(res))
      .catch(serverError(res));
  }
};

const addRecipe = tbl => (req, res) => {
  const { name, dish_id, instructions } = req.body;
  if (!name || !dish_id || !instructions) {
    res
      .status(500)
      .json({ Error_Message: "Provide Name || Dish ID || Instructions" });
  } else {
    db(tbl)
      .insert(req.body)
      .then(postSuccess(res))
      .catch(serverError(res));
  }
};



// server.get(`/api/dishes`, getDishes("dishes"));
// server.get(`/api/recipes`, getRecipes("recipes"));

server.get(`/api/dishes/:id`, getDish());
server.post(`/api/dishes`, addDish("dishes"));
server.post(`/api/recipes`, addRecipe("recipes"));

const tableNames = ["dishes", "recipes"];
tableNames.forEach(name => {
  server.get(`/api/${name}`, stdGet(name));
});

const PORT = 5110;
server.listen(PORT, () => {
  console.log(`sever connected to port: ${PORT}`);
});
