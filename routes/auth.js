const {
  getLogin,
  getSignUp,
  postLogin,
  postSignUp,
  getlogout,
} = require("../controllers/auth");

const routes = require("express").Router();

//Login
routes.get("/", getLogin);

routes.post("/login", postLogin);

routes.get("/logout", getlogout);

//signup
routes.get("/signup", getSignUp);

routes.post("/signup", postSignUp);

module.exports = routes;
