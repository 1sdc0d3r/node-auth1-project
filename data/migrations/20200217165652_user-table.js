exports.up = function(knex) {
  return knex.schema.createTable("Users", tbl => {
    tbl.increments();
    tbl
      .string("user", 128)
      .notNullable()
      .unique();
    tbl.string("password", 256).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Users");
};
