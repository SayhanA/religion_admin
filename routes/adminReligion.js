const routes = require("express").Router();
const {
  getReligions,
  updateReligion,
  deleteReligion,
  deleteAllReligions,
} = require("../controllers/adminReligion");

//GET /admin/religion/
routes.get("/", getReligions);

//GET /admin/religion/
routes.post("/", updateReligion);

//DELETE /admin/religion/delete
routes.post("/delete", deleteReligion);

//DELETE /admin/religion/deleteAll
routes.post("/deleteAll", deleteAllReligions);

module.exports = routes;
