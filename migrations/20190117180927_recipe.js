exports.up = function(knex, Promise) {
    return knex.schema.createTable("recipes", tbl => {
      tbl.increments();
      tbl.text("name", 50);
      tbl
        .integer("dish_id")
        .unsigned()
        .references("id")
        .inTable("dishes");
        tbl.text("instructions");
      tbl.timestamps(true, true);
      tbl.unique("name");
    });
  };
  
  exports.down = function(knex, Promise) {
    knex.schema.dropTable('recipes');
  };
