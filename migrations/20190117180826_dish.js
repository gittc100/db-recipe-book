exports.up = function(knex, Promise) {
    return knex.schema.createTable('dishes', (tbl) => {
      tbl.increments();
      tbl.text('name', 50);
      tbl.timestamps(true, true);
      tbl.unique('name');
    });
  };
  
  exports.down = function(knex, Promise) {
    knex.schema.dropTableIfItExists('dishes');
  };
