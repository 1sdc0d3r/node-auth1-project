const db = require("./auth1-config");

module.exports = {
  getUsers,
  getUserById,
  getByUser,
  insert,
  update,
  remove
};

function getUsers() {
  return db("Users");
}

function getUserById(id) {
  return db("Users")
    .first()
    .where({ id });
}

function getByUser(user) {
  return db("Users")
    .first()
    .where({ user });
}

function insert(user) {
  return db("Users")
    .first()
    .insert(user);
}

function update(id, data) {
  return db("Users")
    .where({ id })
    .update(data);
}

function remove(id) {
  return db("Users")
    .where({ id })
    .del();
}
