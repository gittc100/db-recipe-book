
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("ingredients")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("ingredients").insert([
        { name: "cheese", qty: "1" },
        { name: "ground beef", qty: "1" }
      ]);
    });
};
