const knex = require("knex");

const configOptions = require("../knexfile");
const auth1Db = knex(configOptions.development);

module.exports = auth1Db;
