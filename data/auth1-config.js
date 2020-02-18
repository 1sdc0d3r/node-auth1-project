require("dotenv").config();
//! .env file not being read
// process.env.NODE_ENV ||
const env = "testing";

const configOptions = require("../knexfile")[env];
// console.log(configOptions);

const knex = require("knex")(configOptions);

module.exports = knex;
