exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("recipes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        { name: "spicy taco", dish_id: "1", instructions: "add spice" },
        { name: "plain taco", dish_id: "1", instructions: "do not add spice" },
        { name: "cheese burger", dish_id: "2", instructions: "add cheese" },
        { name: "plain burger", dish_id: "2", instructions: "do not add cheese" },
        { name: "plain cheese pizza", dish_id: "3", instructions: "add cheese" },
      ]);
    });
};
