module.exports = function newUserAuth(req, res, next) {
  if (!req.body.user || !req.body.password) {
    res.status(400).json({ message: "Please provide username and password" });
  }
  next();
};
