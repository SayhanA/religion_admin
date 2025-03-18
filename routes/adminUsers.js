const { getUsersPage } = require("../controllers/adminUsers");
const isAuthorized = require("../middleware/isAuthorized");

const routes = require("express").Router();

routes.get("/", getUsersPage);

module.exports = routes;
