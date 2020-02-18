const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const db = require("../data/auth1-model");
const authUser = require("./auth/login-auth");
const newUserAuth = require("./auth/register-auth");
const restricted = require("./auth/restricted-auth");

const server = express();
const sessionConfig = {
  name: "monkey", // default "sid"
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 30,
    secure: false, //true in production
    httpOnly: true //javascript can't access cookie
  },
  reSave: false, //same session, don't reSave
  saveUninitialized: false //GDPR laws against setting cookies automatically
};

server.use(express.json());
server.use(morgan("combined"));
server.use(helmet());
server.use(session(sessionConfig));

server.get("/api/users", restricted, (req, res) => {
  db.getUsers()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res.status(500).json({ message: "unable to retrieve users", error: err })
    );
});

server.get("/api/users/:id", restricted, (req, res) => {
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
    .then(user => {
      req.session.user = user.id;
      res.status(200).json({ message: `Welcome ${user.user}` });
    })
    .catch(err =>
      res.status(500).json({ message: "unable to login", error: err })
    );
});

server.get("/api/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy(err =>
      err
        ? res.json({ message: "you can never leave" })
        : res.status(200).json({ message: "logout was successful" })
    );
  } else {
    res.status(200).json({ message: "You were never here to start" });
  }
});

server.use("/", (req, res) => {
  res.status(200).send("API is running");
});

module.exports = server;
