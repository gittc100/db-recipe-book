exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipesIngredients", tbl => {
    tbl.increments();
    tbl
      .integer("recipe_id")
      .unsigned()
      .references("id")
      .inTable("recipes");
    tbl
      .integer("ingredient_id")
      .unsigned()
      .references("id")
      .inTable("ingredients");
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("recipes");
};
