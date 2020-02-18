exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("Users").insert([{ user: "user1", password: "password" }]);
    });
};
