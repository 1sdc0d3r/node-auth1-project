exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("Users").insert([{ user: "admin", password: "password" }]);
    });
};
