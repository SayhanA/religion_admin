const routes = require("express").Router();
const {
  getCasts,
  createCast,
  deleteCaste,
  getAddCaste,
  updateCaste,
  createCaste,
  deleteAllCastes,
} = require("../controllers/adminCast");
const Caste = require("../models/caste");
const Religion = require("../models/religion");

//GET /admin/caste
routes.get("/", getCasts);

//POST /admin/caste
routes.post("/", updateCaste);

//DELETE /admin/caste/delete
routes.post("/delete", deleteCaste);

//GET  /admin/castes/add
routes.get("/add", getAddCaste);

//POST  /admin/castes/add
routes.post("/add", createCaste);

//DELETE  /admin/castes/deleteAll
routes.post("/deleteAll", deleteAllCastes);

module.exports = routes;
