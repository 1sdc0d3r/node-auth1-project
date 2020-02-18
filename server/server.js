const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");

const db = require("../data/auth1-model");
const authUser = require("./auth/login-auth");
const newUserAuth = require("./auth/register-auth");

const server = express();
server.use(express.json());
server.use(morgan("combined"));
server.use(helmet());

server.get("/api/users", (req, res) => {
  db.getUsers()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res.status(500).json({ message: "unable to retrieve users", error: err })
    );
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.getUserById(id)
    .then(user =>
      !user
        ? res.status(300).json({ message: `no user with id ${id}` })
        : res.status(200).json(user)
    )
    .catch(err =>
      res.status(500).json({ message: "unable to retrieve users", error: err })
    );
});

server.post("/api/register", newUserAuth, (req, res) => {
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 12);
  newUser.password = hash;
  db.insert(newUser)
    .then(user => res.status(201).json(user))
    .catch(err =>
      res.status(500).json({ message: "unable to create user", error: err })
    );
});

server.post("/api/login", authUser, (req, res) => {
  const { user } = req.body;
  db.getByUser(user)
    .then(user => res.status(200).json({ message: `Welcome ${user.user}` }))
    .catch(err =>
      res.status(500).json({ message: "unable to login", error: err })
    );
});

server.use("/", (req, res) => {
  res.status(200).send("API is running");
});

module.exports = server;
