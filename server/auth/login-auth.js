const db = require("../../data/auth1-model.js");
const bcrypt = require("bcryptjs");

module.exports = function authUser(req, res, next) {
  const { user, password } = req.body;
  db.getByUser(user).then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      next();
    } else {
      res
        .status(300)
        .json({ message: "Please provide the correct credentials." });
    }
  });
};
