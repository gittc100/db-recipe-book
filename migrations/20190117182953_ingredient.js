exports.up = function(knex, Promise) {
    return knex.schema.createTable("ingredients", tbl => {
      tbl.increments();
      tbl.text("name", 50);
      tbl.float("qty")
      tbl.timestamps(true, true);
      tbl.unique("name");
    });
  };
  
  exports.down = function(knex, Promise) {
    knex.schema.dropTable('recipes');
  };
